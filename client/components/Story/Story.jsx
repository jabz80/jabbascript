import React, { useState, useEffect } from 'react';
const Story = ({inputIncorrect, dialogue, last, questionIncrementHandler }) => {

  // const dummyData = [
  //   "Hello! Welcome to the Story mode. Let's walk you through this. In the editor, you see your first question. Answer the question and hit ok.",
  //   "Nice! Let's learn some more Python code to discover the mysteries of the forest. Are you ready? great you just need to answer the question and hit ok",
  //   "You're doing great. As you tread deeper into the mystical forest, the whispers of ancient trees echo tales of your journey. Each question you answer brings you closer to unveiling the mysteries that lie ahead.",
  //   "Wow! You're smashing this. The mystical creatures of the forest take notice of your growing prowess. The air is charged with magic, and your character is becoming a force to be reckoned with. Lets practice some magic. answer the question and watch your character do some magic",
  //   "Excellent! Your journey through the mystical forest has sharpened your skills. The trees bow in respect to your determination. Now, armed with newfound knowledge, you're ready to face the challenges that await. Lets practice some more powers you have the power of lighting. answer the question to use your power.",
  //   "Marvelous! The energy of the mystical forest responds to your progress. Enchanted flora and fauna guide your way. With each question answered, your character's strength becomes more profound. The time has come to put your skills to the test. Are you ready to confront the mysteries lurking in the heart of the forest?",
  //   "Incredible! Your character's aura resonates with the ancient magic of the forest. Creatures of myth and legend acknowledge your presence. As you continue to answer questions, the path ahead becomes clearer. Now, armed with wisdom and strength, you stand at the threshold of a grand adventure. The forest awaits your next move. What challenges will you face next?"
  // ];

  return (
    <>
      <div className='dialogue-container h-100'>
        {/* <div className="avatar">
          <img src="assets/img/avatar.jpeg" alt="Character Avatar" />
        </div> */}
        <div className="dialog-box-container border rounded d-flex justify-content-center align-items-center p-4 my-3 shadow">
      {
        last ? (
          <p>Congratulations! You've reached the end of the questions.</p>
        ) : (
          <p>{inputIncorrect ? "Ok let's try again" : 
          <>
          <h2>{dialogue.title}</h2><br />
          <span className='mb-3 d-block'>{dialogue.explanation}</span><br />
          <span><b>Example:</b> {dialogue.example}</span>
          {dialogue.q_story_id === 1 && <div className='text-center mt-4'><button onClick={questionIncrementHandler} className='btn btn-fantasy text-white'>Start!</button></div>}
          </>
          }</p>
        )
      }
    </div>
      </div>
    </>
  );
};

export default Story;
