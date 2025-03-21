// components/MapSection.tsx

import Image from 'next/image';
import { getMap } from '@/sanity/sanity.query';
import type { MapType } from '@/types';
import type { JSX } from 'react';

export default async function WhoSection(): Promise<JSX.Element> {
    const mapData: MapType[] = await getMap();

    // console.log("MapData:", mapData);

    return (
        <>
            {mapData.length > 0 &&
                mapData.map((data) => (
                    <section key={data._id} id="map" className="relative font-inter text-dark-100 pr-20 pl-20 flex justify-between items-center gap-5">
                        <Image
                            src={data.imageMap.image}
                            alt={data.imageMap.alt}
                            width={500}
                            height={500}
                            className="spect-square shrink-0"
                        />
                        <h2 className="text-left text-5xl font-bold w-200">{data.title}</h2>
                    </section>
                ))}
        </>
    );
}
