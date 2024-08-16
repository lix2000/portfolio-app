import { PropsWithChildren } from 'react'

const OnMobile = ({ children }: PropsWithChildren) => {
	return <div className='block sm:hidden'>{children}</div>
}

export default OnMobile
