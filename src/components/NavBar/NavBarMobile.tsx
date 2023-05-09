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
    <nav className="md:hidden navbar-end">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <Bars3Icon className="w-icon" />
        </label>
        <div
          className={clsx(
            'menu space-y-2',
            'dropdown-content text-center',
            'w-52 mt-4 first-line:mt-3 p-4',
            'bg-white shadow-lg rounded'
          )}
        >
          {props.items.map((item, i) => (
            <Link
              key={`navbarItem-${i}`}
              to={item.to}
              className="p-2 hover:text-moore hover:bg-gray-light"
            >
              {item.title}
            </Link>
          ))}
          <div className="border-t border-gray-light" />
          <button
            className={clsx(
              'flex gap-2 p-2',
              'justify-center items-center',
              'hover:text-moore hover:bg-gray-light'
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
