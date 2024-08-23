import { getInitialsByName } from '@utils'
import DangerousHtml from './DangerousHtml'
import { ServerTestimonialType } from '@types'
import StarRatingPreview from './StarRatingPreview'

interface Props {
	testimonial: ServerTestimonialType
}

const ReviewCard = ({ testimonial }: Props) => {
	const { name, description, createdAt, rating } = testimonial
	const classes = [
		'flex',
		'flex-col',
		'max-w-[330px]',
		'min-w-[330px]',
		'max-h-[320px]',
		'min-h-[320px]',
		'border-solid',
		'rounded-md',
		'group',
		'gap-[10px]',
		'justify-between',
		'items-center',
		'text-center',
		'shadow-lg',
		'hover:shadow-2xl',
		'transition-all',
		'duration-500',
		'bg-gradient-to-t',
		'from-white',
		'to-gray-200',
		'relative',
		'px-[40px]',
		'pt-[80px]',
		'pb-[30px]',
		'mt-[60px]',
	]
	const initials = getInitialsByName(name)

	return (
		<div className={classes.join(' ')}>
			<div className='w-[120px] h-[120px] rounded-full absolute bg-primary top-0 right-[105px] transform -translate-y-1/2 flex-center text-title-xl text-white'>
				{initials}
			</div>
			<span className='grow overflow-hidden leading-relaxed text-ellipsis'>{DangerousHtml(description)}</span>
			<div className='text-tertiary-contrast-20 mt-[-5px]'>
				{new Intl.DateTimeFormat('en-US').format(new Date(createdAt))}
			</div>
			<b>{name}</b>
			<StarRatingPreview rating={rating} />
		</div>
	)
}

export default ReviewCard
