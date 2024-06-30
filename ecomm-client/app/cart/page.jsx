"use client"
import { Button, message, Steps, Spin, Typography } from "antd"
import { useState } from "react"
import Cart from "../../components/Cart/Cart"
import Address from "../../components/Cart/Address"
import Payment from "../../components/Cart/Payment"
const { Text, Title, Paragraph } = Typography

const page = () => {
  const [current, setCurrent] = useState(0)
  const steps = [
    {
      title: "Cart",
      content: <Cart setCurrent={setCurrent} />,
    },
    {
      title: "Address",
      content: <Address setCurrent={setCurrent} />,
    },
    {
      title: "Payment",
      content: <Payment setCurrent={setCurrent} />,
    },
  ]

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  const onChange = (value) => {
    console.log("onChange:", value)
    setCurrent(value)
  }

  return (
    <div className='px-2 pt-3 pb-2 flex flex-col gap-2 items-center'>
      {/* <div className="flex">
      <Steps className="mx-auto" type='inline' current={current} items={items} onChange={onChange} />
      </div> */}

      <Title level={4}>My Cart</Title>

      <div className="w-full">
        <div className="min-w-full">{steps[current].content}</div>
      </div>
    </div>
  )
}

export default page
