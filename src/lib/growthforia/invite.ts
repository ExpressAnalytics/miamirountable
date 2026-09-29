export const HS_PORTAL_ID_DEFAULT = "287495";
export const HS_FORM_ID_DEFAULT = "bab2b362-d82c-47da-b62e-f09f855d17ef";

export const EVENINGS = ["Wednesday, October 14, 2026"] as const;

export const READINESS = [
  "Just starting - exploring concepts and gathering foundational data",
  "Piloting - testing specific use cases in isolated departments",
  "Scaling - moving successful pilots into wider production",
  "Advanced - data and AI are embedded into core business strategy",
] as const;

export const PRIORITIES = [
  "Data foundation - quality, trust and governance to prepare for AI",
  "Marketing & ROI - customer data for personalization and measurable impact",
  "Security & compliance - infrastructure hardening and continuous remediation",
  "Operational scale - moving pilots to platforms without unmanaged risk",
] as const;

export const OUTCOMES = [
  "Accelerating revenue growth and disrupting our market",
  "Reducing operational costs and driving efficiency",
  'Mitigating risk, ensuring compliance and guardrails for "Shadow AI"',
  "Improving customer experience, retention and regional support",
] as const;

export type InviteInput = {
  evening: string;
  firstname: string;
  lastname: string;
  company: string;
  workEmail: string;
  jobtitle: string;
  city: string;
  phone?: string;
  linkedinUrl?: string;
  dietary?: string;
  readiness: string;
  priorities: string[];
  outcome: string;
  pageUri?: string;
};

export type FieldErrors = Partial<Record<keyof InviteInput | "form", string>>;

export type ParseOk = { ok: true; data: InviteInput };
export type ParseErr = { ok: false; error: string; fields: FieldErrors };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function isUrl(v: string) {
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function parseInvite(raw: unknown): ParseOk | ParseErr {
  const o = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const priorities = Array.isArray(o.priorities)
    ? o.priorities.map(trim).filter(Boolean)
    : [];
  const data: InviteInput = {
    evening: trim(o.evening),
    firstname: trim(o.firstname),
    lastname: trim(o.lastname),
    company: trim(o.company),
    workEmail: trim(o.workEmail),
    jobtitle: trim(o.jobtitle),
    city: trim(o.city),
    phone: trim(o.phone) || undefined,
    linkedinUrl: trim(o.linkedinUrl) || undefined,
    dietary: trim(o.dietary) || undefined,
    readiness: trim(o.readiness),
    priorities,
    outcome: trim(o.outcome),
    pageUri: trim(o.pageUri) || undefined,
  };

  const fields: FieldErrors = {};
  if (!EVENINGS.includes(data.evening as (typeof EVENINGS)[number])) {
    fields.evening = "Choose an evening.";
  }
  if (!data.firstname) fields.firstname = "First name is required.";
  if (!data.lastname) fields.lastname = "Last name is required.";
  if (!data.company) fields.company = "Company is required.";
  if (!EMAIL.test(data.workEmail)) fields.workEmail = "Enter a valid work email.";
  if (!data.jobtitle) fields.jobtitle = "Job title is required.";
  if (!data.city) fields.city = "City / metro area is required.";
  if (data.linkedinUrl && !isUrl(data.linkedinUrl)) {
    fields.linkedinUrl = "Enter a full LinkedIn URL.";
  }
  if (!READINESS.includes(data.readiness as (typeof READINESS)[number])) {
    fields.readiness = "Select your Data & AI readiness.";
  }
  if (
    priorities.length < 1 ||
    priorities.length > 2 ||
    priorities.some((p) => !PRIORITIES.includes(p as (typeof PRIORITIES)[number]))
  ) {
    fields.priorities = "Select up to two priorities.";
  }
  if (!OUTCOMES.includes(data.outcome as (typeof OUTCOMES)[number])) {
    fields.outcome = "Select a primary business outcome.";
  }

  if (Object.keys(fields).length) {
    return { ok: false, error: "Please complete the required fields.", fields };
  }
  return { ok: true, data };
}

// ponytail: required names from HubSpot submit API; form definition is 403.
// Optional custom names follow evening_requested / work_email snake_case.
// Confirm in HubSpot if qualification fields don't land.
export function toHubSpotFields(data: InviteInput) {
  const rows: { objectTypeId: string; name: string; value: string }[] = [
    { objectTypeId: "0-1", name: "evening_requested", value: data.evening },
    { objectTypeId: "0-1", name: "firstname", value: data.firstname },
    { objectTypeId: "0-1", name: "lastname", value: data.lastname },
    { objectTypeId: "0-1", name: "company", value: data.company },
    { objectTypeId: "0-1", name: "work_email", value: data.workEmail },
    { objectTypeId: "0-1", name: "email", value: data.workEmail },
    { objectTypeId: "0-1", name: "jobtitle", value: data.jobtitle },
    { objectTypeId: "0-1", name: "city", value: data.city },
    {
      objectTypeId: "0-1",
      name: "data_ai_readiness",
      value: data.readiness,
    },
    {
      objectTypeId: "0-1",
      name: "top_strategic_priority",
      value: data.priorities.join(";"),
    },
    {
      objectTypeId: "0-1",
      name: "primary_business_outcome",
      value: data.outcome,
    },
  ];
  if (data.phone) rows.push({ objectTypeId: "0-1", name: "phone", value: data.phone });
  if (data.linkedinUrl) {
    rows.push({ objectTypeId: "0-1", name: "linkedin_url", value: data.linkedinUrl });
  }
  if (data.dietary) {
    rows.push({
      objectTypeId: "0-1",
      name: "dietary_restrictions",
      value: data.dietary,
    });
  }
  return rows;
}


