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

export const CLOUDINARY_FOLDERS = {
	SERVICES: 'services',
}

// we have to delete it after connecting to BE
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
			'We handle the intricate process of procuring building materials, furniture, and accessories for your project. We can provide a white-glove delivery service for those who prefer added convenience through our receiver partner.\nYou can trust that the right materials and furnishings will be ordered and delivered with precision.',
	},
	{
		id: '4',
		icon: faRankingStar,
		title: 'Expert Vendor Selection',
		description:
			'In order to ensure that your renovation project is of the highest possible quality and reliability, we take great care in selecting both the vendors we work with and the materials we suggest for each project.',
	},
]

// we have to delete it after connecting to BE
export const aboutUsMock = [
	{
		title: 'Where Design Meets Functionality',
		description:
			'Located in Greenwich, CT, CSH Greenwich Advisory serves clients in-person in Fairfield County, CT, or nationally via online services. We take pride in our competitive pricing, realistic renderings, and the ability to pass on trade discounts to our valued clients.',
		longDescription:
			"Located in Greenwich, CT, CSH Greenwich Advisory serves clients in-person in Fairfield County, CT, or nationally via online services. We take pride in our competitive pricing, realistic renderings, and the ability to pass on trade discounts to our valued clients.\nWith an international background, we're passionate about respecting the history of your home while delivering designs that marry French elegance with minimalism.\nWe offer a wide array of services to transform your living spaces. From comprehensive interior design packages to a la carte services, we cater to your unique needs. We will work closely with you to create stunning interiors that reflect your personality and lifestyle.\nWhether you're envisioning a complete home renovation, a single-room makeover, or simply seeking design advice, we're here to make it happen.\nOur services include in-home or virtual brainstorming sessions, space planning with meticulously crafted floor plans, paint color palette selection, and the curation of furniture and accessories to elevate your space. We even offer pre-purchase renovation ideas with realistic renderings, ensuring you make informed decisions.\nReady to embark on your design journey with us? Schedule a consultation today calling or texting us at (203) 900-4336, and let's bring your vision to life.",
		images: [
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699768118/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Molly---Jeff--1st-flr--Kitchen-and-Dining-Room-116--1-jpeg.jpg',
		],
	},
	{
		title: 'Tailored Solutions for Your Design Needs',
		description:
			"At CSH Greenwich Advisory, we're your partners in creating functional and beautiful spaces. Our commitment to excellence extends to a range of services and packages designed to meet your specific needs.",
		longDescription:
			"At CSH Greenwich Advisory, we're your partners in creating functional and beautiful spaces. Our commitment to excellence extends to a range of services and packages designed to meet your specific needs.\nExplore our additional services, including contractor bid management, project management, and installation services. Whether you need assistance with contractor selection, project oversight, material sourcing, or seamless installations, our expert team has you covered.\nWhichever service or package you choose, you'll benefit from our expertise and dedication to making your vision a reality. Join us in creating spaces that reflect your unique style and personality. Your dream home is just a click away. Schedule a consultation, and let's begin your design journey today!",
		images: [
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700600975/business/15d3f5fa-ff18-43ce-a1b0-8193ad7b5e07.jpg',
		],
	},
	{
		title: "Maximizing Your Home's Value: Comprehensive Selling Solutions",
		description:
			"At CSH Greenwich Advisory, we understand that selling your home is about more than just a transaction; it's about realizing the full potential of your property. That's why we've established strategic partnerships with leading real estate brokers to ensure your home sells for the highest possible price",
		longDescription:
			"At CSH Greenwich Advisory, we understand that selling your home is about more than just a transaction; it's about realizing the full potential of your property. That's why we've established strategic partnerships with leading real estate brokers to ensure your home sells for the highest possible price. Our unique approach includes advising on targeted renovations and enhancements that significantly increase buyer appeal.\nWe don't just stop at renovations. We also collaborate with professional organizers who specialize in decluttering and optimizing your space, making your home more attractive and inviting to potential buyers. This comprehensive approach ensures your home stands out in the market, attracting a wider pool of buyers and securing the best possible deal. Trust CSH Greenwich Advisory to be your partner in maximizing your home's value and appeal.",
		images: [
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1681392279/service_images/shutterstock_1712828755.jpg',
		],
	},
]

export const servicesMock = [
	{
		id: '1',
		title: 'Full Service',
		description:
			'Looking for a full transformation of one room or the entire house? We start with an initial consultation to understand t...',
		longDescription:
			'Looking for a full transformation of one room or the entire house?\nWe start with an initial consultation to understand the extend of the project. You will then receive a customized proposal based on your needs.\nIn-Home Visit with Precise Measurements: We will visit your home to take precise measurements, ensuring a customized design.\nComprehensive Design Presentation: Receive a detailed design presentation, featuring a thoughtfully planned floor plan, a mood board and realistic renderings.\nCurated Shopping List: We curate a shopping list including furniture pieces and accessories.\nProcurement Service: We handle the intricate process of procuring building materials, furniture, and accessories for your project. You can trust that the right materials and furnishings will be ordered with accuracy and on time. We can provide a white-glove delivery service for added convenience through our receiver partner.\nDesigner-Managed Installation Day: Leave it to us to manage the entire installation process, ensuring that your design vision comes to life without any stress or hassle.\nAccess to Vetted Local Trade List: Gain access to our trusted list of local tradespeople to ensure your vision is brought to life and that every detail of your design is flawlessly executed.\nOngoing Support: We maintain open lines of communication ensuring your complete satisfaction with your transformed space.\nInitial Consultation is $150 for up to 90 Min. The project is billed hourly at $85/hour with a number of hours estimated on our proposal. ',
		price: 2500,
		priceDescription: 'Starting Price',
		images: [
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700601339/business/d1d936fd-05bf-45e5-adfe-84370dd2aacb.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700921765/business/cf47e7ce-2c12-4d1c-b2a1-c17afa065c17.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700921842/business/9c2ad124-9bca-4fb7-95d5-1f3677c3e3e3.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700921766/business/11d6f71a-df29-4689-96a2-3e0bc723bc5d.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700600975/business/6aa1c19d-4b0a-495f-8ebc-d9ca620043f5.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700600978/business/3ac3a32c-3b1e-403b-a0fa-5b6c717fb622.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699768115/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Molly---Jeff---Master-Suite-Unnamed-Space-44jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699768115/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Molly---Jeff---Master-Suite-Unnamed-Space-44jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700919319/business/5d0f2f3f-5be0-4730-ab72-509392dc53d4.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700921459/business/0f723d47-d3dd-442f-a45f-12980050611d.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699812404/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Baby-Room--3-jpeg.jpg',
		],
	},
	{
		id: '2',
		title: 'Design Day',
		description:
			"You'd be surprised at how much we can get done in one day!  This service starts with a 1 hour video call to prepare...",
		longDescription:
			"You'd be surprised at how much we can get done in one day! \nThis service starts with a 1 hour video call to prepare the in-home visit. Then you will have 6 hours of one-on-one together (this can be split in 2 sessions if preferred).\nI will provide my expert guidance on how to best reimagine your space. We will work together on a vision and style, and then create a basic design plan. We will also select the main furniture pieces needed, finishes, paint colors, fabrics, rugs, and/or accessories needed to achieve this vision.\nThis service also includes two hours of follow up time, which you can use for any questions or additional assistance you might need in bringing the vision to life.\nAdditionally, you will have access to trade preferred pricing for up to three furniture pieces. If you need more, you have the option to add-on our Procurement Service to take advantage of our exclusive trade pricing on merchandise.",
		price: 850,
		priceDescription: '',
		images: [
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699768092/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Installation-Dayjpg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699812452/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Dining-Room--2-jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699768112/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Molly---Jeff---Master-Suite-Unnamed-Space-41jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699768115/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Molly---Jeff---Master-Suite-Unnamed-Space-44jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700918042/business/282217fb-b89b-4f3b-8ad3-bd952ebcd142.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1712194436/business/efc49491-d759-4275-a20f-9c638d7a784b.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1712194436/business/f71e0dac-d49b-4478-b744-1c5d9541ac5a.jpg',
		],
	},
	{
		id: '3',
		title: 'Bathroom Renovation',
		description:
			'Revitalize your bathroom with our Bathroom Renovation package. This comprehensive package includes:...',
		longDescription:
			'Revitalize your bathroom with our Bathroom Renovation package. This comprehensive package includes:\nIn-Home Visit with Precise Measurements: Our team will visit your home to take accurate measurements, ensuring a tailored design.\nDetailed Design Presentation: Receive a comprehensive design presentation featuring a floor plan, realistic renderings, and a selection of top-quality building materials.\nShopping Day: Field Trip to our vetted distributor to select all plumbing fixtures (1hr included).\nConvenient Shopping List: Access a curated shopping list with building materials, plumbing fixtures and accessories.\nOngoing Follow-Up: We provide continuous support ensuring your satisfaction throughout the renovation process.\nAccess to Trade Preferential Pricing: Add-on the Procurement Service to benefit from our exclusive trade discounts, helping you save on your renovation expenses.',
		price: 799,
		priceDescription: 'Starting Price',
		images: [
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699812421/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Master-Bathroom--3-jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699812415/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Master-Bathroom--6-jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699812428/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Master-Bathroom--7-jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699812390/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Bathroom--1-jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699812397/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Bathroom--3-jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699812393/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Bathroom--2-jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699768108/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/J-J-bathroom-Bathroom-Dry-Area-23--1-jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700920610/business/be3b204b-b305-4f73-a9fc-4a39d8100119.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699768122/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Molly---Jeff--1st-flr--Unnamed-Space-74--2-jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699812401/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Bathroom--4-jpeg.jpg',
		],
	},
	{
		id: '4',
		title: 'A La Carte Services',
		description:
			'Are you looking to enhance your living space? Our A La Carte Services are tailored to meet your specific need...',
		longDescription:
			"Are you looking to enhance your living space? Our A La Carte Services are tailored to meet your specific needs, starting at $85 per hour. \nChoose from a range of offerings, including:\nIn-Home or Virtual Brainstorming Session: Collaborate with our expert designers to generate creative ideas and concepts for your space.\nSpace Planning (Floorplans with Furniture Placement): Optimize the layout of your rooms with professionally designed floorplans, ensuring that every piece of furniture fits seamlessly.\nPaint Colors Palette Selection: Whether it's a single room or your entire house, we'll help you select the perfect color palette to create the atmosphere you desire.\nStyle Your Space (Furniture/Accessory Selection): Let us curate a selection of furniture and accessories that complement your style and vision.\nPre-Purchase Renovation Ideas and Renderings: Visualize your renovation ideas with detailed renderings, allowing you to make informed decisions before starting any work.\nWhether it's a minor refresh or a major renovation, we're here to turn your vision into a reality. No project is too big or too small.",
		price: 85,
		priceDescription: 'per Hour (minimum 3 hours)',
		images: [
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1712194441/business/a60e71a6-f6d3-4368-a81a-ed721c31cf19.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1712194436/business/3c4c3feb-c82f-4ba9-b7c5-6bfdacdaa13c.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700604496/business/d1243996-2529-4190-9293-7bdb2ceaa0b8.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700603726/business/5b1aafdb-0374-4ba7-b5f0-e60fb5ce3969.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699812404/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Baby-Room--3-jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1699812446/business/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/Master-Bedroom--4-jpeg.jpg',
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700571908/business/e927b633-693a-4bfd-a59a-0df08c2cd130.jpg',
		],
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

export const articleMock = [
	{
		id: '1',
		title: 'Planning Your Next Renovation: Where to Start and What to Expect',
		description:
			"Renovating your home is an exciting journey, one filled with the promise of transformation and the creation of spaces that truly reflect your style and needs. Whether you're envisioning a total home makeover or looking to breathe new life into a single room, the process of planning your next renovation can seem daunting. But fear not! At CSH Greenwich Advisory, your trusted partner in interior design and home transformations, we're here to guide you every step of the way. In this comprehensive guide, we'll explore the intricate world of renovation planning, helping you understand where to start and what to expect throughout this exhilarating adventure.",
		longDescription:
			"<b>1. Define Your Renovation Goals</b>\nThe starting point for any successful renovation project is to define your renovation goals clearly. What is it that you hope to achieve with this transformation? Perhaps you envision creating a more open and welcoming living space, or you might be aiming to modernize outdated areas of your home. Some homeowners seek to enhance energy efficiency, while others focus on increasing the resale value of their property. Defining your renovation goals serves as the compass that guides your project, ensuring that every decision and step taken aligns with your ultimate vision.\n<b>2. Establish Your Budget</b>\nSetting a well-defined budget is a cornerstone of prudent renovation planning. Consider how much you're willing to invest in your project and allocate your budget across different categories, including construction, materials, labor, and design fees. It's essential to establish your financial boundaries early on to prevent overspending and to make informed decisions throughout the renovation journey. Your budget acts as a practical framework, helping you balance your aspirations with financial realities.\n<b>3. Prioritize Your Projects</b>\nFor homeowners with multiple renovation ideas and projects in mind, it's crucial to prioritize them based on importance and feasibility. Determine which areas or rooms require immediate attention and which ones can be addressed at a later stage. Prioritizing projects ensures that you allocate your budget and resources wisely, focusing on the most critical aspects of your home first. This approach allows for a more phased and manageable renovation process.\n\n<b>4. Seek Professional Guidance</b>\nRenovation projects often demand a team of professionals to ensure successful execution. Reach out to experienced experts, including architects, contractors, and interior designers, who can provide valuable insights and advice. Collaborating with professionals who understand the intricacies of renovation projects is invaluable. A professional interior designer, such as CSH Greenwich Advisory, can play a pivotal role in creating a cohesive design plan that aligns seamlessly with your vision and budget.\n\n<b>5. Explore Design Concepts</b>\nWork closely with your interior designer to explore various design concepts that resonate with your personal style and preferences. Dive into discussions about color palettes, materials, and layout options. Your interior designer will transform your ideas into tangible plans, complete with detailed floorplans and realistic renderings. These visual representations will help you visualize the final outcome of your renovation project, making the decision-making process more intuitive and exciting.\n\n<b>6. Obtain Necessary Permits</b>\nDepending on the scope and nature of your renovation, you may need to secure permits from your local authorities. Working with professionals who are well-versed in the permitting process ensures that your project complies with local regulations and codes. This proactive approach helps prevent potential delays and complications down the line, ensuring a smoother renovation journey.\n\n<b>7. Select Materials and Finishes</b>\nThe selection of materials and finishes is a pivotal aspect of your renovation project. From flooring and countertops to fixtures and hardware, each choice contributes to the overall aesthetic and functionality of your space. Collaborate with your interior designer to make informed decisions, taking into account factors such as durability, aesthetics, and budget constraints. Access to trade discounts through your designer can provide cost-effective solutions without compromising on quality or style.\n\n<b>8. Develop a Timeline</b>\nTo maintain control and organization throughout your renovation, collaborate with your contractor and interior designer to develop a comprehensive timeline. Establish milestones and deadlines for each phase of the project, from demolition to final touches. A well-defined timeline ensures that your renovation progresses smoothly and stays on schedule, allowing you to anticipate and plan for each stage of the journey.\n\n<b>9. Prepare for Construction</b>\nBefore construction commences, prepare your home by clearing out the designated renovation areas. Safeguard valuable items and furnishings, and discuss with your contractor any necessary measures to minimize disruptions to your daily routine. Adequate preparation ensures that your renovation proceeds efficiently and with minimal inconveniences.\n\n<b>10. Monitor Progress</b>\nStay actively engaged in the renovation process by consistently monitoring progress. Maintain open communication with your contractor and interior designer, addressing any concerns or adjustments as they arise. Regular check-ins allow you to stay informed and make timely decisions, ensuring that the project stays on course and aligns with your vision.\n\n<b>11. Review Final Details</b>\nAs your renovation nears completion, review all final details to guarantee that every aspect of the project meets your expectations. Your interior designer will assist in the final styling and accessorizing of the space, ensuring that it not only meets but exceeds your initial vision.\n\n<b>12. Quality Inspection</b>\nBefore declaring your renovation project complete, conduct a comprehensive quality inspection in collaboration with your contractor. Ensure that all work has been executed to your satisfaction and in accordance with the agreed-upon specifications. Address any remaining issues or touch-ups promptly to achieve a flawless final result.\n\n<b>13. Final Reveal and Enjoyment</b>\nFinally, the moment arrives for the grand reveal of your transformed space. Step into your rejuvenated home and relish the beauty, functionality, and comfort it now offers. Celebrate the successful completion of your renovation project with family and friends, enjoying the newfound warmth and allure of your revitalized living spaces.\nIn conclusion, planning your next renovation is a multifaceted endeavor that requires thoughtful consideration, professional guidance, and a clear vision. At CSH Greenwich Advisory, we are committed to assisting you in achieving your renovation goals and creating spaces that reflect your unique style and needs. If you're ready to embark on your renovation journey or have any questions along the way, please don't hesitate to reach out to us at (203) 900-4336 or via email at charlotte@cshgreenwichadvisory.com . Your dream home awaits, and we're here to make it a reality.",
		images: [
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700572004/business/0b3627be-ea10-4770-ac55-aac63e1b2277.jpg',
		],
	},
	{
		id: '2',
		title: '10 Tips for Successful In-Home Brainstorming Sessions',
		description:
			"In the realm of interior design, successful in-home brainstorming sessions with your designer are the cornerstone of creating spaces that truly reflect your vision and lifestyle. Whether you're embarking on a complete home makeover or seeking to revitalize a single room, the power of collaboration during these sessions cannot be underestimated. To ensure that your in-home brainstorming sessions with your interior designer yield the best results, we've put together ten essential tips that will guide you towards a harmonious and productive design journey.",
		longDescription:
			"<b>1. Clear Communication is Key</b>\nEffective communication serves as the foundation of any successful interior design project. It's essential to prepare thoroughly for your in-home brainstorming session by ensuring that you can articulate your preferences, expectations, and goals with clarity and precision. Your interior designer is your partner in bringing your vision to life, and clear communication is the tool that empowers them to do so. During this initial meeting, consider sharing your design inspirations, favorite design elements, and specific requirements that are close to your heart. The more information you provide, the better your designer can understand your unique style and the atmosphere you wish to create. This open dialogue lays the groundwork for a collaborative and harmonious design journey.\n<b>2. Gather Inspiration</b>\nIn the lead-up to your brainstorming session, take the opportunity to immerse yourself in the world of design inspiration. Seek out sources that resonate with your vision and style. Browse through design magazines, explore online platforms such as Pinterest and Instagram, and even create a scrapbook of images that capture your design preferences. Visual cues and inspirational images serve as powerful tools during your brainstorming session. They provide your interior designer with a visual roadmap, offering a glimpse into your aesthetic preferences, color palettes, and design motifs. By sharing these visuals, you create a shared language that helps your designer understand your tastes and aspirations more deeply, fostering a stronger collaboration.\n<b>3. Define Your Budget</b>\nTransparent and honest discussions about your budget are fundamental to the success of your interior design project. From the very beginning, it's crucial to establish a realistic budget that aligns with your financial constraints. By openly discussing your budget with your interior designer, you set clear parameters that guide the brainstorming and subsequent design phases. This collaborative approach ensures that the ideas generated during your brainstorming session are not only creatively inspiring but also financially feasible. Your designer can tailor their concepts and proposals to fit within the confines of your budget while still achieving the desired aesthetics and functionality. This upfront communication about budget sets the stage for a project that is not only beautiful but also financially responsible.\n<b>4. Establish Your Priorities</b>\nWithin the vast landscape of design possibilities, it's essential to pinpoint your priorities for the project. As you enter the brainstorming session, consider what aspects of the design hold the most significance for you. Is it the need to maximize storage space in your living room? Perhaps you envision creating a cozy and inviting ambiance in your bedroom. Or maybe it's a particular color scheme that resonates with your sensibilities. By clearly identifying your design priorities, you provide your interior designer with valuable insights into the elements that matter most to you. This insight enables them to allocate their creative energies efficiently, ensuring that the final design is a reflection of your preferences and goals. Identifying priorities is like setting the compass for your design journey, guiding it in the direction you desire.\n<b>5. Consider Functionality</b>\nA well-designed space not only looks aesthetically pleasing but also functions seamlessly in line with your lifestyle. As you prepare for your brainstorming session, take a moment to contemplate how you intend to utilize the space once the design is complete. Is it a family room that needs to be child-friendly and accommodate pets? Perhaps it's a home office that should be conducive to remote work and productivity. By sharing insights into your daily routines, habits, and the functionality you require, you equip your interior designer with valuable information. This information enables them to craft a design that not only dazzles the eye but also meets your practical needs. The marriage of form and function is a hallmark of exceptional interior design, and by considering functionality during your brainstorming session, you lay the groundwork for a space that is both beautiful and purposeful.\n<b>6. Be Open to New Ideas</b>\nWhile your input and preferences are invaluable, it's equally important to embrace fresh and innovative ideas that your interior designer may present during the brainstorming session. Your designer's expertise, training, and experience position them as a valuable source of creative inspiration. They bring a wealth of design knowledge and an objective perspective to the table. This fresh perspective often leads to design possibilities and concepts that you might not have previously considered. During your brainstorming session, keep an open mind and be receptive to these new ideas. Engage in a collaborative dialogue that allows for the exploration of innovative design solutions. The magic of design often lies in the fusion of diverse perspectives, and by embracing new ideas, you enrich the creative process and open the door to design excellence.\n<b>7. Take Notes</b>\nDuring the brainstorming session, it's essential to keep a record of key points, design suggestions, and any insights that emerge from the discussion. Taking notes serves multiple purposes. Firstly, it helps you retain a clear understanding of the ideas and concepts discussed during the session. As you move forward with the project, these notes become a valuable reference point, ensuring that you stay aligned with the initial vision. Additionally, jotting down notes demonstrates your active engagement in the design process. It conveys your commitment to the project and your willingness to be an informed and involved client. Whether you prefer to use a traditional notebook or a digital device, the act of taking notes adds a layer of organization to your design journey.\n<b>8. Ask Questions</b>\nAs your brainstorming session unfolds, don't hesitate to ask questions or seek further clarification on any design concepts or recommendations that arise. Effective communication is a two-way street, and your questions are an essential part of the dialogue. If a particular design concept is intriguing but not fully understood, inquire further. Seek explanations, examples, or visual aids that can enhance your comprehension. Your interior designer is your trusted guide throughout this journey, and their insights and explanations are invaluable. A well-informed client is more likely to be deeply satisfied with the final design. By asking questions, you actively participate in the decision-making process, ensuring that the design aligns seamlessly with your vision.\n<b>9. Discuss Timelines</b>\nUnderstanding the project's timeline and key milestones is crucial for a smooth and organized design journey. Engage in a discussion with your interior designer about when you can expect specific deliverables and project phases. This discussion helps set clear expectations and keeps the project on track. You can inquire about when you'll receive design proposals, detailed renderings, and comprehensive cost estimates. Having a well-defined timeline minimizes unexpected surprises and allows you to plan accordingly. It provides you with a sense of the project's progression and ensures that you are informed and prepared at each stage. A collaborative approach to timeline management fosters transparency and ensures that both you and your interior designer are on the same page throughout the project.\n<b>10. Follow-Up Communication</b>\nAfter the brainstorming session concludes, maintaining an open line of communication with your interior designer is vital. Regular follow-up communication ensures that the project continues to evolve in harmony with your preferences, any emerging inspirations, or potential adjustments to the original plan. Share your feedback, thoughts, and any new ideas that may arise as you reflect on the session. Your interior designer values your input and insights and appreciates your active involvement in the design process. This ongoing dialogue helps refine the design concepts, ensuring that the final result encapsulates your vision and desires. A successful design project is a collaborative effort, and your continued communication plays a significant role in achieving a space that surpasses your expectations.\nIn conclusion, the art of conducting successful in-home brainstorming sessions with your interior designer is an essential aspect of the design process. It sets the stage for a transformative journey that will result in spaces that are not only aesthetically pleasing but also deeply reflective of your personality and lifestyle. At CSH Greenwich Advisory, we are dedicated to making your design dreams a reality. If you are eager to embark on this collaborative design adventure or have any questions, please do not hesitate to reach out to us at (203) 900-4336 or via email at charlotte@cshgreenwichadvisory.com. Your dream spaces await, and we are excited to bring them to life together.",
		images: [
			'https://speedy.uenicdn.com/dcfee9f4-05b9-4aa8-a6ce-f219c99188eb/c940_a/image/upload/v1700571908/business/e927b633-693a-4bfd-a59a-0df08c2cd130.jpg',
		],
	},
]
