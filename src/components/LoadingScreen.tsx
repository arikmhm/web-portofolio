"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-gray-100 transition-opacity duration-500 ${
        !show ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="mb-4 text-xl font-light tracking-wide">Loading........</div>
      <div className="relative h-[2px] w-[200px] overflow-hidden bg-gray-900">
        <div className="h-full w-[40%] animate-loading-bar bg-white shadow-[0_0_15px_#3b82f6]" />
      </div>
    </div>
  );
}
