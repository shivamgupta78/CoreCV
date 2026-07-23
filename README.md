# 🚀 CoreCV - AI-Powered Resume & Interview Preparation Platform

**CoreCV** is an advanced full-stack AI platform designed to bridge the gap between job application and interview preparation. Powered by Google's **Gemini 2.5 Flash API**, CoreCV converts raw candidate data into job-tailored, single-page printable PDF resumes while generating deeply detailed, personalized technical & behavioral interview preparation reports.

🚀 **Live Production Deployment:** [https://core-cv.vercel.app](https://core-cv.vercel.app)

---

## 📸 Core UI Visuals & Dashboard Preview

### 1. User Simple Home Page (Introduction to website)
![Platform Home Page](https://raw.githubusercontent.com/shivamgupta78/CoreCV/refs/heads/main/frontend/public/home.png)

### 2. Unified Identity Gateway (Secure Login / Signup Portal)
![Authentication Interface - Signup](https://raw.githubusercontent.com/shivamgupta78/CoreCV/refs/heads/main/frontend/public/signup.png)

![Authentication Interface - Login](https://raw.githubusercontent.com/shivamgupta78/CoreCV/refs/heads/main/frontend/public/login.png)

*An intelligent routing checkpoint that strictly forces validation tokens before exposing core user dashboard interfaces.*

### 3. Analytical Workspace & Input Workspace (Job Description & Resume Upload)
![Platform Home Workspace](https://raw.githubusercontent.com/shivamgupta78/CoreCV/refs/heads/main/frontend/public/dashboard.png)

*A streamlined dual-panel interface for pasting target job descriptions, uploading current resume files, or providing self-descriptions.*

### 4. AI Interview Preparation Report & Dashboard
![AI Interview Report Console](https://raw.githubusercontent.com/shivamgupta78/CoreCV/refs/heads/main/frontend/public/interview.png)

*A multi-column analytical dashboard featuring job match score evaluation, targeted technical & behavioral questions, skill gap analysis, and a day-wise prep roadmap.*

---

## ✨ Comprehensive Architectural Features

### 📄 1. Smart Resume Generator & Single-Page PDF Engine
* **AI-Driven HTML Construction:** Leverages Google Gemini 2.5 Flash API to parse candidate details and generate compact, ATS-friendly HTML layouts tailored to specific target Job Descriptions (JD).
* **Strict Single-Page Engine:** Built with strict CSS constraints (`@page`, `A4 portrait`, explicit line-heights) ensuring resume content fits cleanly on a single page without multi-page spilling.
* **Serverless PDF Rendering:** Employs **Puppeteer Core** paired with **`@sparticuz/chromium`** on Render for lightweight, error-free headless Chrome PDF rendering in cloud/production environments.

### 🎯 2. AI-Powered Interview Preparation Workspace
* **Algorithmic Match Score:** Calculates candidate profile relevance against job descriptions with visual severity rings (`High`, `Mid`, `Low`).
* **Targeted Technical & Behavioral Q&A:** Generates prospective questions, interviewer intentions, and optimal response strategies tailored to candidate gaps.
* **Skill Gap Analysis:** Categorizes technical weaknesses by severity levels (`high`, `medium`, `low`) to guide efficient study sessions.
* **Day-Wise Preparation Roadmap:** Outlines a structured, step-by-step preparation schedule for cracking upcoming technical rounds.

### 🔐 3. Hardened Authentication & Token Lifecycle
* **Cryptographic Security:** Integrated **BCrypt.js** to enforce one-way asynchronous password hashing before storing credentials in MongoDB schemas.
* **Secure Session Management:** Multi-tiered session tracking powered by stateless **JSON Web Tokens (JWT)** distributed dynamically across client and server endpoints.
* **CORS & Cookie Policies:** Strict Cross-Origin Resource Sharing configurations paired with `HttpOnly`, `Secure`, and `SameSite` options to prevent XSS and CSRF vulnerability risks.

### 📱 4. Mobile-Responsive SCSS & SPA Routing
* **Responsive Layout Design:** Built with SCSS media queries ensuring seamless responsiveness across mobile devices, tablets, and desktop workstations.
* **Client-Side Routing Fix:** Configured with `vercel.json` rewrites to prevent single-page application (SPA) `404 NOT_FOUND` errors on page refresh.

---

## 🏗️ Core Technology Stack

| Architecture Layer | Core Frameworks / Services Used | Purpose & System Role |
| :--- | :--- | :--- |
| **Frontend UI/UX** | React.js (v18+), Tailwind CSS, SCSS, React Router DOM | Dynamic single page state machine & responsive component rendering. |
| **Backend Core** | Node.js, Express.js Framework | RESTful routing API layer, validation pipelines, and serverless invocations. |
| **AI Engine** | Google Gen AI SDK (`@google/genai` - Gemini 2.5 Flash) | Generates structured JSON interview reports and tailored single-page HTML resumes. |
| **PDF Rendering Engine** | Puppeteer Core + `@sparticuz/chromium` | Converts dynamic HTML code into high-fidelity A4 downloadable PDF buffers. |
| **Database System** | MongoDB Atlas (Mongoose ODM layer) | Document-oriented archival system storing user profiles and past interview reports. |
| **Hosting Infrastructure** | Vercel (Frontend) & Render (Backend) | Continuous deployment architecture hosting client assets and cloud server endpoints. |

---

## ⚙️ Detailed Production & Local Setup Manual

Follow these steps to initialize fully operational server instances locally or in cloud environments:

### 📥 Step 1: Clone Repository
Clone the codebase package locally and navigate into the project directory:
```bash
git clone [https://github.com/shivamgupta78/CoreCV.git](https://github.com/shivamgupta78/CoreCV.git)
cd CoreCV
```

Markdown
# ⚙️ Step 2: Configure and Boot Node.js Application Server (Backend)

1. Route directly into the server cluster root path:
```bash
   cd backend
```
1 . Install the necessary development dependencies and micro-service binaries locked inside the package manager manifest:

```Bash
npm install
```

# 2. Establish a standard configuration file named .env inside the backend directory root and fulfill the variables precisely:

```bash
Code snippet

PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/catcode?retryWrites=true&w=majority

JWT_SECRET=your_ultra_secure_long_signature_cryptographic_key_phrase

REDIS_URL=redis://default:<password>@your-redis-endpoint-domain.cloud.redislabs.com:12345

NODE_ENV=development
```



3. Fire up the local monitoring server module to observe request streams via active logging:

```bash
npm start
```

# 🎨 Step 3: Configure and Initialize Client Interface Engine (Frontend)
1. **Open up a secondary split console panel and position yourself directly inside the user interface cluster directory**

```bash
cd ../frontend
```

2. Unpack and resolve all visual nodes and core system node modules:

```Bash
npm install
```
3. Create a .env file in the frontend root directory:

4. Initialize the environment blueprint by defining a local variable sheet named .env.local to point towards your active server cluster endpoint:
```bash
Code snippet

VITE_BACKEND_API_URL=http://localhost:5000
```

5. Fire up the high-speed local build server engine to run and test the complete application client:

```bash
npm run dev
```