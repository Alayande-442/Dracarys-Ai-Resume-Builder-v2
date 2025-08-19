"use client";

import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Blob 1 */}
      <motion.div
        className="absolute left-[20%] top-[30%] h-[300px] w-[300px] rounded-full bg-blue-600/50 blur-2xl will-change-transform"
        initial={{ opacity: 0 }}
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.5, 0.7, 0.5, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className="absolute right-[20%] top-[40%] h-[400px] w-[400px] rounded-full bg-indigo-600/50 blur-3xl will-change-transform"
        initial={{ opacity: 0 }}
        animate={{
          x: [0, -80, 80, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.15, 0.9, 1],
          opacity: [0.5, 0.7, 0.5, 0.5],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
