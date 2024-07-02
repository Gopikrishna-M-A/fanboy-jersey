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
  title: "FJ",
  description: "PWA application with Next 13",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "Gopikrishna",
      url: "https://www.linkedin.com/in/gopikrishna6003/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/FJ-128.png" },
    { rel: "icon", url: "icons/FJ-128.png" },
  ],
};


export default async function RootLayout({ children }) {
  const session = await getServerSession(options);

  return (
    <html lang="en" >
     <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className="">
     
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
              <div className="relative min-h-screen overflow-hidden">
              <Navbar session={session} />
              <div className="h-full overflow-y-scroll pb-24">
              {children}
              </div>
              <Footer/>
              </div>
              </AnalyticsProvider>
            </WishlistProvider>
          </CartProvider>
        </Session>
        </ConfigProvider>
      </body>
    </html>
  );
}
