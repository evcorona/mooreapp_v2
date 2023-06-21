import Button from './Button'
import { CollectionsDataType } from '~/types/objects'
import Modal from '../Modal'
import { TrashIcon } from '@heroicons/react/24/outline'
import { deleteById as deleteActivity } from '~/lib/api/activities'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { useState } from 'react'

interface Props {
  collection: 'clients' | 'projects' | 'collaborators' | 'activities'
  data: CollectionsDataType
  refetch: () => void
}

export default function DeleteButton(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { mutateAsync, isLoading: isDeleting } = useMutation(deleteActivity, {
    onSuccess: () => {
      props.refetch()
      toast.success('El registro ha sido eliminado exitosamente')
      setIsModalOpen(false)
    },
  })

  function deleteHandler() {
    mutateAsync(props.data._id)
  }

  const message = `¿Seguro de querer eliminar la actividad?`

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Confirmación requerida"
        buttonText="Cancelar"
        isLoading={isDeleting}
        onClick={deleteHandler}
        deleteMode
      >
        {message}
        <span className="mt-4 italic">Esta acción es irreversible</span>
      </Modal>
      <Button
        outline="error"
        className="btn-sm"
        onClick={() => setIsModalOpen(true)}
      >
        <TrashIcon className="w-5" />
        <span className="hidden lg:block">Eliminar</span>
      </Button>
    </>
  )
}
