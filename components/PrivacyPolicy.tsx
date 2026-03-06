import React, { useEffect } from 'react';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif text-[#0056b3]">Politique de Confidentialité</h1>
                <p className="text-sm text-slate-500 mb-8 border-b pb-4">Dernière mise à jour : 6 mars 2026</p>

                <div className="space-y-8 text-slate-700 leading-relaxed">
                    <section>
                        <p>
                            Bienvenue sur l'application de la <strong className="text-slate-900">Fondation TUSAIDIYANE (ASBL)</strong>.
                            La protection de vos données personnelles est une priorité pour nous. Cette politique de confidentialité explique
                            comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre application mobile
                            et nos services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="bg-[#0056b3] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                            Informations que nous collectons
                        </h2>
                        <p className="mb-3">Nous pouvons collecter les informations suivantes lorsque vous utilisez notre application ou complétez nos formulaires d'adhésion / de contact :</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Informations d'identification :</strong> Nom, prénom(s).</li>
                            <li><strong>Coordonnées :</strong> Adresse e-mail, numéro de téléphone, adresse physique.</li>
                            <li><strong>Informations financières :</strong> Détails concernant le paiement des cotisations ou des dons (traités de manière sécurisée).</li>
                            <li><strong>Données de communication :</strong> Messages que vous nous envoyez via l'application.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="bg-[#0056b3] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                            Utilisation de vos informations
                        </h2>
                        <p className="mb-3">Les informations que nous collectons sont utilisées dans les buts suivants :</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Fournir, maintenir et améliorer notre application.</li>
                            <li>Traiter vos demandes d'adhésion à la fondation.</li>
                            <li>Gérer et suivre vos cotisations et dons.</li>
                            <li>Vous contacter pour vous informer de nos actions, projets ou répondre à vos requêtes.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="bg-[#0056b3] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                            Partage et protection des données
                        </h2>
                        <p className="mb-3">
                            La Fondation TUSAIDIYANE ne vendra, ne louera ni ne partagera vos données personnelles à des tiers à des fins commerciales.
                        </p>
                        <p>
                            Toutes les données transitent via des protocoles sécurisés (HTTPS/Chiffrement en transit). Nous appliquons des
                            mesures de sécurité pour protéger vos informations contre tout accès, altération ou divulgation non autorisés.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="bg-[#0056b3] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                            Vos droits : Suppression des données
                        </h2>
                        <div className="bg-blue-50 border-l-4 border-[#0056b3] p-4 rounded-r-lg">
                            <p className="mb-2">
                                Conformément aux réglementations relatives à la protection des données appliquées sur le Google Play Store et en général,
                                vous avez le droit de consulter, modifier ou demander la <strong>suppression complète</strong> de vos données personnelles.
                            </p>
                            <p>
                                Pour demander la suppression de votre compte ou de vos données personnelles, veuillez nous envoyer un e-mail à :
                                <a href="mailto:fondationtusaidiyane@gmail.com" className="text-[#0056b3] font-medium ml-1 hover:underline">fondationtusaidiyane@gmail.com</a>
                                <br />(ou via la page de contact de l'application) en indiquant "Demande de suppression de données".
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="bg-[#0056b3] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">5</span>
                            Modifications de cette politique
                        </h2>
                        <p>
                            Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de
                            tout changement en publiant la nouvelle politique de confidentialité sur cette page.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="bg-[#0056b3] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">6</span>
                            Nous contacter
                        </h2>
                        <p className="mb-3">Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter :</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Par e-mail : <a href="mailto:fondationtusaidiyane@gmail.com" className="text-[#0056b3] hover:underline">fondationtusaidiyane@gmail.com</a></li>
                            <li>Via la section contact de notre application/site web.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
