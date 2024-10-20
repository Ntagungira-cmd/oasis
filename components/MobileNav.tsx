import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MobileNavWrapper from './MobileNavWrapper';

const MobileNav = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <section className="w-fulll max-w-[264px] bg-blue-600">
      <MobileNavWrapper/>
    </section>
  );
};

export default MobileNav;
