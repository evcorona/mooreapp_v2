import Button from '~/components/Button'
import ComboBox from '../Inputs/ComboBox'
import Input from '~/components/Inputs/Input'
import { PROJECTS_FORM_DEFAULT_VALUES } from '~/constants/defaultValues'
import clsx from 'clsx'
import schema from '~/schemas/projectSchema'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

export interface ProjectFormTypes {
  codeProject: string
  projectType: string
  client: { value: string; _id: string }
  manager?: { value: string; _id: string }
}

interface Props {
  initialValues: any
  isSubmitting: boolean
  managerOptions: { value: string; _id: string }[]
  clientOptions: { value: string; _id: string }[]
  onSubmit: (values: ProjectFormTypes) => void
  isClearable?: boolean
  isSuccess?: boolean
  isLoading?: boolean
  values?: any
}

export default function ProjectForm(props: Props) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: PROJECTS_FORM_DEFAULT_VALUES,
    values: props.initialValues,
    mode: 'onChange',
    resolver: zodResolver(schema),
    shouldUseNativeValidation: false,
  })

  useEffect(() => reset(), [props.isSuccess])

  return (
    <form
      className={clsx(
        'rounded px-4 py-8 md:p-8',
        'flex flex-col gap-2',
        'border bg-white shadow-md'
      )}
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Input
        label="Código del proyecto"
        type="text"
        name="codeProject"
        register={register}
        placeholder="XXX-XXXX"
        error={errors?.codeProject?.message}
        required
      />
      <ComboBox
        name="client"
        label="Cliente"
        placeholder="Seleccionar un cliente del listado..."
        options={props.clientOptions}
        control={control}
        defaultValue={props.initialValues.client ?? ''}
        error={errors?.client?.message}
        required
      />
      <Input
        label="Tipo de proyecto"
        type="text"
        name="projectType"
        register={register}
        placeholder="Nombre del proyecto..."
        error={errors?.projectType?.message}
        required
      />
      <ComboBox
        name="manager"
        label="Gerente"
        placeholder="Seleccionar un gerente del listado..."
        options={props.managerOptions}
        control={control}
        defaultValue={props.initialValues.manager ?? null}
        error={errors?.manager?.message}
      />

      <div className="btn-group mt-4 gap-2">
        {props.isClearable && (
          <>
            <Button outline className="w-1/4" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button outline className="w-1/4" onClick={() => reset()}>
              Limpiar
            </Button>
          </>
        )}
        {!props.isClearable && (
          <Button outline className="w-1/2" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        )}
        <Button
          isDisabled={!isValid}
          isSubmit
          primary
          className={clsx('w-1/2', {
            'border-brand-gray border-2': !isValid,
            'bg-brand/50 hover:bg-brand/60 border-0': isValid,
          })}
        >
          {props.isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
