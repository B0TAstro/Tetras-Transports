// api/send-email/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import sgMail from '@sendgrid/mail';

const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2025-03-17',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
    try {
        const formData = await request.json();
        // console.log("🔍 Données reçues dans l'API :", formData);

        const [contactFormConfig] = await sanityClient.fetch(`
            *[_type == "contactForm"]{
                recipientEmail,
                formName,
                formFields
            }
        `);
        if (!contactFormConfig || !contactFormConfig.recipientEmail) {
            return NextResponse.json(
                { message: 'Email destinataire non configuré dans Sanity' },
                { status: 500 }
            );
        }

        const nom = formData.nom || formData.lastname || 'Non spécifié';
        const prenom = formData.prénom || formData.firstname || 'Non spécifié';
        const email = formData.email || formData.mail || 'Non spécifié';
        const sujet = formData.sujet || formData.object || 'Autre';
        
        const textareaField = contactFormConfig.formFields.find(
            (field: { fieldName: string, fieldType: string }) => field.fieldType === "textarea"
        );
                const normalizeFieldName = (name: string) => 
            name.toLowerCase().replace(/\s+/g, '');
        const fieldKey = textareaField ? normalizeFieldName(textareaField.fieldName) : '';
        const contenu = fieldKey && formData[fieldKey] ? formData[fieldKey] : 'Aucun contenu fourni';
                
        const htmlContent = `
            <p>Bonjour,</p>
            <p>Vous avez reçu un nouveau message depuis votre formulaire de contact du site de <strong>Tetras Transport</strong> :</p>
            <br><hr><br>
            <p><strong>De la part de :</strong> ${nom} ${prenom}</p>
            <p><strong>Objet :</strong> ${sujet}</p>
            <p><strong>Message :</strong></p>
            <blockquote style="background:#f3f3f3; padding:10px; border-left:4px solid #007bff;">${contenu}</blockquote>
            <br><hr><br>
            <p>Vous pouvez répondre à cette personne via cet e-mail --> <a href="mailto:${email}">${email}</a></p>
        `;

        await sgMail.send({
            to: contactFormConfig.recipientEmail,
            from: process.env.EMAIL_FROM as string,
            subject: `Nouveau message du formulaire de contact - ${sujet}`,
            html: htmlContent,
            replyTo: email !== 'Non spécifié' ? email : undefined
        });

        return NextResponse.json({ message: 'Email envoyé avec succès ✅' }, { status: 200 });

    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
        return NextResponse.json({
            message: 'Erreur lors de l\'envoi de l\'email',
            error: error instanceof Error ? error.message : 'Erreur inconnue'
        }, { status: 500 });
    }
}