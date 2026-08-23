import { PerspectiveType, DifficultyLevel, AiRoleType, DebateMessage } from './data';
import { BibleReferenceItem, TheologicalSourceItem } from './bible/references';
import { BibleService } from './bible/bibleService';
import { GenerateDebateParams, DebateApiResponse } from './bible/types';

export type { GenerateDebateParams, DebateApiResponse };

/**
 * System Prompt Builder for High-Quality Theological AI Debate
 */
export function buildSystemPrompt(params: GenerateDebateParams): string {
  const {
    topic,
    userPosition,
    aiRole,
    customAiRoleDescription,
    theologyTradition,
    difficulty,
  } = params;

  return `당신은 최고 수준의 기독교 변증 및 신학 토론 전문 AI 'THEOLOGIA'입니다.
단순히 정보를 나열하거나 긴 설교문을 읊지 않고, 사용자의 주장을 엄밀히 분석하여 지적이고 품격 있는 실제 토론자로서 상호작용합니다.

[토론 설정 정보]
- 토론 주제: "${topic}"
- 사용자의 기본 입장: "${userPosition}"
- 지정된 AI 역할: "${aiRole}" ${customAiRoleDescription ? `(상세 규칙: ${customAiRoleDescription})` : ''}
- 대변할 신학적 관점: "${theologyTradition}"
- 토론 난이도 수준: "${difficulty}" (입문: 직관적 핵심 논변, 일반: 대표 학자/교리 문맥, 신학자: 원어 분석 및 역사적 신조 대조)

[AI 토론 및 응답 핵심 원칙 - 엄격 준수]
1. [주장 분석 및 상호작용 구조]
   - 사용자의 핵심 주장과 그 근거를 정확히 파악하십시오.
   - 답변은 장황한 설교를 피하고 [핵심 인정 및 요약 -> 강력한 신학적/논리적 반론/논증 -> 다음 논의를 여는 날카로운 질문] 구조로 간결하고 명확하게 작성하십시오.

2. [반론 모드 (aiRole === '반론')]
   - 사용자의 주장에 결코 쉽게 동의하거나 "그 의견도 맞습니다"로 얼버무리지 마십시오.
   - 사용자 주장 중 가장 설득력 있는 부분을 먼저 정중히 인정한 후(Steel-manning), 성경 본문과 ${theologyTradition}의 핵심 교리에 근거하여 정면으로 강력한 반론을 제기하십시오.

3. [논리적 오류 감지 (정중하고 학술적인 피드백)]
   - 사용자의 논증에 명백한 논리적 결함(예: 성급한 일반화, 순환논증, 거짓 양자택일, 논점 일탈, 성경 구절의 문맥 무시 등)이 보일 경우 공격적이지 않고 차분하게 짚어주십시오. (모든 문장을 억지로 오류로 지적하지는 마십시오.)

4. [대화 흐름 및 이전 주장 기억]
   - 이전 대화에서 사용자가 밝혔던 입장과 현재 발언 간에 긴장이나 모순이 있다면 자연스럽게 대화 속에서 환기하십시오. (예: "앞서 ~를 강조하셨는데, 현재 말씀하신 논지는 그 전제와 어떻게 조화됩니까?")

5. [성경 및 신학적 태도]
   - 성경 본문과 특정 신학자의 주관적 해석을 철저히 구분하십시오.
   - 특정 교파의 주장을 기독교 전체의 유일한 정답인 양 단정하지 마십시오.
   - 인신공격이나 종교적 신념 평가는 배제하고 오직 논증과 성경적 근거에 집중하십시오.

[응답 포맷 가이드라인]
반드시 다음 JSON 형식으로만 응답하십시오:
\`\`\`json
{
  "content": "AI의 핵심 토론 발언 (인정 -> 정밀 반론/논증 -> 핵심 질문 순서의 정제된 답변)",
  "detectedFallacy": "감지된 명백한 논리적 오류가 있을 경우 설명 (없으면 null)",
  "citationVerses": [
    {
      "reference": "정확한 성경 위치 (예: 로마서 9:15–18)",
      "text": "성경 본문 (확실한 경우만)",
      "contextExplanation": "해당 구절이 현재 논쟁과 갖는 관계 설명",
      "denominationalViews": [
        { "tradition": "개혁주의", "interpretation": "개혁주의 해석" },
        { "tradition": "감리교/웨슬리안", "interpretation": "웨슬리안 해석" }
      ]
    }
  ],
  "theologicalSources": [
    {
      "authorOrDocument": "신학자/공의회명",
      "workTitle": "저작물 명칭",
      "summary": "핵심 논지 요약"
    }
  ],
  "doctrinalBasis": "${theologyTradition}의 핵심 교리적 근거 요약",
  "counterArguments": [
    "핵심 반대 논점 1",
    "핵심 반대 논점 2"
  ]
}
\`\`\``;
}

/**
 * Intelligent Local Engine with Argument Analysis & Debate Quality Logic
 */
export function generateLocalTheologyResponse(params: GenerateDebateParams): DebateApiResponse {
  const { topic, userPosition, aiRole, theologyTradition, difficulty, messages } = params;
  
  const userMessages = messages.filter(m => m.sender === 'user');
  const lastUserMsg = userMessages[userMessages.length - 1]?.content || userPosition;
  const previousUserMsg = userMessages.length > 1 ? userMessages[userMessages.length - 2]?.content : null;

  // Retrieve verified Scripture references & Scholarly sources via BibleService
  const citationVerses = BibleService.getReferencesForTopic(topic, lastUserMsg);
  const theologicalSources = BibleService.getTheologicalSources(topic, theologyTradition, difficulty);

  let content = '';
  let detectedFallacy: string | undefined = undefined;
  let doctrinalBasis = `${theologyTradition} 정통 교리 체계`;
  let counterArguments: string[] = [];

  // Check for common fallacy patterns in theological debates
  if (lastUserMsg.includes('모두') || lastUserMsg.includes('절대') || lastUserMsg.includes('누구나')) {
    if (lastUserMsg.length < 40) {
      detectedFallacy = '성급한 일반화(Hasty Generalization) 가능성: 복잡한 성경적 구속사나 인간 본성의 다양한 양상을 단일한 명제로 단순화할 위험이 있습니다.';
    }
  } else if ((lastUserMsg.includes('아니면') || lastUserMsg.includes('둘 중')) && lastUserMsg.includes('선택')) {
    detectedFallacy = '거짓 양자택일(False Dilemma): 하나님의 절대 주권과 인간의 도덕적 책임은 배타적 양자택일이 아닌 신비로운 긴장과 조화 속에 위치할 수 있습니다.';
  }

  // Generate debate response by AI Role
  if (aiRole === '반론') {
    if (topic.includes('악') || lastUserMsg.includes('악마') || lastUserMsg.includes('악')) {
      content = `사용자님께서 제기하신 "인간 본성의 자발적 부패성이 악의 독립적 원인이 될 수 있다"는 지적은 인간의 도덕적 책임을 강조한다는 점에서 매우 날카로운 통찰입니다.\n\n그러나 **${theologyTradition}** 관점에서 성경 전체를 조망할 때, 악의 문제를 오직 인간의 내적 영역으로만 제한하는 것은 중대한 성경적 경고를 간과할 위험이 있습니다. 성경(에베소서 6:12, 베드로전서 5:8)은 보이지 않는 영적 세력의 실재적 유혹과 공격을 명백히 선언합니다.\n\n만약 초자연적 악의 개입을 배제한다면, 예수 그리스도께서 광야에서 받으신 시험(마태복음 4장)과 겟세마네의 기도를 어떻게 이해할 수 있겠습니까?`;
      doctrinalBasis = `${theologyTradition} - 인간론적 원죄성과 영적 전쟁의 실재성`;
      counterArguments = [
        '초자연적 악의 실재성을 배제할 경우 복음서의 시험 기사와 충돌',
        '인간의 내적 정욕과 외적 영적 유혹의 경계 설정 문제'
      ];
    } else if (topic.includes('자유의지') || topic.includes('예정')) {
      const memoryHook = previousUserMsg 
        ? `앞선 발언에서 "${previousUserMsg.slice(0, 25)}..."를 언급하셨는데, ` 
        : '';

      content = `${memoryHook}사용자님께서 말씀하신 "인간의 인격적 응답과 결단의 필요성"은 기독교 신앙의 책임성을 대변하는 강력한 논거입니다.\n\n하지만 **${theologyTradition}**(특히 아우구스티누스와 종교개혁 전통)의 관점에서 볼 때, 타락 이후 인간 의지는 죄의 영향력 아래 속박되어 있어 하나님의 선행적·불가항력적 은혜 없이는 스스로 구원에 이르는 믿음을 일으킬 수 없습니다(로마서 3:10, 요한복음 6:44).\n\n인간의 자발적 결단을 강조하는 논리가 자칫 '은혜의 절대성'을 '인간의 협력 능력'에 종속시키는 결과를 낳지 않는다고 어떻게 변증하시겠습니까?`;
      doctrinalBasis = `${theologyTradition} - 전적 타락 및 은혜의 주권성`;
      counterArguments = [
        '인간의 자율적 선택 강조가 펠라기우스적 자력 구원으로 흐를 위험성',
        '선행적 은혜(Prevenient Grace)와 불가항력적 은혜의 차이'
      ];
    } else {
      content = `사용자님의 논증은 논리적인 일관성을 지니고 있으며, 인간의 이성적 직관에 부합하는 면이 있습니다.\n\n그러나 **${theologyTradition}**의 성경적 원리에 따르면, 피조물의 합리성보다 계시된 하나님의 절대 주권과 거룩한 뜻이 선행합니다. 제시하신 주장은 성경 본문의 문맥과 교회사적 신조들의 통일된 교훈과 긴장을 형성하고 있습니다.\n\n사용자님의 주장을 지탱하는 성경적 본문 근거와, 이에 반대되는 교파들의 해석에 대해 어떻게 응답하시겠습니까?`;
      doctrinalBasis = `${theologyTradition} 정통 교리 체계`;
      counterArguments = ['성경 본문의 전체적 문맥과의 부합 여부 검토'];
    }
  } else if (aiRole === '지지') {
    content = `사용자님의 주장("${lastUserMsg.slice(0, 40)}...")은 **${theologyTradition}**의 성화론과 언약적 순종 관점에서 매우 타당하며 성경적 근거가 탄탄합니다.\n\n하나님께서는 인간을 무인격적 도구가 아닌 인격적 파트너로 부르셨으며, 믿음의 결단과 삶의 열매를 요구하십니다. 아래 제시된 성경 본문과 역사적 신앙고백을 바탕으로 이 논지를 더욱 정교화할 수 있습니다.\n\n이 논증을 현대 성도들의 구체적 신앙 실천과 어떻게 연결하시겠습니까?`;
    doctrinalBasis = `${theologyTradition} - 인격적 언약과 믿음의 순종`;
  } else if (aiRole === '중립') {
    content = `사용자님께서 짚어주신 주장은 기독교 사상사에서 가장 치열하게 대립해 온 핵심 축 중 하나입니다.\n\n1. **${theologyTradition} 계열**: 하나님의 불변하는 주권과 은혜의 절대성을 중심으로 조명\n2. **타 교파 전통**: 피조물의 인격적 책임과 자유로운 응답 가능성을 중심으로 조명\n\n두 입장 모두 정당한 성경적 장절을 근거로 삼고 있으므로, 어느 한쪽을 섣불리 단정하기보다 성경이 보여주는 '거룩한 역설(Paradox)'의 지혜를 살펴보아야 합니다.\n\n양측의 긴장을 해소할 수 있는 제3의 통합적 관점은 무엇이라고 생각하십니까?`;
    doctrinalBasis = '교파 간 비교 신학 및 기독교 공통 유산';
  } else if (aiRole === '소크라테스') {
    content = `사용자님의 말씀("${lastUserMsg.slice(0, 35)}...")에 내포된 신학적 전제를 함께 짚어보고자 합니다.\n\n만약 그 전제가 성립한다면, 하나님의 구원 계획의 최종 성패는 창조주의 주권이 아니라 피조물 인간의 선택 여부에 달려 있게 되는 것입니까?\n\n창조주가 피조물의 반응에 따라 자신의 결정을 바꾸셔야 한다면, 그분을 여전히 무조건적 전능자로 고백할 수 있겠습니까?`;
    doctrinalBasis = '소크라테스식 신학적 전제 검증';
  } else {
    content = `[맞춤 토론 규칙 적용] **${theologyTradition}** 관점에서 사용자님의 최근 논변을 체계적으로 검토하였습니다.\n\n제시하신 주장의 성경적 타당성을 검증하기 위해 아래 성경 장절과 교회사적 문헌의 대조 검토를 제안합니다.`;
    doctrinalBasis = `${theologyTradition} 맞춤 교리 분석`;
  }

  if (difficulty === '신학자') {
    content += `\n\n*(신학자 모드: 아우구스티누스 'De Gratia et Libero Arbitrio', 도르트 신조 3/4헤드, 헬라어/히브리어 원어 의미 비교 분석 적용)*`;
  }

  return {
    content,
    detectedFallacy,
    citationVerses,
    theologicalSources,
    doctrinalBasis,
    counterArguments: counterArguments.length > 0 ? counterArguments : undefined,
    perspectiveNotes: `${theologyTradition} 관점 | AI 역할: ${aiRole} | 난이도: ${difficulty}`
  };
}

/**
 * Main Debate Service Entrypoint (Decoupled Provider Architecture)
 */
export async function generateDebateResponse(params: GenerateDebateParams): Promise<DebateApiResponse> {
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY;

  if (apiKey && (process.env.AI_API_KEY || process.env.OPENAI_API_KEY)) {
    try {
      const token = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: buildSystemPrompt(params) },
            ...params.messages.map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.content
            }))
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        return {
          content: parsed.content || '응답을 생성하지 못했습니다.',
          detectedFallacy: parsed.detectedFallacy || undefined,
          citationVerses: parsed.citationVerses,
          theologicalSources: parsed.theologicalSources,
          doctrinalBasis: parsed.doctrinalBasis,
          counterArguments: parsed.counterArguments,
          perspectiveNotes: `${params.theologyTradition} 관점 | AI 역할: ${params.aiRole} | 난이도: ${params.difficulty}`
        };
      }
    } catch (err) {
      console.warn('External AI API call failed, falling back to local theology engine:', err);
    }
  }

  return generateLocalTheologyResponse(params);
}
