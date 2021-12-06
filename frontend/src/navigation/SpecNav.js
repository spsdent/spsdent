import React from 'react'
import { Link } from 'react-router-dom'

const SpecNav = () => (
  <>
    <li>
      <Link to='/visits'>Grafik</Link>
    </li>
    <li>
      <Link to='/archive-visits'>Historia wizyt</Link>
    </li>
    <li>
      <Link to='add-visit'>Zarezerwuj</Link>
    </li>
    <li>
      <Link to='/profile'>Ustawienia</Link>
    </li>
  </>
)

export default SpecNav
