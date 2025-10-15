"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthenticatedAxiosProvider} from "@/components/AuthenticatedAxios";
import {CookiesProvider} from "react-cookie";
import HeaderNavigation from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body>
      <CookiesProvider>
        <AuthenticatedAxiosProvider>
            <HeaderNavigation/>
            {children}
        </AuthenticatedAxiosProvider>
      </CookiesProvider>
      </body>
      </html>
  );
}
