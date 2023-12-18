import React from 'react'
import Navbar from '../navbar/Navbar'

function Layout({children}) {
  return (
    <div>
      <Navbar/>
      <div>
      {children}
      </div>
      
    </div>
  )
}

export default Layout
