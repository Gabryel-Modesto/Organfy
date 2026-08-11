CREATE TABLE users(
	id_user SERIAL PRIMARY KEY,
	name_user VARCHAR (150) NOT NULL,
	email_user VARCHAR(255) NOT NULL UNIQUE,
	password_user VARCHAR(255),
	birth_date_user DATE,
	created_at_user TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at_user TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at_user TIMESTAMPTZ 
);

CREATE TABLE categories(
	id_category SERIAL PRIMARY KEY,
	id_user INTEGER NOT NULL,
	name_category VARCHAR(100) NOT NULL,
	color_category VARCHAR(20),
	icon_category VARCHAR(100),
    created_at_category TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at_category TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at_category TIMESTAMPTZ,
	
	FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE payment_methods (
	id_payment_method SERIAL PRIMARY KEY,
	id_user INTEGER NOT NULL,
	name_payment_method VARCHAR(100) NOT NULL,
	created_at_payment_methods TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at_payment_methods TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at_payment_methods TIMESTAMPTZ,
	
	FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE goals(
	id_goal SERIAL PRIMARY KEY,
	id_user INTEGER NOT NULL,
	name_goal VARCHAR(150) NOT NULL,
	target_amount_goal NUMERIC (10,2) NOT NULL,
	deadline_goal DATE,
	active_goal BOOLEAN NOT NULL DEFAULT TRUE,
	created_at_goal TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at_goal TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at_goal TIMESTAMPTZ,
	
	FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE goal_transactions (
    id_goal_transaction SERIAL PRIMARY KEY,
    id_goal INTEGER NOT NULL,
    amount_goal_transaction NUMERIC(10,2) NOT NULL,
    transaction_date_goal_transaction DATE NOT NULL,
    description_goal_transaction VARCHAR(255),
    created_at_goal_transaction TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at_goal_transaction TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	deleted_at_goal_transaction TIMESTAMPTZ,
	
    FOREIGN KEY (id_goal) REFERENCES goals(id_goal)

);

CREATE TABLE transactions(
	id_transaction SERIAL PRIMARY KEY,
	id_user INTEGER NOT NULL,
	id_category INTEGER NOT NULL,
	id_payment_method INTEGER NOT NULL,
	description_transaction VARCHAR(255) NOT NULL,
	amount_transaction NUMERIC(10, 2) NOT NULL,
	type_transaction VARCHAR(20) NOT NULL CHECK (type_transaction IN ('Income', 'Expense')),
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
    FOREIGN KEY (id_payment_method) REFERENCES payment_methods(id_payment_method)

);

CREATE INDEX idx_transactions_user ON transactions(id_user);
CREATE INDEX idx_transactions_due_date ON transactions(due_date_transaction);
CREATE INDEX idx_transactions_category ON transactions(id_category);
CREATE INDEX idx_transactions_payment_method ON transactions(id_payment_method);


SELECT * FROM users;

ALTER TABLE categories
ADD COLUMN type_category VARCHAR(20) NOT NULL DEFAULT 'EXPENSE';

ALTER TABLE categories
ADD COLUMN active_category BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE payment_methods
ADD COLUMN active_payment_methods BOOLEAN NOT NULL DEFAULT TRUE;


SELECT * FROM categories;
SELECT * FROM payment_methods;
