-- Location Table
DROP TABLE IF EXISTS location CASCADE;
CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    suburb VARCHAR(100) NOT NULL,
    postcode CHAR(4) NOT NULL,
    state VARCHAR(3) NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    elevation DECIMAL(6, 2),
    population INT NOT NULL,
    median_income DECIMAL(12, 2),
    sqkm DECIMAL(10, 4) NOT NULL
);

-- Property Table
DROP TABLE IF EXISTS property CASCADE;
CREATE TABLE property (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    property_size INT,
    km_from_cbd NUMERIC(10, 2),
    location_id INT REFERENCES location(id) ON DELETE SET NULL,
    inflation_index DECIMAL(6, 1)
);

-- Property Features Table
DROP TABLE IF EXISTS property_features CASCADE;
CREATE TABLE property_features (
    property_id INT PRIMARY KEY REFERENCES property(id) ON DELETE CASCADE,
    num_bed INT,
    num_bath INT,
    num_parking INT
);

-- Sales Transaction Table
DROP TABLE IF EXISTS sale_transaction CASCADE;
CREATE TABLE sale_transaction (
    id SERIAL PRIMARY KEY,
    property_id INT NOT NULL REFERENCES property(id) ON DELETE CASCADE,
    sale_price DECIMAL(12, 2) NOT NULL,
    sale_date DATE NOT NULL
    -- sale_type VARCHAR(50)
);

-- Median Rent Report Table
DROP TABLE IF EXISTS median_rent_report CASCADE;
CREATE TABLE median_rent_report (
    id SERIAL PRIMARY KEY,
    postcode CHAR(4) NOT NULL,
    type VARCHAR(50) NOT NULL, 
    num_bed VARCHAR(50),
    q1 DECIMAL(12, 2) NOT NULL,
    q2 DECIMAL(12, 2) NOT NULL,
    q3 DECIMAL(12, 2) NOT NULL
);

-- EXTRA (NOT NEEDED ATM)

-- Price History Table
-- CREATE TABLE price_history (
--     id SERIAL PRIMARY KEY,
--     property_id INT NOT NULL REFERENCES property(id) ON DELETE CASCADE,
--     price DECIMAL(12, 2) NOT NULL,
--     effective_date DATE NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );