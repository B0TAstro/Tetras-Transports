// components/ContactSection.tsx

import { useState, JSX } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { getContact } from '@/sanity/sanity.query';
import type { ContactType } from '@/types';

export default async function ContactSection(): Promise<JSX.Element> {
    const contactData: ContactType[] = await getContact();

    console.log("contactData:", contactData);

    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");

        try {
            // Remplace ceci par ton API d'envoi de formulaire
            // const response = await fetch('/api/contact', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData)
            // });

            // if (!response.ok) throw new Error('Erreur lors de l'envoi du formulaire');

            // Simulation de succès pour l'exemple
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSubmitSuccess(true);
            setFormData({});
        } catch (error) {
            setSubmitError("Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getSocialIcon = (platform: string) => {
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
        <>
            {contactData.length > 0 &&
                contactData.map((data) => (
                    <section id="contact" className="bg-blue-600 text-white py-16 px-4 md:px-8 lg:px-20">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">{data.title}</h2>
                                {data.subtitle && <p className="text-xl">{data.subtitle}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Formulaire */}
                                <div className="bg-white p-8 rounded-lg shadow-lg">
                                    {submitSuccess ? (
                                        <div className="text-center text-green-600 py-8">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                                            <p className="mb-4">Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
                                            <button
                                                onClick={() => setSubmitSuccess(false)}
                                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                            >
                                                Envoyer un autre message
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
                                            {data.formFields && data.formFields.map((field) => (
                                                <div key={field._key} className="space-y-1">
                                                    <label htmlFor={field.fieldName} className="block font-medium">
                                                        {field.fieldName} {field.required && <span className="text-red-500">*</span>}
                                                    </label>

                                                    {field.fieldType === 'textarea' ? (
                                                        <textarea
                                                            id={field.fieldName}
                                                            name={field.fieldName}
                                                            rows={4}
                                                            placeholder={field.placeholder}
                                                            required={field.required}
                                                            value={formData[field.fieldName] || ''}
                                                            onChange={handleChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    ) : field.fieldType === 'subject' ? (
                                                        <select
                                                            id={field.fieldName}
                                                            name={field.fieldName}
                                                            required={field.required}
                                                            value={formData[field.fieldName] || ''}
                                                            onChange={handleChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="">{field.placeholder || 'Sélectionnez une option'}</option>
                                                            {field.options?.map((option, index) => (
                                                                <option key={index} value={option}>{option}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type={field.fieldType}
                                                            id={field.fieldName}
                                                            name={field.fieldName}
                                                            placeholder={field.placeholder}
                                                            required={field.required}
                                                            value={formData[field.fieldName] || ''}
                                                            onChange={handleChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    )}
                                                </div>
                                            ))}

                                            {submitError && (
                                                <div className="text-red-500 text-sm">{submitError}</div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
                                            >
                                                {isSubmitting ? 'Envoi en cours...' : data.submitButtonText}
                                            </button>
                                        </form>
                                    )}
                                </div>

                                {/* Coordonnées et réseaux sociaux */}
                                <div className="space-y-8">
                                    {data.phone && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
                                            <p className="text-lg">{data.phone}</p>
                                        </div>
                                    )}

                                    {data.email && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">Email</h3>
                                            <p className="text-lg">{data.email}</p>
                                        </div>
                                    )}

                                    {data.socialLinks && data.socialLinks.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4">Réseaux sociaux</h3>
                                            <div className="flex space-x-4">
                                                {data.socialLinks.map((social) => (
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
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
        </>
    );
}