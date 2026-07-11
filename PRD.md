# Grim — Front-End PRD

## 1. Project Overview

Grim is a single-page, single-session web app that plays the role of a comedic death oracle. A user answers a short quiz (age, location, a few lifestyle/risk questions), and the app reveals an absurd-but-grounded prediction: a specific death date, a cause-of-death scenario written for laughs, and a closing line about how many days they have left. No accounts, no backend, no live AI calls — everything is pre-written content (a scenario bank) plus simple client-side math for the date. Built in a single hackday session by a 3-person team split into two integrated workstreams. Success = a working, funny, screenshot-worthy demo by the end of the session.

## 2. User Types and Permissions

One user type: anonymous visitor. No sign-in, no accounts, nothing persisted between sessions or server-side (there is no server). Every screen is accessible to anyone who loads the app.

## 3. Navigation and Information Architecture

Single-page app, no routing, no URL changes. One continuous experience with the visible section swapped via client-side state:

```
Landing → Quiz → (optional: Photo Upload) → Consulting transition → Reveal + Reflection close
```

No nav bar, no sidebar. Navigation is "next" via primary CTA buttons only, plus a "Ask Again" restart from the Reveal screen back to Landing/Quiz.

## 4. Core User Flows

**Flow: Get Your Reading**
Entry point: Landing screen

1. User reads reaper-voiced intro copy, clicks primary CTA → Quiz appears
2. User fills a single scrolling quiz form (age, location, 3–5 lifestyle questions) → clicks "Reveal My Fate"
3. *(Stretch, only if time remains)* Optional selfie upload prompt — skippable, no penalty either way
4. App shows a themed "Consulting the Oracle..." transition — an artificial ~1.5–2.5s pause even though the computation is instant, to sell the drama (room here for a beat of reaper humor, e.g. a knock-knock joke)
5. Reveal screen renders: death date, cause-of-death scenario, certificate-of-doom card styling *(+ optional aged photo if built)*
6. Reflection line appears on the same screen: "You have approximately X days left. What are you doing with them?"
7. "Ask Again" resets back to Landing/Quiz

**Success state:** user reaches the Reveal card and can screenshot it.
**Error scenarios:** incomplete quiz → inline validation, submit disabled until required fields are filled. No network calls in the core flow, so there's no "request failed" case outside the optional photo feature.

## 5. Detailed Screen Specifications

### Screen 1: Landing
**Purpose:** hook + theme intro, single CTA
**Layout:** full-bleed reaper-themed background, headline in reaper voice, one CTA button ("Enter, if you dare")

### Screen 2: Quiz
**Purpose:** capture inputs used to select a scenario and compute a date
**Layout:** single scrolling form (not a multi-step wizard), reaper-voiced field labels/microcopy
**Proposed fields** (Logic team should confirm exact set against what `getReading()` needs):
- Age (number)
- Country/location
- Drinks alcohol regularly? (yes/no)
- Ever had a speeding ticket? (yes/no)
- Exercise frequency (low/medium/high)
- *(Stretch)* Upload a photo
**Primary action:** "Reveal My Fate" — disabled until required fields (age, country) are filled
**Validation:** inline, on submit attempt

### Screen 3: Consulting transition
**Purpose:** mask the (near-instant) computation with drama
**Layout:** full-screen themed animation/copy, auto-advances after a fixed minimum delay
**No user action required**

### Screen 4: Reveal + Reflection
**Purpose:** the payoff
**Layout:** centered "certificate of doom" card — death date, cause-of-death text, tagline *(+ optional stretch: aged photo)* — with the reflection line ("X days left...") below the card on the same screen
**Primary actions:** "Ask Again" (restart), and the card itself should be visually optimized for screenshotting (clean crop-able bounds, no surrounding UI clutter)

## 6. Scenario & Logic Strategy

- **Scenario bank:** ~15–20 pre-written death scenarios in a static data file (`scenarios.ts`), each tagged with trait(s) — e.g. `reckless`, `sedentary`, `health-nut`, `unlucky`, `chaotic`.
- **Selection logic:** quiz answers map to one or more tags (e.g. speeding ticket = yes → `reckless`; low exercise → `sedentary`). Pick a random scenario from the matching pool; fall back to an untagged general pool if nothing matches — never show an empty result.
- **Date calc:** base life expectancy from a small static lookup table (~10–15 countries + a default), adjusted by lightweight modifiers per risky answer (e.g. −2 years if drinks regularly, −1 year per speeding ticket, capped at some floor). Doesn't need to be actuarially real — just needs to feel grounded.

### Shared interface — the integration contract between the two workstreams

```ts
type QuizAnswers = {
  age: number
  country: string
  drinksAlcohol: boolean
  hasSpeedingTicket: boolean
  exerciseLevel: 'low' | 'medium' | 'high'
}

type Reading = {
  deathDate: string       // e.g. "March 14, 2071"
  daysRemaining: number
  causeOfDeath: string    // the absurd scenario text
  tagline: string         // short closing line for the card
}

function getReading(answers: QuizAnswers): Reading
```

The UI team calls `getReading()` and renders whatever comes back — they never touch scenario content or date math. The Logic team owns everything inside that function — they never touch components or styling. **Agree on this exact shape before either side starts building.**

## 7. Interaction Patterns and Micro-interactions

- No modals — everything inline within the single-page flow
- Screen transitions: simple fade/slide, nothing heavy (time budget doesn't allow it)
- Consulting screen: artificial minimum delay via `setTimeout` so it never feels instant/cheap
- Reveal card: a subtle entrance animation (fade + scale) for impact

## 8. Edge Cases and Error Handling

- Incomplete quiz → submit stays disabled until age + country are filled
- Age out of plausible range → clamp or show inline validation message
- Country not in the lookup table → fall back to a global average life expectancy
- No matching tagged scenario → fall back to the general scenario pool
- Photo upload (if built) → fully skippable, no failure state needed since nothing is uploaded to a server

## 9. Performance and UX Considerations

- Fully client-side, no network calls in core scope — should feel instant except for the deliberate consulting-screen delay
- Mobile-first single-column layout works for both the quiz form and the reveal card without separate breakpoints

## 10. Implementation Checklist

**UI + Questions — Amanda**
- [ ] Landing screen with CTA
- [ ] Quiz form, all fields, inline validation
- [ ] Consulting transition screen (themed, timed)
- [ ] Reveal card layout — consumes `Reading` from `getReading()`
- [ ] Reflection line
- [ ] Restart flow
- [ ] Grim Reaper visual theme applied across all screens
- [ ] Mobile responsive pass

**Logic + Death-Scenarios — Nabin, Kevin**
- [ ] Write 15–20 tagged death scenarios
- [ ] Build the tag-matching scenario selector + fallback pool
- [ ] Build the date-calculation function (life-expectancy table + modifiers)
- [ ] Implement `getReading(answers): Reading` per the shared interface above
- [ ] Sanity-check edge cases: missing tags, extreme ages, unknown country

**Stretch (only if core scope is done early)**
- [ ] Photo upload UI
- [ ] Aged/death image (generation or a simple static overlay)
- [ ] Share/screenshot polish

## 11. Team Assignments

| Workstream | Who | Owns | Does not touch |
|---|---|---|---|
| UI + Questions | Amanda | All screens/components, visual theme, calling `getReading()` | Scenario content, date math |
| Logic + Death-Scenarios | Nabin, Kevin | `scenarios.ts`, tag selector, date calc, `getReading()` itself | Components, styling |

**Suggested order:** lock the `QuizAnswers` / `Reading` interface first (a few minutes, together) → build in parallel → integrate and polish in the last stretch of the session.
