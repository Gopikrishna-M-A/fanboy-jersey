import React, { useState } from "react"
import { Form, Input, Button, Typography, Row, Col } from "antd"
import axios from "axios"
import { useSession } from "next-auth/react"

const { Title } = Typography

const Address = ({ setCurrent }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const { data: session } = useSession()
  const user = session?.user

  const initialValues = {
    email: user?.email,
    phone: user?.phone,
    street: user?.address?.street,
    city: user?.address?.city,
    state: user?.address?.state,
    zipCode: user?.address?.zipCode,
    country: "India",
  }

  const onFinish = (values) => {
    // Handle form submission logic here
    const isSame = Object.keys(initialValues).every(
      (key) => initialValues[key] === values[key]
    )

    const convertedData = {
      phone: values.phone,
      address: {
        street: values.street,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        country: values.country,
      },
    }

    if (isSame) {
      console.log("Values are the same. No need to update.")
      setCurrent(2)
      return
    }

    try {
      axios.patch(`${baseURL}/api/user/${user._id}`, convertedData)
    } catch (err) {
      console.log("Error in updating user address", err)
    } finally {
      setCurrent(2)
    }
  }

  console.log(user)

  return (
    <div>
      <Title level={3}>Address</Title>
      <Form
        size='large'
        initialValues={initialValues}
        name='addressForm'
        onFinish={onFinish}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}>
        <div className='grid grid-cols-1'>
          <Form.Item
            required={false}
            name='phone'
            label='Phone'
            rules={[
              {
                required: true,
                message: "Please enter your phone",
              },
            ]}
            className='my-0'>
            <Input addonBefore='🇮🇳' placeholder='9999999999' />
          </Form.Item>
          <Form.Item
            name='street'
            label='Billing Address'
            required={false}
            rules={[
              { required: true, message: "Please enter your street address" },
            ]}
            className='my-0'>
            <Input.TextArea placeholder='123 Main St' />
          </Form.Item>
          <Form.Item
            required={false}
            name='city'
            label='Town / City'
            rules={[
              {
                required: true,
                message: "Please enter your town or city",
              },
            ]}
            className='my-0'>
            <Input placeholder='Town' />
          </Form.Item>
          <Form.Item
            required={false}
            name='state'
            label='state'
            rules={[
              {
                required: true,
                message: "Please enter your state",
              },
            ]}
            className='my-0'>
            <Input placeholder='state' />
          </Form.Item>
          <Form.Item
            required={false}
            name='zipCode'
            label='Postal Code'
            rules={[
              { required: true, message: "Please enter your postal code" },
            ]}
            className='my-0'>
            <Input placeholder='682030' />
          </Form.Item>
          <Form.Item
            required={false}
            name='country'
            label='Country'
            rules={[{ required: true, message: "Please enter your country" }]}
            className='my-0'>
            <Input disabled={true} placeholder='Country' />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              size='large'
              type='primary'
              className='bg-gray-950 mt-4'
              style={{ height: "60px", fontSize: "20px" }}>
              Continue
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default Address
