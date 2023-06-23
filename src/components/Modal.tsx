import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'

import Button from './Buttons/Button'
import { Fragment } from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

interface ModalProps {
  isModalOpen: boolean
  title: string
  buttonText: string
  children: React.ReactNode
  success?: boolean
  deleteMode?: boolean
  isLoading?: boolean
  onClick?: () => void
  setIsModalOpen: (isOpen: boolean) => void
}

export default function Modal(props: ModalProps) {
  const navigate = useNavigate()

  function returnHandler() {
    navigate(-1)
    props.setIsModalOpen(false)
  }

  return (
    <Transition appear show={props.isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => props.setIsModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-[1px] transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'md:min-w-md absolute w-[90%] md:max-w-lg',
                  'space-y-8',
                  'rounded-md bg-white p-4 md:p-8',
                  {
                    'border-8 border-alert-success': props.success,
                    'border-8 border-alert-warning': !props.success,
                  }
                )}
              >
                <Dialog.Title
                  className={clsx(
                    'flex flex-col gap-4',
                    'items-center justify-center',
                    'text-more text-2xl font-bold'
                  )}
                >
                  {props.success && (
                    <CheckCircleIcon className="w-icon-lg text-alert-success" />
                  )}
                  {!props.success && (
                    <ExclamationTriangleIcon className="w-icon-lg text-alert-warning" />
                  )}
                  {props.title}
                </Dialog.Title>

                <Dialog.Description className="cursor-default text-lg">
                  {props.children}
                </Dialog.Description>
                <div className="join w-full">
                  {!props.deleteMode && (
                    <Button className="join-item w-1/2" onClick={returnHandler}>
                      Regresar
                    </Button>
                  )}
                  {props.deleteMode && (
                    <Button
                      onClick={props.onClick}
                      isLoading={props.isLoading}
                      outline="error"
                      className="join-item w-1/2"
                    >
                      <TrashIcon className="w-5" />
                      {!props.isLoading ? 'Eliminar' : 'Eliminando...'}
                    </Button>
                  )}
                  <Button
                    primary
                    className="join-item w-1/2"
                    onClick={() => props.setIsModalOpen(false)}
                  >
                    {props.buttonText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
