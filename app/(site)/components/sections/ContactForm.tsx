// components/ContactForm.tsx

'use client';

import { useState, FormEvent } from 'react';
import type { ContactFormType } from '@/types';

type ContactFormProps = {
    formConfig: ContactFormType;
}

export default function ContactForm({ formConfig }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        success: boolean;
        message: string;
    } | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Collect form data
        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues)
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    success: true,
                    message: 'Votre message a été envoyé avec succès !'
                });
                // Reset form
                event.currentTarget.reset();
            } else {
                setSubmitStatus({
                    success: false,
                    message: result.message || 'Une erreur est survenue. Veuillez réessayer.'
                });
            }
        } catch (error) {
            setSubmitStatus({
                success: false,
                message: 'Une erreur de réseau est survenue. Veuillez réessayer.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {formConfig.formFields?.map((field, index) => (
                <div
                    key={field.fieldName || index}
                    className={
                        field.fieldType === 'textarea' || field.fieldType === 'subject'
                            ? 'col-span-2'
                            : ''
                    }
                >
                    <label htmlFor={field.fieldName} className="block mb-2">
                        {field.fieldName} {field.required && '*'}
                    </label>
                    {field.fieldType === 'textarea' ? (
                        <textarea
                            id={field.fieldName}
                            name={field.fieldName}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="w-full bg-white p-3 rounded-sm text-gray-800 placeholder-gray-400 text-base font-medium focus:outline-none focus:ring-1 focus:ring-black resize-none"
                            rows={6}
                        />
                    ) : field.fieldType === 'subject' ? (
                        <select
                            id={field.fieldName}
                            name={field.fieldName}
                            required={field.required}
                            className="w-full bg-white p-3 rounded-sm text-gray-800 placeholder-gray-400 text-base font-medium focus:outline-none focus:ring-1 focus:ring-black"
                        >
                            <option value="">{field.placeholder || 'Choisissez votre sujet'}</option>
                            {field.options?.map((option, optIndex) => (
                                <option key={optIndex} value={option}>{option}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.fieldType}
                            id={field.fieldName}
                            name={field.fieldName}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="w-full bg-white p-3 rounded-sm text-gray-800 placeholder-gray-400 text-base font-medium focus:outline-none focus:ring-1 focus:ring-black"
                        />
                    )}
                </div>
            ))}

            <button
                type="submit"
                disabled={isSubmitting}
                className={`col-span-2 py-3 rounded-md font-semibold transition-colors ${isSubmitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-blue-600 hover:bg-gray-100'
                    }`}
            >
                {isSubmitting ? 'Envoi en cours...' : formConfig.submitButtonText}
            </button>

            {/* Status message */}
            {submitStatus && (
                <div
                    className={`col-span-2 p-3 rounded-md text-center ${submitStatus.success
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                >
                    {submitStatus.message}
                </div>
            )}
        </form>
    );
}