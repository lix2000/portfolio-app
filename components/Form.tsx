'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Children, PropsWithChildren, cloneElement, isValidElement, useCallback, useMemo } from 'react'
import {
	DefaultValues,
	FormProvider,
	Path,
	UseFormHandleSubmit,
	UseFormReturn,
	useForm,
} from 'react-hook-form'
import { Loader } from '@components'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

type DefaultFormValues = Record<string, any>

interface Props<FormValues extends DefaultFormValues> {
	onSubmit: Parameters<UseFormHandleSubmit<FormValues>>[0]
	schema: Parameters<typeof zodResolver>[0]
	className?: string
	defaultValues?: DefaultValues<FormValues>
	recaptchaAction?: string
	resetAfterSubmit?: boolean
}

const Form = <FormValues extends DefaultFormValues>({
	onSubmit,
	schema,
	className = '',
	defaultValues,
	recaptchaAction,
	resetAfterSubmit,
	children,
}: PropsWithChildren<Props<FormValues>>) => {
	const { executeRecaptcha } = useGoogleReCaptcha()
	const formMethods = useForm<FormValues>({
		resolver: zodResolver(schema),
		...(defaultValues && { defaultValues }),
	})
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = formMethods

	const registerChildren = useCallback(
		(children: React.ReactNode): any => {
			return Children.map(children, child => {
				const element = (child as React.ReactElement) || {}
				const { type, name, disabled, children: childChildren } = element.props || {}

				if (name) {
					return cloneElement(element, {
						...register(name),
						error: errors[name]?.message,
						children: registerChildren(childChildren),
					})
				} else if (type === 'submit') {
					return cloneElement(element, { disabled: disabled || isSubmitting })
				} else if (!!childChildren?.length) {
					return cloneElement(element, { children: registerChildren(childChildren) })
				} else {
					return typeof element === 'string' || isValidElement(element) ? element : null
				}
			})
		},
		[errors, isSubmitting, register]
	)

	const registeredChildren = useMemo(() => registerChildren(children), [registerChildren, children])

	const executeRecaptchaAndSubmit = useCallback(
		async (data: FormValues) => {
			if (!recaptchaAction || !executeRecaptcha) {
				const response = await onSubmit(data)
				if (resetAfterSubmit) resetFormByTouchedFields(formMethods)

				return response
			}
			const token = await executeRecaptcha(recaptchaAction)
			if (!token) return
			const formData = {
				...data,
				recaptchaToken: token,
			}
			const response = await onSubmit(formData)
			if (resetAfterSubmit) resetFormByTouchedFields(formMethods)

			return response
		},
		[executeRecaptcha, onSubmit, reset, recaptchaAction, resetAfterSubmit]
	)

	const classNames = ['relative', className]

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={handleSubmit(executeRecaptchaAndSubmit)} className={classNames.join(' ')}>
				{isSubmitting && (
					<div
						className='absolute top-0 left-0 w-full h-full  bg-opacity-50 flex items-center justify-center z-50'
						style={{ backdropFilter: 'blur(2px)' }}
					>
						<Loader isLoading />
					</div>
				)}
				{registeredChildren}
			</form>
		</FormProvider>
	)
}

export default Form

export const resetFormByTouchedFields = <ObjType extends object>(form: UseFormReturn<ObjType>) => {
	const fields = Object.keys(form.getValues())

	fields.forEach(field => form.resetField(field as Path<ObjType>))
}
