import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Africa Map',
  description: 'Interactive Choropleth Map of Africa',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      
      <body>
      <Navbar/>
        {children}
      <Footer/>
        </body>
    </html>
  );
}
