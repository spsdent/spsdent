import React from 'react'
import { Link } from 'react-router-dom'

const NonAuth = () => (
  <>
    <li>
      <Link to='/'>Strona glowna</Link>
    </li>
    <li>
      <Link to='/'>O nas</Link>
    </li>
    <li>
      <Link to='/'>Oferta</Link>
    </li>
    <li>
      <Link to='/'>Cennik</Link>
    </li>
    <li>
      <Link to='/'>Kontakt</Link>
    </li>
    <li>
      <Link to='add-visit'>Zarezerwuj</Link>
    </li>
  </>
)

export default NonAuth
