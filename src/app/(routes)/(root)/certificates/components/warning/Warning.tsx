"use client";

import { useEffect, useState } from "react";

export function Warning() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize(); // Verifica al montar

    window.addEventListener("resize", checkScreenSize); // Escucha cambios

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Limpieza
    };
  }, []);

  if (!isSmallScreen) return null;

  return (
    <p className="text-sm text-violet-500 mt-3 text-center">
      Para una mejor experiencia visual y descarga óptima, recomendamos usar una pantalla grande.
    </p>
  );
}