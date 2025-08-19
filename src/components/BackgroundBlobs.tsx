"use client";

import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-black/95" />
      
      {/* Noise texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBvcGFjaXR5PSIwLjAzIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuMDEiIG51bU9jdGF2ZXM9IjEwIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIvPjwvc3ZnPg==')]" />

      {/* Blob 1 */}
      <motion.div
        className="absolute left-[15%] top-[25%] h-[350px] w-[350px] rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl border border-white/10 shadow-2xl will-change-transform"
        initial={{ opacity: 0 }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 1.15, 0.9, 1],
          opacity: [0.6, 0.9, 0.7, 0.6],
          rotate: [0, 10, -5, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className="absolute right-[15%] top-[35%] h-[450px] w-[450px] rounded-full bg-gradient-to-br from-purple-600/15 to-pink-600/15 backdrop-blur-xl border border-white/10 shadow-2xl will-change-transform"
        initial={{ opacity: 0 }}
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.2, 0.85, 1],
          opacity: [0.6, 0.9, 0.7, 0.6],
          rotate: [0, -15, 10, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Additional small blobs */}
      <motion.div 
        className="absolute left-[5%] top-[60%] h-[200px] w-[200px] rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-lg border border-white/5 shadow-lg will-change-transform"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.4, 0.7, 0.5, 0.4],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
}
