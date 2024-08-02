'use client'
import { portfolioMock } from '@lib/settings'
import { Button, Card, Title } from '@components'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

const Portfolio = () => {
    // const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useServices()
    // const disableFetchNext = isLoading || isFetchingNextPage
    // const { pages = [] } = data || {}
    // const allPortfolios = pages.flatMap(page => page.data)

    //to do remove this when api is aplied
    const allPortfolios=portfolioMock
    const hasNextPage =false
    const disableFetchNext =false
    const fetchNextPage = () => { console.log('felo bo api gati') }

    const router = useRouter()

    const goToPortfolio = useCallback(
        (id: string) => {
            router.push(`/portfolio/${id}`)
        },
        [router]
    )

    return (
        <div className='w-full pt-[60px] flex flex-col items-center'>
            <Title>Portfolio</Title>
            <div className='w-fill min-h-full min-w-[310px] max-w-[1040px] mb-10 '>
                    <div>
                        <div className='w-full flex flex-row flex-wrap gap-4 justify-center'>
                            {allPortfolios.map((portfolio, index) => (
                                <Card
                                    key={portfolio?.id}
                                    {...{
                                        ...portfolio,
                                        onReadMoreClick: () => goToPortfolio(portfolio?.id),
                                        delay: index * 1000,
                                    }}
                                />
                            ))}
                        </div>
                        {hasNextPage && (
                            <div className='flex-center mt-[20px]'>
                              {/* to do remove this when api is ready */}
                                <Button disabled={disableFetchNext} onClick={() => fetchNextPage()}>
                                    Load More...
                                </Button>
                            </div>
                        )}
                        
                    </div>

            </div>
        </div>
    )
}

export default Portfolio
