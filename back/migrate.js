const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const createDatabaseAndTables = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
  );
  await connection.query(`USE \`${process.env.DB_NAME}\``);

  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS Users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      fonction VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createEventsTableQuery = `
    CREATE TABLE IF NOT EXISTS Events (
      event_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      start_datetime DATETIME NOT NULL,
      end_datetime DATETIME NOT NULL,
      logo VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(user_id)
    )
  `;

  const createTimersTableQuery = `
    CREATE TABLE IF NOT EXISTS Timers (
      timer_id INT AUTO_INCREMENT PRIMARY KEY,
      duration INT NOT NULL,
      start_time DATETIME,
      end_time DATETIME,
      sound_enabled BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createReportsTableQuery = `
    CREATE TABLE IF NOT EXISTS Reports (
      report_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      event_id INT,
      report_type VARCHAR(255) NOT NULL,
      data JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(user_id),
      FOREIGN KEY (event_id) REFERENCES Events(event_id)
    )
  `;

  const createActivitiesTableQuery = `
    CREATE TABLE IF NOT EXISTS Activities (
      activity_id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL
    )
  `;

  const createEventActivitiesTableQuery = `
    CREATE TABLE IF NOT EXISTS EventActivities (
      event_id INT,
      activity_id INT,
      PRIMARY KEY (event_id, activity_id),
      FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
      FOREIGN KEY (activity_id) REFERENCES Activities(activity_id) ON DELETE CASCADE
    )
  `;

  await connection.query(createUsersTableQuery);
  await connection.query(createEventsTableQuery);
  await connection.query(createTimersTableQuery);
  await connection.query(createReportsTableQuery);
  await connection.query(createActivitiesTableQuery);
  await connection.query(createEventActivitiesTableQuery);

  console.log("Database and tables created successfully.");
  await connection.end();
};

createDatabaseAndTables().catch((err) => {
  console.error("Migration failed:", err);
});
