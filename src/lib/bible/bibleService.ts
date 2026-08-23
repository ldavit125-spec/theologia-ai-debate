import { 
  VERIFIED_BIBLE_REFERENCES, 
  VERIFIED_THEOLOGY_SOURCES, 
  BibleReferenceItem, 
  TheologicalSourceItem 
} from './references';

/**
 * Bible & Theology Exegesis Service
 * Ready for future External Bible API / RAG vector embedding integration.
 */
export class BibleService {
  /**
   * Look up contextual biblical references for a given topic or query keywords
   */
  static getReferencesForTopic(topic: string, queryText?: string): BibleReferenceItem[] {
    const combined = `${topic} ${queryText || ''}`.toLowerCase();

    if (combined.includes('자유의지') || combined.includes('예정') || combined.includes('선택') || combined.includes('타락')) {
      return VERIFIED_BIBLE_REFERENCES['free-will'] || [];
    }

    if (combined.includes('믿음') || combined.includes('행함') || combined.includes('구원') || combined.includes('칭의')) {
      return VERIFIED_BIBLE_REFERENCES['faith-and-works'] || [];
    }

    if (combined.includes('악') || combined.includes('악마') || combined.includes('고난') || combined.includes('사탄')) {
      return VERIFIED_BIBLE_REFERENCES['problem-of-evil'] || [];
    }

    // Default return free-will or empty
    return VERIFIED_BIBLE_REFERENCES['free-will'];
  }

  /**
   * Look up exact theology scholarly citations and confessions
   */
  static getTheologicalSources(topic: string, tradition?: string, difficulty?: string): TheologicalSourceItem[] {
    const combined = `${topic} ${tradition || ''}`.toLowerCase();
    const sources: TheologicalSourceItem[] = [];

    if (difficulty === '신학자' || combined.includes('자유의지') || combined.includes('예정')) {
      if (tradition === '개혁주의') {
        sources.push(...(VERIFIED_THEOLOGY_SOURCES['calvin'] || []));
        sources.push(...(VERIFIED_THEOLOGY_SOURCES['augustine'] || []));
        sources.push(VERIFIED_THEOLOGY_SOURCES['confessions'][0]); // Westminster
      } else if (tradition === '루터교') {
        sources.push(...(VERIFIED_THEOLOGY_SOURCES['luther'] || []));
        sources.push(...(VERIFIED_THEOLOGY_SOURCES['augustine'] || []));
      } else if (tradition === '가톨릭') {
        sources.push(VERIFIED_THEOLOGY_SOURCES['confessions'][1]); // CCC
        sources.push(...(VERIFIED_THEOLOGY_SOURCES['augustine'] || []));
      } else {
        sources.push(...(VERIFIED_THEOLOGY_SOURCES['augustine'] || []));
        sources.push(VERIFIED_THEOLOGY_SOURCES['confessions'][0]);
      }
    } else {
      // General sources
      if (tradition === '가톨릭') {
        sources.push(VERIFIED_THEOLOGY_SOURCES['confessions'][1]);
      } else {
        sources.push(VERIFIED_THEOLOGY_SOURCES['confessions'][0]);
      }
    }

    return sources;
  }
}
