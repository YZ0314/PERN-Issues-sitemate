CREATE DATABASE perntIssues;

CREATE TABLE Issues( 
  todo_id SERIAL PRIMARY KEY,
  title VARCHAR(25),
  description VARCHAR(255)
);