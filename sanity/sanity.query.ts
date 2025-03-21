// sanity/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getSections() {
  return client.fetch(
    groq`*[_type in ["hero", "who", "services", "map"]] | order(_type asc){
      _id,
      _type,
      title,
      catchphrase,
      backgroundImage {alt, "image": asset->url},
      testimonialsIntro,
      "testimonials": testimonials[] {
        quote,
        author
      },
      whoTexte,
      image1 {alt, "image": asset->url},
      image2 {alt, "image": asset->url},
      imageMap {alt, "image": asset->url},
      services[]{
        _key,
        titre,
        serviceTexte[]{
          _key,
          _type,
          style,
          children[]{
            _key,
            _type,
            text,
            marks
          }
        },
      },
      boutonContact
    }`
  );
}

export async function getHero() {
  return client.fetch(
    groq`*[_type == "hero"]{
      _id,
      _type,
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
    groq`*[_type == "who"]{
      _id,
      _type,
      title,
      whoTexte,
      image1 {alt, "image": asset->url},
      image2 {alt, "image": asset->url}
    }`
  );
}

export async function getMap() {
  return client.fetch(
    groq`*[_type == "map"]{
      _id,
      _type,
      title,
      imageMap {alt, "image": asset->url}
    }`
  );
}

export async function getServices() {
  return client.fetch(
    groq`*[_type == "services"]{
      _id,
      _type,
      listServices[]{
        _key,
        titre,
        serviceTexte[]{
          _key,
          _type,
          style,
          children[]{
            _key,
            _type,
            text,
            marks
          }
        },
        image { alt, "image": asset->url }
      },
      boutonContact
    }`
  );
}
