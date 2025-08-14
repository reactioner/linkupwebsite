---
inclusion: fileMatch
fileMatchPattern: '*.{ts,tsx,js,jsx,json}'
---

# LinkUp Development Standards

## Code Quality Standards
- Always use TypeScript strict mode
- Implement comprehensive error handling with try-catch blocks
- Use exact dependency versions (no ^ or ~ in package.json)
- Follow consistent naming conventions (camelCase for variables, PascalCase for components)
- Add JSDoc comments for complex functions and API endpoints

## Security Requirements
- Never commit API keys or secrets to version control
- Use environment variables for all configuration
- Implement rate limiting on all API endpoints
- Validate all user inputs with Yup or Zod
- Use JWT tokens with proper expiration and blacklisting

## Database Best Practices
- Use Prisma migrations for all schema changes
- Implement proper database indexes for performance
- Separate LinkedIn data (immutable) from dating profile data (mutable)
- Use transactions for multi-table operations
- Include audit trails for sensitive operations

## API Design Principles
- RESTful endpoints with consistent naming
- Proper HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- Comprehensive error responses with meaningful messages
- API versioning strategy (/api/v1/)
- Request/response logging for debugging