'use client'
import { ArticleForm } from '@app/admin/articles/_PageSections'
import { Modal } from '@components'
import { useEditArticle, useArticle } from '@hooks'
import { transformArticleToFormValues } from '@utils'
import { useRouter } from 'next/navigation'

const EditArticleModal = ({ id }: { id: string }) => {
	const router = useRouter()
	const mutation = useEditArticle(id, '/admin/articles')
	const { data: article } = useArticle(id)
	const closeModal = () => router.back()

	return (
		<Modal className='w-[500px] relative'>
			<div className='text-title text-center text-primary font-bold'>Edit Article</div>
			<ArticleForm
				onSubmit={mutation.mutateAsync}
				onCancel={closeModal}
				defaultValues={transformArticleToFormValues(article)}
			/>
		</Modal>
	)
}

export default EditArticleModal
