'use client'
import { Button, Carousel, Modal, SidebarRight, Title } from '@components'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDeletePortfolio, usePortfolio, useToggle } from '@hooks'
import { useRouter } from 'next/navigation'

export default function AdminPortfolioPreview({ params }: { params: { id: string } }) {
	const router = useRouter()
	const { data } = usePortfolio(params.id)
	const deleteMutation = useDeletePortfolio(params.id)
	const [deleteModalOpen, toggleDeleteModal] = useToggle()
	const { images = [], title } = data ?? {}

	const onEdit = () => router.push(`/admin/portfolio/${params.id}/edit`, { scroll: false })

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
							<FontAwesomeIcon icon={faTrashAlt} />
						</Button>
					</div>
				</Title.Label>
			</div>
			<div className='flex-1 px-8 py-2 overflow-y-auto'>
				<div className='h-[250px] mb-2'>
					<Carousel images={images.map(image => image.url)} />
				</div>
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
