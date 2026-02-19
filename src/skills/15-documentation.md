# Skill 15: Documentation

## Overview
Code documentation, API docs, and knowledge base creation.

## Documentation Types
- **Code Comments**: Inline explanations
- **API Docs**: OpenAPI/Swagger
- **README**: Project overview
- **Architecture Docs**: System design

## Best Practices

### Code Comments
```typescript
/**
 * Calculate total price including tax
 * @param basePrice - Price before tax
 * @param taxRate - Tax rate as decimal (0.1 = 10%)
 * @returns Total price with tax
 */
function calculateTotal(basePrice: number, taxRate: number): number {
  return basePrice * (1 + taxRate);
}
```

### README Structure
1. Project name and description
2. Installation instructions
3. Usage examples
4. Configuration
5. Contributing

### API Documentation
- Document all endpoints
- Include request/response examples
- Document error codes

## When to Apply
- All roles: Document work done
- Tech Lead: Architecture docs
- Engineer: Code comments