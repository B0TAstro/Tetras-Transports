// app/(site)/global-error.tsx

'use client';

export default function GlobalError({
  error, // Ajoutez _ devant pour indiquer qu'il n'est pas utilisé
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Vous pouvez utiliser error ici pour le logging si nécessaire
  console.error(error);
  
  return (
    <html lang="fr">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
          <h1 className="text-6xl font-bold text-gray-800">Erreur Système</h1>
          <p className="text-xl text-gray-600 mt-4">Une erreur critique est survenue</p>
          <button
            onClick={() => reset()}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}