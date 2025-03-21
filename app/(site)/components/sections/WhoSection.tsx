// components/WhoSection.tsx

import Image from 'next/image';
import { PortableText } from "@portabletext/react";
import { getWho } from '@/sanity/sanity.query';
import type { WhoType } from '@/types';
import type { JSX } from 'react';

export default async function WhoSection(): Promise<JSX.Element> {
    const whoData: WhoType[] = await getWho();

    // console.log("WhoData:", whoData);

    return (
        <>
            {whoData.length > 0 &&
                whoData.map((data) => (
                    <section key={data._id} id="who" className="relative font-inter text-dark-100 pr-20 pl-20">
                        <h2 className="text-left text-5xl font-bold max-w-200">{data.title}</h2>
                        <div className="flex justify-between gap-5">
                            <div className="flex gap-5 shrink-0">
                                {data.image2?.image && (
                                    <Image
                                        src={data.image2.image}
                                        alt={data.image2.alt}
                                        width={300}
                                        height={300}
                                        className="rounded-sm aspect-square shrink-0 pt-50"
                                    />
                                )}
                                {data.image1?.image && (
                                    <Image
                                        src={data.image1.image}
                                        alt={data.image1.alt}
                                        width={500}
                                        height={500}
                                        className="rounded-sm aspect-square shrink-0 pb-16"
                                    />
                                )}
                            </div>
                            <div className="font-medium text-base flex flex-col justify-end max-w-[40%] gap-3 mb-16">
                                <PortableText value={data.whoTexte} />
                            </div>
                        </div>
                    </section>
                ))}
        </>
    );
}
