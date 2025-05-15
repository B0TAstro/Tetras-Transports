// components/ServicesSection.tsx

import Image from 'next/image';
import { PortableText } from "@portabletext/react";
import { getServices } from '@/lib/sanity.query';
import type { ServicesType } from '@/types';
import type { JSX } from 'react';

export default async function ServicesSection(): Promise<JSX.Element> {
    const servicesData: ServicesType[] = await getServices();

    // console.log("ServicesData:", servicesData);

    return (
        <>
            {servicesData.length > 0 &&
                servicesData.map((data) => (
                    <section key={data._id} id="services" className="relative font-inter text-dark-100 pr-5 pl-5 md:pr-20 md:pl-20 mt-25 md:mt-60">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {data.listServices.map((service) => (
                                <div
                                    key={service._key}
                                    className="relative overflow-hidden rounded-sm shadow-lg group h-100"
                                >
                                    <div className="absolute inset-0">
                                        <Image
                                            src={service.imageService.image}
                                            alt={service.imageService.alt || service.titre}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority
                                            className="object-cover transition-transform duration-250 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
                                    </div>
                                    <div className="relative h-full flex flex-col justify-end self-stretch p-6 gap-3 text-white">
                                        <h3 className="text-[24px] font-bold">{service.titre}</h3>
                                        <div className="text-[16px]">
                                            <PortableText value={service.serviceTexte} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 md:mt-13 text-center">
                            <a
                                href="#contact"
                                className="inline-block text-lg font-medium pr-3 pl-3 pb-2 pt-2 rounded-sm duration-250 border border-dark hover:text-blue-700 hover:border-blue-700"
                            >
                                {data.boutonContact}
                            </a>
                        </div>
                    </section>
                ))}
        </>
    );
}