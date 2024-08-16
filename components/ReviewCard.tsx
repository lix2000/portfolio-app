import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getInitialsByName } from '@utils'
import DangerousHtml from './DangerousHtml'

interface Props {
	name: string
	description: string
	createdAt: string
	rating: number
}

const ReviewCard = ({ name, description, createdAt, rating }: Props) => {
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
	const solidStars = Array.from({ length: rating }, (_, i) => i + 1)
	const emptyStars = Array.from({ length: 5 - rating }, (_, i) => i + 1)

	return (
		<div className={classes.join(' ')}>
			<div className='w-[120px] h-[120px] rounded-full absolute bg-primary top-0 right-[105px] transform -translate-y-1/2 flex-center text-title-xl text-white'>
				{initials}
			</div>
			<span className='grow overflow-hidden leading-relaxed text-ellipsis'>{DangerousHtml(description)}</span>
			<div className='text-tertiary-contrast-20 mt-[-5px]'>{createdAt}</div>
			<b>{name}</b>
			<div className='flex gap-[5px]'>
				{solidStars.map(star => (
					<FontAwesomeIcon key={star} icon={solidStar} />
				))}
				{emptyStars.map(star => (
					<FontAwesomeIcon key={star} icon={emptyStar} />
				))}
			</div>
		</div>
	)
}

export default ReviewCard
