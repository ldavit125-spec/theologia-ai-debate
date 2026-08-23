import Link from 'next/link';
import { DEFAULT_TOPICS, PERSPECTIVES } from '@/lib/data';
import { ArrowRight, BookOpen, MessageSquare, ShieldCheck, Scale, Sparkles, Feather } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 border-b border-[#E8E2D5] bg-gradient-to-b from-[#FDFBF7] via-[#F7F3EB]/50 to-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A1C2C]/10 border border-[#7A1C2C]/20 text-[#7A1C2C] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>개신교 성경·신학 탐구 및 AI 지적 대화 플랫폼</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif-kr text-4xl sm:text-5xl md:text-6xl font-black text-[#2C2A29] leading-tight tracking-tight">
              성경과 개신교 신학의 깊이 있는<br />
              <span className="text-[#7A1C2C] italic">지적 대화 & 교리 탐구</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#57534E] leading-relaxed font-light">
              오직 성경(Sola Scriptura)을 중심으로 <span className="font-semibold text-[#2C2A29]">개혁주의, 루터교, 웨슬리안, 침례교, 오순절</span> 등 
              개신교 내부의 다채롭고 깊이 있는 신학 전통을 AI와 함께 자유롭게 대화하며 탐구합니다.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/debate"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] font-semibold text-lg hover:bg-[#9B2C3E] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 border border-[#58121E]"
              >
                <MessageSquare className="w-5 h-5" />
                AI 신학 대화 시작하기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/bible"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F7F3EB] text-[#2C2A29] font-medium text-lg hover:bg-[#E8E2D5] transition-all border border-[#D9D2C5] flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-[#7A1C2C]" />
                성경 66권 전체 읽기
              </Link>
            </div>

            {/* Core Values bar */}
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-t border-[#E8E2D5] mt-12">
              <div className="p-4 rounded-lg bg-[#F7F3EB]/60 border border-[#E8E2D5]">
                <ShieldCheck className="w-6 h-6 text-[#7A1C2C] mb-2" />
                <h3 className="font-serif-kr font-bold text-base text-[#2C2A29]">개신교 전통의 조명</h3>
                <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                  특정 교파 하나를 정답으로 단정하지 않고, 개혁주의, 웨슬리안, 루터교, 침례교 등 개신교 내부의 다양한 신학적 렌즈를 조명합니다.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F3EB]/60 border border-[#E8E2D5]">
                <Scale className="w-6 h-6 text-[#7A1C2C] mb-2" />
                <h3 className="font-serif-kr font-bold text-base text-[#2C2A29]">연속적인 자연스러운 대화</h3>
                <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                  고정된 템플릿 없이 이전 대화 맥락을 완벽히 이해하며 실제 사람과 대화하듯 질문과 반론을 나눕니다.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F3EB]/60 border border-[#E8E2D5]">
                <Feather className="w-6 h-6 text-[#7A1C2C] mb-2" />
                <h3 className="font-serif-kr font-bold text-base text-[#2C2A29]">성경 66권 전체 본문</h3>
                <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                  창세기부터 요한계시록까지 개역한글 공인 성경 66권 전체 장/절 본문을 온전히 열람하고 탐구합니다.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Recommended Topics Section */}
      <section id="topics" className="py-20 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#7A1C2C] font-semibold mb-2">
                Protestant Theological Inquiries
              </div>
              <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#2C2A29]">
                추천 개신교 신학 탐구 주제
              </h2>
              <p className="text-[#78716C] mt-2 text-sm sm:text-base">
                예정론, 성화, 성령의 은사, 세례관 등 개신교 사상사에서 의미 깊게 다루어져 온 핵심 질문들입니다.
              </p>
            </div>
            <Link 
              href="/debate" 
              className="mt-4 md:mt-0 text-sm font-semibold text-[#7A1C2C] hover:underline flex items-center gap-1"
            >
              자유로운 질문으로 대화하기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid of Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEFAULT_TOPICS.map((topic) => (
              <div 
                key={topic.id}
                className="bg-[#F7F3EB] rounded-xl p-6 border border-[#E8E2D5] shadow-sm hover:shadow-md hover:border-[#7A1C2C]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#78716C] mb-3">
                    <span className="px-2.5 py-1 rounded bg-[#E8E2D5] font-medium text-[#44403C]">
                      {topic.category}
                    </span>
                    <span className="flex items-center gap-1 text-[#78716C]">
                      🔥 {topic.popularCount.toLocaleString()}회 대화
                    </span>
                  </div>

                  <h3 className="font-serif-kr font-bold text-xl text-[#2C2A29] group-hover:text-[#7A1C2C] transition-colors mb-3">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                    {topic.description}
                  </p>

                  {/* Related Verses */}
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-[#78716C] block mb-1.5">
                      관련 성경 구절:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.verses.map((verse, idx) => (
                        <span key={idx} className="text-[11px] bg-[#E8E2D5]/70 text-[#44403C] px-2 py-0.5 rounded">
                          {verse}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {topic.perspectives.slice(0, 2).map((p, idx) => (
                      <span key={idx} className="text-[10px] text-[#7A1C2C] bg-[#7A1C2C]/10 px-1.5 py-0.5 rounded font-medium">
                        {p}
                      </span>
                    ))}
                    {topic.perspectives.length > 2 && (
                      <span className="text-[10px] text-[#78716C] bg-[#E8E2D5] px-1.5 py-0.5 rounded">
                        +{topic.perspectives.length - 2}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/debate?topic=${encodeURIComponent(topic.title)}`}
                    className="px-3.5 py-1.5 rounded-md bg-[#7A1C2C] text-[#FDFBF7] text-xs font-semibold hover:bg-[#9B2C3E] transition-colors flex items-center gap-1"
                  >
                    대화 시작 <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theological Perspectives Banner */}
      <section className="py-16 bg-[#F7F3EB] border-t border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif-kr text-2xl sm:text-3xl font-bold text-[#2C2A29]">
              주요 개신교 신학 전통
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] mt-2">
              오직 성경 안에서 고백되어 온 개신교 내부의 다채롭고 풍성한 신학적 유산을 탐구합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PERSPECTIVES.map((p) => (
              <div key={p.name} className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E8E2D5] shadow-2xs">
                <div className="font-serif-kr font-bold text-base text-[#7A1C2C] mb-1">
                  {p.name}
                </div>
                <div className="text-[11px] font-medium text-[#44403C] mb-1">
                  {p.keyEmphasis}
                </div>
                <div className="text-[10px] text-[#78716C] line-clamp-2 leading-relaxed">
                  {p.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-[#FDFBF7] text-center text-xs text-[#78716C] border-t border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-serif-kr text-[#7A1C2C] font-semibold text-sm mb-2">THEOLOGIA</p>
          <p>© 2026 THEOLOGIA. All rights reserved. 개신교 성경·신학 탐구 및 AI 대화 플랫폼.</p>
        </div>
      </footer>
    </div>
  );
}
