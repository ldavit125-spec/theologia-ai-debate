'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { History, MessageSquare, ArrowRight, Calendar, Trash2, RotateCcw, AlertTriangle, Eye } from 'lucide-react';
import { SavedDebateSession } from '@/lib/data';

const HISTORY_DEBATES_STORAGE_KEY = 'theologia_debates';
const CURRENT_DEBATE_STORAGE_KEY = 'theologia_active_debate';

export default function HistoryPage() {
  const [debates, setDebates] = useState<SavedDebateSession[]>([]);
  const [selectedDebateForModal, setSelectedDebateForModal] = useState<SavedDebateSession | null>(null);

  // Load debates from localStorage
  const loadDebates = () => {
    try {
      const stored = localStorage.getItem(HISTORY_DEBATES_STORAGE_KEY);
      if (stored) {
        setDebates(JSON.parse(stored));
      } else {
        const defaultSamples: SavedDebateSession[] = [
          {
            id: 'sample-1',
            topicTitle: '악마가 없어도 인간은 악을 행할 수 있는가?',
            userPosition: '인간의 내재적 부패성과 자유의지만으로도 악은 발생할 수 있다',
            perspective: '개혁주의',
            aiRole: '반론',
            difficulty: '일반',
            date: '2026. 8. 23.',
            createdAt: Date.now() - 3600000,
            messageCount: 6,
            lastSummary: '인간 본성의 부패와 영적 악의 실재성에 대해 에베소서 6장과 로마서 본문을 대조하며 논의함.',
            messages: [
              {
                id: 'm1',
                sender: 'ai',
                timestamp: '오후 2:30',
                content: '개혁주의 관점에서 에베소서 6장과 베드로전서 5장을 바탕으로 영적 악의 실재성을 변증합니다.',
                citationVerses: [{ reference: '에베소서 6:12', text: '우리의 씨름은 혈과 육을 상대하는 것이 아니요...' }]
              },
              {
                id: 'm2',
                sender: 'user',
                timestamp: '오후 2:32',
                content: '야고보서 1장 14절에 따르면 각 사람이 시험을 받는 것은 자기 욕심에 끌려 미혹됨이라고 명시되어 있습니다.'
              }
            ]
          },
          {
            id: 'sample-2',
            topicTitle: '인간에게 자유의지가 있는가?',
            userPosition: '선행은총 안에서 인간은 복음에 인격적으로 응답할 자유가 있다',
            perspective: '감리교',
            aiRole: '지지',
            difficulty: '신학자',
            date: '2026. 8. 22.',
            createdAt: Date.now() - 86400000,
            messageCount: 8,
            lastSummary: '선행은총(Prevenient Grace)과 인격적 응답의 조화에 대해 웨슬리 신학과 성경을 심화함.',
            messages: [
              {
                id: 'm3',
                sender: 'ai',
                timestamp: '오전 11:15',
                content: '감리교 웨슬리안 관점에서 하나님의 보편적 은혜와 인간의 책임적 성화를 조명합니다.'
              }
            ]
          }
        ];
        setDebates(defaultSamples);
        localStorage.setItem(HISTORY_DEBATES_STORAGE_KEY, JSON.stringify(defaultSamples));
      }
    } catch (e) {
      console.error('Failed to load debates from storage', e);
    }
  };

  useEffect(() => {
    loadDebates();
  }, []);

  // Delete single debate
  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!confirm('이 토론 기록을 삭제하시겠습니까?')) return;
    const filtered = debates.filter(d => d.id !== id);
    setDebates(filtered);
    localStorage.setItem(HISTORY_DEBATES_STORAGE_KEY, JSON.stringify(filtered));
  };

  // Clear all debates
  const handleClearAll = () => {
    if (debates.length === 0) return;
    if (!confirm('정말로 모든 토론 기록을 영구 삭제하시겠습니까?')) return;
    setDebates([]);
    localStorage.removeItem(HISTORY_DEBATES_STORAGE_KEY);
    localStorage.removeItem(CURRENT_DEBATE_STORAGE_KEY);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header & Clear All Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A1C2C]/10 border border-[#7A1C2C]/20 text-[#7A1C2C] text-xs font-semibold">
              <History className="w-3.5 h-3.5" />
              <span>Debate Archive Storage (LocalStorage)</span>
            </div>
            <h1 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#2C2A29]">
              내 토론 기록
            </h1>
            <p className="text-[#57534E] text-sm sm:text-base leading-relaxed">
              브라우저에 보관된 최근 신학 AI 토론 기록들입니다. 언제든지 다시 보거나 이어서 토론할 수 있습니다.
            </p>
          </div>

          {debates.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleClearAll}
                className="px-4 py-2.5 rounded-xl bg-[#F7F3EB] hover:bg-red-50 hover:text-red-700 text-[#57534E] border border-[#E8E2D5] hover:border-red-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Trash2 className="w-4 h-4" />
                전체 기록 삭제
              </button>
            </div>
          )}
        </div>

        {/* Debate Cards Grid */}
        <div className="space-y-4 max-w-4xl">
          {debates.length === 0 ? (
            <div className="p-16 text-center bg-[#F7F3EB] rounded-3xl border border-[#E8E2D5] space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FDFBF7] flex items-center justify-center mx-auto text-[#78716C] border border-[#E8E2D5]">
                <History className="w-6 h-6" />
              </div>
              <p className="font-serif-kr text-lg font-bold text-[#2C2A29]">
                저장된 토론 기록이 없습니다.
              </p>
              <p className="text-xs text-[#78716C]">
                새로운 신학적 주제를 정하고 AI와 깊이 있는 토론을 시작해 보세요.
              </p>
              <Link
                href="/debate"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] text-xs font-bold hover:bg-[#9B2C3E] transition-all"
              >
                AI 토론 시작하기
              </Link>
            </div>
          ) : (
            debates.map((h) => (
              <div 
                key={h.id} 
                className="bg-[#F7F3EB] p-6 rounded-2xl border border-[#E8E2D5] space-y-4 hover:border-[#7A1C2C]/50 hover:shadow-md transition-all group"
              >
                {/* Meta Row: Badges, Date, Delete Button */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#7A1C2C] text-white">
                      {h.perspective}
                    </span>
                    {h.aiRole && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#2C2A29] text-white">
                        역할: {h.aiRole}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-[#E8E2D5] text-[#44403C]">
                      난이도: {h.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#E8E2D5] text-[#44403C]">
                      메시지 {h.messageCount}개
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#78716C]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {h.date}
                    </span>
                    <button
                      onClick={(e) => handleDelete(h.id, e)}
                      className="text-[#78716C] hover:text-red-600 p-1.5 rounded hover:bg-white transition-colors"
                      title="이 기록 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Topic Title */}
                <h2 className="font-serif-kr font-bold text-xl text-[#2C2A29] group-hover:text-[#7A1C2C] transition-colors">
                  {h.topicTitle}
                </h2>

                {/* Summary / User Position */}
                <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E8E2D5] space-y-1.5 text-xs text-[#44403C]">
                  {h.userPosition && (
                    <div>
                      <span className="font-bold text-[#2C2A29]">👤 사용자 입장: </span>
                      <span className="text-[#57534E]">{h.userPosition}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-[#7A1C2C]">💬 핵심 요약: </span>
                    <span className="text-[#57534E] leading-relaxed">{h.lastSummary}</span>
                  </div>
                </div>

                {/* Card Bottom Actions: View Details Modal or Reopen Debate */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <button
                    onClick={() => setSelectedDebateForModal(h)}
                    className="text-[#78716C] hover:text-[#2C2A29] font-medium flex items-center gap-1.5 transition-colors underline"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    대화 전문 다시 보기
                  </button>

                  <Link
                    href={`/debate?topic=${encodeURIComponent(h.topicTitle)}`}
                    className="px-4 py-2 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] font-semibold hover:bg-[#9B2C3E] transition-colors flex items-center gap-1.5 border border-[#58121E] shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    토론실 열기 / 이어서 토론
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal: Full Transcript View */}
      {selectedDebateForModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] max-w-2xl w-full max-h-[85vh] rounded-3xl border border-[#E8E2D5] shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
            
            {/* Modal Header */}
            <div className="bg-[#F7F3EB] p-5 border-b border-[#E8E2D5] flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded font-bold bg-[#7A1C2C] text-white">
                    {selectedDebateForModal.perspective}
                  </span>
                  <span className="text-[#78716C]">{selectedDebateForModal.date}</span>
                </div>
                <h3 className="font-serif-kr font-bold text-lg text-[#2C2A29]">
                  {selectedDebateForModal.topicTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDebateForModal(null)}
                className="text-[#78716C] hover:text-[#2C2A29] p-2 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Chat Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm">
              {selectedDebateForModal.messages && selectedDebateForModal.messages.length > 0 ? (
                selectedDebateForModal.messages.map((m, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border space-y-1.5 ${
                    m.sender === 'user' 
                      ? 'bg-[#7A1C2C] text-white border-[#58121E] ml-8' 
                      : 'bg-[#F7F3EB] text-[#2C2A29] border-[#E8E2D5] mr-8 font-serif-kr'
                  }`}>
                    <div className="text-[10px] font-semibold opacity-75">
                      {m.sender === 'user' ? '사용자' : `THEOLOGIA AI (${selectedDebateForModal.perspective})`} • {m.timestamp}
                    </div>
                    <div className="whitespace-pre-line leading-relaxed">{m.content}</div>
                    
                    {m.citationVerses && m.citationVerses.length > 0 && (
                      <div className="pt-2 border-t border-black/10 text-[11px] text-[#44403C]">
                        {m.citationVerses.map((v, i) => (
                          <div key={i}>📖 {v.reference}: "{v.text}"</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-[#78716C]">
                  상세 메시지 내역이 없습니다.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-[#F7F3EB] p-4 border-t border-[#E8E2D5] flex items-center justify-between">
              <button
                onClick={() => setSelectedDebateForModal(null)}
                className="px-4 py-2 rounded-xl bg-[#E8E2D5] text-[#2C2A29] text-xs font-semibold"
              >
                닫기
              </button>
              <Link
                href={`/debate?topic=${encodeURIComponent(selectedDebateForModal.topicTitle)}`}
                className="px-4 py-2 rounded-xl bg-[#7A1C2C] text-white text-xs font-semibold hover:bg-[#9B2C3E] flex items-center gap-1"
              >
                이 토론실로 이동하기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      )}

      <footer className="py-8 bg-[#FDFBF7] text-center text-xs text-[#78716C] border-t border-[#E8E2D5]">
        <p>© 2026 THEOLOGIA. All rights reserved. 로컬 저장소 기반 안전 토론 기록.</p>
      </footer>
    </div>
  );
}
