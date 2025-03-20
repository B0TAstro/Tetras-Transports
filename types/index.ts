// types/index.ts

export type HeroType = {
  _id: string;
  title: string;
  catchphrase: string;
  backgroundImage: {
    alt: string;
    image: string;
  };
  testimonialsIntro: Array<{
    _key: string;
    _type: "block";
    style?: string;
    children: Array<{
      _key: string;
      _type: "span";
      text: string;
      marks: string[];
    }>;
  }>;
  testimonials: {
    quote: string;
    author: string;
  }[];
};

export type WhoType = {
  _id: string;
  title: string;
  whoTexte: Array<{
    _key: string;
    _type: "block";
    style?: string;
    children: Array<{
      _key: string;
      _type: "span";
      text: string;
      marks: string[];
    }>;
  }>;
  Image1: {
    alt: string;
    image: string;
  };
  Image2: {
    alt: string;
    image: string;
  };
};