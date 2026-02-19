# API Design Patterns

## RESTful Patterns

### Resource Naming
- Use plural nouns: `/users`, `/products`
- Use kebab-case: `/user-profiles`
- Avoid verbs in paths

### Response Format
```json
{
  "data": {},
  "error": null,
  "meta": {}
}
```

### Error Handling
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": []
  }
}
```

## Best Practices
- Version APIs: `/api/v1/`
- Use proper HTTP methods
- Implement pagination
- Include rate limiting