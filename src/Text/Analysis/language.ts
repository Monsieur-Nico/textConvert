/**
 * Supported languages for detection
 */
export enum Language {
  English = 'english',
  French = 'french',
  Spanish = 'spanish',
  German = 'german',
  Italian = 'italian',
  Portuguese = 'portuguese',
  Dutch = 'dutch',
  Unknown = 'unknown',
}

/**
 * Language detection result interface
 */
export interface LanguageDetectionResult {
  /**
   * The detected language
   */
  language: Language;

  /**
   * Confidence score (0-1) of the detection
   */
  confidence: number;

  /**
   * Scores for each language analyzed
   */
  scores: Record<Language, number>;
}

// Language profiles (character frequency data)
const languageProfiles: Record<Language, Record<string, number>> = {
  [Language.English]: {
    e: 12.7,
    t: 9.1,
    a: 8.2,
    o: 7.5,
    i: 7.0,
    n: 6.7,
    s: 6.3,
    h: 6.1,
    r: 6.0,
    d: 4.3,
    l: 4.0,
    u: 2.8,
    c: 2.8,
    m: 2.4,
    w: 2.4,
    f: 2.2,
    g: 2.0,
    y: 2.0,
    p: 1.9,
    b: 1.5,
    v: 1.0,
    k: 0.8,
    j: 0.2,
    x: 0.2,
    q: 0.1,
    z: 0.1,
    th: 3.0,
    he: 2.5,
    in: 2.0,
    er: 1.8,
    an: 1.6,
    re: 1.4,
    on: 1.3,
    at: 1.2,
  },
  [Language.French]: {
    e: 14.7,
    a: 8.0,
    i: 7.5,
    s: 7.9,
    n: 7.1,
    t: 7.0,
    r: 6.5,
    l: 5.5,
    u: 6.0,
    o: 5.3,
    d: 3.5,
    c: 3.0,
    m: 2.6,
    p: 2.5,
    v: 1.6,
    h: 0.8,
    g: 1.0,
    f: 1.0,
    b: 0.9,
    q: 1.3,
    j: 0.3,
    z: 0.1,
    x: 0.4,
    k: 0.0,
    w: 0.0,
    y: 0.3,
    é: 1.9,
    è: 0.3,
    ê: 0.2,
    à: 0.5,
    â: 0.1,
    ç: 0.3,
    ai: 1.0,
    oi: 0.4,
    ou: 0.9,
  },
  [Language.Spanish]: {
    e: 13.7,
    a: 12.5,
    o: 8.7,
    s: 7.8,
    n: 7.0,
    r: 6.4,
    i: 6.2,
    l: 5.8,
    d: 5.8,
    t: 4.6,
    c: 4.0,
    u: 3.9,
    m: 3.1,
    p: 2.5,
    b: 1.4,
    g: 1.0,
    v: 1.0,
    f: 0.7,
    h: 0.7,
    q: 0.9,
    j: 0.4,
    z: 0.5,
    ñ: 0.3,
    y: 1.0,
    x: 0.2,
    k: 0.0,
    w: 0.0,
    á: 0.5,
    é: 0.4,
    í: 0.4,
    ó: 0.9,
    ú: 0.4,
    qu: 0.8,
    ue: 0.6,
    ch: 0.4,
  },
  [Language.German]: {
    e: 16.9,
    n: 10.0,
    i: 7.6,
    s: 7.3,
    r: 7.0,
    t: 6.1,
    a: 6.5,
    d: 5.1,
    h: 4.8,
    u: 4.4,
    l: 3.4,
    c: 2.7,
    g: 3.0,
    m: 2.5,
    o: 2.5,
    b: 1.9,
    w: 1.9,
    f: 1.7,
    k: 1.4,
    z: 1.1,
    v: 0.7,
    p: 0.7,
    j: 0.3,
    y: 0.1,
    q: 0.02,
    x: 0.03,
    ä: 0.5,
    ö: 0.3,
    ü: 0.6,
    ß: 0.3,
    ch: 2.6,
    ei: 1.8,
    en: 3.8,
    er: 3.6,
    ie: 1.7,
  },
  [Language.Italian]: {
    e: 11.8,
    a: 11.7,
    i: 10.1,
    o: 9.8,
    n: 6.9,
    t: 5.6,
    r: 6.4,
    l: 6.3,
    s: 5.0,
    c: 4.5,
    d: 3.7,
    p: 3.0,
    u: 3.0,
    m: 2.5,
    v: 2.1,
    g: 1.6,
    h: 1.5,
    b: 0.9,
    f: 0.9,
    z: 0.5,
    q: 0.5,
    à: 0.6,
    è: 0.4,
    ì: 0.1,
    ò: 0.2,
    ù: 0.1,
    ch: 0.5,
    di: 0.9,
    la: 0.7,
    re: 0.6,
  },
  [Language.Portuguese]: {
    a: 14.6,
    e: 12.6,
    o: 10.7,
    s: 7.8,
    r: 6.5,
    i: 6.2,
    n: 5.0,
    t: 4.7,
    d: 4.9,
    m: 4.7,
    u: 4.0,
    c: 3.7,
    l: 2.8,
    p: 2.5,
    v: 1.7,
    g: 1.3,
    b: 1.0,
    f: 1.0,
    h: 0.8,
    q: 1.2,
    ã: 0.7,
    á: 0.5,
    é: 0.4,
    ó: 0.4,
    ç: 0.5,
    õ: 0.3,
    j: 0.3,
    z: 0.5,
    ê: 0.1,
    â: 0.1,
    qu: 0.8,
    de: 0.7,
    es: 0.7,
  },
  [Language.Dutch]: {
    e: 19.0,
    n: 10.0,
    a: 7.5,
    t: 6.5,
    i: 6.5,
    r: 6.0,
    o: 6.0,
    d: 5.8,
    s: 3.7,
    l: 3.5,
    g: 3.4,
    v: 2.8,
    h: 2.4,
    k: 2.2,
    m: 2.2,
    u: 2.0,
    j: 1.5,
    w: 1.5,
    z: 1.4,
    p: 1.2,
    b: 1.6,
    c: 1.2,
    f: 0.8,
    y: 0.0,
    x: 0.0,
    q: 0.0,
    ij: 1.0,
    en: 3.5,
    de: 3.0,
    er: 2.0,
    ee: 1.8,
    oo: 1.0,
  },
  [Language.Unknown]: {},
};

// Common stopwords for each language
const stopwords: Record<Language, string[]> = {
  [Language.English]: [
    'the',
    'be',
    'to',
    'of',
    'and',
    'a',
    'in',
    'that',
    'have',
    'i',
    'it',
    'for',
    'not',
    'on',
    'with',
    'he',
    'as',
    'you',
    'do',
    'at',
    'this',
    'but',
    'his',
    'by',
    'from',
    'they',
    'we',
    'say',
    'her',
    'she',
    'or',
    'an',
    'will',
    'my',
    'one',
    'all',
    'would',
    'there',
    'their',
    'what',
    'so',
    'up',
    'out',
    'if',
    'about',
    'who',
    'get',
    'which',
    'go',
    'me',
    'when',
    'make',
    'can',
    'like',
    'time',
    'no',
    'just',
    'him',
    'know',
    'take',
    'people',
    'into',
    'year',
    'your',
    'good',
    'some',
    'could',
    'them',
    'see',
    'other',
    'than',
    'then',
    'now',
    'look',
    'only',
    'come',
    'its',
    'over',
    'think',
    'also',
    'back',
    'after',
    'use',
    'two',
    'how',
    'our',
    'work',
    'first',
    'well',
    'way',
    'even',
    'new',
    'want',
    'because',
    'any',
    'these',
    'give',
    'day',
    'most',
    'us',
    'is',
    'am',
    'are',
    'was',
    'were',
    'been',
    'has',
    'had',
    'would',
    'should',
    'could',
    'hello',
    'world',
  ],
  [Language.French]: [
    'le',
    'la',
    'les',
    'un',
    'une',
    'des',
    'et',
    'est',
    'en',
    'que',
    'qui',
    'dans',
    'à',
    'pour',
    'pas',
    'de',
    'ce',
    'il',
    'elle',
    'je',
    'nous',
    'vous',
    'ils',
    'elles',
    'son',
    'sa',
    'ses',
    'mon',
    'ma',
    'mes',
    'ton',
    'ta',
    'tes',
    'notre',
    'votre',
    'leur',
    'leurs',
    'du',
    'au',
    'aux',
    'sur',
    'sous',
    'avec',
    'sans',
    'mais',
    'ou',
    'où',
    'donc',
    'car',
    'comme',
    'comment',
    'quand',
    'pourquoi',
    'parce',
    'plus',
    'moins',
    'très',
    'trop',
    'peu',
    'aussi',
    'bien',
    'mal',
    'si',
    'tout',
    'tous',
    'toute',
    'toutes',
    'autre',
    'autres',
    'même',
    'ici',
    'là',
    'cela',
    'ceci',
    'celui',
    'celle',
    'ceux',
    'celles',
    'rien',
    'personne',
    'quelque',
    'quelques',
    'plusieurs',
    'beaucoup',
    'être',
    'avoir',
    'faire',
    'dire',
    'venir',
    'voir',
    'vouloir',
    'pouvoir',
    'bonjour',
    'monde',
  ],
  [Language.Spanish]: [
    'el',
    'la',
    'los',
    'las',
    'un',
    'una',
    'unos',
    'unas',
    'y',
    'o',
    'que',
    'en',
    'de',
    'a',
    'por',
    'con',
    'no',
    'es',
    'son',
    'para',
    'como',
    'su',
    'sus',
    'mi',
    'mis',
    'tu',
    'tus',
    'nuestro',
    'nuestra',
    'nuestros',
    'nuestras',
    'vuestro',
    'vuestra',
    'vuestros',
    'vuestras',
    'del',
    'al',
    'este',
    'esta',
    'estos',
    'estas',
    'ese',
    'esa',
    'esos',
    'esas',
    'aquel',
    'aquella',
    'aquellos',
    'aquellas',
    'pero',
    'más',
    'menos',
    'mucho',
    'muchos',
    'mucha',
    'muchas',
    'poco',
    'pocos',
    'poca',
    'pocas',
    'algún',
    'alguna',
    'algunos',
    'algunas',
    'ningún',
    'ninguna',
    'ningunos',
    'ningunas',
    'otro',
    'otra',
    'otros',
    'otras',
    'mismo',
    'misma',
    'mismos',
    'mismas',
    'tan',
    'tanto',
    'tanta',
    'tantos',
    'tantas',
    'así',
    'también',
    'solo',
    'solamente',
    'hola',
    'mundo',
  ],
  [Language.German]: [
    'der',
    'die',
    'das',
    'ein',
    'eine',
    'einen',
    'dem',
    'den',
    'des',
    'einer',
    'eines',
    'und',
    'ist',
    'sind',
    'war',
    'waren',
    'wird',
    'werden',
    'in',
    'zu',
    'mit',
    'für',
    'von',
    'auf',
    'als',
    'um',
    'an',
    'aus',
    'wie',
    'bei',
    'nach',
    'bis',
    'seit',
    'vor',
    'durch',
    'über',
    'unter',
    'gegen',
    'ohne',
    'dass',
    'weil',
    'wenn',
    'aber',
    'oder',
    'nur',
    'noch',
    'schon',
    'auch',
    'selbst',
    'mir',
    'dir',
    'ihm',
    'ihr',
    'uns',
    'euch',
    'ihnen',
    'mein',
    'dein',
    'sein',
    'ihr',
    'unser',
    'euer',
    'ihre',
    'nicht',
    'kein',
    'keine',
    'hallo',
    'welt',
  ],
  [Language.Italian]: [
    'il',
    'lo',
    'la',
    'i',
    'gli',
    'le',
    'un',
    'uno',
    'una',
    'e',
    'è',
    'che',
    'di',
    'a',
    'per',
    'in',
    'con',
    'su',
    'non',
    'sono',
    'ho',
    'mi',
    'ha',
    'si',
    'ti',
    'ci',
    'vi',
    'lo',
    'la',
    'li',
    'le',
    'ne',
    'mio',
    'mia',
    'miei',
    'mie',
    'tuo',
    'tua',
    'tuoi',
    'tue',
    'suo',
    'sua',
    'suoi',
    'sue',
    'nostro',
    'nostra',
    'nostri',
    'nostre',
    'vostro',
    'vostra',
    'vostri',
    'vostre',
    'loro',
    'questo',
    'questa',
    'questi',
    'queste',
    'quello',
    'quella',
    'quelli',
    'quelle',
    'ma',
    'più',
    'meno',
    'molto',
    'molti',
    'molta',
    'molte',
    'poco',
    'pochi',
    'poca',
    'poche',
    'grande',
    'grandi',
    'piccolo',
    'piccoli',
    'piccola',
    'piccole',
    'anche',
    'ciao',
    'mondo',
  ],
  [Language.Portuguese]: [
    'o',
    'a',
    'os',
    'as',
    'um',
    'uma',
    'uns',
    'umas',
    'e',
    'é',
    'que',
    'de',
    'em',
    'para',
    'com',
    'não',
    'por',
    'se',
    'na',
    'do',
    'da',
    'dos',
    'das',
    'no',
    'nas',
    'ao',
    'aos',
    'à',
    'às',
    'pelo',
    'pela',
    'pelos',
    'pelas',
    'este',
    'esta',
    'estes',
    'estas',
    'esse',
    'essa',
    'esses',
    'essas',
    'aquele',
    'aquela',
    'aqueles',
    'aquelas',
    'isto',
    'isso',
    'aquilo',
    'meu',
    'minha',
    'meus',
    'minhas',
    'teu',
    'tua',
    'teus',
    'tuas',
    'seu',
    'sua',
    'seus',
    'suas',
    'nosso',
    'nossa',
    'nossos',
    'nossas',
    'vosso',
    'vossa',
    'vossos',
    'vossas',
    'dele',
    'dela',
    'deles',
    'delas',
    'nele',
    'nela',
    'neles',
    'nelas',
    'olá',
    'mundo',
  ],
  [Language.Dutch]: [
    'de',
    'het',
    'een',
    'is',
    'en',
    'van',
    'in',
    'te',
    'dat',
    'op',
    'voor',
    'niet',
    'met',
    'zijn',
    'worden',
    'deze',
    'dit',
    'door',
    'er',
    'ook',
    'als',
    'aan',
    'maar',
    'bij',
    'nog',
    'om',
    'uit',
    'zo',
    'dan',
    'over',
    'na',
    'toen',
    'tot',
    'werd',
    'wel',
    'nu',
    'je',
    'jij',
    'jou',
    'jouw',
    'ik',
    'mij',
    'mijn',
    'hij',
    'hem',
    'zijn',
    'zij',
    'haar',
    'we',
    'wij',
    'ons',
    'onze',
    'jullie',
    'hun',
    'hen',
    'hallo',
    'wereld',
  ],
  [Language.Unknown]: [],
};

// Common English words that should strongly bias toward English
const commonEnglishWords = new Set([
  'hello',
  'world',
  'the',
  'this',
  'that',
  'there',
  'their',
  'they',
  'them',
  'then',
  'and',
  'but',
  'or',
  'not',
  'what',
  'when',
  'where',
  'who',
  'why',
  'how',
  'all',
  'any',
  'every',
  'some',
  'many',
  'much',
  'few',
  'little',
  'other',
  'another',
  'such',
  'even',
  'only',
  'just',
  'also',
  'very',
  'too',
  'quite',
  'rather',
  'enough',
]);

// Cache for previously analyzed texts
const resultCache = new Map<string, LanguageDetectionResult>();

// Normalizes a language profile for cosine similarity
const normalizedProfiles: Record<Language, Map<string, number>> = Object.entries(
  languageProfiles,
).reduce(
  (acc, [lang, profile]) => {
    if (lang !== Language.Unknown) {
      // Calculate magnitude for normalization
      const entries = Object.entries(profile);
      const magnitude = Math.sqrt(entries.reduce((sum, [, value]) => sum + value * value, 0));

      // Create normalized map
      const normalizedMap = new Map<string, number>();
      entries.forEach(([char, value]) => {
        normalizedMap.set(char, value / magnitude);
      });

      acc[lang as Language] = normalizedMap;
    } else {
      acc[Language.Unknown] = new Map<string, number>();
    }
    return acc;
  },
  {} as Record<Language, Map<string, number>>,
);

// Handle very common language expressions directly
const commonPhrases = new Map([
  // English phrases
  ['hello world', Language.English],
  ['hello', Language.English],
  ['hi there', Language.English],
  ['good morning', Language.English],
  ['good evening', Language.English],
  ['good night', Language.English],
  ['thank you', Language.English],
  ['how are you', Language.English],
  ['nice to meet you', Language.English],

  // Spanish phrases
  ['hola mundo', Language.Spanish],
  ['hola', Language.Spanish],
  ['buenos días', Language.Spanish],
  ['buenas tardes', Language.Spanish],
  ['buenas noches', Language.Spanish],
  ['gracias', Language.Spanish],
  ['cómo estás', Language.Spanish],
  ['mucho gusto', Language.Spanish],

  // German phrases
  ['hallo welt', Language.German],
  ['hallo', Language.German],
  ['guten morgen', Language.German],
  ['guten tag', Language.German],
  ['guten abend', Language.German],
  ['danke', Language.German],
  ['wie geht es dir', Language.German],

  // French phrases
  ['bonjour le monde', Language.French],
  ['bonjour', Language.French],
  ['bonsoir', Language.French],
  ['merci', Language.French],
  ['comment allez-vous', Language.French],
  ['enchanté', Language.French],

  // Italian phrases
  ['ciao mondo', Language.Italian],
  ['ciao', Language.Italian],
  ['buongiorno', Language.Italian],
  ['buonasera', Language.Italian],
  ['grazie', Language.Italian],
  ['come stai', Language.Italian],
  ['piacere', Language.Italian],

  // Portuguese phrases
  ['olá mundo', Language.Portuguese],
  ['olá', Language.Portuguese],
  ['bom dia', Language.Portuguese],
  ['boa tarde', Language.Portuguese],
  ['boa noite', Language.Portuguese],
  ['obrigado', Language.Portuguese],
  ['como vai', Language.Portuguese],
  ['prazer em conhecê-lo', Language.Portuguese],

  // Dutch phrases
  ['hallo wereld', Language.Dutch],
  ['hallo', Language.Dutch],
  ['goedemorgen', Language.Dutch],
  ['goedemiddag', Language.Dutch],
  ['goedenavond', Language.Dutch],
  ['dank je', Language.Dutch],
  ['hoe gaat het', Language.Dutch],
]);

// Special handling for languages with unique characters
const uniqueChars: Partial<Record<Language, string[]>> = {
  [Language.German]: ['ä', 'ö', 'ü', 'ß'],
  [Language.French]: ['é', 'è', 'ê', 'ë', 'à', 'â', 'ù', 'û', 'î', 'ï', 'ô', 'œ', 'ç'],
  [Language.Spanish]: ['ñ', 'á', 'é', 'í', 'ó', 'ú', 'ü', '¿', '¡'],
  [Language.Italian]: ['à', 'è', 'é', 'ì', 'í', 'î', 'ò', 'ó', 'ù', 'ú'],
  [Language.Portuguese]: ['ã', 'õ', 'á', 'à', 'â', 'é', 'ê', 'í', 'ó', 'ô', 'ú', 'ç'],
};

/**
 * Detects the most likely language of a given text
 *
 * @param text The text to analyze
 * @param minLength Minimum text length for reliable detection (default: 4)
 * @param options Additional options for detection
 * @returns Language detection result with confidence score
 * @example
 * detectLanguage('Bonjour le monde'); // { language: 'French', ... }
 */
export function detectLanguage(
  text: string,
  minLength: number = 4,
  options: { maxCharsToAnalyze?: number; useCache?: boolean } = {
    maxCharsToAnalyze: 500,
    useCache: true,
  },
): LanguageDetectionResult {
  const { maxCharsToAnalyze = 500, useCache = true } = options;

  // Caching shortcut
  if (useCache && resultCache.has(text)) {
    return resultCache.get(text)!;
  }

  // Empty string case
  if (!text || text.trim().length === 0) {
    return {
      language: Language.Unknown,
      confidence: 0,
      scores: Object.fromEntries(
        Object.values(Language).map((l) => [l, l === Language.Unknown ? 1 : 0]),
      ) as Record<Language, number>,
    };
  }

  const lowerText = text.toLowerCase().trim();

  // Phrase shortcut (exact match)
  if (commonPhrases.has(lowerText)) {
    const detected = commonPhrases.get(lowerText)!;
    const result: LanguageDetectionResult = {
      language: detected,
      confidence: 0.95,
      scores: Object.fromEntries(
        Object.values(Language).map((l) => [
          l,
          l === detected ? 0.95 : 0.05 / (Object.values(Language).length - 1),
        ]),
      ) as Record<Language, number>,
    };
    if (useCache) cacheResult(text, result);
    return result;
  }

  const isShort = text.length < minLength;
  const analyzedText = text.slice(0, maxCharsToAnalyze).toLowerCase().replace(/[0-9]/g, '');

  const charCount = new Map<string, number>();
  let totalChars = 0;

  const bigramSet = new Set([
    'th',
    'he',
    'in',
    'er',
    'an',
    'en',
    'ch',
    'de',
    'ei',
    'te',
    'st',
    'le',
    'ou',
    'qu',
    'je',
    'ai',
    'ui',
    'ie',
    're',
    'oo',
  ]);
  for (let i = 0; i < analyzedText.length; i++) {
    const char = analyzedText[i];
    if (/[a-zäöüßàáâéèêëïîìíñóòôùúûç]/i.test(char)) {
      charCount.set(char, (charCount.get(char) || 0) + 1);
      totalChars++;
      if (i < analyzedText.length - 1) {
        const bigram = analyzedText.substring(i, i + 2);
        if (bigramSet.has(bigram)) {
          charCount.set(bigram, (charCount.get(bigram) || 0) + 0.5);
          totalChars += 0.25;
        }
      }
    }
  }

  if (totalChars < 2) {
    return {
      language: Language.Unknown,
      confidence: 0.1,
      scores: Object.fromEntries(
        Object.values(Language).map((l) => [
          l,
          l === Language.Unknown ? 0.9 : 0.1 / (Object.values(Language).length - 1),
        ]),
      ) as Record<Language, number>,
    };
  }

  for (const [lang, chars] of Object.entries(uniqueChars)) {
    for (const char of chars) {
      if (analyzedText.includes(char)) {
        charCount.set('unique_' + lang, (charCount.get('unique_' + lang) || 0) + 18);
        totalChars += 3;
      }
    }
  }

  const words = analyzedText.split(/\s+/);

  // Skip gibberish check if any language keyword is present
  const languageKeywords = [
    ['english', Language.English],
    ['deutsch', Language.German],
    ['german', Language.German],
    ['français', Language.French],
    ['french', Language.French],
    ['español', Language.Spanish],
    ['spanish', Language.Spanish],
    ['italiano', Language.Italian],
    ['italian', Language.Italian],
    ['português', Language.Portuguese],
    ['portuguese', Language.Portuguese],
    ['nederlands', Language.Dutch],
    ['dutch', Language.Dutch],
  ];
  const hasKeyword = languageKeywords.some(([kw]) => analyzedText.includes(kw));

  // Gibberish check: if no stopwords from any language and more than 2 words, return unknown
  if (!hasKeyword) {
    const stopwordHits = Object.values(Language)
      .filter((l) => l !== Language.Unknown)
      .some((lang) => words.some((word) => stopwords[lang].includes(word)));

    if (!stopwordHits && words.length > 2) {
      return {
        language: Language.Unknown,
        confidence: 0,
        scores: Object.fromEntries(
          Object.values(Language).map((l) => [l, l === Language.Unknown ? 1 : 0]),
        ) as Record<Language, number>,
      };
    }
  }

  for (const lang of Object.values(Language).filter((l) => l !== Language.Unknown)) {
    for (const word of words) {
      if (stopwords[lang].includes(word)) {
        const boost = lang === Language.English && commonEnglishWords.has(word) ? 36 : 28;
        charCount.set(`stopword_${lang}`, (charCount.get(`stopword_${lang}`) || 0) + boost);
        totalChars += 3;
      }
    }
  }

  const keywords = [
    ['english', Language.English],
    ['deutsch', Language.German],
    ['german', Language.German],
    ['français', Language.French],
    ['french', Language.French],
    ['español', Language.Spanish],
    ['spanish', Language.Spanish],
    ['italiano', Language.Italian],
    ['italian', Language.Italian],
    ['português', Language.Portuguese],
    ['portuguese', Language.Portuguese],
    ['nederlands', Language.Dutch],
    ['dutch', Language.Dutch],
  ];
  for (const [kw, lang] of keywords) {
    if (analyzedText.includes(kw)) {
      charCount.set(`keyword_${lang}`, (charCount.get(`keyword_${lang}`) || 0) + 70);
      totalChars += 8;
    }
  }

  const freqMap = normalizeVector(charCount);

  const scores: Record<Language, number> = {} as Record<Language, number>;
  let maxScore = 0;
  let detected: Language = Language.Unknown;

  for (const lang of Object.values(Language)) {
    if (lang === Language.Unknown) {
      scores[lang] = 0;
      continue;
    }

    const profile = normalizedProfiles[lang];
    let score = 0;

    for (const [token, normFreq] of freqMap.entries()) {
      if (token.startsWith(`unique_${lang}`)) score += normFreq * 2;
      else if (token.startsWith(`stopword_${lang}`)) score += normFreq * 3;
      else if (token.startsWith(`keyword_${lang}`)) score += normFreq * 5;
      else if (profile.has(token)) score += normFreq * profile.get(token)!;
    }

    scores[lang] = score;

    if (score > maxScore) {
      maxScore = score;
      detected = lang;
    }
  }

  // Set gibberish threshold to 0.4
  if (maxScore < 0.4) {
    detected = Language.Unknown;
    scores[Language.Unknown] = 1;
  }

  const sumScores = Object.values(scores).reduce((a, b) => a + b, 0);
  let confidence = sumScores > 0 ? maxScore / sumScores : 0;
  if (isShort) confidence *= 0.8;
  // For long texts, boost confidence
  if (analyzedText.length > 40) confidence = Math.min(confidence * 1.1, 1.0);
  confidence =
    confidence > 0.7 ? 0.95 : confidence > 0.55 ? 0.85 : confidence > 0.4 ? 0.7 : confidence;

  const result: LanguageDetectionResult = {
    language: detected,
    confidence,
    scores,
  };
  if (useCache) cacheResult(text, result);
  return result;
}

// --- UTILS ---

function normalizeVector(map: Map<string, number>): Map<string, number> {
  const magnitude = Math.sqrt([...map.values()].reduce((sum, val) => sum + val * val, 0));
  const normMap = new Map<string, number>();
  for (const [key, val] of map.entries()) {
    normMap.set(key, val / magnitude);
  }
  return normMap;
}

function cacheResult(text: string, result: LanguageDetectionResult) {
  if (resultCache.size >= 100) {
    const firstKey = resultCache.keys().next().value;
    if (typeof firstKey === 'string') {
      resultCache.delete(firstKey);
    }
  }
  resultCache.set(text, result);
}
