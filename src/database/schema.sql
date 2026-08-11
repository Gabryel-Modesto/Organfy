
-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE users (
	id_user SERIAL PRIMARY KEY,

	name_user VARCHAR(150) NOT NULL,

	email_user VARCHAR(255) NOT NULL UNIQUE,

	password_user VARCHAR(255),

	birth_date_user DATE,

	created_at_user TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

	updated_at_user TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

	deleted_at_user TIMESTAMPTZ
);

-- ============================================================
-- CATEGORIES
-- ============================================================

CREATE TABLE categories(
    id_category SERIAL PRIMARY KEY,

    id_user INTEGER NOT NULL,

    name_category VARCHAR(100) NOT NULL,

    color_category VARCHAR(20),

    icon_category VARCHAR(100),

    type_category VARCHAR(20) NOT NULL DEFAULT 'EXPENSE'
        CHECK (type_category IN ('EXPENSE', 'INCOME')),

    active_category BOOLEAN NOT NULL DEFAULT TRUE,

    created_at_category TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at_category TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    deleted_at_category TIMESTAMPTZ,

    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- ============================================================
-- PAYMENT METHODS
-- ============================================================

CREATE TABLE payment_methods(
    id_payment_method SERIAL PRIMARY KEY,

    id_user INTEGER NOT NULL,

    name_payment_method VARCHAR(100) NOT NULL,

    active_payment_methods BOOLEAN NOT NULL DEFAULT TRUE,

    created_at_payment_methods TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at_payment_methods TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    deleted_at_payment_methods TIMESTAMPTZ,

    FOREIGN KEY (id_user)
        REFERENCES users(id_user)
);


-- ============================================================
-- GOALS
-- ============================================================

CREATE TABLE goals(
    id_goal SERIAL PRIMARY KEY,

    id_user INTEGER NOT NULL,

    name_goal VARCHAR(150) NOT NULL,

    target_amount_goal NUMERIC(10,2) NOT NULL,

    deadline_goal DATE,

    active_goal BOOLEAN NOT NULL DEFAULT TRUE,

    created_at_goal TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at_goal TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    deleted_at_goal TIMESTAMPTZ,

    FOREIGN KEY (id_user)
        REFERENCES users(id_user),

    CHECK (target_amount_goal > 0)
);


-- ============================================================
-- TRANSACTIONS
-- ============================================================

CREATE TABLE transactions(
    id_transaction SERIAL PRIMARY KEY,

    id_user INTEGER NOT NULL,

    id_category INTEGER NOT NULL,

    id_payment_method INTEGER NOT NULL,

    description_transaction VARCHAR(255) NOT NULL,

    amount_transaction NUMERIC(10,2) NOT NULL,

    type_transaction VARCHAR(20) NOT NULL
        CHECK (type_transaction IN ('Income', 'Expense')),

    purchase_date_transaction DATE NOT NULL,

    due_date_transaction DATE,

    payment_date_transaction DATE,

    paid_transaction BOOLEAN NOT NULL DEFAULT FALSE,

    installment_transaction BOOLEAN NOT NULL DEFAULT FALSE,

    installment_number_transaction INTEGER,

    total_installments_transaction INTEGER,

    notes_transaction TEXT,

    recurring_transaction BOOLEAN NOT NULL DEFAULT FALSE,

    created_at_transaction TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at_transaction TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    deleted_at_transaction TIMESTAMPTZ,

    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_category) REFERENCES categories(id_category),
    FOREIGN KEY (id_payment_method) REFERENCES payment_methods(id_payment_method),

    CHECK (amount_transaction > 0),
    CHECK (installment_transaction = FALSE
        OR (
            installment_number_transaction IS NOT NULL
            AND total_installments_transaction IS NOT NULL
            AND installment_number_transaction > 0
            AND total_installments_transaction > 0
            AND installment_number_transaction <= total_installments_transaction
        )
    )
);


-- ============================================================
-- GOAL TRANSACTIONS
-- ============================================================

CREATE TABLE goal_transactions(
    id_goal_transaction SERIAL PRIMARY KEY,

    id_goal INTEGER NOT NULL,

    id_transaction INTEGER NOT NULL UNIQUE,

    created_at_goal_transaction TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at_goal_transaction TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    deleted_at_goal_transaction TIMESTAMPTZ,

    FOREIGN KEY (id_goal) REFERENCES goals(id_goal),
    FOREIGN KEY (id_transaction) REFERENCES transactions(id_transaction)
);


-- ============================================================
-- ÍNDICES
-- ============================================================

CREATE INDEX idx_transactions_user ON transactions(id_user);
CREATE INDEX idx_transactions_due_date ON transactions(due_date_transaction);
CREATE INDEX idx_transactions_category ON transactions(id_category);
CREATE INDEX idx_transactions_payment_method ON transactions(id_payment_method);
CREATE INDEX idx_goals_user ON goals(id_user);
CREATE INDEX idx_goal_transactions_goal ON goal_transactions(id_goal);
CREATE INDEX idx_goal_transactions_transaction ON goal_transactions(id_transaction);

-- ============================================================
-- EVITAR NOMES DUPLICADOS ATIVOS POR USUÁRIO
-- ============================================================

CREATE UNIQUE INDEX uq_categories_user_name_active
ON categories(id_user, LOWER(name_category))
WHERE active_category = TRUE;

CREATE UNIQUE INDEX uq_payment_methods_user_name_active
ON payment_methods(id_user, LOWER(name_payment_method))
WHERE active_payment_methods = TRUE;

CREATE UNIQUE INDEX uq_goals_user_name_active
ON goals(id_user, LOWER(name_goal))
WHERE active_goal = TRUE;	