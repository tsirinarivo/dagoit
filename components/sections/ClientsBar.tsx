"use client";

import { motion } from "framer-motion";

const CLIENT_TYPES = [
  { icon: "🚑", label: "Ambulances & SMUR" },
  { icon: "🚚", label: "Transport & Logistique" },
  { icon: "🏗️", label: "BTP & Travaux publics" },
  { icon: "🚕", label: "Taxis & VTC" },
  { icon: "🏥", label: "Hôpitaux" },
  { icon: "🏬", label: "Commerce & Distribution" },
  { icon: "🛡️", label: "Sécurité privée" },
  { icon: "🌾", label: "Agribusiness" },
];

export function ClientsBar() {
  return (
    <section
      className="relative py-8 border-y border-[var(--border)] overflow-hidden"
      aria-label="Secteurs clients de DAGO IT"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--bg) 0%, transparent 10%, transparent 90%, var(--bg) 100%)",
          zIndex: 1,
        }}
      />
      <div className="container-dago mb-4">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] text-center">
          Secteurs que nous équipons
        </p>
      </div>

      {/* Défilement infini */}
      <div className="flex overflow-hidden" aria-hidden>
        <motion.div
          className="flex gap-8 shrink-0 pr-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...CLIENT_TYPES, ...CLIENT_TYPES].map((client, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] shrink-0 hover:border-cyan-500/30 transition-colors"
            >
              <span className="text-xl" role="img" aria-label={client.label}>
                {client.icon}
              </span>
              <span className="text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap">
                {client.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
