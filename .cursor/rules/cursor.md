# AI Development Protocol for the LinkUp Application

## 1. Core Development Philosophy

- **Primacy of the PRD**: The Project Requirements Document (PRD) is the absolute source of truth. Do not deviate from the specified technology stack, features, or architecture without explicit permission. Your primary goal is to implement the PRD exactly as written.
- **Incremental and Sequential Implementation**: Do not attempt to build the entire application at once. Follow the development phases outlined in the PRD sequentially. Complete and verify each step before moving to the next.
- **No Assumptions**: If a requirement is ambiguous or a technical detail is missing from the PRD, do not make an assumption. Stop and ask for clarification. State what information you need to proceed.
- **Verbosity in Explanation**: Before writing a block of code, briefly explain what it will do and how it fits into the current step. After writing it, confirm that the step is complete.

---

## 2. Environment and Tooling Protocol

- **Strict Version Adherence**: All development must use the exact major versions of the technologies specified in the PRD to prevent compatibility issues.
  - **Node.js**: `18.x`
  - **React**: `18.x`
  - **PostgreSQL**: `14.x` or higher
  - **Prisma**: Latest stable version
- **Configuration Files**: For every project (frontend, backend), create and maintain configuration files to enforce consistency.
  - **`package.json`**: All dependencies must have fixed versions (e.g., `"react": "18.2.0"`) instead of using carets (`^`) or tildes (`~`).
  - **`.nvmrc`**: Create this file in the root of the backend project with the content `v18` to enforce the Node.js version.
  - **`tsconfig.json`**: The `compilerOptions` must have `"strict": true` enabled. No exceptions.

---

## 3. Code Generation Protocol

- **TypeScript Everywhere**: All code, both frontend and backend, must be written in TypeScript. The `any` type is strictly forbidden. Define explicit types, interfaces, or enums for all data structures, function parameters, and API responses.
- **File Structure**: Adhere to the file structures outlined in the PRD. Do not create new directories or alternative structures without a clear, stated reason.
- **Naming Conventions**:
  - **Components**: `PascalCase` (e.g., `ProfileCard.tsx`)
  - **Functions/Variables**: `camelCase` (e.g., `getUserProfile`)
  - **Types/Interfaces**: `PascalCase` (e.g., `interface UserProfile`)
- **Modularity and Single Responsibility**: Keep components and functions small and focused on a single task. A component should not fetch data, manage complex state, *and* handle UI logic. Break it down into container components (logic) and presentational components (UI).
- **Environment Variables**: Absolutely no hardcoding of API keys, secrets, database URLs, or domain names. All such values must be accessed via environment variables (`process.env`). Create an `.env.example` file in both the frontend and backend directories to document all required variables.
- **Documentation (JSDoc)**: All functions, component props interfaces, and complex logic must be documented using JSDoc-style comments.
  ```typescript
  /**
   * Fetches a user's profile from the database.
   * @param userId - The UUID of the user to fetch.
   * @returns A promise that resolves to the user's profile or null if not found.
   */
  async function getUserProfile(userId: string): Promise<UserProfile | null> {
    // ... implementation
  }

### **Part 2 of 2**

```markdown
---

## 4. API, Library, and State Management Protocol

- **API Interaction**:
  - All external API calls must be centralized in a dedicated "services" layer (e.g., `src/services/linkedinService.ts`). Components should not make direct API calls.
  - Use Axios for all HTTP requests. Configure an Axios instance with base URLs and interceptors to handle JWT token injection into headers and centrally manage API errors (like 401 Unauthorized or 500 Internal Server Error).
- **Redux Toolkit (RTK)**:
  - Adhere strictly to the "slice" pattern for state management.
  - All asynchronous logic (data fetching) must be handled using `createAsyncThunk`.
  - Never mutate state directly. Rely exclusively on the Immer integration within RTK by returning new state from reducers.
  - Use `RTK Query` for caching, re-fetching, and invalidating server data wherever possible to simplify data-fetching logic.

---

## 5. Error Handling and Looping Debug Protocol

- **Comprehensive Error Handling**: Wrap all asynchronous operations, API calls, and potentially problematic synchronous code in `try...catch` blocks.
- **User-Facing Errors**: Never expose raw system errors to the user. Catch the error, log it for the developer, and show a user-friendly message (e.g., "Could not load profile. Please try again later.").
- **Logging**: Use `console.log` for debugging during development but ensure all critical errors are also sent to a monitoring service like Sentry.
- **Anti-Looping Debug Protocol**: You must adhere to this protocol if a bug fix is not successful on the first attempt.
  1.  **Stop**: Do not try a second, third, or fourth variation of the same fix.
  2.  **Summarize**: Clearly state the problem you are trying to solve.
  3.  **Report**: Detail the exact fix you just attempted and why you thought it would work.
  4.  **Analyze**: Explain why you believe the fix did not work. This must include the error message received or the incorrect behavior observed.
  5.  **Request Guidance**: Ask the developer for guidance. Present 1-2 alternative strategies if possible, but await confirmation before proceeding. This prevents repetitive, non-productive debugging loops.

---

## 6. Anti-Hallucination and Verification Protocol

- **No New Features**: Do not invent features or functionalities not specified in the PRD. For example, do not add a "Sign in with Google" option or a "dark mode" toggle unless explicitly asked.
- **Verify Library Features**: Before using a feature from a library (e.g., a specific function from `Framer Motion`), state the feature you are using. If you are unsure if it exists in the specified version, check the official documentation or ask the developer to confirm.
- **Declare Assumptions**: If you must make a minor assumption to proceed, you must declare it in a comment right above the relevant code block.
  ```typescript
  // ASSUMPTION: The `user` object from the auth middleware includes a `datingProfile` object.
  // If this is null for new users, this code will need a null check.
  const interests = req.user.datingProfile.interests;

---

## 6. Anti-Hallucination and Verification Protocol

- **No New Features**: Do not invent features or functionalities not specified in the PRD. For example, do not add a "Sign in with Google" option or a "dark mode" toggle unless explicitly asked.

- **Verify Library Features**: Before using a feature from a library (e.g., a specific function from `Framer Motion`), state the feature you are using. If you are unsure if it exists in the specified version, check the official documentation or ask the developer to confirm.

- **Declare Assumptions**: If you must make a minor assumption to proceed, you must declare it in a comment right above the relevant code block.
  ```typescript
  // ASSUMPTION: The `user` object from the auth middleware includes a `datingProfile` object.
  // If this is null for new users, this code will need a null check.
  const interests = req.user.datingProfile.interests;
