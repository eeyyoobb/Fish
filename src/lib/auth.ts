// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { SessionClaims } from "@/types/task";

// export async function getUser(userId: string) {
//   try {
//     return await clerkClient.users.getUser(userId);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null;
//   }
// }

// export function getSessionRole(): Role | undefined {
//   const { sessionClaims } = auth();
//   return (sessionClaims as SessionClaims)?.metadata?.role;
// }

// export async function validateUserRole(userId: string): Promise<Role | null> {
//   try {
//     const user = await getUser(userId);
//     return (user?.publicMetadata as { role?: Role })?.role || null;
//   } catch (error) {
//     console.error("Error validating user role:", error);
//     return null;
//   }
// }