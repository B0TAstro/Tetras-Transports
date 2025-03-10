// schemas/hero.ts

import { defineField } from "sanity";
import { BiHomeAlt } from "react-icons/bi";

const hero = {
    name: "hero",
    title: "Hero Section",
    type: "document",
    icon: BiHomeAlt,
    fields: [
        defineField({
            name: 'title',
            title: 'Titre',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "catchphrase",
            title: "Phrase d'accroche",
            type: "string",
            description: "En une petite phrase, décrivez votre activité et donnez envie de vous contacter!",
            validation: (Rule) => Rule.required(),
        }),
        {
            name: "backgroundImage",
            title: "Image de fond",
            type: "image",
            description: "Upload une image de fond pour la section hero",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alt",
                    type: "string",
                },
            ],
        },
    ],
};

export default hero;