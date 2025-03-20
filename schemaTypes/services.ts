// schemas/services.ts

import { defineField, defineArrayMember } from "sanity";
import { LuTruck } from "react-icons/lu";

const services = {
    name: "services",
    title: "Services - Section",
    type: "document",
    icon: LuTruck,
    fields: [
        defineField({
            name: "title",
            title: "Titre de la section",
            type: "string",
            validation: (Rule) => Rule.required(),
            description: "Le titre principal de la section 'Services'",
        }),
    ],
};

export default services;