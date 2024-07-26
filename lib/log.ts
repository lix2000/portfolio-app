import pc from 'picocolors'

export const log = {
	info: (message: string, ...args: any[]) =>
		console.log(`${pc.bgCyan(pc.black(`~~~> ${message}`))} `, ...args),
	success: (message: string, ...args: any[]) =>
		console.log(`${pc.bgGreen(pc.black(`~~~> ${message}`))} `, ...args),
	warn: (message: string, ...args: any[]) =>
		console.log(`${pc.bgYellow(pc.black(`~~~> ${message}`))} `, ...args),
	error: (message: string, ...args: any[]) =>
		console.log(`${pc.bgRed(pc.black(`~~~> ${message}`))} `, ...args),
}
