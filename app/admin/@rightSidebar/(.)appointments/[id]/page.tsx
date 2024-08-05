import { getAppointment } from '@actions'
import { AppointmentPreview } from './_PageSections'
import { SidebarRight } from '@components'

const AppointmentPreviewInterceptor = async ({ params: { id } }: { params: { id: string } }) => {
	const appointment = await getAppointment(id)

	return (
		<SidebarRight>
			<AppointmentPreview appointment={appointment} />
		</SidebarRight>
	)
}

export default AppointmentPreviewInterceptor
