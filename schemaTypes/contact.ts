// schemas/contact.ts

import { defineField } from "sanity";
import { BiEnvelope } from "react-icons/bi";

const contact = {
    name: "contact",
    title: "Contact - Section",
    type: "document",
    icon: BiEnvelope,
    fields: [
        defineField({
            name: "title",
            title: "Titre",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "subtitle",
            title: "Sous-titre",
            type: "string",
            description: "Un sous-titre optionnel pour la section contact",
        }),
        defineField({
            name: "phone",
            title: "Numéro de téléphone",
            type: "string",
            description: "Le numéro de téléphone de contact",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Adresse email",
            type: "string",
            description: "L'adresse email de contact",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "socialLinks",
            title: "Réseaux sociaux",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "platform",
                            title: "Plateforme",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Facebook", value: "facebook" },
                                    { title: "Instagram", value: "instagram" },
                                    { title: "LinkedIn", value: "linkedin" },
                                    { title: "Twitter", value: "twitter" },
                                    { title: "WhatsApp", value: "whatsapp" },
                                    { title: "TikTok", value: "tiktok" },
                                ],
                            },
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "url",
                            title: "URL",
                            type: "url",
                            validation: (Rule) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            title: "platform",
                            subtitle: "url",
                        },
                    },
                },
            ],
            description: "Ajoutez vos liens de réseaux sociaux",
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
                            hidden: ({ parent }) => parent?.fieldType !== "select",
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
    ],
};

export default contact;