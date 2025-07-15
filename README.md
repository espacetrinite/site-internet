
# 🌿 Espace Trinité — Site vitrine

Bienvenue sur le dépôt du site vitrine d’Espace Trinité, conçu pour offrir une expérience fluide, élégante et informative à tous les visiteurs souhaitant découvrir les différentes salles disponibles à la location.

---

## 🌐 Objectif

Créer une interface web moderne, responsive et intuitive, présentant chaque salle sous forme de galeries, avec un design épuré et une navigation simple. L'ensemble est optimisé pour un hébergement statique sécurisé avec **formulaire de contact protégé par CAPTCHA**.

---

## 🧱 Technologies utilisées

- **HTML5**
- **CSS3**
- **JavaScript (modulaire)**
- **Fonctions serverless Netlify**
- **Cloudflare Turnstile (CAPTCHA anti-spam sécurisé)**

---

## 📁 Arborescence du projet

```
espace-trinite/
├── assets/
│   ├── favicon/         # Favicon du site
│   ├── icons/           # Icônes utilisées
│   ├── img/             # Images des galeries
│   └── logo/            # Logos
│
├── css/
│   ├── style.css        # Style global du site
│   └── header.css       # Style spécifique à l'en-tête
│
├── js/
│   ├── mail.js              # Gestion du formulaire et validation CAPTCHA
│   ├── header.js            # Animation du menu sticky
│   ├── galerie.js           # Gestion des galeries par salle
│   ├── assistant.js         # Mini assistant de recherche de salle
│   ├── cookie-consent.js    # Gestion du bandeau cookies (RGPD)
│   └── map-consent.js       # Affichage conditionnel de la carte Maps
│
├── netlify/
│   └── functions/
│       ├── send-mail.js         # Envoi sécurisé via SMTP API (Brevo)
│       └── validate-captcha.js  # Validation Cloudflare Turnstile côté serveur
│
├── index.html                # Page principale
├── mentions-legales.html     # Page RGPD / légale
├── confidentialite.html      # Politique de confidentialité
├── 404.html                  # Page d’erreur personnalisée
├── netlify.toml              # Configuration Netlify
├── package.json              # Dépendances backend (axios)
└── README.md                 # Présentation du projet
```

---

## 🛡️ Sécurité & RGPD

✅ **Formulaire sécurisé** :  
→ Utilisation du CAPTCHA **Cloudflare Turnstile**  
→ Validation serveur via `/netlify/functions/validate-captcha.js`  
→ Envoi sécurisé via `/netlify/functions/send-mail.js` et **Brevo SMTP API**  
→ Vérification d’une clé secrète `FORM_SECRET_KEY` côté client/serveur

✅ **Cookies RGPD** :  
→ Consentement explicite requis pour l'affichage de la carte Google Maps  
→ Bandeau de cookies géré via `cookie-consent.js`

---

## ▶️ Utilisation locale

Tu peux tester le site localement simplement en ouvrant `index.html` dans ton navigateur.

---

## 🚀 Déploiement recommandé

Le site est compatible avec :

- ✅ **Netlify** (recommandé)
- Vercel
- GitHub Pages (⚠️ sans les fonctions serverless)
- OVH / FTP classique (⚠️ formulaire inactif sans backend)

---

## 🔐 Variables d’environnement Netlify

Configurer les variables suivantes dans le **panneau des Builds > Environment variables** :

| Clé               | Utilité                                            |
|-------------------|----------------------------------------------------|
| `FORM_SECRET_KEY` | Doit correspondre au champ `secret` envoyé depuis le JS (`trinite-XuB23v9Ld8`) |
| `TURNSTILE_SECRET`| Clé secrète Cloudflare Turnstile (backend)         |
| `BREVO_API_KEY`   | Clé API SMTP Brevo (anciennement Sendinblue)       |
| `DEST_EMAIL`      | Adresse e-mail de réception                        |

---

## 🖼️ Aperçu

![header](assets/img/header_apercu.png)
![captcha](assets/img/captcha_apercu.png)
![formulaire](assets/img/form_apercu.png)

---

## ⚖️ Mentions légales

> Le site inclut une page de mentions légales (`mentions-legales.html`) et une politique de confidentialité (`confidentialite.html`) conformes aux exigences légales françaises.

---

## 👤 Contact

📧 adrien.morel@gmail.com  
🌐 [espacetrinite.fr](https://espacetrinite.fr)
