// schemas/map.ts

import { defineField, defineArrayMember } from "sanity";
import { BiMap } from "react-icons/bi";

const map = {
    name: "map",
    title: "Map - Section",
    type: "document",
    icon: BiMap,
    fields: [
        defineField({
            name: "title",
            title: "Titre",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ],
};

export default map;