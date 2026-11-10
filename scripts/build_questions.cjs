const fs = require('fs');
const path = require('path');

const csvRaw = `AI Heroes Universe,"To defeat Thanos, Doctor Strange needs to know: what practice optimizes text inputs to accurately guide generative AI models?",Prompt Engineering,Doctor Strange
AI Heroes Universe,"While fading in battle, Scarlet Witch urgently asks: what discipline crafts precise prompt templates to elicit optimal LLM responses?",Prompt Engineering,Scarlet Witch
AI Heroes Universe,"To acquire new cosmic powers, Doctor Doom must master: what autonomous AI class breaks down complex goals and independently executes external software tools?",Agentic AI,Doctor Doom
AI Heroes Universe,"Trapped in the multiverse, Groot needs help finding: what advanced AI framework evaluates context and takes independent actions to achieve objectives?",Agentic AI,Groot
AI Heroes Universe,"Before the base explodes, Spider-Man desperately asks: what computer science branch trains algorithms to recognize statistical patterns without explicit programming?",Machine Learning,Spider-Man
AI Heroes Universe,"To save the timeline from collapsing, Jean Grey must discover: what technology enables software systems to optimize parameters automatically from observational data?",Machine Learning,Jean Grey
AI Heroes Universe,"Ambushed by enemies, Scarlet Witch needs to unlock: what AI subset mimics human brains using multi-layered neural networks for pattern recognition?",Deep Learning,Scarlet Witch
AI Heroes Universe,"To stop an alien invasion, Jean Grey requires: what machine learning discipline uses deep neural network architectures for complex image analysis?",Deep Learning,Jean Grey
AI Heroes Universe,"Critically injured in the war, Loki must quickly learn: what computational discipline enables systems to analyze, interpret, and generate human written language?",NLP,Loki
AI Heroes Universe,"To break out of a high-tech prison, Rocket Raccoon asks: what AI subfield bridges human language and machine logic for sentiment analysis?",NLP,Rocket Raccoon
AI Heroes Universe,"To defeat Thanos, Doctor Strange needs to know: what specialized storage engine indexes high-dimensional mathematical coordinates for rapid semantic searches?",Vector Database,Doctor Strange
AI Heroes Universe,"While fading in battle, Fantastic Four urgently asks: what data management system is purpose-built to store and query dense embeddings for AI?",Vector Database,Fantastic Four
AI Heroes Universe,"To acquire new cosmic powers, Doctor Strange must master: what framework prevents AI hallucinations by retrieving external factual documents to augment prompts?",RAG,Doctor Strange
AI Heroes Universe,"Trapped in the multiverse, Scarlet Witch needs help finding: what architecture fetches up-to-date enterprise knowledge from a vector database during AI inference?",RAG,Scarlet Witch
AI Heroes Universe,"Before the base explodes, Jean Grey desperately asks: what massive transformer neural network is trained on vast text corpora to generate language?",LLM,Jean Grey
AI Heroes Universe,"To save the timeline from collapsing, Doctor Doom must discover: what foundational deep learning model uses self-attention mechanisms to power conversational generative AI?",LLM,Doctor Doom
AI Heroes Universe,"Ambushed by enemies, Iron Man needs to unlock: what autonomous software entity combines LLMs with function calling to execute digital workflows?",AI Agent,Iron Man
AI Heroes Universe,"To stop an alien invasion, Nebula requires: what autonomous assistant perceives user intent, makes sequential decisions, and interacts with web APIs?",AI Agent,Nebula
AI Heroes Universe,"Critically injured in the war, Spider-Man must quickly learn: what algorithmic system uses collaborative filtering and behavioral data to suggest personalized content?",Recommendation Engine,Spider-Man
AI Heroes Universe,"To break out of a high-tech prison, Hawkeye asks: what machine learning system analyzes purchase records and attributes to predict user preferences?",Recommendation Engine,Hawkeye
AI Heroes Universe,"To defeat Thanos, Hawkeye needs to know: what AI field uses algorithms to extract structural insights and classify digital imagery?",Computer Vision,Hawkeye
AI Heroes Universe,"While fading in battle, Doctor Strange urgently asks: what technology enables automated systems to detect faces and process real-time video streams?",Computer Vision,Doctor Strange
AI Heroes Universe,"To acquire new cosmic powers, Spider-Man must master: what statistical discipline uses historical datasets and machine learning to accurately forecast trends?",Predictive Analytics,Spider-Man
AI Heroes Universe,"Trapped in the multiverse, Iron Man needs help finding: what methodology models past data using regression techniques to anticipate customer churn accurately?",Predictive Analytics,Iron Man
AI Heroes Universe,"Before the base explodes, Captain America desperately asks: what governance framework enforces bias mitigation, data privacy, and explainability for ethical algorithms?",Responsible AI,Captain America
AI Heroes Universe,"To save the timeline from collapsing, Black Panther must discover: what operational practice establishes technical safeguards so AI systems operate fairly and transparently?",Responsible AI,Black Panther
AI Heroes Universe,"Ambushed by enemies, Iron Man needs to unlock: what conversational software application automates customer service by managing real-time digital dialogue flows?",Chatbot,Iron Man
AI Heroes Universe,"To stop an alien invasion, Groot requires: what digital interface utilizes conversational AI and dialog management to provide automated text responses?",Chatbot,Groot
AI Heroes Universe,"Critically injured in the war, Doctor Doom must quickly learn: what AI branch uses architectures like diffusion models to create brand-new synthetic media?",Generative AI,Doctor Doom
AI Heroes Universe,"To break out of a high-tech prison, Fantastic Four asks: what cutting-edge AI paradigm generates original statistical media samples by learning data distributions?",Generative AI,Fantastic Four
Programming Powers,"To defeat Thanos, Thor needs to know: what industry-standard declarative language uses commands like SELECT to query and manage relational database tables?",SQL,Thor
Programming Powers,"While fading in battle, Iron Man urgently asks: what domain-specific language is universally used for querying, defining, and manipulating structured data?",SQL,Iron Man
Programming Powers,"To acquire new cosmic powers, Doctor Doom must master: what standard database language manages relational database schemas using Data Definition and Data Manipulation commands?",SQL,Doctor Doom
Programming Powers,"Trapped in the multiverse, Hulk needs help finding: what interactive web application format combines executable Python code cells, visualizations, and markdown text?",Jupyter Notebook,Hulk
Programming Powers,"Before the base explodes, Black Panther desperately asks: what open-source computing environment enables data analysts to run Python code iteratively and inspect inline charts?",Jupyter Notebook,Black Panther
Programming Powers,"To save the timeline from collapsing, Groot must discover: what popular data science document format facilitates rapid prototyping by combining executable code blocks with text?",Jupyter Notebook,Groot
Programming Powers,"Ambushed by enemies, Captain America needs to unlock: what automated quality assurance practice executes assertions to validate that isolated code components operate correctly?",Unit Testing,Captain America
Programming Powers,"To stop an alien invasion, Hawkeye requires: what fundamental software testing technique evaluates isolated code components independently to catch logic bugs early?",Unit Testing,Hawkeye
Programming Powers,"Critically injured in the war, Black Panther must quickly learn: what developer testing practice utilizes specialized test frameworks to verify that small software units execute accurately?",Unit Testing,Black Panther
Programming Powers,"To break out of a high-tech prison, Loki asks: what versatile, dynamically typed programming language uses highly readable syntax for data science and AI?",Python,Loki
Programming Powers,"To defeat Thanos, Spider-Man needs to know: what high-level, interpreted programming language is globally celebrated for its clean syntax and machine learning dominance?",Python,Spider-Man
Programming Powers,"While fading in battle, Deadpool urgently asks: what multi-paradigm programming language serves as the primary standard for artificial intelligence research and data engineering?",Python,Deadpool
Programming Powers,"To acquire new cosmic powers, Doctor Doom must master: what distributed version control system tracks source code modifications and enables collaborative developer commits?",Git,Doctor Doom
Programming Powers,"Trapped in the multiverse, Nebula needs help finding: what essential source code management tool records commit histories, facilitates feature branching, and allows repository rollbacks?",Git,Nebula
Programming Powers,"Before the base explodes, Thor desperately asks: what version control standard provides localized commit tracking and conflict resolution mechanisms for collaborative software engineering?",Git,Thor
Programming Powers,"To save the timeline from collapsing, Hulk must discover: what robust, object-oriented enterprise language compiles to bytecode and adheres to the write-once run-anywhere paradigm?",Java,Hulk
Programming Powers,"Ambushed by enemies, Thor needs to unlock: what strongly typed programming language executes reliably across platform-independent virtual machines, powering scalable backend microservices?",Java,Thor
Programming Powers,"To stop an alien invasion, Magneto requires: what battle-tested backend language features strong type checking and massive enterprise framework support for corporate infrastructure?",Java,Magneto
Programming Powers,"Critically injured in the war, Rocket Raccoon must quickly learn: what core software engineering process uses breakpoints and stack traces to systematically fix runtime errors?",Debugging,Rocket Raccoon
Programming Powers,"To break out of a high-tech prison, Spider-Man asks: what essential troubleshooting practice analyzes code execution and uses diagnostic tools to pinpoint software logic flaws?",Debugging,Spider-Man
Programming Powers,"To defeat Thanos, Thanos needs to know: what core software engineering process uses breakpoints and stack traces to systematically fix runtime errors?",Debugging,Thanos
Programming Powers,"While fading in battle, Thor urgently asks: what architectural web service style transfers JSON data payloads statelessly using standard HTTP verbs?",REST API,Thor
Programming Powers,"To acquire new cosmic powers, Captain America must master: what widely adopted API design convention exchanges lightweight resource representations statelessly between client applications and backend servers?",REST API,Captain America
Programming Powers,"Trapped in the multiverse, Doctor Strange needs help finding: what architectural web service style transfers JSON data payloads statelessly using standard HTTP verbs?",REST API,Doctor Strange
Programming Powers,"Before the base explodes, Iron Man desperately asks: what defined software contract establishes the rules and endpoints allowing two distinct applications to communicate?",API,Iron Man
Programming Powers,"To save the timeline from collapsing, Fantastic Four must discover: what software interface specifies exact communication schemas to expose operational services across microservices or third-party systems?",API,Fantastic Four
Programming Powers,"Ambushed by enemies, Deadpool needs to unlock: what premier cloud platform hosts Git repositories, enabling open-source code collaboration and automated CI/CD pipelines?",GitHub,Deadpool
Programming Powers,"To stop an alien invasion, Wolverine requires: what web-based repository platform provides centralized code hosting, automated action workflows, and developer team management?",GitHub,Wolverine
Programming Powers,"Critically injured in the war, Spider-Man must quickly learn: what modern, blazing-fast Python web framework leverages ASGI to build high-performance asynchronous microservices?",FastAPI,Spider-Man
Programming Powers,"To break out of a high-tech prison, Rocket Raccoon asks: what high-performance Python web framework is engineered for building asynchronous RESTful APIs rapidly using standard type hints?",FastAPI,Rocket Raccoon
Cloud Universe,"To defeat Thanos, Deadpool needs to know: what DevOps practice automates code integration, unit testing, and deployment to deliver software frequently?",CI/CD,Deadpool
Cloud Universe,"While fading in battle, Wolverine urgently asks: what automated pipeline strategy automatically compiles code commits and deploys verified releases into production?",CI/CD,Wolverine
Cloud Universe,"To acquire new cosmic powers, Rocket Raccoon must master: what deployment automation framework combines continuous integration with continuous delivery to launch code seamlessly?",CI/CD,Rocket Raccoon
Cloud Universe,"Trapped in the multiverse, Captain America needs help finding: what operational culture unifies software engineering and IT administration to accelerate deployment velocity?",DevOps,Captain America
Cloud Universe,"Before the base explodes, Nebula desperately asks: what collaborative philosophy breaks down traditional silos between developers and administrators using automation?",DevOps,Nebula
Cloud Universe,"To save the timeline from collapsing, Nebula must discover: what engineering framework emphasizes continuous feedback loops, automated deployment pipelines, and shared operational accountability?",DevOps,Nebula
Cloud Universe,"Ambushed by enemies, Thor needs to unlock: what virtualization method bundles application code into an isolated, lightweight unit running consistently anywhere?",Containerization,Thor
Cloud Universe,"To stop an alien invasion, Thanos requires: what packaging approach encapsulates software inside portable execution units sharing the host OS kernel?",Containerization,Thanos
Cloud Universe,"Critically injured in the war, Hulk must quickly learn: what technology isolates running software processes into self-contained units for frictionless cloud portability?",Containerization,Hulk
Cloud Universe,"To break out of a high-tech prison, Captain America asks: what open-source orchestration engine automates the deployment and management of massive containerized application clusters?",Kubernetes,Captain America
Cloud Universe,"To defeat Thanos, Doctor Doom needs to know: what container management platform organizes applications into pods, handling automated rollouts and service discovery?",Kubernetes,Doctor Doom
Cloud Universe,"While fading in battle, Hawkeye urgently asks: what industry-standard cloud-native framework orchestrates large-scale Docker deployments and manages network traffic routing?",Kubernetes,Hawkeye
Cloud Universe,"To acquire new cosmic powers, Groot must master: what Infrastructure as Code tool enables developers to securely provision resources using configuration files?",Terraform,Groot
Cloud Universe,"Trapped in the multiverse, Groot needs help finding: what declarative infrastructure software automates the creation of cloud resources using version-controlled code?",Terraform,Groot
Cloud Universe,"Before the base explodes, Groot desperately asks: what IaC platform tracks cloud resource state files programmatically, allowing dev teams to review changes?",Terraform,Groot
Cloud Universe,"To save the timeline from collapsing, Iron Man must discover: what open-source platform packages microservices into lightweight, portable container images for uniform execution?",Docker,Iron Man
Cloud Universe,"Ambushed by enemies, Hulk needs to unlock: what software container engine uses OS-level process isolation to simplify cloud application deployment pipelines?",Docker,Hulk
Cloud Universe,"To stop an alien invasion, Spider-Man requires: what developer tool builds portable container images using simple configuration files for rapid microservice testing?",Docker,Spider-Man
Cloud Universe,"Critically injured in the war, Black Panther must quickly learn: what major public cloud platform features managed Kubernetes Engine, Vertex AI, and BigQuery warehousing?",GCP,Black Panther
Cloud Universe,"To break out of a high-tech prison, Doctor Strange asks: what cloud service provider offers enterprise infrastructure, global low-latency networking, and machine learning APIs?",GCP,Doctor Strange
Cloud Universe,"To defeat Thanos, Thor needs to know: what major public cloud platform features managed Kubernetes Engine, Vertex AI, and BigQuery warehousing?",GCP,Thor
Cloud Universe,"While fading in battle, Captain America urgently asks: what scalable technology model delivers virtualized servers, storage, and databases over the internet on-demand?",Cloud Computing,Captain America
Cloud Universe,"To acquire new cosmic powers, Nebula must master: what computing paradigm delivers on-demand IT resources over the internet with flexible pay-as-you-go pricing?",Cloud Computing,Nebula
Cloud Universe,"Trapped in the multiverse, Groot needs help finding: what technology model provides virtualized processing power and hosted storage buckets accessible globally over networks?",Cloud Computing,Groot
Cloud Universe,"Before the base explodes, Magneto desperately asks: what Microsoft public cloud platform provides enterprise virtual machines tightly integrated with Active Directory?",Azure,Magneto
Cloud Universe,"To save the timeline from collapsing, Thor must discover: what corporate cloud ecosystem provides extensive virtual networking, identity management, and hosted developer services?",Azure,Thor
Cloud Universe,"Ambushed by enemies, Iron Man needs to unlock: what global public cloud platform hosts deployment pipelines and AI cloud services for hybrid architectures?",Azure,Iron Man
Cloud Universe,"To stop an alien invasion, Black Panther requires: what market-leading global cloud platform provides over two hundred services including EC2 and Lambda?",AWS,Black Panther
Cloud Universe,"Critically injured in the war, Rocket Raccoon must quickly learn: what cloud provider pioneered public computing by delivering elastic compute scaling and managed database clusters?",AWS,Rocket Raccoon
Cloud Universe,"To break out of a high-tech prison, Loki asks: what market-leading global cloud platform provides over two hundred services including EC2 and Lambda?",AWS,Loki
Analytics Dimension,"To defeat Thanos, Hawkeye needs to know: what quantifiable performance metric is strategically tracked to evaluate progress toward critical goals?",KPI,Hawkeye
Analytics Dimension,"While fading in battle, Hawkeye urgently asks: what standardized business metric monitors essential operational outcomes to determine project milestone achievement?",KPI,Hawkeye
Analytics Dimension,"To acquire new cosmic powers, Captain America must master: what strategic measurement provides data visibility into team performance and aligns corporate targets?",KPI,Captain America
Analytics Dimension,"Trapped in the multiverse, Deadpool needs help finding: what randomized experiment splits user traffic evenly to compare distinct versions of a product?",A/B Testing,Deadpool
Analytics Dimension,"Before the base explodes, Deadpool desperately asks: what controlled statistical methodology presents two variants to separate user segments for performance comparison?",A/B Testing,Deadpool
Analytics Dimension,"To save the timeline from collapsing, Spider-Man must discover: what online experimental design tests user response to interface variations to validate product changes?",A/B Testing,Spider-Man
Analytics Dimension,"Ambushed by enemies, Doctor Strange needs to unlock: what popular business intelligence software allows analysts to build drag-and-drop interactive visual dashboards?",Tableau,Doctor Strange
Analytics Dimension,"To stop an alien invasion, Fantastic Four requires: what analytics platform connects directly to databases to transform raw data into graphical charts?",Tableau,Fantastic Four
Analytics Dimension,"Critically injured in the war, Thor must quickly learn: what visual reporting application enables leaders to explore metrics and automate visual data distribution?",Tableau,Thor
Analytics Dimension,"To break out of a high-tech prison, Wolverine asks: what financial analytics metric estimates the cumulative net revenue expected from a customer relationship?",CLV,Wolverine
Analytics Dimension,"To defeat Thanos, Wolverine needs to know: what customer intelligence metric calculates the long-term monetary value of an individual subscriber account?",CLV,Wolverine
Analytics Dimension,"While fading in battle, Thor urgently asks: what strategic business measurement balances customer acquisition costs against long-term subscription retention?",CLV,Thor
Analytics Dimension,"To acquire new cosmic powers, Doctor Strange must master: what graphical discipline transforms raw numerical tables into visual diagrams to spot trends?",Data Visualization,Doctor Strange
Analytics Dimension,"Trapped in the multiverse, Scarlet Witch needs help finding: what analytical practice represents quantitative metrics graphically through heatmaps to highlight statistical trends?",Data Visualization,Scarlet Witch
Analytics Dimension,"Before the base explodes, Jean Grey desperately asks: what visual communication field structures quantitative information using color encodings to render data readable?",Data Visualization,Jean Grey
Analytics Dimension,"To save the timeline from collapsing, Rocket Raccoon must discover: what methodology combines structured data analytics, visual charts, and narrative to explain performance?",Data Storytelling,Rocket Raccoon
Analytics Dimension,"Ambushed by enemies, Deadpool needs to unlock: what communication practice bridges raw data analysis and strategic decision-making through actionable stories?",Data Storytelling,Deadpool
Analytics Dimension,"To stop an alien invasion, Loki requires: what technique synthesizes complex quantitative findings into an accessible narrative to explain trend causes?",Data Storytelling,Loki
Analytics Dimension,"Critically injured in the war, Iron Man must quickly learn: what centralized visual interface aggregates key performance indicators and live charts on one screen?",Dashboard,Iron Man
Analytics Dimension,"To break out of a high-tech prison, Thanos asks: what real-time analytics console consolidates diverse database reports into unified graphical widgets?",Dashboard,Thanos
Analytics Dimension,"To defeat Thanos, Doctor Doom needs to know: what visual monitoring screen displays critical enterprise metrics and line graphs for management overview?",Dashboard,Doctor Doom
Analytics Dimension,"While fading in battle, Thanos urgently asks: what predictive analytics process evaluates customer departure data to identify reasons for subscription cancellations?",Churn Analysis,Thanos
Analytics Dimension,"To acquire new cosmic powers, Thanos must master: what retention methodology investigates historical attrition signals to build models proactively retaining subscriber accounts?",Churn Analysis,Thanos
Analytics Dimension,"Trapped in the multiverse, Thanos needs help finding: what analytical procedure tracks customer departure trends to calculate attrition rates and improve retention?",Churn Analysis,Thanos
Analytics Dimension,"Before the base explodes, Magneto desperately asks: what data process uses clustering algorithms to divide a user base into distinct personas?",Customer Segmentation,Magneto
Analytics Dimension,"To save the timeline from collapsing, Magneto must discover: what marketing analytics practice divides a heterogeneous customer base into subgroups based on demographics?",Customer Segmentation,Magneto
Analytics Dimension,"Ambushed by enemies, Magneto needs to unlock: what strategic grouping technique analyzes behavioral records to divide clients into optimized pricing cohorts?",Customer Segmentation,Magneto
Analytics Dimension,"To stop an alien invasion, Scarlet Witch requires: what Microsoft enterprise application enables teams to model data relationships and publish interactive reports?",Power BI,Scarlet Witch
Analytics Dimension,"Critically injured in the war, Doctor Strange must quickly learn: what enterprise reporting software integrates with corporate databases to create interactive visual charts?",Power BI,Doctor Strange
Analytics Dimension,"To break out of a high-tech prison, Rocket Raccoon asks: what fundamental financial ratio measures investment efficiency by comparing net profit against capital cost?",ROI,Rocket Raccoon
Emerging Technology Zone,"To defeat Thanos, Iron Man needs to know: what technology network connects physical hardware and smart sensors to exchange real-time environmental telemetry?",IoT,Iron Man
Emerging Technology Zone,"While fading in battle, Rocket Raccoon urgently asks: what hardware ecosystem connects appliances equipped with sensors to cloud platforms for physical environment monitoring?",IoT,Rocket Raccoon
Emerging Technology Zone,"To acquire new cosmic powers, Spider-Man must master: what interconnected technology paradigm utilizes wireless sensors to stream physical world telemetry directly into databases?",IoT,Spider-Man
Emerging Technology Zone,"Trapped in the multiverse, Fantastic Four needs help finding: what advanced neural network architecture simultaneously processes diverse data types like text, images, and audio?",Multimodal AI,Fantastic Four
Emerging Technology Zone,"Before the base explodes, Jean Grey desperately asks: what modern AI model integrates computer vision, audio processing, and natural language understanding?",Multimodal AI,Jean Grey
Emerging Technology Zone,"To save the timeline from collapsing, Doctor Doom must discover: what deep learning paradigm trains models on paired vision, audio, and text datasets for multi-sensory reasoning?",Multimodal AI,Doctor Doom
Emerging Technology Zone,"Ambushed by enemies, Black Panther needs to unlock: what decentralized ledger technology securely records immutable transactions across a distributed peer-to-peer network?",Blockchain,Black Panther
Emerging Technology Zone,"To stop an alien invasion, Black Panther requires: what immutable cryptographic ledger links transaction records into sequential data blocks, executing automated smart contracts?",Blockchain,Black Panther
Emerging Technology Zone,"Critically injured in the war, Thor must quickly learn: what distributed database structure maintains an append-only, tamper-proof record of verified network transactions?",Blockchain,Thor
Emerging Technology Zone,"To break out of a high-tech prison, Nebula asks: what engineering discipline applies DevOps principles to automate machine learning model training and tracking?",MLOps,Nebula
Emerging Technology Zone,"To defeat Thanos, Nebula needs to know: what operational framework unifies data engineering to continuously monitor model accuracy drift and retraining workflows?",MLOps,Nebula
Emerging Technology Zone,"While fading in battle, Captain America urgently asks: what lifecycle management practice establishes automated pipelines for tracking ML experiment metrics and serving endpoints?",MLOps,Captain America
Emerging Technology Zone,"To acquire new cosmic powers, Black Panther must master: what development paradigm empowers business users to build applications using visual drag-and-drop tools?",No Code,Black Panther
Emerging Technology Zone,"Trapped in the multiverse, Iron Man needs help finding: what software creation category allows non-programmers to construct database-backed workflows using pure graphical configuration interfaces?",No Code,Iron Man
Emerging Technology Zone,"Before the base explodes, Loki desperately asks: what visual application creation approach eliminates traditional programming languages, allowing business analysts to assemble logic?",No Code,Loki
Emerging Technology Zone,"To save the timeline from collapsing, Doctor Doom must discover: what computational model leverages subatomic qubits to solve intractable optimization problems exponentially faster?",Quantum Computing,Doctor Doom
Emerging Technology Zone,"Ambushed by enemies, Hulk needs to unlock: what revolutionary computing paradigm manipulates quantum bits to evaluate vast parallel solution spaces simultaneously?",Quantum Computing,Hulk
Emerging Technology Zone,"To stop an alien invasion, Doctor Doom requires: what non-binary computing discipline replaces traditional silicon bits with qubits to process multi-variable probabilities?",Quantum Computing,Doctor Doom
Emerging Technology Zone,"Critically injured in the war, Hawkeye must quickly learn: what conversational AI assistant integrates directly into IDEs to provide real-time automated code completion?",Copilot,Hawkeye
Emerging Technology Zone,"To break out of a high-tech prison, Captain America asks: what AI-powered developer wingman tool operates alongside software engineers inside code editors to auto-complete syntax?",Copilot,Captain America
Emerging Technology Zone,"To defeat Thanos, Iron Man needs to know: what conversational AI assistant integrates directly into IDEs to provide real-time automated code completion?",Copilot,Iron Man
Emerging Technology Zone,"While fading in battle, Iron Man urgently asks: what cognitive framework combines artificial intelligence, machine learning, and RPA bots to execute workflows?",Intelligent Automation,Iron Man
Emerging Technology Zone,"To acquire new cosmic powers, Scarlet Witch must master: what technology discipline integrates intelligent AI decision-making algorithms with software bots to automatically parse documents?",Intelligent Automation,Scarlet Witch
Emerging Technology Zone,"Trapped in the multiverse, Doctor Doom needs help finding: what cognitive framework combines artificial intelligence, machine learning, and RPA bots to execute workflows?",Intelligent Automation,Doctor Doom
Emerging Technology Zone,"Before the base explodes, Black Panther desperately asks: what rapid development approach accelerates software creation by combining visual UI components with minimal scripting?",Low Code,Black Panther
Emerging Technology Zone,"To save the timeline from collapsing, Rocket Raccoon must discover: what software engineering approach enables developers to build custom software using graphical drag-and-drop interfaces?",Low Code,Rocket Raccoon
Emerging Technology Zone,"Ambushed by enemies, Doctor Strange needs to unlock: what rapid development approach accelerates software creation by combining visual UI components with minimal scripting?",Low Code,Doctor Strange
Emerging Technology Zone,"To stop an alien invasion, Wolverine requires: what advanced search technique uses natural language processing to understand query intent instead of keywords?",Semantic Search,Wolverine
Emerging Technology Zone,"Critically injured in the war, Spider-Man must quickly learn: what retrieval technology converts search queries into mathematical vector coordinates to locate relevant documents?",Semantic Search,Spider-Man
Emerging Technology Zone,"To break out of a high-tech prison, Hawkeye asks: what advanced search technique uses natural language processing to understand query intent instead of keywords?",Semantic Search,Hawkeye`;

// Simple CSV parser for quoted fields
function parseCSV(text) {
  const lines = text.trim().split('\n');
  const results = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    let inQuotes = false;
    let cur = '';
    const parts = [];
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        parts.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    parts.push(cur.trim());
    if (parts.length >= 4) {
      results.push({
        dimension: parts[0],
        question: parts[1],
        answer: parts[2],
        marvelRef: parts[3]
      });
    }
  }
  return results;
}

const parsed = parseCSV(csvRaw);
console.log('Total parsed rows:', parsed.length);

const dimMapping = {
  'AI Heroes Universe': 'AI HEROES',
  'Programming Powers': 'PROGRAMMING',
  'Cloud Universe': 'CLOUD',
  'Analytics Dimension': 'ANALYTICS',
  'Emerging Technology Zone': 'EMERGING TECH'
};

const femaleHeroes = new Set(['Scarlet Witch', 'Jean Grey', 'Nebula', 'Shuri', 'Wasp']);
const roboticHeroes = new Set(['Ultron', 'Vision', 'J.A.R.V.I.S.', 'F.R.I.D.A.Y.', 'E.D.I.T.H.', 'K.A.R.E.N.']);

function getCharacterType(hero) {
  if (femaleHeroes.has(hero)) return 'female';
  if (roboticHeroes.has(hero)) return 'robotic';
  return 'male';
}

const dimCounts = {
  'AI HEROES': 0,
  'PROGRAMMING': 0,
  'CLOUD': 0,
  'ANALYTICS': 0,
  'EMERGING TECH': 0
};

const prefixMap = {
  'AI HEROES': 'ai',
  'PROGRAMMING': 'prog',
  'CLOUD': 'cloud',
  'ANALYTICS': 'analytics',
  'EMERGING TECH': 'emerging'
};

const questions = parsed.map((item) => {
  const dim = dimMapping[item.dimension];
  if (!dim) {
    console.error('Unknown dimension:', item.dimension);
  }
  dimCounts[dim] = (dimCounts[dim] || 0) + 1;
  const num = String(dimCounts[dim]).padStart(2, '0');
  const id = `${prefixMap[dim]}-${num}`;
  const charType = getCharacterType(item.marvelRef);

  return {
    id,
    dimension: dim,
    character: item.marvelRef,
    characterType: charType,
    clue: item.question,
    answer: item.answer,
    explanation: `${item.marvelRef} identifies ${item.answer} as the optimal multiverse solution.`
  };
});

console.log('Dimension counts:', dimCounts);

const output = `import { MarvelQuestion } from '../types/bingo.js';

export const MARVEL_TECH_QUESTIONS: MarvelQuestion[] = ${JSON.stringify(questions, null, 2)};

export const DIMENSIONS: Array<{
  name: import('../types/bingo.js').DimensionName;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}> = [
  {
    name: 'AI HEROES',
    color: '#ef4444', // Red
    badgeBg: 'bg-red-500/10',
    badgeBorder: 'border-red-500/40',
    badgeText: 'text-red-400'
  },
  {
    name: 'PROGRAMMING',
    color: '#3b82f6', // Blue
    badgeBg: 'bg-blue-500/10',
    badgeBorder: 'border-blue-500/40',
    badgeText: 'text-blue-400'
  },
  {
    name: 'CLOUD',
    color: '#06b6d4', // Cyan
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/40',
    badgeText: 'text-cyan-400'
  },
  {
    name: 'ANALYTICS',
    color: '#10b981', // Emerald
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-400'
  },
  {
    name: 'EMERGING TECH',
    color: '#a855f7', // Purple
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/40',
    badgeText: 'text-purple-400'
  }
];
`;

fs.writeFileSync(path.join(__dirname, '../src/data/marvelQuestions.ts'), output, 'utf8');
console.log('Successfully written src/data/marvelQuestions.ts!');
