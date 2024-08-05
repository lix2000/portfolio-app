import { getAppointment } from '@actions'
import { AppointmentPreview } from '@app/admin/@rightSidebar/(.)appointments/[id]/_PageSections'

const AppointmentPreviewPage = async ({ params: { id } }: { params: { id: string } }) => {
	const appointment = await getAppointment(id)

	return <AppointmentPreview appointment={appointment} />
}

export default AppointmentPreviewPage
