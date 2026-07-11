# Grim Quiz Questions

## Question Set

1. **What is your name?**
   - Input: text
   - Maps to: display-only, not sent to `getReading()`

2. **What is your age?**
   - Input: number
   - Maps to: `age`

3. **What is your gender?**
   - Options: `Male`, `Female`, `Other`
   - Maps to: `gender`

4. **What country do you live in?**
   - Input: country selector or text input
   - Maps to: `country`

5. **Do you drink alcohol regularly?**
   - Options: `Yes`, `No`
   - Maps to: `drinksAlcohol`

6. **Have you ever had a speeding ticket?**
   - Options: `Yes`, `No`
   - Maps to: `hasSpeedingTicket`

7. **How is your general mood lately?**
   - Options: `Calm`, `Stressed`, `Reckless`, `Thoughtful`
   - Maps to: `mood`

8. **How often do you exercise?**
   - Options: `Rarely`, `Sometimes`, `Often`
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

- `name` is display-only and is not part of `QuizAnswers`.
- `Male` -> `gender: 'male'`
- `Female` -> `gender: 'female'`
- `Other` -> `gender: 'other'`
- Alcohol `Yes` -> `drinksAlcohol: true`
- Alcohol `No` -> `drinksAlcohol: false`
- Speeding ticket `Yes` -> `hasSpeedingTicket: true`
- Speeding ticket `No` -> `hasSpeedingTicket: false`
- `Calm` -> `mood: 'calm'`
- `Stressed` -> `mood: 'stressed'`
- `Reckless` -> `mood: 'reckless'`
- `Thoughtful` -> `mood: 'existential'`
- `Rarely` -> `exerciseLevel: 'low'`
- `Sometimes` -> `exerciseLevel: 'medium'`
- `Often` -> `exerciseLevel: 'high'`

## Validation Notes

- `name` is optional unless the UI uses it on the reveal screen.
- `age` is required and should be a sensible number, such as `1` through `120`.
- `country` is required and should match a `life.json` country when possible.
- All mapped option questions should require one selected answer before revealing fate.
- The quiz should pass only the `QuizAnswers` fields directly to `getReading()`.
