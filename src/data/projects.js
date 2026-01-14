import samsImage from "../assets/sams.jpeg";
import augImage from "../assets/aug.png";
import dpmImage from "../assets/dpm.png";

export const projects = [
  {
    id: 1,
    slug: "smart-agriculture-monitoring",
    title: "Smart Agriculture Monitoring System",
    image: samsImage,
    tag: "ML • Microservices",
    category: "ML",                 
    year: 2025,                   
    featured: true,                
    stack: "React • Spring Boot • Python (FastAPI) • .NET • Redis",
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
    demo: null
  },

  {
    id: 2,
    slug: "digital-gold-token",
    title: "Digital Gold / AUG Token Platform",
    image: augImage,
    tag: "Blockchain • Fintech",
    category: "Blockchain",
    year: 2025,
    featured: true,
    stack: "Spring Boot • Solidity • Web3j • Polygon • Razorpay",
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
      "I learned that Blockchain engineering is mostly system architecture—balancing the immutable ledger with mutable business data. I also gained deep experience integrating enterprise Java systems with EVM-based networks.",
    github: "https://github.com/srikarthickeyanganapathy/Aug_project_backend",
    demo: null
  },

  {
    id: 3,
    slug: "decentralized-predictive-maintenance",
    title: "Decentralized Predictive Maintenance",
    image: dpmImage,
    tag: "Industrial IoT • Web3",
    category: "Full-Stack",
    year: 2024,
    featured: false,
    stack: "React • Node.js • Express • MongoDB • Solidity • Python",
    description:
      "Tamper-proof maintenance logs for industrial machinery using Blockchain as the source of truth.",
    problem:
      "Trust is a major issue in industrial maintenance. Manufacturers and customers often dispute whether a machine failure was due to defects or poor maintenance. I needed a system where maintenance logs were transparent, tamper-proof, and shared across all parties.",
    approach:
      "I built a proof-of-concept using Blockchain as the 'Source of Truth'. Machine logs were analyzed by a Python service for failure prediction, but the critical maintenance records were anchored on Ethereum. This ensured that once a record was written, no single party could alter it.",
    architecture:
      "Node.js & Express handled the API orchestration. MongoDB stored operational data for speed. Python (Flask) ran the predictive models. Solidity contracts stored the immutable hashes of maintenance logs to guarantee integrity.",
    challenges:
      "Integration was again the main hurdle—coordinating data flow between a standard Node.js backend, a Python analytics service, and the Ethereum blockchain. I also realized during development that a public blockchain isn't ideal for data privacy, highlighting the need for private chains in real enterprise use cases.",
    learned:
      "I learned how to design architectures specifically for 'Trustless' environments and gained a realistic understanding of where blockchain adds value versus where it adds unnecessary complexity.",
    github: "https://github.com/srikarthickeyanganapathy/Decentralized-Predictive-Maintenance",
    demo: null
  }
];
