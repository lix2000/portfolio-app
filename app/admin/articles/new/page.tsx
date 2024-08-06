'use client'
import { Title } from '@components'
import { ArticleForm } from '../_PageSections'
import { useRouter } from 'next/navigation'
import { useCreateArticle } from '@hooks'

const NewArticle = () => {
	const router = useRouter()
	const mutation = useCreateArticle()

	const onCancel = () => router.push('/admin/articles')

	return (
		<div className='w-full h-full'>
			<Title.Label>New Article</Title.Label>
			<div className='mx-8'>
				<ArticleForm onSubmit={mutation.mutateAsync} onCancel={onCancel} />
			</div>
		</div>
	)
}

export default NewArticle
