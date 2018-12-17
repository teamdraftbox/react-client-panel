import React from 'react'
import {Link} from 'react-router-dom'

function sideBar() {
  return (
    <div className="h-100">
    <nav className="bg-secondary sidebar">
        <div className="sidebar-sticky">
            <ul className="nav flex-column">
                <li className="nav-item">
                <Link to = "/" className="nav-link active" >
                <span data-feather="home"></span>
                        Users <span className="sr-only">(current)</span>
                </Link>
                </li>
                <li className="nav-item">
                <Link to = "/deal" className="nav-link active" >
                <span data-feather="home"></span>
                        Deals <span className="sr-only">(current)</span>
                </Link>
                </li>
            </ul>
        </div>
    </nav>
</div>
  )
}
export default sideBar
