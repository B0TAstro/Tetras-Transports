// app/page.tsx

import { getSections } from '@/sanity/sanity.query';
import type { SectionType } from '@/types';

import HeroSection from './components/sections/HeroSection';
import WhoSection from './components/sections/WhoSection';
import ServicesSection from './components/sections/ServicesSection';
import MapSection from './components/sections/MapSection';

const sectionComponents: Record<string, React.FC<any>> = {
  hero: HeroSection,
  who: WhoSection,
  services: ServicesSection,
  map: MapSection,
};

export default async function Home() {
  const sections: SectionType[] = await getSections();

  const orderedSections = sections.sort((a, b) => {
    const order = ['hero', 'who', 'services', 'map'];
    return order.indexOf(a._type) - order.indexOf(b._type);
  });

  return (
    <main>
      {orderedSections.map((section) => {
        const SectionComponent = sectionComponents[section._type];
        return SectionComponent ? (
          <section key={section._id} id={section._type}>
            <SectionComponent data={section} />
          </section>
        ) : null;
      })}
    </main>
  );
}