import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { workingHr } from '@lib/settings'
import { Title } from '@components'

const Contact = () => {
	return (
		<div className='w-full pt-[60px] flex flex-col items-center'>
			<Title>Working Hours</Title>
			<div className='flex overflow-hidden rounded-md shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-l from-white to-tertiary-10 px-[20px] py-[30px] my-[100px]'>
				{workingHr.map(({ id, day, from, to }) => (
					<div className='w-[80px] h-[130px] flex flex-col items-center gap-[0px]' key={id}>
						<FontAwesomeIcon
							icon={faClock}
							className='w-[20px] h-[20px] mb-[10px]'
							style={{ color: from ? 'black' : '#cf8000' }}
						/>
						<div className='text-center mb-[10px]'>{day}</div>
						{from || to ? (
							<>
								<div className='text-center'> {from} </div>
								<div className='text-center'> -</div>
								<div className='text-center'> {to} </div>
							</>
						) : (
							<div className='text-center'>Closed</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Contact
