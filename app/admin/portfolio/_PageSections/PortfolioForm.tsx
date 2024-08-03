import { Button, Dropzone, Form, Input } from '@components'
import { FormPortfolioType, PortfolioZodSchema } from '@types'

type Props = {
	onSubmit: (data: FormPortfolioType) => void
	onCancel: () => void
	defaultValues?: FormPortfolioType
}

const PortfolioForm = ({ onSubmit, onCancel, defaultValues }: Props) => (
	<Form<FormPortfolioType>
		className='w-full flex flex-col gap-4'
		schema={PortfolioZodSchema}
		onSubmit={onSubmit}
		defaultValues={defaultValues}
	>
		<Input name='title' label='Title' placeholder='Title' />
		<div className='w-full flex gap-4'>
			<Dropzone name='images' label='Click or drag images' multiple />
		</div>
		<Button type='submit'>Save</Button>
		<Button type='button' theme='tertiary' onClick={onCancel}>
			Cancel
		</Button>
	</Form>
)

export default PortfolioForm
