import { NextResponse } from 'next/server';

export async function POST(request) {
    const { image } = await request.json();

    // Dummy response, replace with actual API integration
    const labels = ['laptop']; // Example label detected from image

    return NextResponse.json({ labels });
}
