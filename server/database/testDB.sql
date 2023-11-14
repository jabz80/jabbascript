TRUNCATE users RESTART IDENTITY CASCADE;
TRUNCATE token RESTART IDENTITY CASCADE;
TRUNCATE user_score RESTART IDENTITY CASCADE;
TRUNCATE questions_battle RESTART IDENTITY CASCADE;
TRUNCATE questions_story RESTART IDENTITY CASCADE;

INSERT INTO users (username, password, email)
VALUES
('1','1', 'test1@gmail.com'),
('2','2', 'test2@gmail.com'),;

INSERT INTO token(user_id, token)
VALUES (1,'tokenTest1'),
       (2,'tokenTest2');

INSERT INTO user_score(user_id, score)
VALUES (1,10),
       (2,20);

INSERT INTO questions_battle(question, answer)
VALUES ('testBQ1','testBA1'),
       ('testBQ2','testBA2');

INSERT INTO questions_story(question, answer)
VALUES ('testSQ1','testSA1'),
       ('testSQ2','testSA2');



