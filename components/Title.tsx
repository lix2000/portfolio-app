import { PropsWithChildren } from 'react'

type Props = {
	className?: string
}

const Title = ({ children }: PropsWithChildren) => (
	<div className='w-full bg-primary text-primary-contrast text-title-xl px-12 py-2 mb-2'>
		<div className='relative before:content-[""] before:absolute before:-bottom-6 before:border-8 before:border-transparent before:border-t-primary'>
			{children}
		</div>
	</div>
)

// eslint-disable-next-line react/display-name
Title.Label = ({ children, className = '' }: PropsWithChildren<Props>) => (
	<div className={`text-primary font-bold text-title-xl px-8 py-2 ${className}`}>{children}</div>
)

export default Title
