import { MarvelQuestion } from '../../types/bingo.js';

export const TECH_MEDIUM_QUESTIONS: MarvelQuestion[] = [
  // ==========================================
  // DIMENSION B: AI HEROES UNIVERSE (30 Questions)
  // ==========================================
  {
    id: 'tm-ai-01',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What model uses diffusion noise-denoise loops to generate images?',
    answer: 'Generative AI',
    explanation: 'Diffusion models iteratively remove Gaussian noise from latent spaces to generate photorealistic images.'
  },
  {
    id: 'tm-ai-02',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What architecture uses competing generator and discriminator networks?',
    answer: 'Generative AI',
    explanation: 'Generative Adversarial Networks (GANs) pit a generator network against a discriminator network in a zero-sum game.'
  },
  {
    id: 'tm-ai-03',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What framework combines ReAct prompting loops with tool execution?',
    answer: 'Agentic AI',
    explanation: 'ReAct (Reason + Act) interleaves reasoning traces with external tool actions for autonomous problem-solving.'
  },
  {
    id: 'tm-ai-04',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What autonomous AI breaks goals into sub-tasks using feedback?',
    answer: 'Agentic AI',
    explanation: 'Agentic AI architectures decompose overarching objectives into plan steps and adjust dynamically based on environment feedback.'
  },
  {
    id: 'tm-ai-05',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What algorithm combines L1 and L2 penalties to prevent overfitting?',
    answer: 'Machine Learning',
    explanation: 'Elastic Net regularization linearly blends Lasso (L1) and Ridge (L2) penalties to balance sparsity and collinearity.'
  },
  {
    id: 'tm-ai-06',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What ensemble method trains sequential trees that correct prior errors?',
    answer: 'Machine Learning',
    explanation: 'Gradient boosting algorithms (like XGBoost and LightGBM) fit new decision trees iteratively to pseudo-residuals.'
  },
  {
    id: 'tm-ai-07',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What method computes gradients via chain rule during backpropagation?',
    answer: 'Deep Learning',
    explanation: 'Automatic differentiation leverages calculus chain rules to propagate loss gradients backward across network layers.'
  },
  {
    id: 'tm-ai-08',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What neural architecture uses self-attention to process sequential data parallelly?',
    answer: 'Deep Learning',
    explanation: 'The Transformer architecture replaces recurrent connections with multi-head self-attention mechanisms.'
  },
  {
    id: 'tm-ai-09',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What embeddings capture contextual word meanings, like BERT or Word2Vec?',
    answer: 'NLP',
    explanation: 'Contextual dense vector representations position semantically related words close together in multidimensional space.'
  },
  {
    id: 'tm-ai-10',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What metric measures n-gram overlap to evaluate translation quality?',
    answer: 'NLP',
    explanation: 'BLEU (Bilingual Evaluation Understudy) evaluates machine translations against human references using precision of n-grams.'
  },
  {
    id: 'tm-ai-11',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What technique breaks complex reasoning into step-by-step logical thoughts?',
    answer: 'Prompt Engineering',
    explanation: 'Chain-of-Thought (CoT) prompting encourages models to articulate intermediate reasoning steps before answering.'
  },
  {
    id: 'tm-ai-12',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What method optimizes prompts dynamically using automated feedback loops?',
    answer: 'Prompt Engineering',
    explanation: 'Automatic prompt optimization algorithms (like DSPy or APE) tune prompt phrasing against objective loss metrics.'
  },
  {
    id: 'tm-ai-13',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What indexing algorithm uses small-world graphs for fast similarity search?',
    answer: 'Vector Database',
    explanation: 'Hierarchical Navigable Small World (HNSW) graphs achieve logarithmic-time approximate nearest neighbor retrieval.'
  },
  {
    id: 'tm-ai-14',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What metric measures the angle between vectors for semantic similarity?',
    answer: 'Vector Database',
    explanation: 'Cosine similarity calculates the dot product of two normalized vectors to gauge orientational alignment.'
  },
  {
    id: 'tm-ai-15',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What hybrid search combines BM25 keyword matching with vector similarity?',
    answer: 'RAG',
    explanation: 'Hybrid retrieval combines sparse term-frequency scores (BM25) with dense semantic embeddings (Reciprocal Rank Fusion).'
  },
  {
    id: 'tm-ai-16',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What optimization re-ranks retrieved document chunks before LLM context injection?',
    answer: 'RAG',
    explanation: 'Cross-encoder re-rankers evaluate relevance of candidate documents directly against queries to optimize context windows.'
  },
  {
    id: 'tm-ai-17',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What PEFT method freezes weights and injects low-rank trainable matrices?',
    answer: 'LLM',
    explanation: 'LoRA (Low-Rank Adaptation) decomposes parameter updates into low-rank factor matrices, drastically reducing fine-tuning compute.'
  },
  {
    id: 'tm-ai-18',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What alignment method optimizes language models using human preference pairs?',
    answer: 'LLM',
    explanation: 'RLHF and Direct Preference Optimization (DPO) steer LLM generations using binary human preference comparison pairs.'
  },
  {
    id: 'tm-ai-19',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What pattern gives software agents long-term memory via vector stores?',
    answer: 'AI Agent',
    explanation: 'Episodic memory architectures index prior interactions in vector databases to retrieve relevant context on demand.'
  },
  {
    id: 'tm-ai-20',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What multi-agent framework enables conversational personas to collaborate on code?',
    answer: 'AI Agent',
    explanation: 'Multi-agent frameworks like AutoGen and CrewAI orchestrate specialized persona agents collaborating on complex tasks.'
  },
  {
    id: 'tm-ai-21',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What matrix factorization uncovers latent factors for personalized product ranking?',
    answer: 'Recommendation Engine',
    explanation: 'Singular Value Decomposition (SVD) and ALS factorize user-item interaction matrices into dense latent preference vectors.'
  },
  {
    id: 'tm-ai-22',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What cold-start strategy combines user demographic metadata with item attributes?',
    answer: 'Recommendation Engine',
    explanation: 'Content-based filtering alleviates cold-start hurdles by leveraging feature attributes when historical interactions are sparse.'
  },
  {
    id: 'tm-ai-23',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What single-stage object detector processes images in one forward pass?',
    answer: 'Computer Vision',
    explanation: 'YOLO (You Only Look Once) frames detection as a regression problem directly from full images to bounding boxes.'
  },
  {
    id: 'tm-ai-24',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What segmentation network uses skip connections to preserve spatial details?',
    answer: 'Computer Vision',
    explanation: 'U-Net connects contracting encoder paths directly to symmetric expanding decoder paths via skip connections.'
  },
  {
    id: 'tm-ai-25',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What time-series model combines autoregressive, differencing, and moving average components?',
    answer: 'Predictive Analytics',
    explanation: 'ARIMA models combine autoregression (p), integration differencing (d), and moving average error lags (q).'
  },
  {
    id: 'tm-ai-26',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What statistical model estimates hazard rates while handling right-censored data?',
    answer: 'Predictive Analytics',
    explanation: 'Cox Proportional Hazards models evaluate time-to-event survival probabilities in the presence of censored observations.'
  },
  {
    id: 'tm-ai-27',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What framework uses Shapley values from game theory for feature attribution?',
    answer: 'Responsible AI',
    explanation: 'SHAP (SHapley Additive exPlanations) computes fair marginal contributions of features to explain model predictions.'
  },
  {
    id: 'tm-ai-28',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What auditing evaluates models across demographic subgroups to prevent bias?',
    answer: 'Responsible AI',
    explanation: 'Algorithmic fairness audits evaluate disparate impact and equalized odds metrics across demographic groups.'
  },
  {
    id: 'tm-ai-29',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What dialog component tracks conversation state and slots across turns?',
    answer: 'Chatbot',
    explanation: 'Dialogue State Trackers (DST) accumulate extracted slot values and user intent across multi-turn conversational exchanges.'
  },
  {
    id: 'tm-ai-30',
    dimension: 'AI HEROES',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What fallback mechanism handles low-confidence intent classification in chatbots?',
    answer: 'Chatbot',
    explanation: 'Confidence thresholding routes low-certainty customer utterances to clarifying menus or live human escalation.'
  },

  // ==========================================
  // DIMENSION I: PROGRAMMING POWERS (30 Questions)
  // ==========================================
  {
    id: 'tm-prog-01',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What feature wraps functions to dynamically extend behavior using `@`?',
    answer: 'Python',
    explanation: 'Python decorators wrap callable functions to inject logging, caching, or authentication logic without altering code.'
  },
  {
    id: 'tm-prog-02',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What memory-efficient construct yields values lazily using `yield`?',
    answer: 'Python',
    explanation: 'Python generators maintain state across invocations, producing elements on-demand without populating memory.'
  },
  {
    id: 'tm-prog-03',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What module provides event loops and coroutines using `async`/`await`?',
    answer: 'Python',
    explanation: 'The `asyncio` module runs non-blocking asynchronous event loops to orchestrate IO-bound network coroutines.'
  },
  {
    id: 'tm-prog-04',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What analytical functions perform calculations across related rows using `OVER()`?',
    answer: 'SQL',
    explanation: 'SQL window functions compute running totals and rankings over partitions without collapsing query rows.'
  },
  {
    id: 'tm-prog-05',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What database index structure uses B-trees to accelerate `SELECT` queries?',
    answer: 'SQL',
    explanation: 'Balanced tree (B-Tree) indexes maintain sorted key hierarchies, providing logarithmic-time search traversals.'
  },
  {
    id: 'tm-prog-06',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What transaction property guarantees all operations complete or roll back?',
    answer: 'SQL',
    explanation: 'Atomicity ensures database transaction units succeed in entirety or abort completely without partial state changes.'
  },
  {
    id: 'tm-prog-07',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What mechanism automatically reclaims unreferenced heap memory objects at runtime?',
    answer: 'Java',
    explanation: 'The JVM Garbage Collector identifies and deallocates unreferenced heap memory objects via generational mark-sweep.'
  },
  {
    id: 'tm-prog-08',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What design feature allows classes to implement multiple interface contracts?',
    answer: 'Java',
    explanation: 'Java supports multiple interface inheritance, decoupling abstract method contracts from concrete implementations.'
  },
  {
    id: 'tm-prog-09',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What framework component provides dependency injection to wire enterprise beans?',
    answer: 'Java',
    explanation: 'The Spring IoC (Inversion of Control) container manages bean lifecycles and injects dependencies via annotations.'
  },
  {
    id: 'tm-prog-10',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What protocol enforces XML schemas, SOAP headers, and ACID compliance?',
    answer: 'API',
    explanation: 'SOAP (Simple Object Access Protocol) relies on strict XML messaging contracts and WSDL specifications.'
  },
  {
    id: 'tm-prog-11',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What rate-limiting algorithm uses fixed capacity tokens to control traffic spikes?',
    answer: 'API',
    explanation: 'The Token Bucket algorithm replenishes tokens at a constant rate, accommodating transient burst traffic.'
  },
  {
    id: 'tm-prog-12',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What Python library handles data validation and type enforcement in FastAPI?',
    answer: 'FastAPI',
    explanation: 'Pydantic defines data models using standard Python type annotations, parsing and validating incoming payloads.'
  },
  {
    id: 'tm-prog-13',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What ASGI server provides high-performance asynchronous networking for FastAPI apps?',
    answer: 'FastAPI',
    explanation: 'Uvicorn is a lightning-fast ASGI web server implementation built on uvloop and httptools.'
  },
  {
    id: 'tm-prog-14',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What schema standard validates structural formats and data types of JSON?',
    answer: 'JSON',
    explanation: 'JSON Schema defines declarative vocabulary to annotate and validate JSON document structures and constraints.'
  },
  {
    id: 'tm-prog-15',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What token format encodes signed claims as base64 JSON objects?',
    answer: 'JSON',
    explanation: 'JSON Web Tokens (JWT) encode signed cryptographic claims across header, payload, and signature segments.'
  },
  {
    id: 'tm-prog-16',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What command applies a specific commit from another branch directly?',
    answer: 'Git',
    explanation: '`git cherry-pick` selects and applies the patch introduced by an individual commit to the current HEAD.'
  },
  {
    id: 'tm-prog-17',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What command re-applies commits on top of another base tip?',
    answer: 'Git',
    explanation: '`git rebase` forward-ports commits from the current branch onto the tip of another upstream branch.'
  },
  {
    id: 'tm-prog-18',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What command temporarily shelves uncommitted local working directory changes?',
    answer: 'Git',
    explanation: '`git stash` records the dirty state of working copies and index onto a stack for retrieval via `git stash pop`.'
  },
  {
    id: 'tm-prog-19',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What automation feature runs custom CI/CD YAML workflows on repo push?',
    answer: 'GitHub',
    explanation: 'GitHub Actions triggers automated event-driven workflows declared in `.github/workflows/*.yml`.'
  },
  {
    id: 'tm-prog-20',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What security feature scans repository commit histories for exposed API tokens?',
    answer: 'GitHub',
    explanation: 'GitHub Secret Scanning detects inadvertent token leaks against partner patterns across commit trees.'
  },
  {
    id: 'tm-prog-21',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What special syntax starting with `%` executes cell environment configurations?',
    answer: 'Jupyter Notebook',
    explanation: 'IPython magic commands (line `%` and cell `%%`) execute shell operations and profiling diagnostics.'
  },
  {
    id: 'tm-prog-22',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What kernel process executes code cell commands in Jupyter notebooks?',
    answer: 'Jupyter Notebook',
    explanation: 'Jupyter kernels (like `ipykernel`) maintain stateful runtime environments and communicate via ZeroMQ.'
  },
  {
    id: 'tm-prog-23',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What widget library creates sliders and UI controls inside Jupyter cells?',
    answer: 'Jupyter Notebook',
    explanation: '`ipywidgets` embeds interactive HTML sliders, dropdowns, and buttons into notebook cell outputs.'
  },
  {
    id: 'tm-prog-24',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What constraint specifies that REST APIs must not store client session state?',
    answer: 'REST API',
    explanation: 'Statelessness requires that each request from client to server contains all context necessary for processing.'
  },
  {
    id: 'tm-prog-25',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What HTTP status code indicates successful resource creation during POST?',
    answer: 'REST API',
    explanation: 'HTTP 201 Created signifies that a requested resource was successfully created and assigned a URI.'
  },
  {
    id: 'tm-prog-26',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What maturity model categorizes REST APIs using URIs, verbs, and HATEOAS?',
    answer: 'REST API',
    explanation: 'The Richardson Maturity Model ranks API sophistication from Level 0 (RPC) to Level 3 (HATEOAS hypermedia).'
  },
  {
    id: 'tm-prog-27',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What practice replaces external dependencies with controlled mocks during unit tests?',
    answer: 'Unit Testing',
    explanation: 'Mocking intercepts external network, database, or API calls with deterministic test doubles.'
  },
  {
    id: 'tm-prog-28',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What metric measures the percentage of decision branches executed during tests?',
    answer: 'Unit Testing',
    explanation: 'Branch coverage calculates the fraction of conditional boolean paths executed by the automated test suite.'
  },
  {
    id: 'tm-prog-29',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What interactive tool pauses execution to inspect stack frames and variables?',
    answer: 'Debugging',
    explanation: 'Interactive debuggers (like GDB or PDB) insert breakpoints to evaluate local scope and execution stack traces.'
  },
  {
    id: 'tm-prog-30',
    dimension: 'PROGRAMMING',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What technique detects memory leaks by analyzing object allocations in heaps?',
    answer: 'Debugging',
    explanation: 'Heap profiling captures memory snapshots to identify retained objects that prevent garbage collection.'
  },

  // ==========================================
  // DIMENSION N: CLOUD UNIVERSE (30 Questions)
  // ==========================================
  {
    id: 'tm-cloud-01',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What serverless compute service automatically runs code without managing EC2 instances?',
    answer: 'AWS',
    explanation: 'AWS Lambda executes event-driven compute code in managed runtimes, scaling from zero to thousands of instances.'
  },
  {
    id: 'tm-cloud-02',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What cloud network isolates virtual networks using private subnets and NAT gateways?',
    answer: 'AWS',
    explanation: 'Amazon Virtual Private Cloud (VPC) provides isolated virtual networking topologies in the cloud.'
  },
  {
    id: 'tm-cloud-03',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What database service offers multi-AZ replication for MySQL and PostgreSQL?',
    answer: 'AWS',
    explanation: 'Amazon Relational Database Service (RDS) synchronizes storage replicates synchronously to secondary availability zones.'
  },
  {
    id: 'tm-cloud-04',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What identity service handles authentication and single sign-on across Azure resources?',
    answer: 'Azure',
    explanation: 'Microsoft Entra ID (formerly Azure Active Directory) governs identity, access tokens, and SSO boundaries.'
  },
  {
    id: 'tm-cloud-05',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What serverless integration service builds event-driven workflows connecting cloud apps?',
    answer: 'Azure',
    explanation: 'Azure Logic Apps and Azure Functions orchestrate serverless event-driven integration pipelines.'
  },
  {
    id: 'tm-cloud-06',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What multi-model database offers guaranteed single-digit millisecond latency globally?',
    answer: 'Azure',
    explanation: 'Azure Cosmos DB provides turnkey multi-region replication and multi-model API access with SLAs.'
  },
  {
    id: 'tm-cloud-07',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What serverless data warehouse runs SQL queries across petabytes using columnar storage?',
    answer: 'GCP',
    explanation: 'Google Cloud BigQuery separates compute from storage, executing ANSI SQL across distributed clusters.'
  },
  {
    id: 'tm-cloud-08',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What managed container platform runs stateless apps, auto-scaling down to zero?',
    answer: 'GCP',
    explanation: 'Google Cloud Run executes containerized applications in response to web requests with scale-to-zero economics.'
  },
  {
    id: 'tm-cloud-09',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What unified ML platform provides tools for dataset management and model deployment?',
    answer: 'GCP',
    explanation: 'Google Cloud Vertex AI unifies AutoML, custom training pipelines, and endpoint serving infrastructure.'
  },
  {
    id: 'tm-cloud-10',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What build technique uses multiple `FROM` statements to reduce image size?',
    answer: 'Docker',
    explanation: 'Multi-stage builds compile artifacts in intermediate builder containers and copy only runtime binaries into lean images.'
  },
  {
    id: 'tm-cloud-11',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What feature persists container data by mounting host directories directly?',
    answer: 'Docker',
    explanation: 'Bind mounts and named volumes mount filesystem paths from the host machine into containerized namespaces.'
  },
  {
    id: 'tm-cloud-12',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What multi-container tool uses YAML files to run application stacks?',
    answer: 'Docker',
    explanation: 'Docker Compose defines services, volumes, and networks within `docker-compose.yml` for unified local orchestration.'
  },
  {
    id: 'tm-cloud-13',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What API object routes external HTTP/HTTPS traffic to cluster services?',
    answer: 'Kubernetes',
    explanation: 'Ingress resources manage external HTTP routing, SSL termination, and path-based forwarding to cluster services.'
  },
  {
    id: 'tm-cloud-14',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What controller automatically scales pod replicas based on CPU utilization?',
    answer: 'Kubernetes',
    explanation: 'The Horizontal Pod Autoscaler (HPA) adjusts replica counts dynamically when resource utilization thresholds are crossed.'
  },
  {
    id: 'tm-cloud-15',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What abstraction provisions persistent storage dynamically via PersistentVolumeClaims in Kubernetes?',
    answer: 'Kubernetes',
    explanation: 'StorageClasses define dynamic volume provisioners that fulfill PersistentVolumeClaims without manual admin intervention.'
  },
  {
    id: 'tm-cloud-16',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What release strategy deploys software updates to a small user subset first?',
    answer: 'DevOps',
    explanation: 'Canary deployments route a small fraction of production traffic to new releases to monitor telemetry before full rollout.'
  },
  {
    id: 'tm-cloud-17',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What deployment pattern uses two identical environments for zero-downtime releases?',
    answer: 'DevOps',
    explanation: 'Blue-Green deployment runs identical live and staging environments, cutting traffic over instantly via the load balancer.'
  },
  {
    id: 'tm-cloud-18',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What monitoring practice collects metrics, logs, and traces for system visibility?',
    answer: 'DevOps',
    explanation: 'Observability consolidates the three telemetry pillars (metrics, logs, distributed traces) for deep diagnostics.'
  },
  {
    id: 'tm-cloud-19',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What artifact repository securely stores and scans Docker images for vulnerabilities?',
    answer: 'CI/CD',
    explanation: 'Container registries (like Harbor, ECR, or Artifact Registry) store signed container layers and scan for CVEs.'
  },
  {
    id: 'tm-cloud-20',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What pipeline feature executes automated test suites across parallel worker nodes?',
    answer: 'CI/CD',
    explanation: 'Matrix builds and parallelized test jobs partition test suites across concurrent runner instances.'
  },
  {
    id: 'tm-cloud-21',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What GitOps approach uses Git repos as single source of truth for infrastructure?',
    answer: 'CI/CD',
    explanation: 'GitOps synchronizes declared Git repository states directly to cluster state via controllers like ArgoCD or Flux.'
  },
  {
    id: 'tm-cloud-22',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What Linux kernel feature isolates process trees and mount points for containers?',
    answer: 'Containerization',
    explanation: 'Linux namespaces provide isolated environments for process trees (PID), network interfaces (NET), and mount points.'
  },
  {
    id: 'tm-cloud-23',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What Linux kernel mechanism limits CPU and memory usage for container groups?',
    answer: 'Containerization',
    explanation: 'Control groups (cgroups) meter, isolate, and enforce hardware resource limits across process collections.'
  },
  {
    id: 'tm-cloud-24',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What standard specification defines container runtime execution and image formats?',
    answer: 'Containerization',
    explanation: 'The Open Container Initiative (OCI) defines runtime specifications (runc) and portable image layer formats.'
  },
  {
    id: 'tm-cloud-25',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What central file maps real-world cloud resources to declarative configuration code?',
    answer: 'Terraform',
    explanation: 'The `terraform.tfstate` state file tracks managed cloud resources and maps them to configuration declarations.'
  },
  {
    id: 'tm-cloud-26',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What reusable configuration structure packages standardized cloud provisioning code patterns?',
    answer: 'Terraform',
    explanation: 'Terraform modules encapsulate reusable collections of related `.tf` infrastructure resource files.'
  },
  {
    id: 'tm-cloud-27',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What preview command compares declarative code against remote cloud infrastructure?',
    answer: 'Terraform',
    explanation: '`terraform plan` computes execution differences between local configurations and real-world deployed resources.'
  },
  {
    id: 'tm-cloud-28',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What model provisions elastic compute resources dynamically matching traffic shifts?',
    answer: 'Cloud Computing',
    explanation: 'Elasticity allows compute clusters to expand capacity on demand and de-provision servers during idle periods.'
  },
  {
    id: 'tm-cloud-29',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What model divides security responsibilities between cloud provider and client?',
    answer: 'Cloud Computing',
    explanation: 'The Shared Responsibility Model demarcates security OF the cloud (provider) versus security IN the cloud (customer).'
  },
  {
    id: 'tm-cloud-30',
    dimension: 'CLOUD',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What deployment strategy distributes workloads across multiple isolated availability zones?',
    answer: 'Cloud Computing',
    explanation: 'Multi-AZ architecture eliminates single points of failure by spreading workloads across physically separate data facilities.'
  },

  // ==========================================
  // DIMENSION G: ANALYTICS DIMENSION (30 Questions)
  // ==========================================
  {
    id: 'tm-data-01',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What reporting metric measures the percentage of user interactions achieving conversion?',
    answer: 'Dashboard',
    explanation: 'Conversion Rate calculates the ratio of completed goals relative to total inbound traffic sessions.'
  },
  {
    id: 'tm-data-02',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What UI feature filters multiple dashboard widgets simultaneously via selected parameters?',
    answer: 'Dashboard',
    explanation: 'Cross-filtering applies parameter selections across all coordinated visual cards on a dashboard page.'
  },
  {
    id: 'tm-data-03',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What capability allows navigating from summary metrics down to granular transactions?',
    answer: 'Dashboard',
    explanation: 'Drill-through navigation allows analysts to unpack summarized aggregates down to individual transaction lines.'
  },
  {
    id: 'tm-data-04',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What functional query language constructs calculated columns and measures in Power BI?',
    answer: 'Power BI',
    explanation: 'DAX (Data Analysis Expressions) is a formula expression language used for custom calculations in Power BI tabular models.'
  },
  {
    id: 'tm-data-05',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What engine inside Power BI cleans and shapes data using M language?',
    answer: 'Power BI',
    explanation: 'Power Query (built on the M functional language) extracts, transforms, and loads messy raw source data.'
  },
  {
    id: 'tm-data-06',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What feature automatically refreshes published report datasets on scheduled intervals?',
    answer: 'Power BI',
    explanation: 'Scheduled data refreshes automate scheduled ETL cycles via on-premises or cloud data gateway connections.'
  },
  {
    id: 'tm-data-07',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What feature computes aggregates at specified dimensions independent of view granularity?',
    answer: 'Tableau',
    explanation: 'Level of Detail (LOD) expressions (FIXED, INCLUDE, EXCLUDE) calculate aggregations across custom dimensional scopes.'
  },
  {
    id: 'tm-data-08',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What file format packages data extracts and formatting for offline sharing?',
    answer: 'Tableau',
    explanation: 'Tableau Packaged Workbooks (.twbx) compress data extracts and workbook XML into a self-contained archive.'
  },
  {
    id: 'tm-data-09',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What data structure combines tables flexibly without requiring physical JOIN operations?',
    answer: 'Tableau',
    explanation: 'Tableau Relationships define contextual semantic linkages between tables without enforcing premature row duplication.'
  },
  {
    id: 'tm-data-10',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What narrative structure arranges analytical insights into context, conflict, and resolution?',
    answer: 'Data Storytelling',
    explanation: 'Narrative data storytelling structures quantitative metrics into compelling narrative arcs for business buy-in.'
  },
  {
    id: 'tm-data-11',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What design principle eliminates chartjunk to maximize data-ink display ratio?',
    answer: 'Data Storytelling',
    explanation: 'Edward Tufte established the data-ink ratio, advocating removal of superfluous background ink and non-data decoration.'
  },
  {
    id: 'tm-data-12',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What cognitive principle arranges visual elements to match human perceptual grouping?',
    answer: 'Data Storytelling',
    explanation: 'Gestalt psychology principles (proximity, similarity, continuity, closure) govern visual grouping in dashboard charts.'
  },
  {
    id: 'tm-data-13',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What framework aligns strategic business goals with key results over time?',
    answer: 'KPI',
    explanation: 'Objectives and Key Results (OKRs) link ambitious strategic outcomes with measurable quantitative metrics.'
  },
  {
    id: 'tm-data-14',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What leading metric measures early operational activity to predict future outcomes?',
    answer: 'KPI',
    explanation: 'Leading indicators track preliminary activities (e.g. sales calls) to forecast lagging results (revenue).'
  },
  {
    id: 'tm-data-15',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What metric evaluates overall customer satisfaction based on recommendation likelihood?',
    answer: 'KPI',
    explanation: 'Net Promoter Score (NPS) measures customer loyalty by subtracting detractors from promoters on a 0–10 scale.'
  },
  {
    id: 'tm-data-16',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What unsupervised clustering algorithm partitions customer data into k distinct clusters?',
    answer: 'Customer Segmentation',
    explanation: 'K-Means clustering minimizes intra-cluster Euclidean variance to partition observation matrices into k centroids.'
  },
  {
    id: 'tm-data-17',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What framework categorizes customer value using Recency, Frequency, and Monetary metrics?',
    answer: 'Customer Segmentation',
    explanation: 'RFM analysis scores customer segments by transaction recency, frequency of purchases, and monetary spend.'
  },
  {
    id: 'tm-data-18',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What survival analysis model estimates hazard rates to identify cancellation risks?',
    answer: 'Churn Analysis',
    explanation: 'Survival analysis estimates cumulative hazard rates and customer survival curves over tenure durations.'
  },
  {
    id: 'tm-data-19',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What predictive approach calculates customer retention probabilities to trigger automated re-engagement?',
    answer: 'Churn Analysis',
    explanation: 'Churn propensity modeling predicts defection likelihood to orchestrate targeted customer retention offers.'
  },
  {
    id: 'tm-data-20',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What cohort visualization tracks user group retention rates over consecutive intervals?',
    answer: 'Churn Analysis',
    explanation: 'Cohort retention heatmaps track decay curves of user cohorts acquired during identical calendar cycles.'
  },
  {
    id: 'tm-data-21',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What p-value threshold indicates probability that conversion differences occurred by chance?',
    answer: 'A/B Testing',
    explanation: 'Statistical significance thresholds (typically p < 0.05) reject null hypotheses in randomized split tests.'
  },
  {
    id: 'tm-data-22',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What sample size calculation determines minimum traffic required for statistical significance?',
    answer: 'A/B Testing',
    explanation: 'Statistical power calculations compute required sample volumes given baseline conversion and minimum detectable effect.'
  },
  {
    id: 'tm-data-23',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What statistical error occurs when an experiment falsely claims a variant won?',
    answer: 'A/B Testing',
    explanation: 'Type I error (false positive) occurs when random variance is mistaken for a statistically significant treatment effect.'
  },
  {
    id: 'tm-data-24',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What formula combines average order value, purchase frequency, and churn rate?',
    answer: 'CLV',
    explanation: 'Customer Lifetime Value (CLV) projects future net profit attributed to the entire relationship with a customer.'
  },
  {
    id: 'tm-data-25',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What discount calculation incorporates time value of money when projecting future cash flows?',
    answer: 'CLV',
    explanation: 'Discounted Cash Flow (DCF) models adjust future customer cash contributions using weighted capital discount rates.'
  },
  {
    id: 'tm-data-26',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What capital metric calculates the discount rate making Net Present Value zero?',
    answer: 'ROI',
    explanation: 'Internal Rate of Return (IRR) is the hurdle discount rate at which total discounted inflows equal capital outflows.'
  },
  {
    id: 'tm-data-27',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What financial metric calculates the duration needed to recover initial investment costs?',
    answer: 'ROI',
    explanation: 'Payback Period calculates the elapsed time required for cumulative project returns to recoup initial expenditure.'
  },
  {
    id: 'tm-data-28',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What multivariate chart displays quantitative data across x-axis, y-axis, and bubble size?',
    answer: 'Data Visualization',
    explanation: 'Bubble charts plot three numerical dimensions simultaneously using horizontal coordinate, vertical coordinate, and area.'
  },
  {
    id: 'tm-data-29',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What plot displays median, quartiles, and statistical outliers across numerical distributions?',
    answer: 'Data Visualization',
    explanation: 'Box-and-whisker plots display interquartile ranges, median lines, and outlier points across groups.'
  },
  {
    id: 'tm-data-30',
    dimension: 'ANALYTICS',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What graphical technique uses color intensity gradients to display matrix values?',
    answer: 'Data Visualization',
    explanation: 'Heatmaps map numerical matrix values to chromatic gradient palettes, highlighting density concentrations.'
  },

  // ==========================================
  // DIMENSION O: EMERGING TECHNOLOGY ZONE (30 Questions)
  // ==========================================
  {
    id: 'tm-emg-01',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What consensus algorithm requires network nodes to stake crypto assets as collateral?',
    answer: 'Blockchain',
    explanation: 'Proof of Stake (PoS) validators bond tokens as economic collateral to propose and validate blocks.'
  },
  {
    id: 'tm-emg-02',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What self-executing contract stored on a blockchain enforces agreement terms automatically?',
    answer: 'Blockchain',
    explanation: 'Smart contracts execute deterministic logic on decentralized virtual machines when programmed conditions are met.'
  },
  {
    id: 'tm-emg-03',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What data structure uses binary trees of hashes to verify transaction integrity?',
    answer: 'Blockchain',
    explanation: 'Merkle trees summarize transaction sets into a single root cryptographic hash for tamper-proof verification.'
  },
  {
    id: 'tm-emg-04',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What lightweight publish-subscribe protocol is optimized for low-bandwidth smart devices?',
    answer: 'IoT',
    explanation: 'MQTT (Message Queuing Telemetry Transport) minimizes network overhead on resource-constrained microcontrollers.'
  },
  {
    id: 'tm-emg-05',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What architecture processes telemetry locally on smart gateways near sensors?',
    answer: 'IoT',
    explanation: 'Edge computing filters and analyzes raw sensor telemetry on local gateways, reducing cloud transmission latency.'
  },
  {
    id: 'tm-emg-06',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What virtual digital replica mirrors physical hardware assets in real time?',
    answer: 'IoT',
    explanation: 'Digital twins stream live telemetry from physical devices to execute real-time predictive failure analysis.'
  },
  {
    id: 'tm-emg-07',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What monitoring process detects input data distribution shifts that degrade model accuracy?',
    answer: 'MLOps',
    explanation: 'Data drift and concept drift monitoring trigger retraining pipelines when inference distributions diverge from training sets.'
  },
  {
    id: 'tm-emg-08',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What central repository manages and serves curated features for real-time inference?',
    answer: 'MLOps',
    explanation: 'Feature stores (like Feast or Hopsworks) guarantee consistent feature definitions across training and online serving.'
  },
  {
    id: 'tm-emg-09',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What deployment pattern routes traffic to multiple model versions to compare performance?',
    answer: 'MLOps',
    explanation: 'Shadow deployments and champion/challenger routing compare live prediction performance without impacting users.'
  },
  {
    id: 'tm-emg-10',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What feature connects visual low-code interfaces to custom REST web services?',
    answer: 'Low Code',
    explanation: 'Custom connectors wrap OpenAPI schemas to expose external endpoints directly to drag-and-drop builders.'
  },
  {
    id: 'tm-emg-11',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What governance framework manages security permissions and lifecycles for low-code apps?',
    answer: 'Low Code',
    explanation: 'Center of Excellence (CoE) governance toolkits enforce DLP policies and manage ALM lifecycles for citizen developers.'
  },
  {
    id: 'tm-emg-12',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What visual engine models business logic step-by-step using flowchart decision nodes?',
    answer: 'Low Code',
    explanation: 'Visual workflow designers orchestrate conditional branches, looping logic, and approvals through connected node graphs.'
  },
  {
    id: 'tm-emg-13',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What visual database modeling approach defines table schemas without SQL code?',
    answer: 'No Code',
    explanation: 'Visual relational data modelers define field types, foreign keys, and lookups via graphical schema editors.'
  },
  {
    id: 'tm-emg-14',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What integration platform connects separate SaaS apps via webhooks without programming?',
    answer: 'No Code',
    explanation: 'Integration Platforms as a Service (iPaaS like Zapier and Make) route trigger events between cloud apps via webhooks.'
  },
  {
    id: 'tm-emg-15',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What responsive UI container adjusts component layout across mobile and desktop displays?',
    answer: 'No Code',
    explanation: 'Flexbox and auto-layout containers dynamically restack visual elements across varying viewport breakpoints.'
  },
  {
    id: 'tm-emg-16',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What technology combines OCR with deep learning to extract data from invoices?',
    answer: 'Intelligent Automation',
    explanation: 'Intelligent Document Processing (IDP) extracts and normalizes semi-structured data from PDFs and scans.'
  },
  {
    id: 'tm-emg-17',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What bot automation approach executes front-end UI interactions without changing backend systems?',
    answer: 'Intelligent Automation',
    explanation: 'RPA surface automation navigates legacy client GUI software by simulating mouse coordinates and keyboard keystrokes.'
  },
  {
    id: 'tm-emg-18',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What process mining technique analyzes event logs to map workflow bottlenecks?',
    answer: 'Intelligent Automation',
    explanation: 'Process mining algorithms reconstruct digital process graphs from enterprise system timestamp logs to expose delays.'
  },
  {
    id: 'tm-emg-19',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What contextual window allows coding assistants to examine open project files for completions?',
    answer: 'Copilot',
    explanation: 'Expanded LLM context windows ingest open files, dependency imports, and cursor location to suggest accurate syntax.'
  },
  {
    id: 'tm-emg-20',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What inline developer feature allows programmers to request automated refactoring via chat?',
    answer: 'Copilot',
    explanation: 'Inline interactive coding assistants refactor functions and generate documentation directly inside the code editor.'
  },
  {
    id: 'tm-emg-21',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What security filter prevents AI assistants from outputting protected open-source snippets?',
    answer: 'Copilot',
    explanation: 'Public code filters perform string-matching checks to block literal verbatim generation of copyrighted code repositories.'
  },
  {
    id: 'tm-emg-22',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What search architecture combines sparse lexical scores with dense vector semantic scores?',
    answer: 'Semantic Search',
    explanation: 'Hybrid semantic search blends keyword invert-indexes (sparse) with Transformer embedding projections (dense).'
  },
  {
    id: 'tm-emg-23',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What NLU model generates dense vector embeddings that encode whole sentence intent?',
    answer: 'Semantic Search',
    explanation: 'Bi-encoder models (like Sentence-BERT) encode complete sentence strings into fixed-length semantic embedding vectors.'
  },
  {
    id: 'tm-emg-24',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What re-ranking mechanism evaluates search results using deep cross-attention models?',
    answer: 'Semantic Search',
    explanation: 'Cross-encoders compute full pairwise cross-attention between queries and candidate documents for high-precision ranking.'
  },
  {
    id: 'tm-emg-25',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What joint embedding architecture maps images and text into a shared vector space?',
    answer: 'Multimodal AI',
    explanation: 'CLIP (Contrastive Language-Image Pre-training) trains paired image and text encoders on contrastive alignment objectives.'
  },
  {
    id: 'tm-emg-26',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What vision-language architecture accepts image and text inputs to answer visual questions?',
    answer: 'Multimodal AI',
    explanation: 'Visual Language Models (VLMs) project image patch embeddings into LLM token spaces to reason over diagrams and photos.'
  },
  {
    id: 'tm-emg-27',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What cross-modal fusion strategy combines visual feature maps and audio spectrum embeddings?',
    answer: 'Multimodal AI',
    explanation: 'Cross-attention fusion mechanisms interleave latent representations across sensory modalities in multimodal networks.'
  },
  {
    id: 'tm-emg-28',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What quantum phenomenon binds two qubits so one state dictates the other?',
    answer: 'Quantum Computing',
    explanation: 'Quantum entanglement links particle wavefunctions such that measuring one qubit determines its entangled partner instantaneously.'
  },
  {
    id: 'tm-emg-29',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What quantum principle allows qubits to exist in 0 and 1 states simultaneously?',
    answer: 'Quantum Computing',
    explanation: 'Superposition enables qubits to occupy linear combinations of orthogonal basis states simultaneously.'
  },
  {
    id: 'tm-emg-30',
    dimension: 'EMERGING TECH',
    character: 'Miss Minutes',
    characterType: 'female',
    clue: 'What quantum algorithm provides quadratic speedup for searching unstructured databases?',
    answer: 'Quantum Computing',
    explanation: "Grover's algorithm locates target entries in unstructured databases of size N in O(sqrt(N)) quantum evaluations."
  }
];
