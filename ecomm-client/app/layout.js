import "./globals.css";
import Navbar from "../components/Utils/Navbar";
import Footer from "../components/Utils/Footer";
import { CartProvider } from "../contexts/cartContext";
import { WishlistProvider } from "../contexts/wishlistContext";
import { AnalyticsProvider } from '../contexts/analyticsContext'
import { ConfigProvider } from 'antd';
import { getServerSession } from "next-auth/next";
import { options } from "../app/api/auth/[...nextauth]/options";
import Session from "../components/Session";

export const metadata = {
  title: "Maliakkal Stores",
  description: "Shop for fresh groceries and daily essentials at Maliakkal Stores. Find everything you need for your household.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);

  return (
    <html lang="en" >
     <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className="relative h-screen overflow-hidden">
     
      <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#030712",
              // Alias Token
              colorBgContainer: "#ffffff",
            },
          }}
        >
        <Session session={session}>
          <CartProvider>
            <WishlistProvider>
              <AnalyticsProvider>
              <Navbar session={session} />
              <div className="h-full overflow-y-scroll pb-44">
              {children}
              </div>
              <Footer/>
              </AnalyticsProvider>
            </WishlistProvider>
          </CartProvider>
        </Session>
        </ConfigProvider>
      </body>
    </html>
  );
}
