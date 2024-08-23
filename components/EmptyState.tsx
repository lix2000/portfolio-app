'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Button } from '@components'

interface Props {
	icon?: IconProp
	title?: string
	subtitle?: string
	className?: string
	onClick?: () => void
	buttonText?: string
	buttonIcon?: JSX.Element
}

const EmptyState = ({
	icon = faFolderOpen,
	title = 'Ops! Nothing here...',
	subtitle = 'Please come back later!!',
	className,
	buttonText = 'Go to Home Page',
	onClick,
}: Props) => {
	const router = useRouter()
	const pathName = usePathname()
	const isHomePage = pathName === '/'
	const handleOnClick = () => {
		if (onClick) return onClick()
		router.push('/')
	}

	return (
		<div
			className={`flex-col flex justify-center gap-[10px] h-full w-full items-center box-content ${className}`}
		>
			<FontAwesomeIcon
				icon={icon}
				className='w-[120px] h-[120px] mb-[10px] color-primary'
				style={{ color: '#1E566E', width: '120px', height: '120px' }}
			/>
			<div className={`${className} box-border`}>
				<div className={`text-black text-subtitle`}>{title}</div>
				<div className={`text-body mb-lg text-primary-contrast-50`}>{subtitle}</div>
			</div>
			{!isHomePage && (
				<Button className='!px-4 !rounded-md' onClick={handleOnClick}>
					{buttonText}
				</Button>
			)}
		</div>
	)
}

export default EmptyState
