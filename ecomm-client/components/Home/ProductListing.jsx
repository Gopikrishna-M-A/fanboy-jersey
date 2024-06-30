"use client";
import {
  AppstoreOutlined,
  MailOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { Typography, Menu, Slider, Select, Empty } from "antd";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
const { Title, Text } = Typography;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const ProductCategory = ({ id, products, allP }) => {
  const router = useRouter()
  const [allProducts, setAllProducts] = useState(products);
  const [filteredProducts,setFilteredProducts] = useState([])

  console.log("products",products);

  useEffect(() => {
    if (id) {
      const filtered = products.filter((product) => product.team._id === id);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [id, products]);



  const changeCategory = (key) => {
    router.push(`/products/${key}`);
  }

  return (
    <div className="px-2 py-2 lg:px-10 lg:py-2.5 lg:pl-0 lg:pt-0 overflow-hidden flex h-[calc(100vh-73px)]">
      <div className=" w-full h-screen overflow-y-auto lg:px-5 lg:py-2 lg:pr-0 no-scrollbar lg:pb-24 pb-24 flex flex-col ">
        <div className="flex justify-between mb-4">
          <Title level={4}>{allP ? 'All Products' : filteredProducts[0]?.team?.name}</Title>
          <div className="flex gap-1">
            <SortAscendingOutlined />
            <Select
              placeholder="sort"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "a-z", label: "A-Z" },
                { value: "z-a", label: "Z-A" },
                { value: "l-h", label: "Low - high" },
                { value: "h-l", label: "High - Low" },
              ]}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mx-auto mt-5 gap-8">
          {!filteredProducts.length && <div className="w-full h-full flex justify-center items-center"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Oops! It seems this team is currently empty. Check back later for exciting new products!"} /></div>}
          {filteredProducts.map((product) => (
             <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
