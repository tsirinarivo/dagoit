"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Server,
  ShieldAlert,
  Navigation,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  Moon,
  Sun,
  ShoppingCart,
} from "lucide-react";
import { NAV_ITEMS, CONTACT_INFO } from "@/lib/constants/nav";
import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils/cn";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "/services/geolocalisation": <MapPin className="h-4 w-4" />,
  "/services/hebergement-web": <Server className="h-4 w-4" />,
  "/services/alarme": <ShieldAlert className="h-4 w-4" />,
  "/services/tracking-platform": <Navigation className="h-4 w-4" />,
};

function LogoSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DAGO IT"
    >
      {/* Cercles radar */}
      <circle cx="20" cy="20" r="17" stroke="#00E5FF" strokeWidth="1" opacity="0.2" />
      <circle cx="20" cy="20" r="11" stroke="#00E5FF" strokeWidth="1.2" opacity="0.45" />
      <circle cx="20" cy="20" r="5.5" stroke="#00E5FF" strokeWidth="1.5" opacity="0.8" />
      <circle cx="20" cy="20" r="2.5" fill="#00E5FF" />
      {/* Arcs signal */}
      <path d="M27 13 Q31 9 36 8" stroke="#A3FF12" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M29.5 10.5 Q34.5 5 40 4" stroke="#A3FF12" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
      {/* Wordmark */}
      <text
        x="48"
        y="15"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight="800"
        fontSize="16"
        fill="#F5F7FA"
        letterSpacing="-0.5"
      >
        DAGO
      </text>
      <text
        x="48"
        y="32"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight="400"
        fontSize="11"
        fill="#00E5FF"
        letterSpacing="4"
      >
        IT
      </text>
      <text
        x="71"
        y="32"
        fontFamily="Inter, sans-serif"
        fontWeight="400"
        fontSize="7.5"
        fill="#64748B"
        letterSpacing="1.5"
      >
        SOLUTIONS
      </text>
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { itemCount, openCart } = useCartStore();
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function openDropdown(href: string) {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(href);
  }

  function closeDropdown() {
    dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 150);
  }

  const count = itemCount();

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-[var(--border)] py-3"
            : "bg-transparent py-5"
        )}
        role="banner"
      >
        <div className="container-dago flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            aria-label="DAGO IT — Accueil"
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <LogoSVG className="h-10 w-auto" />
          </Link>

          {/* Navigation desktop */}
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && openDropdown(item.href)}
                onMouseLeave={() => item.children && closeDropdown()}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                  )}
                  aria-haspopup={!!item.children}
                  aria-expanded={activeDropdown === item.href}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        activeDropdown === item.href && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 mt-2 w-60 glass-strong rounded-2xl p-2 shadow-card"
                      role="menu"
                      onMouseEnter={() => openDropdown(item.href)}
                      onMouseLeave={closeDropdown}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm",
                            "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]",
                            "transition-colors duration-150"
                          )}
                        >
                          <span className="text-cyan-500 shrink-0">
                            {SERVICE_ICONS[child.href]}
                          </span>
                          <span>{child.label}</span>
                          {child.badge && (
                            <Badge variant="cyan" className="ml-auto text-[10px] py-0.5">
                              {child.badge}
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-2">
            {/* Toggle thème */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={
                theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"
              }
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            </button>

            {/* Panier */}
            <button
              onClick={openCart}
              aria-label={`Panier — ${count} article${count !== 1 ? "s" : ""}`}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-cyan-500 text-primary-900 text-[10px] font-bold flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            {/* CTA démo */}
            <Button
              variant="primary"
              size="sm"
              className="hidden md:flex"
              asChild
            >
              <Link href="/devis">Demander une démo</Link>
            </Button>

            {/* Burger mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-primary-900 flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <nav aria-label="Navigation mobile">
              {NAV_ITEMS.map((item) => (
                <div key={item.href} className="border-b border-[var(--border)]">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-4 text-lg font-display font-semibold text-[var(--text-primary)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-4 w-4 text-[var(--text-tertiary)]" />}
                  </Link>
                  {item.children && (
                    <div className="pl-4 pb-3 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2 py-2 text-sm text-[var(--text-secondary)]"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="text-cyan-500">{SERVICE_ICONS[child.href]}</span>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <Button variant="primary" size="lg" className="w-full" asChild>
                <Link href="/devis" onClick={() => setMobileOpen(false)}>
                  Demander une démo gratuite
                </Link>
              </Button>
              <Button variant="secondary" size="lg" className="w-full" asChild>
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  Nous contacter
                </Link>
              </Button>
            </div>

            <p className="mt-auto pt-8 text-sm text-[var(--text-tertiary)] text-center">
              {CONTACT_INFO.phone} · {CONTACT_INFO.email}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
