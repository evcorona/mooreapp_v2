import { createCollaborator, errorHandler } from '~/lib/api/collaborators'

import { AxiosError } from 'axios'
import { COLLABORATORS_DEFAULT_VALUES } from '~/constants/defaultValues'
import CollaboratorForm from '~/components/Forms/CollaboratorForm'
import Modal from '~/components/Modal'
import Title from '~/components/Title'
import { useMutation } from 'react-query'
import { useState } from 'react'

export default function CreateCollaborator() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')

  const { mutateAsync, isLoading, isSuccess } = useMutation(
    createCollaborator,
    {
      onSuccess: () => {
        setIsModalOpen(true)
      },
      onError: error => errorHandler(error as AxiosError),
    }
  )

  function onSubmit(values: any) {
    setName(`${values.name} ${values.lastName}`)
    mutateAsync(values)
  }

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="¡Operación exitosa!"
        buttonText="Agregar otro"
        success
      >
        El colaborador{' '}
        <span className="font-bold text-moore underline decoration-moore underline-offset-2">
          {name}
        </span>{' '}
        ha sido creado para acceder al portal
      </Modal>
      <div className="container mx-auto space-y-4 px-4 pb-4 pt-20 md:px-28">
        <Title title="nuevo colaborador" />
        <CollaboratorForm
          onSubmit={onSubmit}
          initialValues={COLLABORATORS_DEFAULT_VALUES}
          isSubmitting={isLoading}
          isSuccess={isSuccess}
          isClearable
        />
      </div>
    </>
  )
}
