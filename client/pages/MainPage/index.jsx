import React from 'react'
import Read from '../../assets/img/read.gif'
import KidCoder from '../../assets/img/kid-coder.png'
function index() {
  return (
    <>
    <div className='d-flex main-page-marketing-block align-items-center'>
      <div className='offset-2 col-4'><img src={KidCoder} className='img-fluid'/></div>
      <div className='col-4 ms-4'>
        <h2 className='main-page-h2'>Play and learn</h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam in rem inventore, ex temporibus ipsum. Soluta ea corporis quia recusandae laborum quos iure, praesentium assumenda consectetur obcaecati consequuntur laboriosam. Assumenda?
      </div>
    </div>
    <div className='d-flex main-page-marketing-block'>
      <div className='offset-2 col-4 me-4'>
        <h2 className='main-page-h2'>Text-Based Coding</h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam in rem inventore, ex temporibus ipsum. Soluta ea corporis quia recusandae laborum quos iure, praesentium assumenda consectetur obcaecati consequuntur laboriosam. Assumenda?
      </div>
      <div className='col-4'><img src={Read}/></div>
    </div>
    </>
  )
}

export default index
