# Exemples d'utilisation de l'API GradiX

## 🚀 Démarrer rapidement

### 1. Inscription et Connexion

**Créer un compte:**
```bash
curl -X POST http://localhost:8000/api/users/signup/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alex_student",
    "password": "MySecurePass123!",
    "email": "alex@example.com"
  }'
```

**Réponse:**
```json
{
  "token": "abc123xyz789def456ghi789jkl012mno345pqr",
  "user": {
    "id": 1,
    "username": "alex_student",
    "email": "alex@example.com"
  }
}
```

💾 **Sauvegardez le token!** Vous en aurez besoin pour chaque requête.

---

### 2. Se connecter avec un compte existant

```bash
TOKEN=$(curl -X POST http://localhost:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alex_student",
    "password": "MySecurePass123!"
  }' | jq -r '.token')

echo $TOKEN
```

---

## 📊 Ajouter des Notes

### Ajouter une note simple

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

curl -X POST http://localhost:8000/api/newGrade/Mathematics/add_grade/ \
  -H "Authorization: Token $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "grade": 87.5,
    "detail": "Examen Trigonométrie"
  }'
```

**Réponse:**
```json
{
  "id": 1,
  "grade": 87.5,
  "detail": "Examen Trigonométrie",
  "branch": 1
}
```

---

### Ajouter plusieurs notes à différentes branches

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

# Mathématiques
curl -X POST http://localhost:8000/api/newGrade/Mathematics/add_grade/ \
  -H "Authorization: Token $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"grade": 87.5, "detail": "Examen Trigonométrie"}'

# Physique
curl -X POST http://localhost:8000/api/newGrade/Physics/add_grade/ \
  -H "Authorization: Token $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"grade": 92.0, "detail": "Examen Mécanique"}'

# Chimie
curl -X POST http://localhost:8000/api/newGrade/Chemistry/add_grade/ \
  -H "Authorization: Token $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"grade": 85.0, "detail": "Examen Réactions"}'
```

---

## 📈 Récupérer les Notes

### Récupérer toutes mes notes

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

curl -X GET http://localhost:8000/api/grades/my_grades/ \
  -H "Authorization: Token $TOKEN"
```

**Réponse:**
```json
[
  {
    "id": 1,
    "grade": 87.5,
    "detail": "Examen Trigonométrie",
    "branch": 1,
    "user": 1
  },
  {
    "id": 2,
    "grade": 92.0,
    "detail": "Examen Mécanique",
    "branch": 2,
    "user": 1
  },
  {
    "id": 3,
    "grade": 85.0,
    "detail": "Examen Réactions",
    "branch": 3,
    "user": 1
  }
]
```

---

### Récupérer les notes par branche

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

# Notes de Mathématiques uniquement
curl -X GET http://localhost:8000/api/grades/Mathematics/get_grades_by_branch/ \
  -H "Authorization: Token $TOKEN"

# Notes de Physique uniquement
curl -X GET http://localhost:8000/api/grades/Physics/get_grades_by_branch/ \
  -H "Authorization: Token $TOKEN"
```

**Réponse (Mathématiques):**
```json
[
  {
    "id": 1,
    "grade": 87.5,
    "detail": "Examen Trigonométrie",
    "branch": 1,
    "user": 1
  },
  {
    "id": 4,
    "grade": 91.0,
    "detail": "Devoir Algèbre",
    "branch": 1,
    "user": 1
  }
]
```

---

### Récupérer une note spécifique

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

curl -X GET http://localhost:8000/api/grades/1/ \
  -H "Authorization: Token $TOKEN"
```

**Réponse:**
```json
{
  "id": 1,
  "grade": 87.5,
  "detail": "Examen Trigonométrie",
  "branch": 1,
  "user": 1
}
```

---

## ✏️ Modifier les Notes

### Modifier complètement une note

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

curl -X PUT http://localhost:8000/api/grades/1/ \
  -H "Authorization: Token $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "grade": 89.0,
    "detail": "Examen Trigonométrie (révisé)",
    "branch": 1,
    "user": 1
  }'
```

---

### Modifier partiellement une note

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

# Modifier uniquement la note
curl -X PATCH http://localhost:8000/api/grades/1/ \
  -H "Authorization: Token $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"grade": 90.5}'

# Modifier uniquement le détail
curl -X PATCH http://localhost:8000/api/grades/1/ \
  -H "Authorization: Token $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"detail": "Examen Trigonométrie (rattrapage)"}'
```

---

## 🗑️ Supprimer les Notes

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

curl -X DELETE http://localhost:8000/api/grades/1/ \
  -H "Authorization: Token $TOKEN"
```

**Réponse:** 204 No Content

---

## 🏫 Gérer les Branches

### Récupérer toutes les branches

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

curl -X GET http://localhost:8000/api/branches/ \
  -H "Authorization: Token $TOKEN"
```

**Réponse:**
```json
[
  {
    "id": 1,
    "name": "Mathematics",
    "average": 89.2
  },
  {
    "id": 2,
    "name": "Physics",
    "average": 88.5
  },
  {
    "id": 3,
    "name": "Chemistry",
    "average": 86.0
  }
]
```

---

### Créer une nouvelle branche

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

curl -X POST http://localhost:8000/api/branches/ \
  -H "Authorization: Token $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Biology",
    "average": 0
  }'
```

**Réponse:**
```json
{
  "id": 4,
  "name": "Biology",
  "average": 0
}
```

---

### Modifier une branche

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

curl -X PUT http://localhost:8000/api/branches/4/ \
  -H "Authorization: Token $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Biology",
    "average": 87.5
  }'
```

---

### Supprimer une branche

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

curl -X DELETE http://localhost:8000/api/branches/4/ \
  -H "Authorization: Token $TOKEN"
```

---

## 👤 Gérer les Utilisateurs

### Récupérer mon profil

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

curl -X GET http://localhost:8000/api/users/ \
  -H "Authorization: Token $TOKEN"
```

**Réponse:**
```json
[
  {
    "id": 1,
    "username": "alex_student",
    "email": "alex@example.com"
  }
]
```

---

### Récupérer les détails d'un utilisateur

```bash
TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

curl -X GET http://localhost:8000/api/users/1/ \
  -H "Authorization: Token $TOKEN"
```

---

## 🔧 Scripts Pratiques

### Script : Importer des notes en bulk

**notes.json:**
```json
[
  {"subject": "Mathematics", "grade": 87.5, "detail": "Examen 1"},
  {"subject": "Mathematics", "grade": 91.0, "detail": "Examen 2"},
  {"subject": "Physics", "grade": 88.0, "detail": "Examen 1"},
  {"subject": "Physics", "grade": 92.5, "detail": "Examen 2"},
  {"subject": "Chemistry", "grade": 85.0, "detail": "Examen 1"}
]
```

**import_notes.sh:**
```bash
#!/bin/bash

TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

while IFS= read -r line; do
  subject=$(echo $line | jq -r '.subject')
  grade=$(echo $line | jq -r '.grade')
  detail=$(echo $line | jq -r '.detail')
  
  curl -X POST http://localhost:8000/api/newGrade/$subject/add_grade/ \
    -H "Authorization: Token $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"grade\": $grade, \"detail\": \"$detail\"}"
    
  echo "Ajouté: $subject - $grade ($detail)"
done < <(jq -c '.[]' notes.json)
```

**Utilisation:**
```bash
chmod +x import_notes.sh
./import_notes.sh
```

---

### Script : Calculer la moyenne

```bash
#!/bin/bash

TOKEN="abc123xyz789def456ghi789jkl012mno345pqr"

RESPONSE=$(curl -s -X GET http://localhost:8000/api/grades/my_grades/ \
  -H "Authorization: Token $TOKEN")

AVERAGE=$(echo $RESPONSE | jq '[.[].grade] | add / length')

echo "Moyenne générale: $AVERAGE"
```

---

## 🐛 Dépannage

### "401 Unauthorized"
Assurez-vous que votre token est correct et pas expiré.

### "404 Not Found"
Vérifiez que la branche existe ou utilisez le bon ID.

### "400 Bad Request"
Vérifiez la structure JSON de votre requête.

---

## 📚 Ressources

- [Django REST Framework Docs](https://www.django-rest-framework.org/)
- [Token Authentication](https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication)
- [Postman Collection](/GradiX_API.postman_collection.json)
- [API Documentation](/API_DOCUMENTATION.md)

