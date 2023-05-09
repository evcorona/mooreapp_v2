import { Link } from 'react-router-dom'
import NavBarDesktop from './NavBarDesktop'
import NavBarMobile from './NavBarMobile'
import { NavBarProps } from '../../types/objects'
import logo from '../../images/nav-logo.png'

export default function NavBar(props: NavBarProps) {
  return (
    <nav className="fixed z-50 w-full bg-white shadow-lg text-gray">
      <div className="navbar container mx-auto justify-between">
        <div className="w-fit px-2">
          <Link className="w-28" to={'/'}>
            <img src={logo} alt="MooreApp" />
          </Link>
        </div>
        <NavBarMobile items={props.items} />
        <NavBarDesktop items={props.items} />
      </div>
    </nav>
  )
}
