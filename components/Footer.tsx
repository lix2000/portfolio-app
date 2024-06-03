'use client'
import { Title, Form, Input, Button, TextArea, CheckBox } from '@components'
import { footerBlackList, footerContactIcons } from '@lib/settings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContactType, ContactZodSchema } from '@types'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Footer = () => {
  const pathName = usePathname()
  const onSubmit = (data: ContactType) => {
    console.log(data)
  }

  if (footerBlackList.some(item => pathName.includes(item))) return null

  return (
    <>
      <Title>Contact Us</Title>
      <div className='w-full py-10 bg-tertiary-10 flex-center flex-col gap-6'>
        <div className='min-w-[350px] max-w-[650px] w-full p-6 flex-col flex-center bg-white rounded-lg shadow-card hover:shadow-2xl'>
          <div className='text-title my-2'>Contact Form</div>
          <div className='text-subtitle mb-3 text-center'>
            Please fill up this contact form with your project address and tell us a little bit more about
            what you're looking to do in your home.
          </div>
          <Form<ContactType>
            className='w-full flex flex-col gap-5'
            onSubmit={onSubmit}
            schema={ContactZodSchema}
          >
            <Input name='firstName' type='text' label='Your First Name' placeholder='First Name' />
            <Input name='lastName' type='text' label='Your Last Name' placeholder='Last Name' />
            <Input name='email' type='email' label='Your Email' placeholder='Email' />
            <Input name='phoneNumber' type='text' label='Your Phone Number' placeholder='Phone Number' />
            <TextArea name='tellUsMore' label='Tell Us About Your Request' placeholder='Tell Us More' />
            <CheckBox
              name='termsAndConditions'
              placeholder={
                <div>
                  I agree with any applicable Terms and Conditions of CSH Greenwich Advisory. This site is
                  protected by reCAPTCHA and the Google
                  <Link
                    rel='noopener noreferrer '
                    target='_blank'
                    className='underline'
                    href={'https://policies.google.com/privacy'}
                  >
                    Privacy Policy
                  </Link>{' '}
                  and
                  <Link
                    rel='noopener noreferrer '
                    target='_blank'
                    className='underline'
                    href={'https://policies.google.com/terms'}
                  >
                    Terms of Service
                  </Link>{' '}
                  apply.
                </div>
              }
            />
            <Button type='submit'>Send Message</Button>
          </Form>
          <div className='text-label mt-2'>Response expected within 24 hours</div>
        </div>
        <div className='flex-center gap-2'>
          {footerContactIcons.map(({ icon, href }) => (
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
      </div>
      <div className='w-full h-[80px] flex-center gap-4 bg-tertiary-20'>
        <Link
          rel='noopener noreferrer'
          target='_blank'
          href='https://cshgreenwichadvisory.com/merchant-policies'
        >
          Merchant Policies{' '}
        </Link>
        |
        <Link rel='noopener noreferrer' target='_blank' href='https://cshgreenwichadvisory.com/legal-notice'>
          Legal Notice{' '}
        </Link>
      </div>
    </>
  )
}

export default Footer
