"use client";

import { useId, useRef, useState } from "react";
import { submitInvite } from "@/app/actions/invite";
import {
  EVENINGS,
  OUTCOMES,
  PRIORITIES,
  READINESS,
  type FieldErrors,
} from "@/lib/growthforia/invite";
import { CheckIcon, ChevronDownIcon } from "../shared/icons";

type Step = 1 | 2 | 3;
type FitStep = 1 | 2 | 3;

const STEPS = [
  { n: 1 as const, label: "Evening" },
  { n: 2 as const, label: "Contact" },
  { n: 3 as const, label: "Fit" },
];

const fieldClass =
  "h-11 min-h-11 w-full rounded-md bg-white px-4 text-[16px] text-[#0b0c0e] placeholder:text-[#0b0c0e]/40 outline-none transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b0c0e]";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function liveMessage(
  field: keyof FieldErrors,
  value: string,
  priorities?: string[],
): string | undefined {
  switch (field) {
    case "evening":
      return EVENINGS.includes(value as (typeof EVENINGS)[number])
        ? undefined
        : "Required: choose Wednesday, October 14, 2026.";
    case "firstname":
      return value.trim() ? undefined : "Required: first name.";
    case "lastname":
      return value.trim() ? undefined : "Required: last name.";
    case "company":
      return value.trim() ? undefined : "Required: company name.";
    case "workEmail":
      return EMAIL.test(value.trim())
        ? undefined
        : "Required: a valid work email (name@company.com).";
    case "jobtitle":
      return value.trim() ? undefined : "Required: job title.";
    case "city":
      return value.trim() ? undefined : "Required: city / metro area.";
    case "linkedinUrl":
      if (!value.trim()) return undefined;
      try {
        const u = new URL(value.trim());
        if (u.protocol === "http:" || u.protocol === "https:") return undefined;
      } catch {
        /* invalid */
      }
      return "Optional: full LinkedIn URL starting with https://.";
    case "readiness":
      return value ? undefined : "Required: select your Data & AI readiness.";
    case "priorities": {
      const n = priorities?.length ?? 0;
      return n >= 1 && n <= 2
        ? undefined
        : "Required: select 1–2 strategic priorities.";
    }
    case "outcome":
      return value ? undefined : "Required: select a primary business outcome.";
    default:
      return undefined;
  }
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] leading-5 text-white">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[12px] text-white/90" role="alert">
          {error}
        </p>
      ) : (
        <p className="sr-only" id={`${id}-hint`}>
          {label}
        </p>
      )}
    </div>
  );
}

function Choice({
  name,
  type,
  checked,
  onChange,
  children,
}: {
  name: string;
  type: "radio" | "checkbox";
  checked: boolean;
  onChange: () => void;
  children: string;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md bg-white px-4 py-2.5 transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#0b0c0e]">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={`grid size-4 shrink-0 place-items-center border border-[#0b0c0e]/35 ${
          type === "radio" ? "rounded-full" : "rounded-[3px]"
        } ${checked ? "border-[#0b0c0e] bg-[#0b0c0e]" : ""}`}
      >
        {checked ? (
          <span
            className={
              type === "radio"
                ? "size-1.5 rounded-full bg-white"
                : "block size-2 translate-y-[-1px] rotate-[-45deg] border-b-2 border-l-2 border-white"
            }
          />
        ) : null}
      </span>
      <span className="text-[14px] leading-snug text-[#0b0c0e]">{children}</span>
    </label>
  );
}

export function InviteForm() {
  const uid = useId();
  const headingRef = useRef<HTMLParagraphElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [fitStep, setFitStep] = useState<FitStep>(1);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [evening, setEvening] = useState<string>(EVENINGS[0]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [company, setCompany] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [dietary, setDietary] = useState("");
  const [readiness, setReadiness] = useState("");
  const [priorities, setPriorities] = useState<string[]>([]);
  const [outcome, setOutcome] = useState("");

  function setLive(
    field: keyof FieldErrors,
    value: string,
    nextPriorities?: string[],
  ) {
    const msg = liveMessage(field, value, nextPriorities);
    setErrors((prev) => {
      const next = { ...prev };
      if (msg) next[field] = msg;
      else delete next[field];
      return next;
    });
  }

  function go(next: Step) {
    setErrors({});
    setFormError("");
    if (next === 3 && step !== 3) setFitStep(1);
    setStep(next);
    queueMicrotask(() => headingRef.current?.focus());
  }

  function validateStep(n: Step): boolean {
    const next: FieldErrors = {};
    if (n === 1 && !EVENINGS.includes(evening as (typeof EVENINGS)[number])) {
      next.evening = "Choose an evening.";
    }
    if (n === 2) {
      if (!firstname.trim()) next.firstname = "First name is required.";
      if (!lastname.trim()) next.lastname = "Last name is required.";
      if (!company.trim()) next.company = "Company is required.";
      if (!EMAIL.test(workEmail.trim())) {
        next.workEmail = "Enter a valid work email.";
      }
      if (!jobtitle.trim()) next.jobtitle = "Job title is required.";
      if (!city.trim()) next.city = "City / metro area is required.";
      if (linkedinUrl.trim()) {
        try {
          const u = new URL(linkedinUrl.trim());
          if (u.protocol !== "http:" && u.protocol !== "https:") {
            next.linkedinUrl = "Enter a full LinkedIn URL.";
          }
        } catch {
          next.linkedinUrl = "Enter a full LinkedIn URL.";
        }
      }
    }
    if (n === 3) {
      if (!readiness) next.readiness = "Select your Data & AI readiness.";
      if (priorities.length < 1 || priorities.length > 2) {
        next.priorities = "Select up to two priorities.";
      }
      if (!outcome) next.outcome = "Select a primary business outcome.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateFit(n: FitStep): boolean {
    const next: FieldErrors = {};
    if (n === 1 && !readiness) next.readiness = "Select your Data & AI readiness.";
    if (n === 2 && (priorities.length < 1 || priorities.length > 2)) {
      next.priorities = "Select up to two priorities.";
    }
    if (n === 3 && !outcome) next.outcome = "Select a primary business outcome.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function togglePriority(value: string) {
    setPriorities((cur) => {
      const next = cur.includes(value)
        ? cur.filter((v) => v !== value)
        : cur.length >= 2
          ? cur
          : [...cur, value];
      setLive("priorities", "", next);
      return next;
    });
  }

  async function onSubmit() {
    if (!validateStep(3)) return;
    setPending(true);
    setFormError("");
    const result = await submitInvite({
      evening,
      firstname,
      lastname,
      company,
      workEmail,
      jobtitle,
      city,
      phone,
      linkedinUrl,
      dietary,
      readiness,
      priorities,
      outcome,
      pageUri: window.location.href,
    });
    setPending(false);
    if (!result.ok) {
      setErrors(result.fields ?? {});
      setFormError(result.error);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="px-5 pb-10 sm:px-10">
        <span className="grid size-11 place-items-center rounded-full bg-[#0b0c0e] text-white">
          <CheckIcon />
        </span>
        <p className="font-display mt-5 text-[28px] leading-tight text-white">
          Request received
        </p>
        <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-white/70">
          Reviewed within 48 hours for company fit, seniority and current
          Data/AI priorities. You&apos;ll hear from Jorge&apos;s team personally
          either way.
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 pb-8 sm:px-10 sm:pb-12">
      <div className="mb-5 flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex items-center justify-center gap-2">
            <span
              className={`grid size-7 place-items-center rounded-full text-[11px] font-medium ${
                step === s.n ? "bg-white text-[#0b0c0e]" : "bg-white/25 text-white"
              }`}
            >
              {s.n}
            </span>
            <span className="hidden text-[12px] font-medium text-white sm:inline">
              {s.label}
            </span>
            {i < STEPS.length - 1 ? (
              <span className="h-px w-6 bg-white/50 sm:w-14" />
            ) : null}
          </div>
        ))}
      </div>

      <p ref={headingRef} tabIndex={-1} className="sr-only">
        Step {step} of 3
        {step === 3 ? `, question ${fitStep} of 3` : ""}
      </p>
      <p className="sr-only" aria-live="polite">
        Step {step} of 3
        {step === 3 ? `, question ${fitStep} of 3` : ""}
      </p>

      {step === 1 ? (
        <fieldset className="border-0 p-0">
          <legend className="mb-3 text-[15px] text-white">
            Available Slots for COTE Miami
          </legend>
          <div className="relative">
            <select
              id={`${uid}-evening`}
              value={evening}
              onChange={(e) => {
                setEvening(e.target.value);
                setLive("evening", e.target.value);
              }}
              aria-invalid={Boolean(errors.evening)}
              aria-describedby={
                errors.evening ? `${uid}-evening-error` : undefined
              }
              className={`${fieldClass} cursor-pointer appearance-none pr-12 scheme-light`}
            >
              {EVENINGS.map((d) => (
                <option key={d} value={d} className="bg-white text-[#0b0c0e]">
                  {d}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#0b0c0e]/55">
              <ChevronDownIcon />
            </span>
          </div>
          {errors.evening ? (
            <p
              id={`${uid}-evening-error`}
              className="mt-2 text-[12px] text-white/90"
              role="alert"
            >
              {errors.evening}
            </p>
          ) : null}
          <p className="mt-4 text-[15px] leading-relaxed text-white">
            Requesting a seat for {evening} · COTE Miami
          </p>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="border-0 p-0">
          <legend className="mb-3 text-[15px] text-white">Contact information</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field id={`${uid}-first`} label="First name" error={errors.firstname}>
              <input
                id={`${uid}-first`}
                autoComplete="given-name"
                required
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                  setLive("firstname", e.target.value);
                }}
                placeholder="First name"
                aria-invalid={Boolean(errors.firstname)}
                className={fieldClass}
              />
            </Field>
            <Field id={`${uid}-last`} label="Last name" error={errors.lastname}>
              <input
                id={`${uid}-last`}
                autoComplete="family-name"
                required
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                  setLive("lastname", e.target.value);
                }}
                placeholder="Last name"
                aria-invalid={Boolean(errors.lastname)}
                className={fieldClass}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field id={`${uid}-company`} label="Company" error={errors.company}>
                <input
                  id={`${uid}-company`}
                  autoComplete="organization"
                  required
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    setLive("company", e.target.value);
                  }}
                  placeholder="Company"
                  className={fieldClass}
                />
              </Field>
            </div>
            <Field id={`${uid}-email`} label="Work email" error={errors.workEmail}>
              <input
                id={`${uid}-email`}
                type="email"
                autoComplete="email"
                required
                value={workEmail}
                onChange={(e) => {
                  setWorkEmail(e.target.value);
                  setLive("workEmail", e.target.value);
                }}
                placeholder="Work email"
                className={fieldClass}
              />
            </Field>
            <Field id={`${uid}-title`} label="Job title" error={errors.jobtitle}>
              <input
                id={`${uid}-title`}
                autoComplete="organization-title"
                required
                value={jobtitle}
                onChange={(e) => {
                  setJobtitle(e.target.value);
                  setLive("jobtitle", e.target.value);
                }}
                placeholder="Job title"
                className={fieldClass}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field id={`${uid}-city`} label="City / metro area" error={errors.city}>
                <input
                  id={`${uid}-city`}
                  autoComplete="address-level2"
                  required
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setLive("city", e.target.value);
                  }}
                  placeholder="City / metro area"
                  className={fieldClass}
                />
              </Field>
            </div>
            <Field id={`${uid}-phone`} label="Phone (optional)" error={errors.phone}>
              <input
                id={`${uid}-phone`}
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
                className={fieldClass}
              />
            </Field>
            <Field
              id={`${uid}-li`}
              label="LinkedIn URL (optional)"
              error={errors.linkedinUrl}
            >
              <input
                id={`${uid}-li`}
                type="url"
                autoComplete="url"
                value={linkedinUrl}
                onChange={(e) => {
                  setLinkedinUrl(e.target.value);
                  setLive("linkedinUrl", e.target.value);
                }}
                placeholder="LinkedIn URL (optional)"
                className={fieldClass}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field id={`${uid}-diet`} label="Dietary restrictions (optional)">
                <input
                  id={`${uid}-diet`}
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  placeholder="Dietary restrictions (optional)"
                  className={fieldClass}
                />
              </Field>
            </div>
          </div>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset className="border-0 p-0">
          <legend className="sr-only">Qualification</legend>
          <p className="mb-3 text-[13px] text-white/70">
            Question {fitStep} of 3
          </p>
          {fitStep === 1 ? (
            <div>
              <p id={`${uid}-r`} className="mb-2 text-[14px] text-white">
                1. Your organization&apos;s current Data & AI readiness
              </p>
              <div role="radiogroup" aria-labelledby={`${uid}-r`} className="grid gap-2">
                {READINESS.map((opt) => (
                  <Choice
                    key={opt}
                    name={`${uid}-readiness`}
                    type="radio"
                    checked={readiness === opt}
                    onChange={() => {
                      setReadiness(opt);
                      setLive("readiness", opt);
                    }}
                  >
                    {opt}
                  </Choice>
                ))}
              </div>
              {errors.readiness ? (
                <p className="mt-2 text-[12px] text-white/90" role="alert">
                  {errors.readiness}
                </p>
              ) : null}
            </div>
          ) : null}
          {fitStep === 2 ? (
            <div>
              <p id={`${uid}-p`} className="mb-2 text-[14px] text-white">
                2. Top strategic priority right now (select up to 2)
              </p>
              <div role="group" aria-labelledby={`${uid}-p`} className="grid gap-2">
                {PRIORITIES.map((opt) => (
                  <Choice
                    key={opt}
                    name={`${uid}-priority`}
                    type="checkbox"
                    checked={priorities.includes(opt)}
                    onChange={() => togglePriority(opt)}
                  >
                    {opt}
                  </Choice>
                ))}
              </div>
              {errors.priorities ? (
                <p className="mt-2 text-[12px] text-white/90" role="alert">
                  {errors.priorities}
                </p>
              ) : null}
            </div>
          ) : null}
          {fitStep === 3 ? (
            <div>
              <p id={`${uid}-o`} className="mb-2 text-[14px] text-white">
                3. Primary business outcome you&apos;re advancing with AI
              </p>
              <div role="radiogroup" aria-labelledby={`${uid}-o`} className="grid gap-2">
                {OUTCOMES.map((opt) => (
                  <Choice
                    key={opt}
                    name={`${uid}-outcome`}
                    type="radio"
                    checked={outcome === opt}
                    onChange={() => {
                      setOutcome(opt);
                      setLive("outcome", opt);
                    }}
                  >
                    {opt}
                  </Choice>
                ))}
              </div>
              {errors.outcome ? (
                <p className="mt-2 text-[12px] text-white/90" role="alert">
                  {errors.outcome}
                </p>
              ) : null}
            </div>
          ) : null}
        </fieldset>
      ) : null}

      {formError ? (
        <p className="mt-4 text-[13px] text-white/90" role="alert">
          {formError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col items-center gap-3">
        {step === 3 && fitStep === 3 ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={pending}
            className="flex h-11 min-h-11 w-full cursor-pointer items-center justify-center rounded-gf-btn bg-[#0b0c0e] text-[15px] font-semibold text-white transition duration-200 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Sending…" : "Request an Invitation"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (step < 3) {
                if (validateStep(step)) go((step + 1) as Step);
                return;
              }
              if (validateFit(fitStep)) setFitStep((n) => (n + 1) as FitStep);
            }}
            className="flex h-11 min-h-11 w-full cursor-pointer items-center justify-center rounded-gf-btn bg-[#0b0c0e] text-[15px] font-semibold text-white transition duration-200 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
          >
            Continue
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            if (step === 3 && fitStep > 1) {
              setErrors({});
              setFitStep((n) => (n - 1) as FitStep);
              return;
            }
            go((step - 1) as Step);
          }}
          disabled={step === 1}
          className={`flex h-11 min-h-11 items-center justify-center text-[14px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            step === 1 ? "invisible" : "cursor-pointer text-white hover:text-white"
          }`}
        >
          Back
        </button>
        <p className="text-center text-[12px] leading-relaxed text-white">
          Reviewed within 48 hours for company fit, seniority and current
          Data/AI priorities. You&apos;ll hear from Jorge&apos;s team personally
          either way.
        </p>
      </div>
    </div>
  );
}
