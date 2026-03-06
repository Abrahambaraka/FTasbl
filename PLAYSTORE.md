# Déploiement sur le Google Play Store — Fondation TUSAIDIYANE

Ce guide décrit comment préparer et publier l’application Android sur le Play Store.

## Prérequis

- **Node.js** 18+ (20+ recommandé)
- **Android Studio** (avec SDK Android et outil de build)
- **Compte Google Play Console** (paiement unique pour créer un compte développeur)
- **Java 17** (pour le build Android)

## 1. Installer les dépendances

```bash
npm install
```

## 2. Créer le projet Android (une seule fois)

Si le dossier `android/` n’existe pas encore :

```bash
npx cap add android
```

Cela crée le projet Android dans `android/`.

## 3. Build pour Android et synchroniser

Génère le site en mode Android (chemins relatifs) et copie le build dans le projet Android :

```bash
npm run build:android
```

Ou manuellement :

```bash
vite build --mode android
npx cap sync android
```

## 4. Ouvrir le projet dans Android Studio

```bash
npm run cap:android
```

Ou : ouvrir Android Studio → **File → Open** → choisir le dossier **`android/`** du projet.

## 5. Configuration pour le Play Store

### 5.1 Identité de l’app

- **Package name (ID)** : `com.fondationtusaidiyane.app` (défini dans `capacitor.config.ts`).
- Pour le changer : modifier `appId` dans `capacitor.config.ts`, puis mettre à jour `applicationId` dans `android/app/build.gradle`.

### 5.2 Version et numéro de version

Dans **`android/app/build.gradle`** :

- **`versionCode`** : entier incrémenté à chaque mise en ligne (obligatoire).
- **`versionName`** : chaîne lisible (ex. `"1.0.0"`), peut reprendre la version du `package.json`.

### 5.3 Icône et nom

- **Icône** : remplacer les icônes dans `android/app/src/main/res/` (mipmap-mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi) ou utiliser Android Studio pour générer les icônes à partir d’une image.
- **Nom de l’app** : défini dans `android/app/src/main/res/values/strings.xml` (`app_name`).

### 5.4 API backend (contact / paiement)

L’app en WebView appelle des APIs (ex. `/api/contact`, `/api/membership-payment`). Sur Android, l’origine est `capacitor://localhost`, donc les URLs relatives ne pointent pas vers ton serveur.

- **Option recommandée** : déployer le backend (ex. sur Vercel) et utiliser l’URL de production dans l’app quand elle tourne en natif (variable d’environnement ou détection Capacitor).
- Exemple : si le site est `https://www.fondationtusaidiyane.com`, les appels doivent cibler `https://www.fondationtusaidiyane.com/api/...` depuis l’app Android.

## 6. Générer le bundle signé (AAB) pour le Play Store

1. Dans Android Studio : **Build → Generate Signed Bundle / APK**.
2. Choisir **Android App Bundle** (recommandé pour le Play Store).
3. Créer ou sélectionner un keystore (à conserver en lieu sûr).
4. Renseigner alias, mots de passe, validity.
5. Sélectionner la build variant **release**.
6. Lancer la génération : le fichier **`.aab`** est créé (souvent dans `android/app/release/`).

## 7. Publier sur le Play Store

1. Aller sur [Google Play Console](https://play.google.com/console).
2. Créer une nouvelle application (ou en sélectionner une existante).
3. Remplir **fiche Play Store** : titre, courte description, description longue, captures d’écran (téléphone, tablette si besoin), icône haute résolution, graphique de bannière si demandé.
4. Dans **Production** (ou **Tests internes/fermés** pour tester) : **Créer une nouvelle version**.
5. Téléverser le fichier **`.aab`** généré à l’étape 6.
6. Renseigner les **notes de version**.
7. Soumettre pour examen.

## 8. Résumé des commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run build:android` | Build web (mode Android) + copie dans `android/` |
| `npm run cap:sync` | Synchronise `dist/` vers les projets natifs |
| `npm run cap:android` | Ouvre le projet Android dans Android Studio |

## 9. Mises à jour ultérieures

1. Modifier le code (web ou config).
2. Relancer `npm run build:android`.
3. Dans Android Studio, incrémenter `versionCode` (et éventuellement `versionName`).
4. Régénérer le bundle signé (**.aab**).
5. Téléverser la nouvelle version dans la Play Console et soumettre.

---

Pour toute question sur les politiques du Play Store (données personnelles, contenu, paiements), consulter l’aide Google Play Console et les règles des développeurs.
