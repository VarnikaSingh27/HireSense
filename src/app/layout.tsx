import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HireSense - From Resumes to Recruitment",
  description:
    "HireSense - An AI-powered platform for smart resume screening, talent matching, and automated interview scheduling, making hiring faster, fairer, and more efficient!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <>{children}</>
      </body>
    </html>
  );
}
