
import { auth} from "@clerk/nextjs/server";
import ContextProvider from "@/context/ContextProvider";

export default async function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;


  return (
    <ContextProvider>
    <div className="h-screen"> 
      <div className="w-full">
        {children}
      </div>
    </div>
   </ContextProvider>
  );
}
