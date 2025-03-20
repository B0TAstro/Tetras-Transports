// sanity/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getHero() {
  return client.fetch(
    groq`*[_type == "hero"]{
      _id,
      title,
      catchphrase,
      backgroundImage {alt, "image": asset->url},
      testimonialsIntro,
      "testimonials": testimonials[] {
        quote,
        author
      }
    }`
  );
}

export async function getWho() {
  return client.fetch(
    groq`*[_type == "who"][0]{
      _id,
      title,
      whoTexte,
      Image1 {alt, "image": asset->url},
      Image2 {alt, "image": asset->url}
    }`
  );
}