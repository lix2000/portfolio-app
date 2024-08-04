import nodemailer from 'nodemailer'
import * as handlebars from 'handlebars'

export const transporter = nodemailer.createTransport({
	service: 'Outlook365', // You can also use 'hotmail' or 'live' if needed
	auth: {
		user: 'xprienti@outlook.com', // your Outlook email address
		pass: 'Moseharro1', // your Outlook email password
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
