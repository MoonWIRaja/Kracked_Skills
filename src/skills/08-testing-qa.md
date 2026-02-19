# Skill 08: Testing & QA

## Overview
Comprehensive testing strategies including unit, integration, and E2E testing.

## Testing Stack
- **Unit Testing**: Jest, Vitest
- **Integration**: Testing Library, MSW
- **E2E**: Playwright, Cypress

## Best Practices

### Test Structure
```typescript
describe('Feature', () => {
  it('should do something', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Coverage Targets
- Unit: 80%+
- Integration: 60%+
- E2E: Critical paths

## When to Apply
- QA role: All testing phases
- Engineer: During implementation
- Tech Lead: Test planning