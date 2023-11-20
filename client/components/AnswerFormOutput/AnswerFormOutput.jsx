import React from 'react'
function AnswerFormOutput({pythonCode}) {
  return (
    <>
    <div className='bg-secondary-subtle p-3 h-100 d-flex align-items-center justify-content-center flex-column'>
      <div className='Output' id='outputBlock'>
        <div id='codeOutput' role="code-output">
          {pythonCode ? 
            <pre>{pythonCode}</pre> 
            : 
            <h3>Your Answer will be here</h3>}
        </div>
      </div>
    </div>
    </>
  )
}

export default AnswerFormOutput
