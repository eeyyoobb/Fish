import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from '@clerk/nextjs/server';
 // Import ChildListPage to render it with props

const Parent = async () => {
  // Get the user ID from Clerk authentication
  const { userId } = auth();

  // Check if userId is present
  if (!userId) {
    return <div>User not authenticated.</div>;
  }

  // Fetch the child record based on userId
  const child = await prisma.child.findFirst({
    where: {
      clerkId: userId,
    },
    select: {
      fatherId: true,
    },
  });

  // Get the fatherId or return a message if not found
  const fatherId = child ? child.fatherId : null;

  if (!fatherId) {
    return <div>No child found for the authenticated user.</div>;
  }

  const fatherUser = await clerkClient.users.getUser(fatherId);
  const role = fatherUser?.publicMetadata.role as string;

  //@ts-ignore
  const roleDetails = await prisma[role]?.findFirst({
    where: {
      clerkId: fatherId,
    },
    include: {
      tribe: true,
      grade: true,
    },
  });

  if (!roleDetails) {
    return <div>Role details not found.</div>;
  }

  // Get tribe and grade
  const tribe = roleDetails.tribe?.name || "Tribe not found";
  const grade = roleDetails.grade?.level || "Grade not found";

  // Pass tribe and grade as props to ChildListPage
  return (
    <div>
      <p>Tribe: {tribe}</p>
      <p>Grade: {grade}</p>
    </div>
  );
};

export default Parent;


