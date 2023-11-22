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
        className={`h-100 d-flex w-100 ${
          !pythonCode && 'align-items-center align-items-center'
        }`}
      >
        <div className="Output w-100" id="outputBlock">
          <div
            role="code-output"
            className="justify-content-between flex-column h-100 align-content-center w-100"
          >
            {pythonCode ? (
              <div className="d-flex justify-content-center align-content-center w-100 flex-column h-100 bg-dark-subtle p-3 rounded shadow-sm">
                <h3 className='text-center mb-3'>Output</h3>
                <pre className="bg-white p-1 flex-grow-1">
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
              <h3 style={{'margin-bottom': '1rem'}}>Your Answer will be here</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnswerFormOutput;
