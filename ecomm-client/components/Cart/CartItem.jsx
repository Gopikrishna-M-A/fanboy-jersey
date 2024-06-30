import { useState } from "react"
import Image from "next/image"
import { Typography, InputNumber, Button, Divider } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useCart } from "../../contexts/cartContext"
import { useSession } from "next-auth/react"

const { Text, Title, Paragraph } = Typography
const CartItem = ({ cartItem, index }) => {
  const { data: session } = useSession()
  const [user, setUser] = useState(session?.user)

  const { updateCart, removeFromCart } = useCart()

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }

  const removeCartItem = async () => {
    removeFromCart(cartItem.product._id, user._id)
  }

  return (
    <div
      className={`flex flex-col justify-between px-2 py-2`}>
      <div className='flex gap-3'>
        <div className='bg-gray-100 min-w-24 min-h-24 w-24 h-24 rounded-3xl flex justify-center items-center p-1 overflow-hidden'>
          <Image
            preview={false}
            width={70}
            height={70}
            src={cartItem.product.images[0]}
          />
        </div>
        <div className='flex-grow '>
          <Title level={4}>{cartItem.product.name}</Title>
          <p className='text-gray-300 '>{cartItem.product.team.name}</p>
          <div className='text-right w-full'>
            <Title level={5}>₹{cartItem.product.sellingPrice}</Title>
          </div>
        </div>
      </div>
      <Divider className='my-2' />
      <div className='flex justify-between items-center'>
        <Button type='text'>Add to wishlist</Button>
        <div className='flex gap-5'>
          <DeleteOutlined onClick={removeCartItem} />
          <div className='bg-gray-100 w-24 h-9 rounded-full p-1 flex items-center justify-between'>
            <div
              onClick={() => {
                if (cartItem.quantity > 1) {
                  updateCart(
                    cartItem.product._id,
                    user._id,
                    cartItem.quantity - 1
                  )
                }
              }}
              className='w-7 h-7 bg-white rounded-full flex items-center justify-center'>
              -
            </div>
            <div>{cartItem.quantity}</div>
            <div
              onClick={() => {
                updateCart(
                  cartItem.product._id,
                  user._id,
                  cartItem.quantity + 1
                )
              }}
              className='w-7 h-7 bg-white rounded-full flex items-center justify-center'>
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
