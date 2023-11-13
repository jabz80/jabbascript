DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS user_score CASCADE;
DROP TABLE IF EXISTS questions_battle;
DROP TABLE IF EXISTS questions_story;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL, 
    email VARCHAR(200) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE user_score(
    score_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY (score_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE questions_battle(
    q_battle_id INT GENERATED ALWAYS AS IDENTITY,
    question VARCHAR(200) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY (q_battle_id)
);

CREATE TABLE questions_story(
    q_story_id INT GENERATED ALWAYS AS IDENTITY,
    question VARCHAR(200) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY (q_story_id)
);




