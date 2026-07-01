import samsImage from "../assets/sams.jpeg";
import augImage from "../assets/aug.png";
import dpmImage from "../assets/dpm.png";

export const projects = [
  {
    id: 1,
    slug: "smart-agriculture-monitoring",
    title: "Smart Agriculture Monitoring System",
    image: samsImage,
    tag: "ML / Microservices",
    category: "ML",
    year: 2025,
    featured: true,
    stack: "React / Spring Boot / Python (FastAPI) / .NET / Redis",
    description:
      "End-to-end platform for crop disease detection, yield prediction, and recommendations using a Digital Twin approach.",
    problem:
      "The challenge was practical, not just technical. I wanted to build an ag-tech system, but lacking IoT hardware and a real field meant I had no data. Early ideas like heatmaps failed without meaningful input, risking the project becoming just another empty concept.",
    approach:
      "I shifted to a 'Digital Twin' approach. I asked: 'How can I demonstrate value without the physical infrastructure?' I built a Python-based simulation engine that modeled individual plant attributes, exposing this data via API to create a virtual field that users could monitor and analyze as if it were real.",
    architecture:
      "Designed as a Polyglot Microservices system: React for UI, Spring Boot as the orchestrator/gateway, Python for the simulation engine, and ML.NET (.NET) for high-performance crop recommendations. Redis handled caching to keep the distributed system fast.",
    challenges:
      "Integration was the hardest part. Debugging errors across Java, Python, and .NET services was complex. I had to implement end-to-end tracing to identify whether a failure was in the API gateway, the ML inference, or the data simulation.",
    learned:
      "I learned how to adapt system design when real-world constraints (no hardware) block the original plan, and how to debug distributed systems across multiple technology stacks.",
    github:
      "https://github.com/srikarthickeyanganapathy/Smart_Agriculture_Monitoring_System",
    demo: null,
  },
  {
    id: 2,
    slug: "digital-gold-token",
    title: "Digital Gold / AUG Token Platform",
    image: augImage,
    tag: "Blockchain / Fintech",
    category: "Blockchain",
    year: 2025,
    featured: true,
    stack: "Spring Boot / Solidity / Web3j / Polygon / Razorpay",
    description:
      "A secure, transparent platform for minting and managing digital gold tokens backed by real-world assets.",
    problem:
      "This was a business-critical project requiring a secure system for minting and managing digital gold tokens. The core requirement was trust: ensuring that every digital token was backed by accurate records and that transactions remained affordable despite blockchain gas fees.",
    approach:
      "I focused on a 'Backend-First' blockchain integration. Instead of relying solely on client-side wallets, I built a robust Spring Boot backend that managed user accounts and communicated securely with the Polygon blockchain using Web3j. I implemented a FIFO redemption logic to ensure accurate asset tracking.",
    architecture:
      "Solidity smart contracts on Polygon handled the ledger. Spring Boot managed the business logic and fiat integration via Razorpay. Web3j acted as the bridge, allowing the Java backend to sign and execute blockchain transactions programmatically.",
    challenges:
      "Implementing the FIFO (First-In-First-Out) redemption logic for assets was complex to sync between a SQL database and the blockchain. Additionally, early gas costs were too high, forcing me to optimize the smart contract code to reduce transaction fees.",
    learned:
      "I learned that Blockchain engineering is mostly system architecture - balancing the immutable ledger with mutable business data. I also gained deep experience integrating enterprise Java systems with EVM-based networks.",
    github: "https://github.com/srikarthickeyanganapathy/Aug_project_backend",
    demo: null,
  },
  {
    id: 3,
    slug: "decentralized-predictive-maintenance",
    title: "Decentralized Predictive Maintenance",
    image: dpmImage,
    tag: "Industrial IoT / Web3",
    category: "Full-Stack",
    year: 2024,
    featured: false,
    stack: "React / Node.js / Express / MongoDB / Solidity / Python",
    description:
      "Tamper-proof maintenance logs for industrial machinery using Blockchain as the source of truth.",
    problem:
      "Trust is a major issue in industrial maintenance. Manufacturers and customers often dispute whether a machine failure was due to defects or poor maintenance. I needed a system where maintenance logs were transparent, tamper-proof, and shared across all parties.",
    approach:
      "I built a proof-of-concept using Blockchain as the 'Source of Truth'. Machine logs were analyzed by a Python service for failure prediction, but the critical maintenance records were anchored on Ethereum. This ensured that once a record was written, no single party could alter it.",
    architecture:
      "Node.js & Express handled the API orchestration. MongoDB stored operational data for speed. Python (Flask) ran the predictive models. Solidity contracts stored the immutable hashes of maintenance logs to guarantee integrity.",
    challenges:
      "Integration was again the main hurdle - coordinating data flow between a standard Node.js backend, a Python analytics service, and the Ethereum blockchain. I also realized during development that a public blockchain isn't ideal for data privacy, highlighting the need for private chains in real enterprise use cases.",
    learned:
      "I learned how to design architectures specifically for 'Trustless' environments and gained a realistic understanding of where blockchain adds value versus where it adds unnecessary complexity.",
    github: "https://github.com/srikarthickeyanganapathy/Decentralized-Predictive-Maintenance",
  },
  {
    id: 4,
    slug: "rgb-hyperspectral-conversion",
    title: "RGB to Hyperspectral Image Conversion",
    image: null,
    tag: "Deep Learning / CV",
    category: "ML",
    year: 2024,
    featured: true,
    stack: "Python / PyTorch / OpenCV / XGBoost",
    description:
      "Physics-grounded pipeline to convert standard RGB images into Hyperspectral Data Cubes for crop disease detection.",
    problem:
      "Traditional crop health analysis requires expensive hyperspectral cameras. I wanted to see if we could extract scientific-grade spectral data from standard 3-band RGB images to make advanced agricultural analytics accessible to anyone with a smartphone.",
    approach:
      "I built a Conditional GAN architecture with a physics-aware loss function (L1 + Spectral Angle Mapper + Vegetation Indices). It uses a ResNet Generator and PatchGAN Discriminator to hallucinate 224 spectral bands from just R, G, and B channels.",
    architecture:
      "The system uses a PyTorch-based GAN for Spectral Super-Resolution. After reconstruction, a Dual-Stream CNN with SE-attention detects diseases by analyzing both spatial and spectral branches. XGBoost is used downstream for crop classification.",
    challenges:
      "Preventing the model from 'hallucinating' health in diseased leaves was tough. I solved this by injecting synthetic disease patterns during training and enforcing a strict physics-based loss that penalizes deviation in known vegetation indices.",
    learned:
      "I learned how to enforce physical constraints on generative models, preventing them from just generating 'pretty' but inaccurate data. This was a deep dive into PyTorch custom loss functions.",
    github: "https://github.com/srikarthickeyanganapathy/RGB-HyperspectralImage-Conversion",
    demo: null,
  },
  {
    id: 5,
    slug: "taskflow-management",
    title: "TaskFlow Management System",
    image: null,
    tag: "Productivity / RBAC",
    category: "Full-Stack",
    year: 2024,
    featured: false,
    stack: "React / Vite / Tailwind / Spring Boot / PostgreSQL",
    description:
      "A role-based task management system with authentication and dynamic task assignments.",
    problem:
      "I needed a clean, scalable way to manage tasks across different user roles (Admin, Manager, Employee) without tangling the frontend UI logic with backend security rules.",
    approach:
      "I built a strict Role-Based Access Control (RBAC) system in Spring Boot using Spring Security and JWTs. The React frontend consumes these tokens to dynamically render UI elements based on the authenticated user's permissions.",
    architecture:
      "React/Vite frontend with Tailwind CSS for styling. Spring Boot backend providing REST APIs secured with JWT. PostgreSQL for relational data storage, heavily utilizing Spring Data JPA for task relations.",
    challenges:
      "Handling JWT expiration and seamless token refreshes on the frontend without interrupting the user experience took several iterations to get right.",
    learned:
      "I solidified my understanding of Spring Security filter chains and how to properly structure a React app to consume secure APIs seamlessly.",
    github: "https://github.com/srikarthickeyanganapathy/TaskManagement",
    demo: null,
  },
  {
    id: 6,
    slug: "rydo-cab-booking",
    title: "RyDo Cab Booking",
    image: null,
    tag: "Web App / Transport",
    category: "Full-Stack",
    year: 2023,
    featured: false,
    stack: "React / Spring Boot / Java / SQL",
    description:
      "A cab booking system integrating a robust Spring Boot backend with a responsive React frontend.",
    problem:
      "Building a reliable booking system requires handling concurrent requests and ensuring that a single cab cannot be double-booked by different users at the exact same time.",
    approach:
      "I implemented transactional boundaries in the Spring Boot backend to lock rows during the booking process, ensuring data consistency even under concurrent load.",
    architecture:
      "Standard 3-tier architecture: React frontend, Spring Boot service layer, and a relational database (SQL) for persistence. REST APIs handle all client-server communication.",
    challenges:
      "Managing complex state in React for the multi-step booking process (location selection, cab type, confirmation) was tricky before I refactored to use a centralized context.",
    learned:
      "I learned the importance of database transactions and how to handle race conditions in booking systems.",
    github: "https://github.com/srikarthickeyanganapathy/RyDo",
    demo: null,
  },
  {
    id: 7,
    slug: "faststream-mobile",
    title: "FastStream Mobile",
    image: null,
    tag: "Browser Extension",
    category: "Tools",
    year: 2024,
    featured: false,
    stack: "JavaScript / WebExtensions API / HTML5",
    description:
      "A high-performance browser extension optimizing video streaming on mobile browsers.",
    problem:
      "Mobile streaming on browsers like Firefox for Android or Kiwi can be laggy and poorly optimized compared to native apps. I wanted native-like playback performance within the browser.",
    approach:
      "I built a Manifest V3 extension that intercepts video streams using the declarativeNetRequest API and injects a custom, lightweight HTML5 player optimized for mobile touch controls.",
    architecture:
      "Uses background service workers for request interception and content scripts for injecting the custom player UI into the DOM.",
    challenges:
      "Navigating the restrictions of Manifest V3, particularly the limitations on background scripts and request modification, required careful architectural planning.",
    learned:
      "I learned the intricacies of the modern WebExtensions API, specifically around Manifest V3 security and performance requirements.",
    github: "https://github.com/srikarthickeyanganapathy/FastStream_Mobile",
    demo: null,
  }
];