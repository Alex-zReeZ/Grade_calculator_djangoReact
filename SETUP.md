# Configuration du Projet GradiX

## ✅ Configuration effectuée

- ✔️ Environnement virtuel Python créé
- ✔️ Dépendances backend (Django, DRF, JWT) installées
- ✔️ Dépendances frontend (React, Tailwind, etc.) installées
- ✔️ Migrations Django appliquées
- ✔️ Fichiers `.env.example` créés
- ✔️ `.gitignore` mis à jour
- ✔️ Script de démarrage créé

## 🚀 Démarrage du projet

### Option 1: Utiliser le script automatique
```bash
./start.sh
```

### Option 2: Démarrage manuel

#### Backend (Django)
```bash
cd server
source ../venv/bin/activate
python manage.py runserver
# Accès à http://localhost:8000
# Admin à http://localhost:8000/admin
```

#### Frontend (React)
```bash
cd frontend
npm start
# Accès à http://localhost:3000
```

## 📝 Configurez les fichiers d'environnement

### Backend (`server/.env`)
Copiez et adaptez le fichier exemple:
```bash
cp server/.env.example server/.env
```

### Frontend (`frontend/.env`)
Copiez et adaptez le fichier exemple:
```bash
cp frontend/.env.example frontend/.env
```

## 🔧 Commandes utiles

### Django
```bash
# Créer un superutilisateur
python manage.py createsuperuser

# Lancer le serveur
python manage.py runserver

# Appliquer les migrations
python manage.py migrate

# Créer des migrations
python manage.py makemigrations
```

### React
```bash
# Démarrer le serveur de développement
npm start

# Construire pour la production
npm run build

# Exécuter les tests
npm test

# Formater le code
npm run format
```

## 🗄️ Base de données

Le projet utilise SQLite par défaut. Le fichier `db.sqlite3` sera créé automatiquement après `python manage.py migrate`.

## 🔐 Sécurité

⚠️ **IMPORTANT**: Les fichiers `.env` contiennent des informations sensibles et ne doivent **jamais** être commités.

En développement, vous pouvez utiliser les valeurs par défaut de `settings.py`, mais en production:
- Changez la `SECRET_KEY`
- Définissez `DEBUG = False`
- Configurez correctement `ALLOWED_HOSTS`
- Utilisez une base de données en production (PostgreSQL recommandé)

## 📦 Mise à jour des dépendances

### Backend
```bash
cd server
pip install -r requirements.txt --upgrade
pip freeze > requirements.txt
```

### Frontend
```bash
cd frontend
npm update
npm audit fix
```

## 🐛 Dépannage

### Les migrations échouent
```bash
python manage.py migrate --fake-initial
```

### Le port est déjà utilisé
```bash
# Backend sur un autre port
python manage.py runserver 8001

# Frontend sur un autre port
PORT=3001 npm start
```

### Problèmes d'installation npm
```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Le projet est maintenant prêt à être utilisé! 🎉**
