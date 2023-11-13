import React from 'react'
import FighterExample from '../../assets/img/fighter-example.gif'
function Fighting() {
  return (
    <div className='h-33 fight-bg'>
      <div className="container h-100">

      <div className='row h-100'>
        <div className="col-4 d-flex align-items-center">
          <img src={FighterExample} className='img-fluid'/>
        </div>
        <div className="col-4">

        </div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          <img src={FighterExample} className='img-fluid flip'/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Fighting
