"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "hover" | "click" | "text";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 40 };
  const dotX = useSpring(cursorX, { stiffness: 800, damping: 50 });
  const dotY = useSpring(cursorY, { stiffness: 800, damping: 50 });
  const circleX = useSpring(cursorX, springConfig);
  const circleY = useSpring(cursorY, springConfig);

  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Masquer le curseur natif via CSS
    document.documentElement.style.cursor = "none";

    function onMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    }

    function onEnterInteractive() {
      setVariant("hover");
    }
    function onLeaveInteractive() {
      setVariant("default");
    }
    function onMouseDown() {
      setVariant("click");
    }
    function onMouseUp() {
      setVariant(variant === "click" ? "default" : variant);
    }
    function onMouseLeave() {
      setIsVisible(false);
    }
    function onMouseEnter() {
      setIsVisible(true);
    }

    // Attacher aux éléments interactifs
    function attachListeners() {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [data-cursor="hover"]'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    attachListeners();

    // Observer pour les éléments ajoutés dynamiquement
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      observer.disconnect();
    };
  }, []);

  const circleSize = variant === "hover" ? 40 : variant === "click" ? 24 : 32;
  const circleOpacity = variant === "hover" ? 0.6 : 0.3;

  return (
    <>
      {/* Point central (suit le curseur précisément) */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="rounded-full bg-cyan-500"
          style={{ width: 6, height: 6 }}
        />
      </motion.div>

      {/* Cercle extérieur (suit avec lag) */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: circleX,
          y: circleY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? circleOpacity : 0,
          width: circleSize,
          height: circleSize,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-full h-full rounded-full border border-cyan-500"
          style={{
            transition: "width 0.2s, height 0.2s",
          }}
        />
      </motion.div>
    </>
  );
}
