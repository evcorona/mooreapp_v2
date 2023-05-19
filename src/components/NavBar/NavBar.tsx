import { Link } from 'react-router-dom'
import NavBarDesktop from './NavBarDesktop'
import NavBarMobile from './NavBarMobile'
import { NavBarProps } from '../../types/objects'
import logo from '../../images/logo-minimized.png'

export default function NavBar(props: NavBarProps) {
  return (
    <nav className="fixed z-50 w-full bg-white text-gray shadow-lg">
      <div className="container navbar mx-auto justify-between">
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
