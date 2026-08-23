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
              <span>기독교 교리 & 성경 AI 지적 토론 플랫폼</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif-kr text-4xl sm:text-5xl md:text-6xl font-black text-[#2C2A29] leading-tight tracking-tight">
              신학적 지성과 깊이 있는<br />
              <span className="text-[#7A1C2C] italic">AI 변증 및 교리 토론</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#57534E] leading-relaxed font-light">
              단순한 챗봇 질문답변을 넘어, 사용자가 설정한 <span className="font-semibold text-[#2C2A29]">신학적 관점</span>과 <span className="font-semibold text-[#2C2A29]">입장</span>에 맞추어 
              교파별 정통 교리에 근거해 짚어주는 다각도 신학 토론실입니다.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/debate"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] font-semibold text-lg hover:bg-[#9B2C3E] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 border border-[#58121E]"
              >
                <MessageSquare className="w-5 h-5" />
                AI 토론 시작하기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#topics"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F7F3EB] text-[#2C2A29] font-medium text-lg hover:bg-[#E8E2D5] transition-all border border-[#D9D2C5] flex items-center justify-center gap-2"
              >
                추천 주제 살펴보기
              </Link>
            </div>

            {/* Core Values / Features bar */}
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-t border-[#E8E2D5] mt-12">
              <div className="p-4 rounded-lg bg-[#F7F3EB]/60 border border-[#E8E2D5]">
                <ShieldCheck className="w-6 h-6 text-[#7A1C2C] mb-2" />
                <h3 className="font-serif-kr font-bold text-base text-[#2C2A29]">교파별 객관적 비교</h3>
                <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                  특정 전통을 절대 정답으로 강요하지 않고 개혁주의, 루터교, 가톨릭, 성공회 등 각 교파의 시각을 조명합니다.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F3EB]/60 border border-[#E8E2D5]">
                <Scale className="w-6 h-6 text-[#7A1C2C] mb-2" />
                <h3 className="font-serif-kr font-bold text-base text-[#2C2A29]">맞춤형 입장 & 난이도</h3>
                <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                  입문자부터 전문 신학자 수준까지, 사용자 입장 대 AI 반론 구도를 자율적으로 구성합니다.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F3EB]/60 border border-[#E8E2D5]">
                <Feather className="w-6 h-6 text-[#7A1C2C] mb-2" />
                <h3 className="font-serif-kr font-bold text-base text-[#2C2A29]">엄밀한 성경 텍스트</h3>
                <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                  성경 구절을 자의적으로 왜곡하거나 환각(Hallucination)하지 않고 정확한 말씀 근거를 활용합니다.
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
                Core Theological Questions
              </div>
              <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#2C2A29]">
                추천 신학 토론 주제
              </h2>
              <p className="text-[#78716C] mt-2 text-sm sm:text-base">
                기독교 역사를 통틀어 가장 치열하게 논의되어 온 핵심 교리적 주제들을 탐구해 보세요.
              </p>
            </div>
            <Link 
              href="/debate" 
              className="mt-4 md:mt-0 text-sm font-semibold text-[#7A1C2C] hover:underline flex items-center gap-1"
            >
              직접 주제 입력하여 토론하기 <ArrowRight className="w-4 h-4" />
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
                      🔥 {topic.popularCount.toLocaleString()}회 토론
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
                  <div className="flex gap-1">
                    {topic.perspectives.slice(0, 3).map((p, idx) => (
                      <span key={idx} className="text-[10px] text-[#7A1C2C] bg-[#7A1C2C]/10 px-1.5 py-0.5 rounded font-medium">
                        {p}
                      </span>
                    ))}
                    {topic.perspectives.length > 3 && (
                      <span className="text-[10px] text-[#78716C] bg-[#E8E2D5] px-1.5 py-0.5 rounded">
                        +{topic.perspectives.length - 3}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/debate?topic=${encodeURIComponent(topic.title)}`}
                    className="px-3.5 py-1.5 rounded-md bg-[#7A1C2C] text-[#FDFBF7] text-xs font-semibold hover:bg-[#9B2C3E] transition-colors flex items-center gap-1"
                  >
                    토론 <ArrowRight className="w-3 h-3" />
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
              지원하는 8가지 신학적 관점
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] mt-2">
              교파 고유의 렌즈를 통해 동일한 성경적 명제를 보다 깊고 다양하게 재조명합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PERSPECTIVES.map((p) => (
              <div key={p.name} className="p-4 rounded-lg bg-[#FDFBF7] border border-[#E8E2D5]">
                <div className="font-serif-kr font-bold text-base text-[#7A1C2C] mb-1">
                  {p.name}
                </div>
                <div className="text-[11px] font-medium text-[#44403C] mb-1">
                  {p.keyEmphasis}
                </div>
                <div className="text-[10px] text-[#78716C] line-clamp-2">
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
          <p>© 2026 THEOLOGIA Lab. All rights reserved. 성경적 변증과 교리 토론을 위한 AI 연구 공간입니다.</p>
        </div>
      </footer>
    </div>
  );
}
