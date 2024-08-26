import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import {
	faEnvelope,
	faRankingStar,
	faCouch,
	faPhone,
	faLocationDot,
	faGauge,
	faCalendarCheck,
	faListCheck,
	faBriefcase,
	faNewspaper,
	faUserPen,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { AdminSidebarItem } from '@types'

export const navbarBlackList = ['/login', '/admin']

export const footerBlackList = ['/login', '/admin']

export const DROPZONE_ACCEPT_TYPES = { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }

export const navbarTabs = [
	{
		name: 'Home',
		path: '/',
	},
	{
		name: 'Services',
		path: '/services',
	},
	{
		name: 'Portfolio',
		path: '/portfolio',
	},
	{
		name: 'The Designer',
		path: '/the-designer',
	},
	{
		name: 'Articles',
		path: '/articles',
	},
	{
		name: 'Contact Us',
		path: '/contact-us',
	},
]

export const navbarContactIcons = [
	{
		icon: faFacebook,
		href: 'https://www.facebook.com/share.php?u=https%3A//cshgreenwichadvisory.com&title=CSH%20Greenwich%20Advisory',
	},
	{
		icon: faTwitter,
		href: 'https://twitter.com/intent/tweet?text=CSH%20Greenwich%20Advisory&url=https%3A//cshgreenwichadvisory.com',
	},
	{
		icon: faEnvelope,
		href: 'mailto:?body=https%3A//cshgreenwichadvisory.com&subject=CSH%20Greenwich%20Advisory',
	},
]

export const footerContactIcons = [
	{
		icon: faPhone,
		href: 'tel:+1%20203-900-4336',
	},
	{
		icon: faLocationDot,
		href: 'https://www.google.com/maps/place/Greenwich,+CT,+USA/@41.0519461,-73.8041594,11z/data=!3m1!4b1!4m6!3m5!1s0x89c298110f4c2e97:0x831ae27600430e2!8m2!3d41.0262417!4d-73.6281964!16zL20vMHJkNmI?entry=ttu',
	},
	{
		icon: faInstagram,
		href: 'https://www.instagram.com/csh_greenwich_advisory',
	},
]

export const serviceTypes = [
	{
		value: 'Full Service',
		label: 'Full Service',
	},
	{
		value: 'Design Day',
		label: 'Design Day',
	},

	{
		value: 'Bathroom Renovation Design',
		label: 'Bathroom Renovation Design',
	},
	{
		value: 'A La Carte Services',
		label: 'A La Carte Services',
	},
	{
		value: '90 Min Design Consultation',
		label: '90 Min Design Consultation',
	},
	{
		value: 'Pre-sale Refresh Session',
		label: 'Pre-sale Refresh Session',
	},
]

export const adminSidebarItems: AdminSidebarItem[] = [
	{
		name: 'Dashboard',
		path: '/admin',
		icon: faGauge,
	},
	{
		name: 'Requests',
		path: '/admin/requests',
		icon: faCalendarCheck,
	},
	{
		name: 'Services',
		path: '/admin/services',
		icon: faListCheck,
	},
	{
		name: 'Portfolio',
		path: '/admin/portfolio',
		icon: faBriefcase,
	},
	{
		name: 'Articles',
		path: '/admin/articles',
		icon: faNewspaper,
	},
	{
		name: 'The Designer',
		path: '/admin/the-designer',
		icon: faUserPen,
	},
	{
		name: 'About Us',
		path: '/admin/about-us',
		icon: faInfoCircle,
	},
	{
		name: 'Testimonials',
		path: '/admin/testimonials',
		icon: faStar,
	},
]

export const CLOUDINARY_FOLDERS = {
	SERVICES: 'services',
	PORTFOLIO: 'portfolio',
	REQUESTS: 'requests',
	ABOUT_US: 'about-us',
	ARTICLES: 'articles',
	DESIGNER: 'designer',
}

//todo: we have to delete it after connecting to BE
export const homepageReasonIcons = [
	{
		id: '1',
		image: '/images/lightbulb.png',
		title: 'Attention to Detail',
		description:
			'Every single project that we take on is characterized by a painstaking attention to detail, which ultimately results in design solutions that find a balance between beauty and usefulness.',
	},
	{
		id: '2',
		image: '/images/star.png',
		title: 'Personalized Design Concepts',
		description:
			'Our interior designer collaborates closely with clients to generate individualized design concepts that are in line with the styles and preferences that are unique to each individual client.',
	},
	{
		id: '3',
		image: '/images/procurement.jpg',
		title: 'Procurement',
		description:
			'We handle the intricate process of procuring building materials, furniture, and accessories for your project. We can provide a white-glove delivery service for those who prefer added convenience through our receiver partner.<br/>You can trust that the right materials and furnishings will be ordered and delivered with precision.',
	},
	{
		id: '4',
		image: '/images/award.png',
		title: 'Expert Vendor Selection',
		description:
			'In order to ensure that your renovation project is of the highest possible quality and reliability, we take great care in selecting both the vendors we work with and the materials we suggest for each project.',
	},
]

export const workingHr = [
	{
		id: '1',
		day: 'Sun',
	},
	{
		id: '2',
		day: 'Mon',
		from: '09:00 AM',
		to: '05:00 PM',
	},
	{
		id: '3',
		day: 'Tue',
		from: '09:00 AM',
		to: '05:00 PM',
	},
	{
		id: '4',
		day: 'Wed',
		from: '09:00 AM',
		to: '05:00 PM',
	},
	{
		id: '5',
		day: 'Thu',
		from: '09:00 AM',
		to: '05:00 PM',
	},
	{
		id: '6',
		day: 'Fri',
		from: '09:00 AM',
		to: '05:00 PM',
	},
	{
		id: '7',
		day: 'Sat',
	},
]

export const addReviewHref =
	'https://www.google.com/search?hl=en-AL&gl=al&q=CSH+Greenwich+Advisory+%7C+Interior+Design&ludocid=10028635039505282996&lsig=AB86z5V_YdSpv7RLGNd1UOern33k#lrd=0xd01de75b6b6defd:0x8b2cde6f37bf77b4,3'
