type Props = {
	params: {
		id: string
	}
}

const AdminServicePreview = ({ params: { id } }: Props) => {
	return <div>Service Preview {id}</div>
}

export default AdminServicePreview
