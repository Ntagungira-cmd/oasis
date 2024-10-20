import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user:User = {
    id: "b67f93e2-8c42-4c23-99a8-0c5f234bcf73",
    firstName: "John",
    lastName:"Adams",
    email: "johnadams@gmail.com",
    address: "1234 Main Street",
    city: "New York",
    country: "USA",
    postalCode: "10001",
    }
  return (
    <main className = "flex h-screen w-full">
      <SideBar user={user} />
      <div className="flex size-full flex-col bg-blue-600">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNav user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
