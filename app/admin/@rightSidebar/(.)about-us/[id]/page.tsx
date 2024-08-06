'use client'
import { Button, Carousel, DangerousHtml, Modal, SidebarRight, Title } from '@components'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDeleteAboutUs, useToggle, useAboutUs } from '@hooks'
import { useRouter } from 'next/navigation'

export default function AdminAboutUsPreview({ params }: { params: { id: string } }) {
	const router = useRouter()
	const { data } = useAboutUs(params.id)
	const deleteMutation = useDeleteAboutUs(params.id)
	const [deleteModalOpen, toggleDeleteModal] = useToggle()
	const { description, images = [], title, _id } = data ?? {}

	const onEdit = () => router.push(`/admin/about-us/${_id}/edit`, { scroll: false })

	return (
		<SidebarRight>
			<div className='px-4 py-2'>
				<Title.Label>
					<div className='flex-between'>
						{title}
						<div className='text-body flex gap-1'>
							<Button className='!px-4 !rounded-md' onClick={onEdit}>
								<FontAwesomeIcon icon={faPenToSquare} />
							</Button>
							<Button className='!px-4 !rounded-md' theme='secondary' onClick={toggleDeleteModal}>
								<FontAwesomeIcon icon={faTrash} />
							</Button>
						</div>
					</div>
				</Title.Label>
			</div>
			<div className='flex-1 px-8 py-2 overflow-y-auto'>
				<div className='h-[250px] mb-2'>
					<Carousel images={images.map(image => image.url)} />
				</div>
				<div className='text-body link'>{DangerousHtml(description)}</div>
			</div>
			{deleteModalOpen && (
				<Modal className='bg-white rounded-md p-4 shadow-lg' onCancel={toggleDeleteModal}>
					<Title.Label className='text-primary font-bold text-title-sm'>Confirm Delete</Title.Label>
					<div className='text-body mt-2'>
						Are you sure you want to delete <span className='text-primary font-bold'>{title}</span>?
					</div>
					<div className='mt-4 flex justify-end'>
						<Button className='mr-2' onClick={toggleDeleteModal}>
							Cancel
						</Button>
						<Button theme='secondary' onClick={() => deleteMutation.mutate()}>
							Delete
						</Button>
					</div>
				</Modal>
			)}
		</SidebarRight>
	)
}
