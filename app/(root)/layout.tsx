import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  // const user:User = {
  //   id: "b67f93e2-8c42-4c23-99a8-0c5f234bcf73",
  //   firstName: "John",
  //   lastName:"Adams",
  //   email: "johnadams@gmail.com",
  //   address: "1234 Main Street",
  //   city: "New York",
  //   country: "USA",
  //   postalCode: "10001",
  //   }

  return (
    <main className = "flex h-screen w-full">
      <SideBar/>
      <div className="flex size-full flex-col bg-blue-600">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNav/>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
