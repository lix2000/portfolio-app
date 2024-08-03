'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Children, PropsWithChildren, cloneElement, isValidElement, useCallback, useMemo } from 'react'
import { DefaultValues, FormProvider, UseFormHandleSubmit, useForm } from 'react-hook-form'
import { Loader } from '@components'

type DefaultFormValues = Record<string, any>

interface Props<FormValues extends DefaultFormValues> {
	onSubmit: Parameters<UseFormHandleSubmit<FormValues>>[0]
	schema: Parameters<typeof zodResolver>[0]
	className?: string
	defaultValues?: DefaultValues<FormValues>
}

const Form = <FormValues extends DefaultFormValues>({
	onSubmit,
	schema,
	className = '',
	defaultValues,
	children,
}: PropsWithChildren<Props<FormValues>>) => {
	const formMethods = useForm<FormValues>({
		resolver: zodResolver(schema),
		...(defaultValues && { defaultValues }),
	})
	const {
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

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={handleSubmit(onSubmit)} className={className}>
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
