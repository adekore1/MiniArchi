'use client'
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 px-4">
      
      <motion.h1
        className="text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🏛️ MiniArchi
      </motion.h1>

      <p className="text-lg text-center max-w-xl mb-6">
        Your AI-powered architectural assistant — offering expert design advice, 
        creative solutions, and deep insights for any project, from a cozy home 
        to a megastructure.
      </p>
      <a
        href="/chat"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Start Chatting
      </a>

      <footer className="absolute bottom-4 text-sm text-neutral-500">
        Made with ❤️ for architects & builders
      </footer>
    </main>
  );
}

