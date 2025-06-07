import type { Metadata, Viewport } from "next";

import "../styles/base.css";

export const metadata: Metadata = {
  title: "Type Specimens",
  description:
    "A collection of the web's best typeface specimens. Curated by John D. Jameson",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2e5094",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://ik.imagekit.io" />
      </head>
      <body className="bg-blue-900 pb-14 text-blue-100 underline-offset-4 md:pb-24">
        {children}
      </body>
    </html>
  );
}
