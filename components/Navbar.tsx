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
        w-full bg-pc-paper border-b-2 border-dashed border-pc-line shrink-0 transition-all duration-300 relative
        ${isSticky ? 'sticky top-0 z-50' : ''}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group relative z-10">
          <div className="pc-stamp w-9 h-9 flex items-center justify-center text-pc-rust shrink-0 -rotate-6 group-hover:rotate-0 transition-transform">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" /></svg>
          </div>
          <span className="pc-display text-lg sm:text-xl text-pc-ink tracking-tight">
            omegletest.online
          </span>
        </Link>

        {/* MASAÜSTÜ MENÜ LİNKLERİ */}
        <div className="hidden lg:flex flex-row items-center gap-7 text-pc-ink-2 font-semibold text-sm">
          <Link href="/" className="hover:text-pc-rust transition-colors duration-200">Home</Link>
          <Link href="/apps" className="hover:text-pc-rust transition-colors duration-200">Apps</Link>
          <Link href="/privacy" className="hover:text-pc-rust transition-colors duration-200">Privacy</Link>
          <Link href="/terms" className="hover:text-pc-rust transition-colors duration-200">Terms</Link>
          <Link href="/contact" className="hover:text-pc-rust transition-colors duration-200">Contact</Link>
          <Link href="/live-video" className="pc-btn font-bold text-sm px-5 py-2.5">
            Start Chat
          </Link>
        </div>

        {/* MOBİL HAMBURGER */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden relative z-10 p-2 text-pc-ink hover:text-pc-rust focus:outline-none focus-visible:ring-2 focus-visible:ring-pc-rust rounded-md transition-colors touch-manipulation"
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
          lg:hidden absolute left-0 right-0 top-[100%] bg-pc-paper border-b-2 border-dashed border-pc-line shadow-xl
          overflow-hidden transition-all duration-300 ease-in-out z-40
          ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col items-center gap-0 text-pc-ink font-bold text-base py-4">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-pc-card hover:text-pc-rust transition-colors">Home</Link>
          <Link href="/apps" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-pc-card hover:text-pc-rust transition-colors">Apps</Link>
          <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-pc-card hover:text-pc-rust transition-colors">Privacy</Link>
          <Link href="/terms" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-pc-card hover:text-pc-rust transition-colors">Terms</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-pc-card hover:text-pc-rust transition-colors">Contact</Link>
          <Link href="/live-video" onClick={() => setIsMenuOpen(false)} className="mt-3 pc-btn font-bold px-6 py-2.5">Start Chat</Link>
        </div>
      </div>

    </nav>
  );
}
