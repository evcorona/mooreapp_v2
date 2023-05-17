import DatePicker, { registerLocale } from 'react-datepicker'

import addDays from 'date-fns/addDays'
import es from 'date-fns/locale/es'

registerLocale('es', es)

interface DateMonthPickerProps {
  startDate: Date | null
  setStartDate: (date: Date) => void
  isLoading?: boolean
}
export default function DateMonthPicker(props: DateMonthPickerProps) {
  return (
    <div className="w-full md:w-fit">
      <DatePicker
        showIcon
        selected={props.startDate}
        onChange={(date: Date) => props.setStartDate(date)}
        dateFormat="MMMM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        locale="es"
        placeholderText="Filtrar por fecha"
        todayButton="Hoy"
        shouldCloseOnSelect={true}
        closeOnScroll
        disabled={props.isLoading}
        maxDate={addDays(new Date(), 1)}
      />
    </div>
  )
}
