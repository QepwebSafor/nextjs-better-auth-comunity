import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import BlogFooter from "@/components/home/blog-footer";
import Navbar from "@/components/header/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "500", "700"]
});

export const metadata: Metadata ={
  title: {
    template: "%s | Parking ESOMA",
    default: "Parking ESOMA"
  },
  description: "Reserva tu plaza de parking ",
  applicationName: "ESOMA"
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


 
  return (

      <html lang="en" suppressHydrationWarning>
        <body
          className={`${quicksand.variable}  antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
           
            {children}
               
               <Toaster position="top-center" richColors />
                  <BlogFooter />
            
          </ThemeProvider>
        </body>
      </html>
   
  );
}