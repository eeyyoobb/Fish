import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions: Record<string, any> = {
    creator: { tasks: { some: { creatorId: userId! } } },
    child: { children: { some: { clerkId: userId! } } },  // Ensure this matches your schema
    parent: { children: { some: { parentId: userId! } } },  // Ensure this matches your schema
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { tribeId: null },
          { tribe: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    <div className="glass p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data.map((announcement, index) => (
          <div
            key={announcement.id}
            className={`rounded-md p-4 ${
              index === 0
                ? "bg-lamaSkyLight"
                : index === 1
                ? "bg-lamaPurpleLight"
                : "bg-lamaYellowLight"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcement.title}</h2>
              <span className="text-xs text-gray-400 glass rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-GB").format(announcement.date)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
