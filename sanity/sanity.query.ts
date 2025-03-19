// sanity/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getHero() {
  const data = await client.fetch(
    groq`*[_type == "hero"]{
      _id,
      title,
      catchphrase,
      backgroundImage {alt, "image": asset->url},
      testimonialsIntro,
      testimonials[]{
        quote,
        author
      }
    }`
  );
  console.log("Hero Data:", data); // Ajoute ceci pour vérifier les données reçues
  return data;
}
