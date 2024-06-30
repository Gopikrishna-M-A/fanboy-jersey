"use client"
import {
  MenuOutlined,
  ThunderboltOutlined,
  SyncOutlined,
  TagOutlined,
  RightOutlined,
} from "@ant-design/icons"
import { Button, Carousel, Typography, Tag, Input, Select } from "antd"
import CategoryCard from "./CategoryCard"
import FeaturedCard from "./FeaturedCard"
import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const { Title, Text } = Typography

const Home = ({ categories }) => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    getTeams()
  }, [])

  const getTeams = async () => {
    axios.get(`${baseURL}/api/team`).then((res) => {
      setTeams(res.data)
    })
  }

  return (
    <div className=' px-2 py-1  lg:px-10 lg:py-2.5 '>
      <div className='flex banner w-full justify-between my-2.5'>
        <div  className='w-full bg-sky-950 flex items-center justify-center rounded-lg' >
          <Image width={400} height={400} src='/images/Banner/bg.png' />
        </div>
      </div>

      <div className='w-full py-10 flex flex-col gap-3'>
        <div className='flex items-center gap-2'>
          <Title level={4}>Browse by Team</Title>
          <Text style={{ marginLeft: "20px" }} type='secondary'>
            All Teams <RightOutlined />
          </Text>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {teams.map((team) => (
            <Link
            href={`/products/${team._id}`}
              key={team._id}
              className='w-20 h-20 bg-gray-100 rounded-full shadow-lg overflow-hidden'>
              <Image
                className='transition-transform duration-300 transform hover:rotate-3'
                width={100}
                height={100}
                src={`/images/team/${team.logo}`}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className='w-full pb-5 flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Title level={4}>Todays Sale!</Title>
            <Tag color='error'>04:43:23</Tag>
          </div>
          <Text style={{ marginLeft: "20px" }} type='secondary'>
            See More <RightOutlined />
          </Text>
        </div>

        <div className='flex gap-4'>
          <div className='flex flex-col gap-3 w-fit'>
            <div className='bg-gray-100 rounded-3xl w-fit py-5 px-4'>
              <Image width={150} height={150} src='/images/Products/a.png' />
            </div>
            <div>
              <div className='font-semibold'>Nike Club</div>
              <div className='text-gray-300'>Mens's Stadium Parka</div>
              <div className='text-gray-300'>1 color</div>
            </div>
          </div>

          <div className='flex flex-col gap-3 w-fit'>
            <div className='bg-gray-100 rounded-3xl w-fit py-5 px-4'>
              <Image width={150} height={150} src='/images/Products/b.png' />
            </div>
            <div>
              <div className='font-semibold'>Nike Club</div>
              <div className='text-gray-300'>Mens's Stadium Parka</div>
              <div className='text-gray-300'>1 color</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
