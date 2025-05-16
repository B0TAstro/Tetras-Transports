// app/politique-confidentialite/page.tsx
import Link from 'next/link';

export default function PolitiqueConfidentialite() {
  return (
    <main className="max-w-3xl h-screen mx-auto p-8 space-y-6 mt-35">

      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-lg font-medium px-3 py-2 rounded-sm duration-250 border border-dark hover:text-blue-700 hover:border-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Retour à l'accueil
        </Link>
      </div>

      <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
      <p>
        Nous nous engageons à protéger votre vie privée et vos données
        personnelles conformément au RGPD.
      </p>
      <p>
        Les informations collectées via notre formulaire de contact sont
        utilisées uniquement pour répondre à vos demandes et ne sont jamais
        partagées sans votre consentement.
      </p>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de
        vos données en nous contactant à : tetrastransport@gmail.com
      </p>
    </main>
  );
}