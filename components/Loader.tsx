import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PropsWithChildren } from 'react'

interface Props {
	isLoading?: boolean
	size?: SizeProp
}

const Loader = ({ isLoading, size = '10x', children }: PropsWithChildren<Props>) =>
	isLoading ?? true ? (
		<div className='w-full h-full flex items-center justify-center'>
			<FontAwesomeIcon size={size} className='text-primary' icon={faCircleNotch} spin />
		</div>
	) : (
		children
	)

export default Loader
