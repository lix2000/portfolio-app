'use client'
import { Title } from '@components'
import { useRouter } from 'next/navigation'
import { useEditArticle } from '@hooks'
import { transformArticleToFormValues } from '@utils'
import { ServerArticleType } from '@types'
import { ArticleForm } from '@app/admin/articles/_PageSections'

const EditArticle = ({ id, article }: { id: string; article: ServerArticleType }) => {
	const router = useRouter()
	const mutation = useEditArticle(id, '/admin/articles')

	const onCancel = () => router.push('/admin/articles')

	return (
		<div className='w-full h-full'>
			<Title.Label>Edit Article</Title.Label>
			<div className='mx-8'>
				<ArticleForm
					onSubmit={mutation.mutateAsync}
					onCancel={onCancel}
					defaultValues={transformArticleToFormValues(article)}
				/>
			</div>
		</div>
	)
}

export default EditArticle
