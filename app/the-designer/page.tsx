import { Title } from '@components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  theDesignerContactIcons, theDesignerMock } from '@lib/settings'
import Link from 'next/link'

const TheDesigner = () => {
	const { name, description, profile } = theDesignerMock
	return (
    <div className='w-full pt-[60px] flex flex-col items-center'>
      <Title>Designer & Founder</Title>
      <div className='w-fill min-h-full flex-center gap-[50px] w-full py-[30px]'>
      <div className='max-w-[300px] min-w-[300px] max-h-[300px] min-h-[300px] bg-red overflow-hidden rounded-full'>
      <img
				className='rounded-full hover:scale-110 transition-all duration-500'
				src={profile}
				height={300}
				width={300}
				alt='logo'
        />
        </div>
      <div className='w-full flex flex-col gap-[30px] max-w-[700px]'>
        <div className='text-title text-tertiary-contrast-20'>{name}</div>
        <div className='flex gap-2'>
					{theDesignerContactIcons.map(({ icon, href }) => (
						<Link
							rel='noopener noreferrer '
							target='_blank'
							href={href}
							className='rounded-full transition-all p-2 duration-500 flex-center bg-primary hover:bg-tertiary hover:text-primary border-2 border-primary text-primary-contrast'
						>
							<FontAwesomeIcon style={{ width: '20px', height: '20px' }} icon={icon} />
						</Link>
					))}
				</div>
        <div>{description}</div>
      </div>
      </div>
		</div>
	)
}

export default TheDesigner
