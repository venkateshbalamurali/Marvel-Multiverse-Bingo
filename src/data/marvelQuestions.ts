import { MarvelQuestion, DimensionName, DifficultyConfig, DifficultyLevel } from '../types/bingo.js';
import { NON_TECH_QUESTIONS } from './questions/nonTech.js';
import { TECH_MEDIUM_QUESTIONS } from './questions/techMedium.js';

export interface DimensionConfig {
  name: DimensionName;
  color: string;
  letter: string;
  description: string;
}

export const DIMENSIONS: DimensionConfig[] = [
  {
    name: 'AI HEROES',
    color: '#06b6d4',
    letter: 'B',
    description: 'Generative AI, Agentic Systems, Machine Learning & LLM Architectures'
  },
  {
    name: 'PROGRAMMING',
    color: '#3b82f6',
    letter: 'I',
    description: 'Python, SQL, REST APIs, Git Version Control & Unit Testing'
  },
  {
    name: 'CLOUD',
    color: '#8b5cf6',
    letter: 'N',
    description: 'Kubernetes, Docker, CI/CD Pipelines, Terraform & Cloud Platforms'
  },
  {
    name: 'ANALYTICS',
    color: '#10b981',
    letter: 'G',
    description: 'Tableau, KPIs, A/B Testing, Churn Modeling & Business Intelligence'
  },
  {
    name: 'EMERGING TECH',
    color: '#f59e0b',
    letter: 'O',
    description: 'IoT Networks, Quantum Computing, Blockchain & Intelligent Automation'
  }
];

export const MARVEL_TECH_QUESTIONS: MarvelQuestion[] = [
  {
    "id": "ai-01",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What practice optimizes text inputs to accurately guide generative AI models?",
    "answer": "Prompt Engineering",
    "explanation": "Prompt Engineering optimizes inputs to guide generative AI outputs with high accuracy."
  },
  {
    "id": "ai-02",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What discipline crafts precise prompt templates to elicit optimal LLM responses?",
    "answer": "Prompt Engineering",
    "explanation": "Prompt Engineering structures targeted templates for optimal LLM generation."
  },
  {
    "id": "ai-03",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What autonomous AI class breaks down complex goals and independently executes external software tools?",
    "answer": "Agentic AI",
    "explanation": "Agentic AI independently plans and invokes tools to achieve designated objectives."
  },
  {
    "id": "ai-04",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What advanced AI framework evaluates context and takes independent actions to achieve objectives?",
    "answer": "Agentic AI",
    "explanation": "Agentic AI leverages context evaluation to autonomously execute multi-step workflows."
  },
  {
    "id": "ai-05",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What computer science branch trains algorithms to recognize statistical patterns without explicit programming?",
    "answer": "Machine Learning",
    "explanation": "Machine Learning enables algorithmic pattern detection from empirical training data."
  },
  {
    "id": "ai-06",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What technology enables software systems to optimize parameters automatically from observational data?",
    "answer": "Machine Learning",
    "explanation": "Machine Learning dynamically refines model weights through observational inputs."
  },
  {
    "id": "ai-07",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What AI subset mimics human brains using multi-layered neural networks for pattern recognition?",
    "answer": "Deep Learning",
    "explanation": "Deep Learning uses stacked neural layers to capture hierarchical data features."
  },
  {
    "id": "ai-08",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What machine learning discipline uses deep neural network architectures for complex image analysis?",
    "answer": "Deep Learning",
    "explanation": "Deep Learning architectures like CNNs and Vision Transformers excel in visual classification."
  },
  {
    "id": "ai-09",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What computational discipline enables systems to analyze, interpret, and generate human written language?",
    "answer": "NLP",
    "explanation": "Natural Language Processing bridges computational linguistics and linguistic generation."
  },
  {
    "id": "ai-10",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What AI subfield bridges human language and machine logic for sentiment analysis?",
    "answer": "NLP",
    "explanation": "NLP enables semantic and sentiment extraction from human language corpora."
  },
  {
    "id": "ai-11",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What specialized storage engine indexes high-dimensional mathematical coordinates for rapid semantic searches?",
    "answer": "Vector Database",
    "explanation": "Vector databases index high-dimensional embeddings for fast approximate nearest-neighbor search."
  },
  {
    "id": "ai-12",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What data management system is purpose-built to store and query dense embeddings for AI?",
    "answer": "Vector Database",
    "explanation": "Vector databases are optimized to store, index, and query dense vector embeddings."
  },
  {
    "id": "ai-13",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What framework prevents AI hallucinations by retrieving external factual documents to augment prompts?",
    "answer": "RAG",
    "explanation": "Retrieval-Augmented Generation grounds LLM responses with factual retrieved context."
  },
  {
    "id": "ai-14",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What architecture fetches up-to-date enterprise knowledge from a vector database during AI inference?",
    "answer": "RAG",
    "explanation": "RAG retrieves contextual documents during inference to provide real-time accuracy."
  },
  {
    "id": "ai-15",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What massive transformer neural network is trained on vast text corpora to generate language?",
    "answer": "LLM",
    "explanation": "Large Language Models are massive pre-trained transformer architectures for text understanding and generation."
  },
  {
    "id": "ai-16",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What foundational deep learning model uses self-attention mechanisms to power conversational generative AI?",
    "answer": "LLM",
    "explanation": "LLMs utilize self-attention mechanisms to model long-range text dependencies."
  },
  {
    "id": "ai-17",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What autonomous software entity combines LLMs with function calling to execute digital workflows?",
    "answer": "AI Agent",
    "explanation": "An AI Agent coordinates language reasoning with function calling to complete tasks."
  },
  {
    "id": "ai-18",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What autonomous assistant perceives user intent, makes sequential decisions, and interacts with web APIs?",
    "answer": "AI Agent",
    "explanation": "AI Agents perceive intent, formulate action sequences, and communicate with external APIs."
  },
  {
    "id": "ai-19",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What algorithmic system uses collaborative filtering and behavioral data to suggest personalized content?",
    "answer": "Recommendation Engine",
    "explanation": "Recommendation engines model user-item interactions to curate personalized feeds."
  },
  {
    "id": "ai-20",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What machine learning system analyzes purchase records and attributes to predict user preferences?",
    "answer": "Recommendation Engine",
    "explanation": "Recommendation engines identify consumer affinity patterns from purchase and view histories."
  },
  {
    "id": "ai-21",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What AI field uses algorithms to extract structural insights and classify digital imagery?",
    "answer": "Computer Vision",
    "explanation": "Computer Vision enables machines to interpret and categorize visual information."
  },
  {
    "id": "ai-22",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What technology enables automated systems to detect faces and process real-time video streams?",
    "answer": "Computer Vision",
    "explanation": "Computer Vision powers real-time facial recognition and video object tracking."
  },
  {
    "id": "ai-23",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What statistical discipline uses historical datasets and machine learning to accurately forecast trends?",
    "answer": "Predictive Analytics",
    "explanation": "Predictive Analytics models historical data trends to forecast upcoming events."
  },
  {
    "id": "ai-24",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What methodology models past data using regression techniques to anticipate customer churn accurately?",
    "answer": "Predictive Analytics",
    "explanation": "Predictive Analytics applies statistical regressions to quantify churn probabilities."
  },
  {
    "id": "ai-25",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What governance framework enforces bias mitigation, data privacy, and explainability for ethical algorithms?",
    "answer": "Responsible AI",
    "explanation": "Responsible AI enforces ethical standards, fairness, transparency, and safety in AI deployment."
  },
  {
    "id": "ai-26",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What operational practice establishes technical safeguards so AI systems operate fairly and transparently?",
    "answer": "Responsible AI",
    "explanation": "Responsible AI operationalizes fairness, accountability, and safety benchmarks across AI pipelines."
  },
  {
    "id": "ai-27",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What conversational software application automates customer service by managing real-time digital dialogue flows?",
    "answer": "Chatbot",
    "explanation": "Chatbots automate customer engagement through natural language conversational flows."
  },
  {
    "id": "ai-28",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What digital interface utilizes conversational AI and dialog management to provide automated text responses?",
    "answer": "Chatbot",
    "explanation": "Chatbots use dialog state tracking and conversational models to handle user queries."
  },
  {
    "id": "ai-29",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What AI branch uses architectures like diffusion models to create brand-new synthetic media?",
    "answer": "Generative AI",
    "explanation": "Generative AI produces novel text, imagery, and audio via generative models."
  },
  {
    "id": "ai-30",
    "dimension": "AI HEROES",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What cutting-edge AI paradigm generates original statistical media samples by learning data distributions?",
    "answer": "Generative AI",
    "explanation": "Generative AI models the underlying distribution of training data to generate fresh synthetic samples."
  },
  {
    "id": "prog-01",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What industry-standard declarative language uses commands like SELECT to query and manage relational database tables?",
    "answer": "SQL",
    "explanation": "SQL is the standard language for querying, updating, and managing relational databases."
  },
  {
    "id": "prog-02",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What domain-specific language is universally used for querying, defining, and manipulating structured data?",
    "answer": "SQL",
    "explanation": "SQL provides standardized syntax for interacting with structured tabular data."
  },
  {
    "id": "prog-03",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What standard database language manages relational database schemas using Data Definition and Data Manipulation commands?",
    "answer": "SQL",
    "explanation": "SQL encompasses DDL and DML operations for complete database lifecycle control."
  },
  {
    "id": "prog-04",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What interactive web application format combines executable Python code cells, visualizations, and markdown text?",
    "answer": "Jupyter Notebook",
    "explanation": "Jupyter Notebooks merge live executable code, equations, and visual plots in a single document."
  },
  {
    "id": "prog-05",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What open-source computing environment enables data analysts to run Python code iteratively and inspect inline charts?",
    "answer": "Jupyter Notebook",
    "explanation": "Jupyter provides an interactive computing environment ideal for iterative data exploration."
  },
  {
    "id": "prog-06",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What popular data science document format facilitates rapid prototyping by combining executable code blocks with text?",
    "answer": "Jupyter Notebook",
    "explanation": "Jupyter facilitates rapid research through executable blocks accompanied by rich markdown."
  },
  {
    "id": "prog-07",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What automated quality assurance practice executes assertions to validate that isolated code components operate correctly?",
    "answer": "Unit Testing",
    "explanation": "Unit testing verifies the functional correctness of isolated software routines."
  },
  {
    "id": "prog-08",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What fundamental software testing technique evaluates isolated code components independently to catch logic bugs early?",
    "answer": "Unit Testing",
    "explanation": "Unit testing isolates code modules to detect logic defects at an early development stage."
  },
  {
    "id": "prog-09",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What developer testing practice utilizes specialized test frameworks to verify that small software units execute accurately?",
    "answer": "Unit Testing",
    "explanation": "Unit testing frameworks (like PyTest or JUnit) automate validation of discrete functions."
  },
  {
    "id": "prog-10",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What versatile, dynamically typed programming language uses highly readable syntax for data science and AI?",
    "answer": "Python",
    "explanation": "Python is the preeminent language for AI and data science due to its clean syntax and rich ecosystem."
  },
  {
    "id": "prog-11",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What high-level, interpreted programming language is globally celebrated for its clean syntax and machine learning dominance?",
    "answer": "Python",
    "explanation": "Python dominates machine learning research with frameworks like PyTorch and TensorFlow."
  },
  {
    "id": "prog-12",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What multi-paradigm programming language serves as the primary standard for artificial intelligence research and data engineering?",
    "answer": "Python",
    "explanation": "Python serves as the backbone language for modern AI pipelines and scientific computing."
  },
  {
    "id": "prog-13",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What distributed version control system tracks source code modifications and enables collaborative developer commits?",
    "answer": "Git",
    "explanation": "Git tracks decentralized code changes and enables distributed branch collaboration."
  },
  {
    "id": "prog-14",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What essential source code management tool records commit histories, facilitates feature branching, and allows repository rollbacks?",
    "answer": "Git",
    "explanation": "Git maintains complete commit histories, allowing flexible branch management and state rollbacks."
  },
  {
    "id": "prog-15",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What version control standard provides localized commit tracking and conflict resolution mechanisms for collaborative software engineering?",
    "answer": "Git",
    "explanation": "Git enables local commit staging and robust three-way merge conflict resolution."
  },
  {
    "id": "prog-16",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What robust, object-oriented enterprise language compiles to bytecode and adheres to the write-once run-anywhere paradigm?",
    "answer": "Java",
    "explanation": "Java compiles to JVM bytecode, guaranteeing platform-independent execution across architectures."
  },
  {
    "id": "prog-17",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What strongly typed programming language executes reliably across platform-independent virtual machines, powering scalable backend microservices?",
    "answer": "Java",
    "explanation": "Java powers large-scale enterprise services with static type safety and high-performance JVM runtimes."
  },
  {
    "id": "prog-18",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What battle-tested backend language features strong type checking and massive enterprise framework support for corporate infrastructure?",
    "answer": "Java",
    "explanation": "Java supports extensive enterprise frameworks like Spring Boot for resilient microservices."
  },
  {
    "id": "prog-19",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What core software engineering process uses breakpoints and stack traces to systematically fix runtime errors?",
    "answer": "Debugging",
    "explanation": "Debugging systematically diagnoses errors using breakpoints, profilers, and call stack analysis."
  },
  {
    "id": "prog-20",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What essential troubleshooting practice analyzes code execution and uses diagnostic tools to pinpoint software logic flaws?",
    "answer": "Debugging",
    "explanation": "Debugging investigates execution behavior to identify and resolve logic anomalies."
  },
  {
    "id": "prog-21",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What core software engineering process uses breakpoints and stack traces to systematically fix runtime errors?",
    "answer": "Debugging",
    "explanation": "Debugging isolates fault origins using interactive inspections and execution tracing."
  },
  {
    "id": "prog-22",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What architectural web service style transfers JSON data payloads statelessly using standard HTTP verbs?",
    "answer": "REST API",
    "explanation": "REST APIs use standard HTTP verbs (GET, POST, PUT, DELETE) for stateless client-server interactions."
  },
  {
    "id": "prog-23",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What widely adopted API design convention exchanges lightweight resource representations statelessly between client applications and backend servers?",
    "answer": "REST API",
    "explanation": "RESTful design utilizes standard URI paths and HTTP status codes for resource exchanges."
  },
  {
    "id": "prog-24",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What architectural web service style transfers JSON data payloads statelessly using standard HTTP verbs?",
    "answer": "REST API",
    "explanation": "REST architecture decouples clients and servers using uniform stateless communication."
  },
  {
    "id": "prog-25",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What defined software contract establishes the rules and endpoints allowing two distinct applications to communicate?",
    "answer": "API",
    "explanation": "Application Programming Interfaces define the communication contracts between software components."
  },
  {
    "id": "prog-26",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What software interface specifies exact communication schemas to expose operational services across microservices or third-party systems?",
    "answer": "API",
    "explanation": "APIs expose structured operations and data formats for modular inter-system integration."
  },
  {
    "id": "prog-27",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What premier cloud platform hosts Git repositories, enabling open-source code collaboration and automated CI/CD pipelines?",
    "answer": "GitHub",
    "explanation": "GitHub is the world leader in hosting Git repositories and automated developer workflows."
  },
  {
    "id": "prog-28",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What web-based repository platform provides centralized code hosting, automated action workflows, and developer team management?",
    "answer": "GitHub",
    "explanation": "GitHub provides repository hosting, code review via pull requests, and GitHub Actions CI/CD."
  },
  {
    "id": "prog-29",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What modern, blazing-fast Python web framework leverages ASGI to build high-performance asynchronous microservices?",
    "answer": "FastAPI",
    "explanation": "FastAPI uses Starlette and Pydantic to deliver high-concurrency asynchronous Python endpoints."
  },
  {
    "id": "prog-30",
    "dimension": "PROGRAMMING",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What high-performance Python web framework is engineered for building asynchronous RESTful APIs rapidly using standard type hints?",
    "answer": "FastAPI",
    "explanation": "FastAPI generates automatic OpenAPI documentation and validates data schemas using standard Python type hints."
  },
  {
    "id": "cloud-01",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What DevOps practice automates code integration, unit testing, and deployment to deliver software frequently?",
    "answer": "CI/CD",
    "explanation": "Continuous Integration / Continuous Delivery automates building, testing, and shipping code."
  },
  {
    "id": "cloud-02",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What automated pipeline strategy automatically compiles code commits and deploys verified releases into production?",
    "answer": "CI/CD",
    "explanation": "CI/CD pipelines automate release validation and deployment gates for zero-downtime shipping."
  },
  {
    "id": "cloud-03",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What deployment automation framework combines continuous integration with continuous delivery to launch code seamlessly?",
    "answer": "CI/CD",
    "explanation": "CI/CD merges continuous integration checks with automated delivery pipelines."
  },
  {
    "id": "cloud-04",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What operational culture unifies software engineering and IT administration to accelerate deployment velocity?",
    "answer": "DevOps",
    "explanation": "DevOps bridges development and operations to improve deployment frequency and service reliability."
  },
  {
    "id": "cloud-05",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What collaborative philosophy breaks down traditional silos between developers and administrators using automation?",
    "answer": "DevOps",
    "explanation": "DevOps dissolves departmental silos through shared automation and continuous feedback."
  },
  {
    "id": "cloud-06",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What engineering framework emphasizes continuous feedback loops, automated deployment pipelines, and shared operational accountability?",
    "answer": "DevOps",
    "explanation": "DevOps fosters cross-functional accountability throughout the software delivery lifecycle."
  },
  {
    "id": "cloud-07",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What virtualization method bundles application code into an isolated, lightweight unit running consistently anywhere?",
    "answer": "Containerization",
    "explanation": "Containerization packages runtime binaries and dependencies into lightweight portable images."
  },
  {
    "id": "cloud-08",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What packaging approach encapsulates software inside portable execution units sharing the host OS kernel?",
    "answer": "Containerization",
    "explanation": "Containers share the host operating system kernel for minimal overhead and rapid startup."
  },
  {
    "id": "cloud-09",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What technology isolates running software processes into self-contained units for frictionless cloud portability?",
    "answer": "Containerization",
    "explanation": "Containerization guarantees consistent environment execution across local dev and cloud clusters."
  },
  {
    "id": "cloud-10",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What open-source orchestration engine automates the deployment and management of massive containerized application clusters?",
    "answer": "Kubernetes",
    "explanation": "Kubernetes automates container scheduling, scaling, and operational management across node clusters."
  },
  {
    "id": "cloud-11",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What container management platform organizes applications into pods, handling automated rollouts and service discovery?",
    "answer": "Kubernetes",
    "explanation": "Kubernetes groups containers into pods with automated health checking, self-healing, and load balancing."
  },
  {
    "id": "cloud-12",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What industry-standard cloud-native framework orchestrates large-scale Docker deployments and manages network traffic routing?",
    "answer": "Kubernetes",
    "explanation": "Kubernetes acts as the de facto control plane for cloud-native containerized applications."
  },
  {
    "id": "cloud-13",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What Infrastructure as Code tool enables developers to securely provision resources using configuration files?",
    "answer": "Terraform",
    "explanation": "Terraform enables declarative infrastructure management across multi-cloud environments."
  },
  {
    "id": "cloud-14",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What declarative infrastructure software automates the creation of cloud resources using version-controlled code?",
    "answer": "Terraform",
    "explanation": "Terraform provisions cloud infrastructure declaratively using HashiCorp Configuration Language (HCL)."
  },
  {
    "id": "cloud-15",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What IaC platform tracks cloud resource state files programmatically, allowing dev teams to review changes?",
    "answer": "Terraform",
    "explanation": "Terraform tracks state mappings to compute execution plans and review infrastructure drifts."
  },
  {
    "id": "cloud-16",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What open-source platform packages microservices into lightweight, portable container images for uniform execution?",
    "answer": "Docker",
    "explanation": "Docker standardizes application image builds and runtime container isolation."
  },
  {
    "id": "cloud-17",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What software container engine uses OS-level process isolation to simplify cloud application deployment pipelines?",
    "answer": "Docker",
    "explanation": "Docker provides simple command-line tools and engine daemon for building and running containers."
  },
  {
    "id": "cloud-18",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What developer tool builds portable container images using simple configuration files for rapid microservice testing?",
    "answer": "Docker",
    "explanation": "Docker builds reusable images via Dockerfile declarations for uniform local and cloud testing."
  },
  {
    "id": "cloud-19",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What major public cloud platform features managed Kubernetes Engine, Vertex AI, and BigQuery warehousing?",
    "answer": "GCP",
    "explanation": "Google Cloud Platform delivers Google Kubernetes Engine (GKE), Vertex AI, and BigQuery analytics."
  },
  {
    "id": "cloud-20",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What cloud service provider offers enterprise infrastructure, global low-latency networking, and machine learning APIs?",
    "answer": "GCP",
    "explanation": "Google Cloud Platform leverages Google private fiber backbone and enterprise AI infrastructure."
  },
  {
    "id": "cloud-21",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What major public cloud platform features managed Kubernetes Engine, Vertex AI, and BigQuery warehousing?",
    "answer": "GCP",
    "explanation": "GCP provides scalable data lakehouse architectures and managed AI model registries."
  },
  {
    "id": "cloud-22",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What scalable technology model delivers virtualized servers, storage, and databases over the internet on-demand?",
    "answer": "Cloud Computing",
    "explanation": "Cloud computing provides on-demand compute, storage, and network capacity without physical servers."
  },
  {
    "id": "cloud-23",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What computing paradigm delivers on-demand IT resources over the internet with flexible pay-as-you-go pricing?",
    "answer": "Cloud Computing",
    "explanation": "Cloud computing enables dynamic resource consumption with pay-as-you-go cost models."
  },
  {
    "id": "cloud-24",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What technology model provides virtualized processing power and hosted storage buckets accessible globally over networks?",
    "answer": "Cloud Computing",
    "explanation": "Cloud computing democratizes globally distributed compute nodes and storage tiers."
  },
  {
    "id": "cloud-25",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What Microsoft public cloud platform provides enterprise virtual machines tightly integrated with Active Directory?",
    "answer": "Azure",
    "explanation": "Microsoft Azure integrates deeply with Windows Server, Active Directory, and enterprise IT stacks."
  },
  {
    "id": "cloud-26",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What corporate cloud ecosystem provides extensive virtual networking, identity management, and hosted developer services?",
    "answer": "Azure",
    "explanation": "Azure offers enterprise cloud governance, Azure OpenAI Service, and Entra ID identity."
  },
  {
    "id": "cloud-27",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What global public cloud platform hosts deployment pipelines and AI cloud services for hybrid architectures?",
    "answer": "Azure",
    "explanation": "Azure Arc and Azure DevOps empower hybrid and multi-cloud enterprise deployments."
  },
  {
    "id": "cloud-28",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What market-leading global cloud platform provides over two hundred services including EC2 and Lambda?",
    "answer": "AWS",
    "explanation": "Amazon Web Services pioneered elastic compute (EC2) and serverless execution (Lambda)."
  },
  {
    "id": "cloud-29",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What cloud provider pioneered public computing by delivering elastic compute scaling and managed database clusters?",
    "answer": "AWS",
    "explanation": "AWS launched modern cloud computing in 2006 with S3 and EC2 on-demand services."
  },
  {
    "id": "cloud-30",
    "dimension": "CLOUD",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What market-leading global cloud platform provides over two hundred services including EC2 and Lambda?",
    "answer": "AWS",
    "explanation": "AWS offers the broadest catalog of managed cloud compute, database, and analytics services."
  },
  {
    "id": "data-01",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What quantifiable performance metric is strategically tracked to evaluate progress toward critical goals?",
    "answer": "KPI",
    "explanation": "Key Performance Indicators evaluate strategic effectiveness against targeted objectives."
  },
  {
    "id": "data-02",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What standardized business metric monitors essential operational outcomes to determine project milestone achievement?",
    "answer": "KPI",
    "explanation": "KPIs benchmark operational performance and track milestones quantitatively."
  },
  {
    "id": "data-03",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What strategic measurement provides data visibility into team performance and aligns corporate targets?",
    "answer": "KPI",
    "explanation": "KPIs align corporate outcomes and provide transparent progress visibility across organizations."
  },
  {
    "id": "data-04",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What randomized experiment splits user traffic evenly to compare distinct versions of a product?",
    "answer": "A/B Testing",
    "explanation": "A/B testing splits traffic to measure statistical variation between two distinct product versions."
  },
  {
    "id": "data-05",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What controlled statistical methodology presents two variants to separate user segments for performance comparison?",
    "answer": "A/B Testing",
    "explanation": "A/B testing runs controlled hypothesis evaluations to identify the highest-converting variant."
  },
  {
    "id": "data-06",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What online experimental design tests user response to interface variations to validate product changes?",
    "answer": "A/B Testing",
    "explanation": "A/B experiments provide empirical validation for UX changes and feature rollouts."
  },
  {
    "id": "data-07",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What popular business intelligence software allows analysts to build drag-and-drop interactive visual dashboards?",
    "answer": "Tableau",
    "explanation": "Tableau enables interactive visual discovery and dashboard publishing via intuitive drag-and-drop."
  },
  {
    "id": "data-08",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What analytics platform connects directly to databases to transform raw data into graphical charts?",
    "answer": "Tableau",
    "explanation": "Tableau connects to live data warehouses to produce dynamic visualizations."
  },
  {
    "id": "data-09",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What visual reporting application enables leaders to explore metrics and automate visual data distribution?",
    "answer": "Tableau",
    "explanation": "Tableau provides enterprise report scheduling and self-service visual exploration."
  },
  {
    "id": "data-10",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What financial analytics metric estimates the cumulative net revenue expected from a customer relationship?",
    "answer": "CLV",
    "explanation": "Customer Lifetime Value forecasts the total net monetary value a customer generates over time."
  },
  {
    "id": "data-11",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What customer intelligence metric calculates the long-term monetary value of an individual subscriber account?",
    "answer": "CLV",
    "explanation": "CLV quantifies subscriber monetization potential to inform acquisition budgeting."
  },
  {
    "id": "data-12",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What strategic business measurement balances customer acquisition costs against long-term subscription retention?",
    "answer": "CLV",
    "explanation": "The CLV-to-CAC ratio benchmarks the sustainability of customer growth campaigns."
  },
  {
    "id": "data-13",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What graphical discipline transforms raw numerical tables into visual diagrams to spot trends?",
    "answer": "Data Visualization",
    "explanation": "Data Visualization turns complex numerical records into intuitive charts and patterns."
  },
  {
    "id": "data-14",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What analytical practice represents quantitative metrics graphically through heatmaps to highlight statistical trends?",
    "answer": "Data Visualization",
    "explanation": "Data Visualization uses visual encodings like heatmaps to highlight outliers and clusters."
  },
  {
    "id": "data-15",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What visual communication field structures quantitative information using color encodings to render data readable?",
    "answer": "Data Visualization",
    "explanation": "Data Visualization structures raw metrics with purposeful color and spatial hierarchy."
  },
  {
    "id": "data-16",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What methodology combines structured data analytics, visual charts, and narrative to explain performance?",
    "answer": "Data Storytelling",
    "explanation": "Data Storytelling blends analytical findings, visual context, and narrative structure for decision-makers."
  },
  {
    "id": "data-17",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What communication practice bridges raw data analysis and strategic decision-making through actionable stories?",
    "answer": "Data Storytelling",
    "explanation": "Data Storytelling translates mathematical insights into compelling strategic action points."
  },
  {
    "id": "data-18",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What technique synthesizes complex quantitative findings into an accessible narrative to explain trend causes?",
    "answer": "Data Storytelling",
    "explanation": "Data Storytelling communicates why trends occur through structured narrative exposition."
  },
  {
    "id": "data-19",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What centralized visual interface aggregates key performance indicators and live charts on one screen?",
    "answer": "Dashboard",
    "explanation": "Dashboards aggregate operational telemetry and KPIs into an at-a-glance monitoring screen."
  },
  {
    "id": "data-20",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What real-time analytics console consolidates diverse database reports into unified graphical widgets?",
    "answer": "Dashboard",
    "explanation": "Dashboards consolidate disparate data pipelines into cohesive visual widgets."
  },
  {
    "id": "data-21",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What visual monitoring screen displays critical enterprise metrics and line graphs for management overview?",
    "answer": "Dashboard",
    "explanation": "Dashboards give executive stakeholders immediate visibility into core operational metrics."
  },
  {
    "id": "data-22",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What predictive analytics process evaluates customer departure data to identify reasons for subscription cancellations?",
    "answer": "Churn Analysis",
    "explanation": "Churn Analysis uncovers early behavioral indicators of customer attrition."
  },
  {
    "id": "data-23",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What retention methodology investigates historical attrition signals to build models proactively retaining subscriber accounts?",
    "answer": "Churn Analysis",
    "explanation": "Churn modeling predicts attrition risk to trigger proactive customer retention workflows."
  },
  {
    "id": "data-24",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What analytical procedure tracks customer departure trends to calculate attrition rates and improve retention?",
    "answer": "Churn Analysis",
    "explanation": "Churn Analysis calculates exit rates and guides customer lifecycle retention strategies."
  },
  {
    "id": "data-25",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What data process uses clustering algorithms to divide a user base into distinct personas?",
    "answer": "Customer Segmentation",
    "explanation": "Customer Segmentation groups users into homogenous clusters based on behavioral traits."
  },
  {
    "id": "data-26",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What marketing analytics practice divides a heterogeneous customer base into subgroups based on demographics?",
    "answer": "Customer Segmentation",
    "explanation": "Customer Segmentation partitions audiences for targeted personalization and campaigns."
  },
  {
    "id": "data-27",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What strategic grouping technique analyzes behavioral records to divide clients into optimized pricing cohorts?",
    "answer": "Customer Segmentation",
    "explanation": "Customer Segmentation tailors product packaging and pricing tiers to specific client cohorts."
  },
  {
    "id": "data-28",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What Microsoft enterprise application enables teams to model data relationships and publish interactive reports?",
    "answer": "Power BI",
    "explanation": "Microsoft Power BI delivers semantic data modeling, DAX queries, and interactive reporting."
  },
  {
    "id": "data-29",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What enterprise reporting software integrates with corporate databases to create interactive visual charts?",
    "answer": "Power BI",
    "explanation": "Power BI connects to cloud and on-premise relational stores to publish interactive dashboards."
  },
  {
    "id": "data-30",
    "dimension": "ANALYTICS",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What fundamental financial ratio measures investment efficiency by comparing net profit against capital cost?",
    "answer": "ROI",
    "explanation": "Return on Investment calculates the financial gain relative to the investment outlay."
  },
  {
    "id": "tech-01",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What technology network connects physical hardware and smart sensors to exchange real-time environmental telemetry?",
    "answer": "IoT",
    "explanation": "Internet of Things networks physical edge devices and sensors for telemetry exchange."
  },
  {
    "id": "tech-02",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What hardware ecosystem connects appliances equipped with sensors to cloud platforms for physical environment monitoring?",
    "answer": "IoT",
    "explanation": "IoT bridges physical appliances with cloud analytical backends."
  },
  {
    "id": "tech-03",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What interconnected technology paradigm utilizes wireless sensors to stream physical world telemetry directly into databases?",
    "answer": "IoT",
    "explanation": "IoT streams real-time sensor measurements from field environments into data stores."
  },
  {
    "id": "tech-04",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What advanced neural network architecture simultaneously processes diverse data types like text, images, and audio?",
    "answer": "Multimodal AI",
    "explanation": "Multimodal AI architectures unify vision, text, and acoustic modalities in shared latent space."
  },
  {
    "id": "tech-05",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What modern AI model integrates computer vision, audio processing, and natural language understanding?",
    "answer": "Multimodal AI",
    "explanation": "Multimodal AI synthesizes insights across visual, auditory, and textual inputs."
  },
  {
    "id": "tech-06",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What deep learning paradigm trains models on paired vision, audio, and text datasets for multi-sensory reasoning?",
    "answer": "Multimodal AI",
    "explanation": "Multimodal models learn joint representations across sensory datasets for contextual reasoning."
  },
  {
    "id": "tech-07",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What decentralized ledger technology securely records immutable transactions across a distributed peer-to-peer network?",
    "answer": "Blockchain",
    "explanation": "Blockchain cryptographically guarantees immutable, decentralized transaction records."
  },
  {
    "id": "tech-08",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What immutable cryptographic ledger links transaction records into sequential data blocks, executing automated smart contracts?",
    "answer": "Blockchain",
    "explanation": "Blockchains link hashed blocks sequentially and execute deterministic smart contracts."
  },
  {
    "id": "tech-09",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What distributed database structure maintains an append-only, tamper-proof record of verified network transactions?",
    "answer": "Blockchain",
    "explanation": "Blockchain relies on distributed consensus protocols for append-only transaction histories."
  },
  {
    "id": "tech-10",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What engineering discipline applies DevOps principles to automate machine learning model training and tracking?",
    "answer": "MLOps",
    "explanation": "MLOps standardizes continuous training, versioning, deployment, and monitoring of ML models."
  },
  {
    "id": "tech-11",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What operational framework unifies data engineering to continuously monitor model accuracy drift and retraining workflows?",
    "answer": "MLOps",
    "explanation": "MLOps automates model retraining triggers when feature distribution drift is detected."
  },
  {
    "id": "tech-12",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What lifecycle management practice establishes automated pipelines for tracking ML experiment metrics and serving endpoints?",
    "answer": "MLOps",
    "explanation": "MLOps manages end-to-end experiment lineage, model registries, and inference endpoints."
  },
  {
    "id": "tech-13",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What development paradigm empowers business users to build applications using visual drag-and-drop tools?",
    "answer": "No Code",
    "explanation": "No-code platforms enable rapid software assembly through visual interfaces without writing code."
  },
  {
    "id": "tech-14",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What software creation category allows non-programmers to construct database-backed workflows using pure graphical configuration interfaces?",
    "answer": "No Code",
    "explanation": "No-code empowers domain experts to build functional business tools using visual configurations."
  },
  {
    "id": "tech-15",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What visual application creation approach eliminates traditional programming languages, allowing business analysts to assemble logic?",
    "answer": "No Code",
    "explanation": "No-code abstracts code syntax into drag-and-drop modules for quick operational deployment."
  },
  {
    "id": "tech-16",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What computational model leverages subatomic qubits to solve intractable optimization problems exponentially faster?",
    "answer": "Quantum Computing",
    "explanation": "Quantum Computing exploits superposition and entanglement to solve combinatorial problems."
  },
  {
    "id": "tech-17",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What revolutionary computing paradigm manipulates quantum bits to evaluate vast parallel solution spaces simultaneously?",
    "answer": "Quantum Computing",
    "explanation": "Quantum computers manipulate multi-state qubits to compute exponential solution spaces."
  },
  {
    "id": "tech-18",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What non-binary computing discipline replaces traditional silicon bits with qubits to process multi-variable probabilities?",
    "answer": "Quantum Computing",
    "explanation": "Quantum mechanics enables qubits to represent probabilities far beyond binary logic gates."
  },
  {
    "id": "tech-19",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What conversational AI assistant integrates directly into IDEs to provide real-time automated code completion?",
    "answer": "Copilot",
    "explanation": "AI Copilots assist software engineers with real-time in-line autocomplete and code generation."
  },
  {
    "id": "tech-20",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What AI-powered developer wingman tool operates alongside software engineers inside code editors to auto-complete syntax?",
    "answer": "Copilot",
    "explanation": "Copilot tools suggest context-aware syntax and routines directly in developer IDEs."
  },
  {
    "id": "tech-21",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What conversational AI assistant integrates directly into IDEs to provide real-time automated code completion?",
    "answer": "Copilot",
    "explanation": "Copilot interfaces suggest entire functions and unit tests from natural language prompts."
  },
  {
    "id": "tech-22",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What cognitive framework combines artificial intelligence, machine learning, and RPA bots to execute workflows?",
    "answer": "Intelligent Automation",
    "explanation": "Intelligent Automation blends AI decision models with robotic process automation bots."
  },
  {
    "id": "tech-23",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What technology discipline integrates intelligent AI decision-making algorithms with software bots to automatically parse documents?",
    "answer": "Intelligent Automation",
    "explanation": "Intelligent Automation classifies unstructured documents and automates downstream enterprise tasks."
  },
  {
    "id": "tech-24",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What cognitive framework combines artificial intelligence, machine learning, and RPA bots to execute workflows?",
    "answer": "Intelligent Automation",
    "explanation": "Intelligent Automation streamlines end-to-end digital operations with machine learning logic."
  },
  {
    "id": "tech-25",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What rapid development approach accelerates software creation by combining visual UI components with minimal scripting?",
    "answer": "Low Code",
    "explanation": "Low-code combines visual interface modeling with targeted scripting for rapid engineering."
  },
  {
    "id": "tech-26",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What software engineering approach enables developers to build custom software using graphical drag-and-drop interfaces?",
    "answer": "Low Code",
    "explanation": "Low-code accelerates developer output by scaffolding boilerplate architecture visually."
  },
  {
    "id": "tech-27",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What rapid development approach accelerates software creation by combining visual UI components with minimal scripting?",
    "answer": "Low Code",
    "explanation": "Low-code enables developers to integrate custom APIs on top of drag-and-drop components."
  },
  {
    "id": "tech-28",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What advanced search technique uses natural language processing to understand query intent instead of keywords?",
    "answer": "Semantic Search",
    "explanation": "Semantic Search retrieves results based on contextual meaning rather than literal keyword matches."
  },
  {
    "id": "tech-29",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What retrieval technology converts search queries into mathematical vector coordinates to locate relevant documents?",
    "answer": "Semantic Search",
    "explanation": "Semantic Search matches query vector coordinates with document embeddings in vector space."
  },
  {
    "id": "tech-30",
    "dimension": "EMERGING TECH",
    "character": "Miss Minutes",
    "characterType": "female",
    "clue": "What advanced search technique uses natural language processing to understand query intent instead of keywords?",
    "answer": "Semantic Search",
    "explanation": "Semantic Search comprehends intent and conceptual synonyms for superior search relevance."
  },
];

export const TECH_EASY_QUESTIONS: MarvelQuestion[] = MARVEL_TECH_QUESTIONS;

export { NON_TECH_QUESTIONS, TECH_MEDIUM_QUESTIONS };

export const DIFFICULTY_LEVELS: DifficultyConfig[] = [
  {
    id: 'non_tech',
    label: 'NON TECH',
    name: 'NON TECH',
    tagline: 'Accessible AI & Digital Essentials',
    badgeColor: '#10b981',
    color: '#10b981',
    description: 'Everyday digital literacy, generative AI prompts, cybersecurity, cloud storage, and smart devices.'
  },
  {
    id: 'tech_easy',
    label: 'TECH EASY',
    name: 'TECH EASY',
    tagline: 'Foundations & Architecture Core',
    badgeColor: '#06b6d4',
    color: '#06b6d4',
    description: 'Core concepts in Prompt Engineering, REST APIs, Docker containers, Tableau KPIs, and IoT.'
  },
  {
    id: 'tech_medium',
    label: 'TECH MEDIUM',
    name: 'TECH MEDIUM',
    tagline: 'Advanced Engineering & Systems',
    badgeColor: '#f59e0b',
    color: '#f59e0b',
    description: 'Advanced concepts in PEFT/LoRA, multi-stage builds, Kubernetes PVCs, DAX/M, survival analysis, and quantum computing.'
  }
];

export const QUESTION_BANKS: Record<DifficultyLevel, MarvelQuestion[]> = {
  non_tech: NON_TECH_QUESTIONS,
  tech_easy: TECH_EASY_QUESTIONS,
  tech_medium: TECH_MEDIUM_QUESTIONS
};

