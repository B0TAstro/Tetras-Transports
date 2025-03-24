// components/ValuesSection.tsx

import Image from 'next/image';
import { getValues } from '@/sanity/sanity.query';
import type { ValuesType } from '@/types';
import type { JSX } from 'react';

export default async function ValuesSection(): Promise<JSX.Element> {
  const valuesData: ValuesType[] = await getValues();

  // console.log("valuesData:", valuesData);

  return (
    <>
      {valuesData.length > 0 &&
        valuesData.map((data) => (
          <section key={data._id} id="values" className="relative font-inter text-center justify-center items-center text-dark-100 pr-20 pl-20 mt-45">
            <div className="w-full">
              <h2 className="text-5xl font-bold max-w-[75%] mx-auto">{data.title}</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-38">
                {data.listvalues && data.listvalues.map((value) => (
                  <div key={value._key} className="flex flex-col items-center text-center">
                    {value.imageValue && value.imageValue.image && (
                      <div className="w-20 h-20 mb-2 relative">
                        <Image
                          src={value.imageValue.image}
                          alt={value.imageValue.alt || value.titre}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold">{value.titre}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))
      }
    </>
  );
}