// components/HeroSection.tsx

import { getHero } from '@/sanity/sanity.query';
import type { HeroType } from '@/types';
import { PortableText } from "@portabletext/react";
import dynamic from 'next/dynamic';
import type { JSX } from 'react';

const TestimonialsSlider = dynamic(() => import('../TestimonialsSlider'));

const components = {
    marks: {
        strong: ({ children }: { children: React.ReactNode }) => <strong className="font-[600]">{children}</strong>,
        em: ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>,
    },
};

export default async function HeroSection(): Promise<JSX.Element> {
    const hero: HeroType[] = await getHero();

    // console.log("heroData:", hero);

    return (
        <>
            {hero.length > 0 &&
                hero.map((data) => (
                    <section
                        key={data._id}
                        className="relative font-inter color-dark-100 flex flex-col items-center text-center pt-87 bg-cover bg-bottom"
                        style={{ backgroundImage: `url("${data.backgroundImage.image}")` }}
                    >
                        <div className="flex w-200 flex-col gap-[24px] items-start">
                            <h1 className="text-center text-7xl font-bold">{data.title}</h1>
                            <p className="text-center text-xl font-normal">{data.catchphrase}</p>
                        </div>

                        <div className="flex w-full flex-col gap-3 items-center mt-45 mb-70">
                            <div className="flex justify-center gap-2 items-end">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                                    <g clipPath="url(#clip0_22_727)">
                                        <path d="M19.0149 21.9167C18.8505 21.9174 18.6884 21.8786 18.5421 21.8037L13.3005 19.0595L8.05879 21.8037C7.88858 21.8932 7.69668 21.9331 7.5049 21.919C7.31311 21.9049 7.12914 21.8372 6.9739 21.7237C6.81865 21.6102 6.69836 21.4555 6.6267 21.277C6.55504 21.0986 6.53488 20.9036 6.56851 20.7142L7.59629 14.9278L3.36184 10.8167C3.22973 10.6849 3.13601 10.5196 3.09075 10.3385C3.04548 10.1574 3.05037 9.96746 3.1049 9.78896C3.16447 9.6063 3.27405 9.44399 3.4212 9.32045C3.56835 9.19692 3.74718 9.11711 3.9374 9.09007L9.79573 8.23701L12.3755 2.96451C12.4596 2.79075 12.591 2.6442 12.7546 2.54166C12.9182 2.43912 13.1074 2.38474 13.3005 2.38474C13.4935 2.38474 13.6827 2.43912 13.8463 2.54166C14.0099 2.6442 14.1413 2.79075 14.2255 2.96451L16.836 8.22674L22.6943 9.07979C22.8846 9.10683 23.0634 9.18664 23.2105 9.31018C23.3577 9.43371 23.4673 9.59602 23.5268 9.77868C23.5814 9.95718 23.5863 10.1472 23.541 10.3282C23.4957 10.5093 23.402 10.6746 23.2699 10.8065L19.0355 14.9176L20.0632 20.704C20.0999 20.8966 20.0807 21.0958 20.0079 21.2779C19.935 21.46 19.8116 21.6175 19.6521 21.7317C19.466 21.8622 19.2419 21.9272 19.0149 21.9167Z" fill="#FCD34D" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_22_727">
                                            <rect width="24.6667" height="24.6667" fill="white" transform="translate(0.966797 0.333344)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="37" viewBox="0 0 38 37" fill="none">
                                    <g clipPath="url(#clip0_22_715)">
                                        <path d="M27.5714 32.375C27.3249 32.376 27.0817 32.3178 26.8623 32.2054L18.9998 28.0892L11.1373 32.2054C10.8819 32.3397 10.5941 32.3996 10.3064 32.3784C10.0187 32.3572 9.74278 32.2557 9.50992 32.0855C9.27705 31.9152 9.09661 31.6831 8.98912 31.4154C8.88163 31.1477 8.85139 30.8553 8.90184 30.5712L10.4435 21.8917L4.09184 15.725C3.89367 15.5272 3.75309 15.2793 3.68519 15.0077C3.61729 14.736 3.62463 14.4511 3.70642 14.1833C3.79578 13.9093 3.96014 13.6659 4.18087 13.4806C4.4016 13.2953 4.66985 13.1756 4.95517 13.135L13.7427 11.8554L17.6123 3.94667C17.7385 3.68601 17.9356 3.46619 18.181 3.31238C18.4264 3.15857 18.7101 3.077 18.9998 3.077C19.2894 3.077 19.5731 3.15857 19.8185 3.31238C20.0639 3.46619 20.261 3.68601 20.3873 3.94667L24.3031 11.84L33.0906 13.1196C33.3759 13.1601 33.6442 13.2799 33.8649 13.4652C34.0856 13.6505 34.25 13.8939 34.3393 14.1679C34.4211 14.4357 34.4285 14.7206 34.3606 14.9922C34.2927 15.2638 34.1521 15.5118 33.9539 15.7096L27.6023 21.8762L29.1439 30.5558C29.199 30.8449 29.1701 31.1436 29.0609 31.4168C28.9516 31.69 28.7664 31.9262 28.5273 32.0975C28.2481 32.2931 27.9119 32.3907 27.5714 32.375Z" fill="#FCD34D" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_22_715">
                                            <rect width="37" height="37" fill="white" transform="translate(0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                                    <g clipPath="url(#clip0_22_721)">
                                        <path d="M18.4143 21.9167C18.2499 21.9174 18.0878 21.8786 17.9415 21.8037L12.6999 19.0595L7.4582 21.8037C7.288 21.8932 7.09609 21.9331 6.90431 21.919C6.71253 21.9049 6.52856 21.8372 6.37331 21.7237C6.21807 21.6102 6.09778 21.4555 6.02611 21.277C5.95445 21.0986 5.93429 20.9036 5.96793 20.7142L6.9957 14.9278L2.76126 10.8167C2.62915 10.6849 2.53543 10.5196 2.49016 10.3385C2.44489 10.1574 2.44979 9.96746 2.50431 9.78896C2.56388 9.6063 2.67346 9.44399 2.82061 9.32045C2.96776 9.19692 3.1466 9.11711 3.33681 9.09007L9.19515 8.23701L11.7749 2.96451C11.859 2.79075 11.9904 2.6442 12.154 2.54166C12.3176 2.43912 12.5068 2.38474 12.6999 2.38474C12.8929 2.38474 13.0821 2.43912 13.2457 2.54166C13.4093 2.6442 13.5407 2.79075 13.6249 2.96451L16.2354 8.22674L22.0938 9.07979C22.284 9.10683 22.4628 9.18664 22.61 9.31018C22.7571 9.43371 22.8667 9.59602 22.9263 9.77868C22.9808 9.95718 22.9857 10.1472 22.9404 10.3282C22.8951 10.5093 22.8014 10.6746 22.6693 10.8065L18.4349 14.9176L19.4626 20.704C19.4993 20.8966 19.4801 21.0958 19.4073 21.2779C19.3344 21.46 19.211 21.6175 19.0515 21.7317C18.8654 21.8622 18.6413 21.9272 18.4143 21.9167Z" fill="#FCD34D" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_22_721">
                                            <rect width="24.6667" height="24.6667" fill="white" transform="translate(0.366699 0.333344)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="flex flex-col gap-6 items-center  max-w-[100vw]">
                                <div className="text-center text-[16px] font-[400]">
                                    <PortableText value={data.testimonialsIntro} components={components} />
                                </div>
                                {data.testimonials && data.testimonials.length > 0 && (
                                    <TestimonialsSlider testimonials={data.testimonials} />
                                )}
                            </div>
                        </div>
                    </section>
                ))}
        </>
    );
}