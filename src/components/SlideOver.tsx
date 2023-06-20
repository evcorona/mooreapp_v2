import { Dialog, Transition } from '@headlessui/react'

import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  title: string
  children: React.ReactNode
}
export default function SlideOver(props: Props) {
  const { open, setOpen } = props

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={clsx(
              'fixed inset-0',
              'bg-gray-500 bg-opacity-75',
              'backdrop-blur-[1px] transition-opacity'
            )}
          />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl pl-14">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                          {props.title}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className={clsx(
                              'rounded-md',
                              'bg-white',
                              'text-gray-400 hover:text-gray-500',
                              'focus:outline-none',
                              'focus:ring-2 focus:ring-moore focus:ring-offset-2'
                            )}
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex-1 p-4 md:p-6">
                      {props.children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
