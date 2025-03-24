// components/ValuesSection.tsx

import Image from 'next/image';
import { getValues } from '@/sanity/sanity.query';
import type { ValuesType } from '@/types';
import type { JSX } from 'react';

export default async function ValuesSection(): Promise<JSX.Element> {
    const valuesData: ValuesType[] = await getValues();

    console.log("valuesData:", valuesData);

    return (
        <>
            {valuesData.length > 0 &&
                valuesData.map((data) => (
                    <section key={data._id} id="map" className="relative font-inter text-dark-100 pr-20 pl-20 mt-45">
                        <h2 className="text-left text-5xl font-bold w-200">{data.title}</h2>
                        <div>
                            <img src="" alt="" />
                            <h3>{}</h3>
                        </div>
                    </section>
                ))}
        </>
    );
}
