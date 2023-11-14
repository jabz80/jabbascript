import React from 'react'

function FightCodeSequence({isAnswerCorrect}) {
  return (
    <div className='mb-auto flex-grow-1 d-flex justify-content-center align-items-center flex-column'>
      <h1>Praktice Kombat</h1>
      <div className='container my-5'>
        <div className='row'>
          <div className='col-6'>
            <h3 id="fightRoundNumber">Round 1/10</h3>
            <p id="fightRoundDescription">Create a variable called z, assign x + y to it, and display the result in an alert box.</p>
          </div>
          <div className='col-6'>
            <div className='bg-secondary-subtle p-5'>
              Some code here
            </div>
          </div>
        </div>
      </div>
      <button onClick={()=>isAnswerCorrect()} className='btn text-white bg-success btn-lg'>Next</button>
    </div>
  )
}

export default FightCodeSequence
