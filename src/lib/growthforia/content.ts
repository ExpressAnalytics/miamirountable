export const ASSET =
  "/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2";

export const HERO_VIDEO = `${ASSET}/hero_bg.mp4`;
export const HERO_POSTER = `${ASSET}/images/hero-poster.jpg`;
export const LOCATION_POSTER = `${ASSET}/images/location-poster.jpg`;

export const TICKET_URL = "#pricing";
export const TICKETBUTLER =
  "https://sparkforce.ticketbutler.io/en/e/growthforia-2026/?iframe=true";
export const RECAP_EMBED =
  "https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Ffast.wistia.net%2Fembed%2Fiframe%2F34n84hlju1&display_name=Wistia%2C+Inc.&url=https%3A%2F%2Fsparkforce-1.wistia.com%2Fmedias%2F34n84hlju1&image=https%3A%2F%2Fembed-ssl.wistia.com%2Fdeliveries%2Ff575b1b678b9dd8f00ab5d81dc28128006e4b05d.jpg%3Fimage_crop_resized%3D640x360&type=text%2Fhtml&schema=wistia";

export const topics = [
  "SEO & GEO",
  "Agentic AI",
  "Practical AI",
  "LinkedIn Marketing",
  "ABM",
  "Tactical Marketing Strategy",
  "Community Marketing",
  "LinkedIn Research",
  "RevOps",
  "Hyper-Growth GTM",
  "GTM",
];

export const quotes = [
  {
    text: "Most companies aren't failing at AI because of the models, they're failing because their data isn't ready.",
    cite: "George Fraser, CEO, Fivetran",
  },
  {
    text: "7% of companies surveyed have progressed far enough in building AI-ready data capabilities for scaled adoption.",
    cite: "Accenture, 2026",
  },
];

export const speakers = [
  {
    name: "Jorge Sepulveda",
    role: "Chief Revenue Officer",
    email: "jorge@expressanalytics.com",
    linkedin: "https://www.linkedin.com/in/jorgesep/",
    image: `${ASSET}/images/jorge.webp`,
  },
  {
    name: "Samir Warudkar",
    role: "Chief AI Officer",
    email: "samir@expressanalytics.com",
    linkedin: "https://www.linkedin.com/in/samirwarudkar/",
    image: `${ASSET}/images/sameer.webp`,
  },
  {
    name: "Scott Rosenbloom",
    role: "Chief Marketing Officer",
    email: "scott@expressanalytics.com",
    linkedin: "https://www.linkedin.com/in/scott-rosenbloom-1135531/",
    image: `${ASSET}/images/scott.webp`,
  },
];

export type ProgramItem = {
  n: string;
  title: string;
  body: string;
};

export const program: ProgramItem[] = [
  {
    n: "01",
    title: "Are we actually AI ready?",
    body: "Adoption isn't readiness. Where is ambition running ahead of the data, governance and infrastructure to support it?",
  },
  {
    n: "02",
    title: "Is your data agent ready?",
    body: "What would it take to trust an AI agent to reason across your enterprise data, and act on it?",
  },
  {
    n: "03",
    title: "What happens after the dashboard?",
    body: "As natural language becomes the interface to enterprise data, what changes for BI teams and decision-making itself?",
  },
  {
    n: "04",
    title: "Automation or meaningful agency?",
    body: "How much of what's labeled \"agentic\" today is really predetermined automation with a new interface?",
  },
  {
    n: "05",
    title: "Where do we draw the autonomy line?",
    body: "What determines how much independent action you're willing to let AI take, and who decides?",
  },
  {
    n: "06",
    title: "Does any of it create business impact?",
    body: "Beyond adoption metrics, what's actually measurably better because of AI?",
  },
];

export const faqs = [
  {
    q: "Is there a cost to attend?",
    a: "No. This is a complimentary, invitation-only dinner hosted by Express Analytics.",
  },
  {
    q: "Is the discussion recorded?",
    a: "No. The roundtable is off the record, that’s what makes the conversation candid.",
  },
  {
    q: "Can I bring a colleague?",
    a: "Seats are individually curated and non-transferable. Colleagues are welcome to request their own invitation.",
  },
  {
    q: "What’s the dress code?",
    a: "Business casual, you're coming straight from work. Our host team will be in business attire.",
  },
  // {
  //   q: "Can I attend both evenings?",
  //   a: "Each evening is capped at twelve seats to keep the conversation intimate, we’d love to have you at one. Pick whichever date works best above.",
  // },
];

export const pricingPerks = [
  "150+ senior B2B marketers in the room",
  "Breakfast, lunch and coffee included all day",
  "Goodie bag",
  "All session recordings on-demand after the event",
  "Slides and materials sent post-event",
];

