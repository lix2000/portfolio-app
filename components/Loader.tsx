import { PropsWithChildren } from 'react'

interface Props {
	isLoading: boolean
}

const Loader = ({ isLoading, children }: PropsWithChildren<Props>) => {
	return isLoading ? <div>Loading</div> : children
}

export default Loader
