// schemas/contact.ts

import { defineField, defineArrayMember } from "sanity";
import { TiContacts } from "react-icons/ti";

const contact = {
    name: "contact",
    title: "Contact - Section",
    type: "document",
    icon: TiContacts,
    fields: [
        defineField({
            name: "title",
            title: "Titre",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ],
};

export default contact;