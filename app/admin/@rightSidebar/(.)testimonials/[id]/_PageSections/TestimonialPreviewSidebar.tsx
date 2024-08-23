'use client'
import { Button, DangerousHtml, Modal, SidebarRight, StarRatingPreview, Title } from '@components'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDeleteTestimonial, useTestimonial, useToggle } from '@hooks'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

export default function TestimonialPreviewSidebar({ params }: { params: { id: string } }) {
	const router = useRouter()
	const { data: testimonial } = useTestimonial(params.id)
	const deleteMutation = useDeleteTestimonial(params.id)
	const [deleteModalOpen, toggleDeleteModal] = useToggle()
	const { name, description, rating = 0, createdAt } = testimonial ?? {}

	const onEdit = () => router.push(`/admin/testimonials/${params.id}/edit`, { scroll: false })

	const onDelete = async () =>
		await deleteMutation.mutateAsync().then(() => router.push('/admin/testimonials'))

	return (
		<SidebarRight>
			<div className='px-4 py-2'>
				<Title.Label>
					{name}
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
			<div className='flex-1 px-8 overflow-y-auto'>
				<StarRatingPreview rating={rating} className='mb-4' />
				<div className='text-body link'>{DangerousHtml(description)}</div>
				<div className='text-body text-gray-400'>{format(new Date(createdAt as Date), 'MM/dd/yyyy')}</div>
			</div>
			{deleteModalOpen && (
				<Modal className='bg-white rounded-md p-4 shadow-lg' onCancel={toggleDeleteModal}>
					<Title.Label className='text-primary font-bold text-title-sm'>Confirm Delete</Title.Label>
					<div className='text-body mt-2'>
						Are you sure you want to delete <span className='text-primary font-bold'>{name}</span>&apos;s
						testimonial?
					</div>
					<div className='mt-4 flex justify-end'>
						<Button className='mr-2' onClick={toggleDeleteModal}>
							Cancel
						</Button>
						<Button theme='secondary' onClick={onDelete}>
							Delete
						</Button>
					</div>
				</Modal>
			)}
		</SidebarRight>
	)
}
