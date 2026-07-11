# Grim

An oracle that tells you when — and how — you're going to die. Mostly for laughs.

Built in a single ~60-minute session at the SSW hackday (Sat 11 July 2026).

## The pitch

Answer a few questions about your age, location, and habits. Grim "consults the void" and hands back a death date, a cause of death, and a closing line about what you're going to do with the time you've got left. No backend, no live AI — a pre-written scenario bank plus some light life-expectancy math, all client-side.

## Demo flow

1. **Landing** — reaper-voiced hook, one CTA
2. **Quiz** — age, location, a few lifestyle questions
3. **Consulting the Oracle** — a deliberate dramatic pause
4. **Reveal** — the certificate of doom: date, cause, tagline
5. **Ask Again** — do it to a friend

## How it works

No server. Quiz answers map to tags (reckless, sedentary, health-nut, ...), which pick a scenario from a pre-written bank; a small life-expectancy lookup table plus simple modifiers produce the date. Full spec: [`PRD.md`](./PRD.md).

## Team

- **UI + Questions:** Amanda
- **Logic + Death-Scenarios:** Nabin, Kevin
