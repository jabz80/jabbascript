DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS user_score CASCADE;
DROP TABLE IF EXISTS questions_battle CASCADE;
DROP TABLE IF EXISTS questions_story CASCADE;
DROP TABLE IF EXISTS avatar CASCADE;

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

CREATE TABLE avatar(
  avatar_id INT GENERATED ALWAYS AS IDENTITY,
  img_url VARCHAR(255) NOT NULL,
  user_id INT,
  PRIMARY KEY (avatar_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE questions_story(
    q_story_id INT GENERATED ALWAYS AS IDENTITY,
    question VARCHAR(200) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY (q_story_id)
);

INSERT INTO questions_battle(question, answer)
VALUES
('Print "Hello, World!" to the console.', 'print("Hello, World!")'),
('Create a variable age and assign your age to it. Then print the value of the variable.', 'age = 10'),
('Calculate the sum of 5 and 7 and print the result.', 'result = 5 + 7 
print(result)'),
('Create a variable name with your name and print it in uppercase.', 'name = "John"  # Replace John with your name
print(name.upper())'),
('Ask the user for their age and print it.', 'age = input("Enter your age: ")
print("Your age is:", age)'),
('Check if a number is even. Print "Even" if it is, "Odd" otherwise.', 'num = 8  # Replace 8 with any number
if num % 2 == 0:
	print("Even")
else:
	print("Odd")'),
('Print numbers from 1 to 5 using a loop.', 'for i in range(1, 6):
	print(i)'),
('Create a list of fruits (apple, banana, orange) and print each item in the list.', 'fruits = ["apple", "banana", "orange"]
for fruit in fruits:
	print(fruit)'),
('Add "grape" to the list of fruits from the previous question and print the updated list.', 'fruits.append("grape")
print(fruits)'),
('Create a function that adds two numbers and returns the result. Then call the function with any two numbers.','def add_numbers(a, b):
	return a + b
result = add_numbers(3, 7)  # Add any two numbers
print(result)'),
('Check if a number is greater than 10 and less than 20. Print "In range" if true, "Out of range" otherwise.', 'num = 15  # Replace 15 with any number
if 10 < num < 20:
	print("In range")
else:
	print("Out of range")');

INSERT INTO avatar(img_url)
VALUES (
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png'
  ),
  (
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png'
  ),
  (
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png'

  ),
  (
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png'

  ),
  (
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/5.png'

  ),
  (
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png'

  ),
  (
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/7.png'

  ),
  (
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/8.png'

  ),
  (
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/9.png'

  ),
  (
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10.png'
    
  );






