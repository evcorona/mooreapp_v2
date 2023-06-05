import { ArrowRightOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/solid'

import { Link } from 'react-router-dom'
import { NavBarProps } from '../../types/objects'
import clsx from 'clsx'

export default function NavBarMobile(props: NavBarProps) {
  const signOut = () => {
    sessionStorage.removeItem('moore-jwt')
    window.location.reload()
  }

  return (
    <nav className="navbar-end md:hidden">
      <div className="dropdown-end dropdown">
        <label tabIndex={0} className="btn-ghost btn-circle btn">
          <Bars3Icon className="w-icon" />
        </label>
        <div
          className={clsx(
            'menu space-y-2',
            'dropdown-content text-center',
            'mt-4 w-52 p-4 first-line:mt-3',
            'rounded border bg-white shadow-md'
          )}
        >
          {props.items.map((item, i) => (
            <Link
              key={`navbarItem-${i}`}
              to={item.to}
              className="p-2 hover:bg-gray-light hover:text-moore"
            >
              {item.title}
            </Link>
          ))}
          <div className="border-t border-gray-light" />
          <button
            className={clsx(
              'flex gap-2 p-2',
              'items-center justify-center',
              'hover:bg-gray-light hover:text-moore'
            )}
            onClick={signOut}
          >
            <ArrowRightOnRectangleIcon className="w-icon-sm" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}
