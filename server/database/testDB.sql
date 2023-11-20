TRUNCATE users RESTART IDENTITY CASCADE;
TRUNCATE token RESTART IDENTITY CASCADE;
TRUNCATE user_score RESTART IDENTITY CASCADE;
TRUNCATE questions_battle RESTART IDENTITY CASCADE;
TRUNCATE questions_story RESTART IDENTITY CASCADE;
TRUNCATE avatar RESTART IDENTITY CASCADE;
TRUNCATE games RESTART IDENTITY CASCADE;

INSERT INTO avatar (img_url, gender, skin_colour)
VALUES
('url_test1', 'Male', 'Dark'),
('url_test2', 'Female', 'Light');

INSERT INTO users (username, password, email, avatar_id)
VALUES
('1','1', 'test1@gmail.com', 1),
('2','2', 'test2@gmail.com', 1);

INSERT INTO token(user_id, token)
VALUES (1,'tokenTest1'),
       (2,'tokenTest2');

INSERT INTO user_score(user_id, score)
VALUES (1,10),
       (2,20);

INSERT INTO questions_battle(question, answer)
VALUES ('testBQ1','testBA1'),
       ('testBQ2','testBA2');

INSERT INTO questions_story(section_id, title, explanation, example)
VALUES (1,'testTitle1', 'explanation1', 'example1'),
       (2,'testTitle2', 'explanation2', 'example2');

INSERT INTO games(user_id, date_played, game_status)
VALUES (1, '2023-11-20', true),
       (2, '2023-12-20', false);





