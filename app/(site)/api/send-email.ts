import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';
import nodemailer from 'nodemailer';

// Sanity Client Configuration
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2025-03-17',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN
});

// Create Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // Use TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Fetch recipient email from Sanity
        const [contactFormConfig] = await sanityClient.fetch(`
            *[_type == "contactForm"]{
                recipientEmail
            }
        `);

        if (!contactFormConfig || !contactFormConfig.recipientEmail) {
            return res.status(500).json({ message: 'Recipient email not configured' });
        }

        const { 
            nom, 
            prenom, 
            mail, 
            sujet, 
            details 
        } = req.body;

        // Send Email
        await transporter.sendMail({
            from: process.env.SMTP_FROM_EMAIL, // Your verified sender email
            to: contactFormConfig.recipientEmail,
            subject: `Nouveau message de contact: ${sujet}`,
            html: `
                <h2>Nouveau Message de Contact</h2>
                <p><strong>Nom:</strong> ${nom} ${prenom}</p>
                <p><strong>Email:</strong> ${mail}</p>
                <p><strong>Sujet:</strong> ${sujet}</p>
                <p><strong>Détails:</strong></p>
                <p>${details}</p>
            `
        });

        return res.status(200).json({ message: 'Email envoyé avec succès !' });
    } catch (error) {
        console.error('Email submission error:', error);
        return res.status(500).json({ 
            message: 'Erreur lors de l\'envoi de l\'email', 
            error: error instanceof Error ? error.message : 'Erreur inconnue' 
        });
    }
}

export const config = {
    api: {
        bodyParser: true
    }
};