// schemas/services.ts

import { defineField } from "sanity";
import { LuTruck } from "react-icons/lu";

const services = {
    name: "services",
    title: "Services - Section",
    type: "document",
    icon: LuTruck,
    fields: [
        defineField({
            name: "title",
            title: "Titre",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "listServices",
            title: "Services",
            description: "Liste des services proposés",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "titre", title: "Titre du service", type: "string" },
                        {
                            name: "serviceTexte",
                            title: "Texte du service",
                            type: "array",
                            description: "Texte détaillant le service",
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
                        },
                        {
                            name: "imageService",
                            title: "Image de fond",
                            type: "image",
                            description: "Image qui représente le service",
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: "alt",
                                    title: "Texte Alternatif",
                                    type: "string",
                                    description: "Texte alternatif pour l'image",
                                },
                            ],
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: "boutonContact",
            title: "Texte du bouton de contact",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ],
};

export default services;