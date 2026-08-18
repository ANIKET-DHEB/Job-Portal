const jobs = [
  {
    title: "Frontend Developer",
    company: "Google",
    location: "Mumbai",
    salary: "₹8 LPA",
    experience: "1-3 Years",
    qualification: "BCA / B.Tech",
    skills: ["HTML", "CSS", "JavaScript", "React", "Redux", "Git"],
    description:
      "We are looking for a Frontend Developer to build responsive and user-friendly web applications using React.js. You will collaborate with UI/UX designers and backend developers to develop high-performance applications, optimize website speed, fix bugs, and ensure cross-browser compatibility. Strong knowledge of HTML, CSS, JavaScript, and React is required.",
    jobType: "Full Time",
  },

  {
    title: "Backend Developer",
    company: "Microsoft",
    location: "Bengaluru",
    salary: "₹10 LPA",
    experience: "2-4 Years",
    qualification: "B.Tech / MCA",
    skills: ["Node.js", "Express", "MongoDB", "REST API", "JWT", "Git"],
    description:
      "Join our backend engineering team to design and develop scalable REST APIs using Node.js and Express. You will work with MongoDB, implement authentication, optimize database queries, and collaborate with frontend developers to build secure and high-performing applications.",
    jobType: "Full Time",
  },

  {
    title: "React Developer",
    company: "Infosys",
    location: "Pune",
    salary: "₹7 LPA",
    experience: "1-2 Years",
    qualification: "BCA / B.Sc IT",
    skills: ["React", "Redux", "JavaScript", "Hooks", "Axios"],
    description:
      "Develop enterprise-level React applications using modern JavaScript and React Hooks. Build reusable components, integrate REST APIs, improve application performance, and ensure responsive designs across multiple devices.",
    jobType: "Hybrid",
  },

  {
    title: "Node.js Developer",
    company: "Accenture",
    location: "Hyderabad",
    salary: "₹9 LPA",
    experience: "2-5 Years",
    qualification: "B.Tech",
    skills: ["Node.js", "Express", "MongoDB", "REST API", "Docker"],
    description:
      "Develop secure backend services and REST APIs for enterprise applications. Collaborate with frontend developers, optimize database performance, implement authentication systems, and maintain scalable backend architecture.",
    jobType: "Remote",
  },

  {
    title: "Java Developer",
    company: "TCS",
    location: "Mumbai",
    salary: "₹8 LPA",
    experience: "1-3 Years",
    qualification: "B.Tech / MCA",
    skills: ["Java", "Spring Boot", "MySQL", "Hibernate"],
    description:
      "Develop enterprise Java applications using Spring Boot and MySQL. Participate in software design, debugging, testing, and deployment while maintaining clean and efficient code for business-critical applications.",
    jobType: "Full Time",
  },

  {
    title: "Flutter Developer",
    company: "Capgemini",
    location: "Pune",
    salary: "₹6 LPA",
    experience: "0-2 Years",
    qualification: "BCA / B.Tech",
    skills: ["Flutter", "Dart", "Firebase", "REST API"],
    description:
      "Build cross-platform mobile applications using Flutter and Dart. Integrate REST APIs, Firebase services, push notifications, and deliver smooth user experiences for Android and iOS platforms.",
    jobType: "Hybrid",
  },

  {
    title: "UI/UX Designer",
    company: "Adobe",
    location: "Bengaluru",
    salary: "₹11 LPA",
    experience: "2-4 Years",
    qualification: "Any Graduate",
    skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
    description:
      "Design visually appealing and user-friendly interfaces for web and mobile applications. Conduct user research, create wireframes, prototypes, and collaborate closely with developers to ensure pixel-perfect implementation.",
    jobType: "Full Time",
  },

  {
    title: "PHP Developer",
    company: "Wipro",
    location: "Chennai",
    salary: "₹6.5 LPA",
    experience: "1-3 Years",
    qualification: "BCA / MCA",
    skills: ["PHP", "Laravel", "MySQL", "Bootstrap", "Git"],
    description:
      "Develop and maintain web applications using PHP and Laravel. Build REST APIs, optimize MySQL databases, troubleshoot application issues, and work closely with frontend developers to deliver complete solutions.",
    jobType: "Full Time",
  },

  {
    title: "DevOps Engineer",
    company: "Amazon",
    location: "Hyderabad",
    salary: "₹14 LPA",
    experience: "3-5 Years",
    qualification: "B.Tech",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Linux"],
    description:
      "Manage cloud infrastructure, automate deployments using CI/CD pipelines, monitor application performance, configure Kubernetes clusters, and ensure system reliability, scalability, and security.",
    jobType: "Full Time",
  },

  {
    title: "Data Analyst",
    company: "Deloitte",
    location: "Mumbai",
    salary: "₹8 LPA",
    experience: "1-3 Years",
    qualification: "B.Sc / BCA",
    skills: ["SQL", "Excel", "Power BI", "Python", "Tableau"],
    description:
      "Analyze business data, create interactive dashboards, generate reports, identify trends, and provide actionable insights to stakeholders. Strong analytical skills and experience with SQL, Excel, and visualization tools are required.",
    jobType: "Hybrid",
  },

  {
    title: "Full Stack Developer",
    company: "IBM",
    location: "Pune",
    salary: "₹12 LPA",
    experience: "2-5 Years",
    qualification: "B.Tech / MCA",
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
    description:
      "Build complete web applications using the MERN stack. Develop frontend interfaces, backend APIs, integrate databases, optimize performance, and collaborate with cross-functional teams to deliver high-quality software.",
    jobType: "Full Time",
  },
    {
    title: "Angular Developer",
    company: "Cognizant",
    location: "Chennai",
    salary: "₹8.5 LPA",
    experience: "1-3 Years",
    qualification: "B.Tech / MCA",
    skills: ["Angular", "TypeScript", "HTML", "CSS", "RxJS"],
    description:
      "Develop dynamic and scalable web applications using Angular and TypeScript. Collaborate with backend developers, implement reusable UI components, optimize application performance, and ensure responsive design across multiple devices.",
    jobType: "Full Time",
  },

  {
    title: "Python Developer",
    company: "Zoho",
    location: "Chennai",
    salary: "₹9 LPA",
    experience: "1-4 Years",
    qualification: "B.Tech / BCA / MCA",
    skills: ["Python", "Django", "Flask", "REST API", "PostgreSQL"],
    description:
      "Design and develop backend applications using Python, Django, and Flask. Build RESTful APIs, integrate databases, optimize application performance, write unit tests, and work closely with frontend developers.",
    jobType: "Full Time",
  },

  {
    title: "Software Engineer",
    company: "Oracle",
    location: "Bengaluru",
    salary: "₹11 LPA",
    experience: "1-3 Years",
    qualification: "B.Tech / MCA",
    skills: ["Java", "SQL", "Git", "Spring Boot", "Microservices"],
    description:
      "Develop enterprise software solutions, participate in code reviews, troubleshoot production issues, build scalable applications, and work with cross-functional teams following Agile development methodologies.",
    jobType: "Hybrid",
  },

  {
    title: "Cloud Engineer",
    company: "Infosys",
    location: "Hyderabad",
    salary: "₹12 LPA",
    experience: "2-5 Years",
    qualification: "B.Tech",
    skills: ["AWS", "Azure", "Linux", "Docker", "Terraform"],
    description:
      "Manage cloud infrastructure, automate deployments, configure virtual machines, monitor system performance, maintain cloud security, and support highly available production environments.",
    jobType: "Full Time",
  },

  {
    title: "QA Engineer",
    company: "Tech Mahindra",
    location: "Noida",
    salary: "₹7 LPA",
    experience: "1-3 Years",
    qualification: "BCA / B.Tech",
    skills: ["Manual Testing", "JIRA", "Test Cases", "Bug Tracking"],
    description:
      "Create detailed test plans, execute manual testing, identify software defects, report bugs using JIRA, verify bug fixes, and ensure software quality before product releases.",
    jobType: "Full Time",
  },

  {
    title: "Automation Test Engineer",
    company: "HCL Technologies",
    location: "Lucknow",
    salary: "₹9 LPA",
    experience: "2-4 Years",
    qualification: "B.Tech / MCA",
    skills: ["Selenium", "Java", "TestNG", "Jenkins", "Maven"],
    description:
      "Develop and maintain automation test scripts using Selenium and Java. Execute regression testing, integrate automation with CI/CD pipelines, and improve software testing efficiency.",
    jobType: "Hybrid",
  },

  {
    title: "WordPress Developer",
    company: "Webkul",
    location: "Noida",
    salary: "₹6 LPA",
    experience: "1-3 Years",
    qualification: "BCA / Any Graduate",
    skills: ["WordPress", "PHP", "Elementor", "WooCommerce", "MySQL"],
    description:
      "Develop and customize WordPress websites, build custom themes and plugins, optimize website speed, improve SEO performance, and maintain secure and responsive business websites.",
    jobType: "Full Time",
  },

  {
    title: "Shopify Developer",
    company: "Razorpay",
    location: "Bengaluru",
    salary: "₹8 LPA",
    experience: "1-3 Years",
    qualification: "BCA / B.Tech",
    skills: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    description:
      "Customize Shopify themes, develop custom sections, integrate third-party applications, improve online store performance, and deliver responsive eCommerce experiences for customers.",
    jobType: "Remote",
  },

  {
    title: "SEO Executive",
    company: "WebFX",
    location: "Mumbai",
    salary: "₹5.5 LPA",
    experience: "0-2 Years",
    qualification: "Any Graduate",
    skills: ["SEO", "Google Analytics", "Google Search Console", "Keyword Research"],
    description:
      "Perform keyword research, optimize website content, improve search engine rankings, monitor website traffic, analyze SEO reports, and implement on-page and off-page SEO strategies.",
    jobType: "Full Time",
  },

  {
    title: "Digital Marketing Executive",
    company: "Reliance Jio",
    location: "Mumbai",
    salary: "₹6 LPA",
    experience: "1-3 Years",
    qualification: "MBA / BBA / Any Graduate",
    skills: ["Google Ads", "Meta Ads", "SEO", "Content Marketing", "Analytics"],
    description:
      "Plan and execute digital marketing campaigns across multiple platforms, analyze campaign performance, optimize paid advertisements, increase website traffic, and improve customer engagement through effective marketing strategies.",
    jobType: "Hybrid",
  },
    {
    title: "Android Developer",
    company: "Paytm",
    location: "Noida",
    salary: "₹9 LPA",
    experience: "1-3 Years",
    qualification: "B.Tech / MCA",
    skills: ["Java", "Kotlin", "Android Studio", "Firebase", "REST API"],
    description:
      "Develop and maintain Android applications using Java and Kotlin. Integrate REST APIs, Firebase services, optimize application performance, fix bugs, and ensure smooth user experiences across Android devices.",
    jobType: "Full Time",
  },

  {
    title: "iOS Developer",
    company: "Apple",
    location: "Bengaluru",
    salary: "₹16 LPA",
    experience: "2-5 Years",
    qualification: "B.Tech",
    skills: ["Swift", "Xcode", "UIKit", "REST API", "Git"],
    description:
      "Build high-quality iOS applications using Swift and Xcode. Work closely with designers and backend developers to create secure, scalable, and user-friendly mobile applications.",
    jobType: "Full Time",
  },

  {
    title: "Cyber Security Analyst",
    company: "KPMG",
    location: "Mumbai",
    salary: "₹12 LPA",
    experience: "2-4 Years",
    qualification: "B.Tech / MCA",
    skills: ["Network Security", "SIEM", "Linux", "Firewalls", "Risk Assessment"],
    description:
      "Monitor security threats, perform vulnerability assessments, investigate incidents, implement security controls, and ensure organizational compliance with cybersecurity standards.",
    jobType: "Hybrid",
  },

  {
    title: "Machine Learning Engineer",
    company: "NVIDIA",
    location: "Pune",
    salary: "₹18 LPA",
    experience: "2-5 Years",
    qualification: "B.Tech / M.Tech",
    skills: ["Python", "TensorFlow", "PyTorch", "Pandas", "Scikit-Learn"],
    description:
      "Design and deploy machine learning models, preprocess large datasets, evaluate model performance, collaborate with data scientists, and build AI-powered solutions for real-world applications.",
    jobType: "Full Time",
  },

  {
    title: "AI Engineer",
    company: "OpenAI",
    location: "Remote",
    salary: "₹20 LPA",
    experience: "2-5 Years",
    qualification: "B.Tech / MCA",
    skills: ["Python", "LLMs", "LangChain", "OpenAI API", "Vector Database"],
    description:
      "Develop AI-powered applications using large language models, integrate AI APIs, optimize prompts, build intelligent assistants, and collaborate with engineering teams to deliver innovative AI solutions.",
    jobType: "Remote",
  },

  {
    title: "Database Administrator",
    company: "IBM",
    location: "Hyderabad",
    salary: "₹11 LPA",
    experience: "2-5 Years",
    qualification: "B.Tech / MCA",
    skills: ["MySQL", "Oracle", "SQL Server", "Backup", "Performance Tuning"],
    description:
      "Manage enterprise databases, optimize SQL queries, perform backups and recovery, ensure database security, monitor performance, and maintain high system availability.",
    jobType: "Full Time",
  },

  {
    title: "Network Engineer",
    company: "Cisco",
    location: "Bengaluru",
    salary: "₹10 LPA",
    experience: "2-4 Years",
    qualification: "B.Tech",
    skills: ["CCNA", "Routing", "Switching", "TCP/IP", "Firewalls"],
    description:
      "Configure and maintain enterprise network infrastructure, troubleshoot connectivity issues, monitor network performance, implement security measures, and ensure uninterrupted network services.",
    jobType: "Full Time",
  },

  {
    title: "Business Analyst",
    company: "EY",
    location: "Mumbai",
    salary: "₹9 LPA",
    experience: "1-3 Years",
    qualification: "MBA / B.Tech",
    skills: ["Excel", "SQL", "Power BI", "Requirement Gathering", "Agile"],
    description:
      "Gather business requirements, analyze data, prepare documentation, coordinate with stakeholders, improve business processes, and support software development teams with functional requirements.",
    jobType: "Hybrid",
  },

  {
    title: "System Administrator",
    company: "Dell Technologies",
    location: "Pune",
    salary: "₹8.5 LPA",
    experience: "2-4 Years",
    qualification: "BCA / B.Tech",
    skills: ["Windows Server", "Linux", "Active Directory", "VMware", "Networking"],
    description:
      "Maintain servers, install software, manage user accounts, monitor system performance, troubleshoot infrastructure issues, and ensure reliable IT operations across the organization.",
    jobType: "Full Time",
  },

  {
    title: "Graphic Designer",
    company: "Canva",
    location: "Remote",
    salary: "₹7 LPA",
    experience: "1-3 Years",
    qualification: "Any Graduate",
    skills: ["Photoshop", "Illustrator", "Figma", "Canva", "Branding"],
    description:
      "Create engaging visual content for digital platforms, marketing campaigns, social media, websites, and branding materials while collaborating with marketing and product teams.",
    jobType: "Remote",
  },

  {
    title: "Product Manager",
    company: "Flipkart",
    location: "Bengaluru",
    salary: "₹18 LPA",
    experience: "3-6 Years",
    qualification: "MBA / B.Tech",
    skills: ["Product Strategy", "Agile", "JIRA", "Analytics", "Roadmaps"],
    description:
      "Lead product planning, define product roadmaps, gather customer feedback, prioritize features, coordinate with engineering teams, and ensure successful product launches.",
    jobType: "Full Time",
  },

  {
    title: "Technical Support Engineer",
    company: "Zoho",
    location: "Chennai",
    salary: "₹6.5 LPA",
    experience: "0-2 Years",
    qualification: "BCA / B.Sc / B.Tech",
    skills: ["Troubleshooting", "Networking", "Customer Support", "Windows", "Linux"],
    description:
      "Provide technical support to customers, diagnose software and hardware issues, resolve tickets, document solutions, and ensure excellent customer satisfaction.",
    jobType: "Full Time",
  },

  {
    title: "C++ Developer",
    company: "Siemens",
    location: "Pune",
    salary: "₹11 LPA",
    experience: "2-5 Years",
    qualification: "B.Tech",
    skills: ["C++", "STL", "OOP", "Data Structures", "Algorithms"],
    description:
      "Develop high-performance software applications using modern C++, optimize application performance, debug complex issues, and collaborate with software engineering teams.",
    jobType: "Full Time",
  },

  {
    title: ".NET Developer",
    company: "LTIMindtree",
    location: "Hyderabad",
    salary: "₹10 LPA",
    experience: "2-4 Years",
    qualification: "B.Tech / MCA",
    skills: ["C#", ".NET Core", "SQL Server", "ASP.NET", "Entity Framework"],
    description:
      "Develop scalable web applications using .NET technologies, build REST APIs, optimize SQL Server databases, write clean code, and participate in Agile software development.",
    jobType: "Hybrid",
  },

  {
    title: "Salesforce Developer",
    company: "Infosys",
    location: "Bengaluru",
    salary: "₹13 LPA",
    experience: "2-5 Years",
    qualification: "B.Tech / MCA",
    skills: ["Salesforce", "Apex", "Lightning", "SOQL", "Visualforce"],
    description:
      "Customize Salesforce CRM, develop Apex classes and Lightning components, automate workflows, integrate third-party systems, and deliver scalable CRM solutions for enterprise clients.",
    jobType: "Full Time",
  },
];
module.exports = jobs;