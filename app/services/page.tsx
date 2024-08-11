'use client'
import { addonsMock } from '@lib/settings'
import { Slider, Title, CardGrid, Grid } from '@components'
import { useIsMobile, useServices } from '@hooks'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

const Services = () => {
	const router = useRouter()
	const isMobile = useIsMobile()
	const {
		data: servicesData,
		fetchNextPage: servicesFetchNextPage,
		hasNextPage: servicesHasNextPage,
		isLoading: servicesIsLoading,
		isFetchingNextPage: servicesIsFetchingNextPage,
	} = useServices({ filter: { isAdditionalService: false } })
	const servicesDisableFetchNext = servicesIsLoading || servicesIsFetchingNextPage
	const { pages: servicePages = [] } = servicesData || {}
	const allServices = servicePages.flatMap(page => page.data)

	const {
		data: additionalServicesData,
		fetchNextPage: additionalServicesFetchNextPage,
		hasNextPage: additionalServicesHasNextPage,
		isLoading: additionalServicesIsLoading,
		isFetchingNextPage: additionalServicesIsFetchingNextPage,
	} = useServices({ filter: { isAdditionalService: true } })
	const additionalServicesDisableFetchNext =
		additionalServicesIsLoading || additionalServicesIsFetchingNextPage
	const { pages: additionalServicePages = [] } = additionalServicesData || {}
	const additionalServices = additionalServicePages.flatMap(page => page.data)

	const addons = addonsMock
	const goToService = useCallback(
		(id: string) => {
			router.push(`/services/${id}`)
		},
		[router]
	)

	return (
		<div className='w-full h-fit pt-[60px] flex flex-col items-center'>
			<Title>Services</Title>
			<div className='w-full h-fit min-w-[310px] max-w-[1040px] pt-[30px] px-[20px]'>
				<Slider
					className={`h-full ${useIsMobile}`}
					components={[
						{
							element: (
								<CardGrid
									{...{
										data: allServices,
										onClick: goToService,
										fetchNextPage: servicesFetchNextPage,
										hasNextPage: servicesHasNextPage,
										disabledFetchNextPage: servicesDisableFetchNext,
										isLoading: servicesIsLoading,
									}}
								/>
							),
							name: 'Interior Design',
						},
						{
							element: (
								<CardGrid
									{...{
										data: additionalServices,
										onClick: goToService,
										fetchNextPage: additionalServicesFetchNextPage,
										hasNextPage: additionalServicesHasNextPage,
										disabledFetchNextPage: additionalServicesDisableFetchNext,
										isLoading: additionalServicesIsLoading,
									}}
								/>
							),
							name: 'Additional Services',
						},
					]}
				/>
			</div>
			<div className='w-fill h-fill min-w-[310px] max-w-[1040px] mb-10'>
				<div className='text-title text-center text-ellipsis overflow-hidden'>
					Add-Ons (More details in Additional Services)
				</div>
				<Grid>
					{addons.map((addon, index) => (
						<div
							className='w-[335px] bg-tertiary text-tertiary-contrast hover:bg-tertiary-tone-450 text-center px-6 py-2 border rounded-2xl transition-colors focus:outline-none select-none shadow-lg hover:bg-red'
							key={index}
						>
							{addon}
						</div>
					))}
				</Grid>
			</div>
		</div>
	)
}

export default Services
