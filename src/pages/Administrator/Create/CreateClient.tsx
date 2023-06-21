import { createClient, errorHandler } from '~/lib/api/clients'

import { AxiosError } from 'axios'
import { CLIENTS_DEFAULT_VALUES } from '~/constants/defaultValues'
import ClientForm from '~/components/Forms/ClientForm'
import Modal from '~/components/Modal'
import Title from '~/components/Title'
import { useMutation } from 'react-query'
import { useState } from 'react'

export default function CreateClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')

  const { mutateAsync, isLoading, isSuccess } = useMutation(createClient, {
    onSuccess: () => {
      setIsModalOpen(true)
    },
    onError: error => errorHandler(error as AxiosError),
  })

  function onSubmit(values: any) {
    setName(values.clientName)
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
        El cliente{' '}
        <span className="font-bold text-moore underline decoration-moore underline-offset-2">
          {name}
        </span>{' '}
        ha sido creado y esta disponible para asignación de proyectos
      </Modal>
      <div className="container mx-auto space-y-4 px-4 pb-4 pt-20 md:px-28">
        <Title title="Nuevo Cliente" />
        <ClientForm
          onSubmit={onSubmit}
          initialValues={CLIENTS_DEFAULT_VALUES}
          isSubmitting={isLoading}
          isSuccess={isSuccess}
          isClearable
        />
      </div>
    </>
  )
}
