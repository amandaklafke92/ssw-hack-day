import type { QuizAnswers, Reading } from './logic';

export type ImageStyleTag =
  | 'reckless'
  | 'sedentary'
  | 'health-nut'
  | 'tech-doom'
  | 'australia'
  | 'existential'
  | 'calm'
  | 'chaotic'
  | 'default';

export type ImageContext = {
  imageStatus: 'success';
  generatedBackgroundUrl: string;
  fallbackStyleTag: ImageStyleTag;
  imagePrompt: string;
  imageAlt: string;
};

type ImageTheme = {
  styleTag: ImageStyleTag;
  promptDetail: string;
  alt: string;
};

const POLLINATIONS_IMAGE_BASE_URL = 'https://image.pollinations.ai/prompt/';

const IMAGE_THEME_BY_TAG: Record<ImageStyleTag, ImageTheme> = {
  reckless: {
    styleTag: 'reckless',
    promptDetail: 'road warning signs, motion blur, caution tape, dramatic hazard lighting',
    alt: 'Reckless Grim result background'
  },
  sedentary: {
    styleTag: 'sedentary',
    promptDetail: 'dim living room, couch silhouette, eerie television glow, soft shadows',
    alt: 'Sedentary Grim result background'
  },
  'health-nut': {
    styleTag: 'health-nut',
    promptDetail: 'surreal gym lighting, green highlights, fitness props, dramatic irony',
    alt: 'Health and fitness Grim result background'
  },
  'tech-doom': {
    styleTag: 'tech-doom',
    promptDetail: 'glitch effects, terminal windows, office doom, digital static, scanlines',
    alt: 'Tech doom Grim result background'
  },
  australia: {
    styleTag: 'australia',
    promptDetail: 'harsh sunlight, beach warning sign, outback colors, ominous bird silhouette',
    alt: 'Australia Grim result background'
  },
  existential: {
    styleTag: 'existential',
    promptDetail: 'cosmic void, surreal paperwork, dark stars, bureaucratic fate office',
    alt: 'Existential Grim result background'
  },
  calm: {
    styleTag: 'calm',
    promptDetail: 'clean portrait frame, quiet ominous halo, elegant certificate border',
    alt: 'Calm Grim result background'
  },
  chaotic: {
    styleTag: 'chaotic',
    promptDetail: 'absurd chain reaction, dramatic lighting, scattered props, comic disaster energy',
    alt: 'Chaotic Grim result background'
  },
  default: {
    styleTag: 'default',
    promptDetail: 'dark oracle room, candlelit certificate, fog, subtle gothic comedy atmosphere',
    alt: 'Grim result background'
  }
};

const IMAGE_TAG_PRIORITY: Array<{ tag: string; styleTag: ImageStyleTag }> = [
  { tag: 'australia', styleTag: 'australia' },
  { tag: 'tech-doom', styleTag: 'tech-doom' },
  { tag: 'existential', styleTag: 'existential' },
  { tag: 'calm', styleTag: 'calm' },
  { tag: 'sedentary', styleTag: 'sedentary' },
  { tag: 'couch-party', styleTag: 'sedentary' },
  { tag: 'health-nut', styleTag: 'health-nut' },
  { tag: 'fitness-irony', styleTag: 'health-nut' },
  { tag: 'reckless-party', styleTag: 'reckless' },
  { tag: 'road-risk', styleTag: 'reckless' },
  { tag: 'reckless', styleTag: 'reckless' },
  { tag: 'party-risk', styleTag: 'chaotic' },
  { tag: 'chaotic', styleTag: 'chaotic' }
];

function determineImageTags(answers: QuizAnswers): string[] {
  const tags: string[] = [];

  if (answers.drinksAlcohol) tags.push('party-risk');
  if (answers.hasSpeedingTicket) tags.push('reckless', 'road-risk');
  if (answers.exerciseLevel === 'low') tags.push('sedentary');
  if (answers.exerciseLevel === 'high') tags.push('fitness-irony');
  if (answers.exerciseLevel === 'high' && !answers.drinksAlcohol) tags.push('health-nut');
  if (answers.drinksAlcohol && answers.hasSpeedingTicket) tags.push('chaotic', 'reckless-party');
  if (answers.exerciseLevel === 'low' && answers.drinksAlcohol) tags.push('couch-party');
  if (answers.mood === 'calm') tags.push('calm');
  if (answers.mood === 'stressed') tags.push('tech-doom', 'chaotic');
  if (answers.mood === 'reckless') tags.push('reckless', 'chaotic');
  if (answers.mood === 'existential') tags.push('existential');
  if ((answers.country || '').trim().toLowerCase() === 'australia') tags.push('australia');

  return tags;
}

function chooseImageStyleTag(answers: QuizAnswers): ImageStyleTag {
  const targetTags = determineImageTags(answers);
  const match = IMAGE_TAG_PRIORITY.find(({ tag }) => targetTags.includes(tag));
  return match?.styleTag || 'default';
}

function shortenForPrompt(text: string, maxLength = 220): string {
  const cleanText = text.replace(/\s+/g, ' ').trim();
  if (cleanText.length <= maxLength) return cleanText;
  return `${cleanText.slice(0, maxLength).trim()}...`;
}

function buildImagePrompt(reading: Reading, theme: ImageTheme): string {
  const safeCause = shortenForPrompt(reading.causeOfDeath);

  return [
    'Dark comedy Grim oracle background illustration',
    theme.promptDetail,
    `symbolic inspiration: ${safeCause}`,
    'non-graphic',
    'no gore',
    'no wounds',
    'no injury detail',
    'no self-harm',
    'no realistic death scene',
    'cinematic lighting',
    'high contrast',
    'screenshot-friendly',
    'no text in image'
  ].join(', ');
}

export function buildPollinationsImageUrl(imagePrompt: string): string {
  return `${POLLINATIONS_IMAGE_BASE_URL}${encodeURIComponent(imagePrompt)}?width=768&height=512&nologo=true&safe=true`;
}

export function getImageContext(answers: QuizAnswers, reading: Reading): ImageContext {
  const fallbackStyleTag = chooseImageStyleTag(answers);
  const theme = IMAGE_THEME_BY_TAG[fallbackStyleTag] || IMAGE_THEME_BY_TAG.default;
  const imagePrompt = buildImagePrompt(reading, theme);

  return {
    imageStatus: 'success',
    generatedBackgroundUrl: buildPollinationsImageUrl(imagePrompt),
    fallbackStyleTag,
    imagePrompt,
    imageAlt: theme.alt
  };
}
