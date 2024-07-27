'use client'
import { Button, Carousel, Modal, SidebarRight, Title } from '@components'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDeleteService, useServices, useToggle } from '@hooks'
import { useRouter } from 'next/navigation'

export default function AdminServicePreview({ params }: { params: { id: string } }) {
	const router = useRouter()
	const { data } = useServices()
	const deleteMutation = useDeleteService(params.id)
	const [deleteModalOpen, toggleDeleteModal] = useToggle()
	const service = data?.pages.flatMap(page => page.data).find(service => service._id === params.id)
	const { description, priceDescription, images = [], title, price, isAdditionalService } = service ?? {}

	const onEdit = () => router.push(`/admin/services/${params.id}/edit`, { scroll: false })

	return (
		<SidebarRight>
			<div className='px-4 py-2'>
				<Title.Label>
					{title}
					<div className='float-right text-body flex gap-1'>
						<Button className='!px-4 !rounded-md' onClick={onEdit}>
							<FontAwesomeIcon icon={faPenToSquare} />
						</Button>
						<Button className='!px-4 !rounded-md' theme='secondary' onClick={toggleDeleteModal}>
							<FontAwesomeIcon icon={faTrash} />
						</Button>
					</div>
				</Title.Label>
			</div>
			<div className='flex-1 px-8 py-2 overflow-y-auto'>
				<div className='h-[250px] mb-2'>
					<Carousel images={images.map(image => image.url)} />
				</div>
				<div className='my-4 text-body font-bold text-center'>
					<span className='bg-primary text-primary-contrast rounded-xl p-2'>
						${price}&nbsp;{priceDescription}
					</span>
					{isAdditionalService && (
						<span className='bg-secondary text-secondary-contrast rounded-xl p-2 ml-2'>
							Additional Service
						</span>
					)}
				</div>
				<div className='text-body'>{description}</div>
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
