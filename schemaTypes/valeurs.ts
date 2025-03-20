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
            title: "Titre",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ],
};

export default values;