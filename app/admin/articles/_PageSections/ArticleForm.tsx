import { Button, Dropzone, Form, Input, RichText } from '@components'
import { FormArticleType, ArticleZodSchema } from '@types'

type Props = {
	onSubmit: (data: FormArticleType) => void
	onCancel: () => void
	defaultValues?: FormArticleType
}

const ArticleForm = ({ onSubmit, onCancel, defaultValues }: Props) => {
	return (
		<Form<FormArticleType>
			className='w-full flex flex-col gap-4'
			schema={ArticleZodSchema}
			onSubmit={onSubmit}
			defaultValues={defaultValues}
		>
			<Input name='title' label='Title' placeholder='Title' />
			<RichText name='description' placeholder='Description' />
			<Dropzone name='images' label='Click or drag images' multiple />
			<Button type='submit'>Save</Button>
			<Button type='button' onClick={onCancel} theme='tertiary'>
				Cancel
			</Button>
		</Form>
	)
}

export default ArticleForm
