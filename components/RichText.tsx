'use client'
import { useController } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { PropsWithChildren, useMemo } from 'react'

const RichText = ({
	name,
	placeholder,
	className,
}: PropsWithChildren<{ name: string; placeholder?: string; className?: string }>) => {
	const { field } = useController({ name })

	const editor = useMemo(() => {
		return {
			theme: 'snow',
			modules: {
				toolbar: [
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					['bold', 'italic', 'underline', 'strike', 'blockquote'],
					[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
					['link'],
					['clean'],
				],
			},
			formats: [
				'header',
				'bold',
				'italic',
				'underline',
				'strike',
				'blockquote',
				'list',
				'bullet',
				'indent',
				'link',
			],
		}
	}, [])

	return (
		<div className={className}>
			<ReactQuill
				{...field}
				id={name}
				value={field.value}
				onChange={field.onChange}
				placeholder={placeholder}
				modules={editor.modules}
				formats={editor.formats}
			/>
		</div>
	)
}

export default RichText
