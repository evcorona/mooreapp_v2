import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import {
  createActivity,
  errorHandler as errorActivityHandler,
} from '~/lib/api/activities'
import {
  errorHandler as errorProjectHandler,
  getProjectsByClientId,
} from '~/lib/api/projects'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { AxiosError } from 'axios'
import Button from '../Buttons/Button'
import ComboBox from '~/components/Inputs/ComboBox'
import DateRangePicker from '~/components/Inputs/DateRangePicker'
import Input from '~/components/Inputs/Input'
import { ProjectsData } from '~/types/objects'
import { Tab } from '@headlessui/react'
import _ from 'lodash'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { utcToZonedTime } from 'date-fns-tz'

interface Props {
  date: string
  setOpen: (open: boolean) => void
}

export default function PersonalActivityForm(props: Props) {
  const [inputType, setInputType] = useState<string[]>([''])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { data: clientProjects = [] } = useQuery<ProjectsData[]>({
    queryKey: ['projects'],
    queryFn: () => getProjectsByClientId('11111', 'personal'),
    onError: error => errorProjectHandler(error as AxiosError),
  })

  const projectOptions = clientProjects.map(project => {
    return {
      _id: project._id,
      value: project.codeProject,
      inputType: project.durationType,
    }
  })

  const { mutateAsync, isLoading: isSubmitting } = useMutation(createActivity, {
    onSuccess: data => {
      props.setOpen(false)
      console.log(data.length)
      toast.success('Actividad creada correctamente')
    },
    onError: error => errorActivityHandler(error as AxiosError),
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      project: {
        _id: '',
        value: '',
        inputType: [''],
      },
      timeAmmount: 0,
    },
    mode: 'onChange',
    //resolver: zodResolver(schema),
    shouldUseNativeValidation: false,
  })

  const projectValue = watch('project')
  const hasDateRangeInput = inputType.includes('dateRange')
  const hasTimeInput = inputType.includes('time')
  const isInitialValue = inputType.includes('')

  function onSubmit(values: any) {
    const data: any = {
      clientID: clientProjects[0].clientID,
      projectID: values.project._id,
      timeAmmount: values.timeAmmount,
      activityDate: props.date,
      activityType: 'Personal',
      startDate,
      endDate,
    }
    mutateAsync(data)
  }

  function resetPicker() {
    setStartDate(null)
    setEndDate(null)
  }

  useEffect(() => {
    setInputType(projectValue.inputType)
    projectValue.inputType.includes('dateRange')
      ? setSelectedIndex(0)
      : setSelectedIndex(1)
  }, [projectValue])

  useEffect(() => {
    resetPicker()
    setValue('timeAmmount', 0)
  }, [selectedIndex])

  const zonedDate = utcToZonedTime(new Date(props.date), 'Greenwich')

  return (
    <form
      className="flex animate-appear flex-col gap-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <ComboBox
        name="project"
        label="Motivo"
        placeholder="Seleccionar un motivo del listado..."
        options={projectOptions}
        control={control}
        error={errors?.project?.message}
        required
      />

      {!isInitialValue && (
        <div className="animate-appear">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List
              className={clsx(
                'rounded-md p-1',
                'md:ml-auto md:w-fit',
                'border bg-gray-light'
              )}
            >
              <Tab
                disabled={!hasDateRangeInput}
                className={clsx(
                  'w-1/2 md:w-fit',
                  'whitespace-nowrap',
                  'btn hover:border-transparent',
                  'ui-selected:bg-white ui-not-selected:bg-gray-light'
                )}
              >
                <CalendarIcon className="w-4" />
                Por días
              </Tab>
              <Tab
                disabled={!hasTimeInput}
                className={clsx(
                  'w-1/2 md:w-fit',
                  'whitespace-nowrap',
                  'btn hover:border-transparent',
                  'ui-selected:bg-white ui-not-selected:bg-gray-light'
                )}
              >
                <ClockIcon className="w-4" />
                Por horas
              </Tab>
            </Tab.List>
            <Tab.Panels className="py-6">
              <Tab.Panel className="animate-appear">
                <DateRangePicker
                  label="Rango de fechas"
                  isTodayMaxDate={false}
                  startDate={startDate ?? zonedDate}
                  endDate={endDate}
                  isClearable={startDate !== null}
                  setEndDate={setEndDate}
                  setStartDate={setStartDate}
                  resetPicker={resetPicker}
                  className="py-2"
                />
              </Tab.Panel>
              <Tab.Panel className="animate-appear">
                <Input
                  label="Horas ocupadas"
                  type="number"
                  name="timeAmmount"
                  prefix="time"
                  required
                  register={register}
                  error={errors?.timeAmmount?.message}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <div className="join join-horizontal w-full">
            <Button className="join-item w-1/2" onClick={() => reset()}>
              Limpiar
            </Button>
            <Button
              isDisabled={!isValid}
              isSubmit
              primary
              className={clsx('join-item w-1/2', {
                'border-brand-gray border-2': !isValid,
                'bg-brand/50 hover:bg-brand/60 border-2 border-transparent':
                  isValid,
              })}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}
