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
            case 'facebook': return <FaFacebook className="w-6 h-6" />;
            case 'instagram': return <FaInstagram className="w-6 h-6" />;
            case 'linkedin': return <FaLinkedin className="w-6 h-6" />;
            case 'twitter': return <FaTwitter className="w-6 h-6" />;
            case 'whatsapp': return <FaWhatsapp className="w-6 h-6" />;
            case 'tiktok': return <FaTiktok className="w-6 h-6" />;
            default: return null;
        }
    };

    return (
        <section id="contact" className="relative font-inter text-white pr-20 pl-20 mt-63">
            <div className="flex flex-col bg-blue-700 p-25 gap-12">
                <div className="flex felx-col space-y-3">
                    <h2 className="text-5xl font-bold self-stretch">{contactData.title}</h2>
                    {contactData.subtitle && <p className="text-xl">{contactData.subtitle}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {contactData.formConfig && (
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <ContactForm formConfig={contactData.formConfig} />
                        </div>
                    )}
                </div>

                <div className="grid space-y-8">
                    {contactData.socialLinks && contactData.socialLinks.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Oû nous trouvez</h3>
                            <div className="flex space-x-4">
                                {contactData.socialLinks.map((social) => (
                                    <a
                                        key={social._key}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-100 transition-colors"
                                        aria-label={social.platform}
                                    >
                                        {getSocialIcon(social.platform)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                    <p>Pour tout autre renseignement</p>
                    {contactData.phone && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2"></h3>
                            <p className="text-lg">{contactData.phone}</p>
                        </div>
                    )}

                    {contactData.email && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2"></h3>
                            <p className="text-lg">{contactData.email}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
