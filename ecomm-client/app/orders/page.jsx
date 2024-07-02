"use client"
import React, { useEffect, useState } from "react"
import {
  Button,
  Typography,
  Breadcrumb,
  Steps,
  Popover,
  Divider,
  Spin,
  Empty,
  Tag,
  Segmented,
} from "antd"
import {
  QuestionCircleOutlined,
  FilePdfOutlined,
  DropboxCircleFilled,
  CheckCircleFilled,
  CarFilled,
  EnvironmentFilled,
  StarFilled,
  RedoOutlined,
  CloseCircleFilled,
} from "@ant-design/icons"
import OrderItems from "../../components/Orders/OrderItems"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"

const { Title, Paragraph, Text } = Typography
const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const IconMapping = {
  Processing: <CheckCircleFilled />,
  Packed: <DropboxCircleFilled />,
  Shipped: <CarFilled />,
  Delivered: <EnvironmentFilled />,
  Completed: <StarFilled />,
  Cancelled: <CloseCircleFilled />,
  Refunded: <RedoOutlined />,
}

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }>
    {dot}
  </Popover>
)

const page = () => {
  const [orders, setOrders] = useState([])
  const [totalOrders, setTotalOrders] = useState(orders.length)
  const [loading, setLoading] = useState(false)
  const [orderState, setOrderState] = useState("All")

  const { data: session } = useSession()
  const [user, setUser] = useState(session?.user)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${baseURL}/api/orders/history/${user._id}`
      )
      const ecommerceOrders = data
        .filter((order) => order.orderSource === "ecommerce")
        .reverse()
      setOrders(ecommerceOrders)
      setTotalOrders(ecommerceOrders.length)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  console.log(orders)


  function DateFormat(inputDate) {
    const date = new Date(inputDate)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getUTCMonth()]
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()

    const formattedDate = `${month} ${day}, ${year}`

    return formattedDate
  }

  return (
    // <div className="px-10 py-2.5">
    //   <div className="">
    //     <div className="flex justify-between">
    //       <div className="flex gap-1 items-center">
    //         <Title level={3}>Your Orders</Title>
    //         <Paragraph type="secondary">({totalOrders})</Paragraph>
    //       </div>
    //       <div className="flex">
    //         <Link href={'mailto:support@maliakkalstores.com'}><Button icon={<QuestionCircleOutlined />}>Need Help?</Button></Link>

    //       </div>
    //     </div>
    //     <Breadcrumb
    //       items={[
    //         {
    //           title: <Link href="/orders">History</Link>,
    //         },
    //       ]}
    //     />
    //   </div>

    //   <div className="flex justify-between">
    //     <div className=" w-full bg-white rounded-md border mt-8 py-2.5 px-5 ">
    //       {orders.length ? (
    //         orders.map((order, index) => (
    //           <div key={order._id}>
    //             <div className="flex justify-between items-center">
    //               <div className="flex flex-col w-4/6">
    //                 <Link href={`/orders/${order._id}`}>
    //                   <Title level={4}> {order?.orderNumber} </Title>
    //                 </Link>
    //                 <div className="flex gap-10">
    //                   <div className="flex flex-col gap-1">
    //                     <Paragraph type="secondary">Order</Paragraph>
    //                     <Paragraph type="success">
    //                       &#10003;{" "}
    //                       {order?.paymentStatus == "captured"
    //                         ? "paid"
    //                         : "unpaid"}
    //                     </Paragraph>
    //                   </div>
    //                   <div className="flex flex-col gap-1">
    //                     <Paragraph type="secondary">Amount</Paragraph>
    //                     <Text strong>&#8377; {order?.totalAmount}</Text>
    //                   </div>
    //                   <div className="flex flex-col gap-1">
    //                     <Paragraph type="secondary">
    //                       Estimated Delivery
    //                     </Paragraph>
    //                     <Paragraph>
    //                       {convertDateFormat(order.orderDate)}
    //                     </Paragraph>
    //                   </div>
    //                   <div className="flex flex-col">
    //                     {/* <Button type="primary" size="small">
    //                   {order?.orderStatus &&
    //                     order.orderStatus[order.phase].status}
    //                 </Button> */}
    //                   </div>
    //                 </div>
    //               </div>
    //               {/* <div className="orders-map"></div> */}
    //             </div>

    //             <Steps
    //               className="mt-8 mb-5"
    //               current={order?.orderStatus?.length}
    //               items={[
    //                 ...(order?.orderStatus?.map((status, index) => {
    //                   return {
    //                     title: status.status,
    //                     icon: IconMapping[status.status],
    //                     description: DateFormat(status.timestamp),
    //                   };
    //                 }) || []),
    //               ]}
    //             />
    //             {index == orders.length - 1 ? <></> : <Divider />}
    //           </div>
    //         ))
    //       ) : (
    //         <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    //       )}
    //     </div>

    //   </div>
    // </div>

    <div className='py-4 px-2 flex flex-col gap-2'>
      <div className=''>
        <div className='flex justify-between'>
          <div className='flex gap-1 items-center'>
            <Title level={3}>Your Orders</Title>
            <Paragraph type='secondary'>({totalOrders})</Paragraph>
          </div>
          <div className='flex'>
            <Link href={"mailto:support@maliakkalstores.com"}>
              <Button icon={<QuestionCircleOutlined />}>Need Help?</Button>
            </Link>
          </div>
        </div>
        <Breadcrumb
          items={[
            {
              title: <Link href='/orders'>History</Link>,
            },
          ]}
        />
      </div>
      <div>
        <Segmented
          options={["All", "On Delivery", "Completed", "Canceled"]}
          block
          value={orderState}
          onChange={(value) => setOrderState(value)}
          size='large'
        />
      </div>

      {orders?.map((order) => (
        <div className='border rounded-lg '>
          <div className="flex items-start justify-between p-3">
            <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-xl shadow-md relative overflow-hidden">
              <Image
                src='/images/products/placeholder.jpg'
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div>
              <Title level={4}>{order.orderNumber}</Title>
              <Text>{order.method}</Text>
            </div>
            </div>
            
            <div className="font-bold text-md">₹{order.totalAmount}</div>
          </div>
          <Divider className="m-0"/>
          <div className="flex items-center justify-between p-3">
            <Tag color='orange'>
              {order.orderStatus[order.orderStatus.length - 1].status}
            </Tag>
            <div>{DateFormat(order.orderDate)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default page
