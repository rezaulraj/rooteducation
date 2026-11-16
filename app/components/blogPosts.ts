// The blog's articles. Placeholder guides written for launch: review, edit or replace them with your own.
// Photos are from Unsplash.

export type BlogPost = {
  slug: string;
  category: Category;
  title: string;
  excerpt: string;
  date: string; // ISO date
  read: number; // minutes
  author: string;
  img: string; // Unsplash photo id
  sections: { heading: string; body: string[] }[];
  /** Where to go next on the site after reading. */
  cta: { label: string; href: string };
};

export const CATEGORIES = [
  "Study abroad",
  "Applications",
  "Scholarships",
  "Visa",
  "Test prep",
  "Student life",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_TINT: Record<Category, string> = {
  "Study abroad": "#F47A2A",
  Applications: "#5A4FF0",
  Scholarships: "#1E7A6A",
  Visa: "#B5303A",
  "Test prep": "#B8860B",
  "Student life": "#355070",
};

export const blogImage = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const POSTS: BlogPost[] = [
  {
    slug: "choose-the-right-country-2027",
    category: "Study abroad",
    title: "How to choose the right country for your degree in 2027",
    excerpt:
      "Tuition, living costs, work rights and post-study visas: a simple way to compare destinations and build a shortlist you can trust.",
    date: "2026-11-10",
    read: 8,
    author: "Root Education Counselling Team",
    img: "1484480974693-6ca0a78fb36b",
    sections: [
      {
        heading: "Start with what you want after graduation",
        body: [
          "The best destination is the one that fits your plans after your degree, not just the one with the most famous universities. Do you want to work abroad for a few years, come home with an international degree, or keep studying towards a master's or PhD?",
          "Write your answer down before you compare countries. It turns a long list of options into a short list of questions.",
        ],
      },
      {
        heading: "Compare the total cost, not just tuition",
        body: [
          "Tuition is only part of the bill. Rent, food, transport and health insurance can cost as much again, and they vary hugely between capital cities and smaller university towns.",
          "Build a yearly budget for each country on your list, and include the funds you must show for your visa. A country with higher tuition can still be cheaper overall.",
        ],
      },
      {
        heading: "Check work rights and post-study options",
        body: [
          "Most destinations let students work part-time during term, and many offer a period of stay after graduation to look for work. The rules change often, so always check the official government website for the year you plan to start.",
          "Our counsellors keep track of these changes and can tell you how they apply to your course and level.",
        ],
      },
      {
        heading: "Shortlist three countries, then universities",
        body: [
          "Narrow down to two or three countries first, then look for universities and programmes within them. Choosing in that order keeps your applications focused and your deadlines manageable.",
        ],
      },
    ],
    cta: { label: "Explore universities", href: "/universities" },
  },
  {
    slug: "first-study-abroad-consultation",
    category: "Study abroad",
    title: "What to bring to your first study abroad consultation",
    excerpt:
      "Grades, test scores and a rough budget: the five things that help your counsellor build your shortlist in one call.",
    date: "2026-11-03",
    read: 4,
    author: "Root Education Advisors",
    img: "1600880292203-757bb62b4baf",
    sections: [
      {
        heading: "Your academic records",
        body: [
          "Bring your latest transcripts or mark sheets and, if you have them, your certificates. Predicted grades are fine if you are still studying.",
        ],
      },
      {
        heading: "Any test scores",
        body: [
          "IELTS, PTE, Duolingo, SAT or GRE scores help, but they are not required for a first chat. If you have not taken a test yet, we will help you choose one.",
        ],
      },
      {
        heading: "A rough budget",
        body: [
          "You do not need an exact figure. A range for tuition and living costs lets us show you realistic options, including scholarships that could bring the cost down.",
        ],
      },
      {
        heading: "Your goals and questions",
        body: [
          "Which subjects interest you, which countries you are curious about, and what you want to do after graduating. Write down every question you have, however small.",
          "That's all. Your counsellor will take it from there.",
        ],
      },
    ],
    cta: { label: "Book a free consultation", href: "/consultation" },
  },
  {
    slug: "student-visa-checklist",
    category: "Visa",
    title: "Student visas made simple: a step-by-step checklist",
    excerpt:
      "Documents, proof of funds and timings: a calm, step-by-step way to prepare a strong student visa application.",
    date: "2026-10-27",
    read: 6,
    author: "Root Education Visa Desk",
    img: "1530521954074-e64f6810b32d",
    sections: [
      {
        heading: "Wait for your offer, then confirm it",
        body: [
          "Most student visas need an unconditional offer or a confirmation from your university. Accept your offer and pay any deposit early so the university can issue the document you need.",
        ],
      },
      {
        heading: "Prepare your proof of funds",
        body: [
          "Each country sets how much money you must show for tuition and living costs, and how long it must have been in your account. Check the exact rules on the official visa website for your destination.",
          "Start early: bank statements and sponsor letters take time to arrange.",
        ],
      },
      {
        heading: "Gather the rest of your documents",
        body: [
          "Usually: a valid passport, your offer, academic certificates, English test results, passport photos and, for some countries, health insurance or a medical check. Keep scanned copies of everything.",
        ],
      },
      {
        heading: "Apply in good time",
        body: [
          "Processing times vary by country and season. Apply as soon as you are allowed to, and never book non-refundable travel before your visa is approved.",
        ],
      },
    ],
    cta: { label: "Get visa guidance", href: "/services/visa-guidance" },
  },
  {
    slug: "find-scholarships-you-qualify-for",
    category: "Scholarships",
    title: "How to find scholarships you actually qualify for",
    excerpt:
      "University awards, government schemes and external funds: where to look, and how to make every application count.",
    date: "2026-10-20",
    read: 7,
    author: "Root Education Counselling Team",
    img: "1541339907198-e08756dedf3f",
    sections: [
      {
        heading: "Start with your universities",
        body: [
          "Many universities offer automatic merit awards or tuition discounts to international students. Check each university's scholarship page as soon as you have your shortlist: some are given with the offer, others need a separate application.",
        ],
      },
      {
        heading: "Look at government and external schemes",
        body: [
          "Several destinations fund international students through national programmes. They are competitive and often have early deadlines, sometimes a year before you start.",
        ],
      },
      {
        heading: "Make each application specific",
        body: [
          "Read what each scholarship rewards, such as academic results, leadership or a particular subject, and show clear evidence for exactly that. A short, focused essay beats a long general one.",
        ],
      },
    ],
    cta: {
      label: "Scholarship support",
      href: "/services/scholarship-financial-aid",
    },
  },
  {
    slug: "statement-of-purpose-that-stands-out",
    category: "Applications",
    title: "Writing a statement of purpose that stands out",
    excerpt:
      "Admissions teams read thousands of statements. Here's how to make yours specific, honest and memorable.",
    date: "2026-10-13",
    read: 6,
    author: "Root Education Applications Team",
    img: "1586281380349-632531db7ed4",
    sections: [
      {
        heading: "Answer three questions",
        body: [
          "Why this subject? Why this university and programme? Why now, and where will it lead? A strong statement answers all three with real examples from your own experience.",
        ],
      },
      {
        heading: "Show, don't list",
        body: [
          "Instead of listing achievements, pick two or three moments that shaped your interest and explain what you learned from them. Specific details are what admissions teams remember.",
        ],
      },
      {
        heading: "Edit, then edit again",
        body: [
          "Keep within the word limit, read it aloud and ask someone you trust to review it. Our team checks every statement before it is submitted.",
        ],
      },
    ],
    cta: {
      label: "Application assistance",
      href: "/services/application-assistance",
    },
  },
  {
    slug: "embassy-interview-preparation",
    category: "Visa",
    title: "Preparing for your embassy interview",
    excerpt:
      "What interviewers usually ask, how to answer with confidence, and the documents to keep in your folder.",
    date: "2026-10-06",
    read: 5,
    author: "Root Education Visa Desk",
    img: "1521791136064-7986c2920216",
    sections: [
      {
        heading: "Know your own story",
        body: [
          "Expect questions about your course, your university, how you will pay, and your plans after graduation. Answer simply and honestly: you know your plans better than anyone.",
        ],
      },
      {
        heading: "Practise out loud",
        body: [
          "Mock interviews help more than reading lists of questions. Practise with a friend or with us until your answers feel natural rather than memorised.",
        ],
      },
      {
        heading: "Organise your documents",
        body: [
          "Keep originals and copies in a clear folder in the order they are usually asked for: passport, offer, financial documents, academic records and test scores.",
        ],
      },
    ],
    cta: { label: "Book interview practice", href: "/consultation" },
  },
  {
    slug: "ielts-pte-or-duolingo",
    category: "Test prep",
    title: "IELTS, PTE or Duolingo: which English test should you take?",
    excerpt:
      "The main English tests compared: format, results time and acceptance, so you can pick the right one for your universities.",
    date: "2026-09-29",
    read: 6,
    author: "Root Education Test Prep",
    img: "1517842645767-c639042777db",
    sections: [
      {
        heading: "Check what your universities accept",
        body: [
          "Not every university, or every visa route, accepts every test. Check the entry requirements for each programme on your shortlist before you book anything.",
        ],
      },
      {
        heading: "Compare the formats",
        body: [
          "IELTS has a face-to-face speaking test, PTE is fully computer-based, and Duolingo can be taken online at home. Choose the format that suits how you perform best.",
        ],
      },
      {
        heading: "Give yourself time",
        body: [
          "Plan for a few weeks of preparation and leave time to retake the test if needed, so your score is ready before your application deadlines.",
        ],
      },
    ],
    cta: { label: "Talk to a counsellor", href: "/consultation" },
  },
  {
    slug: "your-first-semester-abroad",
    category: "Student life",
    title: "Campus life in Europe: what your first semester really looks like",
    excerpt:
      "From orientation week to finding a flat and making friends: a calm guide to settling in abroad.",
    date: "2026-09-22",
    read: 6,
    author: "Root Education Counselling Team",
    img: "1562774053-701939374585",
    sections: [
      {
        heading: "Orientation week matters",
        body: [
          "Go to as many welcome events as you can. It's the easiest time to meet people, learn how your university works and sort out practical things like registration and bank accounts.",
        ],
      },
      {
        heading: "Sort your accommodation early",
        body: [
          "University halls are often the easiest first home. If you rent privately, never pay a deposit before you have seen a contract, and ask your university about trusted housing sites.",
        ],
      },
      {
        heading: "Look after yourself",
        body: [
          "Homesickness is normal, especially in the first months. Keep in touch with home, join a society or two, and know where your university's student support services are.",
        ],
      },
    ],
    cta: {
      label: "Pre-departure briefing",
      href: "/services/pre-departure-briefing",
    },
  },
  {
    slug: "pre-departure-checklist",
    category: "Student life",
    title: "Your pre-departure checklist",
    excerpt:
      "Documents, money, packing and your first week: everything to tick off before you fly.",
    date: "2026-09-15",
    read: 5,
    author: "Root Education Counselling Team",
    img: "1436491865332-7a61a109cc05",
    sections: [
      {
        heading: "Documents in your hand luggage",
        body: [
          "Passport with visa, university offer and enrolment letters, accommodation details, insurance documents and copies of your academic certificates. Keep digital copies too.",
        ],
      },
      {
        heading: "Money for the first weeks",
        body: [
          "Bring a card that works abroad and some local currency for arrival. It can take a few weeks to open a local bank account.",
        ],
      },
      {
        heading: "Plan your arrival",
        body: [
          "Know how you will get from the airport to your accommodation, and tell your university when you will arrive. Many offer airport pick-ups for new students.",
        ],
      },
    ],
    cta: {
      label: "Pre-departure briefing",
      href: "/services/pre-departure-briefing",
    },
  },
];

export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);
