// schemas/contactForm.ts

import { defineField } from "sanity";
import { BiMessageSquareDetail } from "react-icons/bi";

const contactForm = {
    name: "contactForm",
    title: "Formulaire de Contact - Configuration",
    type: "document",
    icon: BiMessageSquareDetail,
    fields: [
        defineField({
            name: "formName",
            title: "Nom du formulaire",
            type: "string",
            validation: (Rule) => Rule.required(),
            description: "Un nom pour identifier ce formulaire dans l'administration",
        }),
        defineField({
            name: "recipientEmail",
            title: "Email de réception",
            type: "string",
            description: "L'adresse email qui recevra les messages du formulaire",
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: "formFields",
            title: "Champs du formulaire",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "fieldName",
                            title: "Nom du champ",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "fieldType",
                            title: "Type de champ",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Texte", value: "text" },
                                    { title: "Email", value: "email" },
                                    { title: "Téléphone", value: "tel" },
                                    { title: "Zone de texte", value: "textarea" },
                                    { title: "Sujet", value: "subject" },
                                ],
                            },
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "required",
                            title: "Obligatoire",
                            type: "boolean",
                            initialValue: false,
                        },
                        {
                            name: "placeholder",
                            title: "Texte indicatif",
                            type: "string",
                        },
                        {
                            name: "options",
                            title: "Options (pour le champ de sélection)",
                            type: "array",
                            of: [{ type: "string" }],
                            hidden: ({ parent }) => parent?.fieldType !== "subject",
                        },
                    ],
                    preview: {
                        select: {
                            title: "fieldName",
                            subtitle: "fieldType",
                        },
                    },
                },
            ],
            description: "Configurez les champs du formulaire de contact",
        }),
        defineField({
            name: "submitButtonText",
            title: "Texte du bouton d'envoi",
            type: "string",
            initialValue: "Envoyer",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "successMessage",
            title: "Message de succès",
            type: "text",
            initialValue: "Merci pour votre message. Nous vous répondrons dans les plus brefs délais.",
            description: "Message à afficher lorsque le formulaire est envoyé avec succès",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "errorMessage",
            title: "Message d'erreur",
            type: "text",
            initialValue: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
            description: "Message à afficher en cas d'erreur lors de l'envoi du formulaire",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "formName",
            subtitle: "recipientEmail",
        },
    },
};

export default contactForm;