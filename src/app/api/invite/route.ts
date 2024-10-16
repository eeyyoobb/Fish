// pages/api/invitations.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Ensure the user is authenticated
  const { userId } = auth();
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (method === 'POST') {
    const { invitorUserId }: { invitorUserId: string } = req.body;

    try {
      // Save the invitation in the database
      const invitation = await prisma.invitation.create({
        data: {
          invitorUserId: invitorUserId, // The Clerk ID from the referral code
          invitedUserId: userId, // The Clerk ID of the logged-in user
        },
      });
      return res.status(201).json(invitation);
    } catch (error) {
      console.error("Error saving invitation:", error);
      return res.status(500).json({ message: 'Error saving invitation' });
    }
  }

  // Handle any other HTTP methods
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
