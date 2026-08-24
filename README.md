# Natsu Studio V3
Version refondue du site avec :
- compte facultatif pour visiter ;
- compte obligatoire pour commander ;
- connexion Google ;
- e-mail + mot de passe ;
- choix prévu pour l'OTP e-mail ;
- menu Mon compte au survol ;
- Mon compte / Mes commandes / Paramètres ;
- Paramètres avec uniquement Sécurité, Informations et Code promo ;
- favicon.

## Important
Le fichier `js/supabase.js` contient uniquement la Publishable Key. Ne jamais mettre une clé `service_role` ou `sb_secret` dans GitHub.

## Base Supabase
Le schéma SQL créé précédemment doit être conservé. Pour le changement d'e-mail tous les 10 jours, la table `profiles` doit recevoir la colonne `email_changed_at`.
