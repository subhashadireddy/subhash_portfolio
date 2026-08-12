export interface RoleModule {
  role: string;
  items: string[];
}

export interface TechStackCategory {
  category: string;
  items: string[];
}

export interface ZeroStorageConcept {
  title: string;
  description: string;
  flow: string[];
  persistedItems: string[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  year: string;
  tech: string[];
  description: string;
  myRole: string[];
  keyFeatures?: string[];
  roleModules?: RoleModule[];
  techCategories?: TechStackCategory[];
  pipelineSteps?: string[];
  zeroStorageConcept?: ZeroStorageConcept;
  images: string[];
  hoverImage: string;
  github: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    slug: 'papertrail-ai',
    title: 'PAPERTRAIL AI',
    year: '2026',
    tech: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'MongoDB',
      'MongoDB Atlas',
      'Mongoose',
      'Firebase Authentication',
      'Google Gemini AI',
      'Gemini Vision',
      'REST APIs',
      'Vercel',
      'Zero-Storage Processing',
    ],
    description:
      'PaperTrail AI is a full-stack AI-powered document intelligence platform designed to transform unstructured business documents into structured, actionable intelligence.\n\nUsers can upload documents such as PDFs and images, which are processed in memory using Google Gemini Vision AI. The system analyzes the document and extracts important business information including obligations, deadlines, payment amounts, contacts, organizations, risks, recommendations, and actionable tasks.\n\nInstead of simply storing uploaded files, PaperTrail AI converts documents into structured intelligence that can be searched, tracked, scheduled, and acted upon through a centralized operations dashboard.\n\nThe platform is designed around a privacy-focused zero-storage workflow where original uploaded documents are processed temporarily in memory and discarded after analysis. Only the structured metadata and extracted intelligence required by the application are persisted in MongoDB Atlas.',
    myRole: [
      'Designed and developed the complete PaperTrail AI full-stack application from architecture and UI design through deployment.',
      'Built the document upload and in-memory processing workflow for PDF and image-based documents.',
      'Integrated Google Gemini Vision AI for multimodal document analysis and structured information extraction.',
      'Designed MongoDB Atlas schemas for documents, tasks, notifications, users, and audit records.',
      'Implemented Firebase Authentication and protected application routes.',
      'Built automated extraction of obligations, deadlines, payment information, contacts, organizations, risks, recommendations, and action items.',
      'Implemented an action-item lifecycle with pending, completed, and archived states.',
      'Built deadline-aware notifications and an action calendar for extracted obligations.',
      'Implemented document deletion with cascading removal of linked tasks and notifications.',
      'Implemented zero-storage document processing so original uploaded files are not permanently stored.',
      'Built dashboard telemetry showing scanned documents, pending actions, completed actions, and active notifications.',
      'Added document search, task search, AI-assisted document interaction, and audit-trail functionality.',
      'Built responsive interfaces for desktop, tablet, and mobile layouts.',
      'Deployed the production application using Vercel and connected it to MongoDB Atlas and Firebase.',
    ],
    keyFeatures: [
      'AI Document Intelligence — Upload business documents and automatically extract meaningful structured information using Gemini Vision AI.',
      'Multimodal Document Processing — Support PDF and image-based documents such as PNG, JPG and JPEG.',
      'Obligation Extraction — Identify important contractual or business obligations automatically.',
      'Deadline Detection — Extract dates, renewal dates, due dates, and other time-sensitive obligations.',
      'Payment Intelligence — Detect payment amounts and payment-related obligations from uploaded documents.',
      'Contact & Organization Extraction — Identify relevant people, organizations, and contact information.',
      'Risk Detection — Surface important risks, clauses, and potentially critical document conditions.',
      'Automatic Task Generation — Convert extracted obligations into actionable tasks with descriptions, priority, categories, and due dates.',
      'Action Lifecycle — Allow tasks to move through pending, completed, and archived states.',
      'Notifications — Generate notifications for important payment obligations, deadlines, and extracted events.',
      'Action Calendar — Present extracted deadlines and actions in a calendar-oriented workflow.',
      'Zero-Storage Processing — Original documents are processed in memory and discarded after analysis. Only structured intelligence and metadata are persisted.',
      'MongoDB Intelligence Storage — Persist structured document metadata, extracted intelligence, tasks, deadlines, contacts, risks, recommendations, and related information in MongoDB Atlas.',
      'Document Deletion — Allow users to permanently delete documents and automatically remove their linked tasks and notifications.',
      'Manual Force Deletion — Provide a clear user-controlled deletion mechanism for permanently removing stored structured records when required.',
      'AI Chat — Allow users to interact with extracted document intelligence through an AI-assisted interface.',
      'Audit Trail — Track important application and document-related actions for transparency and accountability.',
      'Secure Authentication — Use Firebase Authentication and protected application routes to isolate user data.',
      'Responsive Dashboard — Provide a responsive executive operations dashboard that works across desktop, tablet, and mobile devices.',
    ],
    techCategories: [
      {
        category: 'Frontend',
        items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      },
      {
        category: 'Backend',
        items: ['Next.js API Routes / REST APIs', 'Node.js', 'Mongoose'],
      },
      {
        category: 'Database',
        items: ['MongoDB Atlas'],
      },
      {
        category: 'Authentication',
        items: ['Firebase Authentication'],
      },
      {
        category: 'AI',
        items: ['Google Gemini AI', 'Gemini Vision', 'Multimodal document analysis', 'Structured AI extraction'],
      },
      {
        category: 'Deployment',
        items: ['Vercel'],
      },
    ],
    pipelineSteps: [
      'Upload Document',
      'In-Memory Processing',
      'Gemini Vision AI Analysis',
      'Structured Intelligence Extraction',
      'Tasks / Deadlines / Payments / Contacts / Risks',
      'MongoDB Atlas Persistence',
      'Dashboard / Notifications / Calendar / Audit Trail',
      'Original Document Discarded',
    ],
    zeroStorageConcept: {
      title: 'Zero-Storage Document Processing',
      description:
        'PaperTrail AI follows a zero-storage approach for original uploaded documents. The uploaded PDF/image exists temporarily in memory during the processing pipeline while Gemini Vision AI analyzes the document and extracts structured intelligence.\n\nAfter processing, the original file is discarded. Only useful structured information is persisted in MongoDB Atlas.',
      flow: [
        'Uploaded File',
        'Temporary in-memory processing',
        'Gemini AI analysis',
        'Structured JSON intelligence',
        'MongoDB Atlas',
        'Original document discarded',
      ],
      persistedItems: [
        'Document metadata',
        'Summary',
        'Extracted obligations',
        'Deadlines',
        'Payment information',
        'Contacts & Organizations',
        'Tasks',
        'Risks & Recommendations',
        'Classification & Confidence scores',
      ],
    },
    images: ['/Projects/PaperTrailAI/1.png'],
    hoverImage: '/Projects/PaperTrailAI/1.png',
    github: 'https://github.com/subhashadireddy/PaperTrailAI',
    liveUrl: 'https://papertrail-ai-gamma.vercel.app/',
  },
  {
    id: 2,
    slug: 'finance',
    title: 'Finance Tracker',
    year: '2026',
    tech: ['React', 'Express', 'Node.js', 'MongoDB', 'JWT Auth', 'Recharts.js', 'Tailwind CSS'],
    description:
      'A personal finance tracking application designed to help users log, organize, and review their daily incomes and expenses. The platform features an analytics dashboard that converts raw transaction feeds into interactive charts, including monthly spending comparisons, category breakdowns, and daily financial trends. Built with security in mind, the application secures all user records through JSON Web Tokens and bcrypt encryption. A global state store synchronizes transaction histories and user login states across the interface, utilizing request interceptors to automatically verify access tokens on outgoing API calls.',
    myRole: [
      'Developed the full stack application using the MERN stack and configured Redux Toolkit to manage global application states.',
      'Created interactive analytics dashboards using Recharts to visualize monthly income and expense metrics, category distributions, and spending trends.',
      'Implemented secure user authentication and authorization using JSON Web Tokens and bcrypt password hashing.',
      'Built transaction CRUD endpoints supporting dynamic category filtering and sorting by transaction amounts.',
      'Configured Axios interceptors to automatically append JWT bearer tokens to requests and handle session timeouts on 401 response codes.',
      'Designed a responsive client interface using Tailwind CSS, implementing alert notifications and table views for transaction management.',
    ],
    images: [
      '/Projects/financeTracker/1.webp',
      '/Projects/financeTracker/2.webp',
      '/Projects/financeTracker/3.webp',
      '/Projects/financeTracker/4.webp',
      '/Projects/financeTracker/5.webp',
      '/Projects/financeTracker/6.webp',
    ],
    hoverImage: '/Projects/financeTracker/1.webp',
    github: 'https://github.com/subhashadireddy/Finance-Tracker-Mern',
    liveUrl: '',
  },
  {
    id: 3,
    slug: 'blog',
    title: 'Blog App',
    year: '2026',
    tech: ['React', 'Express', 'Node.js', 'MongoDB', 'JWT Auth', 'Cloudinary', 'Tailwind CSS'],
    description:
      'A full stack blogging application featuring a modern, responsive design and robust account management. The system implements secure JWT authentication, password encryption, and dynamic image uploads using Cloudinary. Users can publish articles, categorize posts with tags, interact through comments, save bookmarked reading lists, and manage their author profiles. Designed with performance in mind, the platform integrates MongoDB database indexes and an optimized connection cache to deliver fast, scalable query resolutions.',
    myRole: [
      'Architected the full stack system using React, Express, Node.js, and MongoDB, enforcing a clean modular codebase.',
      'Integrated Cloudinary and Multer disk storage to support dynamic image uploads, incorporating automated asset destruction routines during post updates and deletions.',
      'Engineered complex Mongoose database schemas featuring text indexing on key query fields and compound indexes to speed up chronological lookups.',
      'Developed a stateless, token-based authentication system utilizing JSON Web Tokens and bcrypt password hashing.',
      'Built a real-time search interface on the frontend with a debounced input handler to limit API request frequencies.',
      'Implemented a cascading database purge workflow that automatically removes posts, comments, likes, and Cloudinary media assets upon account deletion.',
      'Configured centralized state management using Redux Toolkit to persist user authentication states and bookmarks across page reloads.',
      'Created Axios request and response interceptors to handle automatic token attachment and graceful session expiration redirects.',
    ],
    images: [
      '/Projects/blogsite/1.webp',
      '/Projects/blogsite/2.webp',
      '/Projects/blogsite/3.webp',
      '/Projects/blogsite/4.webp',
      '/Projects/blogsite/5.webp',
      '/Projects/blogsite/6.webp',
    ],
    hoverImage: '/Projects/blogsite/1.webp',
    github: 'https://github.com/subhashadireddy/Blog-App-Mern',
    liveUrl: '',
  },
  {
    id: 4,
    slug: 'railwaygo',
    title: 'RailwayGo',
    year: '2024',
    tech: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'SVG Maps',
      'JSON',
      'QR Code Integration',
      'Responsive Design',
      'Multilingual Support',
    ],
    description:
      'RailwayGo is a smart railway station navigation platform developed to simplify passenger movement inside large railway stations. The application generates personalized navigation routes based on the selected platform, passenger position, destination, and accessibility preferences. It combines an interactive SVG station map, multilingual guidance, QR-based location identification, and accessibility-aware routing to provide a seamless navigation experience while improving passenger convenience inside railway stations.',
    myRole: [
      'Designed and developed the complete RailwayGo web application from concept to implementation.',
      'Built an interactive SVG-based railway station map capable of dynamically highlighting navigation routes.',
      'Implemented intelligent route generation using structured JSON datasets for platforms, gates, destinations, foot over bridges, lifts, ramps, and escalators.',
      'Developed multilingual navigation support in English, Telugu, and Hindi for improved accessibility.',
      'Integrated QR Code scanning to automatically detect passenger starting locations.',
      'Designed responsive user interfaces focused on usability, accessibility, and smooth user interaction.',
      'Optimized the navigation workflow to deliver accurate step-by-step directions for passengers.',
    ],
    images: [
      '/Projects/railwayGo/1.png',
      '/Projects/railwayGo/2.png',
      '/Projects/railwayGo/3.png',
      '/Projects/railwayGo/4.png',
      '/Projects/railwayGo/5.png',
      '/Projects/railwayGo/6.png',
      '/Projects/railwayGo/7.png',
      '/Projects/railwayGo/8.png',
      '/Projects/railwayGo/9.png',
    ],
    hoverImage: '/Projects/railwayGo/1.png',
    github: 'https://github.com/subhashadireddy/RailwayGo',
    liveUrl: '',
  },
  {
    id: 5,
    slug: 'campusconnect',
    title: 'CampusConnect',
    year: '2025',
    tech: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'MongoDB Atlas',
      'Mongoose',
      'JWT Authentication',
      'bcrypt',
      'Role-Based Access Control',
      'REST APIs',
      'Render',
    ],
    description:
      'CampusConnect is a comprehensive full-stack campus collaboration platform developed to centralize academic resources, student communication, campus events, marketplace services, lost & found, community discussions, and administrative management within a single web application. The platform provides secure JWT-based authentication and Role-Based Access Control (RBAC) for Students, Faculty, Organizers, and Administrators, creating a complete digital ecosystem for educational institutions.',
    myRole: [
      'Designed and developed the complete full-stack CampusConnect application from planning to deployment.',
      'Built secure authentication using JWT tokens, bcrypt password hashing and Role-Based Access Control (RBAC).',
      'Developed scalable REST APIs using Node.js and Express.js.',
      'Designed MongoDB database schemas using Mongoose.',
      'Built responsive React.js interfaces for Students, Faculty, Organizers and Administrators.',
      'Implemented protected routes and middleware authorization.',
      'Developed CRUD operations for resources, users, events, marketplace listings, lost & found posts and community discussions.',
      'Implemented resource upload functionality with department and semester categorization.',
      'Designed modern dashboards with analytics, quick actions and responsive layouts.',
      'Deployed the backend on Render and integrated MongoDB Atlas cloud database.',
      'Optimized application performance, security and user experience.',
    ],
    keyFeatures: [
      'Secure JWT Authentication',
      'Role-Based Access Control (Student, Faculty, Organizer & Admin)',
      'Academic Resource Sharing',
      'Resource Upload & Verification',
      'Marketplace for Buying & Selling',
      'Lost & Found Management',
      'Campus Event Management',
      'Community Discussion Platform',
      'User Management Dashboard',
      'Administrative Moderation Panel',
      'Responsive Modern Dashboard',
      'Protected Routes & Secure APIs',
    ],
    roleModules: [
      {
        role: 'Student',
        items: [
          'Upload resources',
          'Download study materials',
          'Browse notes',
          'Join discussions',
          'Participate in campus events',
          'Buy and sell items',
          'Report lost & found items',
          'Manage wishlist',
        ],
      },
      {
        role: 'Faculty',
        items: [
          'Upload educational materials',
          'Share academic resources',
          'Verify learning content',
          'Guide students through discussions',
        ],
      },
      {
        role: 'Organizer',
        items: [
          'Create campus events',
          'Manage registrations',
          'Publish announcements',
          'Coordinate campus activities',
        ],
      },
      {
        role: 'Administrator',
        items: [
          'Manage users',
          'Assign user roles',
          'Moderate resources',
          'Moderate community posts',
          'Delete inappropriate content',
          'Verify uploaded resources',
          'Monitor overall platform activity',
        ],
      },
    ],
    images: [
      '/Projects/CampusConnect/1.png',
      '/Projects/CampusConnect/2.png',
      '/Projects/CampusConnect/3.png',
      '/Projects/CampusConnect/4.png',
      '/Projects/CampusConnect/5.png',
      '/Projects/CampusConnect/6.png',
      '/Projects/CampusConnect/7.png',
      '/Projects/CampusConnect/8.png',
      '/Projects/CampusConnect/9.png',
      '/Projects/CampusConnect/10.png',
      '/Projects/CampusConnect/11.png',
      '/Projects/CampusConnect/12.png',
      '/Projects/CampusConnect/13.png',
    ],
    hoverImage: '/Projects/CampusConnect/1.png',
    github: 'https://github.com/subhashadireddy/CampusConnect',
    liveUrl: '',
  },
];
export function getAllProjects(): Project[] {
  return projects;
}
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

