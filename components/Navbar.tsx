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
        w-full border-b border-neon-line shrink-0 transition-all duration-300 relative z-50 backdrop-blur-md bg-neon-bg/80
        ${isSticky ? 'sticky top-0' : ''}
      `}
    >
      {/* 
        Masaüstü ve Mobil Ana Konteyner 
        Mobilde sadece Logo ve Hamburger butonu yan yana durur.
      */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm bg-gradient-to-br from-neon-cyan to-neon-violet">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-2 h-2 bg-neon-bg rounded-full"></div>
              <div className="w-2 h-2 bg-neon-bg rounded-full"></div>
              <div className="w-2 h-2 bg-neon-bg rounded-full"></div>
              <div className="w-2 h-2 bg-neon-bg rounded-full"></div>
            </div>
          </div>
          <span className="text-xl font-extrabold text-neon-ink tracking-tight">
            omegletest.online
          </span>
        </Link>

        {/* MASAÜSTÜ MENÜ LİNKLERİ (Mobilde tamamen gizlenir: hidden sm:flex) */}
        <div className="hidden sm:flex flex-row items-center gap-6 text-neon-ink-2 font-semibold text-sm">
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-neon-cyan transition-colors duration-200">Home</Link>
            <Link href="/apps" className="hover:text-neon-cyan transition-colors duration-200">Apps</Link>
            <Link href="/privacy" className="hover:text-neon-cyan transition-colors duration-200">Privacy</Link>
            <Link href="/terms" className="hover:text-neon-cyan transition-colors duration-200">Terms</Link>
            <Link href="/contact" className="hover:text-neon-cyan transition-colors duration-200">Contact</Link>
          </div>

          {/* DİL SEÇİCİ (Masaüstü) */}
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-neon-cyan transition-colors pl-6 border-l border-neon-line group relative">
            <svg className="w-5 h-5 text-neon-ink-3 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="font-bold">EN</span>
            <svg className="w-4 h-4 text-neon-ink-3 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        {/* MOBİL HAMBURGER BUTONU (Masaüstünde tamamen gizlenir: sm:hidden) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden relative z-10 p-2 text-neon-ink-2 hover:text-neon-cyan focus:outline-none transition-colors touch-manipulation"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            // X İkonu (Menü açıkken)
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger İkonu (Menü kapalıyken)
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBİL AÇILIR MENÜ EKRANI (Animasyonlu Dropdown) */}
      <div
        className={`
          sm:hidden absolute left-0 right-0 top-[100%] bg-neon-bg/95 backdrop-blur-md border-b border-neon-line shadow-xl
          overflow-hidden transition-all duration-300 ease-in-out z-40
          ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col items-center gap-0 text-neon-ink-2 font-bold text-base py-4">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-neon-surface hover:text-neon-cyan transition-colors">Home</Link>
          <Link href="/apps" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-neon-surface hover:text-neon-cyan transition-colors">Apps</Link>
          <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-neon-surface hover:text-neon-cyan transition-colors">Privacy</Link>
          <Link href="/terms" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-neon-surface hover:text-neon-cyan transition-colors">Terms</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-3 hover:bg-neon-surface hover:text-neon-cyan transition-colors">Contact</Link>

          <div className="w-16 h-px bg-neon-line my-2"></div>

          {/* DİL SEÇİCİ (Mobil Açılır Menü İçi) */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-neon-cyan transition-colors py-3 group">
            <svg className="w-5 h-5 text-neon-ink-3 group-hover:text-neon-cyan" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="font-extrabold text-neon-ink">EN</span>
            <svg className="w-4 h-4 text-neon-ink-3 group-hover:text-neon-cyan" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
      
    </nav>
  );
}