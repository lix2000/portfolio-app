import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getInitialsByName } from '@utils'

const descriptionMock =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum, nulla eget viverra dapibus, lectus orci tincidunt felis, vel vulputate dui magna at est. Vestibulum mollis non ligula in euismod. Aenean suscipit dapibus libero, eget fringilla augue. Cras at lacus in magna lobortis pulvinar. Quisque ex nulla, lobortis non velit in, luctus pharetra elit. Sed sit amet eros at nibh ornare euismod. Aliquam et magna lectus. Vivamus eu consectetur libero. Aliquam pretium aliquam volutpat. Quisque elementum varius vehicula. Ut maximus est a massa pellentesque, at mollis lorem condimentum. Nulla ex est, dictum non tortor sit amet, aliquet bibendum massa.'
const createdAtMock = '2022-01-01'
const ratingMock = 3

interface Props {
	name: string
	description: string
	createdAt: string
	rating: number
}

const ReviewCard = ({
	name = 'zef bega',
	description = descriptionMock,
	createdAt = createdAtMock,
	rating = ratingMock,
}) => {
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
		'to-tertiary-10',
		'relative',
		'px-[40px]',
		'pt-[80px]',
		'pb-[30px]',
	]
	const initials = getInitialsByName(name)
	const solidStars = Array.from({ length: rating }, (_, i) => i + 1)
	const emptyStars = Array.from({ length: 5 - rating }, (_, i) => i + 1)

	return (
		<div className={classes.join(' ')}>
			<div className='w-[120px] h-[120px] rounded-full absolute bg-primary top-0 right-[105px] transform -translate-y-1/2 flex-center text-title-xl text-white'>
				{initials}
			</div>
			<span className='grow overflow-hidden leading-relaxed text-ellipsis'>{description}</span>
			<div>{createdAt}</div>
			<div>{name}</div>
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
