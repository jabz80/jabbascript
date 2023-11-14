import React, {useEffect} from 'react'
function AnswerFormOutput({answerPlaceholder}) {
    useEffect(() => {
    const iframe = document.getElementById('codeOutput');
    iframe.contentDocument.body.innerHTML = '<h3>Your Answer</h3>';
  }, [answerPlaceholder]);
  return (
    <>
    <div className='bg-secondary-subtle p-3 h-100 d-flex align-items-center justify-content-center flex-column'>
      <div className='Output' id='outputBlock'>
        <iframe id='codeOutput'>
        </iframe>
      </div>
    </div>
    </>
  )
}

export default AnswerFormOutput
