
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";


const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Fitologia",
  description: "Blog botânica",
  keywords: ["botânica", "plantas", "classificação"],
  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased` } suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
