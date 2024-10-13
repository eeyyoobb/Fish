// pages/api/wallet/update.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { clerkId, role, amount } = req.body; // Get userId, role, and amount to add

    if (!clerkId || !role || !amount) {
      return res.status(400).json({ error: 'User ID, role, and amount are required' });
    }

    try {
      if (role === 'admin') {
        await prisma.admin.update({
          where: { id: String(clerkId) },
          data: {
            wallet: {
              increment: Number(amount), // Increment wallet by the given amount
            },
          },
        });
      } else if (role === 'child') {
        await prisma.child.update({
          where: { id: String(clerkId) },
          data: {
            wallet: {
              increment: Number(amount),
            },
          },
        });
      } else if (role === 'creator') {
        await prisma.creator.update({
          where: { id: String(clerkId) },
          data: {
            wallet: {
              increment: Number(amount),
            },
          },
        });
      } else if (role === 'parent') { // Fixed the role string from '/parent' to 'parent'
        await prisma.parent.update({
          where: { id: String(clerkId) },
          data: {
            wallet: {
              increment: Number(amount),
            },
          },
        });
      } else {
        return res.status(400).json({ error: 'Invalid role' });
      }

      return res.status(200).json({ message: 'Wallet updated successfully' });
    } catch (error) {
      console.error("Error updating wallet:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
