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
  hasCarCrash: YesNo;
  exerciseLevel: '' | QuizAnswers['exerciseLevel'];
};

const INITIAL_STATE: FormState = {
  age: '',
  gender: '',
  country: '',
  drinksAlcohol: '',
  hasSpeedingTicket: '',
  hasCarCrash: '',
  exerciseLevel: '',
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

export function Quiz({ onSubmit }: QuizProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const ageValue = Number(form.age);
  const isAgeValid = form.age.trim() !== '' && Number.isFinite(ageValue) && ageValue > 0 && ageValue < 130;
  const isCountryValid = form.country.trim() !== '';
  const canSubmit = isAgeValid && isCountryValid;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAttemptedSubmit(true);
    if (!canSubmit) return;

    const answers: QuizAnswers = {
      age: Math.round(ageValue),
      gender: form.gender || 'other',
      country: form.country.trim(),
      drinksAlcohol: form.drinksAlcohol === 'yes',
      hasSpeedingTicket: form.hasSpeedingTicket === 'yes',
      hasCarCrash: form.hasCarCrash === 'yes',
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
          {attemptedSubmit && !isAgeValid && (
            <div className="field-error">Enter a valid age to continue.</div>
          )}
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
          {attemptedSubmit && !isCountryValid && (
            <div className="field-error">Enter your country to continue.</div>
          )}
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

        <YesNoField
          name="hasCarCrash"
          label="Have you ever been involved in a motor vehicle accident?"
          value={form.hasCarCrash}
          onChange={(value) => setForm((f) => ({ ...f, hasCarCrash: value }))}
        />

        <div className="field">
          <label className="field-label">How would you describe your typical exercise frequency?</label>
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
                <label htmlFor={`exercise-${option}`}>
                  {option[0].toUpperCase() + option.slice(1)}
                </label>
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
