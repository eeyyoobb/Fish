import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/themeProvider";
import Navbar from "@/components/Navbar";
import Script from 'next/script'; 
import NextTopLoader from 'nextjs-toploader';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster, toast } from 'sonner'
import ContextProvider from "../context/ContextProvider";
import Sidebar from "@/components/sidebar";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All In One",
  description: "We are here for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <>
      <ClerkProvider> 
      <html lang="en">
      <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
            integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={inter.className}>
        <NextTopLoader
            height={2}
            color="#d56f23"
            easing="cubic-bezier(0.53,0.21,0,1)"
          /> 
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
             >

            <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />
            <ContextProvider>
              <div className="h-screen">
                 <Navbar/>
                <div className="flex">
            { role ? (
               <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
                <Sidebar />
               </div>
               ) : null}
               <div className="w-[84%] md:w-[92%] lg:w-full xl:w-full overflow-scroll flex flex-col">
                <div className=" flex-grow">{children}
                 <Toaster richColors/>
                </div>
                </div>
              </div>
            </div>
            </ContextProvider>
          </ThemeProvider>
        </body>
      </html>
      </ClerkProvider> 
    </>
  );
}
