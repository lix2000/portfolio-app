import nodemailer from 'nodemailer'
import * as handlebars from 'handlebars'

export const transporter = nodemailer.createTransport({
	service: 'Outlook365',
	auth: {
		user: process.env.OUTLOOK_EMAIL_ADDRESS,
		pass: process.env.OUTLOOK_EMAIL_PASSWORD,
	},
	tls: {
		ciphers: 'SSLv3',
	},
})

export const compileTemplate = (templateHtml: string, data: Record<string, any>) => {
	const template = handlebars.compile(templateHtml)
	const html = template(data)

	return html
}
