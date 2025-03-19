"use client";

import { useEffect, useState } from "react";
import { getHero } from "@/sanity/sanity.query";
import type { HeroType } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Home() {
  const [heroData, setHeroData] = useState<HeroType[]>([]);
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getHero();
        setHeroData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        setHeroData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <main>
      {heroData.length > 0 ? (
        heroData.map((hero) => (
          <section key={hero._id}>
            <div>
              <h1>{hero.title}</h1>
              <p>{hero.catchphrase}</p>
              {hero.backgroundImage && (
                <img src={hero.backgroundImage.image} alt={hero.backgroundImage.alt} />
              )}
            </div>

            <div>
              <h2>{hero.testimonialsIntro}</h2>

              {hero.testimonials && hero.testimonials.length > 0 ? (
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  loop={hero.testimonials.length > 1} // ✅ Désactive loop si 1 seul témoignage
                  onSwiper={setSwiperRef}
                  onMouseEnter={() => swiperRef?.autoplay?.stop()}
                  onMouseLeave={() => swiperRef?.autoplay?.start()}
                >
                  {hero.testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                      <blockquote>"{testimonial.quote}"</blockquote>
                      {testimonial.author && <cite>- {testimonial.author}</cite>}
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p>Aucun témoignage disponible.</p>
              )}
            </div>
          </section>
        ))
      ) : (
        <p>Aucune donnée disponible.</p>
      )}
    </main>
  );
}