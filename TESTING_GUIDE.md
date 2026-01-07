# Code Coverage Strategy for Provax Frontend

## Current Status
- **Coverage**: 0% (953 lines to cover)
- **Target**: ≥80% (Enterprise Financial Governance Gate requirement)
- **Testing Framework**: Jest + React Testing Library (Just installed)

## Quick Start

### Run Tests
```bash
npm test                # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report
```

## Testing Strategy - Priority Order

### Phase 1: Utility Functions & Data Files (Quick Wins - 30%)
These files have zero external dependencies and are easiest to test:

**Start with:**
1. **src/lib/utils.ts** - Pure utility functions
   - String/number formatters
   - Array/object helpers
   - Conditional rendering logic

2. **src/data/*.ts** - Mock data files
   - provider-data.ts
   - marketing-data.ts
   - dashboard-data.ts
   - users.ts
   - common-constants.ts

3. **src/lib/password.ts** - Password validation
4. **src/lib/chart-utils.ts** - Chart formatting functions
5. **src/lib/table-utils.ts** - Table helper functions

**Test approach:** Unit tests with mocked external dependencies

### Phase 2: Hooks (20%)
1. **src/hooks/use-is-mobile.ts** - Mobile detection
2. **src/hooks/queries/use-auth.ts** - Auth query hook

**Test approach:** React Hooks testing library

### Phase 3: Simple Components (20%)
Focus on UI components without complex logic:
1. **src/components/ui/** - Basic UI components
   - badge.tsx
   - alert.tsx
   - progress.tsx
   - skeleton.tsx
   - button.tsx

2. **src/components/heading.tsx**
3. **src/components/logo.tsx**
4. **src/components/marquee.tsx**

**Test approach:** Component rendering + props validation

### Phase 4: Form Components (15%)
1. **src/components/forms/auth/auth-form-utils.tsx**
2. **src/components/ui/form-components.tsx**
3. **src/components/ui/table-components.tsx**

**Test approach:** Component + user interaction tests

### Phase 5: Complex Components (15%)
These require mocking multiple dependencies and API calls:
1. **src/components/certification/certification-management.tsx**
2. **src/components/vehicle-marketplace-management/vehicle-marketplace-management.tsx**
3. **src/provider-components/** - Provider-specific components

**Test approach:** Full component testing + API mocking

## Test File Structure

Create tests in: **src/__tests__/**

```
src/__tests__/
├── utils/
│   └── utils.test.ts
├── hooks/
│   ├── use-is-mobile.test.ts
│   └── use-auth.test.ts
├── components/
│   ├── ui/
│   │   └── button.test.tsx
│   └── forms/
│       └── login-form.test.tsx
├── data/
│   └── provider-data.test.ts
└── example.test.ts
```

## Example Test Templates

### 1. Utility Function Test
```typescript
// src/__tests__/utils/utils.test.ts
import { describe, it, expect } from '@jest/globals';
import { yourFunction } from '@/lib/utils';

describe('Utils', () => {
  it('should format string correctly', () => {
    expect(yourFunction('input')).toBe('expected output');
  });
});
```

### 2. Component Test
```typescript
// src/__tests__/components/ui/button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('should handle click', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    screen.getByRole('button').click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

### 3. Hook Test
```typescript
// src/__tests__/hooks/use-is-mobile.test.ts
import { renderHook } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-is-mobile';

describe('useIsMobile', () => {
  it('should return correct mobile status', () => {
    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe('boolean');
  });
});
```

## SonarQube Integration

After writing tests, generate coverage report:
```bash
npm run test:coverage
```

SonarQube will automatically pick up coverage from `coverage/` folder during analysis:
```bash
npx sonar-scanner
```

## Coverage Thresholds

Jest is configured with these minimum thresholds:
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

Tests will fail if coverage drops below these levels.

## Development Workflow

1. Write test file alongside or before implementation
2. Run `npm run test:watch` during development
3. Tests should pass before committing
4. Run `npm run test:coverage` before final PR submission
5. Coverage report available in `coverage/` folder

## Files to Skip Testing

These are excluded from coverage (configured in jest.config.ts):
- **src/app/** - Next.js routes/pages
- **src/lib/auth/** - Auth configuration
- **src/middleware.ts** - Request middleware
- ***.d.ts** - Type definition files
- **index.ts** - Re-exports

## Next Steps

1. Create utility function tests first (easiest, quick wins)
2. Test hook files
3. Test simple UI components
4. Test form components with user interactions
5. Test complex features with API mocking

Aim for 80% coverage = ~760 lines covered out of 953

Good luck! 🚀
