import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'

import { Link } from 'react-router-dom'
import { NavBarProps } from '../../types/objects'
import clsx from 'clsx'

export default function NavBarDesktop(props: NavBarProps) {
  const signOut = () => {
    sessionStorage.removeItem('moore-jwt')
    window.location.reload()
  }

  return (
    <>
      <nav className="hidden md:flex flex-grow justify-around">
        {props.items.map((item, i) => (
          <Link
            key={`navbarItem-${i}`}
            to={item.to}
            className="font-bold hover:text-moore"
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="dropdown dropdown-end hidden md:block">
        <button
          className={clsx(
            'flex flex-row',
            'justify-center items-center',
            'hover:text-moore'
          )}
        >
          <UserCircleIcon className="w-icon" />
        </button>
        <div
          className={clsx(
            'menu text-center',
            'dropdown-content',
            'w-52 mt-6 p-4',
            'bg-white shadow-lg rounded'
          )}
        >
          <p className="menu-title border-b border-gray-lighter p-2 mb-2">
            Colaborador #1
          </p>
          <button
            className={clsx(
              'flex gap-2 p-2',
              'justify-center items-center',
              'text-sm hover:text-moore hover:bg-gray-light'
            )}
            onClick={signOut}
          >
            <ArrowRightOnRectangleIcon className="w-icon-sm" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  )
}
