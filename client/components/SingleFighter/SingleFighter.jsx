import React, { useEffect } from 'react';

const SingleFighter = ({ correctAnswersCount }) => {
  const maxBackgroundChanges = 5;

  const getColorClass = (count) => {
    switch (count) {
      case 1:
        return 'forest-1';
      case 2:
        return 'forest-4';
      case 3:
        return 'forest-night';
      case 4:
        return 'forest-5';
      case 5:
        return 'forest-2';
      default:
        return 'forest-1';
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
      <img
        src="/assets/img/char.png"
        className="fighter-img"
        alt="Fighter Character"
      />
    </div>
  );
};

export default SingleFighter;