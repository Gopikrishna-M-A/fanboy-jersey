"use client"
import React, { useState } from "react"
import { List, Button, Card, Modal, Space, Typography, Empty } from "antd"
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import WishlistCard from "../../components/Wishlist/WishlistCard"
import { useWishlist } from "@/contexts/wishlistContext"

const { confirm } = Modal
const { Text, Title, Paragraph } = Typography

const Wishlist = () => {
  const { wishlist } = useWishlist()

  const handleRemoveItem = (itemId) => {
    confirm({
      title: "Remove from Wishlist",
      content: "Are you sure you want to remove this item from your wishlist?",
      onOk() {
        const updatedItems = wishlistItems.filter((item) => item.id !== itemId)
        setWishlistItems(updatedItems)
      },
      onCancel() {},
    })
  }

  const handleAddToCart = (itemId) => {
    // Implement your logic to add the item to the cart
    console.log(`Add to cart clicked for item with ID ${itemId}`)
  }

  return (
    <div className='px-2 py-2 lg:px-10 lg:py-2.5 lg:pl-0 lg:pt-0 overflow-hidden flex h-[calc(100vh-73px)]'>
      <div className=' w-full h-screen overflow-y-auto lg:px-5 lg:py-2 lg:pr-0 no-scrollbar lg:pb-24 pb-24 flex flex-col '>
        <div className='flex justify-between mb-4'>
          <Title level={4}>Wishlist</Title>
        </div>
        <div className='grid grid-cols-1 mx-auto mt-5 gap-8'>
          {!wishlist.length && (
            <div className='w-full h-full flex justify-center items-center'>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={"Your wishlist is empty."}
              />
            </div>
          )}
          {wishlist?.map((item) => (
            <WishlistCard
              product={item}
              handleRemoveItem={handleRemoveItem}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
