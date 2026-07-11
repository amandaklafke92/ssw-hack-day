// ==========================================
// 1. TYPES & CONTRACT INTERFACE
// ==========================================

import lifeExpectancyData from './life.json';

export type QuizAnswers = {
  age: number;
  gender: 'male' | 'female' | 'other';
  country: string;
  drinksAlcohol: boolean;
  hasSpeedingTicket: boolean;
  mood: 'calm' | 'stressed' | 'reckless' | 'existential';
  exerciseLevel: 'low' | 'medium' | 'high';
};

export type Reading = {
  deathDate: string;       // e.g. "March 14, 2071"
  daysRemaining: number;
  causeOfDeath: string;    // the absurd scenario text
  tagline: string;         // short closing line for the card
};

type DeathScenario = {
  id: string;
  text: string;
  tagline: string;
  tags: string[]; // e.g. 'reckless', 'sedentary', 'health-nut', 'unlucky', 'chaotic', 'tech-doom'
};

// ==========================================
// 2. THE SCENARIO BANK (34 Absurd Scenarios)
// ==========================================

const SCENARIO_BANK: DeathScenario[] = [
  // Reckless Tag
  {
    id: 'reckless_1',
    tags: ['reckless'],
    text: "While attempting to break the land speed record in a heavily modified, rocket-powered shopping cart, you misjudge the brakes and launch directly into a billboard advertising life insurance.",
    tagline: "At least you died doing what you loved: ignoring warnings."
  },
  {
    id: 'reckless_2',
    tags: ['reckless'],
    text: "You challenge a local street racing gang while driving a standard ride-on lawnmower. The race goes poorly when you hit a patch of loose gravel at 8 miles per hour.",
    tagline: "Speed thrills, but mowing kills."
  },
  {
    id: 'reckless_3',
    tags: ['reckless'],
    text: "You decide to try an extreme parkour jump from a suburban roof onto a trampoline, only to miss entirely and land perfectly inside an unlocked, empty wheelie bin just as the garbage truck arrives.",
    tagline: "Recycled ahead of your time."
  },

  // Road-Risk Tag
  {
    id: 'road_risk_1',
    tags: ['road-risk', 'reckless'],
    text: "While explaining that you are actually a very safe driver, your own parked car rolls downhill with impeccable timing and a suspicious sense of irony.",
    tagline: "Your driving record filed the final report."
  },

  // Reckless-Party Tag
  {
    id: 'reckless_party_1',
    tags: ['reckless-party', 'party-risk', 'road-risk', 'chaotic'],
    text: "After declaring yourself completely fine to drive a go-kart in a pub car park, you lose a duel with a traffic cone that had right of way.",
    tagline: "The cone was sober."
  },

  // Sedentary Tag
  {
    id: 'sedentary_1',
    tags: ['sedentary'],
    text: "After a record-breaking 48-hour couch marathon, the smart-TV falls forward off the wall mount, pinning you under its crushing high-definition weights.",
    tagline: "The screen time finally caught up to you."
  },
  {
    id: 'sedentary_2',
    tags: ['sedentary'],
    text: "You sink so deeply into an ergonomically flawed beanbag chair that you form a localized black hole, collapsing into a single point of zero productivity.",
    tagline: "Comfort is a silent killer."
  },
  {
    id: 'sedentary_3',
    tags: ['sedentary'],
    text: "While waiting for the elevator to take you up exactly one floor, an aggressive rogue robot vacuum cleaner sweeps your feet out from under you.",
    tagline: "You should have taken the stairs."
  },

  // Couch-Party Tag
  {
    id: 'couch_party_1',
    tags: ['couch-party', 'sedentary', 'party-risk'],
    text: "A couch, a half-finished drink, and one ambitious reach for the remote become a closed-casket situation with excellent surround sound.",
    tagline: "Laid back, then laid out."
  },

  // Health-Nut Tag
  {
    id: 'health_nut_1',
    tags: ['health-nut'],
    text: "During an aggressive kale-blending session, your industrial-grade 2000W blender suffers a catastrophic flywheel failure, launching a piece of organic superfood through the sound barrier.",
    tagline: "Too much green can be fatal."
  },
  {
    id: 'health_nut_2',
    tags: ['health-nut'],
    text: "While performing an advanced, highly unnecessary yoga pose on the edge of a scenic cliff for social media, a rogue gust of wind catches your loose-fitting organic cotton pants.",
    tagline: "Namaste... in the afterlife."
  },
  {
    id: 'health_nut_3',
    tags: ['health-nut'],
    text: "An over-enthusiastic personal trainer drops a 45lb bumper plate directly onto your toes, causing you to trip backward into a display pyramid of protein powder tubs.",
    tagline: "Crushed by your own gains."
  },

  // Fitness-Irony Tag
  {
    id: 'fitness_irony_1',
    tags: ['fitness-irony', 'health-nut'],
    text: "Your smartwatch congratulates you on closing all rings just as a resistance band slips free and achieves a level of vengeance normally reserved for mythology.",
    tagline: "Personal best, final worst."
  },

  // Chaotic Tag
  {
    id: 'chaotic_1',
    tags: ['chaotic'],
    text: "You engage in an intense, sustained argument with a highly intelligent magpie over a shiny wrapper. The bird orchestrates a coordinated 40-bird swooping attack.",
    tagline: "Never cross a corvid."
  },
  {
    id: 'chaotic_2',
    tags: ['chaotic'],
    text: "While trying to open a stubborn plastic clamshell package with a pair of hedge shears, you accidentally set off a chain reaction that detonates your neighbor's illegal firework stash.",
    tagline: "Safety scissors exist for a reason."
  },
  {
    id: 'chaotic_3',
    tags: ['chaotic'],
    text: "You lose a high-stakes rock-paper-scissors match against a highly advanced AI vending machine, which immediately tilts forward and crushes your pride (and bones).",
    tagline: "It threw rock. You threw nothing fast enough."
  },

  // Party-Risk Tag
  {
    id: 'party_risk_1',
    tags: ['party-risk', 'chaotic'],
    text: "You declare 'I'm basically fine' moments before challenging a kebab shop sign to single combat in front of a deeply unimpressed taxi queue.",
    tagline: "The sign remains undefeated."
  },
  {
    id: 'party_risk_2',
    tags: ['party-risk'],
    text: "You try to recreate a dance move last seen in 2008 and discover that physics has not forgiven anyone for that era.",
    tagline: "The beat dropped. So did you."
  },

  // Australia Tag
  {
    id: 'australia_1',
    tags: ['australia', 'chaotic'],
    text: "A magpie remembers your face from 2019 and completes a long-term revenge arc with the patience of a tiny feathered tax auditor.",
    tagline: "Spring came for you personally."
  },
  {
    id: 'australia_2',
    tags: ['australia', 'unlucky'],
    text: "You ignore a beach warning sign because the ocean looks pretty chill today. The ocean takes that personally.",
    tagline: "Never negotiate with surf."
  },

  // Mood / General Pool (Fallbacks)
  {
    id: 'unlucky_1',
    tags: ['unlucky'],
    text: "A rogue frozen block of airplane lavatory waste falls from 30,000 feet, accurately targeting your exact coordinates while you are opening your mail.",
    tagline: "Talk about terrible timing."
  },
  {
    id: 'unlucky_2',
    tags: ['unlucky'],
    text: "You trip over a sleeping black cat, bump into a ladder knocking over a mirror, and fall directly into a manhole that was being worked on by an ironworker named Friday.",
    tagline: "Luck was never an option."
  },
  {
    id: 'mood_stressed_1',
    tags: ['stressed', 'tech-doom', 'chaotic'],
    text: "You finally clear your inbox, only for one unread email marked 'quick question' to unfold into a 900-page workplace prophecy.",
    tagline: "Inbox zero, pulse zero."
  },
  {
    id: 'mood_existential_1',
    tags: ['existential', 'clean-living'],
    text: "You stare into the void so politely that the void files a support ticket, escalates it to management, and accidentally closes your account.",
    tagline: "The void appreciated your patience."
  },
  {
    id: 'mood_reckless_1',
    tags: ['reckless-mood', 'reckless', 'chaotic'],
    text: "A sudden urge to make the day more interesting leads you to press a large red button labeled 'probably decorative.' It is not decorative.",
    tagline: "Impulse control left you on read."
  },
  {
    id: 'mood_calm_1',
    tags: ['calm', 'clean-living'],
    text: "Your calm becomes so powerful that fate mistakes you for a threat and sends a highly localized administrative meteor.",
    tagline: "Serenity had consequences."
  },
  {
    id: 'clean_living_1',
    tags: ['clean-living'],
    text: "Your excellent habits confuse fate, which panics and schedules something wildly unfair involving a loose bookshelf and one missing Allen key.",
    tagline: "Virtue delayed the inevitable, briefly."
  },
  {
    id: 'clean_living_2',
    tags: ['clean-living'],
    text: "You live responsibly for years, then lose a duel with a poorly assembled flat-pack wardrobe named after a Swedish vowel.",
    tagline: "Clean living, messy ending."
  },
  {
    id: 'tech_doom_1',
    tags: ['tech-doom'],
    text: "You open one final Jira ticket and vanish into the backlog forever, where estimates are eternal and acceptance criteria are written in riddles.",
    tagline: "Moved to Done, spiritually."
  },
  {
    id: 'tech_doom_2',
    tags: ['tech-doom'],
    text: "You accept all cookies and are immediately crushed by a pallet of actual cookies delivered under an alarmingly literal privacy policy.",
    tagline: "Consent has consequences."
  },
  {
    id: 'general_1',
    tags: ['tech-doom'], // Fallback general
    text: "While distracted trying to calculate your exact remaining life expectancy on a questionable website, you walk directly into a low-hanging tree branch.",
    tagline: "Irony is a harsh mistress."
  },
  {
    id: 'general_2',
    tags: [],
    text: "You swallow a live watermelon seed, which defies all biological laws by successfully sprouting and growing a full-sized melon inside your chest cavity overnight.",
    tagline: "Your mother warned you about this."
  },
  {
    id: 'general_3',
    tags: [],
    text: "A runaway street clown unicycle collides with you at high velocity, spraying you with trick flower water that turns out to be industrial adhesive.",
    tagline: "Send in the clowns."
  },
  {
    id: 'general_4',
    tags: [],
    text: "You are buried alive under an unexpected avalanche of expired coupons you collected over a fifteen-year period but never used.",
    tagline: "The savings were truly monumental."
  }
];

// ==========================================
// 3. DATA LOOKUPS (Life Expectancy)
// ==========================================

// Global average fallback for countries not in life.json
const GLOBAL_DEFAULT_EXPECTANCY = 73.0;

type LifeExpectancyEntry = {
  country: string;
  both: number;
  female: number;
  male: number;
  rank: number;
};

const LIFE_EXPECTANCY_BY_COUNTRY: Record<string, LifeExpectancyEntry> = (
  lifeExpectancyData as LifeExpectancyEntry[]
).reduce((table, entry) => {
  table[entry.country.trim().toLowerCase()] = entry;
  return table;
}, {} as Record<string, LifeExpectancyEntry>);

/**
 * Looks up base life expectancy for a country, split by gender where available.
 * 'other' (and any gender for an unmatched country) falls back to the 'both' column.
 */
function getBaseExpectancy(country: string, gender: QuizAnswers['gender']): number {
  const entry = LIFE_EXPECTANCY_BY_COUNTRY[(country || '').trim().toLowerCase()];
  if (!entry) return GLOBAL_DEFAULT_EXPECTANCY;

  if (gender === 'male') return entry.male;
  if (gender === 'female') return entry.female;
  return entry.both;
}

// ==========================================
// 4. LOGIC ENGINE FUNCTIONS
// ==========================================

/**
 * Maps frontend user answers into specific targeting tags
 */
function determineTags(answers: QuizAnswers): string[] {
  const tags: string[] = [];
  
  if (answers.drinksAlcohol) tags.push('party-risk');
  if (answers.hasSpeedingTicket) tags.push('reckless', 'road-risk');
  if (answers.exerciseLevel === 'low') tags.push('sedentary');
  if (answers.exerciseLevel === 'high') tags.push('fitness-irony');
  if (answers.exerciseLevel === 'high' && !answers.drinksAlcohol) tags.push('health-nut');
  if (answers.drinksAlcohol && answers.hasSpeedingTicket) tags.push('chaotic', 'reckless-party');
  if (answers.exerciseLevel === 'low' && answers.drinksAlcohol) tags.push('couch-party');
  if (answers.mood === 'calm') tags.push('calm', 'clean-living');
  if (answers.mood === 'stressed') tags.push('stressed', 'tech-doom', 'chaotic');
  if (answers.mood === 'reckless') tags.push('reckless-mood', 'reckless', 'chaotic');
  if (answers.mood === 'existential') tags.push('existential', 'clean-living');
  if ((answers.country || '').trim().toLowerCase() === 'australia') tags.push('australia');
  if (!answers.drinksAlcohol && !answers.hasSpeedingTicket && answers.exerciseLevel !== 'low' && answers.mood === 'calm') {
    tags.push('clean-living', 'tech-doom');
  }

  return tags;
}

/**
 * Calculates a funny but mathematically functional death date based on modifiers
 */
function calculateDeathDate(answers: QuizAnswers): { dateStr: string; daysLeft: number } {
  // Base expectation fetch, split by gender where the country has that data
  let baseExpectancy = getBaseExpectancy(answers.country, answers.gender);

  // Apply modifiers (as defined by PRD)
  if (answers.drinksAlcohol) baseExpectancy -= 2.0;
  if (answers.hasSpeedingTicket) baseExpectancy -= 1.5;
  if (answers.exerciseLevel === 'low') baseExpectancy -= 3.0;
  if (answers.exerciseLevel === 'high') baseExpectancy += 2.0;

  // Edge case sanity checks: Extreme ages or negative remaining timelines
  // Always guarantee they get at least 1 more year to live if they are already older than expectancy
  let finalPredictedAge = baseExpectancy;
  if (answers.age >= finalPredictedAge) {
    finalPredictedAge = answers.age + Math.floor(Math.random() * 4) + 1; // 1 to 4 years left max
  }

  // Calculate timelines relative to today
  const yearsRemaining = finalPredictedAge - answers.age;
  const daysRemaining = Math.max(1, Math.floor(yearsRemaining * 365.25));

  const today = new Date();
  const deathDateObj = new Date(today.getTime() + daysRemaining * 24 * 60 * 60 * 1000);

  // Formatting date string nicely for Amanda's UI layer (e.g., "March 14, 2071")
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const deathDateStr = deathDateObj.toLocaleDateString('en-US', options);

  return {
    dateStr: deathDateStr,
    daysLeft: daysRemaining
  };
}

// ==========================================
// 5. THE INTEGRATION EXPORT CONTRACT
// ==========================================

export function getReading(answers: QuizAnswers): Reading {
  // 1. Tag matching logic
  const targetTags = determineTags(answers);
  
  // Score scenarios by specificity so combined answers beat broad one-tag matches.
  const scoredScenarios = SCENARIO_BANK.map(scenario => ({
    scenario,
    score: scenario.tags.filter(tag => targetTags.includes(tag)).length
  }));

  const highestScore = Math.max(...scoredScenarios.map(({ score }) => score));
  let matchingPool = scoredScenarios
    .filter(({ score }) => score === highestScore && score > 0)
    .map(({ scenario }) => scenario);

  // Fallback pool handling if no tags match or if array runs dry
  if (matchingPool.length === 0) {
    // Grab entirely untagged general items + 'unlucky' ones
    matchingPool = SCENARIO_BANK.filter(scenario => 
      scenario.tags.length === 0 || scenario.tags.includes('unlucky')
    );
  }

  // Pick random element safely from the evaluated subset
  const randomIndex = Math.floor(Math.random() * matchingPool.length);
  const selectedScenario = matchingPool[randomIndex];

  // 2. Date calculation running modifiers 
  const timeline = calculateDeathDate(answers);

  // Return formatted contract matching standard interface exactly
  return {
    deathDate: timeline.dateStr,
    daysRemaining: timeline.daysLeft,
    causeOfDeath: selectedScenario.text,
    tagline: selectedScenario.tagline
  };
}
