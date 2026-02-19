# Database Design Patterns

## Naming Conventions
- Tables: snake_case, plural (`users`, `order_items`)
- Columns: snake_case (`created_at`, `user_id`)
- Primary keys: `id` (UUID preferred)

## Standard Columns
Every table should have:
- `id` UUID PRIMARY KEY
- `created_at` TIMESTAMPTZ NOT NULL
- `updated_at` TIMESTAMPTZ NOT NULL

## Index Patterns
- Index foreign keys
- Index frequently queried columns
- Use composite indexes for common queries

## Migration Best Practices
- Always use transactions
- Never delete data in migrations
- Make migrations reversible