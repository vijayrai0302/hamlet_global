-- =============================================================================
-- Hamlet Global Database Schema
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products
CREATE TABLE IF NOT EXISTS products (
    id              VARCHAR(50)  PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    category        VARCHAR(20)  NOT NULL CHECK (category IN ('gemstone', 'jewellery', 'pre-owned')),
    subcategory     VARCHAR(100) NOT NULL,
    price           DECIMAL(12, 2),                     -- NULL = Request Price
    description     TEXT         NOT NULL,
    cert_authority  VARCHAR(5)   CHECK (cert_authority IN ('GIA', 'IGI', 'SGL')),
    cert_number     VARCHAR(100),
    weight          VARCHAR(50),
    origin          VARCHAR(100),
    cut             VARCHAR(100),
    clarity         VARCHAR(100),
    color           VARCHAR(100),
    metal           VARCHAR(100),
    occasion        VARCHAR(200),
    is_available    BOOLEAN      NOT NULL DEFAULT TRUE,
    is_featured     BOOLEAN      NOT NULL DEFAULT FALSE,
    is_new          BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Product Images
CREATE TABLE IF NOT EXISTS product_images (
    id          SERIAL       PRIMARY KEY,
    product_id  VARCHAR(50)  NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url         VARCHAR(500) NOT NULL,
    position    INTEGER      NOT NULL DEFAULT 0
);

-- Inquiries / Leads
CREATE TABLE IF NOT EXISTS inquiries (
    id          SERIAL       PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    phone       VARCHAR(50),
    country     VARCHAR(100),
    interest    VARCHAR(200),
    budget      VARCHAR(100),
    message     TEXT         NOT NULL,
    product_id  VARCHAR(50),
    status      VARCHAR(20)  NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'closed')),
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category        ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_is_featured     ON products (is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_available    ON products (is_available);
CREATE INDEX IF NOT EXISTS idx_product_images_product   ON product_images (product_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status         ON inquiries (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at     ON inquiries (created_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
