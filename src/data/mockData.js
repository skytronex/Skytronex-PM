export const MOCK_BRIEFING = {
    quote: "Focus on the 'Khaleeq' revisions today. It aligns 92% with your 'Packaging Design' goal.",
    weather: "Heavy Workload",
    focusMode: "Deep Work (4h)"
};

export const MOCK_TASKS = [
    { id: 1, title: "Audit Khaleeq Logo Assets", category: "FREELANCE", time: "10:00 AM", duration: "1.5h", status: "completed", urgent: true },
    { id: 2, title: "Spring Boot Entity Mapping", category: "LEARNING", time: "12:00 PM", duration: "2h", status: "pending", urgent: false, link: "Java Masterclass" },
    { id: 3, title: "Packaging Die-lines Draft", category: "FREELANCE", time: "03:00 PM", duration: "3h", status: "pending", urgent: true },
    { id: 4, title: "Weekly Server Maintenance", category: "DAILY", time: "06:00 PM", duration: "0.5h", status: "pending", urgent: false },
    { id: 5, title: "Gemini API Error Handling", category: "LEARNING", time: "08:00 PM", duration: "1h", status: "pending", urgent: false },
];

export const MOCK_SKILLS = [
    { name: "Java Spring Boot", level: 65, practiceHours: 12, trend: "up" },
    { name: "Gemini AI Integration", level: 40, practiceHours: 8, trend: "up" },
    { name: "Packaging Design", level: 25, practiceHours: 3, trend: "flat" },
    { name: "React / Next.js", level: 55, practiceHours: 15, trend: "up" },
    { name: "Google Antigravity IDE", level: 10, practiceHours: 1, trend: "up" },
    { name: "GitHub", level: 90, practiceHours: 200, trend: "up", link: "https://github.com/skytronex" },
];

export const MOCK_ROADMAP = [
    { id: 1, title: "Spring Security", status: "In Progress", type: "Udemy Course", progress: "45%" },
    { id: 2, title: "System Design", status: "Next", type: "Book: DDIA", progress: "0%" },
];

export const MOCK_POST_IDEAS = [
    { id: 1, topic: "Why I switched to Spring Boot for AI Apps", platform: "LinkedIn", status: "Draft" },
    { id: 2, topic: "Top 3 Gemini API pitfalls", platform: "Twitter", status: "Idea" },
    { id: 3, topic: "My freelance journey: Week 4", platform: "Blog", status: "Scheduled" },
];

export const MOCK_EMAILS = [
    { id: 1, sender: "Khaleeq Sattaar El, II", subject: "Re: Logo Assets & Brand Guidelines", preview: "Thanks for the quick turnaround. I've attached the vector files you requested...", time: "10:30 AM", unread: true, tag: "Client" },
    { id: 2, sender: "Spring.io Newsletter", subject: "Spring Boot 3.2 Released: Virtual Threads", preview: "The new release is here! Check out how virtual threads can improve throughput...", time: "09:15 AM", unread: false, tag: "Learning" },
    { id: 3, sender: "Upwork Notifications", subject: "Invitation to Interview: AI Prompt Engineer", preview: "You have a new invitation for a project matching your 'Gemini AI' skill...", time: "Yesterday", unread: true, tag: "Lead" },
    { id: 4, sender: "System", subject: "Weekly Performance Report", preview: "You completed 12 tasks this week. Your top skill was Java Spring Boot...", time: "Yesterday", unread: false, tag: "System" },
];

export const MOCK_EVENTS = [
    { id: 1, title: "Client Meeting: Khaleeq", time: "10:00 AM", type: "meeting", date: 20 },
    { id: 2, title: "Project Deadline: Logo", time: "5:00 PM", type: "deadline", date: 22 },
    { id: 3, title: "Weekly Review", time: "9:00 AM", type: "routine", date: 25 },
    { id: 4, title: "Learning Block: Spring Security", time: "2:00 PM", type: "learning", date: 21 },
];

export const MOCK_CLIENTS = [
    { id: 1, name: "Khaleeq Sattaar El, II", company: "KSE Brand", status: "Active", project: "Rebranding", value: "5,000", location: "Remote" },
    { id: 2, name: "TechFlow Inc", company: "TechFlow", status: "Lead", project: "Web App MVP", value: "12,000", location: "San Francisco" },
    { id: 3, name: "Sarah Jenkins", company: "Bloom Floral", status: "Completed", project: "Shopify Store", value: "3,500", location: "Austin, TX" },
];

export const MOCK_NOTES = [
    { id: 1, title: "Meeting Notes: Khaleeq", content: "Discussed logo variations. He prefers blue. Needs the vector files by Friday. \n\nAction items:\n- Export SVG\n- Update Brand Guide", date: "Dec 20" },
    { id: 2, title: "Java Learning Roadmap", content: "1. Spring Core\n2. Spring MVC\n3. Spring Security\n4. Database Access (JPA/Hibernate)", date: "Dec 18" },
    { id: 3, title: "Gemini API Snippets", content: "const genAI = new GoogleGenerativeAI(process.env.API_KEY);\nconst model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });", date: "Dec 15" }
];

export const MOCK_STICKIES = [
    { id: 1, color: "bg-yellow-200", content: "Call Khaleeq about the bleed lines", rotation: "rotate-1" },
    { id: 2, color: "bg-blue-200", content: "Update Java JDK to 21", rotation: "-rotate-2" },
    { id: 3, color: "bg-green-200", content: "Invoice #304 sent?", rotation: "rotate-0" },
    { id: 4, color: "bg-pink-200", content: "Hex code for brand blue: #3b82f6", rotation: "rotate-2" },
];

export const MOCK_RESOURCES = [
    { id: 1, type: 'video', title: 'Spring Boot 3.2 Crash Course', url: 'https://youtube.com/thumbnail1.jpg', description: 'Everything new in 3.2', duration: '15:20', tag: 'Spring' },
    { id: 2, type: 'github', title: 'skytronex-pm / CI-CD', url: 'https://github.com/skytronex/pm/actions', status: 'passing', lastRun: '2h ago', tag: 'DevOps' },
    { id: 3, type: 'link', title: 'Gemini API Docs', url: 'https://ai.google.dev/docs', description: 'Official reference for Gemini Pro', tag: 'AI' },
    { id: 4, type: 'video', title: 'System Design Interview Guide', url: 'https://youtube.com/thumbnail2.jpg', description: 'Scalability basics', duration: '45:00', tag: 'Design' },
    { id: 5, type: 'api', title: 'JSON Placeholder', url: 'https://jsonplaceholder.typicode.com', description: 'Fake REST API for testing', tag: 'Tool' },
];

export const MOCK_SNIPPETS = [
    { id: 1, title: 'Generative AI Call', language: 'javascript', code: "const runGenAI = async () => {\n  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });\n  const result = await model.generateContent(prompt);\n  console.log(result.response.text());\n};" },
    { id: 2, title: 'React useEffect Hook', language: 'javascript', code: "useEffect(() => {\n  const fetchData = async () => {\n    const data = await api.get('/users');\n    setUsers(data);\n  };\n  fetchData();\n}, []);" },
    { id: 3, title: 'Spring Boot Controller', language: 'java', code: "@RestController\n@RequestMapping(\"/api/v1\")\npublic class UserController {\n    @GetMapping\n    public List<User> getAllUsers() {\n        return userService.findAll();\n    }\n}" }
];
