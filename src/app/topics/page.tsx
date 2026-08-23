import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { DEFAULT_TOPICS, PERSPECTIVES } from '@/lib/data';
import { ArrowRight, BookOpen, Scroll, MessageSquare, PlusCircle } from 'lucide-react';

export default function TopicsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A1C2C]/10 border border-[#7A1C2C]/20 text-[#7A1C2C] text-xs font-semibold">
            <Scroll className="w-3.5 h-3.5" />
            <span>Theological Questions Archive</span>
          </div>
          <h1 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#2C2A29]">
            신학 및 교리 토론 주제
          </h1>
          <p className="text-[#57534E] text-base leading-relaxed">
            기독교 사상사에서 논쟁의 중심이 되어 온 핵심 쟁점들입니다. 추천 주제를 선택하거나 직접 원하는 자유 주제를 작성해 토론해 보세요.
          </p>
          
          <div className="pt-2">
            <Link
              href="/debate"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] text-xs font-semibold hover:bg-[#9B2C3E] transition-all border border-[#58121E]"
            >
              <PlusCircle className="w-4 h-4" />
              나만의 자유 주제로 토론 열기
            </Link>
          </div>
        </div>

        {/* Topics List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEFAULT_TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="bg-[#F7F3EB] rounded-2xl p-6 border border-[#E8E2D5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-md bg-[#E8E2D5] text-[#44403C]">
                    {topic.category}
                  </span>
                  <span className="text-xs text-[#78716C] font-medium">
                    누적 토론 {topic.popularCount.toLocaleString()}회
                  </span>
                </div>

                <h2 className="font-serif-kr font-bold text-xl text-[#2C2A29]">
                  {topic.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  {topic.description}
                </p>

                {/* Verses */}
                <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E8E2D5] space-y-1">
                  <div className="text-[11px] font-semibold text-[#7A1C2C] flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> 주요 관련 성경 구절
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {topic.verses.map((v, idx) => (
                      <span key={idx} className="text-xs bg-[#E8E2D5]/70 text-[#2C2A29] px-2 py-0.5 rounded">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Perspectives badge */}
                <div>
                  <span className="text-[11px] text-[#78716C] block mb-1">
                    관련 신학 전통:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.perspectives.map((p, idx) => (
                      <span key={idx} className="text-xs bg-[#7A1C2C]/10 text-[#7A1C2C] px-2.5 py-0.5 rounded font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8E2D5] flex items-center justify-end">
                <Link
                  href={`/debate?topic=${encodeURIComponent(topic.title)}`}
                  className="px-5 py-2.5 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] font-semibold text-xs hover:bg-[#9B2C3E] transition-colors flex items-center gap-2 border border-[#58121E]"
                >
                  <MessageSquare className="w-4 h-4" />
                  이 주제로 AI 토론하기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-8 bg-[#FDFBF7] text-center text-xs text-[#78716C] border-t border-[#E8E2D5]">
        <p>© 2026 THEOLOGIA. All rights reserved.</p>
      </footer>
    </div>
  );
}
