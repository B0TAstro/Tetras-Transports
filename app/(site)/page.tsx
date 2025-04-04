// app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { getSections } from '@/sanity/sanity.query';
import type { SectionType } from '@/types';

import HeroSection from './components/sections/HeroSection';
import WhoSection from './components/sections/WhoSection';
import ServicesSection from './components/sections/ServicesSection';
import MapSection from './components/sections/MapSection';
import ValuesSection from './components/sections/ValuesSection';
import ContactSection from './components/sections/ContactSection';

const sectionComponents: Record<string, React.FC<{ data: SectionType }>> = {
  hero: HeroSection,
  who: WhoSection,
  services: ServicesSection,
  values: ValuesSection,
  map: MapSection,
  contact: ContactSection,
};

export default function Home() {
  const [sections, setSections] = useState<SectionType[]>([]);
  
  useEffect(() => {
    const fetchSections = async () => {
      const fetchedSections = await getSections();
      const orderedSections = fetchedSections.sort((a: SectionType, b: SectionType) => {
        const order = ['hero', 'who', 'services', 'values', 'map', 'contact'];
        return order.indexOf(a._type) - order.indexOf(b._type);
      });
      setSections(orderedSections);
    };
    
    fetchSections();
  }, []);

  return (
    <main>
      {sections.map((section) => {
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