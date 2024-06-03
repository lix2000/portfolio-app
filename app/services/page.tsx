'use client'
import { Button, Card, Title } from '@components'
import { addonsMock, servicesMock } from '@lib/settings'
import { useState } from 'react'

const Services = () => {
  const [showServices, setShowServices] = useState(true)
  const services = servicesMock
  const addons = addonsMock

  return (
    <div className='w-full h-full pt-[60px] flex flex-col items-center'>
      <Title>Services</Title>
      <div className='w-fill h-fill min-w-[310px] max-w-[1040px] mb-10 '>
        {showServices && (
          <div>
            <div className='flex justify-between py-4'>
              <div className='text-title grow truncate'>Interior Design</div>
              <Button onClick={() => setShowServices(prev => !prev)}>Additional Services</Button>
            </div>
            <div className='w-full flex flex-row flex-wrap gap-4 justify-center'>
              {services.map((service, index) => (
                <Card key={index} {...{ ...service, delay: index * 1000 }} />
              ))}
            </div>
          </div>
        )}
        {!showServices && (
          <div>
            <div className='flex justify-between py-4'>
              <Button onClick={() => setShowServices(prev => !prev)}>Interior Design</Button>
              <div className='text-title grow truncate text-end'>Additional Services</div>
            </div>
            <div className='w-full flex flex-row flex-wrap gap-4 justify-center'>
              {services.map((service, index) => (
                <Card key={index} {...{ ...service, delay: index * 1000 }} />
              ))}
            </div>
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
