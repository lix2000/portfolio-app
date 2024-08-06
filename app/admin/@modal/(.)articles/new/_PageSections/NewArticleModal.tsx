'use client'

import { ArticleForm } from '@app/admin/articles/_PageSections'
import { Modal } from '@components'
import { useCreateArticle } from '@hooks'
import { useRouter } from 'next/navigation'

const NewArticleModal = () => {
	const router = useRouter()
	const mutation = useCreateArticle()

	const closeModal = () => router.back()

	return (
		<Modal className='w-[500px] relative'>
			<div className='text-title text-center text-primary font-bold'>New Article</div>
			<ArticleForm onSubmit={mutation.mutateAsync} onCancel={closeModal} />
		</Modal>
	)
}

export default NewArticleModal
