import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import './globals.css';

const josefinSans = Josefin_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Full-stack todo app built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${josefinSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}