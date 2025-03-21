// components/ServicesSection.tsx

import Image from 'next/image';
import { PortableText } from "@portabletext/react";
import { getServices } from '@/sanity/sanity.query';
import type { ServicesType } from '@/types';
import type { JSX } from 'react';

export default async function ServicesSection(): Promise<JSX.Element> {
    const servicesData: ServicesType[] = await getServices();

    console.log("ServicesData:", servicesData);

    return (
        <>
            {servicesData.length > 0 &&
                servicesData.map((data) => (
                    <section key={data._id} id="services" className="relative font-inter text-dark-100 pr-20 pl-20">
                    </section>
                ))}
        </>
    );
}
