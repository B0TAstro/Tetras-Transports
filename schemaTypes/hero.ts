// schemas/hero.ts

import { defineField, defineArrayMember } from "sanity";
import { BiHomeAlt } from "react-icons/bi";

const hero = {
    name: "hero",
    title: "Hero Section",
    type: "document",
    icon: BiHomeAlt,
    fields: [
        defineField({
            name: "title",
            title: "Titre",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "catchphrase",
            title: "Phrase d'accroche",
            type: "string",
            description: "Décrivez votre activité en une phrase engageante.",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "backgroundImage",
            title: "Image de fond",
            type: "image",
            description: "Image de fond pour la section hero",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Texte alternatif",
                    type: "string",
                },
            ],
        }),
        defineField({
            name: "testimonialsIntro",
            title: "Introduction section des avis clients",
            type: "array",
            description: "Texte d’introduction de la section des avis clients.",
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
            description: "Ajoutez jusqu'à 15 avis clients maximum.",
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
                        },
                        {
                            name: "author",
                            title: "Auteur",
                            type: "string",
                        },
                    ],
                }),
            ],
        }),
    ],
};

export default hero;