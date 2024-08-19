import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Container from "@/components/container";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App with Next.js",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const isAuth = await isAuthenticated();

  if (isAuth) {
    const userExists = await prisma.user.findFirst({
      where: { email: user?.email ?? "" },
    });

    if (!userExists) {
      await prisma.user.create({
        data: {
          email: user?.email ?? "",
        },
      });
    }
  }

  return (
    <html lang="en">
      <body
        className={`${inter.className} text-zinc-300 bg-zinc-900 bg-opacity-95`}
      >
        <Toaster position="bottom-left" />
        <Container>
          <Header isAuth={isAuth} user={user} />

          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
