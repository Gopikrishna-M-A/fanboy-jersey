"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Typography, Input, Select, Badge } from "antd";

import { useSession, signIn, signOut } from "next-auth/react"

import { useCart } from "../../contexts/cartContext";
import { useWishlist } from "@/contexts/wishlistContext";

const { Title, Text } = Typography;
const { Search } = Input;

const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { data: session } = useSession()
  const [user, setUser] = useState(session?.user)
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const cartQty = cart?.products?.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const wishlistQty = wishlist?.length;

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };
  const closeNav = () => {
    setIsNavExpanded(false);
  };

  const handleMenuClick = async (e) => {
    if (e.key === "1") {
    } else if (e.key === "2") {
    }
  };


  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const items = [
    {
      key: '1',
      label: (
        <Link href="/profile" rel="noopener noreferrer" >
          Profile
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href="/orders" rel="noopener noreferrer" >
          Orders
        </Link>
      ),
    },
    {
      key: '3',
      danger: true,
      label: (
        <div onClick={signOut} rel="noopener noreferrer" >
         Sign out
        </div>
      ),
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-screen flex items-center justify-between px-2 py-5 bg-white">
        <Link className="font-bold text-2xl" href="/">
          <div className="bg-sky-950 px-3 py-1 rounded text-white font-bold text-lg">FanBoy Jersey</div>
        </Link>

        <div className="flex items-center gap-4">
          <div className=" flex gap-8 mr-3">
         
           
          </div>
          {!user && (
              <Button onClick={signIn}>
                Sign in
              </Button>
          )}
          {user &&  <img src={user.image} className="cursor-pointer w-9 h-9 rounded-full"></img> }
        </div>
      </nav>
    </>
  );
};

export default Navbar;


   {/* <Link className="link-item" onClick={closeNav} href="/cart">
              <Badge count={cartQty}>
                <ShoppingCartOutlined />
              </Badge>
            </Link> */}