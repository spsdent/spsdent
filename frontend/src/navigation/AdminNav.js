import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => (
  <>
    <li>
      <Link to='/admin'>Grafik Administratora</Link>
    </li>
    <li>
      <Link to='/visits'>Aktualne wizyty</Link>
    </li>
    <li>
      <Link to='/archive-visits'>Historia wizyt</Link>
    </li>
  </>
)

export default AdminNav
