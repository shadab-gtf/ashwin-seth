import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Antigravity | Immersive Experience',
  description: 'A cinematic scroll journey.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <Loader />
          <Header />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
