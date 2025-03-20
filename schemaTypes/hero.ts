// schemas/hero.ts

import { defineField, defineArrayMember } from "sanity";
import { BiHomeAlt } from "react-icons/bi";

const hero = {
    name: "hero",
    title: "Héro - Section",
    type: "document",
    icon: BiHomeAlt,
    fields: [
        defineField({
            name: "title",
            title: "Titre de la section",
            type: "string",
            validation: (Rule) => Rule.required(),
            description: "Le titre principal de la section 'Héro'",
        }),
        defineField({
            name: "catchphrase",
            title: "Phrase d'Accroche",
            type: "string",
            description: "Une phrase engageante qui décrit votre activité",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "backgroundImage",
            title: "Image de Fond",
            type: "image",
            description: "L'image de fond pour la section 'Héro'",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Texte Alternatif",
                    type: "string",
                    description: "Texte alternatif pour l'image de fond",
                },
            ],
        }),
        defineField({
            name: "testimonialsIntro",
            title: "Introduction des Avis Clients",
            type: "array",
            description: "Texte d’introduction pour la section des avis clients",
            validation: (Rule) => Rule.required(),
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                    marks: {
                        decorators: [
                            { title: "Gras", value: "strong" },
                            { title: "Italique", value: "em" },
                        ],
                    },
                },
            ],
        }),
        defineField({
            name: "testimonials",
            title: "Avis Clients",
            type: "array",
            description: "Ajoutez jusqu'à 15 avis clients maximum",
            validation: (Rule) => Rule.max(15),
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        {
                            name: "quote",
                            title: "Avis",
                            type: "text",
                            validation: (Rule) => Rule.required().max(200),
                            description: "Le texte de l'avis du client (max 200 caractères)",
                        },
                        {
                            name: "author",
                            title: "Auteur de l'Avis",
                            type: "string",
                            description: "Le nom de l'auteur de l'avis",
                        },
                    ],
                }),
            ],
        }),
    ],
};

export default hero;