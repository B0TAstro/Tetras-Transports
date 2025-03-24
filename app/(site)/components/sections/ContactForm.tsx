// components/ContactForm.tsx

'use client';

import { useState } from 'react';
import type { ContactFormType } from '@/types';

type ContactFormProps = {
    formConfig: ContactFormType;
}

export default function ContactForm({ formConfig }: ContactFormProps) {
    // Pour l'instant, cette partie est juste une structure sans fonctionnalité
    // La logique sera implémentée plus tard

    return (
        <form className="space-y-6 text-gray-800">
            {formConfig.formFields && formConfig.formFields.map((field) => (
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : field.fieldType === 'subject' ? (
                        <select
                            id={field.fieldName}
                            name={field.fieldName}
                            required={field.required}
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                </div>
            ))}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
                {formConfig.submitButtonText}
            </button>
        </form>
    );
}