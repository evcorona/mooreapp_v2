import { CalendarIcon, XCircleIcon } from '@heroicons/react/24/outline'
import DatePicker, { registerLocale } from 'react-datepicker'

import clsx from 'clsx'
import es from 'date-fns/locale/es'
import { forwardRef } from 'react'

registerLocale('es', es)

interface Props {
  startDate: Date | null
  endDate: Date | null
  isClearable?: boolean
  isLoading?: boolean
  resetPicker: () => void
  setEndDate: any
  setStartDate: any
  label?: string
  className?: string
  isTodayMaxDate?: boolean
}

export default function DateRangePicker(props: Props) {
  const CustomPickerInput = forwardRef((pickerProps: any, ref: any) => (
    <button
      className={clsx('relative flex w-full items-center gap-2', 'px-2 py-2', {
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
    <>
      {props.label && (
        <label className="pb-2 font-bold text-moore">{props.label}</label>
      )}
      <div
        className={clsx('relative flex w-full items-center', props.className)}
      >
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
          maxDate={props.isTodayMaxDate ? new Date() : null}
          showYearDropdown
          customInput={<CustomPickerInput />}
          disabled={props.isLoading}
        />
        {isClearable && (
          <div
            className="absolute right-1 cursor-pointer p-2 text-moore hover:text-moore-light active:text-black"
            onClick={props.resetPicker}
          >
            <XCircleIcon className="w-6" />
          </div>
        )}
        {props.isLoading && (
          <span className="loading loading-spinner loading-sm absolute right-3 text-moore" />
        )}
      </div>
    </>
  )
}
