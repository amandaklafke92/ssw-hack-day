import { useState } from 'react';
import type { QuizAnswers } from '../logic';
import { COUNTRIES } from '../countries';

type QuizProps = {
  onSubmit: (answers: QuizAnswers) => void;
};

type YesNo = '' | 'yes' | 'no';

type FormState = {
  age: string;
  gender: '' | QuizAnswers['gender'];
  country: string;
  drinksAlcohol: YesNo;
  hasSpeedingTicket: YesNo;
  mood: '' | QuizAnswers['mood'];
  exerciseLevel: '' | QuizAnswers['exerciseLevel'];
};

const INITIAL_STATE: FormState = {
  age: '',
  gender: '',
  country: '',
  drinksAlcohol: '',
  hasSpeedingTicket: '',
  mood: '',
  exerciseLevel: '',
};

const MOOD_LABELS: Record<QuizAnswers['mood'], string> = {
  calm: 'Calm',
  stressed: 'Stressed',
  reckless: 'Reckless',
  existential: 'Thoughtful',
};

const EXERCISE_LABELS: Record<QuizAnswers['exerciseLevel'], string> = {
  low: 'Rarely',
  medium: 'Sometimes',
  high: 'Often',
};

function YesNoField({
  name,
  label,
  hint,
  value,
  onChange,
}: {
  name: string;
  label: string;
  hint?: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
}) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      {hint && <span className="field-hint">{hint}</span>}
      <div className="choice-group" role="radiogroup" aria-label={label}>
        {(['yes', 'no'] as const).map((option) => (
          <div className="choice-option" key={option}>
            <input
              type="radio"
              id={`${name}-${option}`}
              name={name}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <label htmlFor={`${name}-${option}`}>{option === 'yes' ? 'Yes' : 'No'}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

const DEFAULT_AGE = 30;

export function Quiz({ onSubmit }: QuizProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const ageValue = Number(form.age);
    const age =
      form.age.trim() !== '' && Number.isFinite(ageValue) && ageValue > 0 && ageValue < 130
        ? Math.round(ageValue)
        : DEFAULT_AGE;

    const answers: QuizAnswers = {
      age,
      gender: form.gender || 'other',
      country: form.country.trim(),
      drinksAlcohol: form.drinksAlcohol === 'yes',
      hasSpeedingTicket: form.hasSpeedingTicket === 'yes',
      mood: form.mood || 'calm',
      exerciseLevel: form.exerciseLevel || 'medium',
    };
    onSubmit(answers);
  }

  return (
    <div className="screen">
      <form className="quiz" onSubmit={handleSubmit} noValidate>
        <h2 className="quiz-title">Intake Questionnaire</h2>
        <p className="quiz-intro">
          Answer honestly. The Oracle can tell when you're lying, and it makes the scenarios worse.
        </p>

        <div className="field">
          <label className="field-label" htmlFor="age">
            Age
          </label>
          <span className="field-hint">In completed years.</span>
          <input
            id="age"
            type="number"
            min={0}
            max={129}
            inputMode="numeric"
            value={form.age}
            onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
          />
        </div>

        <div className="field">
          <label className="field-label">Gender</label>
          <span className="field-hint">Used to select the correct life-expectancy baseline.</span>
          <div className="choice-group" role="radiogroup" aria-label="Gender">
            {(['male', 'female', 'other'] as const).map((option) => (
              <div className="choice-option" key={option}>
                <input
                  type="radio"
                  id={`gender-${option}`}
                  name="gender"
                  checked={form.gender === option}
                  onChange={() => setForm((f) => ({ ...f, gender: option }))}
                />
                <label htmlFor={`gender-${option}`}>
                  {option[0].toUpperCase() + option.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="country">
            Country of residence
          </label>
          <span className="field-hint">Start typing to search.</span>
          <input
            id="country"
            type="text"
            list="country-options"
            autoComplete="off"
            value={form.country}
            onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
          />
          <datalist id="country-options">
            {COUNTRIES.map((country) => (
              <option value={country} key={country} />
            ))}
          </datalist>
        </div>

        <YesNoField
          name="drinksAlcohol"
          label="Do you consume alcohol regularly?"
          value={form.drinksAlcohol}
          onChange={(value) => setForm((f) => ({ ...f, drinksAlcohol: value }))}
        />

        <YesNoField
          name="hasSpeedingTicket"
          label="Have you ever received a speeding ticket?"
          value={form.hasSpeedingTicket}
          onChange={(value) => setForm((f) => ({ ...f, hasSpeedingTicket: value }))}
        />

        <div className="field">
          <label className="field-label">How is your general mood lately?</label>
          <div className="choice-group" role="radiogroup" aria-label="Mood">
            {(['calm', 'stressed', 'reckless', 'existential'] as const).map((option) => (
              <div className="choice-option" key={option}>
                <input
                  type="radio"
                  id={`mood-${option}`}
                  name="mood"
                  checked={form.mood === option}
                  onChange={() => setForm((f) => ({ ...f, mood: option }))}
                />
                <label htmlFor={`mood-${option}`}>{MOOD_LABELS[option]}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field-label">How often do you exercise?</label>
          <div className="choice-group" role="radiogroup" aria-label="Exercise frequency">
            {(['low', 'medium', 'high'] as const).map((option) => (
              <div className="choice-option" key={option}>
                <input
                  type="radio"
                  id={`exercise-${option}`}
                  name="exerciseLevel"
                  checked={form.exerciseLevel === option}
                  onChange={() => setForm((f) => ({ ...f, exerciseLevel: option }))}
                />
                <label htmlFor={`exercise-${option}`}>{EXERCISE_LABELS[option]}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="quiz-submit-row">
          <button type="submit" className="btn btn-primary">
            Reveal My Fate
          </button>
        </div>
      </form>
    </div>
  );
}
