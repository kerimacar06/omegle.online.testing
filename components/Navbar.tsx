"use client";

import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  isSticky?: boolean; // Sadece ana sayfada true olacak
}

export default function Navbar({ isSticky = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={`
        w-full band-white border-b border-v6-line shrink-0 transition-all duration-300 relative
        ${isSticky ? 'sticky top-0 z-50' : ''}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group relative z-10">
          <span className="ch-display text-lg sm:text-xl font-bold text-v6-ink tracking-tight">
            omegletest<span className="text-v6-coral">.</span>
          </span>
        </Link>

        {/* MASAÜSTÜ MENÜ LİNKLERİ */}
        <div className="hidden lg:flex flex-row items-center gap-7 text-v6-ink-2 font-semibold text-sm">
          <Link href="/" className="hover:text-v6-coral transition-colors duration-200">Home</Link>
          <Link href="/apps" className="hover:text-v6-coral transition-colors duration-200">Apps</Link>
          <Link href="/privacy" className="hover:text-v6-coral transition-colors duration-200">Privacy</Link>
          <Link href="/terms" className="hover:text-v6-coral transition-colors duration-200">Terms</Link>
          <Link href="/contact" className="hover:text-v6-coral transition-colors duration-200">Contact</Link>
          <Link href="/live-video" className="ch-btn font-bold text-sm px-5 py-2.5">
            Start Chat
          </Link>
        </div>

        {/* MOBİL HAMBURGER */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden relative z-10 p-2 text-v6-ink hover:text-v6-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-v6-coral rounded-md transition-colors touch-manipulation"
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBİL AÇILIR MENÜ */}
      <div
        className={`
          lg:hidden absolute left-0 right-0 top-[100%] band-white border-b border-v6-line shadow-xl
          overflow-hidden transition-all duration-300 ease-in-out z-40
          ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col items-center gap-0 text-v6-ink font-bold text-base py-4">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-v6-cream hover:text-v6-coral transition-colors">Home</Link>
          <Link href="/apps" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-v6-cream hover:text-v6-coral transition-colors">Apps</Link>
          <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-v6-cream hover:text-v6-coral transition-colors">Privacy</Link>
          <Link href="/terms" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-v6-cream hover:text-v6-coral transition-colors">Terms</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-v6-cream hover:text-v6-coral transition-colors">Contact</Link>
          <Link href="/live-video" onClick={() => setIsMenuOpen(false)} className="mt-3 ch-btn font-bold px-6 py-2.5">Start Chat</Link>
        </div>
      </div>

    </nav>
  );
}
