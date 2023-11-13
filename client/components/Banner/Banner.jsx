import React from 'react'
import Knight from '../../assets/img/knight.gif'

function Banner() {
  return (
    <div className='p-5 banner d-flex flex-row align-items-center vh-100'>
      <div className='col-6 text-left pe-4'>
      
      
    <h1 className='main-page-h1 text-left'>Learn how to Code<br/> with Koding Kombat</h1>
    <p className='main-page-subheading'>Koding Kombat  is a competitive programming game where two users engage in a battle of wits by answering challenging programming questions.</p> <p className='main-page-subheading'><b>Players take turns tackling a series of coding challenges</b>, ranging from algorithmic puzzles to debugging exercises.</p>
    <div className='d-flex flex-row align-items-center'>
    <button type="button" className="btn btn-warning btn-lg me-4" data-mdb-ripple-color="#c33232"> Try Story Mode </button>
    <button type="button" className="btn btn-warning btn-lg me-4" data-mdb-ripple-color="#c33232"> Fighting Mode </button>
    <a href="/login">Login</a>
    </div>
    </div>
    <div className='col-6 h-100'>
      <div className='main-bage-right-block h-100 w-100 d-flex flex-row justify-content-center align-items-center pb-5'>
        <img className='mb-5' src={Knight}/>
      </div>
      </div>
    </div>
      
  )
}

export default Banner
