// components/MapSection.tsx

import Image from 'next/image';
import { getMap } from '@/lib/sanity.query';
import type { MapType } from '@/types';
import type { JSX } from 'react';

export default async function WhoSection(): Promise<JSX.Element> {
    const mapData: MapType[] = await getMap();

    // console.log("MapData:", mapData);

    return (
        <>
            {mapData.length > 0 &&
                mapData.map((data) => (
                    <section key={data._id} id="map" className="relative font-inter text-dark-100 pr-5 pl-5 md:pr-20 md:pl-20 mt-24 md:mt-62 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-5 overflow-x-hidden">
                        <Image
                            src={data.imageMap.image}
                            alt={data.imageMap.alt}
                            width={350}
                            height={350}
                            sizes="(max-width: 1024px) 40vw, 600px"
                            className="shrink-0 aspect-square object-cover max-w-[600px]"                        />
                        <h2 className="text-center md:text-left text-2xl md:text-5xl font-bold md:max-w-[50%]">{data.title}</h2>
                    </section>
                ))}
        </>
    );
}
