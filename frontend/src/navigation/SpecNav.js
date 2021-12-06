import React from 'react'
import { Link } from 'react-router-dom'

const SpecNav = () => (
  <>
    <li>
      <Link to='/spec'>Grafik</Link>
    </li>
    <li>
      <Link to='/spec'>Historia wizyt</Link>
    </li>
    <li>
      <Link to='add-visit'>Zarezerwuj</Link>
    </li>
  </>
)

export default SpecNav