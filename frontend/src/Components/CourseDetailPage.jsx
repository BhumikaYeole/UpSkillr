import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Check, Clock, Users, Star, Award, BookOpen, Share2, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModule, setExpandedModule] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // All courses data - matching your CoursesPage and CoursesSection
  const allCourses = {
    "web-development-bootcamp": {
      id: "web-development-bootcamp",
      title: "Complete Web Development Bootcamp",
      category: "Development",
      level: "All Levels",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      students: "45.2K",
      rating: 4.8,
      reviews: 3240,
      hours: "52",
      lessons: 156,
      instructor: {
        name: "Sarah Johnson",
        title: "Senior Web Developer & Tech Lead",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
        students: "125K+",
        courses: 12
      },
      description: "Master web development from scratch! Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and get job-ready.",
      learningPoints: [
        "Build 15+ real-world projects for your portfolio",
        "Master HTML5, CSS3, and modern JavaScript (ES6+)",
        "Learn React.js and build dynamic web applications",
        "Understand backend development with Node.js and Express",
        "Work with databases - MongoDB and SQL",
        "Deploy your applications to production",
        "Get job-ready with interview preparation",
        "Earn a performance-based certificate"
      ],
      curriculum: [
        {
          title: "Introduction to Web Development",
          lessons: 8,
          duration: "2h 30m",
          topics: [
            { title: "Welcome to the Course", duration: "5:30", free: true },
            { title: "Setup Development Environment", duration: "15:20", free: true },
            { title: "How the Web Works", duration: "12:45", free: false },
            { title: "HTML Basics", duration: "20:15", free: false }
          ]
        },
        {
          title: "HTML & CSS Fundamentals",
          lessons: 24,
          duration: "8h 15m",
          topics: [
            { title: "HTML Structure and Elements", duration: "18:30", free: false },
            { title: "CSS Styling Basics", duration: "22:45", free: false },
            { title: "Flexbox and Grid Layouts", duration: "35:20", free: false },
            { title: "Responsive Web Design", duration: "28:15", free: false }
          ]
        },
        {
          title: "JavaScript Mastery",
          lessons: 36,
          duration: "12h 45m",
          topics: [
            { title: "JavaScript Fundamentals", duration: "25:30", free: false },
            { title: "DOM Manipulation", duration: "30:20", free: false },
            { title: "ES6+ Features", duration: "28:45", free: false }
          ]
        }
      ],
      requirements: [
        "No prior programming experience needed",
        "A computer with internet connection",
        "Willingness to learn and practice"
      ]
    },
    "data-science-python": {
      id: "data-science-python",
      title: "Data Science with Python",
      category: "Data Science",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
      students: "38.5K",
      rating: 4.9,
      reviews: 2850,
      hours: "42",
      lessons: 128,
      instructor: {
        name: "Michael Chen",
        title: "Data Scientist & ML Engineer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        students: "95K+",
        courses: 8
      },
      description: "Learn data science with Python from scratch. Master NumPy, Pandas, Matplotlib, and build real data analysis projects.",
      learningPoints: [
        "Master Python programming fundamentals",
        "Work with NumPy and Pandas for data manipulation",
        "Create stunning visualizations with Matplotlib and Seaborn",
        "Perform statistical analysis and hypothesis testing",
        "Build predictive models with scikit-learn",
        "Work with real-world datasets",
        "Complete 10+ hands-on projects",
        "Get certified upon completion"
      ],
      curriculum: [
        {
          title: "Python Fundamentals",
          lessons: 15,
          duration: "4h 20m",
          topics: [
            { title: "Python Installation & Setup", duration: "8:30", free: true },
            { title: "Variables and Data Types", duration: "12:20", free: true },
            { title: "Control Flow", duration: "15:45", free: false },
            { title: "Functions and Modules", duration: "18:30", free: false }
          ]
        },
        {
          title: "Data Analysis with Pandas",
          lessons: 28,
          duration: "9h 30m",
          topics: [
            { title: "Introduction to Pandas", duration: "16:30", free: false },
            { title: "DataFrames and Series", duration: "24:45", free: false },
            { title: "Data Cleaning", duration: "32:20", free: false }
          ]
        },
        {
          title: "Data Visualization",
          lessons: 20,
          duration: "6h 45m",
          topics: [
            { title: "Matplotlib Basics", duration: "18:30", free: false },
            { title: "Advanced Plotting", duration: "25:15", free: false }
          ]
        }
      ],
      requirements: [
        "Basic computer skills",
        "No programming experience required",
        "Interest in data and analytics"
      ]
    },
    "data-science-machine-learning": {
      id: "data-science-machine-learning",
      title: "Data Science & Machine Learning",
      category: "Data Science",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      students: "32.1K",
      rating: 4.7,
      reviews: 2100,
      hours: "68",
      lessons: 185,
      instructor: {
        name: "Dr. Emily Rodriguez",
        title: "PhD in Machine Learning & AI Researcher",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
        students: "78K+",
        courses: 6
      },
      description: "Master advanced machine learning algorithms, deep learning, and AI. Build production-ready ML models.",
      learningPoints: [
        "Master supervised and unsupervised learning",
        "Build neural networks with TensorFlow and Keras",
        "Implement deep learning architectures",
        "Natural Language Processing (NLP)",
        "Computer Vision applications",
        "Model deployment and MLOps",
        "Work with real industry datasets",
        "Capstone project with certification"
      ],
      curriculum: [
        {
          title: "Machine Learning Foundations",
          lessons: 25,
          duration: "8h 30m",
          topics: [
            { title: "Introduction to ML", duration: "12:30", free: true },
            { title: "Supervised Learning", duration: "22:45", free: true },
            { title: "Regression Models", duration: "28:15", free: false }
          ]
        },
        {
          title: "Deep Learning",
          lessons: 35,
          duration: "15h 20m",
          topics: [
            { title: "Neural Networks", duration: "32:30", free: false },
            { title: "CNNs for Computer Vision", duration: "45:15", free: false }
          ]
        }
      ],
      requirements: [
        "Strong Python programming skills",
        "Understanding of mathematics and statistics",
        "Completed Data Science fundamentals course or equivalent"
      ]
    },
    "data-analytics-excel-powerbi": {
      id: "data-analytics-excel-powerbi",
      title: "Data Analytics with Excel & Power BI",
      category: "Data Science",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      students: "28.3K",
      rating: 4.6,
      reviews: 1890,
      hours: "36",
      lessons: 98,
      instructor: {
        name: "David Kim",
        title: "Business Intelligence Analyst",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
        students: "65K+",
        courses: 10
      },
      description: "Master Excel and Power BI for business analytics. Create interactive dashboards and make data-driven decisions.",
      learningPoints: [
        "Advanced Excel formulas and functions",
        "Power Query for data transformation",
        "Create stunning Power BI dashboards",
        "DAX language mastery",
        "Business intelligence best practices",
        "Real business case studies",
        "Connect to multiple data sources",
        "Share and publish reports"
      ],
      curriculum: [
        {
          title: "Excel Mastery",
          lessons: 22,
          duration: "7h 15m",
          topics: [
            { title: "Excel Basics Review", duration: "10:30", free: true },
            { title: "Advanced Formulas", duration: "18:45", free: false },
            { title: "Pivot Tables", duration: "22:30", free: false }
          ]
        },
        {
          title: "Power BI Fundamentals",
          lessons: 28,
          duration: "10h 30m",
          topics: [
            { title: "Introduction to Power BI", duration: "15:20", free: true },
            { title: "Data Modeling", duration: "28:45", free: false }
          ]
        }
      ],
      requirements: [
        "Basic Excel knowledge",
        "Understanding of business concepts",
        "Windows computer with Excel and Power BI Desktop"
      ]
    },
    "react-development": {
      id: "react-development",
      title: "Complete React Development",
      category: "Development",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      students: "41.7K",
      rating: 4.8,
      reviews: 2950,
      hours: "48",
      lessons: 142,
      instructor: {
        name: "Alex Turner",
        title: "Frontend Architect & React Specialist",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
        students: "112K+",
        courses: 9
      },
      description: "Master React.js and build modern, scalable web applications. Learn hooks, context, Redux, and Next.js.",
      learningPoints: [
        "React fundamentals and JSX",
        "Functional components and Hooks",
        "State management with Redux",
        "React Router for navigation",
        "API integration and async operations",
        "Next.js for server-side rendering",
        "Testing React applications",
        "Deploy production-ready apps"
      ],
      curriculum: [
        {
          title: "React Basics",
          lessons: 18,
          duration: "5h 30m",
          topics: [
            { title: "React Introduction", duration: "8:30", free: true },
            { title: "Components and Props", duration: "15:20", free: true },
            { title: "State and Lifecycle", duration: "20:45", free: false }
          ]
        },
        {
          title: "Advanced React",
          lessons: 32,
          duration: "12h 45m",
          topics: [
            { title: "React Hooks Deep Dive", duration: "28:30", free: false },
            { title: "Context API", duration: "22:15", free: false }
          ]
        }
      ],
      requirements: [
        "JavaScript fundamentals",
        "HTML and CSS knowledge",
        "Basic understanding of ES6+"
      ]
    },
    "aws-cloud-practitioner": {
      id: "aws-cloud-practitioner",
      title: "AWS Cloud Practitioner",
      category: "Cloud",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      students: "35.9K",
      rating: 4.7,
      reviews: 2340,
      hours: "32",
      lessons: 95,
      instructor: {
        name: "Jennifer Martinez",
        title: "AWS Solutions Architect",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
        students: "88K+",
        courses: 7
      },
      description: "Get AWS Cloud Practitioner certified! Learn AWS fundamentals, services, and cloud computing concepts.",
      learningPoints: [
        "AWS Cloud fundamentals",
        "Core AWS services (EC2, S3, RDS)",
        "AWS pricing and billing",
        "Security and compliance",
        "Cloud architecture best practices",
        "Hands-on AWS console practice",
        "Exam preparation strategies",
        "Certification ready"
      ],
      curriculum: [
        {
          title: "Cloud Computing Basics",
          lessons: 12,
          duration: "3h 20m",
          topics: [
            { title: "What is Cloud Computing?", duration: "10:30", free: true },
            { title: "AWS Global Infrastructure", duration: "12:45", free: true },
            { title: "AWS Services Overview", duration: "18:20", free: false }
          ]
        },
        {
          title: "AWS Core Services",
          lessons: 28,
          duration: "10h 30m",
          topics: [
            { title: "EC2 Instances", duration: "22:30", free: false },
            { title: "S3 Storage", duration: "18:45", free: false }
          ]
        }
      ],
      requirements: [
        "Basic IT knowledge",
        "No prior AWS experience needed",
        "Interest in cloud computing"
      ]
    },
    "nodejs-backend-development": {
      id: "nodejs-backend-development",
      title: "Node.js Backend Development",
      category: "Development",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800",
      students: "29.4K",
      rating: 4.8,
      reviews: 1980,
      hours: "44",
      lessons: 125,
      instructor: {
        name: "Ryan Thompson",
        title: "Backend Engineer & DevOps Specialist",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200",
        students: "72K+",
        courses: 8
      },
      description: "Master Node.js backend development. Build RESTful APIs, work with databases, and deploy scalable applications.",
      learningPoints: [
        "Node.js and Express.js fundamentals",
        "RESTful API design and development",
        "MongoDB and Mongoose",
        "Authentication and authorization",
        "Security best practices",
        "Testing with Jest",
        "Microservices architecture",
        "Docker and deployment"
      ],
      curriculum: [
        {
          title: "Node.js Fundamentals",
          lessons: 16,
          duration: "4h 45m",
          topics: [
            { title: "Node.js Introduction", duration: "10:30", free: true },
            { title: "NPM and Modules", duration: "14:20", free: true },
            { title: "Async Programming", duration: "22:45", free: false }
          ]
        },
        {
          title: "Express.js & APIs",
          lessons: 30,
          duration: "11h 20m",
          topics: [
            { title: "Express Setup", duration: "16:30", free: false },
            { title: "Building REST APIs", duration: "28:45", free: false }
          ]
        }
      ],
      requirements: [
        "JavaScript proficiency",
        "Understanding of web fundamentals",
        "Basic command line knowledge"
      ]
    },
    "uiux-design-fundamentals": {
      id: "uiux-design-fundamentals",
      title: "UI/UX Design Fundamentals",
      category: "Design",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      students: "52.6K",
      rating: 4.9,
      reviews: 3680,
      hours: "38",
      lessons: 112,
      instructor: {
        name: "Sophie Anderson",
        title: "Senior UX Designer & Product Lead",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200",
        students: "145K+",
        courses: 11
      },
      description: "Learn UI/UX design from scratch. Master Figma, create beautiful interfaces, and build a stunning portfolio.",
      learningPoints: [
        "UI/UX design principles",
        "User research and personas",
        "Wireframing and prototyping",
        "Figma mastery",
        "Design systems",
        "Usability testing",
        "Portfolio projects",
        "Landing your first design job"
      ],
      curriculum: [
        {
          title: "Design Fundamentals",
          lessons: 14,
          duration: "4h 10m",
          topics: [
            { title: "Introduction to UI/UX", duration: "12:30", free: true },
            { title: "Design Thinking", duration: "18:45", free: true },
            { title: "Color Theory", duration: "16:20", free: false }
          ]
        },
        {
          title: "Figma Mastery",
          lessons: 26,
          duration: "9h 30m",
          topics: [
            { title: "Figma Basics", duration: "15:30", free: false },
            { title: "Advanced Prototyping", duration: "25:45", free: false }
          ]
        }
      ],
      requirements: [
        "No design experience needed",
        "Computer with internet",
        "Creative mindset"
      ]
    },
    "digital-marketing-masterclass": {
      id: "digital-marketing-masterclass",
      title: "Digital Marketing Masterclass",
      category: "Marketing",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
      students: "37.2K",
      rating: 4.7,
      reviews: 2560,
      hours: "40",
      lessons: 118,
      instructor: {
        name: "Mark Williams",
        title: "Digital Marketing Strategist",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
        students: "98K+",
        courses: 13
      },
      description: "Master digital marketing strategies. Learn SEO, social media, email marketing, and grow your online presence.",
      learningPoints: [
        "SEO and content marketing",
        "Social media marketing strategies",
        "Google Ads and PPC campaigns",
        "Email marketing automation",
        "Analytics and data-driven decisions",
        "Conversion optimization",
        "Brand building online",
        "Real campaign case studies"
      ],
      curriculum: [
        {
          title: "Digital Marketing Basics",
          lessons: 15,
          duration: "4h 30m",
          topics: [
            { title: "Marketing Fundamentals", duration: "12:30", free: true },
            { title: "Digital Landscape", duration: "16:45", free: true },
            { title: "Target Audience", duration: "18:20", free: false }
          ]
        },
        {
          title: "SEO & Content Marketing",
          lessons: 28,
          duration: "10h 15m",
          topics: [
            { title: "SEO Fundamentals", duration: "22:30", free: false },
            { title: "Keyword Research", duration: "18:45", free: false }
          ]
        }
      ],
      requirements: [
        "Basic internet and social media knowledge",
        "Interest in marketing",
        "No technical skills required"
      ]
    },
    "mobile-app-development": {
      id: "mobile-app-development",
      title: "Mobile App Development",
      category: "Mobile",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      students: "24.8K",
      rating: 4.6,
      reviews: 1670,
      hours: "56",
      lessons: 165,
      instructor: {
        name: "Jessica Lee",
        title: "Mobile App Developer & iOS Specialist",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
        students: "58K+",
        courses: 6
      },
      description: "Build professional mobile apps for iOS and Android. Learn React Native and publish to app stores.",
      learningPoints: [
        "React Native fundamentals",
        "iOS and Android development",
        "Mobile UI/UX best practices",
        "State management in mobile apps",
        "Native modules and APIs",
        "App store deployment",
        "Performance optimization",
        "Build 5+ complete apps"
      ],
      curriculum: [
        {
          title: "React Native Basics",
          lessons: 20,
          duration: "6h 30m",
          topics: [
            { title: "Setup and Installation", duration: "15:30", free: true },
            { title: "Components and Styling", duration: "22:45", free: true },
            { title: "Navigation", duration: "18:20", free: false }
          ]
        },
        {
          title: "Advanced Mobile Development",
          lessons: 35,
          duration: "14h 45m",
          topics: [
            { title: "Native Modules", duration: "28:30", free: false },
            { title: "Push Notifications", duration: "22:15", free: false }
          ]
        }
      ],
      requirements: [
        "JavaScript and React knowledge",
        "Basic mobile development understanding",
        "Mac for iOS development (optional)"
      ]
    },
    "cybersecurity-essentials": {
      id: "cybersecurity-essentials",
      title: "Cybersecurity Essentials",
      category: "Security",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
      students: "31.5K",
      rating: 4.8,
      reviews: 2120,
      hours: "34",
      lessons: 98,
      instructor: {
        name: "Robert Garcia",
        title: "Cybersecurity Expert & Ethical Hacker",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200",
        students: "82K+",
        courses: 9
      },
      description: "Learn cybersecurity fundamentals. Protect systems, networks, and data from cyber threats.",
      learningPoints: [
        "Cybersecurity fundamentals",
        "Network security basics",
        "Ethical hacking principles",
        "Threat detection and prevention",
        "Security tools and software",
        "Incident response",
        "Best security practices",
        "Career guidance in cybersecurity"
      ],
      curriculum: [
        {
          title: "Introduction to Cybersecurity",
          lessons: 12,
          duration: "3h 45m",
          topics: [
            { title: "What is Cybersecurity?", duration: "12:30", free: true },
            { title: "Threat Landscape", duration: "16:45", free: true },
            { title: "Security Principles", duration: "18:20", free: false }
          ]
        },
        {
          title: "Network Security",
          lessons: 24,
          duration: "8h 30m",
          topics: [
            { title: "Firewalls and VPNs", duration: "22:30", free: false },
            { title: "Intrusion Detection", duration: "18:45", free: false }
          ]
        }
      ],
      requirements: [
        "Basic computer knowledge",
        "Understanding of networks (helpful but not required)",
        "Interest in security"
      ]
    },
    "docker-kubernetes-mastery": {
      id: "docker-kubernetes-mastery",
      title: "Docker & Kubernetes Mastery",
      category: "Cloud",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800",
      students: "22.9K",
      rating: 4.7,
      reviews: 1540,
      hours: "50",
      lessons: 145,
      instructor: {
        name: "Chris Brown",
        title: "DevOps Engineer & Cloud Architect",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200",
        students: "65K+",
        courses: 7
      },
      description: "Master Docker and Kubernetes. Deploy and manage containerized applications at scale.",
      learningPoints: [
        "Docker fundamentals and containers",
        "Docker Compose for multi-container apps",
        "Kubernetes architecture",
        "Deploy apps to Kubernetes",
        "Service mesh and networking",
        "CI/CD with containers",
        "Production best practices",
        "Helm charts and package management"
      ],
      curriculum: [
        {
          title: "Docker Mastery",
          lessons: 18,
          duration: "6h 20m",
          topics: [
            { title: "Docker Introduction", duration: "14:30", free: true },
            { title: "Containers vs VMs", duration: "12:45", free: true },
            { title: "Docker Images", duration: "22:20", free: false }
          ]
        },
        {
          title: "Kubernetes Deep Dive",
          lessons: 32,
          duration: "13h 45m",
          topics: [
            { title: "K8s Architecture", duration: "28:30", free: false },
            { title: "Pods and Deployments", duration: "32:15", free: false }
          ]
        }
      ],
      requirements: [
        "Linux command line proficiency",
        "Understanding of networking concepts",
        "Basic cloud computing knowledge"
      ]
    },
    // Add matching IDs for CoursesSection courses
    "uiux-design-masterclass": {
      id: "uiux-design-masterclass",
      title: "UI/UX Design Masterclass",
      category: "Design",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      students: "32.1K",
      rating: 4.7,
      reviews: 2245,
      hours: "28",
      lessons: 86,
      instructor: {
        name: "Sarah Lee",
        title: "Senior UX Designer",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200",
        students: "98K+",
        courses: 8
      },
      description: "Master UI/UX design principles and create beautiful, user-friendly interfaces that convert.",
      learningPoints: [
        "UI/UX design fundamentals",
        "User research methodologies",
        "Wireframing and prototyping",
        "Figma and design tools mastery",
        "Design systems and patterns",
        "Usability testing",
        "Create portfolio projects",
        "Get hired as a designer"
      ],
      curriculum: [
        {
          title: "Design Basics",
          lessons: 12,
          duration: "3h 45m",
          topics: [
            { title: "Introduction to Design", duration: "10:30", free: true },
            { title: "Design Principles", duration: "15:45", free: true },
            { title: "Color and Typography", duration: "18:20", free: false }
          ]
        }
      ],
      requirements: [
        "No prior design experience",
        "Computer with design software",
        "Creative thinking"
      ]
    },
    "cloud-computing-aws": {
      id: "cloud-computing-aws",
      title: "Cloud Computing with AWS",
      category: "Cloud & DevOps",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
      students: "7.6K",
      rating: 4.8,
      reviews: 654,
      hours: "40",
      lessons: 110,
      instructor: {
        name: "James Thompson",
        title: "AWS Certified Solutions Architect",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
        students: "45K+",
        courses: 6
      },
      description: "Learn AWS cloud computing from basics to advanced. Deploy scalable applications on AWS infrastructure.",
      learningPoints: [
        "AWS cloud fundamentals",
        "EC2, S3, and RDS services",
        "VPC and networking",
        "IAM and security",
        "Lambda serverless computing",
        "CloudFormation and automation",
        "Cost optimization",
        "AWS certification prep"
      ],
      curriculum: [
        {
          title: "AWS Fundamentals",
          lessons: 15,
          duration: "5h 20m",
          topics: [
            { title: "Introduction to AWS", duration: "12:30", free: true },
            { title: "AWS Console Tour", duration: "15:45", free: true },
            { title: "EC2 Basics", duration: "22:20", free: false }
          ]
        }
      ],
      requirements: [
        "Basic IT knowledge",
        "Understanding of internet basics",
        "No AWS experience needed"
      ]
    },
    "python-data-science-ml": {
      id: "python-data-science-ml",
      title: "Python for Data Science & ML",
      category: "Programming",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bfContinue2:46 PM935?w=800",
students: "28.9K",
rating: 4.9,
reviews: 2340,
hours: "35",
lessons: 105,
instructor: {
name: "Anita Verma",
title: "Data Scientist & ML Expert",
image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
students: "78K+",
courses: 9
},
description: "Master Python for data science and machine learning. Build predictive models and analyze data.",
learningPoints: [
"Python programming mastery",
"NumPy and Pandas",
"Data visualization",
"Machine learning algorithms",
"Scikit-learn library",
"Model evaluation",
"Real-world projects",
"Career in data science"
],
curriculum: [
{
title: "Python for Data Science",
lessons: 18,
duration: "6h 15m",
topics: [
{ title: "Python Basics", duration: "15:30", free: true },
{ title: "NumPy Arrays", duration: "18:45", free: true },
{ title: "Pandas DataFrames", duration: "25:20", free: false }
]
}
],
requirements: [
"Basic programming knowledge",
"High school mathematics",
"Interest in data science"
]
}
};
// Get the specific course or show 404
const course = allCourses[courseId];
if (!course) {
return (
<div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a] flex items-center justify-center px-6">
<div className="text-center">
<h1 className="text-6xl font-bold text-white mb-4">404</h1>
<p className="text-gray-400 text-xl mb-8">Course not found</p>
<button
onClick={() => navigate('/courses')}
className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#0a1525] font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
>
Back to Courses
</button>
</div>
</div>
);
}
return (
<div className="min-h-screen bg-gradient-to-br from-[#0a1525] via-[#050b14] to-[#0f1a2a]">
{/* Back Button */}
<div className="pt-24 px-6">
<button
onClick={() => navigate('/courses')}
className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
>
<ArrowLeft className="w-5 h-5" />
Back to Courses
</button>
</div>
  {/* SECTION 1: Course Details & Enrollment Card */}
  <section className="relative pb-16 px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <span className="px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-semibold">
          {course.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white my-6">{course.title}</h1>
        <p className="text-gray-400 text-lg mb-6">{course.description}</p>
        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-white font-semibold">{course.rating}</span>
            <span className="text-gray-400">({course.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Users className="w-5 h-5" />
            <span className="text-white">{course.students} students</span>
          </div>
          <div className="flex items-center gap-2 text-purple-400">
            <Clock className="w-5 h-5" />
            <span className="text-white">{course.hours}h</span>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <BookOpen className="w-5 h-5" />
            <span className="text-white">{course.lessons} lessons</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={course.instructor.image}
            alt={course.instructor.name}
            className="w-16 h-16 rounded-full border-2 border-cyan-400"
          />
          <div>
            <p className="text-white font-semibold text-lg">{course.instructor.name}</p>
            <p className="text-gray-400">{course.instructor.title}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-cyan-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-[#0a1525] ml-1" />
              </div>
            </div>
          </div>
          <p className="text-4xl font-bold text-white text-center mb-2">FREE</p>
          <p className="text-gray-400 text-center mb-6">Full lifetime access</p>
          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#0a1525] font-bold text-lg mb-4 hover:shadow-lg hover:shadow-cyan-400/50 transition-all">
            Enroll Now - It's Free!
          </button>
          <div className="space-y-3 mb-6">
            {["Lifetime access", "Certificate of completion", "Download resources", "Mobile & TV access"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-gray-300">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex-1 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Award className="w-4 h-4" />
              Gift
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* SECTION 2: Tabs Content */}
  <section className="px-6 py-12">
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto">
        {["overview", "curriculum", "instructor"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold capitalize whitespace-nowrap ${
              activeTab === tab ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {course.learningPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">{point}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-white mb-6 mt-12">Requirements</h2>
            <div className="space-y-3">
              {course.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <p className="text-gray-300">{req}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Course Curriculum</h2>
            <div className="space-y-4">
              {course.curriculum.map((module, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold">{module.title}</h3>
                        <p className="text-sm text-gray-400">{module.lessons} lessons • {module.duration}</p>
                      </div>
                    </div>
                    {expandedModule === idx ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedModule === idx && (
                    <div className="border-t border-white/10">
                      {module.topics.map((topic, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 border-b border-white/5 last:border-0">
                          <div className="flex items-center gap-3">
                            <Play className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{topic.title}</span>
                            {topic.free && (
                              <span className="px-2 py-1 rounded-full bg-green-400/20 text-green-400 text-xs font-semibold">
                                FREE
                              </span>
                            )}
                          </div>
                          <span className="text-gray-400 text-sm">{topic.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "instructor" && (
          <div>
            <div className="flex items-start gap-6 mb-8">
              <img
                src={course.instructor.image}
                alt={course.instructor.name}
                className="w-24 h-24 rounded-full border-4 border-cyan-400 flex-shrink-0"
              />
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{course.instructor.name}</h2>
                <p className="text-cyan-400 mb-4">{course.instructor.title}</p>
                <div className="flex gap-6">
                  <div>
                    <p className="text-2xl font-bold text-white">{course.instructor.students}</p>
                    <p className="text-gray-400 text-sm">Students</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{course.instructor.courses}</p>
                    <p className="text-gray-400 text-sm">Courses</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">4.9</p>
                    <p className="text-gray-400 text-sm">Rating</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {course.instructor.name} is a passionate educator with years of experience in the industry. 
              They have taught thousands of students worldwide and are dedicated to helping learners achieve their goals 
              through practical, hands-on learning experiences.
            </p>
          </div>
        )}
      </div>
    </div>
  </section>
</div>
);
}