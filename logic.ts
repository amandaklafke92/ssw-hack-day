// ==========================================
// 1. TYPES & CONTRACT INTERFACE
// ==========================================

export type QuizAnswers = {
  age: number;
  country: string;
  drinksAlcohol: boolean;
  hasSpeedingTicket: boolean;
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
  tags: string[]; // e.g. 'reckless', 'sedentary', 'health-nut', 'unlucky', 'chaotic'
};

// ==========================================
// 2. THE SCENARIO BANK (18 Absurd Scenarios)
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

  // Unlucky / General Pool (Fallbacks)
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
    id: 'general_1',
    tags: [], // Fallback general
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

// Global averages fallback + standard country tables (Grounded baseline data)
const GLOBAL_DEFAULT_EXPECTANCY = 73.0;

const LIFE_EXPECTANCY_TABLE: Record<string, number> = {
  "australia": 83.2,
  "united states": 77.3,
  "united kingdom": 80.9,
  "canada": 81.7,
  "new zealand": 82.5,
  "brazil": 76.2,
  "vietnam": 74.1,
  "japan": 84.6,
  "germany": 80.8,
  "france": 82.4
};

// ==========================================
// 4. LOGIC ENGINE FUNCTIONS
// ==========================================

/**
 * Maps frontend user answers into specific targeting tags
 */
function determineTags(answers: QuizAnswers): string[] {
  const tags: string[] = [];
  
  if (answers.hasSpeedingTicket) tags.push('reckless');
  if (answers.exerciseLevel === 'low') tags.push('sedentary');
  if (answers.exerciseLevel === 'high' && !answers.drinksAlcohol) tags.push('health-nut');
  if (answers.drinksAlcohol && answers.hasSpeedingTicket) tags.push('chaotic');

  return tags;
}

/**
 * Calculates a funny but mathematically functional death date based on modifiers
 */
function calculateDeathDate(answers: QuizAnswers): { dateStr: string; daysLeft: number } {
  // Edge case safety check: Norm/clean input country string
  const normalizedCountry = (answers.country || "").trim().toLowerCase();
  
  // Base expectation fetch
  let baseExpectancy = LIFE_EXPECTANCY_TABLE[normalizedCountry] || GLOBAL_DEFAULT_EXPECTANCY;
  
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
  
  // Filter bank down to elements containing AT LEAST one matching user tag
  let matchingPool = SCENARIO_BANK.filter(scenario => 
    scenario.tags.some(tag => targetTags.includes(tag))
  );

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
