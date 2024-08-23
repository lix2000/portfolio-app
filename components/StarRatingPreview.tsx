import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'

type Props = {
	rating: number
	className?: string
}

const StarRatingPreview = ({ rating, className }: Props) => (
	<div className={`flex gap-[5px] text-primary ${className}`}>
		{[...Array(5)].map((_, i) => (
			<FontAwesomeIcon key={i} icon={i < rating ? solidStar : emptyStar} />
		))}
	</div>
)

export default StarRatingPreview
