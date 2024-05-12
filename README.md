NOM : Solofoniaina PRÉNOM : Ninah
NOM : Satkunarajah PRÉNOM : Sarusman

NOTE : Il faut impérativement actualiser la page avant de charger un nouveau monde.

NOTE : La gestion des collision entre les trains ne fonctionne pas dans certains cas, cela inclus les collisions entre les wagons/wagons, locomotive/wagon. Malheureusement nous n'avons pas trouvé de solution stable.
NOTE : Les fonctionnalités des monstres buggent parfois.


Graphismes Améliorés :
	Refonte des sprites pour une résolution plus élevée.
	Ajout d'animations CSS pour les mouvements des trains et interactions.

Ergonomie Optimisée :
	Réorganisation des boutons pour une meilleure accessibilité.
	Remplacement des boutons textuels par des images, avec indication de l'état actif ou inactif par transparence.

Trains :
	Vitesses des trains réglable grâce à la barre verte.
	Explose s'ils rencontres un monstre

Effets Sonores :
	Intégration de nouveaux sons, comme le sifflement aléatoire et le crissement des roues dans les virages.
	Bruit d'explosion dans certains cas de collisions.
	Son distinctif pour les trains à haute vitesse (au-delà de 700ms).
	Implémentation d'un effet sonore pendant les écrans de chargement pour améliorer l'expérience utilisateur.


Monstre Interactif :
	Introduction d'un monstre qui se déplace grâce au clavier (haut, gauchen droite, bas) et peut interagir avec les trains, causant des explosions.
	Options configurables pour limiter les déplacements du monstre sur certains terrains, comme l'eau.

Sélection de Mondes :
	Ajout d'une fonctionnalité permettant de choisir un monde de jeu parmi plusieurs options thématiques (désert, pôle nord, Mars) lors du démarrage.
	Monde:
		- Monde Glacial
		- Monde Désertique
		- Monde Loop (meilleurs des mondes avec une vitesse élevé)
		- Monde Mystérieux

SOURCES: 
	Sources des images:
		- https://www.freepng.fr/
		- Chat GPT model 4

	Sources des sons:
		- https://lasonotheque.org

	Maps:
		- Aide de ChatGPT model 4

	Code de la partie 2:
		- Aide de ChatGPT model 4 et 3.5
		- Certaines fonctionnalités sont entièrement générées par ces modèles

Prompts:
	- il n'y a que ces type de cases. creer moi un nouveau monde. Voici un exemple:...
	- genere moi les image (carré ) pour Type_de_case.Eau  Type_de_case.Foret; pour un monde de neige
	- cases eau et sable pour map désertique
	- *Nombreuses correction de bout de code*
	- Comment faire intégrer les flèches du clavier à la logique de la fonction deplacerMonstre

