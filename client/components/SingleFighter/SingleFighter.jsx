import React, { useEffect, useContext } from "react";

import Story from "../Story/Story";
const SingleFighter = ({ correctAnswersCount, inputIncorrect, dialogue, last, questionIncrementHandler, showFireball }) => {


  const maxBackgroundChanges = 5;


  const getColorClass = (count) => {
    switch (count) {
      case 1:
        return "forest-1";
      case 2:
        return "forest-4";
      case 3:
        return "forest-night";
      case 4:
        return "forest-5";
      case 5:
        return "forest-2";
      default:
        return "forest-1";
    }
  };

  // background style based on the number of correct answers
  const getBackgroundStyle = () => {
    if (correctAnswersCount <= maxBackgroundChanges) {
      return getColorClass(correctAnswersCount);
    } else {
      // After the third correct answer, maintain the last background
      return getColorClass(maxBackgroundChanges);
    }
  };

  return (
    <div className={`background-transition ${getBackgroundStyle()}`}>
      <div className="container h-100">
      <div className="row h-100">
        <div className="col-4 d-flex justify-content-start align-items-center">
         
      {inputIncorrect ? (
        <img
          src="/assets/img/story/fallen-knight.gif"
          id="singlePlayGif"
          className="fighter-img"
          alt="Fighter Character"
        />
      ) : (
        <img
          src="/assets/img/story/standing-knight.gif"
          className="standing-fighter-img"
          alt="Fighter Character"
        />
      )}
        </div>
        <div className="col-4 d-flex h-100 justify-content-center align-items-center">
          {showFireball ?
          <img className="lightning" src="/assets/img/beam.gif"/>
           :
            <Story
        // inputIncorrect={inputIncorrect}
        inputIncorrect={''}
        dialogue={dialogue}
        last={false}
        questionIncrementHandler={questionIncrementHandler}
      />
          }
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          {correctAnswersCount == 0 && <img className="npc" src='/assets/img/avatars/m_m_w_300x400.png'/>}
          {correctAnswersCount == 1 && <img className="npc" src='/assets/img/avatars/m_m_w_300x400.png'/>}
          {correctAnswersCount == 2 && <img className="npc" src='/assets/img/avatars/m_m_b_300x400.png'/>}
          {correctAnswersCount == 3 && <img className="npc" src='/assets/img/avatars/m_f_w_300x400.png'/>}
          {correctAnswersCount == 4 && <img className="npc" src='/assets/img/avatars/m_f_b_300x400.png'/>}
          {correctAnswersCount == 5 && <img className="npc" src='/assets/img/avatars/k_m_b_300x400.png'/>}
          {correctAnswersCount == 6 && <img className="npc" src='/assets/img/avatars/k_f_w_300x400.png'/>}
          {correctAnswersCount == 7 && <img className="npc" src='/assets/img/story/drac.png'/>}
        </div>
      </div>
      </div>
      

    </div>
  );
};

export default SingleFighter;
