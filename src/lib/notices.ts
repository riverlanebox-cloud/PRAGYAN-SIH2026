/**
 * Portal notices shown on the landing page and the dashboard.
 * Newest first. Dates are ISO (YYYY-MM-DD) and rendered with formatSiteDate.
 */
export type Notice = {
  date: string;
  tag: "Curriculum" | "Faculty" | "Assessment" | "General";
  title: string;
  body: string;
};

export const NOTICES: readonly Notice[] = [
  {
    date: "2026-09-05",
    tag: "Curriculum",
    title: "Class 6 to 10 chapter index published",
    body: "NCERT chapter mapping with learning-outcome IDs is now live for every class served by the portal.",
  },
  {
    date: "2026-09-02",
    tag: "Faculty",
    title: "Email verification is mandatory for faculty accounts",
    body: "Teachers must confirm their institutional email ID before they can verify community notes.",
  },
  {
    date: "2026-08-28",
    tag: "Assessment",
    title: "Question banks added for Class 9 and Class 10",
    body: "Objective and subjective banks are being uploaded chapter by chapter by verified faculty.",
  },
  {
    date: "2026-08-20",
    tag: "General",
    title: "Portal available in six languages",
    body: "The interface can be switched between English, Hindi, Telugu, Tamil, Kannada and Malayalam from the top bar.",
  },
];
