import { Button, ReviewCard, Title } from '@components'
import { addReviewHref, reviewMockData } from '@lib/settings'
import Link from 'next/link'

const Reviews = () => {
	return (
		<div className='w-full py-[60px] flex flex-col items-center gap-[20px]'>
			<Title>Reviews</Title>
			<div className='flex-center gap-[30px]'>
				{reviewMockData.map(review => (
					<ReviewCard key={review.id} {...review} />
				))}
			</div>
			<div className='w-full flex-center mt-[30px] gap-[30px]'>
				<Link rel='noopener noreferrer ' target='_blank' href={addReviewHref} scroll={false}>
					<Button>+ Add Review</Button>
				</Link>
			</div>
		</div>
	)
}

export default Reviews
