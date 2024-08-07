'use client'
import { Button, ReviewCard, Title } from '@components'
import { addReviewHref, reviewMockData } from '@lib/settings'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Reviews = () => {
	const reviews = [...reviewMockData]
	const pathName = usePathname()

	return (
		<div className='w-full py-[60px] flex flex-col items-center gap-[20px]'>
			<Title>Reviews</Title>
			<div className='w-full flex flex-row flex-wrap gap-4 justify-center'>
				{reviews.map(review => (
					<ReviewCard key={review.id} {...review} />
				))}
			</div>
			<div className='w-full flex-center mt-[30px] gap-[30px]'>
				{pathName !== '/reviews' && (
					<Link rel='noopener noreferrer ' href={'/reviews'} scroll={false}>
						<Button>View All</Button>
					</Link>
				)}
				<Link rel='noopener noreferrer ' target='_blank' href={addReviewHref} scroll={false}>
					<Button>+ Add Review</Button>
				</Link>
			</div>
		</div>
	)
}

export default Reviews
