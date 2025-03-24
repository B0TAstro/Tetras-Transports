// types/index.ts

export type HeroType = {
  _id: string;
  _type: "hero";
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
  _type: "who";
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
  image1: {
    alt: string;
    image: string;
  };
  image2: {
    alt: string;
    image: string;
  };
};

export type MapType = {
  _id: string;
  _type: "map";
  title: string;
  imageMap: {
    alt: string;
    image: string;
  };
};

export type ServicesType = {
  _id: string;
  _type: "services";
  title: string;
  listServices: Array<{
    _key: string;
    titre: string;
    serviceTexte: Array<{
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
    imageService: {
      alt: string;
      image: string;
    };
  }>;
  boutonContact: string;
};

export type ValuesType = {
  _id: string;
  _type: "values";
  title: string;
  listvalues: Array<{
    _key: string;
    imageValue: {
      alt: string;
      image: string;
    };
    titre: string;
  }>;
};

export type SectionType = HeroType | WhoType | MapType | ServicesType | ValuesType;