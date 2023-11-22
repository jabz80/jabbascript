import React, { useEffect } from 'react';
function AnswerFormOutput({
  pythonCode,
  checkTheAnswer,
  questions,
  currentQuestionIndex,
  setCurrentCode,
}) {
  document.getElementById('codeOutput') &&
    setCurrentCode(document.getElementById('codeOutput'));

  return (
    <>
      <div
        className={`p-3 h-100 d-flex w-100 ${
          !pythonCode && 'align-items-center align-items-center'
        }`}
      >
        <div className="Output w-100" id="outputBlock">
          <div
            role="code-output"
            className="justify-content-between flex-column h-100 align-content-center w-100"
          >
            {pythonCode ? (
              <div className="d-flex justify-content-center align-content-center w-100 flex-column h-100">
                <pre className="bg-warning p-1 flex-grow-1">
                  › <span id="codeOutput">{pythonCode}</span>
                </pre>
                <button
                  onClick={checkTheAnswer}
                  className={`align-self-center btn btn-fantasy text-white ${
                    questions.length + 1 == currentQuestionIndex
                      ? 'disabled'
                      : ''
                  }`}
                >
                  Check
                </button>
              </div>
            ) : (
              <h3>Your Answer will be here</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnswerFormOutput;
