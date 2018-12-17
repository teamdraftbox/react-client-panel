import React from 'react'
import { Link } from 'react-router-dom'

export default() =>{
  return (
    <div className='mt-4'>
      <Link to="/client/add" className="btn btn-success btn-block"> 
      <i className="fas fa-plus" >  Add Users</i>
      </Link>
    </div>
  )
}
