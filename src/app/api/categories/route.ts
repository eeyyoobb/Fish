// pages/api/categories.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
    // Fetch all categories from the database
    const categories = await prisma.category.findMany({
    });

        return NextResponse.json(categories);
        } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
