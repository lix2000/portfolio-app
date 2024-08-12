import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faRankingStar, faCouch, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faLightbulb, faStar } from '@fortawesome/free-regular-svg-icons'

export const navbarBlackList = ['/login', '/admin']

export const footerBlackList = ['/login', '/admin']

export const DROPZONE_ACCEPT_TYPES = { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }

export const navbarTabs = [
	{
		name: 'Home',
		link: '/',
	},
	{
		name: 'Services',
		link: '/services',
	},
	{
		name: 'Portfolio',
		link: '/portfolio',
	},
	{
		name: 'The Designer',
		link: '/the-designer',
	},
	{
		name: 'Articles',
		link: '/articles',
	},
	{
		name: 'Contact Us',
		link: '/contact-us',
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

export const theDesignerContactIcons = [
	{
		icon: faEnvelope,
		href: 'mailto:?body=https%3A//cshgreenwichadvisory.com&subject=CSH%20Greenwich%20Advisory',
	},
	{
		icon: faPhone,
		href: 'tel:+1%20203-900-4336',
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

export const CLOUDINARY_FOLDERS = {
	SERVICES: 'services',
	PORTFOLIO: 'portfolio',
	REQUESTS: 'requests',
	ABOUT_US: 'about-us',
	ARTICLES: 'articles',
}

//todo: we have to delete it after connecting to BE
export const homepageReasonIcons = [
	{
		id: '1',
		icon: faLightbulb,
		title: 'Attention to Detail',
		description:
			'Every single project that we take on is characterized by a painstaking attention to detail, which ultimately results in design solutions that find a balance between beauty and usefulness.',
	},
	{
		id: '2',
		icon: faStar,
		title: 'Personalized Design Concepts',
		description:
			'Our interior designer collaborates closely with clients to generate individualized design concepts that are in line with the styles and preferences that are unique to each individual client.',
	},
	{
		id: '3',
		icon: faCouch,
		title: 'Procurement',
		description:
			'We handle the intricate process of procuring building materials, furniture, and accessories for your project. We can provide a white-glove delivery service for those who prefer added convenience through our receiver partner.<br/>You can trust that the right materials and furnishings will be ordered and delivered with precision.',
	},
	{
		id: '4',
		icon: faRankingStar,
		title: 'Expert Vendor Selection',
		description:
			'In order to ensure that your renovation project is of the highest possible quality and reliability, we take great care in selecting both the vendors we work with and the materials we suggest for each project.',
	},
]

export const addonsMock = [
	'✔️ White Glove Delivery',
	'✔️ Installation Services',
	'✔️ Contractor Bid Management',
	'✔️ Project Management',
	'✔️ Professional Organizer',
	'✔️ Procurement Service',
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

export const theDesignerMock = {
	name: 'Charlotte Sardet',
	description:
		'Hi there! My name is Charlotte Sardet, and I am the lead designer and founder of CSH Greenwich Advisory.<br/>I have always had a lifelong interest in architecture and design.<br/>After having a successful career in real estate in NYC, I decided to follow my passion for design and stay closer to home in Greenwich, CT.<br/>Growing up in the South of France but spending my professional life in NYC, I developed a taste for minimalism while keeping my French roots. That being said, I am versatile and like to listen and understand my clients needs and desires before starting any project. It is important for me to offer a design that fits your style and personality.<br/>I also believe that every place has a soul and will always try to respect the history of the home and incorporate it in the design.',
	profile: 'https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg',
}

export const reviewMockData = [
	{
		id: 1,
		name: 'Ilir Laska',
		description:
			'Working with Charlotte is such a bless. Charlotte is very knowledgeable and easy to work with. She helped us narrow down beautiful choices and provide advices with something that was cost effective.',
		createdAt: 'Aug 6, 2024',
		rating: 5,
	},
	{
		id: 2,
		name: 'Molly',
		description:
			'We loved working with Charlotte! She did an excellent job guiding us through decorating our home and updating the interior spaces - everything from paint, to hardware, to appliances, to furniture. We highly recommend her if you are looking for a highly organized, inspired, and fun designer!',
		createdAt: 'Jul 16, 2024',
		rating: 5,
	},
]

export const addReviewHref =
	'https://www.google.com/search?hl=en-AL&gl=al&q=CSH+Greenwich+Advisory+%7C+Interior+Design&ludocid=10028635039505282996&lsig=AB86z5V_YdSpv7RLGNd1UOern33k#lrd=0xd01de75b6b6defd:0x8b2cde6f37bf77b4,3'
