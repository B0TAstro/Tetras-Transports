// schemas/valeurs.ts

import { defineField, defineArrayMember } from "sanity";
import { BiStar } from "react-icons/bi";

const values = {
    name: "values",
    title: "Valeurs - Section",
    type: "document",
    icon: BiStar,
    fields: [
        defineField({
            name: "title",
            title: "Titre de la section",
            type: "string",
            validation: (Rule) => Rule.required(),
            description: "Le titre principal de la section 'Valeurs'",
        }),
        defineField({
            name: "listvalues",
            title: "Valeurs",
            description: "Liste des différentes valeurs mise en avant",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "imageValue",
                            title: "Icon ou Image de la valeur",
                            type: "image",
                            description: "Icon ou image représentant la valeur",
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
                        { name: "titre", title: "Titre de la valeur", type: "string" },
                    ],
                },
            ],
        }),

    ],
};

export default values;