import { getAppointments } from '@actions'
import { QueryPrefetcher } from '@components'
import { ServerAppointmentType } from '@types'
import { AppointmentsList } from './_PageSections'

const AdminAppointments = () => (
	<QueryPrefetcher<ServerAppointmentType> queryKey={['appointments']} queryFn={getAppointments}>
		<AppointmentsList />
	</QueryPrefetcher>
)

export default AdminAppointments
