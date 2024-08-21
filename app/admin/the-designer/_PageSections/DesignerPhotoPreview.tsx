'use client'

import { isFileNew } from '@components/Dropzone'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UploadApiResponse } from 'cloudinary'
import Image from 'next/image'
import { useController } from 'react-hook-form'

type ImageType = File | UploadApiResponse

const DesignerPhotoPreview = () => {
	const { field } = useController({
		name: 'image',
	})

	const [image] = (Object.values(field.value || {})?.flat?.() as ImageType[]) || []
	const imageSrc = image && (isFileNew(image) ? URL.createObjectURL(image) : image?.url)

	return (
		<div className='flex-center border-r-2 border-primary pr-8'>
			{imageSrc ? (
				<Image
					alt='image'
					className='object-contain'
					src={imageSrc}
					width={0}
					height={0}
					sizes='100vw'
					style={{ width: '100%', height: '100%' }}
					unoptimized
					priority
				/>
			) : (
				<div className='text-center text-primary text-title'>
					<FontAwesomeIcon size='2xl' icon={faFolderOpen} />
					<br />
					Please upload one image
				</div>
			)}
		</div>
	)
}

export default DesignerPhotoPreview
