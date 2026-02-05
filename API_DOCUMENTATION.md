# Documentation Complète de l'API GradiX

**URL de base**: `http://localhost:8000/api`

---

## 🔐 Authentification

L'API utilise **Token Authentication**. Vous devez inclure le token dans l'en-tête de toute requête authentifiée:

```
Authorization: Token <your-token>
```

---

## 👤 Endpoints Utilisateurs

### 1. Inscription (Signup)

**POST** `/api/users/signup/    `

Crée un nouveau compte utilisateur et retourne un token d'authentification.

**Body (JSON):**
```json
{
  "username": "john_doe",
  "password": "securepassword123",
  "email": "john@example.com"
}
```

**Response (201 Created):**
```json
{
  "token": "abc123xyz789...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Erreurs:**
- `400 Bad Request`: Données invalides (ex: username déjà existant)

---

### 2. Connexion (Login)

**POST** `/api/users/login/`

Authentifie un utilisateur existant et retourne son token.

**Body (JSON):**
```json
{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "abc123xyz789...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Erreurs:**
- `404 Not Found`: Utilisateur ou mot de passe incorrect

---

### 3. Récupérer le profil utilisateur

**GET** `/api/users/{id}/`

Récupère les informations d'un utilisateur spécifique.

**Headers:**
```
Authorization: Token <your-token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com"
}
```

---

### 4. Lister les utilisateurs

**GET** `/api/users/`

⚠️ Retourne uniquement l'utilisateur actuellement connecté (filtré par permission).

**Headers:**
```
Authorization: Token <your-token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
]
```

---

## 📊 Endpoints Notes/Grades

### 1. Ajouter une note (Sans utilisateur)

**POST** `/api/newGrade/{branch_name}/add_grade/`

Ajoute une note à une branche spécifique. L'utilisateur courant est automatiquement assigné.

**URL Parameters:**
- `branch_name`: Nom de la branche (ex: `Mathematics`, `Physics`)

**Headers:**
```
Authorization: Token <your-token>
```

**Body (JSON):**
```json
{
  "grade": 85.5,
  "detail": "Examen Janvier 2026"
}
```

**Response (201 Created):**
```json
{
  "id": 42,
  "grade": 85.5,
  "detail": "Examen Janvier 2026",
  "branch": 3
}
```

**Erreurs:**
- `404 Not Found`: Branche inexistante
- `400 Bad Request`: Données invalides

---

### 2. Récupérer mes notes

**GET** `/api/grades/my_grades/`

Retourne toutes les notes de l'utilisateur connecté.

**Headers:**
```
Authorization: Token <your-token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "grade": 92.0,
    "detail": "Examen final",
    "branch": 1,
    "user": 1
  },
  {
    "id": 2,
    "grade": 85.5,
    "detail": "Examen Janvier",
    "branch": 2,
    "user": 1
  }
]
```

---

### 3. Récupérer les notes par branche

**GET** `/api/grades/{branch_name}/get_grades_by_branch/`

Retourne toutes les notes pour une branche spécifique de l'utilisateur connecté.

**URL Parameters:**
- `branch_name`: Nom de la branche (ex: `Mathematics`)

**Headers:**
```
Authorization: Token <your-token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "grade": 92.0,
    "detail": "Examen final",
    "branch": 1,
    "user": 1
  },
  {
    "id": 5,
    "grade": 88.5,
    "detail": "Contrôle continu",
    "branch": 1,
    "user": 1
  }
]
```

---

### 4. Lister toutes les notes

**GET** `/api/grades/`

Retourne toutes les notes (filtrées par l'utilisateur connecté via les permissions).

**Headers:**
```
Authorization: Token <your-token>
```

**Query Parameters (optionnels):**
- `user=1`: Filtrer par utilisateur
- `branch=2`: Filtrer par branche

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "grade": 92.0,
    "detail": "Examen final",
    "branch": 1,
    "user": 1
  }
]
```

---

### 5. Récupérer une note spécifique

**GET** `/api/grades/{id}/`

Récupère les détails d'une note spécifique.

**Headers:**
```
Authorization: Token <your-token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "grade": 92.0,
  "detail": "Examen final",
  "branch": 1,
  "user": 1
}
```

---

### 6. Modifier une note

**PUT** `/api/grades/{id}/`

Modifie une note complètement.

**Headers:**
```
Authorization: Token <your-token>
```

**Body (JSON):**
```json
{
  "grade": 95.0,
  "detail": "Examen final (révisé)",
  "branch": 1,
  "user": 1
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "grade": 95.0,
  "detail": "Examen final (révisé)",
  "branch": 1,
  "user": 1
}
```

---

### 7. Modification partielle d'une note

**PATCH** `/api/grades/{id}/`

Modifie partiellement une note.

**Headers:**
```
Authorization: Token <your-token>
```

**Body (JSON):**
```json
{
  "grade": 96.0
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "grade": 96.0,
  "detail": "Examen final",
  "branch": 1,
  "user": 1
}
```

---

### 8. Supprimer une note

**DELETE** `/api/grades/{id}/`

Supprime une note spécifique.

**Headers:**
```
Authorization: Token <your-token>
```

**Response (204 No Content)**

---

## 🏫 Endpoints Branches

### 1. Lister toutes les branches

**GET** `/api/branches/`

Retourne la liste de toutes les branches disponibles.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Mathematics",
    "average": 88.5
  },
  {
    "id": 2,
    "name": "Physics",
    "average": 85.0
  },
  {
    "id": 3,
    "name": "Chemistry",
    "average": 92.0
  }
]
```

---

### 2. Récupérer une branche spécifique

**GET** `/api/branches/{id}/`

Récupère les détails d'une branche.

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Mathematics",
  "average": 88.5
}
```

---

### 3. Créer une branche (Admin uniquement)

**POST** `/api/branches/`

Crée une nouvelle branche.

**Body (JSON):**
```json
{
  "name": "Biology",
  "average": 0
}
```

**Response (201 Created):**
```json
{
  "id": 4,
  "name": "Biology",
  "average": 0
}
```

---

### 4. Modifier une branche

**PUT** `/api/branches/{id}/`

Modifie les détails d'une branche.

**Body (JSON):**
```json
{
  "name": "Biology",
  "average": 89.5
}
```

**Response (200 OK):**
```json
{
  "id": 4,
  "name": "Biology",
  "average": 89.5
}
```

---

### 5. Supprimer une branche

**DELETE** `/api/branches/{id}/`

Supprime une branche.

**Response (204 No Content)**

---

## 📋 Modèles de Données

### User (Django built-in)
```python
{
  "id": int,
  "username": str,
  "password": str (write-only),
  "email": str
}
```

### Grade
```python
{
  "id": int,
  "grade": float,
  "detail": str,
  "branch": int (BranchGrade ID),
  "user": int (User ID)
}
```

### AllBranch
```python
{
  "id": int,
  "name": str,
  "average": float
}
```

### BranchGrade
```python
{
  "id": int,
  "branch": int (AllBranch ID)
}
```

---

## 🔗 URLs Résumé

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/users/signup/` | Créer un compte | ❌ |
| POST | `/api/users/login/` | Se connecter | ❌ |
| GET | `/api/users/` | Lister mes infos | ✅ |
| GET | `/api/users/{id}/` | Détails utilisateur | ✅ |
| GET | `/api/grades/` | Lister mes notes | ✅ |
| GET | `/api/grades/{id}/` | Détail note | ✅ |
| POST | `/api/grades/` | Créer une note | ✅ |
| PUT | `/api/grades/{id}/` | Modifier note (complet) | ✅ |
| PATCH | `/api/grades/{id}/` | Modifier note (partiel) | ✅ |
| DELETE | `/api/grades/{id}/` | Supprimer note | ✅ |
| GET | `/api/grades/my_grades/` | Mes notes | ✅ |
| GET | `/api/grades/{name}/get_grades_by_branch/` | Notes par branche | ✅ |
| POST | `/api/newGrade/{branch}/add_grade/` | Ajouter note (facile) | ✅ |
| GET | `/api/branches/` | Lister branches | ✅ |
| GET | `/api/branches/{id}/` | Détail branche | ✅ |
| POST | `/api/branches/` | Créer branche | ✅ |
| PUT | `/api/branches/{id}/` | Modifier branche | ✅ |
| DELETE | `/api/branches/{id}/` | Supprimer branche | ✅ |

---

## 🧪 Exemples cURL

### Inscription
```bash
curl -X POST http://localhost:8000/api/users/signup/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepass123",
    "email": "john@example.com"
  }'
```

### Connexion
```bash
curl -X POST http://localhost:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepass123"
  }'
```

### Ajouter une note
```bash
curl -X POST http://localhost:8000/api/newGrade/Mathematics/add_grade/ \
  -H "Authorization: Token abc123xyz789..." \
  -H "Content-Type: application/json" \
  -d '{
    "grade": 85.5,
    "detail": "Examen Janvier"
  }'
```

### Récupérer mes notes
```bash
curl -X GET http://localhost:8000/api/grades/my_grades/ \
  -H "Authorization: Token abc123xyz789..."
```

### Récupérer notes par branche
```bash
curl -X GET http://localhost:8000/api/grades/Mathematics/get_grades_by_branch/ \
  -H "Authorization: Token abc123xyz789..."
```

### Lister les branches
```bash
curl -X GET http://localhost:8000/api/branches/ \
  -H "Authorization: Token abc123xyz789..."
```

---

## ⚠️ Statuts HTTP

| Code | Signification |
|------|---------------|
| 200 | OK - Requête réussie |
| 201 | Created - Ressource créée |
| 204 | No Content - Suppression réussie |
| 400 | Bad Request - Données invalides |
| 401 | Unauthorized - Non authentifié |
| 403 | Forbidden - Pas de permission |
| 404 | Not Found - Ressource inexistante |
| 500 | Server Error - Erreur serveur |

---

## 🛡️ Permissions

- **Authentification requise** pour: Grades, Branches, User profiles
- **IsOwner**: Peut uniquement modifier ses propres données
- **IsAuthenticated**: Doit être connecté
- **Public**: Signup et Login sans authentification

