# Guide Complet de Publication - Google Play Console
Ce document contient **toutes les informations exactes** à copier-coller pour configurer et publier l'application **Fondation TUSAIDIYANE** sur le Google Play Store.

## 1. Création de l'application (Première étape)

Lorsque vous cliquez sur **"Créer une application"** dans la Google Play Console, remplissez comme suit :

- **Nom de l'application** : `Fondation TUSAIDIYANE`
- **Langue par défaut** : `Français`
- **Type d'application** : `Application` (et non Jeu)
- **Gratuite ou payante** : `Gratuite`
- **Déclarations** : Cochez les cases confirmant que l'application respecte les règles du programme développeur et les lois d'exportation américaines.

---

## 2. Fiche Play Store Principale (Présentation sur le Store)

Dans le menu de gauche, allez dans **Développer > Présentation sur le Play Store > Fiche Play Store principale**.

### Textes à copier-coller :

- **Nom de l'application (max 50 car.)** : 
  `Fondation TUSAIDIYANE`

- **Brève description (max 80 car.)** : 
  `Agir pour la solidarité en RDC. Santé, éducation et accès à l'eau.`

- **Description complète (max 4000 car.)** :
  ```text
  L'application officielle de la Fondation TUSAIDIYANE (ASBL), dédiée à la solidarité et au bien-être des populations vulnérables en République Démocratique du Congo.
  
  Créée en 2023 à Lubumbashi, notre fondation a pour mission de transformer durablement le quotidien des communautés en se concentrant sur les besoins fondamentaux :
  • L'accès à l'eau potable
  • L'amélioration de la santé publique
  • Le soutien à l'éducation
  
  Grâce à cette application, vous pouvez :
  - Découvrir notre mission, notre vision et nos objectifs.
  - Suivre nos différentes réalisations et l'impact direct de nos actions dans le Haut-Katanga.
  - Devenir membre ou faire un don pour soutenir nos initiatives humanitaires.
  - Contacter directement notre équipe pour des partenariats ou des informations.
  
  Rejoignez-nous avec notre engagement à 100%. Ensemble, posons des actions concrètes pour un avenir meilleur en RDC.
  ```

### Éléments graphiques (Ressources visuelles) :

- **Icône de l'application** : 
  - Image de votre logo
  - Format : PNG ou JPEG, taille : 512 x 512 pixels, jusqu'à 1 Mo.

- **Graphique de fonctionnalité (Bannière)** :
  - L'image de bannière de votre organisation.
  - Format : PNG ou JPEG, taille : 1024 x 500 pixels, jusqu'à 1 Mo.

- **Captures d'écran du téléphone** :
  - Prenez 2 à 8 captures d'écran du site ouvert sur un téléphone (Accueil, Mission, Formulaire d'adhésion, Contact).
  - Format : PNG ou JPEG, rapport d'aspect 16:9 ou 9:16, max 8 Mo par image.

---

## 3. Configuration de l'application (Contenu de l'application)

Allez dans le menu **Règles > Contenu de l'application**. Vous devez y remplir plusieurs questionnaires obligatoires.

### A. URL des règles de confidentialité
- **URL requise** : Vous devez mettre un lien vers les conditions/règles de confidentialité. Si vous l'avez sur votre site, mettez le lien exact (ex: `https://www.fondationtusaidiyane.com/privacy-policy`).

### B. Accès à l'application
- **Question** : Toutes les fonctionnalités sont-elles accessibles sans accès spécial ?
- **Réponse** : Choisissez *"Toutes les fonctionnalités sont disponibles sans accès spécial"* (puisque l'inscription/adhésion et la connexion email/pass sont publiques).

### C. Annonces
- **Question** : Votre application contient-elle des annonces ?
- **Réponse** : *"Non, mon application ne contient pas d'annonces"* (À moins que vous y ayez intégré des publicités AdMob, ce qui n'est pas le cas ici).

### D. Classification du contenu
- **Catégorie** : Choisissez *"Utilitaires, productivité, communication ou autre"*.
- Vous devrez remplir un questionnaire sur la violence, la drogue, l'âge visé, etc. Répondez `Non` à tout ce qui concerne le contenu violent/sensible.
- Résultat attendu : PEGI 3 (Pour tous les âges).

### E. Public cible et contenu
- Cochez les tranches d'âge applicables : généralement **13-15 ans, 16-17 ans, et 18 ans et plus**.
- **Question** : L'appli peut-elle attirer involontairement les enfants ? 
- **Réponse** : *"Non"*.

### F. Application d'actualités
- **Question** : Votre application est-elle une application d'actualités ?
- **Réponse** : *"Non"*.

### G. Formulaire de sécurité des données
Il est très important de bien le remplir car vos utilisateurs saisissent des données (pour adhérer).
- **Collecte de données** : *"Oui"*
- **Toutes les données sont-elles chiffrées en transit ?** : *"Oui"* (grâce au HTTPS).
- **L'utilisateur peut-il demander la suppression ?** : *"Oui"*.
- **Types de données collectées :**
  - Cochez *"Informations personnelles"* (Nom, Email, Téléphone, Adresse).
  - Cochez *"Informations financières"* (si vous traitez des paiements de cotisations directement dans l'appli via une plateforme tierce).
- Pour chaque donnée, indiquez qu'elle est collectée pour : *"Fonctionnalités de l'application"*.

### H. Application gouvernementale
- **Question** : Votre application représente-t-elle un gouvernement ?
- **Réponse** : *"Non"* (C'est une ASBL).

---

## 4. Ciblage et Prix

Allez dans **Développer > Croissance > Prix et disponibilité**.
- **Prix** : Gratuit.
- **Pays/Régions** : Sélectionnez `"Tous les pays"` ou ciblez spécifiquement `"RDC"`, `"Belgique"`, `"France"`, etc., là où vivent vos donateurs ou membres potentiels. 

---

## 5. Préparation du Fichier pour Google (AAB)

Pour pouvoir envoyer votre application, vous devez lui fournir le fichier technique.

1. Allez dans votre dossier de projet web.
2. Exécutez : `npm run build:android`
3. Ouvrez le dossier `android` avec **Android Studio**.
4. Dans Android Studio, allez dans **Build > Generate Signed Bundle / APK**.
5. Sélectionnez **Android App Bundle (.aab)**.
6. Le fichier généré sera à envoyer sur Google Play lors de la prochaine étape.
*Voir `PLAYSTORE.md` (le fichier déjà présent dans votre dossier) pour les commandes techniques plus poussées si le .aab n'est pas encore prêt.*

---

## 6. Lancement en Production

Une fois tous les éléments précédents validés (les cercles seront grisés avec une encoche verte dans la console) :

1. Dans le menu, allez dans **Publier > Production**.
2. Cliquez sur l'onglet **Versions**, puis sur **Créer une release**.
3. **App Bundle** : Glissez-déposez le fichier `.aab` (généré à l'étape 5).
4. **Nom de la release** : Laissez par défaut (ex: `1.0.0`).
5. **Notes de version** :
   ```text
   <fr-FR>
   Lancement officiel de l'application de la Fondation TUSAIDIYANE.
   - Découvrez notre mission.
   - Adhérez et rejoignez le mouvement.
   - Suivez nos actions solidaires en RDC.
   </fr-FR>
   ```
6. Cliquez sur **Enregistrer** (Save), puis sur **Vérifier la release** (Review release).
7. S'il n'y a pas d'erreurs bloquantes (les avertissements de type "code d'obfuscation" peuvent être ignorés), cliquez sur **Lancer le déploiement en production** (Start rollout to Production).

🎉 C'est fait ! Votre application sera en cours d'examen par Google. L'examen peut prendre entre 1 et 7 jours. Dès qu'il sera terminé, elle sera disponible sur le Play Store.
