// components/ContactSection.tsx

import { JSX } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { getContact } from '@/sanity/sanity.query';
import ContactForm from './ContactForm';
import { ContactType } from '@/types';
export default async function ContactSection(): Promise<JSX.Element> {
    const contactData: ContactType = await getContact();

    console.log("contactData:", contactData);

    const getSocialIcon = (platform: ContactType["socialLinks"][number]["platform"]) => {
        switch (platform) {
            case 'facebook': return <FaFacebook className="w-7 h-7" />;
            case 'instagram': return <FaInstagram className="w-7 h-7" />;
            case 'linkedin': return <FaLinkedin className="w-7 h-7" />;
            case 'twitter': return <FaTwitter className="w-7 h-7" />;
            case 'whatsapp': return <FaWhatsapp className="w-7 h-7" />;
            case 'tiktok': return <FaTiktok className="w-7 h-7" />;
            default: return null;
        }
    };

    return (
        <section id="contact" className="relative font-inter text-white pr-20 pl-20 mt-63 mb-15">
            <div className="flex flex-col bg-blue-700 p-25 gap-12">
                <div className="flex felx-col space-y-3">
                    <h2 className="text-5xl font-bold self-stretch">{contactData.title}</h2>
                    {contactData.subtitle && <p className="text-xl">{contactData.subtitle}</p>}
                </div>

                <div>
                    {contactData.formConfig && (
                        <ContactForm formConfig={contactData.formConfig} />
                    )}
                </div>

                <div className="flex items-center self-stretch gap-10">
                    {contactData.socialLinks && contactData.socialLinks.length > 0 && (
                        <div className="flex flex-col items-start flex-1 gap-6">
                            <h3 className="text-2xl font-semibold">Où nous trouvez</h3>
                            <div className="flex gap-6">
                                {contactData.socialLinks.map((social) => (
                                    <a
                                        key={social._key}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors"
                                        aria-label={social.platform}
                                    >
                                        {getSocialIcon(social.platform)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col items-start flex-1 gap-6">
                        <p className="text-2xl font-semibold">Pour tout autre renseignement</p>
                        {contactData.phone && (
                            <p className="text-[16px] font-medium">{contactData.phone}</p>
                        )}
                        {contactData.email && (
                            <p className="text-[16px] font-medium">{contactData.email}</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}