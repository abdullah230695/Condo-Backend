module.exports = CREATE_TABLE_QUERY = {
  ADMINS: `CREATE TABLE IF NOT EXISTS admins(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    status VARCHAR(255) DEFAULT "active",
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`,
  UNITS: `CREATE TABLE units (
    id INT PRIMARY KEY AUTO_INCREMENT,
    unit VARCHAR(50) NOT NULL,
    block VARCHAR(50),
    floor VARCHAR(255) NOT NULL,
    sqft_details TEXT,
    flat_type VARCHAR(255),
    water_code VARCHAR(255) UNIQUE,
    eb_code VARCHAR(50) UNIQUE,
    unit_doc_attachment TEXT,
    parking_slot_count INT,
    parking_alloc_nos JSON,
    unit_status VARCHAR(50) DEFAULT "active"
)`,
};
