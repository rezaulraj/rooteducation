// PLACEHOLDER STORIES for design only: the names, quotes, courses and photos (Unsplash) are not real students.
// Replace them with real students who have agreed to be featured before this page goes live.

export type Story = {
  slug: string;
  name: string;
  from: { country: string; flag: string };
  to: { country: string; flag: string };
  university: string;
  course: string;
  intake: string;
  quote: string;
  story: string;
  photo: string; // Unsplash photo id
  scholarship?: string;
};

const P = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=720&h=960&q=80`;
export const storyPhoto = P;

export const STORIES: Story[] = [
  {
    slug: "nusrat",
    name: "Nusrat Jahan",
    from: { country: "Bangladesh", flag: "bd" },
    to: { country: "UK", flag: "gb" },
    university: "University of Birmingham",
    course: "MSc Business Analytics",
    intake: "September 2026",
    quote:
      "I came in with a list of twenty universities and left with a plan I actually believed in.",
    story:
      "Nusrat wanted a data career but wasn't sure which master's fitted her commerce degree. Her counsellor narrowed the field to four UK programmes, helped her rewrite her statement twice and prepared her for the visa interview.",
    photo: "1494790108377-be9c29b29330",
    scholarship: "Merit scholarship",
  },
  {
    slug: "arif",
    name: "Arif Hossain",
    from: { country: "Bangladesh", flag: "bd" },
    to: { country: "Canada", flag: "ca" },
    university: "University of Waterloo",
    course: "MEng Electrical Engineering",
    intake: "January 2027",
    quote: "The mock interviews made the real one feel easy.",
    story:
      "Arif had strong grades but no idea how Canadian applications worked. We mapped deadlines, organised his references and ran three practice interviews before his study permit appointment.",
    photo: "1507003211169-0a1dd7228f2d",
  },
  {
    slug: "maya",
    name: "Maya Thapa",
    from: { country: "Nepal", flag: "np" },
    to: { country: "Australia", flag: "au" },
    university: "University of Melbourne",
    course: "Master of Public Health",
    intake: "February 2027",
    quote: "Someone finally explained the costs honestly, line by line.",
    story:
      "Maya's biggest worry was money. Her counsellor built a full budget for Melbourne, found a partial scholarship and explained exactly what to show for her visa.",
    photo: "1438761681033-6461ffad8d80",
    scholarship: "Partial tuition award",
  },
  {
    slug: "daniel",
    name: "Daniel Okeke",
    from: { country: "Nigeria", flag: "ng" },
    to: { country: "Ireland", flag: "ie" },
    university: "Trinity College Dublin",
    course: "MSc Computer Science",
    intake: "September 2026",
    quote: "Fast answers, every single time I messaged.",
    story:
      "Daniel applied late in the cycle. We prioritised programmes that were still open, turned his application around in a week and booked his flights after the visa came through.",
    photo: "1500648767791-00dcc994a43e",
  },
  {
    slug: "sara",
    name: "Sara Malik",
    from: { country: "Pakistan", flag: "pk" },
    to: { country: "Malta", flag: "mt" },
    university: "University of Malta",
    course: "BSc Nursing",
    intake: "October 2026",
    quote:
      "I'd never heard of studying in Malta. Now I can't imagine anywhere else.",
    story:
      "Sara wanted an English-taught nursing degree in Europe at a realistic cost. Her counsellor suggested Malta, walked her through the entry requirements and helped her find student housing.",
    photo: "1544005313-94ddf0286df2",
  },
  {
    slug: "rahul",
    name: "Rahul Verma",
    from: { country: "India", flag: "in" },
    to: { country: "USA", flag: "us" },
    university: "New York University (NYU)",
    course: "MS Data Science",
    intake: "Fall 2026",
    quote: "My GRE plan and my application timeline finally fitted together.",
    story:
      "Rahul needed a GRE score, strong essays and a clear funding plan. We built a twelve-week test plan alongside his applications so nothing clashed.",
    photo: "1472099645785-5658abf4ff4e",
  },
  {
    slug: "tasnim",
    name: "Tasnim Rahman",
    from: { country: "Bangladesh", flag: "bd" },
    to: { country: "Hungary", flag: "hu" },
    university: "Semmelweis University",
    course: "MD Medicine",
    intake: "September 2026",
    quote: "They knew the medical entrance exam inside out.",
    story:
      "Tasnim dreamed of studying medicine in English. Her counsellor prepared her for the entrance exam and interview, and helped her family plan six years of costs.",
    photo: "1517841905240-472988babdf9",
  },
  {
    slug: "imran",
    name: "Imran Chowdhury",
    from: { country: "Bangladesh", flag: "bd" },
    to: { country: "UK", flag: "gb" },
    university: "University of Glasgow",
    course: "MSc Finance",
    intake: "January 2027",
    quote:
      "From first call to my first lecture, it was the same counsellor beside me.",
    story:
      "Imran chose a January start to finish work commitments. We lined up his documents, his CAS and his pre-departure checklist so he arrived settled and on time.",
    photo: "1506794778202-cad84cf45f1d",
  },
  {
    slug: "elena",
    name: "Elena Pradhan",
    from: { country: "Nepal", flag: "np" },
    to: { country: "Cyprus", flag: "cy" },
    university: "University of Nicosia",
    course: "BBA International Business",
    intake: "September 2026",
    quote: "I felt prepared for everything, even the weather.",
    story:
      "Elena wanted a sunny, affordable European campus. We compared three countries with her family and she chose Cyprus for its English-taught business degree.",
    photo: "1502823403499-6ccfcf4fb453",
  },
  {
    slug: "amina",
    name: "Amina Yusuf",
    from: { country: "Nigeria", flag: "ng" },
    to: { country: "Canada", flag: "ca" },
    university: "McGill University",
    course: "MA Economics",
    intake: "September 2026",
    quote: "My statement went from generic to genuinely me.",
    story:
      "Amina's first draft read like everyone else's. Over three sessions she found her own story, and her counsellor checked every document before she submitted.",
    photo: "1531123897727-8f129e1688ce",
    scholarship: "Entrance award",
  },
];
