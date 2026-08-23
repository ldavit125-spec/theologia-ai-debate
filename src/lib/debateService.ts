import { PerspectiveType, DifficultyLevel, AiRoleType, DebateMessage } from './data';
import { GenerateDebateParams, DebateApiResponse } from './bible/types';

export type { GenerateDebateParams, DebateApiResponse };

/**
 * System Prompt Builder for Protestant-Focused Theological AI Platform
 */
export function buildSystemPrompt(params: GenerateDebateParams): string {
  const { theologyTradition, difficulty } = params;

  return `당신은 성경과 개신교(Protestant) 신학에 정통한 지적이고 자연스러운 신학 대화/토론 AI 'THEOLOGIA'입니다.

[플랫폼의 기본 방향 - 개신교 신앙과 신학 중심]
1. 이 사이트는 기독교 전체 종파 비교 서비스가 아니라 [개신교 신앙과 신학을 중심]으로 합니다.
2. 가톨릭과 동방정교회는 기본 신학 관점 및 기본 답변 대상에서 제외합니다.
   - 일반적인 질문에서 습관적으로 "가톨릭에서는...", "정교회에서는..." 식으로 기계적인 타 종파 견해를 나열하지 마세요.
   - 단, 사용자가 명시적으로 가톨릭이나 정교회와의 역사적 비교를 질문할 때(예: "가톨릭과 개혁주의의 구원론 차이는?")는 정확하고 객관적으로 비교하여 답변하세요.
3. 개신교 내부의 다양한 신학 전통(개혁주의/장로교, 루터교, 웨슬리안/감리교, 침례교, 오순절/은사주의, 복음주의, 성결교, 무교회주의 등)의 시각을 대화 맥락에 맞게 유연하게 다루세요.
   - 특정 교파 하나의 교리를 모든 개신교의 유일한 정답으로 단정하지 마세요. (예: 예정론, 자유의지, 성례, 성령의 은사 등에서 개신교 내부의 건강한 다양성을 반영하세요.)

[가장 중요한 대화 연속성 및 자연스러움 원칙]
1. [이전 대화 맥락 최우선 해석]:
   - 사용자의 현재 메시지를 절대 매번 새로운 검색어로 취급하지 마세요.
   - 이전 대화가 존재한다면 현재 메시지를 반드시 바로 앞 대화의 맥락 안에서 먼저 해석하세요.
   - 짧은 단어(예: "개혁주의는?", "웨슬리는?", "침례교 관점", "오순절")나 생략된 표현은 "방금 나누던 주제에 대해 해당 개신교 전통은 어떻게 보는가?"라는 의미로 자연스럽게 파악하여 이어가세요.
2. [서론 반복 및 형식주의 배제]:
   - 매 답변을 서론부터 다시 시작하지 마세요.
   - 사용자의 말을 매번 "'OO'에 대한 질문이군요"라고 되풀이하지 마세요.
   - 불필요한 확인 질문이나 답변 끝에 습관적인 후속 질문("더 궁금한 점이 있으신가요?" 등)을 붙이지 마세요.
   - 질문에 따라 설명, 비교, 반박, 대화형 등을 스스로 선택하여 사람처럼 자연스럽게 대화하세요.
3. [성경 중심]:
   - 오직 성경(Sola Scriptura)을 기초로 하되, 성경 본문 텍스트를 임의로 조작하거나 존재하지 않는 장절을 만들어내지 마세요.
${theologyTradition && theologyTradition !== '초교파 복음주의' ? `(선택된 참고 개신교 전통: ${theologyTradition}, 난이도: ${difficulty || '일반'})` : ''}
`;
}

/**
 * Intelligent Local Fallback Engine with Protestant-Focused Context Memory
 */
export function generateLocalTheologyResponse(params: GenerateDebateParams): DebateApiResponse {
  const { topic, userPosition, messages } = params;
  
  const validMessages = messages || [];
  const currentMsgObj = validMessages[validMessages.length - 1];
  const currentMsg = (currentMsgObj?.content || userPosition || topic || '').trim();
  
  const priorDialogue = validMessages.slice(0, -1);
  const priorUserTexts = priorDialogue.filter(m => m.sender === 'user').map(m => m.content).join(' ');
  const priorAiTexts = priorDialogue.filter(m => m.sender === 'ai').map(m => m.content).join(' ');
  const priorCombined = `${topic} ${priorUserTexts} ${priorAiTexts}`.toLowerCase();

  const lower = currentMsg.toLowerCase().trim();

  // 1. Explicit comparison requested: "가톨릭과 개혁주의 차이"
  if (lower.includes('가톨릭') && (lower.includes('차이') || lower.includes('비교') || lower.includes('구원론'))) {
    return {
      content: `가톨릭과 개혁주의 구원론의 가장 근본적인 차이는 **'의화(칭의)의 성격'**과 **'은혜와 인간 협력의 관계'**에 있습니다.

1. **개혁주의 (법정적 칭의 / 오직 믿음)**:
   - 칭의는 그리스도의 의가 신자에게 '전가(Imputation)'되는 법정적 선언입니다. 인간의 행위나 공로가 조금도 섞이지 않는 단번의 완전한 은혜의 사건입니다.
   - 행위는 칭의의 조건이 아니라, 구원받은 신자에게서 성령으로 맺히는 필연적인 열매(성화)로 봅니다.

2. **가톨릭 (주입된 의 / 은총과 협력)**:
   - 세례를 통해 신자 안에 실제로 의가 '주입(Infusion)'되어 점진적으로 의로워진다고 봅니다.
   - 하나님의 은총이 먼저 작용하지만, 인간이 자유의지로 그 은총에 동의하고 선행과 성사(칠성사)로 협력해야 칭의가 유지되고 완성된다고 가르칩니다.`
    };
  }

  // 2. Short follow-up: "개혁주의" / "개혁주의는?" / "칼빈은?"
  if (lower === '개혁주의' || lower === '개혁주의는?' || lower === '칼빈은?' || lower.includes('개혁주의') || lower.includes('장로교')) {
    if (priorCombined.includes('자유의지') || priorCombined.includes('예정') || priorCombined.includes('구원')) {
      return {
        content: `개혁주의 쪽으로 보면 하나님의 절대 주권을 훨씬 강하게 잡습니다. 

인간이 자기 의지에 따라 실제로 선택하며 산다고 보면서도, 구원에 있어서는 타락한 인간의 의지가 죄에 매여 있기 때문에 하나님의 무조건적인 선택과 불가항력적 은혜가 먼저 임하지 않는 한 스스로 하나님을 선택할 수 없다고 봅니다.

그래서 개혁주의가 말하는 인간의 책임은 웨슬리안의 '자율적 선택 능력'과는 의미가 다릅니다. 모든 구속의 작정이 창세 전 하나님의 주권 안에 안전하게 보존된다는 것이 핵심입니다.`
      };
    }

    if (priorCombined.includes('우치무라') || priorCombined.includes('교회') || priorCombined.includes('무교회')) {
      return {
        content: `개혁주의 관점에서 우치무라 간조의 교회관을 본다면, 교회의 세속화와 형식주의를 비판하고 오직 말씀과 십자가로 돌아가자고 한 점은 종교개혁의 기본 정신과 깊이 통한다고 평가합니다.

하지만 그리스도께서 친히 제정하신 성례(세례와 성찬)와 교회의 공적인 직분 질서를 지나치게 가볍게 여긴 점은 아쉽게 봅니다. 개혁주의는 눈에 보이는 신앙고백적 공동체와 성례의 질서 속에서 교회가 건강하게 보존된다고 강조합니다.`
      };
    }

    return {
      content: `개혁주의는 하나님의 절대적인 주권, 성경의 최종 권위(Sola Scriptura), 그리고 오직 은혜로 말미암는 구원(Sola Gratia)을 신앙과 삶의 모든 영역에서 가장 중심에 둡니다.`
    };
  }

  // 3. Short follow-up: "웨슬리는?" / "감리교는?" / "웨슬리안"
  if (lower === '웨슬리는?' || lower === '감리교는?' || lower === '웨슬리안' || lower.includes('웨슬리') || lower.includes('감리교')) {
    if (priorCombined.includes('자유의지') || priorCombined.includes('예정') || priorCombined.includes('개혁주의')) {
      return {
        content: `반면 웨슬리(감리교) 전통에서는 하나님의 **'선행은총(Prevenient Grace)'**을 핵심으로 둡니다.

그리스도의 십자가 대속으로 인해 모든 사람에게 은혜가 먼저 베풀어졌기 때문에, 인간은 성령의 도우심 안에서 복음의 초청에 실제로 믿음으로 응답하거나 혹은 거절할 수 있는 인격적 자유가 회복되었다고 봅니다.

따라서 웨슬리안은 구원을 일방적인 무조건적 예정으로 설명하기보다, 하나님의 은혜에 인격적으로 응답하는 믿음과 그로 말미암는 삶의 거룩한 변화(성화와 기독교인의 완전)를 더 강조합니다.`
      };
    }
  }

  // 4. Short follow-up: "침례교는?" / "루터교는?" / "오순절은?"
  if (lower.includes('침례교')) {
    return {
      content: `침례교는 각 신자의 양심의 자유와 성경의 최고 권위, 그리고 스스로 신앙을 고백한 사람에게만 베푸는 '신자의 침례(Believer\'s Baptism)'를 핵심으로 삼습니다. 교단이나 국가 권력의 간섭을 배제하고 지역 교회의 자율성과 만인제사장직을 강력히 옹호합니다.`
    };
  }

  if (lower.includes('루터교')) {
    return {
      content: `루터교는 **'오직 믿음(Sola Fide)'**과 **'십자가 신학'**, 그리고 **'율법과 복음의 철저한 구분'**을 신학의 중심축으로 둡니다. 인간의 어떠한 노력도 배제한 채 오직 십자가의 복음 선포와 성례(성찬의 실제적 임재)를 통해 거저 주시는 하나님의 의로움을 강조합니다.`
    };
  }

  if (lower.includes('오순절') || lower.includes('은사')) {
    return {
      content: `오순절 및 은사주의 전통은 사도행전에 나타난 성령세례와 초자연적 은사(방언, 예언, 신유 등)가 오늘날에도 동일하게 지속된다는 '은사 지속론'을 강조합니다. 교리적 지식에 머물지 않고 살아계신 성령의 역동적인 능력과 선교적 권능을 체험하는 것을 중요시합니다.`
    };
  }

  // 5. User expresses personal opinion: "난 인간에게 선택권이 있다고 보는데"
  if (lower.includes('난') || lower.includes('내 생각') || lower.includes('선택권') || lower.includes('오히려') || lower.includes('자유의지')) {
    return {
      content: `그 관점은 개신교 신학사에서 **웨슬리안(감리교)**이나 **성결교, 아르미니우스주의**의 핵심 문제의식과 매우 잘 통합니다.

성경의 수많은 권고와 회개의 부르심, 그리고 하나님의 공의로운 심판이 진정한 의미를 가지려면 인간에게 실질적인 응답 책임이 있어야 한다는 논지죠.

이 전통에서는 하나님이 모든 사람에게 은혜를 먼저 열어주셨기 때문에 인간이 믿음으로 결단할 수 있다고 설명합니다. 반면 장로교(개혁주의) 전통은 그 결단조차도 하나님이 먼저 주신 믿음의 선물이라고 보면서 하나님의 절대 은혜성을 더 지키려 하죠.`
    };
  }

  // 6. Direct Question: "인간에게 자유의지가 있다고 봐?"
  if (lower.includes('자유의지') || lower.includes('예정')) {
    return {
      content: `개신교 신학 안에서도 이 문제는 꽤 깊이 갈립니다.

**개혁주의(장로교)** 쪽에서는 인간이 자기 본성에 따라 자유롭게 선택하며 산다고 보면서도, 구원에 있어서는 하나님의 절대적인 주권과 영원한 예정을 훨씬 강하게 잡습니다. 타락한 인간은 하나님의 주권적 은혜가 먼저 임하지 않는 한 스스로 하나님을 선택할 수 없다고 보죠.

반대로 **웨슬리안(감리교)**이나 **침례교의 일부 전통**에서는 하나님께서 십자가를 통해 모든 사람에게 '선행은총'을 베푸셨기 때문에, 인간이 그 은혜에 인격적으로 응답하거나 거절할 수 있는 실질적인 선택 책임이 있다고 봅니다.

결국 개신교는 하나님의 은혜의 절대성을 어디까지 강조할 것인가와 인간의 인격적 책임을 어떻게 설명할 것인가라는 건강한 신학적 긴장을 나누고 있습니다.`
    };
  }

  // Default natural conversational reply for Protestant platform
  return {
    content: `말씀하신 내용은 개신교 신학 전통 안에서 매우 의미 있는 성경적 탐구 주제입니다.

개혁주의, 루터교, 웨슬리안 등 각 개신교 전통마다 하나님의 말씀(성경)을 중심에 두면서도 강조하는 신학적 렌즈에 차이가 있습니다.

궁금하신 특정 개신교 관점(예: 개혁주의, 웨슬리안, 침례교, 루터교 등)이나 관련 성경 본문의 문맥에 대해 말씀해 주시면 자연스럽게 대화를 이어가겠습니다.`
  };
}

/**
 * Main Debate Service Entrypoint (Sends full historical context to LLM)
 */
export async function generateDebateResponse(params: GenerateDebateParams): Promise<DebateApiResponse> {
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY;

  if (apiKey && (process.env.AI_API_KEY || process.env.OPENAI_API_KEY)) {
    try {
      const token = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;

      const formattedMessages = [
        { role: 'system', content: buildSystemPrompt(params) },
        ...params.messages.map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.content
        }))
      ];

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: formattedMessages,
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const rawContent = data.choices[0]?.message?.content || '';
        return {
          content: rawContent || '답변을 생성하지 못했습니다.'
        };
      }
    } catch (err) {
      console.warn('External AI API call failed, falling back to local theology engine:', err);
    }
  }

  return generateLocalTheologyResponse(params);
}
