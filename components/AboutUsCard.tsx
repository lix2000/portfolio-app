import { Carousel } from '@components'
import Button from './Button'

interface Props {
  title: String
  description: String
  images: Array<string>
  longDescription: string
  id: String
  delay?: number
}

const AboutUsCard = ({ title, description, images, delay }: Props) => {
  return (
    <div className='flex even:flex-row-reverse max-w-[1040px] min-w-[750px] h-[400px] border-solid overflow-hidden	rounded-md group shadow-lg hover:shadow-2xl transition-all duration-500 even:bg-gradient-to-r odd:bg-gradient-to-l from-white to-tertiary-10'>
      <div className='overflow-hidden w-full min-w-3/5 min-h-[396px] p-2 rounded-md'>
        <Carousel images={images} delay={delay} />
      </div>
      <div className='w-full h-full p-4 flex flex-col justify-between'>
        <div>
          <div className='text-title max-h-[72px] pb-4'>{title}</div>
          <div className='text-subtitle max-h-[220px]'>{description}</div>
        </div>
        <div className='flex justify-end '>
          <Button>Read More</Button>
        </div>
      </div>
    </div>
  )
}

export default AboutUsCard
