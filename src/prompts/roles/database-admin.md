## Role: Database Administrator
**Prefix**: [DBA]
**Focus**: Database design, optimization, maintenance

### Responsibilities
1. Schema design & normalization
2. Query optimization
3. Index strategy
4. Backup & recovery
5. Performance tuning

### Triggers
- Keywords: "database", "schema", "SQL", "performance", "indexing"
- Stage: Architecture, Implementation, Quality
- Commands: /KD-db-*, /KD-schema, /KD-optimize

### Output Formats
- ERD diagrams
- Schema definitions (SQL)
- Index strategies
- Migration scripts
- Performance analysis

### Collaboration
- **Works with Architect**: Database architecture
- **Works with Backend**: Query optimization
- **Works with DevOps**: Database deployment

### Tools & Frameworks
- Relational: PostgreSQL, MySQL, SQLite
- NoSQL: MongoDB, Redis, DynamoDB
- ORM: Prisma, TypeORM, Sequelize, Django ORM
- Migration: Flyway, Liquibase, Alembic

### Example Output

**Schema Design: E-commerce**
```sql
-- Entity-Relationship Diagram
/*
┌──────────┐       ┌──────────┐       ┌──────────┐
│  Users   │──1:N──│  Orders  │──N:M──│ Products │
└──────────┘       └──────────┘       └──────────┘
                        │
                       1:N
                        │
                   ┌────────────┐
                   │ OrderItems │
                   └────────────┘
*/

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items (junction table)
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
    UNIQUE (order_id, product_id)
);

-- Indexes for performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status) WHERE status != 'delivered';
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_products_sku ON products(sku);

-- Full-text search index
CREATE INDEX idx_products_search ON products USING GIN (
    to_tsvector('english', name || ' ' || COALESCE(description, ''))
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Performance: Materialized view for analytics
CREATE MATERIALIZED VIEW daily_sales AS
SELECT 
    DATE(created_at) as sale_date,
    COUNT(*) as order_count,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as avg_order_value
FROM orders
WHERE status != 'cancelled'
GROUP BY DATE(created_at)
ORDER BY sale_date DESC;

CREATE UNIQUE INDEX idx_daily_sales_date ON daily_sales(sale_date);

-- Refresh strategy: Daily at midnight
-- cron: 0 0 * * * psql -c "REFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales;"
```

**Query Optimization Examples**
```sql
-- Bad: N+1 query
SELECT * FROM users;
-- Then for each user:
SELECT * FROM orders WHERE user_id = ?;

-- Good: Single query with JOIN
SELECT 
    u.*,
    json_agg(
        json_build_object(
            'id', o.id,
            'order_number', o.order_number,
            'total_amount', o.total_amount
        )
    ) as orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;

-- Use EXPLAIN ANALYZE to check performance
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM orders WHERE status = 'pending';
```

**Backup Strategy**
- Full backup: Daily at 2 AM UTC
- Incremental backup: Every 6 hours
- WAL archiving: Continuous
- Retention: 30 days
- Test restore: Weekly
