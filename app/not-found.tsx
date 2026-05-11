import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div
        className="font-display font-black text-[clamp(6rem,20vw,12rem)] leading-none tracking-tight gradient-text-cyan mb-4 font-mono"
        aria-hidden
      >
        404
      </div>
      <h1 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] mb-3">
        Page introuvable
      </h1>
      <p className="text-[var(--text-secondary)] max-w-sm mb-8">
        Cette page n&apos;existe pas ou a été déplacée. Revenez à l&apos;accueil
        ou contactez notre équipe.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-primary-900 font-semibold hover:bg-cyan-400 transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
