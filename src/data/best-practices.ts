export interface BestPractice {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: number;
  icon: string;
  tags: string[];
  checklist: string[];
  resources: { title: string; url: string }[];
}

export const practiceCategories = [
  'All Practices',
  'Test Strategy',
  'Automation',
  'Manual Testing',
  'API Testing',
  'Performance',
  'Security',
  'Mobile Testing',
  'Team Management',
];

export const bestPractices: BestPractice[] = [
  {
    id: '1',
    slug: 'test-automation-framework-design',
    title: 'Designing a Scalable Test Automation Framework',
    excerpt:
      'Learn how to build a robust, maintainable test automation framework that scales with your application and team.',
    category: 'Automation',
    difficulty: 'Advanced',
    readTime: 12,
    icon: 'Settings',
    tags: ['Framework', 'Architecture', 'Scalability', 'Best Practices'],
    checklist: [
      'Define clear framework objectives and success criteria',
      'Choose appropriate tools and technologies',
      'Implement modular architecture with reusable components',
      'Set up proper reporting and logging mechanisms',
      'Create comprehensive documentation',
      'Establish coding standards and review processes',
      'Implement CI/CD integration',
      'Plan for framework maintenance and updates',
    ],
    resources: [
      { title: 'Selenium Documentation', url: '#' },
      { title: 'Page Object Model Pattern', url: '#' },
    ],
    content: `
# Designing a Scalable Test Automation Framework

A well-designed test automation framework is the foundation of successful test automation efforts. This guide walks you through the essential components and best practices for building a framework that will serve your team for years to come.

## Framework Architecture Principles

### 1. Modularity and Reusability

Your framework should be built on modular components that can be reused across different test scenarios. This reduces code duplication and makes maintenance significantly easier.

**Key components to modularize:**
- Page objects or screen objects
- Common utilities and helpers
- Test data management
- Configuration management
- Reporting mechanisms

### 2. Separation of Concerns

Keep test logic separate from framework infrastructure. Tests should focus on business logic while the framework handles technical details like browser management, waits, and reporting.

\`\`\`javascript
// Good: Test focuses on business logic
test('User can complete checkout', () => {
  loginPage.login(user.email, user.password);
  productPage.addToCart('Product Name');
  checkoutPage.completeCheckout(paymentDetails);
  expect(confirmationPage.isOrderConfirmed()).toBe(true);
});

// Bad: Test mixed with technical details
test('User can complete checkout', () => {
  driver.findElement(By.id('email')).sendKeys(user.email);
  driver.findElement(By.id('password')).sendKeys(user.password);
  // ... lots of technical implementation
});
\`\`\`

## Essential Framework Components

### 1. Test Runner Integration

Choose a test runner that fits your team's needs:
- **Jest/Mocha**: Great for JavaScript/TypeScript projects
- **pytest**: Excellent for Python
- **JUnit/TestNG**: Standard for Java
- **NUnit**: Popular for .NET

### 2. Page Object Model (POM)

Implement POM or similar patterns to create a clear abstraction layer between tests and UI.

\`\`\`typescript
export class LoginPage {
  private emailInput = '#email';
  private passwordInput = '#password';
  private loginButton = '[data-testid="login-btn"]';

  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return await this.page.textContent('.error-message');
  }
}
\`\`\`

### 3. Configuration Management

Centralize all configuration in easily accessible files:

\`\`\`json
{
  "environments": {
    "dev": {
      "baseUrl": "https://dev.example.com",
      "apiUrl": "https://api-dev.example.com"
    },
    "staging": {
      "baseUrl": "https://staging.example.com",
      "apiUrl": "https://api-staging.example.com"
    }
  },
  "timeouts": {
    "default": 5000,
    "extended": 30000
  },
  "browsers": ["chrome", "firefox", "safari"]
}
\`\`\`

### 4. Smart Waits and Synchronization

Implement intelligent waiting mechanisms:

\`\`\`typescript
export class WaitHelper {
  static async waitForElement(
    selector: string,
    timeout: number = 5000
  ) {
    await page.waitForSelector(selector, { 
      timeout,
      state: 'visible' 
    });
  }

  static async waitForApiResponse(url: string) {
    await page.waitForResponse(
      response => response.url().includes(url) && response.status() === 200
    );
  }
}
\`\`\`

## Data Management Strategies

### 1. Test Data Separation

Keep test data separate from test code:
- Use JSON, CSV, or database files
- Implement data builders or factories
- Use environment-specific data sets

\`\`\`typescript
// testData/users.json
{
  "validUser": {
    "email": "valid@example.com",
    "password": "ValidPass123!"
  },
  "adminUser": {
    "email": "admin@example.com",
    "password": "AdminPass123!"
  }
}

// Usage in tests
import users from '../testData/users.json';

test('Admin can access dashboard', () => {
  loginPage.login(users.adminUser.email, users.adminUser.password);
  expect(dashboardPage.isVisible()).toBe(true);
});
\`\`\`

### 2. Dynamic Data Generation

For scenarios requiring unique data, implement data generators:

\`\`\`typescript
export class UserDataBuilder {
  private user: Partial<User> = {};

  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  withRandomEmail(): this {
    this.user.email = \`test-\${Date.now()}@example.com\`;
    return this;
  }

  build(): User {
    return {
      email: this.user.email || this.withRandomEmail().user.email,
      password: this.user.password || 'DefaultPass123!',
      // ... other fields
    };
  }
}

// Usage
const newUser = new UserDataBuilder()
  .withRandomEmail()
  .build();
\`\`\`

## Reporting and Logging

### 1. Comprehensive Test Reports

Implement detailed reporting that provides:
- Test execution summary
- Pass/fail status with percentages
- Execution time metrics
- Screenshots for failures
- Step-by-step test logs

### 2. Integration with CI/CD

Ensure reports are automatically generated and accessible in your CI/CD pipeline:
- HTML reports for human consumption
- JSON/XML reports for tool integration
- Real-time reporting for continuous feedback

## Error Handling and Recovery

### 1. Graceful Failure Handling

\`\`\`typescript
export async function safeClick(selector: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.click(selector);
      return;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await page.waitForTimeout(1000);
      console.log(\`Retry \${i + 1} for clicking \${selector}\`);
    }
  }
}
\`\`\`

### 2. Screenshot and Video Capture

Automatically capture evidence when tests fail:

\`\`\`typescript
afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { 
      body: screenshot, 
      contentType: 'image/png' 
    });
  }
});
\`\`\`

## Maintenance Best Practices

### 1. Regular Refactoring

Schedule time for framework maintenance:
- Remove duplicate code
- Update dependencies
- Optimize slow tests
- Remove obsolete tests

### 2. Version Control

- Use semantic versioning
- Maintain a changelog
- Document breaking changes
- Provide migration guides

### 3. Code Reviews

Implement peer review for:
- New test additions
- Framework changes
- Utility function updates

## Performance Optimization

### 1. Parallel Execution

Run tests in parallel to reduce execution time:

\`\`\`typescript
// playwright.config.ts
export default {
  workers: 4, // Number of parallel workers
  fullyParallel: true,
};
\`\`\`

### 2. Test Isolation

Ensure tests can run independently:
- No shared state between tests
- Clean test data after each run
- Independent test environments

## Conclusion

Building a scalable test automation framework requires careful planning, solid architecture, and ongoing maintenance. Focus on creating modular, maintainable code that serves your team's needs while remaining flexible enough to adapt to changing requirements.

Remember: The best framework is one that your team actually uses and maintains. Start simple, iterate based on real needs, and always prioritize maintainability over clever solutions.
`,
  },
  {
    id: '2',
    slug: 'api-testing-complete-guide',
    title: 'API Testing: A Complete Guide to Best Practices',
    excerpt:
      'Master API testing with comprehensive strategies covering everything from basic validation to advanced security testing.',
    category: 'API Testing',
    difficulty: 'Intermediate',
    readTime: 10,
    icon: 'Zap',
    tags: ['API', 'REST', 'Testing', 'Automation'],
    checklist: [
      'Understand API specifications (OpenAPI/Swagger)',
      'Set up proper test environment and tools',
      'Create comprehensive test data sets',
      'Validate response status codes',
      'Verify response schemas and data types',
      'Test error handling and edge cases',
      'Implement authentication and authorization tests',
      'Monitor API performance and response times',
    ],
    resources: [
      { title: 'Postman Learning Center', url: '#' },
      { title: 'REST API Tutorial', url: '#' },
    ],
    content: `
# API Testing: A Complete Guide to Best Practices

API testing is critical for ensuring the reliability, performance, and security of modern applications. This comprehensive guide covers everything you need to know to implement effective API testing.

## Understanding API Testing Fundamentals

### What to Test in APIs

1. **Functionality**: Does the API do what it's supposed to do?
2. **Reliability**: Does it work consistently?
3. **Performance**: Is it fast enough?
4. **Security**: Is it protected against threats?

## Types of API Testing

### 1. Functional Testing

Verify that API endpoints return correct responses for valid inputs.

\`\`\`javascript
describe('User API', () => {
  test('GET /users/:id returns user details', async () => {
    const response = await api.get('/users/123');
    
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      id: '123',
      email: expect.any(String),
      name: expect.any(String),
    });
  });

  test('POST /users creates new user', async () => {
    const newUser = {
      email: 'newuser@example.com',
      name: 'New User',
      password: 'SecurePass123!',
    };

    const response = await api.post('/users', newUser);
    
    expect(response.status).toBe(201);
    expect(response.data.id).toBeDefined();
    expect(response.data.email).toBe(newUser.email);
  });
});
\`\`\`

### 2. Validation Testing

Ensure the API validates inputs correctly and rejects invalid data.

\`\`\`javascript
describe('Input Validation', () => {
  test('Rejects invalid email format', async () => {
    const invalidUser = {
      email: 'not-an-email',
      name: 'Test User',
    };

    const response = await api.post('/users', invalidUser);
    
    expect(response.status).toBe(400);
    expect(response.data.errors).toContain('Invalid email format');
  });

  test('Requires mandatory fields', async () => {
    const incompleteUser = { name: 'Test User' };
    
    const response = await api.post('/users', incompleteUser);
    
    expect(response.status).toBe(400);
    expect(response.data.errors).toContain('Email is required');
  });
});
\`\`\`

### 3. Security Testing

Test authentication, authorization, and data protection.

\`\`\`javascript
describe('API Security', () => {
  test('Requires authentication for protected endpoints', async () => {
    const response = await api.get('/admin/users');
    
    expect(response.status).toBe(401);
  });

  test('Validates JWT token', async () => {
    const invalidToken = 'invalid.jwt.token';
    const response = await api.get('/admin/users', {
      headers: { Authorization: \`Bearer \${invalidToken}\` },
    });
    
    expect(response.status).toBe(401);
  });

  test('Prevents unauthorized access', async () => {
    const userToken = await getToken('user@example.com');
    const response = await api.delete('/admin/users/123', {
      headers: { Authorization: \`Bearer \${userToken}\` },
    });
    
    expect(response.status).toBe(403);
  });
});
\`\`\`

### 4. Performance Testing

Monitor response times and throughput.

\`\`\`javascript
describe('API Performance', () => {
  test('Responds within acceptable time', async () => {
    const startTime = Date.now();
    await api.get('/users');
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(500); // 500ms threshold
  });

  test('Handles concurrent requests', async () => {
    const requests = Array(100).fill(null).map(() => 
      api.get('/users')
    );
    
    const responses = await Promise.all(requests);
    
    const successCount = responses.filter(r => r.status === 200).length;
    expect(successCount).toBe(100);
  });
});
\`\`\`

## Schema Validation

Always validate response schemas to catch breaking changes early.

\`\`\`javascript
const Joi = require('joi');

const userSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  createdAt: Joi.date().iso().required(),
  role: Joi.string().valid('user', 'admin').required(),
});

test('User response matches schema', async () => {
  const response = await api.get('/users/123');
  
  const { error } = userSchema.validate(response.data);
  expect(error).toBeUndefined();
});
\`\`\`

## Error Handling Best Practices

### Test All Error Scenarios

\`\`\`javascript
describe('Error Handling', () => {
  test('404 for non-existent resources', async () => {
    const response = await api.get('/users/nonexistent');
    
    expect(response.status).toBe(404);
    expect(response.data.message).toContain('User not found');
  });

  test('500 errors include error tracking ID', async () => {
    // Trigger server error scenario
    const response = await api.post('/users/trigger-error');
    
    expect(response.status).toBe(500);
    expect(response.data.errorId).toBeDefined();
  });

  test('Rate limiting returns 429', async () => {
    // Make requests exceeding rate limit
    for (let i = 0; i < 101; i++) {
      await api.get('/users');
    }
    
    const response = await api.get('/users');
    expect(response.status).toBe(429);
  });
});
\`\`\`

## Testing RESTful Conventions

### CRUD Operations

\`\`\`javascript
describe('RESTful CRUD Operations', () => {
  let createdUserId;

  test('CREATE: POST /users', async () => {
    const response = await api.post('/users', {
      email: 'crud@example.com',
      name: 'CRUD Test',
    });
    
    expect(response.status).toBe(201);
    createdUserId = response.data.id;
  });

  test('READ: GET /users/:id', async () => {
    const response = await api.get(\`/users/\${createdUserId}\`);
    
    expect(response.status).toBe(200);
    expect(response.data.email).toBe('crud@example.com');
  });

  test('UPDATE: PUT /users/:id', async () => {
    const response = await api.put(\`/users/\${createdUserId}\`, {
      name: 'Updated Name',
    });
    
    expect(response.status).toBe(200);
    expect(response.data.name).toBe('Updated Name');
  });

  test('DELETE: DELETE /users/:id', async () => {
    const response = await api.delete(\`/users/\${createdUserId}\`);
    
    expect(response.status).toBe(204);
  });

  test('Verify deletion', async () => {
    const response = await api.get(\`/users/\${createdUserId}\`);
    
    expect(response.status).toBe(404);
  });
});
\`\`\`

## Advanced Testing Patterns

### 1. Contract Testing

Ensure API contracts between services remain compatible.

\`\`\`javascript
const { Pact } = require('@pact-foundation/pact');

describe('User Service Contract', () => {
  const provider = new Pact({
    consumer: 'Frontend App',
    provider: 'User Service',
  });

  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  test('Get user by ID', async () => {
    await provider.addInteraction({
      state: 'user exists',
      uponReceiving: 'a request for user',
      withRequest: {
        method: 'GET',
        path: '/users/123',
      },
      willRespondWith: {
        status: 200,
        body: {
          id: '123',
          email: 'user@example.com',
        },
      },
    });

    // Test implementation
  });
});
\`\`\`

### 2. Data-Driven Testing

Test with multiple data sets efficiently.

\`\`\`javascript
const testCases = [
  { input: 'valid@email.com', expected: 200 },
  { input: 'invalid-email', expected: 400 },
  { input: '', expected: 400 },
  { input: 'a'.repeat(300) + '@email.com', expected: 400 },
];

describe.each(testCases)(
  'Email validation with $input',
  ({ input, expected }) => {
    test(\`returns status \${expected}\`, async () => {
      const response = await api.post('/users', { email: input });
      expect(response.status).toBe(expected);
    });
  }
);
\`\`\`

## Best Practices Summary

### 1. Environment Management

- Use separate environments (dev, staging, production)
- Store credentials securely (environment variables)
- Never commit API keys or secrets

### 2. Test Data Management

- Use factories or builders for test data
- Clean up test data after execution
- Use unique identifiers to avoid conflicts

### 3. Assertion Best Practices

- Be specific in assertions
- Test both positive and negative scenarios
- Validate complete response structure

### 4. Documentation

- Document all test scenarios
- Maintain API specification (OpenAPI/Swagger)
- Keep test documentation updated

### 5. Continuous Integration

- Run API tests in CI/CD pipeline
- Set up automated test execution
- Monitor test results and trends

## Conclusion

Effective API testing requires a combination of functional, security, and performance testing. By following these best practices and implementing comprehensive test coverage, you can ensure your APIs are reliable, secure, and performant.

Remember to continuously update your tests as your API evolves and always prioritize testing the most critical user journeys first.
`,
  },
  {
    id: '3',
    slug: 'effective-test-case-design',
    title: 'Writing Effective Test Cases: Templates and Techniques',
    excerpt:
      'Learn how to write clear, comprehensive test cases that actually catch bugs and are easy for team members to execute.',
    category: 'Manual Testing',
    difficulty: 'Beginner',
    readTime: 8,
    icon: 'FileText',
    tags: ['Test Cases', 'Documentation', 'Manual Testing'],
    checklist: [
      'Use clear, descriptive test case titles',
      'Write detailed preconditions and setup steps',
      'Include specific, measurable expected results',
      'Add test data requirements',
      'Categorize and prioritize test cases',
      'Link test cases to requirements',
      'Review and update test cases regularly',
      'Keep test cases atomic and independent',
    ],
    resources: [
      { title: 'Test Case Template', url: '#' },
      { title: 'ISTQB Guidelines', url: '#' },
    ],
    content: `
# Writing Effective Test Cases: Templates and Techniques

Well-written test cases are the backbone of quality assurance. This guide provides proven techniques and templates for creating test cases that are clear, comprehensive, and effective at catching bugs.

## What Makes a Good Test Case?

### Essential Characteristics

1. **Clear and Unambiguous**: Anyone should be able to execute it
2. **Traceable**: Linked to requirements and user stories
3. **Repeatable**: Produces consistent results
4. **Independent**: Can run without relying on other tests
5. **Maintainable**: Easy to update when requirements change

## Test Case Anatomy

### Standard Test Case Template

\`\`\`
Test Case ID: TC_LOGIN_001
Title: Verify successful login with valid credentials
Priority: High
Type: Functional
Module: Authentication

Preconditions:
- User account exists with email: test@example.com
- User account is active
- Browser is open at login page

Test Steps:
1. Enter "test@example.com" in email field
2. Enter valid password in password field
3. Click "Login" button

Expected Results:
1. User is redirected to dashboard
2. Welcome message displays user's name
3. Session token is stored in browser
4. User menu shows correct user information

Test Data:
- Email: test@example.com
- Password: ValidPass123!

Postconditions:
- User session is active
- User can access protected pages
\`\`\`

## Writing Techniques

### 1. Use Action-Oriented Language

**Good:**
- "Click the 'Submit' button"
- "Enter 'john@example.com' in the email field"
- "Verify that error message appears"

**Bad:**
- "The Submit button is clicked"
- "User should enter email"
- "Check if there's an error"

### 2. Be Specific with Expected Results

**Good:**
\`\`\`
Expected: 
- Error message displays: "Password must be at least 8 characters"
- Error appears in red text below password field
- Submit button remains disabled
- Password field border turns red
\`\`\`

**Bad:**
\`\`\`
Expected:
- Error message shows
- Can't submit
\`\`\`

### 3. Include Test Data

Always specify exact data to use:

\`\`\`
Test Data Set 1 - Valid User:
{
  "email": "valid.user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}

Test Data Set 2 - Invalid Email:
{
  "email": "invalid-email",
  "password": "SecurePass123!"
}
\`\`\`

## Test Case Design Techniques

### 1. Equivalence Partitioning

Divide input data into partitions where all values behave similarly.

**Example: Age validation (must be 18-65)**

| Partition | Test Value | Expected |
|-----------|-----------|----------|
| Below minimum | 17 | Error: "Must be 18 or older" |
| Valid range | 25 | Accepted |
| Valid range | 50 | Accepted |
| Above maximum | 66 | Error: "Must be 65 or younger" |

### 2. Boundary Value Analysis

Test at the edges of equivalence partitions.

\`\`\`
Test Case: Age Boundary Values

TC_AGE_001: Age = 17 (Below minimum)
Expected: Error message

TC_AGE_002: Age = 18 (Minimum boundary)
Expected: Accepted

TC_AGE_003: Age = 65 (Maximum boundary)
Expected: Accepted

TC_AGE_004: Age = 66 (Above maximum)
Expected: Error message
\`\`\`

### 3. Decision Table Testing

For complex business logic with multiple conditions.

**Example: Discount calculation**

| Premium Member | Cart Value > $100 | First Purchase | Discount |
|---------------|-------------------|----------------|----------|
| Yes | Yes | Yes | 25% |
| Yes | Yes | No | 20% |
| Yes | No | Yes | 15% |
| Yes | No | No | 10% |
| No | Yes | Yes | 10% |
| No | Yes | No | 5% |
| No | No | Yes | 5% |
| No | No | No | 0% |

### 4. State Transition Testing

For testing workflow and state changes.

\`\`\`
Order State Transitions:

TC_ORDER_001: Draft → Submitted
Precondition: Order in Draft state
Action: Click "Submit Order"
Expected: Order state changes to "Submitted"

TC_ORDER_002: Submitted → Approved
Precondition: Order in Submitted state
Action: Manager clicks "Approve"
Expected: Order state changes to "Approved"

TC_ORDER_003: Invalid transition - Draft → Shipped
Precondition: Order in Draft state
Action: Attempt to mark as "Shipped"
Expected: Error - "Order must be approved before shipping"
\`\`\`

## Organizing Test Cases

### 1. Test Suite Structure

\`\`\`
Project: E-commerce Platform
├── Authentication
│   ├── Login
│   ├── Logout
│   ├── Password Reset
│   └── Registration
├── Product Management
│   ├── Browse Products
│   ├── Search
│   ├── Product Details
│   └── Reviews
├── Shopping Cart
│   ├── Add to Cart
│   ├── Update Quantity
│   ├── Remove Items
│   └── Apply Coupon
└── Checkout
    ├── Shipping Information
    ├── Payment Processing
    └── Order Confirmation
\`\`\`

### 2. Prioritization

Use priority levels to focus testing efforts:

- **P0 - Critical**: Core functionality, must work
- **P1 - High**: Important features, frequent user paths
- **P2 - Medium**: Secondary features, less common scenarios
- **P3 - Low**: Edge cases, nice-to-have features

## Advanced Test Case Patterns

### 1. Negative Testing

Always test what happens when things go wrong.

\`\`\`
Positive Test:
TC_LOGIN_001: Login with valid credentials
Expected: Successful login

Negative Tests:
TC_LOGIN_NEG_001: Login with invalid password
Expected: Error "Invalid credentials"

TC_LOGIN_NEG_002: Login with non-existent email
Expected: Error "User not found"

TC_LOGIN_NEG_003: Login with empty fields
Expected: Validation errors for required fields

TC_LOGIN_NEG_004: Login with SQL injection attempt
Expected: Input sanitized, error message shown

TC_LOGIN_NEG_005: Login after 5 failed attempts
Expected: Account temporarily locked
\`\`\`

### 2. Exploratory Testing Charters

For exploratory testing sessions:

\`\`\`
Charter: Explore file upload functionality
Focus Area: Security and validation
Duration: 60 minutes

Test Ideas:
- Upload various file types (images, documents, executables)
- Test file size limits
- Upload files with special characters in names
- Attempt to upload malicious files
- Test concurrent uploads
- Cancel upload mid-process

Notes:
[Record observations and findings during session]

Bugs Found:
- No validation for file size
- .exe files accepted
- Progress bar freezes at 99%
\`\`\`

### 3. Data-Driven Test Cases

Create parameterized test cases for efficiency:

\`\`\`
Test Case Template: Email Validation

TC_EMAIL_VALIDATION: Validate email format

Test Data:
| Input | Expected Result |
|-------|----------------|
| valid@email.com | Accepted |
| invalid.email | Error: Invalid format |
| @nodomain.com | Error: Invalid format |
| user@domain | Error: Invalid format |
| user+tag@domain.com | Accepted |
| user@sub.domain.com | Accepted |
| a@b.c | Accepted |
| "" (empty) | Error: Required field |

Execute test for each row in the table.
\`\`\`

## Test Case Review Checklist

Before finalizing test cases, verify:

- [ ] Test case ID is unique and follows naming convention
- [ ] Title clearly describes what is being tested
- [ ] Preconditions are complete and achievable
- [ ] Steps are numbered and easy to follow
- [ ] Expected results are specific and measurable
- [ ] Test data is provided
- [ ] Priority and type are assigned
- [ ] Linked to requirement or user story
- [ ] Can be executed independently
- [ ] Covers both positive and negative scenarios

## Maintaining Test Cases

### Regular Review Cycle

1. **After each release**: Update for new features
2. **Quarterly**: Remove obsolete tests, optimize duplicates
3. **When bugs are found**: Add regression tests
4. **When requirements change**: Update affected tests

### Version Control

Track test case changes:

\`\`\`
Version History:
v1.0 - 2025-01-15 - Initial creation
v1.1 - 2025-02-10 - Updated expected results for new UI
v1.2 - 2025-03-05 - Added test data for edge cases
\`\`\`

## Tools and Templates

### Test Management Tools

- **TestRail**: Comprehensive test management
- **Zephyr**: Jira integration
- **qTest**: Enterprise test management
- **Excel/Google Sheets**: Simple, accessible option

### Sample Test Case Template (Markdown)

\`\`\`markdown
# Test Case: [TC_ID]

## Description
[What are we testing?]

## Preconditions
- [ ] Condition 1
- [ ] Condition 2

## Test Data
\`\`\`json
{
  "field": "value"
}
\`\`\`

## Steps & Expected Results

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | [Action] | [Expected] |
| 2 | [Action] | [Expected] |

## Postconditions
- State after test execution

## Notes
- Additional information
\`\`\`

## Conclusion

Effective test cases are detailed, maintainable, and focused on catching real bugs. Invest time in writing quality test cases upfront - it pays dividends in test efficiency, bug detection, and team collaboration.

Remember: A test case that can't be executed reliably or doesn't catch bugs is worse than no test case at all. Quality over quantity.
`,
  },
  {
    id: '4',
    slug: 'continuous-testing-cicd',
    title: 'Implementing Continuous Testing in CI/CD Pipelines',
    excerpt:
      'Build a robust continuous testing strategy that integrates seamlessly with your CI/CD pipeline for faster, safer releases.',
    category: 'Test Strategy',
    difficulty: 'Advanced',
    readTime: 15,
    icon: 'GitBranch',
    tags: ['CI/CD', 'DevOps', 'Automation', 'Pipeline'],
    checklist: [
      'Set up automated test execution in pipeline',
      'Configure different test stages (unit, integration, e2e)',
      'Implement parallel test execution',
      'Set up test reporting and notifications',
      'Configure failure handling and rollback',
      'Monitor test metrics and trends',
      'Optimize test execution time',
      'Maintain test environment stability',
    ],
    resources: [
      { title: 'Jenkins Documentation', url: '#' },
      { title: 'GitHub Actions Guide', url: '#' },
    ],
    content: `
# Implementing Continuous Testing in CI/CD Pipelines

Continuous testing is essential for modern software development. This guide shows you how to build a comprehensive testing strategy that integrates seamlessly with your CI/CD pipeline.

## Pipeline Architecture

### Multi-Stage Testing Pipeline

\`\`\`yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # Stage 1: Fast Feedback
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Run unit tests
        run: npm run test:unit
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  # Stage 2: Integration Tests
  integration-tests:
    needs: unit-tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: testpass
    steps:
      - uses: actions/checkout@v3
      - name: Run integration tests
        run: npm run test:integration

  # Stage 3: End-to-End Tests
  e2e-tests:
    needs: integration-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run E2E tests
        run: npm run test:e2e
      - name: Upload test videos
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: e2e-videos
          path: cypress/videos

  # Stage 4: Performance Tests
  performance-tests:
    needs: integration-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run load tests
        run: npm run test:performance

  # Stage 5: Security Scan
  security-scan:
    needs: unit-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run security scan
        run: npm audit
      - name: OWASP dependency check
        run: npm run security:check
\`\`\`

## Test Pyramid in CI/CD

### Optimizing Test Distribution

\`\`\`
     /\\
    /  \\     E2E Tests (10%)
   /    \\    - Critical user journeys
  /------\\   - Slow, expensive
 /        \\  
/  Integration (30%)
\\  - API tests
 \\  - Service integration
  \\----------
   \\        /
    \\  Unit Tests (60%)
     \\  - Fast, isolated
      \\/
\`\`\`

### Time Budget per Stage

- **Unit Tests**: < 2 minutes
- **Integration Tests**: < 5 minutes  
- **E2E Tests**: < 15 minutes
- **Performance Tests**: < 10 minutes

Total pipeline time: ~30 minutes max

## Parallel Execution Strategy

### Matrix Testing

\`\`\`yaml
test-matrix:
  strategy:
    matrix:
      os: [ubuntu-latest, windows-latest, macos-latest]
      node-version: [16, 18, 20]
      browser: [chrome, firefox, safari]
    fail-fast: false
  runs-on: \${{ matrix.os }}
  steps:
    - name: Test on \${{ matrix.browser }}
      run: npm run test:e2e:\${{ matrix.browser }}
\`\`\`

### Shard-Based Parallelization

\`\`\`javascript
// playwright.config.ts
export default defineConfig({
  workers: 4,
  shard: process.env.SHARD ? {
    current: parseInt(process.env.SHARD_INDEX),
    total: parseInt(process.env.SHARD_TOTAL)
  } : undefined,
});
\`\`\`

\`\`\`yaml
# Run tests across 4 shards
e2e-tests:
  strategy:
    matrix:
      shard: [1, 2, 3, 4]
  steps:
    - name: Run shard \${{ matrix.shard }}
      run: npm run test:e2e
      env:
        SHARD_INDEX: \${{ matrix.shard }}
        SHARD_TOTAL: 4
\`\`\`

## Smart Test Selection

### Run Only Affected Tests

\`\`\`javascript
// scripts/affected-tests.js
const { execSync } = require('child_process');

function getChangedFiles() {
  const output = execSync('git diff --name-only HEAD~1 HEAD');
  return output.toString().split('\\n').filter(Boolean);
}

function getAffectedTests(changedFiles) {
  const affectedTests = new Set();
  
  changedFiles.forEach(file => {
    if (file.startsWith('src/auth/')) {
      affectedTests.add('tests/auth/**/*.test.js');
    }
    if (file.startsWith('src/payment/')) {
      affectedTests.add('tests/payment/**/*.test.js');
    }
    // Add more mappings
  });
  
  return Array.from(affectedTests);
}

const changed = getChangedFiles();
const tests = getAffectedTests(changed);
console.log(tests.join(' '));
\`\`\`

\`\`\`yaml
- name: Run affected tests
  run: |
    TESTS=$(node scripts/affected-tests.js)
    npm test -- $TESTS
\`\`\`

## Test Data Management

### Dynamic Test Environments

\`\`\`yaml
setup-test-environment:
  steps:
    - name: Create test database
      run: |
        docker run -d \\
          --name test-db-\${{ github.run_id }} \\
          -e POSTGRES_DB=testdb \\
          -e POSTGRES_PASSWORD=testpass \\
          postgres:14
    
    - name: Seed test data
      run: npm run db:seed
      env:
        DATABASE_URL: postgres://postgres:testpass@localhost/testdb
    
    - name: Run tests
      run: npm test
    
    - name: Cleanup
      if: always()
      run: docker rm -f test-db-\${{ github.run_id }}
\`\`\`

### Test Data Isolation

\`\`\`javascript
// tests/helpers/test-data.js
export class TestDataManager {
  constructor(testId) {
    this.testId = testId;
    this.createdResources = [];
  }

  async createUser(data) {
    const user = await api.post('/users', {
      ...data,
      email: \`test-\${this.testId}-\${Date.now()}@example.com\`
    });
    this.createdResources.push({ type: 'user', id: user.id });
    return user;
  }

  async cleanup() {
    for (const resource of this.createdResources.reverse()) {
      await api.delete(\`/\${resource.type}s/\${resource.id}\`);
    }
  }
}

// Usage in tests
let testData;

beforeEach(() => {
  testData = new TestDataManager(expect.getState().currentTestName);
});

afterEach(async () => {
  await testData.cleanup();
});
\`\`\`

## Failure Handling

### Retry Strategy

\`\`\`yaml
- name: Run flaky E2E tests
  uses: nick-fields/retry@v2
  with:
    timeout_minutes: 10
    max_attempts: 3
    retry_on: error
    command: npm run test:e2e
\`\`\`

\`\`\`javascript
// Retry configuration in test framework
export default {
  retries: process.env.CI ? 2 : 0,
  testMatch: ['**/*.spec.js'],
};
\`\`\`

### Quarantine Flaky Tests

\`\`\`javascript
// tests/flaky-tests.config.js
const flakyTests = [
  'tests/e2e/checkout.spec.js',
  'tests/integration/websocket.test.js',
];

export default {
  testPathIgnorePatterns: process.env.SKIP_FLAKY 
    ? flakyTests 
    : [],
};
\`\`\`

\`\`\`yaml
- name: Run stable tests
  run: npm test
  env:
    SKIP_FLAKY: true

- name: Run flaky tests separately
  run: npm test -- --config=flaky-tests.config.js
  continue-on-error: true
\`\`\`

## Reporting and Notifications

### Comprehensive Test Reports

\`\`\`yaml
- name: Generate test report
  if: always()
  run: npm run test:report

- name: Publish test results
  uses: dorny/test-reporter@v1
  if: always()
  with:
    name: Test Results
    path: 'reports/junit.xml'
    reporter: java-junit

- name: Comment PR with results
  uses: daun/playwright-report-comment@v3
  if: always()
  with:
    report-path: playwright-report
\`\`\`

### Slack Notifications

\`\`\`yaml
- name: Notify on failure
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "❌ Tests failed in \${{ github.repository }}",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Build:* <\${{ github.server_url }}/\${{ github.repository }}/actions/runs/\${{ github.run_id }}|#\${{ github.run_number }}>"
            }
          }
        ]
      }
  env:
    SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK }}
\`\`\`

## Performance Optimization

### Caching Dependencies

\`\`\`yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: |
      ~/.npm
      node_modules
      ~/.cache/Cypress
    key: \${{ runner.os }}-deps-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-deps-

- name: Cache build artifacts
  uses: actions/cache@v3
  with:
    path: |
      .next/cache
      dist
    key: \${{ runner.os }}-build-\${{ github.sha }}
\`\`\`

### Docker Layer Caching

\`\`\`dockerfile
# Optimize Dockerfile for caching
FROM node:18-alpine

# Cache dependencies separately
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Run tests
CMD ["npm", "test"]
\`\`\`

## Quality Gates

### Define Pass/Fail Criteria

\`\`\`yaml
quality-gate:
  needs: [unit-tests, integration-tests, e2e-tests]
  runs-on: ubuntu-latest
  steps:
    - name: Check test coverage
      run: |
        COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
        if (( $(echo "$COVERAGE < 80" | bc -l) )); then
          echo "Coverage $COVERAGE% is below threshold 80%"
          exit 1
        fi
    
    - name: Check performance budgets
      run: |
        npm run test:performance
        node scripts/check-budgets.js
    
    - name: Block on critical failures
      run: |
        if [ -f ".test-failures/critical" ]; then
          echo "Critical tests failed"
          exit 1
        fi
\`\`\`

## Monitoring and Metrics

### Track Test Metrics

\`\`\`javascript
// scripts/track-metrics.js
const { writeFileSync } = require('fs');

const metrics = {
  timestamp: new Date().toISOString(),
  totalTests: process.env.TOTAL_TESTS,
  passedTests: process.env.PASSED_TESTS,
  failedTests: process.env.FAILED_TESTS,
  duration: process.env.TEST_DURATION,
  coverage: process.env.COVERAGE,
  flakyTests: process.env.FLAKY_COUNT,
};

// Send to monitoring service
fetch('https://metrics.example.com/test-runs', {
  method: 'POST',
  body: JSON.stringify(metrics),
});

// Store for trending
writeFileSync(
  \`metrics/\${Date.now()}.json\`,
  JSON.stringify(metrics, null, 2)
);
\`\`\`

### Dashboard Integration

\`\`\`yaml
- name: Update test dashboard
  run: |
    curl -X POST https://dashboard.example.com/api/builds \\
      -H "Authorization: Bearer \${{ secrets.DASHBOARD_TOKEN }}" \\
      -d '{
        "build_id": "\${{ github.run_id }}",
        "status": "\${{ job.status }}",
        "tests_total": "1000",
        "tests_passed": "950",
        "duration": "1200"
      }'
\`\`\`

## Best Practices Summary

### Do's
- ✅ Keep pipelines fast (< 30 minutes)
- ✅ Run critical tests first
- ✅ Parallelize test execution
- ✅ Cache dependencies and build artifacts
- ✅ Provide clear failure feedback
- ✅ Monitor test trends
- ✅ Quarantine flaky tests
- ✅ Use test data isolation

### Don'ts
- ❌ Run all tests on every commit
- ❌ Ignore flaky tests
- ❌ Hard-code test data
- ❌ Skip test cleanup
- ❌ Deploy with failing tests
- ❌ Ignore slow test warnings
- ❌ Over-rely on E2E tests

## Conclusion

A well-designed continuous testing strategy accelerates delivery while maintaining quality. Focus on fast feedback, reliable execution, and actionable results.

Remember: The goal is to catch bugs early and deploy with confidence, not to have the most tests or the longest pipeline.
`,
  },
  {
    id: '5',
    slug: 'performance-testing-guide',
    title: 'Performance Testing Best Practices: From Load to Stress Testing',
    excerpt:
      'Master performance testing techniques including load testing, stress testing, and performance monitoring to ensure your application scales.',
    category: 'Performance',
    difficulty: 'Advanced',
    readTime: 14,
    icon: 'Gauge',
    tags: ['Performance', 'Load Testing', 'Scalability', 'Monitoring'],
    checklist: [
      'Define performance requirements and SLAs',
      'Set up performance testing environment',
      'Create realistic load scenarios',
      'Implement different test types (load, stress, spike)',
      'Monitor system resources during tests',
      'Analyze bottlenecks and optimization opportunities',
      'Set up continuous performance monitoring',
      'Document performance baselines',
    ],
    resources: [
      { title: 'k6 Documentation', url: '#' },
      { title: 'JMeter Guide', url: '#' },
    ],
    content: `
# Performance Testing Best Practices: From Load to Stress Testing

Performance testing ensures your application can handle real-world traffic and usage patterns. This comprehensive guide covers everything from basic load testing to advanced performance optimization.

## Types of Performance Tests

### 1. Load Testing
Tests normal expected load to verify the system handles it smoothly.

### 2. Stress Testing
Pushes the system beyond normal capacity to find breaking points.

### 3. Spike Testing
Tests sudden, dramatic increases in load.

### 4. Soak Testing
Runs sustained load over extended periods to find memory leaks.

### 5. Scalability Testing
Verifies the system scales with increased resources.

## Setting Up Performance Tests

### k6 Load Testing Example

\`\`\`javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp up to 200 users
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],   // Error rate < 1%
    errors: ['rate<0.1'],              // Custom error rate < 10%
  },
};

export default function() {
  // Homepage
  let response = http.get('https://example.com');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'page loads in < 2s': (r) => r.timings.duration < 2000,
  }) || errorRate.add(1);

  sleep(1);

  // Login
  response = http.post('https://example.com/api/login', {
    email: 'test@example.com',
    password: 'password123',
  });
  check(response, {
    'login successful': (r) => r.status === 200,
    'got auth token': (r) => r.json('token') !== undefined,
  }) || errorRate.add(1);

  sleep(2);

  // API request with auth
  const token = response.json('token');
  response = http.get('https://example.com/api/dashboard', {
    headers: { Authorization: \`Bearer \${token}\` },
  });
  check(response, {
    'dashboard loads': (r) => r.status === 200,
    'response time OK': (r) => r.timings.duration < 1000,
  }) || errorRate.add(1);

  sleep(3);
}
\`\`\`

### Stress Testing Configuration

\`\`\`javascript
export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Normal load
    { duration: '5m', target: 100 },   
    { duration: '2m', target: 200 },   // Above normal
    { duration: '5m', target: 200 },   
    { duration: '2m', target: 300 },   // Stress level
    { duration: '5m', target: 300 },   
    { duration: '2m', target: 400 },   // Breaking point
    { duration: '5m', target: 400 },   
    { duration: '10m', target: 0 },    // Recovery
  ],
  thresholds: {
    http_req_duration: ['p(99)<3000'], // More lenient under stress
    http_req_failed: ['rate<0.05'],    // Allow 5% error rate
  },
};
\`\`\`

### Spike Testing

\`\`\`javascript
export const options = {
  stages: [
    { duration: '10s', target: 100 },  // Normal load
    { duration: '1m', target: 100 },   
    { duration: '10s', target: 1400 }, // Spike to 1400 users
    { duration: '3m', target: 1400 },  // Stay high
    { duration: '10s', target: 100 },  // Drop back
    { duration: '3m', target: 100 },   
    { duration: '10s', target: 0 },    
  ],
};
\`\`\`

## Realistic User Scenarios

### Multi-Page User Journey

\`\`\`javascript
import { group, sleep } from 'k6';

export default function() {
  group('Browse Products', () => {
    http.get('https://example.com/products');
    sleep(2);
    
    http.get('https://example.com/products/123');
    sleep(3);
  });

  group('Add to Cart', () => {
    http.post('https://example.com/api/cart', {
      productId: '123',
      quantity: 1,
    });
    sleep(1);
    
    http.get('https://example.com/cart');
    sleep(2);
  });

  group('Checkout', () => {
    http.post('https://example.com/api/checkout', {
      shippingAddress: '123 Main St',
      paymentMethod: 'credit_card',
    });
    sleep(2);
    
    http.get('https://example.com/order/confirmation');
    sleep(3);
  });
}
\`\`\`

### Weighted User Scenarios

\`\`\`javascript
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const scenarios = {
  browser: { weight: 70, exec: 'browseProducts' },
  buyer: { weight: 20, exec: 'completePurchase' },
  searcher: { weight: 10, exec: 'searchProducts' },
};

export function browseProducts() {
  http.get('https://example.com/products');
  sleep(Math.random() * 5 + 2);
}

export function completePurchase() {
  // Full checkout flow
  browseProducts();
  http.post('https://example.com/api/cart/add', {});
  http.post('https://example.com/api/checkout', {});
}

export function searchProducts() {
  http.get('https://example.com/api/search?q=laptop');
  sleep(Math.random() * 3 + 1);
}

export default function() {
  const scenario = randomItem(Object.keys(scenarios));
  scenarios[scenario].exec();
}
\`\`\`

## Monitoring System Resources

### Server Monitoring During Tests

\`\`\`bash
#!/bin/bash
# monitor-resources.sh

while true; do
  echo "=== $(date) ==="
  
  # CPU usage
  echo "CPU:"
  top -bn1 | grep "Cpu(s)" | sed "s/.*, *\\([0-9.]*\\)%* id.*/\\1/" | awk '{print 100 - $1"%"}'
  
  # Memory usage
  echo "Memory:"
  free -h | awk '/^Mem/ {print $3 "/" $2}'
  
  # Disk I/O
  echo "Disk I/O:"
  iostat -x 1 1 | awk '/^nvme/ {print $1, $4, $5}'
  
  # Network
  echo "Network:"
  sar -n DEV 1 1 | awk '/eth0/ {print $5, $6}'
  
  echo ""
  sleep 5
done
\`\`\`

### Application Performance Monitoring

\`\`\`javascript
// APM integration
import { Counter, Histogram } from 'prom-client';

const requestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

const requestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    requestDuration.labels(req.method, req.route.path, res.statusCode).observe(duration);
    requestCounter.labels(req.method, req.route.path, res.statusCode).inc();
  });
  
  next();
});
\`\`\`

## Analyzing Results

### Key Metrics to Track

1. **Response Time**
   - Average
   - Median (p50)
   - 95th percentile (p95)
   - 99th percentile (p99)

2. **Throughput**
   - Requests per second
   - Transactions per second

3. **Error Rate**
   - HTTP errors (4xx, 5xx)
   - Timeouts
   - Failed requests

4. **Resource Utilization**
   - CPU usage
   - Memory consumption
   - Disk I/O
   - Network bandwidth

### Identifying Bottlenecks

\`\`\`javascript
// Analyze k6 results
export function handleSummary(data) {
  const slowestEndpoints = Object.entries(data.metrics)
    .filter(([name]) => name.startsWith('http_req_duration'))
    .map(([name, metric]) => ({
      endpoint: name,
      p95: metric.values['p(95)'],
      p99: metric.values['p(99)'],
    }))
    .sort((a, b) => b.p95 - a.p95)
    .slice(0, 10);

  console.log('Slowest Endpoints (p95):');
  slowestEndpoints.forEach(({ endpoint, p95, p99 }) => {
    console.log(\`\${endpoint}: p95=\${p95}ms, p99=\${p99}ms\`);
  });

  return {
    'summary.json': JSON.stringify(data),
  };
}
\`\`\`

## Database Performance Testing

### Database Load Simulation

\`\`\`javascript
import sql from 'k6/x/sql';

const db = sql.open('postgres', 'postgres://user:pass@localhost:5432/testdb');

export default function() {
  // Read query
  const results = sql.query(db, 'SELECT * FROM users WHERE email = $1', ['test@example.com']);
  check(results, {
    'user found': (r) => r.length > 0,
  });

  // Write query
  sql.exec(db, 
    'INSERT INTO page_views (user_id, page, timestamp) VALUES ($1, $2, NOW())',
    [123, '/products']
  );

  // Complex query
  const analytics = sql.query(db, \`
    SELECT date_trunc('hour', timestamp) as hour,
           COUNT(*) as views
    FROM page_views
    WHERE timestamp > NOW() - INTERVAL '24 hours'
    GROUP BY hour
    ORDER BY hour
  \`);
}

export function teardown() {
  db.close();
}
\`\`\`

## API Performance Testing

### GraphQL Performance

\`\`\`javascript
const query = \`
  query GetUserDashboard($userId: ID!) {
    user(id: $userId) {
      id
      name
      recentOrders(limit: 10) {
        id
        total
        items {
          product {
            name
            price
          }
        }
      }
      recommendations {
        id
        name
      }
    }
  }
\`;

export default function() {
  const response = http.post('https://example.com/graphql', {
    query,
    variables: { userId: '123' },
  }, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(response, {
    'query successful': (r) => r.json('data.user') !== null,
    'under 500ms': (r) => r.timings.duration < 500,
  });
}
\`\`\`

## Performance Optimization Strategies

### 1. Caching

\`\`\`javascript
// Test cache effectiveness
import { Counter } from 'k6/metrics';

const cacheHits = new Counter('cache_hits');
const cacheMisses = new Counter('cache_misses');

export default function() {
  const response = http.get('https://example.com/api/products');
  
  if (response.headers['X-Cache-Status'] === 'HIT') {
    cacheHits.add(1);
  } else {
    cacheMisses.add(1);
  }
  
  check(response, {
    'cached response fast': (r) => 
      r.headers['X-Cache-Status'] === 'HIT' 
        ? r.timings.duration < 100
        : true,
  });
}
\`\`\`

### 2. Connection Pooling

\`\`\`javascript
export const options = {
  batch: 10,                    // Send 10 requests in parallel
  batchPerHost: 5,              // Max 5 per host
  discardResponseBodies: true,  // Save memory
};
\`\`\`

### 3. Load Balancing Validation

\`\`\`javascript
import { Counter } from 'k6/metrics';

const serverHits = {};

export default function() {
  const response = http.get('https://example.com');
  const server = response.headers['X-Served-By'];
  
  if (!serverHits[server]) {
    serverHits[server] = new Counter(\`server_\${server}_hits\`);
  }
  serverHits[server].add(1);
}

export function handleSummary(data) {
  console.log('Load distribution:');
  Object.entries(serverHits).forEach(([server, counter]) => {
    console.log(\`\${server}: \${counter.value} requests\`);
  });
}
\`\`\`

## CI/CD Integration

### Automated Performance Testing

\`\`\`yaml
# .github/workflows/performance-tests.yml
name: Performance Tests

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:

jobs:
  performance-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run k6 tests
        uses: grafana/k6-action@v0.3.0
        with:
          filename: tests/performance/load-test.js
          cloud: true
          token: \${{ secrets.K6_CLOUD_TOKEN }}
      
      - name: Check performance budget
        run: |
          P95=$(cat summary.json | jq '.metrics.http_req_duration.values["p(95)"]')
          if (( $(echo "$P95 > 500" | bc -l) )); then
            echo "Performance regression: p95 = \${P95}ms"
            exit 1
          fi
      
      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: k6-results
          path: summary.json
\`\`\`

## Best Practices Summary

### Do's
- ✅ Test in production-like environment
- ✅ Use realistic user scenarios
- ✅ Monitor system resources
- ✅ Establish performance baselines
- ✅ Test regularly (CI/CD integration)
- ✅ Gradually increase load
- ✅ Include think time between requests
- ✅ Test with realistic data volumes

### Don'ts
- ❌ Test in production without permission
- ❌ Use synthetic, unrealistic scenarios
- ❌ Ignore warm-up periods
- ❌ Test only happy paths
- ❌ Forget to clean up test data
- ❌ Skip resource monitoring
- ❌ Test only peak load scenarios

## Conclusion

Performance testing is an ongoing process, not a one-time event. Regular testing, monitoring, and optimization ensure your application remains fast and reliable as it scales.

Remember: Performance is a feature. Users notice slow applications, and it directly impacts conversion rates and user satisfaction.
`,
  },
  {
    id: '6',
    slug: 'mobile-app-testing-strategy',
    title: 'Comprehensive Mobile App Testing Strategy',
    excerpt:
      'Build a complete mobile testing strategy covering functional, compatibility, and performance testing across iOS and Android.',
    category: 'Mobile Testing',
    difficulty: 'Intermediate',
    readTime: 11,
    icon: 'Smartphone',
    tags: ['Mobile', 'iOS', 'Android', 'Appium'],
    checklist: [
      'Set up device labs (physical and emulators)',
      'Test on multiple OS versions',
      'Validate different screen sizes and resolutions',
      'Test network conditions (3G, 4G, 5G, offline)',
      'Verify battery and memory consumption',
      'Test app permissions and security',
      'Validate push notifications',
      'Test app store submission requirements',
    ],
    resources: [
      { title: 'Appium Documentation', url: '#' },
      { title: 'Mobile Testing Checklist', url: '#' },
    ],
    content: `
# Comprehensive Mobile App Testing Strategy

Mobile app testing presents unique challenges compared to web testing. This guide covers everything you need to build a robust mobile testing strategy for iOS and Android applications.

## Mobile Testing Fundamentals

### What Makes Mobile Testing Different?

1. **Device Fragmentation**: Thousands of device models
2. **OS Versions**: Multiple versions in active use
3. **Screen Sizes**: From small phones to tablets
4. **Network Variability**: WiFi, 4G, 5G, offline
5. **Battery Constraints**: Performance vs battery life
6. **Touch Interactions**: Gestures, multi-touch
7. **Sensors**: GPS, accelerometer, camera
8. **App Permissions**: Complex permission models

## Test Environment Setup

### Device Lab Configuration

\`\`\`yaml
# device-matrix.yml
ios_devices:
  physical:
    - iPhone 15 Pro (iOS 17.1)
    - iPhone 14 (iOS 17.0)
    - iPhone SE (iOS 16.5)
    - iPad Pro 12.9" (iOS 17.1)
  
  simulators:
    - iPhone 15 Pro Max (iOS 17.1)
    - iPhone 13 (iOS 16.0)
    - iPhone 11 (iOS 15.0)
    - iPad Air (iOS 17.0)

android_devices:
  physical:
    - Samsung Galaxy S23 (Android 14)
    - Google Pixel 7 (Android 14)
    - OnePlus 11 (Android 13)
    - Samsung Galaxy Tab S8 (Android 13)
  
  emulators:
    - Pixel 6 (Android 13)
    - Samsung Galaxy S21 (Android 12)
    - Pixel 4 (Android 11)
    - Nexus 7 (Android 10)
\`\`\`

### Appium Setup

\`\`\`javascript
// appium.config.js
export const config = {
  runner: 'local',
  port: 4723,
  
  specs: ['./tests/specs/**/*.js'],
  
  capabilities: [
    {
      // iOS Capability
      platformName: 'iOS',
      'appium:platformVersion': '17.0',
      'appium:deviceName': 'iPhone 15 Pro',
      'appium:app': './apps/MyApp.app',
      'appium:automationName': 'XCUITest',
      'appium:newCommandTimeout': 240,
    },
    {
      // Android Capability
      platformName: 'Android',
      'appium:platformVersion': '14',
      'appium:deviceName': 'Pixel 7',
      'appium:app': './apps/MyApp.apk',
      'appium:automationName': 'UiAutomator2',
      'appium:newCommandTimeout': 240,
    },
  ],
  
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  
  services: ['appium'],
  framework: 'mocha',
  reporters: ['spec'],
};
\`\`\`

## Functional Testing

### Page Object Model for Mobile

\`\`\`javascript
// screens/LoginScreen.js
class LoginScreen {
  get emailInput() {
    return driver.platform === 'iOS'
      ? $('~email-input')
      : $('id:com.example.app:id/email');
  }

  get passwordInput() {
    return driver.platform === 'iOS'
      ? $('~password-input')
      : $('id:com.example.app:id/password');
  }

  get loginButton() {
    return driver.platform === 'iOS'
      ? $('~login-button')
      : $('//android.widget.Button[@text="Login"]');
  }

  async login(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async isDisplayed() {
    return await this.emailInput.isDisplayed();
  }
}

export default new LoginScreen();
\`\`\`

### Gesture Testing

\`\`\`javascript
// tests/gestures.test.js
describe('Gesture Interactions', () => {
  it('should support swipe to delete', async () => {
    const listItem = await $('~list-item-1');
    
    // Swipe left
    await driver.execute('mobile: swipe', {
      direction: 'left',
      element: listItem,
    });
    
    const deleteButton = await $('~delete-button');
    await expect(deleteButton).toBeDisplayed();
    await deleteButton.click();
  });

  it('should support pull to refresh', async () => {
    const scrollView = await $('~content-scroll');
    
    await driver.execute('mobile: scroll', {
      direction: 'down',
      element: scrollView,
    });
    
    // Wait for refresh indicator
    const refreshIndicator = await $('~refresh-indicator');
    await expect(refreshIndicator).toBeDisplayed();
  });

  it('should support pinch to zoom', async () => {
    const image = await $('~product-image');
    
    await driver.execute('mobile: pinch', {
      scale: 2.0,
      velocity: 1.0,
      element: image,
    });
    
    // Verify image is zoomed
    const size = await image.getSize();
    expect(size.width).toBeGreaterThan(300);
  });

  it('should support long press', async () => {
    const textElement = await $('~copyable-text');
    
    await driver.execute('mobile: touchAndHold', {
      element: textElement,
      duration: 2000,
    });
    
    const contextMenu = await $('~context-menu');
    await expect(contextMenu).toBeDisplayed();
  });
});
\`\`\`

## Device Compatibility Testing

### Screen Size Adaptation

\`\`\`javascript
describe('Responsive Layout', () => {
  const devices = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 15 Pro', width: 393, height: 852 },
    { name: 'iPad Pro', width: 1024, height: 1366 },
  ];

  devices.forEach(({ name, width, height }) => {
    it(\`should display correctly on \${name}\`, async () => {
      await driver.setWindowRect({
        width,
        height,
      });

      await driver.pause(1000); // Allow layout adjustment

      // Verify critical elements are visible
      await expect($('~header')).toBeDisplayed();
      await expect($('~navigation')).toBeDisplayed();
      await expect($('~main-content')).toBeDisplayed();

      // Take screenshot
      await driver.saveScreenshot(\`./screenshots/\${name}.png\`);
    });
  });
});
\`\`\`

### OS Version Compatibility

\`\`\`javascript
const testMatrix = [
  { platform: 'iOS', version: '15.0' },
  { platform: 'iOS', version: '16.0' },
  { platform: 'iOS', version: '17.0' },
  { platform: 'Android', version: '11' },
  { platform: 'Android', version: '12' },
  { platform: 'Android', version: '13' },
  { platform: 'Android', version: '14' },
];

testMatrix.forEach(({ platform, version }) => {
  describe(\`\${platform} \${version}\`, () => {
    before(async () => {
      await driver.updateSettings({
        platformVersion: version,
      });
    });

    it('should launch successfully', async () => {
      await expect($('~app-logo')).toBeDisplayed();
    });

    it('should navigate between screens', async () => {
      await $('~menu-button').click();
      await expect($('~settings-option')).toBeDisplayed();
    });
  });
});
\`\`\`

## Network Condition Testing

### Simulating Network Conditions

\`\`\`javascript
describe('Network Conditions', () => {
  it('should work offline', async () => {
    // Enable airplane mode
    await driver.toggleAirplaneMode();
    
    // Navigate to cached content
    await $('~offline-content').click();
    await expect($('~cached-article')).toBeDisplayed();
    
    // Verify offline indicator
    await expect($('~offline-badge')).toHaveText('Offline');
    
    // Disable airplane mode
    await driver.toggleAirplaneMode();
  });

  it('should handle slow network', async () => {
    // Set network throttling (Android)
    if (driver.isAndroid) {
      await driver.setNetworkConnection(4); // 3G
    }
    
    const startTime = Date.now();
    await $('~load-more-button').click();
    
    // Should show loading indicator
    await expect($('~loading-spinner')).toBeDisplayed();
    
    // Wait for content
    await $('~new-content').waitForDisplayed({ timeout: 30000 });
    const loadTime = Date.now() - startTime;
    
    console.log(\`Content loaded in \${loadTime}ms on 3G\`);
  });

  it('should retry failed requests', async () => {
    // Simulate network interruption
    await driver.toggleAirplaneMode();
    
    await $('~submit-button').click();
    await expect($('~error-message')).toHaveText('Network error');
    
    // Restore network
    await driver.toggleAirplaneMode();
    await driver.pause(2000);
    
    // Retry
    await $('~retry-button').click();
    await expect($('~success-message')).toBeDisplayed();
  });
});
\`\`\`

## Performance Testing

### App Launch Time

\`\`\`javascript
describe('Performance Metrics', () => {
  it('should launch within 3 seconds', async () => {
    const startTime = Date.now();
    
    await driver.activateApp('com.example.app');
    await $('~app-logo').waitForDisplayed({ timeout: 5000 });
    
    const launchTime = Date.now() - startTime;
    expect(launchTime).toBeLessThan(3000);
    
    console.log(\`App launched in \${launchTime}ms\`);
  });

  it('should scroll smoothly', async () => {
    const list = await $('~items-list');
    
    const startMetrics = await driver.getPerformanceData(
      'com.example.app',
      'cpuinfo',
      2
    );
    
    // Scroll
    for (let i = 0; i < 10; i++) {
      await driver.execute('mobile: scroll', {
        direction: 'down',
        element: list,
      });
    }
    
    const endMetrics = await driver.getPerformanceData(
      'com.example.app',
      'cpuinfo',
      2
    );
    
    // CPU usage should stay reasonable
    const avgCpu = (startMetrics[1] + endMetrics[1]) / 2;
    expect(avgCpu).toBeLessThan(80);
  });
});
\`\`\`

### Memory Consumption

\`\`\`javascript
it('should not leak memory', async () => {
  const getMemoryUsage = async () => {
    const data = await driver.getPerformanceData(
      'com.example.app',
      'memoryinfo',
      2
    );
    return parseInt(data[0][0]); // Native heap size
  };

  const initialMemory = await getMemoryUsage();
  
  // Perform memory-intensive operations
  for (let i = 0; i < 20; i++) {
    await $('~open-image').click();
    await driver.pause(500);
    await $('~close-image').click();
  }
  
  // Force garbage collection (if possible)
  await driver.pause(3000);
  
  const finalMemory = await getMemoryUsage();
  const memoryIncrease = finalMemory - initialMemory;
  
  console.log(\`Memory increased by \${memoryIncrease / 1024}MB\`);
  expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 50MB
});
\`\`\`

### Battery Impact

\`\`\`javascript
it('should not drain battery excessively', async () => {
  if (driver.isAndroid) {
    const batteryInfo = await driver.execute('mobile: batteryInfo');
    const initialLevel = batteryInfo.level;
    
    // Run app for extended period
    await driver.pause(60000); // 1 minute
    
    const finalBatteryInfo = await driver.execute('mobile: batteryInfo');
    const finalLevel = finalBatteryInfo.level;
    
    const batteryDrain = initialLevel - finalLevel;
    console.log(\`Battery drained: \${batteryDrain}% in 1 minute\`);
    
    expect(batteryDrain).toBeLessThan(5); // Less than 5% per minute
  }
});
\`\`\`

## Permission Testing

\`\`\`javascript
describe('App Permissions', () => {
  it('should request camera permission', async () => {
    await $('~take-photo-button').click();
    
    if (driver.isIOS) {
      const alert = await driver.getAlertText();
      expect(alert).toContain('access the camera');
      await driver.acceptAlert();
    } else {
      const permissionDialog = await $('//*[@text="Allow"]');
      await permissionDialog.click();
    }
    
    await expect($('~camera-view')).toBeDisplayed();
  });

  it('should handle denied location permission', async () => {
    await $('~find-nearby-button').click();
    
    // Deny permission
    if (driver.isIOS) {
      await driver.dismissAlert();
    } else {
      await $('//*[@text="Deny"]').click();
    }
    
    await expect($('~permission-denied-message')).toBeDisplayed();
    await expect($('~settings-button')).toBeDisplayed();
  });
});
\`\`\`

## Push Notification Testing

\`\`\`javascript
describe('Push Notifications', () => {
  it('should display notification', async () => {
    // Send push notification
    await driver.execute('mobile: pushNotification', {
      bundleId: 'com.example.app',
      payload: {
        aps: {
          alert: 'Test notification',
          badge: 1,
        },
      },
    });
    
    // Put app in background
    await driver.background(2);
    
    // Verify notification appears
    const notification = await $('~notification-title');
    await expect(notification).toHaveText('Test notification');
    
    // Tap notification
    await notification.click();
    
    // Verify app opens to correct screen
    await expect($('~notification-detail')).toBeDisplayed();
  });
});
\`\`\`

## App Store Compliance

### Screenshot Automation

\`\`\`javascript
const generateAppStoreScreenshots = async () => {
  const screens = [
    { route: 'home', wait: 2000 },
    { route: 'products', wait: 3000 },
    { route: 'cart', wait: 2000 },
    { route: 'profile', wait: 2000 },
  ];

  for (const { route, wait } of screens) {
    await $(\`~nav-\${route}\`).click();
    await driver.pause(wait);
    
    await driver.saveScreenshot(
      \`./screenshots/appstore/\${route}-\${driver.getPlatform()}.png\`
    );
  }
};
\`\`\`

## CI/CD Integration

\`\`\`yaml
# .github/workflows/mobile-tests.yml
name: Mobile Tests

on: [push, pull_request]

jobs:
  ios-tests:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Start Appium
        run: |
          npm install -g appium
          appium &
      
      - name: Run iOS tests
        run: npm run test:ios
      
      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: ios-screenshots
          path: screenshots/

  android-tests:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Android SDK
        uses: android-actions/setup-android@v2
      
      - name: Create Android Emulator
        run: |
          sdkmanager "system-images;android-33;google_apis;x86_64"
          avdmanager create avd -n test -k "system-images;android-33;google_apis;x86_64"
      
      - name: Start Emulator
        run: |
          emulator -avd test -no-window -no-audio &
          adb wait-for-device
      
      - name: Run Android tests
        run: npm run test:android
\`\`\`

## Best Practices Summary

### Do's
- ✅ Test on real devices when possible
- ✅ Cover multiple OS versions
- ✅ Test network edge cases
- ✅ Monitor performance metrics
- ✅ Test app permissions thoroughly
- ✅ Automate repetitive tests
- ✅ Use device farms for scale
- ✅ Test app lifecycle events

### Don'ts
- ❌ Test only on emulators
- ❌ Ignore device fragmentation
- ❌ Skip performance testing
- ❌ Forget about battery impact
- ❌ Ignore platform-specific features
- ❌ Hard-code wait times
- ❌ Test only in perfect conditions

## Conclusion

Mobile testing requires a comprehensive approach covering functionality, compatibility, performance, and user experience across diverse devices and conditions.

Start with critical user journeys, expand to edge cases, and continuously monitor real-world usage to refine your testing strategy.
`,
  },
];