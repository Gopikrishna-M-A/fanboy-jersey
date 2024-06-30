"use client"
import React from "react"
import { BsPerson } from "react-icons/bs"
import { TbLayoutListFilled } from "react-icons/tb"
import { IoMdHeartEmpty } from "react-icons/io"
import { TbSmartHome } from "react-icons/tb"
import { BiMessageSquareDetail } from "react-icons/bi"
import { usePathname, useRouter } from "next/navigation"
import { Badge } from "antd"
// import { useWishlist } from "@/contexts/wishlistContext"

const Footer = () => {
  const router = useRouter()
  const pathname = usePathname()
  // const { wishlist } = useWishlist()
  // const wishlistQty = wishlist?.length

  const getIconClasses = (iconName) => {
    const active =
      (iconName === "home" && pathname === "/") ||
      (iconName === "list" && pathname.includes("/orders")) ||
      (iconName === "heart" && pathname.includes("/wishlist")) ||
      (iconName === "message" && pathname.includes("/notifications")) ||
      (iconName === "person" && pathname.includes("/profile"))

    return active ? "bg-red-500 text-white" : "text-gray-600"
  }

  const handleIconClick = (route) => {
    router.push(route)
  }

  return (
    <div className='w-full absolute bottom-0 px-2 pb-5 bg-gradient-to-b from-transparent to-white z-20'>
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
        {/* <Badge count={wishlistQty}> */}
          <div
            className={`p-5 rounded-full ${getIconClasses(
              "heart"
            )} transition-all duration-300`}
            onClick={() => handleIconClick("/wishlist")}>
            <IoMdHeartEmpty className='w-7 h-7' />
          </div>
        {/* </Badge> */}

        <div
          className={`p-5 rounded-full ${getIconClasses(
            "message"
          )} transition-all duration-300`}
          onClick={() => handleIconClick("/notifications")}>
          <BiMessageSquareDetail className='w-7 h-7' />
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
