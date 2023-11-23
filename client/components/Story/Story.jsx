import React, { useState, useEffect } from 'react';

const Story = ({inputIncorrect, dialogue, last, questionIncrementHandler}) => {

  return (
    <>
      <div className='dialogue-container h-100'>
        {/* <div className="avatar">
          <img src="assets/img/avatar.jpeg" alt="Character Avatar" />
        </div> */}
        <div className="dialog-box-container border rounded d-flex justify-content-center align-items-center p-4 my-3 shadow">
          <span className='rightArrowPopup'></span>
      {
        last ? (
          <p>Congratulations! You've reached the end of the questions.</p>
        ) : (
          <div>{inputIncorrect ? "Ok let's try again" : 
          <>
          <h2>{dialogue.title}</h2><br />
          <span className='mb-3 d-block'>{dialogue.explanation}</span><br />
          <span><b>Example:</b> {dialogue.example}</span>
          {dialogue.q_story_id === 1 && <div className='text-center mt-4'><button onClick={questionIncrementHandler} className='btn btn-fantasy text-white'>Start!</button></div>}
          </>
          }</div>
        )
      }
    </div>
      </div>
    </>
  );
};

export default Story;
