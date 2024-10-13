// pages/api/wallet.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { clerkId, role } = req.query;  // Get both userId and role

  if (!clerkId || !role) {
    return res.status(400).json({ error: 'User ID and role are required' });
  }

  try {
    let userWallet;

    if (role === 'admin') {
      userWallet = await prisma.admin.findUnique({
        where: { id: String(clerkId) },
        select: { wallet: true },
      });
    } else if (role === 'child') {
      userWallet = await prisma.child.findUnique({
        where: { id: String(clerkId) },
        select: { wallet: true },
      });
    } else if (role === 'creator') {
      userWallet = await prisma.creator.findUnique({
        where: { id: String(clerkId) },
        select: { wallet: true },
      });
    } else if (role === '/parent') {
      userWallet = await prisma.parent.findUnique({
        where: { id: String(clerkId) },
        select: { wallet: true },
      });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    if (!userWallet) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ wallet: userWallet.wallet });
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
