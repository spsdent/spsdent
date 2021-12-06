import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => (
  <>
    <li>
      <Link to='/add-visit'>Zarezerwuj</Link>
    </li>
    <li>
      <Link to='/visits'>Aktualne rezerwacje</Link>
    </li>
    <li>
      <Link to='/archive-visits'>Historia rezerwacji</Link>
    </li>
    <li>
      <Link to='/user'>Panel pacjenta</Link>
    </li>
  </>
)

export default UserNav
