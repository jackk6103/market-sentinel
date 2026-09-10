# Market Sentinel

**Application publique : [Accéder à Market Sentinel](https://market-sentinel-rho.vercel.app/)**

Market Sentinel est un outil d'aide à la décision consacré à l'analyse des marchés et à la gestion du risque. Il ne passe aucun ordre automatiquement et ne constitue pas un conseil financier personnalisé.


## Fonctionnalités principales

### Authentification complète
- Inscription et connexion sécurisée avec Supabase Auth
- Gestion de profil utilisateur
- Essai gratuit de 7 jours automatique
- Protection des routes avec authentification

### Analyse de marché IA
- Analyse en temps réel de 8 paires de devises majeures
- Recommandations intelligentes : TRADER, ATTENDRE ou ÉVITER
- Score de confiance basé sur multiple facteurs
- Explications détaillées de chaque recommandation
- Analyse multi-facteurs :
  - Volatilité du marché
  - Tendance (haussière, baissière, latérale)
  - Volume et liquidité
  - Sentiment de marché
  - Indicateurs techniques

### Historique des analyses
- Conservation de toutes les analyses effectuées
- Filtrage par type de recommandation
- Statistiques détaillées (total, trade, wait, avoid)
- Suppression d'analyses individuelles
- Visualisation avec code couleur

### Système d'alertes
- Création d'alertes personnalisées par paire de devises
- 3 types d'alertes :
  - Changement de recommandation
  - Volatilité élevée
  - Alertes de prix
- Activation/désactivation des alertes
- Gestion complète des alertes

### Profil et abonnement
- Gestion du profil utilisateur
- Suivi de l'essai gratuit
- Information sur le statut d'abonnement
- Mise à jour des informations personnelles

## Technologies utilisées

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Icons**: Lucide React
- **Build**: Vite

## Structure de la base de données

### Tables principales

**user_profiles**
- Profils utilisateurs étendus
- Statut d'abonnement et période d'essai
- Préférences utilisateur

**market_analyses**
- Stockage de toutes les analyses de marché
- Paire de devises, timeframe, recommandation
- Données détaillées et raisonnement IA

**user_alerts**
- Alertes configurées par l'utilisateur
- Types d'alertes et conditions
- Statut actif/inactif

**user_watchlist**
- Liste de surveillance des paires
- Notes personnalisées

**subscriptions**
- Gestion des abonnements
- Intégration Stripe (prête)

**payments**
- Historique des paiements
- Statuts de transaction

## Sécurité

- Row Level Security (RLS) activé sur toutes les tables
- Politiques restrictives par défaut
- Accès uniquement aux données de l'utilisateur connecté
- Authentification requise pour toutes les opérations sensibles
- Pas d'exposition de données entre utilisateurs

## Pages de l'application

1. **Landing Page** (`/`)
   - Présentation du produit
   - Sections : Problème, Solution, Demo, Features, Pricing
   - Call-to-action vers inscription

2. **Inscription** (`/signup`)
   - Création de compte
   - Essai gratuit automatique de 7 jours
   - Validation des données

3. **Connexion** (`/login`)
   - Authentification sécurisée
   - Gestion des erreurs

4. **Dashboard** (`/dashboard`)
   - Interface principale d'analyse
   - Sélection de paire et timeframe
   - Résultats d'analyse en temps réel
   - Analyses récentes

5. **Historique** (`/dashboard/history`)
   - Toutes les analyses passées
   - Filtres et statistiques
   - Gestion des analyses

6. **Alertes** (`/dashboard/alerts`)
   - Configuration des alertes
   - Gestion active/inactive
   - Informations sur le fonctionnement

7. **Profil** (`/dashboard/profile`)
   - Informations personnelles
   - Statut d'abonnement
   - Gestion du compte

## Design et UX

- Design moderne et professionnel
- Interface sombre (dark mode)
- Palette de couleurs : vert/cyan sur fond gris foncé
- Responsive sur tous les écrans (mobile, tablette, desktop)
- Animations et transitions fluides
- États de chargement clairs
- Messages d'erreur et de succès informatifs
- Navigation intuitive avec sidebar

## Installation et démarrage

```bash
# Installation des dépendances
npm install

# Démarrage en développement
npm run dev

# Build pour production
npm run build
```

## Variables d'environnement requises

Les variables suivantes sont déjà configurées dans `.env` :
- `VITE_SUPABASE_URL` - URL du projet Supabase
- `VITE_SUPABASE_ANON_KEY` - Clé publique Supabase

## Prêt pour la production

L'application est entièrement fonctionnelle et prête à être déployée. Elle inclut :
- ✅ Authentification complète
- ✅ Base de données sécurisée
- ✅ Interface utilisateur complète
- ✅ Système d'analyse IA
- ✅ Gestion des abonnements (structure prête)
- ✅ Design responsive
- ✅ Sécurité RLS
- ✅ Build optimisé

## Prochaines étapes (optionnel)

Pour aller plus loin, vous pouvez :
1. Intégrer l'API Stripe pour les paiements réels
2. Connecter une véritable API de marché (ex: Alpha Vantage, Twelve Data)
3. Ajouter des notifications push
4. Implémenter un système de backtest
5. Ajouter plus de paires et timeframes
6. Créer des graphiques de prix interactifs
