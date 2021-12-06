import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => (
  <>
    <li>
      <Link to='/user'>Zarezerwuj</Link>
    </li>
    <li>
      <Link to='/user'>Aktualne rezerwacje</Link>
    </li>
    <li>
      <Link to='/user'>Historia rezerwacji</Link>
    </li>
    <li>
      <Link to='/user'>Panel pacjenta</Link>
    </li>
    <li>
      <Link to='add-visit'>Zarezerwuj</Link>
    </li>
  </>
)

export default UserNav
