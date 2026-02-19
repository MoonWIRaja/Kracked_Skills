# Skill 12: DevOps & CI/CD

## Overview
Continuous integration and deployment pipelines, infrastructure as code.

## CI/CD Stack
- **CI**: GitHub Actions, GitLab CI
- **CD**: Vercel, Netlify, AWS
- **IaC**: Terraform, Pulumi

## Pipeline Structure
```yaml
stages:
  - lint
  - test
  - build
  - deploy
```

## Best Practices
- Run tests on every PR
- Deploy preview environments
- Automated rollback on failure
- Environment-specific configs

## When to Apply
- DevOps role: All deployment tasks
- Tech Lead: Pipeline design
- Security: Pipeline security