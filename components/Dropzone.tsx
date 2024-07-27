'use client'
import { faCloudArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DROPZONE_ACCEPT_TYPES } from '@lib/settings'
import { useDropzone } from 'react-dropzone'
import { useController } from 'react-hook-form'
import { Button, Error } from '@components'
import { UploadApiResponse } from 'cloudinary'
import { forwardRef } from 'react'
import Image from 'next/image'

type DropzoneProps = {
	name: string
	label: string
	multiple?: boolean
}

type DropzoneValue = {
	newFiles: File[]
	existingFiles: UploadApiResponse[]
}

const isFileNew = (file: UploadApiResponse | File): file is File => !(file as UploadApiResponse)?.url

const Dropzone = ({ name, label, multiple }: DropzoneProps) => {
	const { field, fieldState } = useController({
		name,
		defaultValue: {
			newFiles: [],
			existingFiles: [],
		} satisfies DropzoneValue,
	})
	const value: DropzoneValue = field.value

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: (acceptedFiles: File[]) => {
			const newFiles = [
				...value.newFiles,
				...acceptedFiles.filter(
					acceptedFile => !value.newFiles?.some((file: File) => acceptedFile.name === file.name)
				),
			]
			field.onChange({
				...value,
				newFiles,
			})
		},
		multiple,
		accept: DROPZONE_ACCEPT_TYPES,
	})

	const handleRemoveFile = (key: keyof DropzoneValue, index: number) => {
		const newFiles = [...value[key]]
		newFiles.splice(index, 1)
		field.onChange({
			...value,
			[key]: newFiles,
		})
	}

	return (
		<div className='flex flex-col gap-4'>
			<div
				{...getRootProps()}
				className={`border-2 ${
					isDragActive ? 'border-primary text-primary' : 'border-tertiary-tone-25 text-tertiary-tone-25'
				} border-dashed rounded-lg p-12 hover:border-primary hover:text-primary cursor-pointer`}
			>
				<input {...getInputProps()} />
				<p className='text-center'>
					<FontAwesomeIcon icon={faCloudArrowUp} />
					<br />
					{label}
				</p>
			</div>

			{fieldState.error && <Error>{fieldState.error.message}</Error>}

			{!!Object.values(value).flat().length && (
				<div className='grid grid-cols-3 gap-4'>
					{Object.values(value)
						.flat()
						.map((file: UploadApiResponse | File) => {
							const isNew = isFileNew(file)
							const url = isNew ? URL.createObjectURL(file) : file.url
							const key = isNew ? 'newFiles' : 'existingFiles'
							const index = isNew ? value.newFiles.indexOf(file) : value.existingFiles.indexOf(file)
							const handleDelete = () => handleRemoveFile(key, index)

							return (
								<div key={key + index} className='relative h-32 w-full rounded-lg'>
									<Image
										src={url}
										alt='image'
										className='w-full h-auto rounded-lg'
										style={{ objectFit: 'cover', objectPosition: 'center' }}
										sizes='100vw'
										fill
									/>
									<Button
										type='button'
										className='absolute z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2 !px-3 !rounded-full'
										onClick={handleDelete}
									>
										<FontAwesomeIcon icon={faTrash} />
									</Button>
								</div>
							)
						})}
				</div>
			)}
		</div>
	)
}

export default forwardRef(Dropzone)
