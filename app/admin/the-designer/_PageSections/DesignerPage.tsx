'use client'
import { Button, Dropzone, Form, Input, RichText, Title } from '@components'
import { useCreateOrEditDesigner, useDesigner } from '@hooks'
import { DesignerZodSchema, FormDesignerType } from '@types'
import { transformDesignerToFormValues } from '@utils'
import DesignerPhotoPreview from './DesignerPhotoPreview'

const DesignerPage = () => {
	const mutation = useCreateOrEditDesigner()
	const { data: designer } = useDesigner()
	const onSubmit = async (data: FormDesignerType) => await mutation.mutateAsync(data)

	return (
		<div className='w-full h-full'>
			<Title.Label>The Designer</Title.Label>
			<div className='mx-8 mb-8 p-8 rounded-3xl shadow-lg bg-white'>
				<Form<FormDesignerType>
					schema={DesignerZodSchema}
					onSubmit={onSubmit}
					defaultValues={transformDesignerToFormValues(designer)}
				>
					<div className='grid grid-cols-2 grid-rows-1 gap-8'>
						<DesignerPhotoPreview />
						<div className='flex flex-col gap-4'>
							<Input label='Name' placeholder='Name' name='name' />
							<Input label='Email' placeholder='Email' name='email' type='email' />
							<Input label='Phone' placeholder='Phone' name='phone' type='tel' />
							<RichText placeholder='Description' name='description' />
							<Dropzone label='Click or drag image' name='image' multiple={false} />
							<Button type='submit'>Save</Button>
						</div>
					</div>
				</Form>
			</div>
		</div>
	)
}

export default DesignerPage
