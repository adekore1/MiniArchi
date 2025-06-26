// app/page.tsx
'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import DotWebBackground from "./components/DotParticles";

export default function LandingPage() {
  return (
    <main className="h-screen overflow-hidden flex flex-col items-center justify-center bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 px-4">

      < DotWebBackground />
    

      {/* Background Glow */}
      <motion.div 
        className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%]
         bg-sky-400 opacity-1 blur-3xl z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      />

 {/* Title */}
      <motion.h1
        className="text-5xl shadow-2xl shadow-black text-gray-200 font-bold mb-4 text-center z-10 cursor-default "
        initial={{ opacity: 0, x:105, y: -50 }}
        animate={{ opacity: 1, x:0, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        🏛️ MiniArchi
      </motion.h1>

       {/* Subtitle */}
      <motion.p
        className="text-lg text-white text-center max-w-xl mb-6 relative z-10"
        initial={{ opacity: 0, x:-105, y: 10 }}
        animate={{ opacity: 1, x:0, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Your AI-powered architectural assistant. Design advice, creative solutions, and technical insight — from tiny cabins to megastructures.
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type:"spring", delay: 0.7, duration: 0.5, damping: 3}}
        whileHover={{ scale: 1.25, rotate:2.5, backgroundColor: "#1E35CD", boxShadow: "0px 8px 24px rgba(0,0,0,0.2)" }}
        className="relative z-10"
      >
        <Link
          href="/chat"
          className="px-6 py-3 bg-blue-600 text-white rounded-md"
        >
          Click me Pls 😓
        </Link>
      </motion.button>

      <motion.p
        className="py-5 text-lg text-white text-center max-w-xl mb-6 relative z-10"
        initial={{ opacity: 0, x:-105, y: 10 }}
        animate={{ opacity: 1, x:0, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Also play with the screen by clicking on it and moving around lol, i just think it's cool
      </motion.p>

      <footer className="absolute bottom-4 text-sm text-neutral-500">
        Made with ❤️ for architects & builders
      </footer>
    </main>
  );
}

