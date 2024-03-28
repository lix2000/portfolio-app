"use client"
import { navbarContactIcons, navbarTabs } from "@settings"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useShowInfoNavbar } from "@hooks"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"

const theme = {
  true: {
    navbarClassnames: ["bg-transparent"],
    buttonClassnames: ["text-tertiary-tone"],
  },
  false: {
    navbarClassnames: ["bg-tertiary"],
    buttonClassnames: ["text-primary-tone"],
  },
}

const Navbar = () => {
  const pathName = usePathname()
  const isHomePage = pathName === "/"
  const showInfo = useShowInfoNavbar()
  const { navbarClassnames: navTheme, buttonClassnames: btnTheme } =
    theme[String(showInfo) as keyof typeof theme]
  const buttonClassnames = [
    "transition-all",
    "duration-500",
    "relative",
    "py-2",
    "px-3",
    "rounded-md",
    "leading-none",
    "text-body",
    ...btnTheme,
  ]
  const navbarClassnames = ["w-full", "h-60", "flex-center", "transition-all", "duration-500", ...navTheme]

  return (
    <div className='fixed w-full'>
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            animate={{ height: 60, opacity: 1, overflow: "hidden" }}
            exit={{ height: 0, opacity: 0, overflow: "hidden" }}
          >
            <div className='h-60 w-full flex-space-between gap-8 bg-tertiary-shadow transition-all duration-500 px-56 text-primary-contrast-15 overflow-hidden'>
              <div className='flex-center gap-2 flex text-label'>
                <Link
                  rel='noopener noreferrer '
                  target='_blank'
                  href='https://www.google.com/maps/place/Greenwich,+CT,+USA/@41.0519461,-73.8041594,11z/data=!3m1!4b1!4m6!3m5!1s0x89c298110f4c2e97:0x831ae27600430e2!8m2!3d41.0262417!4d-73.6281964!16zL20vMHJkNmI?entry=ttu'
                  className='gap-1 flex'
                >
                  <FontAwesomeIcon icon={faLocationDot} />
                  Greenwich, Connecticut
                </Link>
                |
                <Link
                  rel='noopener noreferrer'
                  target='_blank'
                  href='tel:+1%20203-900-4336'
                  className='gap-1 flex'
                >
                  <FontAwesomeIcon icon={faPhone} />
                  (203) 900-4336
                </Link>
              </div>
              <div className='flex-center gap-2 flex text-label'>
                {navbarContactIcons.map(({ icon, href }) => (
                  <Link
                    rel='noopener noreferrer '
                    target='_blank'
                    href={href}
                    className='rounded-full bg-tertiary-tone-25 p-2 hover:bg-primary-contrast-50 text-primary-contrast transition-all duration-500'
                  >
                    <FontAwesomeIcon icon={icon} />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={navbarClassnames.join(" ")}>
        <AnimatePresence>
          {!showInfo && (
            <motion.div
              initial={{ opacity: 0, width: 0, height: 0, marginTop: 20, marginRight: 0 }}
              animate={{ opacity: 1, width: 40, height: 40, marginTop: 0, marginRight: 20 }}
              exit={{ opacity: 0, width: 0, height: 0, marginTop: 20, marginRight: 0 }}
            >
              <Link href={"/"}>
                <Image
                  className='hover:ring-1 hover:ring-primary hover:ring-opacity-100 hover:rounded-full transition-all duration-500'
                  src='/images/logo.png'
                  height={40}
                  width={40}
                  alt='logo'
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <div className='flex-center bg-white gap-2'>
          {navbarTabs.map(({ name, link }) => (
            <Link key={link} href={link}>
              <button
                className={`${buttonClassnames.join(" ")} 
                ${
                  link === pathName && !isHomePage
                    ? "bg-primary text-secondary-tone"
                    : "hover:bg-tertiary-shadow"
                }  `}
              >
                {name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
