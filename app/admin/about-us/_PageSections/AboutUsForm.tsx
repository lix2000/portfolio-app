import { Button, Dropzone, Form, Input, RichText } from '@components'
import { FormAboutUsType, AboutUsZodSchema } from '@types'

type Props = {
	onSubmit: (data: FormAboutUsType) => void
	onCancel: () => void
	defaultValues?: FormAboutUsType
}

const AboutUsForm = ({ onSubmit, onCancel, defaultValues }: Props) => {
	return (
		<Form<FormAboutUsType>
			className='w-full flex flex-col gap-4'
			schema={AboutUsZodSchema}
			onSubmit={onSubmit}
			defaultValues={defaultValues}
		>
			<div className='w-full flex flex-col gap-4'>
				<Input name='title' label='Title' placeholder='Title' />
				<RichText name='description' placeholder='Description' />
			</div>
			<Dropzone name='images' label='Click or drag images' multiple />
			<Button type='submit'>Save</Button>
			<Button type='button' onClick={onCancel} theme='tertiary'>
				Cancel
			</Button>
		</Form>
	)
}

export default AboutUsForm
