# KD-version-check

Check latest versions and compatibility between technologies.

## Usage

```
/KD-version-check <tech1,tech2,tech3>
```

## Examples

```
/KD-version-check next.js,react,express
/KD-version-check react,vue,angular
/KD-version-check node,typescript,prisma
```

## What it does

1. **Checks latest versions** from npm registry and GitHub
2. **Identifies LTS versions** where available
3. **Checks compatibility** between selected technologies
4. **Generates recommendations** for your tech stack

## When to use

- During **brainstorming** to validate tech choices
- When creating **PRD** to specify version requirements
- During **architecture** phase to ensure compatibility
- Before **implementation** to avoid version conflicts

## Output

- Technology versions (latest, LTS)
- Compatibility issues
- Warnings and recommendations
- Suggested configuration

## Supported Technologies

**Frontend:** react, vue, angular, svelte, next.js, nuxt, astro, remix

**Backend:** express, nestjs, fastify, hono, fastapi, django, flask

**Database:** prisma, drizzle, mongoose, pg, supabase

**UI Libraries:** material-ui, chakra, ant-design, tailwindcss, shadcn

**Testing:** jest, vitest, playwright, cypress

**Build Tools:** vite, webpack, turbo

**Runtime:** node.js, bun, deno

---

**KD finishes what it starts.** | KRACKEDDEVS