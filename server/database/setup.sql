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
  ),
  (
    2,
    'Intro',
    'Congrats on completing the first level of your training. Let us learn how to manipulate numbers in Python.

    Python has a few numeric data types. It has multiple ways of storing numbers. Which one you use depends on your intended purpose for the number you are saving.

    Data types: 
    Integer (int), floating-point number (float)

    Integers
    An integer, or int, is a whole number. It has no decimal point and contains all counting numbers (1, 2, 3, …) as well as their negative counterparts and the number 0. If you were counting the number of people in a room, the number of pets in a house, or the number of keys on a keyboard you would likely use an integer.

    Floating-point Numbers
    A floating-point number, or a float, is a decimal number. It can be used to represent fractional quantities as well as precise measurements. If you were measuring the length of your bedroom wall or calculating the average test score of a seventh-grade class you would likely use a float.',
    'n/a'
  ),
  (
    2,
    'Numbers',
    'Numbers can be used literally in a program. For example:
    print(2+1)',
    '3'
  ),
  (
    2,
    'Question 1',
    'Print the sum of 8 and 10.5',
    'print( 8 + 10.5)'
  ),
  (
    2,
    'Number Variables',
    'Numbers can be assigned to variables.
    an_int = 2
    a_float = 2.1

    print(an_int + a_float)',
    '4.1'
  ),
  (
    2,
    'Question 2',
    'Print the sum of apple_price and banana_price
    apple_price=0.5
    banana_price=0.4
    total_price=apple_price+banana_price',
    'hi'
  ),
  (
    2,
    'Arithmetic Operations',
    'Python performs the arithmetic operations of addition, subtraction, multiplication, and division with +, -, *, and /.
    For example the output of:

    print(100 - 23) is 77
    print(4 * 5) is 20
    print(60 / 10) is 6
    print(5 + 30 - 1) is 34',
    '77, 20, 6, 34'
  ),
  (
    2,
    'Question 3',
    'Python performs the arithmetic operations of addition, subtraction, multiplication, and division with +, -, *, and /.
      Fill in the blank for what the output for the following calcuations should be:
      print(10 + 13)
      print(50 - 20)
      print(25 * 2)
      print(10 / 5)
      print(10 + 3 - 2)',
      'print(23, 30, 50, 2, 11)'
  ),
  (
    2,
    'Question 4',
    'Print the following calculations to find their outputs:
    1. 45 + 20
    2. 60 - 55
    3. 3 * 10
    4. 100 / 10
    5. 25 x 68 + 13 / 28 ',
    '65, 5, 30, 10, 1700.5'
  ),
  (
    2,
    'Calculating with variables',
    'Lets use variables in our calculations now
    I have 5 horses and 3 dragons
    number_of_horses = 5
    number_of_dragons = 3

    To calculate how many animals I own I will add the number of horses to the number of dragons
    print(number_of_horses + number_of_dragons)',
    'hi'
  ),
  (
    2,
    'Question 5',
    'Print how much health you have in total if you add a health boost to your current health.
    current_health = 85
    health_boost = 5',
    '90'
  ),
  (
    2,
    'Changing Variables',
    'If I get another dragon, I can update number_of_dragons to the new amount 4
    number_of_dragons = 4

    And to recalculate the number of animals I own
    print(number_of_horses + number_of_dragons)',
    'hi'
  ),
  (
    2,
    'Question 6',
    'If your health_boost was actually 10, change the value of health_boost and print your total health again',
    '95'
  ),
  (
    2,
    'Exponents',
    'Exponents use the notation **. 

    So to calculate 6 to the power of 2:
    print(6**2)

    And to calculate 2 to the power of 4:
    print(2**4)',
    '36, 16'
  ),
  (
    2,
    'Question 7',
    'Now you try. 
    Print 8 to the power of 2.
    Print 5 to the power of 3.',
    '64, 125'
  ),
  (
    2,
    'Modulo',
    'The modulo operator is indicated by % and gives the remainder of a division calculation. If the two numbers are divisible, then the result of the modulo operation will be 0.

    #Prints 4 because 29 / 5 is 5 with a remainder of 4
    print(29 % 5)
    
    #Prints 2 because 32 / 3 is 10 with a remainder of 2
    print(32 % 3)
    
    #Modulo by 2 returns 0 for even numbers and 1 for odd numbers
    Prints 0
    print(44 % 2)',
    '4, 2, 0'
  ),
  (
    2,
    'Question 8',
    'Printe what the output of these statements should be in a list.
    print(3 % 3)
    print(4 % 3) 
    print(5 % 3)
    print(6 % 3) 
    print(7 % 3)',
    '0,1,2,0,1'
  ),
  (
    2,
    'Concatenation',
    'The + operator doesn''t just add two numbers, it can also "add" two strings! 
    The process of combining two strings is called string concatenation. 
    Performing string concatenation creates a brand new string comprised of the first string''s contents followed by the second string''s contents (without any added space in-between).


    string1 = "Yesterday is history, "
    string2 = "Tomorrow is a mystery, "
    string3 = "but Today is a gift. "
    string4 = "That is why it is called the present."',
    'message = string1 + string2 + string3 + string4
    print(message)'
  ),
  (
    2,
    'Question 9',
    'Concact these strings together in order
    string1 = "The wind "
    string2 = "does not "
    string3 = "break a tree that bends."',
    'The wind does not break a tree that bends.'
  ),
  (
    2,
    'Plus Equal',
    'Python offers a shorthand for updating variables. 
    When you have a number saved in a variable and want to add to the current value of the variable, you can use the += (plus-equals) operator.

    First we have a variable with a number saved.
    number_of_miles_hiked = 12

    Then we need to update that variable.
    Let''s say we hike another two miles today:

    number_of_miles_hiked += 2

    The new value is the old value plus the number after the plus-equals.',
    'print(number_of_miles_hiked)'
  ),
  (
    2,
    'Question 10',
    'Add 10 to the variable my_health using plus equal. 
    Then print the value of my_health.
    my_health = 12',
    '22'
  ),
  (
    2,
    'Plus Equal II',
    'You want to add the price of new_armour, nice_sword and cool_potion to your total_price.
    The prices of each item are:
    new_armour = 50.00
    nice_sword = 39.00
    cool_potion = 20.00

    I have added the price of new_armour to the total price using plus-equals for you.
    total_price = 0

    new_armour = 50.00',
    'total_price += new_armour'
  ),
  (
    2,
    'Question 11',
    'Add the price of nice_sword and cool_potion to total_price on one line using +=.
    Print total_price on a new line.

    nice_sword = 39.00
    cool_potion = 20.00',
    '109.00'
  ),
  (
    3,
    'Intro',
    'A boolean expression is a statement that can either be True or False.',
    'hi'
  ),
  (
    3,
    'Boolean expressions',
    'Lets discuss what is a boolean expression and what isn''t:
    "My dragon is the cutest!"  - this is not a boolean expression. This statement is an opinion and is not objectively True or False. Someone else might say that "My fairy is the cutest!"',
    'Since this is an opinion and not a boolean expression, I will set example_statement to "No" in the editor to the right.'
  ),
  (
    3,
    'Question 1',
    'Okay, now it''s your turn. Print the statement''s which are true.

    statement_1= "Owls are birds."
    statement_2= "My cat is named Dave."
    statement_3 = "Owls make the best pets."
    statement_4 = "Dragons eat humans."',
    'Owls are birds.,Dragons eat humans.'
  ),
  (
    3,
    'Relational Operators: Equals and Not Equals',
    'Now that we understand what boolean expressions are, let''s learn to create them in Python. We can create a boolean expression by using relational operators.
    Relational operators compare two items and return either True or False. For this reason, you will sometimes hear them called comparators.
    The two relational operators we''ll cover first are:

    Equals: ==
    Not equals: !=

    These operators compare two items and return True or False if they are equal or not.

    We can create boolean expressions by comparing two values using these operators:',
    '1 == 1     # True

    2 != 4     # True

    3 == 5     # False

    ''7'' == 7   # False'
  ),
  (
    3,
    'Question 2',
    'Say what the output of these lines will be:
    (5 * 2) - 1 == 8 + 1 
    13 - 6 != (3 * 2) + 1
    3 * (2 - 1) == 4 - 1 ',
    'True, False, True'
  ),
  (
    3,
    'Bool types',
    'You may notice that when you type them in the code editor (with uppercase T and F), they appear in a different colour than variables or strings. 
    This is because True and False are their own special type: bool.

    True and False are the only bool types, and any variable that is assigned one of these values is called a boolean variable.

    Boolean variables can be created in several ways. 

    The easiest way is to simply assign True or False to a variable:
    set_to_true = True
    set_to_false = False

    You can also set a variable equal to a boolean expression.
    bool_one = 5 != 7 
    bool_two = 1 + 1 != 2
    bool_three = 3 * 3 == 9',
    'print(bool_one)    # True
    print(bool_two)    # False
    print(bool_three)  # True'
  ),
  (
    3,
    'Question 3',
    'Create a variable named my_baby_bool and set it equal to the string "true".
    Check the type of my_baby_bool using type(my_baby_bool).
    You''ll have to print it to get the results to display in the terminal.',
    'str'
  ),
  (
    3,
    'Question 4',
    'It''s not a boolean variable! Boolean values True and False always need to be capitalised and do not have quotation marks.
    Create a variable named my_baby_bool_two and set it equal to True.
    Check the type of my_baby_bool_two and make sure you successfully created a boolean variable.
    You''ll have to print it to get the results to display in the terminal.',
    'bool'
  ),
  (
    3,
    'Understanding Booleans',
    'Understanding boolean variables and expressions is essential because they are the building blocks of conditional statements.
    Say before you leave your home today you need to decide whether to being an umbrella based on the weather.
    The decision-making process of "Is it raining? If so, bring an umbrella" is a conditional statement.
    Here it is phrased in a different way:',
    '"If it is raining, then bring an umbrella"'
  ),
  (
    3,
    'Question 5',
    'Can you print out the expression which is boolean here?
    - it is raining
    - bring an umbrella',
    'it is raining'
  ),
  (
    3,
    'Intro',
    'Right, "it is raining" is the boolean expression, and this conditional statement is checking to see if it is True.
    If "it is raining" == True then the rest of the conditional statement will be executed and you will bring an umbrella.

    This is the form of a conditional statement:
    "If [it is raining], then [bring an umbrella]"

    You''ll notice that instead of "then" we have a colon, :. That tells the computer that what''s coming next is what should be executed if the condition is met.',
    'if is_raining == True:
      print("bring an umbrella")'
  ),
  
  (
    3,
    'Question 6',
    'Will this code print apple to the terminal? Print yes or no.
    if 2 == 4 - 2: 
      print("apple")',
    'yes'
  ),
  (
    3,
    'Question 7',
    'Ensure battle_warrior can enter the battle by confirming that his username is battle_warrior and fixing the typo in the following code:

    user_name = "battle_warrior"

    if user_name = "battle_warrior":
      print("Enter the battle...if you dare")',
    'Enter the battle...if you dare'
  ),
  (
    3,
    'Relational Operators continued',
    'Let''s explore more ways to create boolean expressions. So far we know two relational operators, equals and not equals, but there are four more:
    > greater than
    >= greater than or equal to
    < less than
    <= less than or equal to',
    'Let''s say we''re creating a program that checks if the user''s age is over 13 during battle enrolment before allowing them to enter battle. We could write something like:
    if age <= 13:
      print("Sorry, you cannot fight yet.")'
  ),
  (
    3,
    'Question 8',
    'Create an if statement that checks if x and y are equal, print the string "These numbers are the same" if so:
    x = 20
    y = 20',
    'These numbers are the same'
  ),
  (
    3,
    'Boolean Operators: and',
    'Often, the conditions you want to check in your conditional statement will require more than one boolean expression to cover. In these cases, you can build larger boolean expressions using boolean operators. These operators (also known as logical operators) combine smaller boolean expressions into larger boolean expressions.

    There are three boolean operators that we will cover:

    - and
    - or
    - not

    Let''s start with and.
    
    and combines two boolean expressions and evaluates as True if both its components are True, but False otherwise.
    Consider the example: "Oranges are a fruit and carrots are a vegetable."
    
    This boolean expression is comprised of two smaller expressions, oranges are a fruit and carrots are a vegetable, both of which are True and connected by the boolean operator and, so the entire expression is True.
    
    Notice that in the second and third examples below, even though part of the expression is True, the entire expression as a whole is False because the other statement is False. The fourth statement is also False because both components are False.',
    '(1 + 1 == 2) and (2 + 2 == 4)   # True

    (1 > 9) and (5 != 6)            # False

    (1 + 1 == 2) and (2 < 1)        # False

    (0 == 10) and (1 + 1 == 1)      # False'
  ),
  (
    3,
    'Question 9',
    'Say if the following statements are true or false:
    (2 + 2 + 2 >= 6) and (-1 * -1 < 0)
    (4 * 2 <= 8) and (7 - 1 == 6)',
    'False, True'
  ),
  (
    3,
    'Question 10',
    'Let''s return to the battle enrolment. You do not only need to be 13, you also need to have a strength of 6.0 or higher.

    Rewrite the if statement so that it checks to see if a user meets both requirements using an and statement.

    If they do, print the string: "You meet the requirements to graduate!"
    age = 13
    strength = 6.0',
    'You meet the requirements to graduate!'
  ),
  (
    3,
    'Boolean Operators: or',
    'The boolean operator or combines two expressions into a larger expression that is True if either component is True.

    Consider the statement: Oranges are a fruit or apples are a vegetable.

    This statement is composed of two expressions: oranges are a fruit which is True and apples are a vegetable which is False. Because the two expressions are connected by the or operator, the entire statement is True. Only one component needs to be True for an or statement to be True.

    In English, or implies that if one component is True, then the other component must be False. This is not true in Python. If an or statement has two True components, it is also True.
    
    Let''s take a look at a couple of examples in Python. Notice that each or statement that has at least one True component is True, but the final statement has two False components, so it is False.',
    'True or (3 + 4 == 7)    # True
    (1 - 1 == 0) or False   # True
    (2 < 0) or True         # True
    (3 == 8) or (3 > 4)     # False'
  ),
  (
    3,
    'Question 11',
    'Say whether the following statements are true or false:
    (2 - 1 > 3) or (-5 * 2 == -10)
    (9 + 5 <= 15) or (7 != 4 + 3)',
    'True, True'
  ),
  (
    3,
    'Question 12',
    'The enrolment office for the army has another request. They want to send out a mailer with information on the commencement ceremonies to users who have met at least one requirement for enrolment (at least 13 years old and 6.0 strength).
    Write an if statement that checks if a student 13 years old or older or has strength 6.0 or higher, and if so prints:
    "You have met at least one of the requirements."

    age = 12
    strength = 7.0',
    'You have met at least one of the requirements.'
  ),
  (
    3,
    'Boolean Operators: not',
    'The final boolean operator we will cover is not. This operator is straightforward: when applied to any boolean expression it reverses the boolean value. So if we have a True statement and apply a not operator we get a False statement.

    not True == False
    not False == True

    Here, we took the True statement oranges are a fruit and added a not operator to make the False statement oranges are not a fruit.

    This example in English is slightly different from the way it would appear in Python because in Python we add the not operator to the very beginning of the statement. Let''s take a look at some of those:',
    'not 1 + 1 == 2  # False
    not 7 < 0       # True'
  ),
  (
    3,
    'Question 13',
    'What is the output of these statements:
    not (4 + 5 <= 9)
    not (8 * 2) != 20 - 4',
    'False, True'
  ),
  (
    3,
    'Question 14',
    'The army''s enrolment office has been so impressed with your work so far that they have another task for you.
    They want you to return to a previous if statement and add in several checks using and and not statements:
    If a user''s age is not greater or equal to 1, it should print: "You are not old enough to enrol."
    If their strength is not greater or equal to 6.0, it should print: "You need to work on your strength. Try again when you have improved."
    If their age is not greater than or equal to 13 and their strength is not greater than or equal to 6.0, it should print: "You do not meet either requirement to enrol!"

    age = 13
    strength = 4.3',
    'You need to work on your strength. Try again when you have improved.'
  ),
  (
    3,
    'else statements',
    'else statements allow us to elegantly describe what we want our code to do when certain conditions are not met.

    else statements always appear in conjunction with if statements. Consider our weather example to see how this works:',
    'if raining:
      print("Bring an umbrella.")
    else:
      print("No need for anything today!")'
  ),
  (
    3,
    'Question 15',
    'The army''s enrolment office has another request for you. They want you to add an additional check to a previous if statement. 
    If a user is failing to meet one or both enrolment requirements, they want it to print: "You do not meet the requirements to enrol."
    Add an else statement to the existing if statement.

    age = 13
    strength = 4.3',
    'You do not meet the requirements to enrol.'
  ),
  (
    3,
    'Else if statements',
    'We have if statements, we have else statements, we can also have elif statements.
    An elif statement checks another condition after the previous if statements conditions aren''t met.
    We can use elif statements to control the order we want our program to check each of our conditional statements. First, the if statement is checked, then each elif statement is checked from top to bottom, then finally the else code is executed if none of the previous conditions have been met.

    Let''s take a look at this in practice. The following if statement will display a "thank you" message after someone donates to a charity; there will be a curated message based on how much was donated.',
    'print("Thank you for the donation!")

    if donation >= 1000:
      print("You''ve achieved platinum status")
    elif donation >= 500:
      print("You''ve achieved gold donor status")
    elif donation >= 100:
      print("You''ve achieved silver donor status")
    else:
      print("You''ve achieved bronze donor status")'
  ),
  (
    3,
    'Question 16',
    'The army''s enrolment office has noticed that users prefer to get letter grades for their enrolment test.

    Write an if/elif/else statement that:

    If grade is 90 or higher, print "A"
    Else if grade is 80 or higher, print "B"
    Else if grade is 70 or higher, print "C"
    Else if grade is 60 or higher, print "D"
    Else, print "F"

    grade = 86',
    'B'
  ),
  (
    6,
    'Question 1',
    'hi',
    'hi'
  );


























