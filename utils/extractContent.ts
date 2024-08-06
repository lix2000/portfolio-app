'use client'
export const extractContent = (s: string) => {
	if (typeof window === 'undefined') return
	var span = document.createElement('span')
	span.innerHTML = s
	return span.textContent || span.innerText
}
