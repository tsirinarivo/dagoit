"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { MADAGASCAR_CITIES, GPS_ROUTES } from "@/lib/constants/cities";

// ── Coordonnées géographiques → position sur sphère ──────────────────────────
function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// ── Ping GPS pulsant ──────────────────────────────────────────────────────────
function GPSPing({
  position,
  color = "#00E5FF",
  isCapital = false,
}: {
  position: THREE.Vector3;
  color?: string;
  isCapital?: boolean;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = 1 + (Math.sin(t * 2) * 0.5 + 0.5) * (isCapital ? 1.5 : 0.8);
    const opacity = 1 - (Math.sin(t * 2) * 0.5 + 0.5) * 0.7;

    if (ringRef.current) {
      ringRef.current.scale.setScalar(scale);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
    if (ring2Ref.current) {
      const scale2 = 1 + ((Math.sin(t * 2 + Math.PI) * 0.5 + 0.5)) * (isCapital ? 1.2 : 0.6);
      ring2Ref.current.scale.setScalar(scale2);
      (ring2Ref.current.material as THREE.MeshBasicMaterial).opacity =
        1 - ((Math.sin(t * 2 + Math.PI) * 0.5 + 0.5)) * 0.7;
    }
  });

  const size = isCapital ? 0.025 : 0.015;

  return (
    <group position={position}>
      {/* Point central */}
      <mesh>
        <sphereGeometry args={[size, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Anneau pulsant 1 */}
      <mesh ref={ringRef}>
        <ringGeometry args={[size * 1.5, size * 2.2, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Anneau pulsant 2 (décalé) */}
      <mesh ref={ring2Ref}>
        <ringGeometry args={[size * 2, size * 3, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ── Ligne de trajet animée entre deux villes ──────────────────────────────────
function GPSRoute({
  from,
  to,
  radius,
  progress,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  radius: number;
  progress: number;
}) {
  const points = useMemo(() => {
    const count = 32;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      // Arc de grand cercle avec hauteur
      const p = from.clone().lerp(to, t).normalize();
      const alt = Math.sin(Math.PI * t) * radius * 0.12;
      pts.push(p.multiplyScalar(radius + alt));
    }
    return pts;
  }, [from, to, radius]);

  const geometry = useMemo(() => {
    const count = Math.floor(points.length * progress);
    if (count < 2) return null;
    const visible = points.slice(0, count);
    return new THREE.BufferGeometry().setFromPoints(visible);
  }, [points, progress]);

  if (!geometry) return null;

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color="#00E5FF" transparent opacity={0.4} linewidth={1} />
    </line>
  );
}

// ── Particules de données voyageant sur les routes ────────────────────────────
function DataParticle({
  from,
  to,
  radius,
  speed = 0.3,
  offset = 0,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  radius: number;
  speed?: number;
  offset?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 32; i++) {
      const t = i / 32;
      const p = from.clone().lerp(to, t).normalize();
      const alt = Math.sin(Math.PI * t) * radius * 0.12;
      pts.push(p.multiplyScalar(radius + alt));
    }
    return pts;
  }, [from, to, radius]);

  useFrame(({ clock }) => {
    const t = ((clock.getElapsedTime() * speed + offset) % 1);
    const idx = Math.floor(t * (points.length - 1));
    if (meshRef.current && points[idx]) {
      meshRef.current.position.copy(points[idx]);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.012, 6, 6]} />
      <meshBasicMaterial color="#A3FF12" />
    </mesh>
  );
}

// ── Contours des continents voisins ──────────────────────────────────────────
const AFRICA_COASTLINE: [number, number][] = [
  [35.9, -5.5], [35.7, -0.6], [36.9, 5.2], [37.1, 9.2], [34.5, 11.1],
  [31.5, 25.2], [30.9, 32.3], [27.2, 33.8], [22.0, 36.9], [15.0, 41.8],
  [11.5, 43.1], [10.0, 51.4], [2.4, 45.3], [-1.7, 41.5], [-4.6, 39.7],
  [-10.5, 40.5], [-15.0, 40.7], [-22.9, 35.5], [-25.9, 32.9],
  [-29.9, 30.9], [-34.1, 26.8], [-34.8, 20.0], [-34.4, 18.5],
  [-29.4, 17.1], [-28.6, 15.8], [-22.0, 14.5], [-17.3, 11.8],
  [-12.4, 13.4], [-5.9, 12.2], [0.0, 9.3], [3.8, 9.4],
  [5.0, 3.4], [4.9, -1.7], [5.1, -5.0], [4.4, -7.5],
  [6.9, -11.3], [9.3, -13.7], [10.5, -15.1], [11.9, -16.7],
  [14.7, -17.5], [20.9, -17.0], [27.7, -13.2], [30.4, -9.8],
  [33.5, -7.8], [35.9, -5.5],
];

const ARABIAN_PENINSULA: [number, number][] = [
  [29.5, 32.5], [28.0, 34.9], [22.5, 37.2], [18.0, 38.5], [12.7, 43.5],
  [11.8, 43.4], [11.2, 51.3], [22.3, 59.8], [23.7, 58.6], [24.6, 56.4],
  [25.6, 56.3], [26.1, 56.9], [26.5, 56.4], [27.2, 56.2], [27.9, 57.3],
  [22.4, 59.9], [19.0, 57.5], [16.9, 53.1], [15.7, 52.2], [14.5, 49.4],
  [12.7, 45.0], [12.4, 43.5], [11.3, 42.8], [11.5, 43.1],
  [14.0, 42.5], [16.0, 42.9], [19.0, 41.5], [22.0, 39.2],
  [24.5, 37.3], [27.5, 35.5], [29.5, 34.9], [30.0, 33.0], [29.5, 32.5],
];

const INDIAN_SUBCONTINENT: [number, number][] = [
  [24.0, 68.0], [22.5, 68.9], [20.7, 71.0], [16.8, 73.3], [14.8, 74.1],
  [8.1, 77.3], [8.1, 77.6], [9.2, 79.9], [10.6, 79.9], [13.4, 80.3],
  [15.9, 80.6], [19.3, 85.1], [20.3, 86.8], [21.5, 87.4],
  [22.2, 88.1], [21.6, 88.7], [22.8, 89.6], [23.3, 91.4],
  [24.9, 89.8], [26.3, 89.4], [26.6, 88.1], [27.5, 88.1],
  [27.5, 87.1], [28.3, 84.2], [27.4, 80.6], [26.4, 74.5],
  [24.0, 68.0],
];

function ContinentOutline({ coords, radius, color, opacity }: {
  coords: [number, number][];
  radius: number;
  color: string;
  opacity: number;
}) {
  const geometry = useMemo(() => {
    const pts = coords.map(([lat, lng]) => latLngToVec3(lat, lng, radius + 0.004));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [coords, radius]);

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}

// ── Contour simplifié de Madagascar ──────────────────────────────────────────
const MADAGASCAR_COASTLINE: [number, number][] = [
  [-12.04, 49.25], [-12.38, 49.56], [-12.85, 49.80], [-13.40, 50.08],
  [-14.10, 50.22], [-14.83, 50.40], [-15.42, 50.34], [-16.16, 50.05],
  [-16.83, 49.85], [-17.52, 49.75], [-18.15, 49.40], [-18.90, 48.80],
  [-19.47, 48.57], [-20.04, 48.10], [-20.52, 47.45], [-21.21, 47.23],
  [-21.85, 47.65], [-22.31, 47.96], [-22.82, 47.82], [-23.35, 47.58],
  [-23.86, 47.18], [-24.39, 47.05], [-24.89, 46.90], [-25.14, 46.68],
  [-25.38, 46.35], [-25.60, 45.16], [-25.53, 44.92], [-25.04, 44.51],
  [-24.58, 43.97], [-24.10, 43.70], [-23.60, 43.22], [-23.06, 43.42],
  [-22.50, 43.28], [-21.98, 43.62], [-21.40, 43.72], [-20.86, 44.04],
  [-20.35, 44.30], [-19.93, 44.44], [-19.45, 44.28], [-18.92, 44.12],
  [-18.40, 44.05], [-17.85, 44.08], [-17.29, 43.92], [-16.75, 44.30],
  [-16.20, 44.52], [-15.72, 45.98], [-15.14, 47.10], [-14.56, 47.53],
  [-13.95, 47.87], [-13.43, 48.11], [-13.00, 48.28], [-12.55, 48.78],
  [-12.22, 49.05], [-12.04, 49.25],
];

function MadagascarOutline({ radius }: { radius: number }) {
  const geometry = useMemo(() => {
    const pts = MADAGASCAR_COASTLINE.map(([lat, lng]) =>
      latLngToVec3(lat, lng, radius + 0.005)
    );
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color="#00E5FF" transparent opacity={0.85} linewidth={2} />
    </line>
  );
}

// ── Globe principal ───────────────────────────────────────────────────────────
function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const RADIUS = 1.8;

  // Rotation automatique douce
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
    }
  });

  // Positions des villes
  const cityPositions = useMemo(
    () =>
      MADAGASCAR_CITIES.map((city) =>
        latLngToVec3(city.lat, city.lng, RADIUS + 0.01)
      ),
    []
  );

  // Positions pour les routes (indexées par city.id)
  const cityPosMap = useMemo(() => {
    const map: Record<string, THREE.Vector3> = {};
    MADAGASCAR_CITIES.forEach((city) => {
      map[city.id] = latLngToVec3(city.lat, city.lng, RADIUS + 0.01);
    });
    return map;
  }, []);

  // Grille de méridiens/parallèles
  const gridLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];

    // Méridiens (lignes verticales)
    for (let lng = -180; lng <= 180; lng += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        pts.push(latLngToVec3(lat, lng, RADIUS));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(pts));
    }

    // Parallèles (lignes horizontales)
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lng = -180; lng <= 180; lng += 5) {
        pts.push(latLngToVec3(lat, lng, RADIUS));
      }
      // Fermer la boucle
      pts.push(pts[0]);
      lines.push(new THREE.BufferGeometry().setFromPoints(pts));
    }

    return lines;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Sphère principale */}
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshPhongMaterial
          color="#0a1628"
          emissive="#071020"
          shininess={20}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Halo atmosphérique */}
      <mesh>
        <sphereGeometry args={[RADIUS * 1.02, 32, 32]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Grille de coordonnées */}
      {gridLines.map((geo, i) => (
        <line key={i}>
          <primitive object={geo} attach="geometry" />
          <lineBasicMaterial
            color="#1a4080"
            transparent
            opacity={0.25}
          />
        </line>
      ))}

      {/* Routes GPS avec animation */}
      {GPS_ROUTES.map((route, i) => {
        const from = cityPosMap[route.from];
        const to = cityPosMap[route.to];
        if (!from || !to) return null;
        return (
          <group key={route.from + route.to}>
            <GPSRoute from={from} to={to} radius={RADIUS} progress={1} />
            <DataParticle
              from={from}
              to={to}
              radius={RADIUS}
              speed={0.2 + i * 0.05}
              offset={i * 0.2}
            />
            {/* Particule dans l'autre sens */}
            <DataParticle
              from={to}
              to={from}
              radius={RADIUS}
              speed={0.15 + i * 0.04}
              offset={i * 0.3 + 0.5}
            />
          </group>
        );
      })}

      {/* Contours des continents */}
      <ContinentOutline coords={AFRICA_COASTLINE} radius={RADIUS} color="#1a5080" opacity={0.55} />
      <ContinentOutline coords={ARABIAN_PENINSULA} radius={RADIUS} color="#1a5080" opacity={0.4} />
      <ContinentOutline coords={INDIAN_SUBCONTINENT} radius={RADIUS} color="#1a5080" opacity={0.4} />

      {/* Contour de Madagascar — mis en valeur */}
      <MadagascarOutline radius={RADIUS} />

      {/* Pings GPS des villes */}
      {MADAGASCAR_CITIES.map((city, i) => (
        <GPSPing
          key={city.id}
          position={cityPositions[i]}
          color={city.isCapital ? "#A3FF12" : "#00E5FF"}
          isCapital={city.isCapital}
        />
      ))}
    </group>
  );
}

// ── Scène complète ────────────────────────────────────────────────────────────
function Scene() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.5, 4.5);
  }, [camera]);

  return (
    <>
      {/* Éclairage */}
      <ambientLight intensity={0.4} color="#1a3a6f" />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00E5FF" />
      <pointLight position={[-5, -3, -3]} intensity={0.5} color="#0b3a6f" />
      <pointLight position={[0, -4, 2]} intensity={0.3} color="#A3FF12" />

      {/* Étoiles d'arrière-plan */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0.3}
        fade
        speed={0.5}
      />

      <Globe />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
        rotateSpeed={0.4}
        enableDamping
        dampingFactor={0.06}
      />
    </>
  );
}

// ── Export du composant ───────────────────────────────────────────────────────
export function MadagascarGlobe({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      role="presentation"
      aria-label="Globe 3D de Madagascar avec points GPS animés"
    >
      <Canvas
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
