import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract userId from Clerk authentication
  const { userId } = auth();

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Fetch the child record using the userId
    const child = await prisma.child.findFirst({
      where: {
        clerkId: userId, // Assuming 'clerkId' is the field used for matching
      },
      select: {
        fatherId: true, // Select only the fatherId
      },
    });

    // Check if a child was found and return the fatherId or null
    const fatherId = child ? child.fatherId : null;

    console.log('Found child:', child);
    res.status(200).json({ fatherId }); // Send the fatherId back as JSON response
  } catch (error) {
    console.error('Error fetching child:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
