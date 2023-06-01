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
      <nav className="hidden flex-grow justify-around md:flex">
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
      <div className="dropdown-end dropdown hidden md:block">
        <button
          className={clsx(
            'flex flex-row',
            'items-center justify-center',
            'hover:text-moore'
          )}
        >
          <UserCircleIcon className="w-icon" />
        </button>
        <div
          className={clsx(
            'menu text-center',
            'dropdown-content',
            'mt-6 w-52 p-4',
            'rounded border bg-white shadow-md'
          )}
        >
          <p className="menu-title mb-2 border-b border-gray-lighter p-2">
            Colaborador #1
          </p>
          <button
            className={clsx(
              'flex gap-2 p-2',
              'items-center justify-center',
              'text-sm hover:bg-gray-light hover:text-moore'
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
