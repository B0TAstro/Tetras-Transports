// types/index.ts

export type HeroType = {
    _id: string;
    title: string;
    catchphrase: string;
    backgroundImage: {
      alt: string;
      image: string;
    };
    testimonialsIntro: string;
    testimonials: {
      quote: string;
      author: string;
    }[];
  };
  