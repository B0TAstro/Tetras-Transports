// app/page.tsx

import { getHero } from '@/sanity/sanity.query';
import type { HeroType } from '@/types';

export default async function Home(): Promise<JSX.Element> {
  const hero: HeroType[] = await getHero();

  return (
    <>
      {hero.length > 0 &&
        hero.map((data) => (
          console.log(hero),
          <section
            key={data._id}
            className="relative flex flex-col items-center text-center text-white py-20 px-6 bg-cover bg-center"
            style={{ backgroundImage: `url(${data.backgroundImage.image})` }}
          >
            <div className="max-w-3xl bg-black bg-opacity-50 p-8 rounded-lg">
              <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
              <p className="text-lg mb-6">{data.catchphrase}</p>
            </div>

            {data.testimonials ? (
              <p>Il y a des témoignages</p>
            ) : (
              <p>Aucun témoignage trouvé</p>
            )}

            {data.testimonials && data.testimonials.length > 0 && (
              <div className="mt-12 max-w-2xl bg-white text-black p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{data.testimonialsIntro}</h2>
                <ul>
                  {data.testimonials.map((testimonial, index) => (
                    <li key={index} className="mb-4">
                      <blockquote className="italic">“{testimonial.quote}”</blockquote>
                      <p className="italic">- {testimonial.author || "Anonyme"}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
    </>
  );
}