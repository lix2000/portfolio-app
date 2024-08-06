import { JSDOM } from 'jsdom'

export const extractContent = (s: string) => {
	const dom = new JSDOM(s)
	return dom.window.document.body.textContent || ''
}
