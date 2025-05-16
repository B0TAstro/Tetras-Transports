// app/mentions-legales/page.tsx

export default function MentionsLegales() {
  return (
    <main className="max-w-3xl h-screen mx-auto p-8 space-y-6 mt-35">

      <div className="mb-8">
        <a
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
        </a>
      </div>

      <h1 className="text-3xl font-bold">Mentions légales</h1>
      <p>
        Ce site est édité par Tetras Transports, situé à Morbier, France.
      </p>
      <p>
        Réalisation du site internet : <br />
        <strong>Maëva Cesco-Resia</strong> – Chargé de projet et ui/ux designer<br />
        <strong>Tom Boullay</strong> – Développeur web<br />
        Hébergement : OVH, France <br />
        Contact : tetrastransport@gmail.com
      </p>
      <p>
        Toute reproduction ou représentation intégrale ou partielle faite sans
        le consentement explicite de Tetras Transports est interdite.
      </p>
      <p>
        Conformément aux dispositions des articles 6-III et 19 de la Loi pour la
        Confiance dans l&apos;Économie Numérique, nous informons les visiteurs que ce
        site est hébergé en France.
      </p>
    </main>
  );
}
