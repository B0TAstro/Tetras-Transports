// components/WhoSection.tsx

import Image from 'next/image';
import { PortableText } from "@portabletext/react";
import { getWho } from '@/sanity/sanity.query';
import type { WhoType } from '@/types';
import type { JSX } from 'react';

export default async function WhoSection(): Promise<JSX.Element> {
    console.log('Rendering WhoSection')

    const whoData: WhoType[] = await getWho();

    // console.log("WhoData:", whoData);

    return (
        <>
            {whoData.length > 0 &&
                whoData.map((data) => (
                    <section key={data._id} id="who" className="relative font-inter text-dark-100 pr-5 pl-5 md:pr-20 md:pl-20">
                        <h2 className="text-left text-[24px] lg:text-5xl font-bold max-w-full lg:max-w-[50%] mb-[-5px]">
                            {data.title}
                        </h2>

                        <div className="flex flex-col lg:flex-row justify-between max-w-full gap-8 lg:gap-5 overflow-x-hidden">
                            <div className="flex gap-2 md:gap-5 shrink-0 max-w-full">
                                {data.image2?.image && (
                                    <Image
                                        src={data.image2.image}
                                        alt={data.image2.alt}
                                        width={0}
                                        height={0}
                                        sizes="(max-width: 1024px) 40vw, 300px"
                                        className="rounded-sm shrink-0 aspect-square object-cover w-[40vw] max-w-[300px] mt-28 lg:mt-50"
                                    />
                                )}
                                {data.image1?.image && (
                                    <Image
                                        src={data.image1.image}
                                        alt={data.image1.alt}
                                        width={0}
                                        height={0}
                                        sizes="(max-width: 1024px) 50vw, 500px"
                                        className="rounded-sm shrink-0 aspect-square object-cover w-[50vw] max-w-[500px] mb-9 lg:mb-16"
                                    />
                                )}
                            </div>

                            <div className="font-medium text-base flex flex-col justify-end lg:max-w-[40%] gap-3 lg:mb-16">
                                <PortableText value={data.whoTexte} />
                            </div>
                        </div>
                    </section>
                ))}
        </>
    );
}