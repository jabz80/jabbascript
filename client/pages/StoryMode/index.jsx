import React, { useState, useEffect } from "react";
import { Story, SingleFighter } from "../../components";
import { PythonIDE } from '../../components';

const dummyData = [
  "Hello! Welcome to the Story mode. Let's walk you through this. In the editor, you see your first question. Answer the question and hit ok.",
  "Nice! Let's learn some more Python code to discover the mysteries of the forest. Are you ready? great you just need to answer the question and hit ok",
  "You're doing great. As you tread deeper into the mystical forest, the whispers of ancient trees echo tales of your journey. Each question you answer brings you closer to unveiling the mysteries that lie ahead.",
  "Wow! You're smashing this. The mystical creatures of the forest take notice of your growing prowess. The air is charged with magic, and your character is becoming a force to be reckoned with. Lets practice some magic. answer the question and watch your character do some magic",
  "Excellent! Your journey through the mystical forest has sharpened your skills. The trees bow in respect to your determination. Now, armed with newfound knowledge, you're ready to face the challenges that await. Lets practice some more powers you have the power of lighting. answer the question to use your power.",
  "Marvelous! The energy of the mystical forest responds to your progress. Enchanted flora and fauna guide your way. With each question answered, your character's strength becomes more profound. The time has come to put your skills to the test. Are you ready to confront the mysteries lurking in the heart of the forest?",
  "Incredible! Your character's aura resonates with the ancient magic of the forest. Creatures of myth and legend acknowledge your presence. As you continue to answer questions, the path ahead becomes clearer. Now, armed with wisdom and strength, you stand at the threshold of a grand adventure. The forest awaits your next move. What challenges will you face next?"
];
export default function Index() {
  const [dialogueId, setDialogueId] = useState(0);
  const [inputIncorrect, setInputIncorrect] = useState(false);
  const [dialogue, setDialogue] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [incorrectMessage, setIncorrectMessage] = useState("");
  const [storyMessage, setStoryMessage] = useState(dummyData[0]);
  const [showFireball, setShowFireball] = useState(false);
  const [showThunder, setShowThunder] = useState(false);
  const [showWind, setShowWind] = useState(false);

  const fireAudio = new Audio("assets/img/magic-strike-5856.mp3");
  const thunderAudio = new Audio("assets/img/loud-thunder-7932.mp3");
  const windAudio = new Audio("assets/img/woosh_low_long01-98755.mp3");

  

  useEffect(() => {
    fetchQuestion();
  }, [dialogueId]);

  const fetchQuestion = () => {
    // Replace this with fetch call to the backend
    const dummyQuestions = [
      "What is the capital of France?",
      "In which year did World War II end?",
      "What is the square root of 144?",
      "What is capital of UK",
      "What is 2 + 2",
      "Type 7",
      "Enter 6",
    ];

    setDialogue(dummyQuestions[dialogueId]);
  };

  const handleOkClick = () => {
    const dummyAnswers = ["Paris", "1945", "12", "London", "4", "7", "6"];

    const correctAnswer = dummyAnswers[dialogueId];

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setIsAnswerCorrect(true);
      setIncorrectMessage("");
      setDialogueId((prevId) => prevId + 1);
      setUserAnswer("");
      triggerFighterMove();
      setInputIncorrect(false);
      setIncorrectMessage("");

    } else {
      setIncorrectMessage("Wrong answer!");
      setInputIncorrect(true);
    }
  };

  const triggerFighterMove = () => {
    console.log("Fighter move triggered!");
  };
  useEffect(() => {
    console.log(dummyData.length);
    console.log(dialogueId);
    console.log(storyMessage);
    console.log(dummyData[dialogueId]);
    if (dialogueId <= dummyData.length) {
      setStoryMessage(dummyData[dialogueId]);
    }
  }, [dialogueId]);

  const showFireBallButton = dialogueId === 2;
  const showThunderButton = dialogueId === 3;
  const showWindButton = dialogueId === 4;

  const handleShowFireballClick = () => {
    setShowFireball(true);
    fireAudio.play();
    setTimeout(() => {
      setShowFireball(false);
    }, 1500);
  };

  const handleShowThunderClick = () => {
    setShowThunder(true);
    thunderAudio.play();
    setShowFireball(false);
    setTimeout(() => {
      setShowThunder(false);
    }, 1500);
  };

  const handleShowWindClick = () => {
    setShowWind(true);
    windAudio.play();
    setShowThunder(false);
    setShowFireball(false);
    setTimeout(() => {
      setShowWind(false);
    }, 4000);
  };

  return (
    <>
      <div className="container-md mb-5">
      <Story
  incorrectAnswer={storyMessage === 9}
  updateStory={setStoryMessage}
  storyMessageData={storyMessage}
  inputIncorrect={inputIncorrect}
/>

        <div>
          <PythonIDE />
          <div>
            <p>{dialogue}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={
                inputIncorrect
                  ? { borderColor: "red", boxShadow: "0 0 5px red" }
                  : {}
              }
            />

            <button
              className="btn btn-warning btn-sm me-4 shadow-sm"
              onClick={handleOkClick}
            >
              OK
            </button>
            {showFireBallButton && (
              <button
                className="btn btn-info btn-sm shadow-sm"
                onClick={handleShowFireballClick}
              >
                Show Fireball
              </button>
            )}
            {showThunderButton && (
              <button
                className="btn btn-info btn-sm shadow-sm"
                onClick={handleShowThunderClick}
              >
                Show Thunder
              </button>
            )}
            {showWindButton && (
              <button
                className="btn btn-info btn-sm shadow-sm"
                onClick={handleShowWindClick}
              >
                Show Wind
              </button>
            )}
            {showFireball && (
              <img
                src="assets/img/beam.gif"
                alt="Fireball"
                className="projectile-img fireball"
              />
            )}

            {showThunder && (
              <img
                src="assets/img/lightning.gif"
                alt="Thunder"
                className="projectile-img thunder"
              />
            )}

            {showWind && (
              <img
                src="assets/img/wind.gif"
                alt="Wind"
                className="projectile-img wind"
              />
            )}
            {incorrectMessage && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {incorrectMessage}
              </div>
            )}
          </div>
        </div>
      </div>
      <SingleFighter correctAnswersCount={dialogueId} />
    </>
  );
}

