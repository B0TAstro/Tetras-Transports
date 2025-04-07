// components/sections/ContactSection.tsx

import { JSX } from 'react';
import { getContact } from '@/sanity/sanity.query';
import ClientContactSection from '../ClientContactSection';
import { ContactType } from '@/types';

export default async function ContactSection(): Promise<JSX.Element> {
    console.log('Rendering ContactSection')

    const contactData: ContactType = await getContact();
    
    return <ClientContactSection contactData={contactData} />;
}