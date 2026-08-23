'use client';
import Link from 'next/link';
import { BookOpen, MessageSquare, Compass, Scroll, History, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8E2D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#7A1C2C] text-[#FDFBF7] flex items-center justify-center font-serif-kr text-xl font-bold shadow-md group-hover:bg-[#9B2C3E] transition-colors border border-[#58121E]">
              Ω
            </div>
            <div className="flex flex-col">
              <span className="font-serif-kr text-2xl font-black tracking-widest text-[#7A1C2C] group-hover:text-[#9B2C3E] transition-colors">
                THEOLOGIA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#78716C] font-semibold">
                Christian AI Theology Lab
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-[#44403C] hover:text-[#7A1C2C] font-medium text-sm transition-colors flex items-center gap-1.5 py-1 border-b-2 border-transparent hover:border-[#7A1C2C]"
            >
              <Compass className="w-4 h-4" />
              홈
            </Link>
            <Link 
              href="/debate" 
              className="text-[#44403C] hover:text-[#7A1C2C] font-medium text-sm transition-colors flex items-center gap-1.5 py-1 border-b-2 border-transparent hover:border-[#7A1C2C]"
            >
              <MessageSquare className="w-4 h-4 text-[#7A1C2C]" />
              AI 토론
            </Link>
            <Link 
              href="/topics" 
              className="text-[#44403C] hover:text-[#7A1C2C] font-medium text-sm transition-colors flex items-center gap-1.5 py-1 border-b-2 border-transparent hover:border-[#7A1C2C]"
            >
              <Scroll className="w-4 h-4" />
              토론 주제
            </Link>
            <Link 
              href="/bible" 
              className="text-[#44403C] hover:text-[#7A1C2C] font-medium text-sm transition-colors flex items-center gap-1.5 py-1 border-b-2 border-transparent hover:border-[#7A1C2C]"
            >
              <BookOpen className="w-4 h-4" />
              성경 탐구
            </Link>
            <Link 
              href="/history" 
              className="text-[#44403C] hover:text-[#7A1C2C] font-medium text-sm transition-colors flex items-center gap-1.5 py-1 border-b-2 border-transparent hover:border-[#7A1C2C]"
            >
              <History className="w-4 h-4" />
              내 토론 기록
            </Link>
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/debate" 
              className="px-5 py-2.5 rounded-lg bg-[#7A1C2C] text-[#FDFBF7] font-medium text-sm hover:bg-[#9B2C3E] transition-all shadow-sm hover:shadow flex items-center gap-2 border border-[#58121E]"
            >
              <MessageSquare className="w-4 h-4" />
              토론 시작하기
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#44403C] hover:text-[#7A1C2C] hover:bg-[#F7F3EB] transition-colors"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-[#E8E2D5] px-4 pt-2 pb-6 space-y-3">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#44403C] hover:bg-[#F7F3EB] hover:text-[#7A1C2C]"
          >
            홈
          </Link>
          <Link 
            href="/debate" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#7A1C2C] bg-[#F7F3EB]"
          >
            AI 토론 시작
          </Link>
          <Link 
            href="/topics" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#44403C] hover:bg-[#F7F3EB] hover:text-[#7A1C2C]"
          >
            토론 주제
          </Link>
          <Link 
            href="/bible" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#44403C] hover:bg-[#F7F3EB] hover:text-[#7A1C2C]"
          >
            성경 탐구
          </Link>
          <Link 
            href="/history" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#44403C] hover:bg-[#F7F3EB] hover:text-[#7A1C2C]"
          >
            내 토론 기록
          </Link>
        </div>
      )}
    </header>
  );
}
