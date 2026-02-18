import React, { useState } from 'react';
import { X, CreditCard, User, Mail, Phone, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MEMBERSHIP_TYPE_LABELS: Record<string, string> = {
  membre_fondateur: "Membre fondateur",
  membre_effectif: "Membre effectif",
  membre_d_honneur: "Membre d'honneur",
  membre_bienfaiteur: "Membre bienfaiteur",
};

const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState<keyof typeof MEMBERSHIP_TYPE_LABELS>('membre_fondateur');
  const [message, setMessage] = useState('');
  const [acceptPayment, setAcceptPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setCity('');
    setType('membre');
    setMessage('');
    setAcceptPayment(false);
    setError(null);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    setSuccess(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !city) {
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }

    if (!acceptPayment) {
      setError("Vous devez accepter le paiement symbolique de 1 $ pour valider votre adhésion.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const subject = "Demande d'adhésion à la Fondation (frais 1 $)";
      const bodyMessage = [
        `Type d'adhésion : ${MEMBERSHIP_TYPE_LABELS[type] || type}`,
        `Téléphone : ${phone}`,
        `Ville / Pays : ${city}`,
        '',
        'Message du membre :',
        message || '(Aucun message supplémentaire)',
        '',
        'Le membre accepte de payer les frais symboliques de 1 $.'
      ].join('\n');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          subject,
          message: bodyMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de votre adhésion.");
      }

      // Création de la session de paiement via l'API de paiement
      const payResponse = await fetch('/api/membership-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
        }),
      });

      if (!payResponse.ok) {
        throw new Error('Erreur lors de la création du paiement.');
      }

      const payData = await payResponse.json();

      if (!payData?.link) {
        throw new Error('Lien de paiement indisponible.');
      }

      setSuccess(true);
      resetForm();

      // Redirection vers la page de paiement sécurisée (Flutterwave ou autre)
      window.open(payData.link, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setError(
        "Une erreur est survenue lors de l'envoi de votre adhésion. Merci de réessayer dans quelques instants."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom duration-300 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-blue-100 text-[#0056b3] flex items-center justify-center">
              <CreditCard size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Adhérer à la Fondation</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                Contribution symbolique de 1 $
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 pt-4 pb-5 space-y-3 flex-1 overflow-y-auto">
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-2xl p-3">
            En adhérant à la Fondation TUSAIDIYANE, vous contribuez de manière concrète à nos actions en faveur
            des populations vulnérables. Un <span className="font-bold text-[#e31b23]">frais symbolique de 1 $</span> est demandé
            pour valider votre inscription.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                <User size={12} />
                Nom complet *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-transparent"
                placeholder="Nom & prénom"
              />
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                <Mail size={12} />
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-transparent"
                placeholder="exemple@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                <Phone size={12} />
                Téléphone / WhatsApp *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-transparent"
                placeholder="+243 ..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                <MapPin size={12} />
                Ville / Pays *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-transparent"
                placeholder="Lubumbashi, RDC"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
              <User size={12} />
              Type d&apos;adhésion
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as keyof typeof MEMBERSHIP_TYPE_LABELS)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-transparent"
            >
              <option value="membre_fondateur">Membre fondateur</option>
              <option value="membre_effectif">Membre effectif</option>
              <option value="membre_d_honneur">Membre d'honneur</option>
              <option value="membre_bienfaiteur">Membre bienfaiteur</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
              Message (optionnel)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs min-h-[70px] resize-none focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-transparent"
              placeholder="Parlez-nous brièvement de votre motivation à rejoindre la fondation..."
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-start gap-2 text-[11px] text-slate-600">
              <input
                type="checkbox"
                checked={acceptPayment}
                onChange={(e) => setAcceptPayment(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-[#0056b3] focus:ring-[#0056b3]"
              />
              <span>
                Je confirme mon souhait d&apos;adhérer à la Fondation TUSAIDIYANE et j&apos;accepte de payer le{' '}
                <span className="font-semibold text-[#e31b23]">frais symbolique de 1 $</span> pour valider mon inscription.
              </span>
            </label>
            <p className="text-[10px] text-slate-400">
              Après validation du formulaire, vous serez redirigé(e) vers une page de paiement sécurisé pour régler ce montant.
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-2xl bg-red-50 border border-red-100 px-3 py-2.5">
              <AlertCircle size={14} className="text-red-500 mt-0.5" />
              <p className="text-[11px] text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 rounded-2xl bg-emerald-50 border border-emerald-100 px-3 py-2.5">
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5" />
              <p className="text-[11px] text-emerald-700">
                Merci pour votre confiance ! Votre demande d&apos;adhésion a bien été envoyée. Veuillez finaliser le paiement de 1 $
                sur la page qui vient de s&apos;ouvrir.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-1">
            <p className="text-[10px] text-slate-400">
              Vos informations sont utilisées uniquement dans le cadre de la Fondation TUSAIDIYANE.
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 sm:flex-none px-3 py-2 rounded-xl border border-slate-200 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                disabled={isSubmitting}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0056b3] text-white text-[11px] font-semibold shadow-md hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                <CreditCard size={14} />
                {isSubmitting ? 'Envoi en cours...' : "Payer 1 $ et adhérer"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembershipModal;

