// api/send-email/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import sgMail from '@sendgrid/mail';

const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    useCdn: false,
    token: process.env.SANITY_ACCESS_TOKEN
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
    try {
        const formData = await request.json();

        // Vérification de la configuration du formulaire dans Sanity
        const contactFormConfigs = await sanityClient.fetch(`
            *[_type == "contactForm"]{
                recipientEmail,
                formName,
                formFields
            }
        `);

        if (!contactFormConfigs || contactFormConfigs.length === 0) {
            console.error('Aucune configuration de formulaire trouvée dans Sanity');
            return NextResponse.json(
                { message: 'Configuration du formulaire non trouvée' },
                { status: 500 }
            );
        }

        const contactFormConfig = contactFormConfigs[0];

        if (!contactFormConfig.recipientEmail) {
            console.error('Email destinataire non configuré dans Sanity');
            return NextResponse.json(
                { message: 'Email destinataire non configuré dans Sanity' },
                { status: 500 }
            );
        }

        // Normalisation des noms de champs
        const normalizeFieldName = (name: string) =>
            name.toLowerCase().replace(/\s+/g, '');

        const nom = formData.nom || formData.lastname || formData.nom_de_famille || 'Non spécifié';
        const prenom = formData.prénom || formData.prenom || formData.firstname || 'Non spécifié';
        const email = formData.email || formData.mail || formData.courriel || 'Non spécifié';
        const sujet = formData.sujet || formData.subject || formData.object || 'Autre';

        const textareaField = contactFormConfig.formFields.find(
            (field: { fieldName: string, fieldType: string }) => field.fieldType === "textarea"
        );

        const fieldKey = textareaField ? normalizeFieldName(textareaField.fieldName) : '';
        const contenu = fieldKey && formData[fieldKey] ? formData[fieldKey] : 'Aucun contenu fourni';

        const htmlContent = `
            <p>Bonjour,</p>
            <p>Vous avez reçu un nouveau message depuis votre formulaire de contact du site de <strong>Tetras Transport</strong> :</p>
            <br><hr><br>
            <p><strong>De la part de :</strong> ${prenom} ${nom}</p>
            <p><strong>Objet :</strong> ${sujet}</p>
            <p><strong>Message :</strong></p>
            <blockquote style="background:#f3f3f3; padding:10px; border-left:4px solid #007bff;">${contenu}</blockquote>
            <br><hr><br>
            <p>Vous pouvez répondre à cette personne via cet e-mail --> <a href="mailto:${email}">${email}</a></p>
        `;

        // Envoi de l'email
        try {
            await sgMail.send({
                to: contactFormConfig.recipientEmail,
                from: process.env.EMAIL_FROM!,
                subject: `Nouveau message du formulaire de contact - ${sujet}`,
                html: htmlContent,
                replyTo: email !== 'Non spécifié' ? email : undefined
            });

            return NextResponse.json({ message: 'Email envoyé avec succès ✅' }, { status: 200 });
        } catch (emailError) {
            console.error('Erreur lors de l\'envoi de l\'email via SendGrid:', emailError);
            return NextResponse.json({
                message: 'Erreur lors de l\'envoi de l\'email',
                error: emailError instanceof Error ? emailError.message : 'Erreur d\'envoi inconnue'
            }, { status: 500 });
        }

    } catch (error) {
        console.error('❌ Erreur lors du traitement de la requête:', error);
        return NextResponse.json({
            message: 'Erreur lors du traitement de la requête',
            error: error instanceof Error ? error.message : 'Erreur inconnue'
        }, { status: 500 });
    }
}