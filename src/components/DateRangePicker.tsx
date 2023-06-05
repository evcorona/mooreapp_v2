import { CalendarIcon, XCircleIcon } from '@heroicons/react/24/outline'
import DatePicker, { registerLocale } from 'react-datepicker'

import clsx from 'clsx'
import es from 'date-fns/locale/es'
import { forwardRef } from 'react'

registerLocale('es', es)

interface Props {
  startDate: Date
  endDate: Date
  isClearable?: boolean
  isLoading?: boolean
  resetPicker: () => void
  setEndDate: (date: Date) => void
  setStartDate: (date: Date) => void
}

export default function DateRangePicker(props: Props) {
  const CustomPickerInput = forwardRef((pickerProps: any, ref: any) => (
    <button
      className={clsx('relative flex w-full items-center gap-2', {
        'cursor-wait text-gray-lighter': props.isLoading,
      })}
      disabled={props.isLoading}
      onClick={pickerProps.onClick}
      ref={ref}
    >
      <CalendarIcon className="w-5" />
      {pickerProps.value}
    </button>
  ))

  function onChangeHandler(dates: any[]): void {
    const [start, end] = dates

    props.setStartDate(start)
    props.setEndDate(end)
  }

  const isClearable = props.isClearable && !props.isLoading

  return (
    <div className="relative flex w-full items-center md:w-72">
      <DatePicker
        //Basic configuration
        selected={props.startDate}
        onChange={onChangeHandler}
        startDate={props.startDate}
        endDate={props.endDate}
        selectsRange
        //Customization
        dateFormat="dd/MMM/yyyy"
        locale="es"
        todayButton="Hoy"
        maxDate={new Date()}
        showYearDropdown
        customInput={<CustomPickerInput />}
        disabled={props.isLoading}
      />
      {isClearable && (
        <div
          className="absolute right-1 cursor-pointer p-2 text-moore hover:text-moore-light active:text-black"
          onClick={props.resetPicker}
        >
          <XCircleIcon className="w-5" />
        </div>
      )}
      {props.isLoading && (
        <span className="loading loading-spinner loading-sm absolute right-3 text-moore" />
      )}
    </div>
  )
}
