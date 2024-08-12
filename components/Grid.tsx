interface Props {
	children: React.ReactNode
	className?: string
}

const Grid = ({ children, className }: Props) => {
	const classes = ['w-full', 'flex', 'flex-row', 'flex-wrap', 'gap-4', 'justify-center', className]
	return <div className={classes.join(' ')}>{children}</div>
}

export default Grid
