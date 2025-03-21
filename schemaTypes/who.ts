// schemas/who.ts

import { defineField } from "sanity";
import { BiUser } from "react-icons/bi";

const who = {
    name: "who",
    title: "Qui sommes-nous ? - Section",
    type: "document",
    icon: BiUser,
    fields: [
        defineField({
            name: "title",
            title: "Titre de la section",
            type: "string",
            validation: (Rule) => Rule.required(),
            description: "Le titre principal de la section 'Qui sommes-nous ?'",
        }),
        defineField({
            name: "whoTexte",
            title: "Texte de présentation",
            type: "array",
            description: "Texte détaillant la section 'Qui sommes-nous ?'",
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
            name: "image1",
            title: "Première Image",
            type: "image",
            description: "La première image illustrant la section",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Texte Alternatif",
                    type: "string",
                    description: "Texte alternatif pour la première image",
                },
            ],
        }),
        defineField({
            name: "image2",
            title: "Deuxième Image",
            type: "image",
            description: "La deuxième image illustrant la section",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Texte Alternatif",
                    type: "string",
                    description: "Texte alternatif pour la deuxième image",
                },
            ],
        }),
    ],
};

export default who;