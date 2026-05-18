"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants/nav";

const schema = z.object({
  prenom: z.string().min(2, "Prénom requis"),
  nom: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  entreprise: z.string().optional(),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  volume: z.string().optional(),
  message: z.string().min(10, "Décrivez votre besoin (min. 10 caractères)"),
});

type FormData = z.infer<typeof schema>;

const SERVICES = [
  "Géolocalisation GPS / Flotte",
  "Hébergement Web",
  "Système d'Alarme",
  "Plateforme Tracking",
  "Traceur GPS (achat)",
  "GrossistePPN",
  "TransHub",
  "RestaurantOS",
  "SMS Gate",
  "Autre / Combinaison",
];

export function DevisForm() {
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormData) {
    const msg = [
      `Bonjour DAGO IT, je souhaite un devis.`,
      `Nom : ${data.prenom} ${data.nom}`,
      `Email : ${data.email}`,
      data.telephone ? `Tél : ${data.telephone}` : "",
      data.entreprise ? `Entreprise : ${data.entreprise}` : "",
      `Service : ${data.service}`,
      data.volume ? `Volume : ${data.volume}` : "",
      `Message : ${data.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    setWaUrl(
      `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(msg)}`
    );
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-[var(--surface)] border border-cyan-500/30 rounded-2xl p-8 flex flex-col items-center text-center gap-5">
        <div className="h-16 w-16 rounded-full bg-cyan-500/10 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">
            Demande enregistrée !
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Continuez sur WhatsApp pour envoyer votre demande directement à notre équipe. Réponse sous 24h.
          </p>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold text-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Envoyer via WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8">
      <h2 className="font-display font-bold text-xl mb-6 text-[var(--text-primary)]">
        Votre projet
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            placeholder="Jean"
            required
            error={errors.prenom?.message}
            {...register("prenom")}
          />
          <Input
            label="Nom"
            placeholder="Rakoto"
            required
            error={errors.nom?.message}
            {...register("nom")}
          />
        </div>

        <Input
          label="Email professionnel"
          type="email"
          placeholder="jean@monentreprise.mg"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Téléphone / WhatsApp"
          type="tel"
          placeholder="+261 32 05 767 77"
          {...register("telephone")}
        />

        <Input
          label="Entreprise"
          placeholder="Nom de votre société"
          {...register("entreprise")}
        />

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="devis-service"
            className="text-sm font-medium text-[var(--text-secondary)]"
          >
            Service concerné{" "}
            <span aria-hidden className="text-orange-400 ml-1">*</span>
          </label>
          <select
            id="devis-service"
            aria-required="true"
            {...register("service")}
            className="w-full h-11 rounded-xl px-4 text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 aria-[invalid=true]:border-red-500"
            aria-invalid={!!errors.service}
          >
            <option value="">Sélectionner un service…</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.service && (
            <p className="text-xs text-red-400">{errors.service.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="devis-volume"
            className="text-sm font-medium text-[var(--text-secondary)]"
          >
            Nombre de véhicules / utilisateurs
          </label>
          <select
            id="devis-volume"
            {...register("volume")}
            className="w-full h-11 rounded-xl px-4 text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
          >
            <option value="">Non applicable</option>
            <option value="1-5">1 à 5</option>
            <option value="6-20">6 à 20</option>
            <option value="21-50">21 à 50</option>
            <option value="51+">Plus de 50</option>
          </select>
        </div>

        <Textarea
          label="Décrivez votre besoin"
          placeholder="Ex : Je gère une flotte de 12 ambulances. Je cherche une solution GPS avec alertes temps réel et rapport mensuel…"
          required
          error={errors.message?.message}
          {...register("message")}
        />

        <Button
          variant="primary"
          size="lg"
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <><Loader2 className="h-4 w-4 animate-spin mr-2" />Envoi en cours…</>
          ) : (
            "Envoyer ma demande"
          )}
        </Button>

        <p className="text-xs text-[var(--text-tertiary)] text-center">
          En soumettant ce formulaire, vous acceptez d&apos;être contacté par DAGO IT concernant votre projet.
        </p>
      </form>
    </div>
  );
}
