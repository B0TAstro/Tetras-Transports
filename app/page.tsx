// app/page.tsx

export const revalidate = 60;

import HeroSection from './components/sections/HeroSection';
import WhoSection from './components/sections/WhoSection';
import ServicesSection from './components/sections/ServicesSection';
import ValuesSection from './components/sections/ValuesSection';
import MapSection from './components/sections/MapSection';
import ContactSection from './components/sections/ContactSection';

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <WhoSection />
      <ServicesSection />
      <ValuesSection />
      <MapSection />
      <ContactSection />
    </main>
  );
}