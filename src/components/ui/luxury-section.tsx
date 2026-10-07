'use client';

import { motion } from 'motion/react';

export default function LuxurySection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={`relative py-24 overflow-hidden luxury-gradient ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
      <div className="absolute inset-0 bg-black/40 z-0" />
    </section>
  );
}
