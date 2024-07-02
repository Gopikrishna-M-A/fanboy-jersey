"use client"
import React, { useState, useEffect } from "react"
import { BsPerson } from "react-icons/bs"
import { TbLayoutListFilled } from "react-icons/tb"
import { IoMdHeartEmpty } from "react-icons/io"
import { TbSmartHome } from "react-icons/tb"
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { usePathname, useRouter } from "next/navigation"

const Footer = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlFooter = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight

        if (currentScrollY < lastScrollY) {
          // Scrolling UP
          setIsVisible(true)
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling DOWN and not at the top
          setIsVisible(false)
        }

        // Always show footer when at bottom of page
        if (windowHeight + currentScrollY >= documentHeight - 50) {
          setIsVisible(true)
        }

        setLastScrollY(currentScrollY)
      }
    }

    window.addEventListener('scroll', controlFooter)
    return () => {
      window.removeEventListener('scroll', controlFooter)
    }
  }, [lastScrollY])

  const getIconClasses = (iconName) => {
    const active =
      (iconName === "home" && pathname === "/") ||
      (iconName === "list" && pathname.includes("/orders")) ||
      (iconName === "heart" && pathname.includes("/wishlist")) ||
      (iconName === "cart" && pathname.includes("/cart")) ||
      (iconName === "person" && pathname.includes("/profile"))

    return active ? "bg-red-500 text-white" : "text-gray-600"
  }

  const handleIconClick = (route) => {
    router.push(route)
  }

  return (
    <div className={`md:hidden w-full fixed bottom-0 left-0 right-0 px-2 pb-2 bg-gradient-to-b from-transparent to-white z-20 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className='w-full min-h-20 bg-gray-950 rounded-full flex justify-between items-center px-2 transition-colors duration-300'>
        <div
          className={`p-5 rounded-full ${getIconClasses(
            "home"
          )} transition-all duration-300`}
          onClick={() => handleIconClick("/")}>
          <TbSmartHome className='w-7 h-7' />
        </div>
        <div
          className={`p-5 rounded-full ${getIconClasses(
            "list"
          )} transition-all duration-300`}
          onClick={() => handleIconClick("/orders")}>
          <TbLayoutListFilled className='w-7 h-7' />
        </div>
        <div
          className={`p-5 rounded-full ${getIconClasses(
            "heart"
          )} transition-all duration-300`}
          onClick={() => handleIconClick("/wishlist")}>
          <IoMdHeartEmpty className='w-7 h-7' />
        </div>
        <div
          className={`p-5 rounded-full ${getIconClasses(
            "cart"
          )} transition-all duration-300`}
          onClick={() => handleIconClick("/cart")}>
          <HiOutlineShoppingCart className='w-7 h-7' />
        </div>
        <div
          className={`p-5 rounded-full ${getIconClasses(
            "person"
          )} transition-all duration-300`}
          onClick={() => handleIconClick("/profile")}>
          <BsPerson className='w-7 h-7' />
        </div>
      </div>
    </div>
  )
}

export default Footer