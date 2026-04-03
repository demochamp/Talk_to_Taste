'use server';

import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/db';
import { sendAdminNotification } from '@/lib/mail';

export async function registerUser(formData: FormData) {
    let email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Email and password are required' };
    }

    email = email.toLowerCase().trim();

    try {
        const client = await clientPromise;
        const db = client.db();

        // Check if user exists
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            if (!existingUser.password) {
                return { error: 'This email is linked to a Google/GitHub account. Please sign in with those instead.' };
            }
            return { error: 'An account with this email already exists.' };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await db.collection('users').insertOne({
            email,
            password: hashedPassword,
            name: email.split('@')[0], // Default name from email
            image: null,
            role: 'user', // Default role
            createdAt: new Date(),
        });

        // Notify Admin of new registration (Non-blocking)
        sendAdminNotification(email, 'Manual Registration').catch(console.error);

        return { success: true };
    } catch (error) {
        console.error('Registration error:', error);
        return { error: 'Database error. Please try again later.' };
    }
}
