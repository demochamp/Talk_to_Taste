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

    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters long' };
    }

    email = email.toLowerCase().trim();

    try {
        const client = await Promise.race([
            clientPromise,
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Database connection timeout")), 4000))
        ]);
        const db = client.db();

        // Check if user exists
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            if (!existingUser.password) {
                return { error: 'This email is linked to Google/GitHub. Please sign in with those buttons.' };
            }
            return { error: 'An account with this email already exists. Please Sign In.' };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await db.collection('users').insertOne({
            email,
            password: hashedPassword,
            name: email.split('@')[0], // Default name from email
            image: null,
            role: email === 'choudharykhushi499@gmail.com' ? 'admin' : 'user', // Set admin role for owner email
            createdAt: new Date(),
        });

        // Notify Admin of new registration (Non-blocking)
        sendAdminNotification(email, 'Manual Registration').catch(console.error);

        return { success: true };
    } catch (error) {
        console.error('Registration error:', error);
        return { error: 'Database service is currently updating. Please use Google or GitHub sign-in.' };
    }
}
