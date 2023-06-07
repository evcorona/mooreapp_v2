import { ActivitiesData, ProjectsData } from '~/types/objects'
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
import Button from '../Button'
import ComboBox from '~/components/Inputs/ComboBox'
import DateRangePicker from '~/components/DateRangePicker'
import Input from '~/components/Inputs/Input'
import { Tab } from '@headlessui/react'
import Toggle from '~/components/Toggle'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

interface Props {
  date: string
  setOpen: (open: boolean) => void
}

export default function PersonalActivityForm(props: Props) {
  const [inputType, setInputType] = useState<string[]>([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [toggleValue, setToggleValue] = useState(false)
  const [disableToggle, setDisableToggle] = useState(false)

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
    onSuccess: () => {
      props.setOpen(false)
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
  } = useForm({
    defaultValues: {
      project: {
        _id: '',
        value: '',
        inputType: [''],
      },
      timeAmmount: 0,
      activityDate: '',
    },
    mode: 'onChange',
    //resolver: zodResolver(schema),
    shouldUseNativeValidation: false,
  })

  const projectValue = watch('project')
  const hasDateRangeInput = inputType.includes('dateRange')
  const hasTimeInput = inputType.includes('time')

  function onSubmit(values: any) {
    const data: ActivitiesData = {
      clientID: values.client._id,
      projectID: values.project._id,
      timeAmmount: values.timeAmmount,
      activityType: 'Profesional',
      activityDate: props.date,
    }

    mutateAsync(data)
  }

  function resetPicker() {
    setStartDate(null)
    setEndDate(null)
  }

  useEffect(() => setInputType(projectValue.inputType), [projectValue])

  return (
    <form
      className="flex flex-col rounded px-4 py-8 md:p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ComboBox
        name="project"
        label="Proyecto"
        placeholder="Seleccionar un proyecto del listado..."
        options={projectOptions}
        œ
        control={control}
        error={errors?.project?.message}
        required
      />
      <Tab.Group>
        <Tab.List className="space-x-4 text-right">
          <Tab
            disabled={!hasDateRangeInput}
            className="rounded-md border px-4 py-2"
          >
            Por días
          </Tab>
          <Tab disabled={!hasTimeInput} className="rounded-md border px-4 py-2">
            Por horas
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <DateRangePicker
              label="Rango de fechas"
              isTodayMaxDate
              startDate={startDate}
              endDate={endDate}
              isClearable={startDate !== null}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              resetPicker={resetPicker}
              className="pt-2"
            />
          </Tab.Panel>
          <Tab.Panel>
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

      <div className="btn-group mt-4 gap-2">
        <Button outline className="w-1/2" onClick={() => reset()}>
          Limpiar
        </Button>
        <Button
          isDisabled={!isValid}
          isSubmit
          primary
          className={clsx('w-1/2', {
            'border-brand-gray border-2': !isValid,
            'bg-brand/50 hover:bg-brand/60 border-0': isValid,
          })}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
