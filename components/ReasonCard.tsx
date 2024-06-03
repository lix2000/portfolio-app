import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  title: String
  description: String
  icon: any
  id: String
}

const ReasonCard = ({ title, description, icon }: Props) => {
  return (
    <div className='flex max-w-[1040px] min-w-[650px] h-fit border-solid overflow-hidden rounded-md group shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-l from-white to-tertiary-10 p-6'>
      <div className='overflow-hidden w-1/5 min-w-[150px] min-h-[152px] pr-6 rounded-md flex-center'>
        <FontAwesomeIcon className='text-primary' size='5x' icon={icon} />
      </div>
      <div className='w-full h-full flex flex-col justify-between'>
        <div>
          <div className='text-title max-h-[72px] pb-4'>{title}</div>
          <div className='text-subtitle min-h-[100px]'>{description}</div>
        </div>
      </div>
    </div>
  )
}

export default ReasonCard
