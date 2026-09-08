-- ============================================
-- SMART TO-DO MANAGER DATABASE SCHEMA
-- ============================================

-- ============================================
-- USERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- CATEGORIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    name VARCHAR(100) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_category_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_category
        UNIQUE (user_id, name)
);


-- ============================================
-- TASKS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    category_id INTEGER,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    priority VARCHAR(20) DEFAULT 'MEDIUM',

    status VARCHAR(20) DEFAULT 'TODO',

    due_date TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_task_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_task_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE SET NULL,

    CONSTRAINT check_task_priority
        CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),

    CONSTRAINT check_task_status
        CHECK (status IN ('TODO', 'IN_PROGRESS', 'COMPLETED'))
);


-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_tasks_user_id
ON tasks(user_id);

CREATE INDEX IF NOT EXISTS idx_tasks_category_id
ON tasks(category_id);

CREATE INDEX IF NOT EXISTS idx_tasks_status
ON tasks(status);

CREATE INDEX IF NOT EXISTS idx_tasks_priority
ON tasks(priority);

CREATE INDEX IF NOT EXISTS idx_tasks_due_date
ON tasks(due_date);