# Grim Quiz Questions

## Question Set

1. **How many years have you already escaped the void?**
   - Input: number
   - Maps to: `age`

2. **Which record should fate file you under?**
   - Options: `Male`, `Female`, `Other`
   - Maps to: `gender`

3. **Where are you currently tempting fate?**
   - Input: country selector or text input
   - Maps to: `country`

4. **How often do you drink alcohol?**
   - Options: `Never / Rarely`, `Regularly`
   - Maps to: `drinksAlcohol`

5. **Have you ever received a speeding ticket?**
   - Options: `Yes`, `No`
   - Maps to: `hasSpeedingTicket`

6. **What's your general state of mind lately?**
   - Options: `Suspiciously calm`, `One email away from becoming folklore`, `Making choices the ancestors would question`, `Staring into the void, and the void is typing back`
   - Maps to: `mood`

7. **How often do you exercise?**
   - Options: `Rarely, my couch has legal custody`, `Sometimes, when guilt gets loud`, `Often, my smartwatch fears me`
   - Maps to: `exerciseLevel`

## Answer Mapping

```ts
type QuizAnswers = {
  age: number
  gender: 'male' | 'female' | 'other'
  country: string
  drinksAlcohol: boolean
  hasSpeedingTicket: boolean
  mood: 'calm' | 'stressed' | 'reckless' | 'existential'
  exerciseLevel: 'low' | 'medium' | 'high'
}
```

- `Male` -> `gender: 'male'`
- `Female` -> `gender: 'female'`
- `Other` -> `gender: 'other'`
- `Never / Rarely` -> `drinksAlcohol: false`
- `Regularly` -> `drinksAlcohol: true`
- `Yes` -> `hasSpeedingTicket: true`
- `No` -> `hasSpeedingTicket: false`
- `Suspiciously calm` -> `mood: 'calm'`
- `One email away from becoming folklore` -> `mood: 'stressed'`
- `Making choices the ancestors would question` -> `mood: 'reckless'`
- `Staring into the void, and the void is typing back` -> `mood: 'existential'`
- `Rarely, my couch has legal custody` -> `exerciseLevel: 'low'`
- `Sometimes, when guilt gets loud` -> `exerciseLevel: 'medium'`
- `Often, my smartwatch fears me` -> `exerciseLevel: 'high'`

## Validation Notes

- `age` is required and should be a sensible number, such as `1` through `120`.
- `country` is required and should match a `life.json` country when possible.
- All option questions should require one selected answer before revealing fate.
- The quiz should collect exactly these seven answers and pass them directly to `getReading()`.
