// components/ContactSection.tsx

import { JSX } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { getContact } from '@/lib/sanity.query';
import ContactForm from './ContactForm';
import { ContactType } from '@/types';

export default async function ContactSection(): Promise<JSX.Element> {
    const contactData: ContactType = await getContact();

    const getSocialIcon = (platform: ContactType["socialLinks"][number]["platform"]) => {
        switch (platform) {
            case 'facebook': return <FaFacebook className="w-8 h-8" />;
            case 'instagram': return <FaInstagram className="w-8 h-8" />;
            case 'linkedin': return <FaLinkedin className="w-8 h-8" />;
            case 'twitter': return <FaTwitter className="w-8 h-8" />;
            case 'whatsapp': return <FaWhatsapp className="w-8 h-8" />;
            case 'tiktok': return <FaTiktok className="w-8 h-8" />;
            default: return null;
        }
    };

    return (
        <section id="contact" className="relative font-inter text-white pr-5 pl-5 md:pr-20 md:pl-20 mt-25 md:mt-63 mb-15 overflow-x-hidden">
            <div className="flex flex-col bg-[#312E81] p-6 md:p-25 gap-8 md:gap-12 rounded-sm">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl md:text-5xl font-bold self-stretch">{contactData.title || 'Contactez-nous'}</h2>
                    {contactData.subtitle && <p className="text-xl">{contactData.subtitle}</p>}
                </div>

                <div>
                    {contactData.formConfig ? (
                        <ContactForm formConfig={contactData.formConfig} />
                    ) : (
                        <div className="bg-blue-800 p-4 rounded-md">
                            Formulaire de contact non disponible
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row self-stretch gap-10">
                    {contactData.socialLinks && contactData.socialLinks.length > 0 && (
                        <div className="flex flex-col items-start flex-1 gap-6">
                            <h3 className="text-xl md:text-2xl font-semibold">Où nous trouver</h3>
                            <div className="flex gap-6">
                                {contactData.socialLinks.map((social) => (
                                    <a
                                        key={social._key}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-[#312E81] p-2.5 rounded-full hover:bg-blue-100 transition-colors"
                                        aria-label={social.platform}
                                    >
                                        {getSocialIcon(social.platform)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col items-start flex-1 gap-6">
                        <h3 className="text-2xl font-semibold">Pour tout autre renseignement</h3>
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