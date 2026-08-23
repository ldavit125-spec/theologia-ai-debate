'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { History, MessageSquare, ArrowRight, Calendar, Trash2, RotateCcw, Eye, BookMarked } from 'lucide-react';
import { SavedDebateSession } from '@/lib/data';

const HISTORY_DEBATES_STORAGE_KEY = 'theologia_debates';
const CURRENT_DEBATE_STORAGE_KEY = 'theologia_active_debate';

export default function HistoryPage() {
  const [debates, setDebates] = useState<SavedDebateSession[]>([]);
  const [selectedDebateForModal, setSelectedDebateForModal] = useState<SavedDebateSession | null>(null);

  const loadDebates = () => {
    try {
      const stored = localStorage.getItem(HISTORY_DEBATES_STORAGE_KEY);
      if (stored) {
        setDebates(JSON.parse(stored));
      } else {
        const defaultSamples: SavedDebateSession[] = [
          {
            id: 'sample-1',
            topicTitle: '우치무라 간조의 사상 핵심이 뭐야?',
            userPosition: '우치무라 간조의 사상 핵심이 뭐야?',
            perspective: '초교파',
            difficulty: '일반',
            date: '2026. 8. 23.',
            createdAt: Date.now() - 3600000,
            messageCount: 4,
            lastSummary: '우치무라 간조의 무교회주의 사상 핵심과 개혁주의/가톨릭과의 대화적 고찰.',
            messages: [
              {
                id: 'm1',
                sender: 'user',
                timestamp: '오후 3:45',
                content: '우치무라 간조의 사상 핵심이 뭐야?'
              },
              {
                id: 'm2',
                sender: 'ai',
                timestamp: '오후 3:45',
                content: '우치무라 간조(內村鑑三)의 사상은 한마디로 "제도와 교리를 넘어선 살아있는 십자가 복음으로의 회귀"라고 볼 수 있습니다.\n\n그는 제도화된 교회와 교파주의를 비판하고 오직 성경과 십자가 신앙, 신자의 영적 자율성을 강조했습니다.'
              },
              {
                id: 'm3',
                sender: 'user',
                timestamp: '오후 3:47',
                content: '가톨릭이랑 토론시켜봐'
              },
              {
                id: 'm4',
                sender: 'ai',
                timestamp: '오후 3:47',
                content: '가톨릭: "2천 년 동안 성령의 인도로 보존되어 온 교회의 거룩한 전통과 성체성사를 떠나서는 온전한 신앙의 일치를 이루기 어렵습니다."\n\n무교회주의 (우치무라 간조): "하지만 교황 제도나 사제직이 그리스도와 신자 사이를 가로막는다면 그것은 오히려 복음의 자유를 훼손하는 것 아닙니까?"'
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

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!confirm('이 대화 기록을 삭제하시겠습니까?')) return;
    const filtered = debates.filter(d => d.id !== id);
    setDebates(filtered);
    localStorage.setItem(HISTORY_DEBATES_STORAGE_KEY, JSON.stringify(filtered));
  };

  const handleClearAll = () => {
    if (debates.length === 0) return;
    if (!confirm('정말로 모든 대화 기록을 영구 삭제하시겠습니까?')) return;
    setDebates([]);
    localStorage.removeItem(HISTORY_DEBATES_STORAGE_KEY);
    localStorage.removeItem(CURRENT_DEBATE_STORAGE_KEY);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A1C2C]/10 border border-[#7A1C2C]/20 text-[#7A1C2C] text-xs font-semibold">
              <History className="w-3.5 h-3.5" />
              <span>Theology Dialogue Archive</span>
            </div>
            <h1 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#2C2A29]">
              내 신학 대화 기록
            </h1>
            <p className="text-[#57534E] text-sm sm:text-base leading-relaxed">
              브라우저에 보관된 이전 성경·신학 대화 목록입니다. 언제든지 다시 보거나 이어서 질문할 수 있습니다.
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
        <div className="space-y-4">
          {debates.length === 0 ? (
            <div className="p-16 text-center bg-[#F7F3EB] rounded-3xl border border-[#E8E2D5] space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FDFBF7] flex items-center justify-center mx-auto text-[#78716C] border border-[#E8E2D5]">
                <History className="w-6 h-6" />
              </div>
              <p className="font-serif-kr text-lg font-bold text-[#2C2A29]">
                저장된 대화 기록이 없습니다.
              </p>
              <p className="text-xs text-[#78716C]">
                신학적 의문이나 궁금한 점을 AI에게 자유롭게 질문해 보세요.
              </p>
              <Link
                href="/debate"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] text-xs font-bold hover:bg-[#9B2C3E] transition-all"
              >
                대화 시작하기
              </Link>
            </div>
          ) : (
            debates.map((h) => (
              <div 
                key={h.id} 
                className="bg-[#F7F3EB] p-6 rounded-2xl border border-[#E8E2D5] space-y-3 hover:border-[#7A1C2C]/50 hover:shadow-md transition-all group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#7A1C2C] text-white">
                    대화 기록
                  </span>

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

                <h2 className="font-serif-kr font-bold text-xl text-[#2C2A29] group-hover:text-[#7A1C2C] transition-colors">
                  {h.topicTitle}
                </h2>

                <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E8E2D5] text-xs text-[#57534E] leading-relaxed line-clamp-2">
                  {h.lastSummary}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <button
                    onClick={() => setSelectedDebateForModal(h)}
                    className="text-[#78716C] hover:text-[#2C2A29] font-medium flex items-center gap-1.5 transition-colors underline"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    대화 전문 보기
                  </button>

                  <Link
                    href={`/debate?topic=${encodeURIComponent(h.topicTitle)}`}
                    className="px-4 py-2 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] font-semibold hover:bg-[#9B2C3E] transition-colors flex items-center gap-1.5 border border-[#58121E] shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    이어서 질문하기
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
            
            <div className="bg-[#F7F3EB] p-5 border-b border-[#E8E2D5] flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-[#78716C]">{selectedDebateForModal.date}</span>
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

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm">
              {selectedDebateForModal.messages && selectedDebateForModal.messages.length > 0 ? (
                selectedDebateForModal.messages.map((m, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border ${m.sender === 'user' ? 'bg-[#7A1C2C] text-white ml-6' : 'bg-[#F7F3EB] text-[#2C2A29] mr-6 font-serif-kr whitespace-pre-line leading-relaxed'}`}>
                    <span className="font-bold text-[10px] block opacity-80 mb-1">
                      {m.sender === 'user' ? '사용자' : 'THEOLOGIA AI'} • {m.timestamp}
                    </span>
                    {m.content}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-[#78716C]">
                  상세 메시지 내역이 없습니다.
                </div>
              )}
            </div>

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
                이 대화로 이동 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      )}

      <footer className="py-8 bg-[#FDFBF7] text-center text-xs text-[#78716C] border-t border-[#E8E2D5]">
        <p>© 2026 THEOLOGIA. All rights reserved.</p>
      </footer>
    </div>
  );
}
