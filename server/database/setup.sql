DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS user_score CASCADE;
DROP TABLE IF EXISTS questions_battle CASCADE;
DROP TABLE IF EXISTS questions_story CASCADE;
DROP TABLE IF EXISTS avatar CASCADE;

CREATE TABLE avatar(
  avatar_id INT GENERATED ALWAYS AS IDENTITY,
  img_url VARCHAR(255) NOT NULL,
  PRIMARY KEY (avatar_id)
);


CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL, 
    email VARCHAR(200) NOT NULL,
    avatar_id INT,
    PRIMARY KEY (user_id),
    FOREIGN KEY (avatar_id) REFERENCES avatar(avatar_id)
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
  question VARCHAR(1000) NOT NULL,
  answer VARCHAR(1000) NOT NULL,
  PRIMARY KEY (q_battle_id)
);

CREATE TABLE questions_story(
  q_story_id INT GENERATED ALWAYS AS IDENTITY,
  section_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  explanation VARCHAR(2000) NOT NULL,
  example VARCHAR(2000),
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

CREATE OR REPLACE FUNCTION set_initial_score()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_score (user_id, score)
  VALUES (NEW.user_id, 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Create a trigger to call the function when a new user is inserted
CREATE TRIGGER set_initial_score_trigger
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION set_initial_score();

INSERT INTO questions_story (section_id, title, explanation, example)
VALUES (
    1,
    'Intro',
    'Greetings warrior! Before fighting in Koding Kombat we must learn the ways of Python',
    'Let us start our training.'
  ),
  (
    1,
    'Question 1',
    'Good, now you try. Print "Hello World" for me.',
    'print("Hello World)'
  ),
  (
    1,
    'Printing a message',
    'First let us learn how to print a message. Pay attention.',
    'print("Greetings fellow warrior.")'
  ),
  (
    1,
    'Question 2',
    'Now you have 9 apples, create a variable called "number_of_apples" to define how many apples you have',
    'number_of_apples = 9'
  ),
  (
    1,
    'Variables',
    'A variable is a way of storing information in a computer programme. This information can change depending on certain conditions. Let us now learn how to create a variable. Since I have 10 apples, I shall create a variable called "number_of_apples" and set it to 10.',
    'number_of_apples = 10'
  ),
  (
    1,
    'Question 3',
    'Set a variable called double_quotes to the string "She''s the fiercest knight in the empire" with double quotes.\nSet another variable called single_quotes to the string ''She''s the fiercest knight in the empire'' with single quotes.',
    'double_quotes = "She''s the fiercest knight in the empire"\n single_quotes = ''She''s the fiercest knight in the empire'''
  ),
  (
    1,
    'Strings',
    'Computer programmers refer to blocks of text as strings. In Python a string is either surrounded by double quotes ("Hello world") or single quotes (''''Hello world''''). It doesn''t matter which kind you use, just be consistent.',
    'When I write: print("Greetings fellow warrior.") ''Greetings fellow warrior'', is a string.'
  ),
  (
    1,
    'Question 4',
    'Reset the variable single_quotes to the string ''Hello teacher''.',
    'single_quotes = ''Hello teacher'''
  ),
  (
    1,
    'Quotes',
    'Do you see the issue with the string in single quotes? The apostrophe in the string interferes with the string. So for this string, we should only use double quotes.',
    'Let us now return to variables.'
  ),
  (
    1,
    'Question 5',
    'Your health right now is at 100%. Set a variable called "my_health" to 100. Then print my_health.',
    'my_health = 100
    print(my_health)'
  ),
  (
    1,
    'Number Variables',
    'Let us now learn how to print what is stored inside a variable (number) I have 10 apples, so I have created a variable called "number_of_apples" and set it to 10. If I want to say how many apples I have I can write:',
    'number_of_apples = 10\nprint(number_of_apples)'
  ),
  (
    1,
    'Question 6',
    'Your health has now lowered to 85%. Change my_health to 85 and print my_health.',
    'my_health = 85
    print(my_health)'
  ),
  (
    1,
    'Changing Variables',
    'Since the value stored in variables can be changed let me show you how to do so. I originally had 10 apples',
    '// Initially I had 10 apples\nnumber_of_apples = 10\nprint(number_of_apples)\n// I have changed the number of apples to 8\nnumber_of_apples = 8\nprint(number_of_apples)'
  ),
  (
    1,
    'Question 7',
    'Show me how it''s done. Store the string "Greetings teacher" in a variable called my_greeting. Then print my_greeting.',
    'my_greeting = "Greetings teacher"
    print(my_greeting)'
  ),
  (
    1,
    'String Variables',
    'Variables don''t just have to contain numbers. Strings can also be used as well. Just as before, allow me to show you how to print a variable.',
    'teachers_greeting = "Greetings fellow student "\nprint(teachers_greeting)'
  ),
  (
    1,
    'Question 8',
    'Change what is stored in my_greeting to "How''s it going?"',
    'my_greeting = "How''s it going?"
    print(my_greeting)'
  ),
  (
    1,
    'Changing Variables II',
    'I shall now change the value of teachers_greeting and print the new value.',
    'teachers_greeting = "What is up? "\nprint(teachers_greeting)'
  ),
  (
    1,
    'Question 9',
    'Write a comment to say how you''re finding your training so far',
    '#'
  ),
  (
    1,
    'Comments',
    'We''re going to learn how to tell a computer to ignore a part of a program. Text written in a program but not run by the computer is called a comment. Python interprets anything after a # as a comment.',
    'Comments can:\n1. Provide context for why something is written the way it is:\n# This variable will be used to count the number of apples there are\napple_count = 0\n2. Help other people reading the code understand it faster:\n# This code will calculate the likelihood that it will rain tomorrow\ncomplicated_rain_calculation_for_tomorrow()\n3. Ignore a line of code and see how a program will run without it:\n# useful_value = old_sloppy_code()\nuseful_value = new_clean_code()'
  ),
  (
    1,
    'Question 10',
    'Fix the strings so there is no SyntaxError.
    print(''This message has mismatched quote marks!")
    print("Abracadabra'')',
    'print(''This message has mismatched quote marks!'')  
    print("Abracadabra")'
  ),
  (
    1,
    'Errors',
    'Even the best of us make mistakes. Programming languages attempt to understand and explain these mistakes made in their programs. Python refers to these mistakes as errors and will point to the location where an error occurred with a ^ character. When programs throw errors that we didn''t expect to encounter we call those errors bugs. Programmers call the process of updating the program so that it no longer produces unexpected errors debugging.',
    'Two common errors that we encounter while writing Python are SyntaxError and NameError.\n- SyntaxError means there is something wrong with the way your program is written — punctuation that does not belong, a command where it is not expected, or a missing parenthesis can all trigger a SyntaxError.\n- A NameError occurs when the Python interpreter sees a word it does not recognize. Code that contains something that looks like a variable but was never defined will throw a NameError.\nFor example, when the following code is run, we will get a Syntax Error:\nprint(''This message has mismatched quote marks!\'')'
  );





