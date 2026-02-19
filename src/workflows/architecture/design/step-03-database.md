---
step_id: "03-database"
agent: "architect"
estimated_tokens: 2500
---

# Step 3: Database

## Context
Design database schema and data models.

## Instructions

### 1. Entity Identification

List all entities from:
- User stories
- PRD requirements
- Business objects

### 2. ERD Design

Create entity relationships:
- One-to-one
- One-to-many
- Many-to-many

### 3. Schema Definition

For each table:
- Table name
- Columns with types
- Primary keys
- Foreign keys
- Indexes

### 4. Migration Strategy

Plan database migrations:
- Initial schema
- Future migrations

## Output Format

```
[ARCH] 🗄️ Database Schema Defined

## Tables

### [table_name]
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| created_at | TIMESTAMPTZ | NOT NULL |

## Relationships
- [Table A] → [Table B] (1:N)
- [Table C] ↔ [Table D] (N:M)

## Indexes
- [index_name] on [table].[column]

**Next:** Proceeding to Step 4: API...