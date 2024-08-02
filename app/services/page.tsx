'use client'
import { addonsMock } from '@lib/settings'
import { Button, Card, Title } from '@components'
import { useServices } from '@hooks'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

const Services = () => {
	const router = useRouter()
	const [showServices, setShowServices] = useState(true)

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
		<div className='w-full pt-[60px] flex flex-col items-center'>
			<Title>Services</Title>
			<div className='w-fill min-h-full min-w-[310px] max-w-[1040px] mb-10 '>
				{showServices && (
					<div>
						<div className='flex justify-between py-4'>
							<div className='text-title grow truncate'>Interior Design</div>
							<Button onClick={() => setShowServices(prev => !prev)}>Additional Services</Button>
						</div>
						<div className='w-full flex flex-row flex-wrap gap-4 justify-center'>
							{allServices.map((service, index) => (
								<Card
									key={service?._id}
									{...{
										...service,
										onReadMoreClick: () => goToService(service?._id),
										delay: index * 1000,
									}}
								/>
							))}
						</div>
						{servicesHasNextPage && (
							<div className='flex-center mt-[20px]'>
								<Button disabled={servicesDisableFetchNext} onClick={() => servicesFetchNextPage()}>
									Load More...
								</Button>
							</div>
						)}
					</div>
				)}
				{!showServices && (
					<div>
						<div className='flex justify-between py-4'>
							<Button onClick={() => setShowServices(prev => !prev)}>Interior Design</Button>
							<div className='text-title grow truncate text-end'>Additional Services</div>
						</div>
						<div className='w-full flex flex-row flex-wrap gap-4 justify-center'>
							{additionalServices.map((service, index) => (
								<Card
									key={service?._id}
									{...{
										...service,
										onReadMoreClick: () => goToService(service?._id),
										delay: index * 1000,
									}}
								/>
							))}
						</div>
						{additionalServicesHasNextPage && (
							<div className='flex-center mt-[20px]'>
								<Button
									disabled={additionalServicesDisableFetchNext}
									onClick={() => additionalServicesFetchNextPage()}
								>
									Load More...
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
			<div className='w-fill h-fill min-w-[310px] max-w-[1040px] mb-10'>
				<div className='text-title text-center text-ellipsis overflow-hidden'>
					Add-Ons (More details in Additional Services)
				</div>
				<div className='w-full flex flex-row flex-wrap gap-4 justify-center mt-4'>
					{addons.map((addon, index) => (
						<div
							className='w-[335px] bg-tertiary text-tertiary-contrast hover:bg-tertiary-tone-450 text-center px-6 py-2 border rounded-2xl transition-colors focus:outline-none select-none shadow-lg hover:bg-red'
							key={index}
						>
							{addon}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Services
