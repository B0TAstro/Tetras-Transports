// schemas/map.ts

import { defineField } from "sanity";
import { BiMap } from "react-icons/bi";

const map = {
    name: "map",
    title: "Map - Section",
    type: "document",
    icon: BiMap,
    fields: [
        defineField({
            name: "title",
            title: "Titre de la section",
            type: "string",
            validation: (Rule) => Rule.required(),
            description: "Le titre principal de la section 'Map'",
        }),
        defineField({
            name: "imageMap",
            title: "Carte de France",
            type: "image",
            description: "Carte de France illustrant la section",
            validation: (Rule) => Rule.required(),
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Texte Alternatif",
                    type: "string",
                    description: "Texte alternatif pour l'image",
                },
            ],
        }),
    ],
};

export default map;