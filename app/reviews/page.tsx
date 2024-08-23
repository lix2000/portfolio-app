'use client'
import { Button, Loader, ReviewCard, Title } from '@components'
import { useTestimonials } from '@hooks'
import { addReviewHref } from '@lib/settings'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import InfiniteScroll from 'react-infinite-scroller'

const limit = 4

const Reviews = () => {
	const { data, fetchNextPage, hasNextPage } = useTestimonials({ limit })
	const pathName = usePathname()
	const isHomepage = pathName !== '/reviews'
	const testimonials = data?.pages.flatMap(page => page.data) ?? []

	return (
		<div className='w-full py-[60px] flex flex-col items-center gap-[20px]'>
			<Title>Testimonials</Title>
			<InfiniteScroll
				loadMore={() => fetchNextPage()}
				useWindow={false}
				hasMore={hasNextPage && !isHomepage}
				loader={<Loader key='table-loader' size='3x' />}
			>
				<div className='w-full flex flex-row flex-wrap gap-4 justify-center'>
					{testimonials.slice(0, isHomepage ? limit : testimonials.length).map(testimonial => (
						<ReviewCard key={testimonial._id as string} testimonial={testimonial} />
					))}
				</div>
			</InfiniteScroll>
			<div className='w-full flex-center mt-[30px] gap-[30px]'>
				{isHomepage && (
					<Link rel='noopener noreferrer ' href={'/reviews'}>
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
