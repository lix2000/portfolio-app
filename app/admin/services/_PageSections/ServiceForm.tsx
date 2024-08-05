import { Button, CheckBox, Dropzone, Form, Input, TextArea, RichText } from '@components'
import { FormServiceType, ServiceZodSchema } from '@types'

type Props = {
	onSubmit: (data: FormServiceType) => void
	onCancel: () => void
	defaultValues?: FormServiceType
}

const ServiceForm = ({ onSubmit, onCancel, defaultValues }: Props) => {
	return (
		<Form<FormServiceType>
			className='w-full flex flex-col gap-4'
			schema={ServiceZodSchema}
			onSubmit={onSubmit}
			defaultValues={defaultValues}
		>
			<Input name='title' label='Title' placeholder='Title' />
			<div className='w-full flex gap-4'>
				<Input name='price' type='number' label='Price' placeholder='Price' />
				<Input name='priceDescription' label='Price Description' placeholder='Price Description' />
			</div>
			<RichText name='description' placeholder='Description' />
			<CheckBox name='isAdditionalService' placeholder='Additional Service' />
			<Dropzone name='images' label='Click or drag images' multiple />
			<Button type='submit'>Save</Button>
			<Button type='button' onClick={onCancel} theme='tertiary'>
				Cancel
			</Button>
		</Form>
	)
}

export default ServiceForm
