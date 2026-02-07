"use client";

import React from 'react';

const Header = () => {
  return (
    <header
      className="fixed top-0 left-0 w-full z-[100] flex justify-between items-start px-[2rem] pt-[1.1rem] mix-blend-difference"
      style={{
        color: 'var(--color-white, #ffffff)',
        fontFamily: '"Inter", sans-serif'
      }}
    >
      {/* Animated Double-Layered Logo */}
      <a href="/" className="group relative block overflow-hidden">
        <div className="flex flex-col text-[1.8rem] leading-[0.9] font-black uppercase tracking-tighter">
          {/* Upper Logo Layer */}
          <div className="relative overflow-hidden h-[0.9em]">
            <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
              <div className="flex">
                <span>I</span><span>n</span><span>n</span><span>v</span><span>e</span><span>r</span><span>a</span>
              </div>
            </div>
            <div className="absolute top-0 left-0 transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0">
              <div className="flex">
                <span>I</span><span>n</span><span>n</span><span>v</span><span>e</span><span>r</span><span>a</span>
              </div>
            </div>
          </div>

          {/* Lower Logo Layer */}
          <div className="relative overflow-hidden h-[0.9em]">
            <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
              <div className="flex">
                <span>I</span><span>n</span><span>n</span><span>v</span><span>e</span><span>r</span><span>a</span>
              </div>
            </div>
            <div className="absolute top-0 left-0 transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0">
              <div className="flex">
                <span>I</span><span>n</span><span>n</span><span>v</span><span>e</span><span>r</span><span>a</span>
              </div>
            </div>
          </div>
        </div>
      </a>

      {/* Minimalist Text-Based Menu */}
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-[4vw] text-[1.4rem] font-medium tracking-tight">
          <li>
            <a
              href="/the-project"
              className="relative py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-current before:transition-all before:duration-300 hover:before:w-full"
            >
              The project
            </a>
          </li>
          <li>
            <a
              href="/impact-in-action"
              className="relative py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-current before:transition-all before:duration-300 hover:before:w-full"
            >
              Impact in Action
            </a>
          </li>
          <li>
            <a
              href="/join"
              className="relative py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-current before:transition-all before:duration-300 hover:before:w-full"
            >
              Join the Journey
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Trigger (Subtle placeholder based on high-level design) */}
      <div className="lg:hidden flex flex-col gap-1.5 cursor-pointer p-2">
        <div className="w-6 h-[1px] bg-white"></div>
        <div className="w-6 h-[1px] bg-white"></div>
      </div>
    </header>
  );
};

export default Header;