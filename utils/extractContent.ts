import { htmlToText } from 'html-to-text'

export const extractContent = (s: string) => htmlToText(s)
