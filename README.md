# StudyPortal — Portail Multi-espace de Gestion Étudiante

Application frontend ReactJS/TypeScript pour la gestion étudiante.
Développée dans le cadre du test technique BOAZ-STUDY.

---

## Stack technique

| Technologie | Usage |
|---|---|
| React 18 + TypeScript | Framework principal — typage strict |
| Vite | Build tool et dev server |
| TailwindCSS v4 | Styles et design system |
| React Router v6 | Navigation multi-portail + lazy loading |
| Zustand | State management global |
| Axios | Client HTTP + intercepteur JWT |
| keycloak-js | Authentification (mode mock en dev) |
| Vitest + Testing Library | Tests unitaires |

---

## Démarrage rapide

### Prérequis
- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/Ameriesh/study-portal.git
cd study-portal
npm install
```

### Lancement

```bash
npm run dev
```

L'application démarre sur **http://localhost:5173**

### Tests

```bash
# Mode watch
npm test

# Exécution unique
npm run test:run
```

---

## Comptes de test disponibles

L'application fonctionne en mode mock — aucun serveur Keycloak requis.

### Profil Administrateur

| Champ | Valeur |
|---|---|
| Email | `admin@boaz-study.com` |
| Mot de passe | `admin123` |
| Profil | Accès complet |

**Permissions :**

ticket:create     → Bouton "Créer un ticket" visible
ticket:read       → Liste des tickets visible
ticket:update     → Bouton "Modifier le statut" visible
ticket:comment    → Zone de commentaire visible
document:upload   → Bouton "Joindre un fichier" visible
document:read     → Liste des documents visible
notification:read → Badge et centre de notifications visibles

---

### Profil Étudiant (accès limité)

| Champ | Valeur |
|---|---|
| Email | `basic@boaz-study.com` |
| Mot de passe | `basic123` |
| Profil | Accès restreint |

**Permissions :**

ticket:read       → Liste des tickets visible
notification:read → Badge et centre de notifications visibles

**Éléments absents pour ce profil :**

ticket:create     → Bouton "Créer un ticket" absent
ticket:update     → Bouton "Modifier le statut" absent
ticket:comment    → Zone de commentaire absente
document:upload   → Bouton "Joindre un fichier" absent
document:read     → Liste des documents absente

---

## Architecture du projet
src/
├── contracts/                  # Interfaces TypeScript — contrats API
│   └── api-contracts.ts
├── services/
│   ├── mock/                   # Données mock par entité
│   │   ├── auth.mock.ts        # Profils utilisateurs mock
│   │   ├── admin-user.mock.ts  # Re-export profil admin
│   │   ├── basic-user.mock.ts  # Re-export profil basic
│   │   ├── tickets.mock.ts
│   │   ├── documents.mock.ts
│   │   └── notifications.mock.ts
│   ├── api.service.ts          # Axios + intercepteur JWT + fallback mock
│   ├── auth.service.ts         # Service d'authentification unifié
│   └── keycloak.service.ts     # Configuration keycloak-js
├── hooks/
│   └── usePermissions.ts       # Hook RBAC/ABAC basé sur authorities[]
├── components/
│   ├── ProtectedComponent.tsx  # Wrapper de protection par permissions
│   ├── LazyPage.tsx
│   ├── PageLoader.tsx
│   ├── PrivateRoute.tsx
│   └── shared/
│       ├── Layout.tsx          # Shell principal (sidebar + navbar)
│       ├── Sidebar.tsx
│       └── Navbar.tsx
├── portals/
│   ├── auth-portal/            # Login / authentification
│   │   └── pages/
│   │       └── LoginPage.tsx
│   └── main-portal/            # Portail principal
│       ├── pages/
│       │   └── DashboardPage.tsx
│       └── features/
│           ├── tickets/        # Feature tickets
│           │   ├── pages/
│           │   ├── components/
│           │   └── routes.tsx
│           ├── documents/      # Feature documents
│           │   ├── pages/
│           │   ├── components/
│           │   └── routes.tsx
│           └── notifications/  # Feature notifications
│               ├── pages/
│               └── components/
├── store/
│   └── auth.store.ts           # Store Zustand — auth + notifications
├── router/
│   └── index.ts                # Routing principal + lazy loading
└── App.tsx

---

## Modèle de sécurité

### Principe fondamental

La protection des composants est basée **uniquement** sur le tableau
`authorities[]` du JWT. Jamais sur `realm_access.roles`.

```typescript
// ✅ Correct — basé sur authorities[]
const { hasPermission } = usePermissions();
hasPermission('ticket:create'); // → true ou false

// ❌ Incorrect — ne jamais faire ça
user.realm_access.roles.includes('ADMIN');
```

### Structure JWT de référence

```json
{
  "sub": "user-uuid-1234",
  "preferred_username": "john.doe",
  "email": "john.doe@boaz-study.com",
  "realm_access": { "roles": ["AGENT", "USER"] },
  "authorities": [
    "ticket:create", "ticket:read", "ticket:update", "ticket:comment",
    "document:upload", "document:read", "notification:read"
  ],
  "exp": 1712000000
}
```

### Utilisation dans les composants

```tsx
// Hook — vérification programmatique
const { hasPermission, hasAnyPermission } = usePermissions();

// Composant — rendu conditionnel
<ProtectedComponent permission="ticket:create">
  <button>Créer un ticket</button>
</ProtectedComponent>
```

---

## Thème Keycloak

Le dossier `theme/boaz-study/` contient le thème Keycloak prêt pour
la production. Voir `theme/README.md` pour les instructions de déploiement.

En développement, l'application utilise un login custom React avec
validation contre les credentials mock.

---

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=boaz-study
VITE_KEYCLOAK_CLIENT_ID=studyportal-app
VITE_MOCK_AUTH=true
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## Scripts disponibles

```bash
npm run dev        # Démarrage en développement
npm run build      # Build de production
npm run preview    # Prévisualisation du build
npm test           # Tests en mode watch
npm run test:run   # Tests en exécution unique
```

---

## Contact

recrutement@boaz-study.com