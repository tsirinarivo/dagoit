"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
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
      latLngToVec3(lat, lng, radius + 0.03)
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
  const earthTexture = useLoader(THREE.TextureLoader, "/textures/earth-dark.jpg");

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


  return (
    <group ref={groupRef}>
      {/* Sphère avec texture carte du monde */}
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.0}
        />
      </mesh>

      {/* Halo atmosphérique */}
      <mesh>
        <sphereGeometry args={[RADIUS * 1.03, 32, 32]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

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
      {/* Éclairage renforcé pour la texture */}
      <ambientLight intensity={1.2} color="#ffffff" />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -3, -3]} intensity={0.4} color="#0b3a6f" />
      <pointLight position={[0, -4, 2]} intensity={0.2} color="#A3FF12" />

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

      <Suspense fallback={null}>
        <Globe />
      </Suspense>

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
