## Pondering about...
Dans le mod Create pour Minecraft, il existe des petites scènes 3D qui présentent les mécaniques du mod. L'idée ici est de se servir d'autres mods, KubeJS et PonderJS, pour écrire nos propres scènes en Javascript. Chaque scène est associée à une structure, fabriquée en jeu et sauvegardée dans un fichier .nbt. On référence cette structure dans le code, faisant apparaitre des parties, en cachant d'autres, changeant les propriétés des blocs, affichant du texte pour donner des explications, jouant avec la caméra etc. Toutes les méthodes présentes dans Create ne sont pas accessibles sous PonderJS.

![ExPonderCh1](https://github.com/Avengiron/HostReadMeImages/blob/main/CreateModPonderScenes/ExPonderCh1.png)
![ExPonderCh1A](https://github.com/Avengiron/HostReadMeImages/blob/main/CreateModPonderScenes/ExPonderCh1a.png)
![ExPonderCh2](https://github.com/Avengiron/HostReadMeImages/blob/main/CreateModPonderScenes/ExPonderCh2.png)
![ExPonderCh2A](https://github.com/Avengiron/HostReadMeImages/blob/main/CreateModPonderScenes/ExPonderCh2a.png)

## Above and Beyond
Create Above and Beyond est un modpack fait par les développeurs de Create. Il fait intervenir plein de nouvelles mécaniques, créé des recettes uniques mélangeant plusieurs mods pour une aventure progressive centrée sur le mod Create. J'ai décidé de partager mes créations en jeu en codant des scènes Ponder pour les 9 chapitres principaux, découpées en petits process indépendants mis bout à bout, avant de présenter les usines complètes.

![ExPonderCh3](https://github.com/Avengiron/HostReadMeImages/blob/main/CreateModPonderScenes/ExPonderCh3.png)
![ExPonderCh3A](https://github.com/Avengiron/HostReadMeImages/blob/main/CreateModPonderScenes/ExPonderCh3a.png)
![ExPonderCh4](https://github.com/Avengiron/HostReadMeImages/blob/main/CreateModPonderScenes/ExPonderCh4.png)
![ExPonderCh4A](https://github.com/Avengiron/HostReadMeImages/blob/main/CreateModPonderScenes/ExPonderCh4a.png)

# Notes
Certains problèmes rencontrés ont nécessité des ajustements par rapport au modpack. 
- Les items en jeu qui ont un effet d'enchantement provoquent des glitchs visuels ou des crashs du jeu. Il a donc fallu créer de nouveaux items juste pour les scènes en question. (Refined Radiance, Radiant Sheet & Radiant Induction Coil)
- Certains blocks provoquent des crashs du jeu. Il a donc fallu créer de nouveaux blocks et models pour les utiliser dans les scènes Ponder. (Lampes Laser)
- Certains blocks provoquent des problèmes de rendu. Leur textures a été appliqués sur d'autres blocks pour simuler leur apparition dans les scènes. (Les Drawers et Compacting Drawers sont en fait des machines Thermal)

![ExPonderCh5](https://github.com/Avengiron/HostReadMeImages/blob/main/CreateModPonderScenes/ExPonderCh5.png)

# Chapitre 5
Le chapitre 5 fait intervenir le mod Applied Energistics 2. Le mod n'a pas de support Ponder dans sa version 1.16.5 (version du modpack). Il a en revanche un support Ponder dans les versions 1.18+. Une partie du chapitre 5 de C:A&B a été portée sur une version 1.19.2 pour pouvoir animer les scènes. C'est le seul chapitre qui ne peut pas être mis dans le modpack mais qui a quand même sa vidéo.

## Résultat
Les vidéos des 9 chapitres sont disponibles sur cette playlist YouTube: https://youtube.com/playlist?list=PLOy458eTuChTZg-6MnROh3TiNUDHcV36J
