'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { 
  PERSPECTIVES, 
  DIFFICULTIES, 
  DEFAULT_TOPICS, 
  AI_ROLES,
  PerspectiveType, 
  DifficultyLevel, 
  AiRoleType,
  DebateMessage,
  SavedDebateSession 
} from '@/lib/data';
import { DebateApiResponse } from '@/lib/debateService';
import { 
  Send, 
  Settings, 
  Sparkles, 
  User, 
  Bot, 
  BookMarked, 
  Flame, 
  StopCircle, 
  PlusCircle, 
  CheckCircle2,
  Sparkle
} from 'lucide-react';

const CURRENT_DEBATE_STORAGE_KEY = 'theologia_active_debate';
const HISTORY_DEBATES_STORAGE_KEY = 'theologia_debates';

function DebateContent() {
  const searchParams = useSearchParams();
  const initialTopicQuery = searchParams.get('topic');

  // 1. Topic State
  const [topicInput, setTopicInput] = useState(
    initialTopicQuery || '인간에게 자유의지가 있다면 하나님의 예정과 모순되는 것 아닌가?'
  );

  // 2. User Position
  const [userPosition, setUserPosition] = useState(
    '예정론과 자유의지에 대한 개신교 신학적 입장을 알고 싶습니다'
  );

  // 3. Settings (Protestant default)
  const [aiRole, setAiRole] = useState<AiRoleType>('자유토론');
  const [perspective, setPerspective] = useState<PerspectiveType>('초교파 복음주의');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('일반');

  // Debate State
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // 4. Debate Messages (Clean and natural conversation)
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveBannerVisible, setSaveBannerVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load from localStorage or URL query
  useEffect(() => {
    try {
      if (initialTopicQuery) {
        setTopicInput(initialTopicQuery);
        const historyRaw = localStorage.getItem(HISTORY_DEBATES_STORAGE_KEY);
        if (historyRaw) {
          const histories: SavedDebateSession[] = JSON.parse(historyRaw);
          const matched = histories.find(h => h.topicTitle === initialTopicQuery);
          if (matched && matched.messages.length > 0) {
            setTopicInput(matched.topicTitle);
            setUserPosition(matched.userPosition);
            if (matched.aiRole) setAiRole(matched.aiRole);
            if (matched.perspective) setPerspective(matched.perspective);
            if (matched.difficulty) setDifficulty(matched.difficulty);
            setMessages(matched.messages);
            setIsStarted(true);
            setIsFinished(matched.isFinished || false);
            return;
          }
        }
      }

      const savedActiveRaw = localStorage.getItem(CURRENT_DEBATE_STORAGE_KEY);
      if (savedActiveRaw) {
        const saved: SavedDebateSession = JSON.parse(savedActiveRaw);
        if (saved && saved.messages && saved.messages.length > 0) {
          setTopicInput(saved.topicTitle);
          setUserPosition(saved.userPosition);
          if (saved.aiRole) setAiRole(saved.aiRole);
          if (saved.perspective) setPerspective(saved.perspective);
          if (saved.difficulty) setDifficulty(saved.difficulty);
          setMessages(saved.messages);
          setIsStarted(true);
          setIsFinished(saved.isFinished || false);
        }
      }
    } catch (e) {
      console.error('Failed to load cached active debate:', e);
    }
  }, [initialTopicQuery]);

  // Sync to localStorage
  useEffect(() => {
    if (isStarted && messages.length > 0) {
      const activeSession: SavedDebateSession = {
        id: `debate-${topicInput.replace(/\s+/g, '-').slice(0, 30)}`,
        topicTitle: topicInput,
        userPosition,
        aiRole,
        perspective,
        difficulty,
        date: new Date().toLocaleDateString('ko-KR'),
        createdAt: Date.now(),
        messageCount: messages.length,
        lastSummary: messages.filter(m => m.sender === 'ai').slice(-1)[0]?.content.slice(0, 90) + '...',
        messages,
        isFinished
      };

      try {
        localStorage.setItem(CURRENT_DEBATE_STORAGE_KEY, JSON.stringify(activeSession));
        const historyRaw = localStorage.getItem(HISTORY_DEBATES_STORAGE_KEY);
        const histories: SavedDebateSession[] = historyRaw ? JSON.parse(historyRaw) : [];
        const existingIndex = histories.findIndex(h => h.topicTitle === topicInput);

        if (existingIndex >= 0) {
          histories[existingIndex] = activeSession;
        } else {
          histories.unshift(activeSession);
        }
        localStorage.setItem(HISTORY_DEBATES_STORAGE_KEY, JSON.stringify(histories));
      } catch (e) {
        console.error('Failed to auto-save to localStorage:', e);
      }
    }
  }, [messages, isStarted, isFinished, topicInput, userPosition, aiRole, perspective, difficulty]);

  const handleSelectRecommendation = (t: typeof DEFAULT_TOPICS[0]) => {
    setTopicInput(t.title);
    setUserPosition(t.title);
  };

  // Start Natural Dialogue
  const handleStartDebate = async () => {
    setIsStarted(true);
    setIsFinished(false);
    setIsConfigOpen(false);
    setIsGenerating(true);

    try {
      const res = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicInput,
          userPosition,
          aiRole,
          theologyTradition: perspective,
          difficulty,
          messages: [
            { sender: 'user', content: topicInput || userPosition }
          ]
        })
      });

      if (!res.ok) throw new Error('대화 API 호출 실패');
      const data: DebateApiResponse = await res.json();

      const initialAiMsg: DebateMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: data.content,
      };

      setMessages([initialAiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Continuous Follow-up Conversation
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isGenerating || isFinished) return;

    const userMsg: DebateMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsGenerating(true);

    try {
      const res = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicInput,
          userPosition,
          aiRole,
          theologyTradition: perspective,
          difficulty,
          messages: newMessages.map(m => ({
            sender: m.sender,
            content: m.content
          }))
        })
      });

      if (!res.ok) throw new Error('대화 API 호출 실패');
      const data: DebateApiResponse = await res.json();

      const aiMsg: DebateMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFinishDebate = () => {
    setIsFinished(true);
    setSaveBannerVisible(true);
    setTimeout(() => setSaveBannerVisible(false), 4000);
  };

  const handleStartNewDebate = () => {
    localStorage.removeItem(CURRENT_DEBATE_STORAGE_KEY);
    setMessages([]);
    setIsStarted(false);
    setIsFinished(false);
    setIsConfigOpen(false);
    setTopicInput('인간에게 자유의지가 있다면 하나님의 예정과 모순되는 것 아닌가?');
    setUserPosition('예정론과 자유의지에 대한 개신교 신학적 입장을 알고 싶습니다');
  };

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      
      {/* Optional Configuration Panel */}
      {isConfigOpen && (
        <div className="bg-[#F7F3EB] rounded-2xl p-5 border border-[#E8E2D5] shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-2">
            <h2 className="font-serif-kr font-bold text-base text-[#2C2A29] flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#7A1C2C]" />
              개신교 신학 대화 옵션
            </h2>
            <button
              onClick={() => setIsConfigOpen(false)}
              className="text-xs text-[#78716C] hover:text-[#2C2A29] font-medium"
            >
              닫기
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-[#44403C] block mb-1">대화 모드</label>
              <select
                value={aiRole}
                onChange={(e) => setAiRole(e.target.value as AiRoleType)}
                className="w-full text-xs p-2 rounded-lg bg-[#FDFBF7] border border-[#D9D2C5] focus:outline-none"
              >
                {AI_ROLES.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#44403C] block mb-1">참고 개신교 전통</label>
              <select
                value={perspective}
                onChange={(e) => setPerspective(e.target.value as PerspectiveType)}
                className="w-full text-xs p-2 rounded-lg bg-[#FDFBF7] border border-[#D9D2C5] focus:outline-none"
              >
                {PERSPECTIVES.map(p => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#44403C] block mb-1">답변 깊이</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full text-xs p-2 rounded-lg bg-[#FDFBF7] border border-[#D9D2C5] focus:outline-none"
              >
                {DIFFICULTIES.map(d => (
                  <option key={d.level} value={d.level}>{d.level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main Conversation Container */}
      <div className="flex-1 flex flex-col bg-[#FDFBF7] rounded-3xl border border-[#E8E2D5] shadow-sm overflow-hidden min-h-[680px]">
        
        {/* Top Header */}
        <div className="bg-[#F7F3EB] px-6 py-4 border-b border-[#E8E2D5] flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#7A1C2C] text-white">
                THEOLOGIA
              </span>
              <span className="text-xs text-[#78716C] font-medium">
                개신교 성경·신학 AI 지적 대화
              </span>
            </div>
            <h1 className="font-serif-kr font-bold text-lg sm:text-xl text-[#2C2A29]">
              {topicInput || '개신교 신학 질문'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsConfigOpen(!isConfigOpen)}
              className="px-3 py-1.5 rounded-xl bg-[#FDFBF7] hover:bg-[#E8E2D5] border border-[#D9D2C5] text-[#2C2A29] text-xs font-semibold flex items-center gap-1 transition-colors"
              title="옵션 설정"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>옵션</span>
            </button>

            <button
              onClick={handleStartNewDebate}
              className="px-3 py-1.5 rounded-xl bg-[#FDFBF7] hover:bg-[#E8E2D5] border border-[#D9D2C5] text-[#2C2A29] text-xs font-semibold flex items-center gap-1 transition-colors"
              title="새 질문 시작"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#7A1C2C]" />
              <span>새 대화</span>
            </button>
          </div>
        </div>

        {/* Save Toast */}
        {saveBannerVisible && (
          <div className="bg-[#7A1C2C] text-[#FDFBF7] px-4 py-2 text-xs text-center flex items-center justify-center gap-1.5 animate-fadeIn font-medium">
            <CheckCircle2 className="w-4 h-4" />
            대화가 브라우저 저장소에 안전하게 보관되었습니다.
          </div>
        )}

        {/* Messages Feed */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[540px]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#F7F3EB] flex items-center justify-center text-[#7A1C2C] border border-[#E8E2D5] shadow-inner">
                <BookMarked className="w-8 h-8" />
              </div>
              
              <div className="space-y-2 max-w-lg">
                <h3 className="font-serif-kr font-bold text-xl text-[#2C2A29]">
                  개신교 신학에 관한 어떤 질문이든 자유롭게 물어보세요
                </h3>
                <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
                  개혁주의, 루터교, 웨슬리안, 침례교 등 다양한 개신교 전통의 시각과 성경 텍스트를 바탕으로 맥락을 이어가며 자연스럽게 대화합니다.
                </p>
              </div>

              {/* Quick Topic Chips */}
              <div className="max-w-xl space-y-2">
                <span className="text-[11px] text-[#78716C] font-semibold flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#7A1C2C]" /> 추천 질문 (클릭 시 자동 입력):
                </span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {DEFAULT_TOPICS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectRecommendation(t)}
                      className={`text-xs px-3 py-1.5 rounded-xl border text-left transition-all ${
                        topicInput === t.title
                          ? 'bg-[#7A1C2C] text-white border-[#58121E] font-medium shadow-xs'
                          : 'bg-[#F7F3EB] text-[#44403C] border-[#D9D2C5] hover:border-[#7A1C2C]'
                      }`}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleStartDebate}
                className="px-7 py-3.5 rounded-2xl bg-[#7A1C2C] text-[#FDFBF7] font-bold text-sm hover:bg-[#9B2C3E] transition-all shadow-md border border-[#58121E] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                이 질문으로 대화 시작하기
              </button>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#2C2A29] text-white'
                    : 'bg-[#7A1C2C] text-[#FDFBF7] border border-[#58121E]'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble Container */}
                <div className={`max-w-[88%] sm:max-w-[80%] space-y-1.5 ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}>
                  <div className="flex items-center gap-2 text-[11px] text-[#78716C]">
                    <span className="font-bold text-[#2C2A29]">
                      {msg.sender === 'user' ? '사용자' : 'THEOLOGIA AI'}
                    </span>
                    <span>• {msg.timestamp}</span>
                  </div>

                  {/* Clean Markdown Response Body */}
                  <div className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line border shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#7A1C2C] text-[#FDFBF7] border-[#58121E] rounded-tr-none'
                      : 'bg-[#F7F3EB] text-[#2C2A29] border-[#E8E2D5] rounded-tl-none font-serif-kr'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))
          )}

          {isGenerating && (
            <div className="flex items-center gap-3 text-xs text-[#78716C] italic font-serif-kr bg-[#F7F3EB] p-3.5 rounded-2xl border border-[#E8E2D5] w-fit animate-pulse">
              <Bot className="w-4 h-4 text-[#7A1C2C]" />
              성경과 개신교 신학 맥락을 분석하여 자연스러운 답변을 구성하고 있습니다...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 bg-[#F7F3EB] border-t border-[#E8E2D5] space-y-2">
          {isFinished ? (
            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D5] text-center space-y-2">
              <p className="text-xs font-semibold text-[#2C2A29]">
                대화가 종료되었습니다. 브라우저 기록에 자동 보관되었습니다.
              </p>
              <div className="flex justify-center gap-3 pt-1">
                <button
                  onClick={() => setIsFinished(false)}
                  className="px-4 py-2 rounded-xl bg-[#E8E2D5] text-[#2C2A29] text-xs font-semibold hover:bg-[#D9D2C5] transition-colors"
                >
                  대화 이어하기
                </button>
                <button
                  onClick={handleStartNewDebate}
                  className="px-4 py-2 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] text-xs font-semibold hover:bg-[#9B2C3E] transition-colors flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  새 질문하기
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="예: 개혁주의는? / 웨슬리는? / 침례교 관점에선? / 난 인간에게 선택권이 있다고 보는데..."
                  className="flex-1 px-4 py-3.5 rounded-2xl bg-[#FDFBF7] border border-[#D9D2C5] focus:outline-none focus:border-[#7A1C2C] text-xs sm:text-sm text-[#2C2A29] placeholder-[#A8A29E]"
                />
                <button
                  type="submit"
                  disabled={isGenerating || !inputMessage.trim()}
                  className="px-6 py-3.5 rounded-2xl bg-[#7A1C2C] text-[#FDFBF7] hover:bg-[#9B2C3E] disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-[#58121E] flex items-center justify-center font-bold text-xs gap-1.5 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  전송
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#78716C] px-1">
                <span className="flex items-center gap-1">
                  <Sparkle className="w-3.5 h-3.5 text-[#7A1C2C]" />
                  개혁주의, 루터교, 감리교, 침례교 등 이전 대화 맥락을 기억하여 자연스럽게 이어갑니다.
                </span>
                
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleFinishDebate}
                    className="text-[#7A1C2C] hover:text-[#9B2C3E] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <StopCircle className="w-3.5 h-3.5" />
                    대화 종료
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default function DebatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center text-sm text-[#78716C]">
          대화방을 불러오는 중입니다...
        </div>
      }>
        <DebateContent />
      </Suspense>
    </div>
  );
}
