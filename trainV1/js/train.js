/************************************************************/
/**
 * Université Sorbonne Paris Nord, Programmation Web
 * Auteurs                       : Étienne André
 * Création                      : 2023/12/11
 * Dernière modification         : 2024/04/02
 */
/************************************************************/

'use strict'

/************************************************************/
/* Constantes */
/************************************************************/

/*------------------------------------------------------------*/
// Dimensions du plateau
/*------------------------------------------------------------*/

// Nombre de cases par défaut du simulateur
const LARGEUR_PLATEAU	= 30;
const HAUTEUR_PLATEAU	= 15;

// Dimensions des cases par défaut en pixels
const LARGEUR_CASE	= 35;
const HAUTEUR_CASE	= 40;
let TRAINS={"TRAIN1":[], "TRAIN2":[], "TRAIN4":[], "TRAIN6":[]};
let AVANCE_TRAIN=true;

/*------------------------------------------------------------*/
// Types des cases
/*------------------------------------------------------------*/
class Type_de_case{
	static Foret						= new Type_de_case('foret');

	static Eau							= new Type_de_case('eau');

	static Rail_horizontal				= new Type_de_case('rail horizontal');

	static Rail_vertical				= new Type_de_case('rail vertical');

	// NOTE: faisant la jonction de horizontal à vertical en allant vers la droite puis vers le haut (ou de vertical vers horizontal en allant de bas vers gauche)
	static Rail_droite_vers_haut		= new Type_de_case('rail droite vers haut');

	// NOTE: faisant la jonction de vertical à horizontal en allant vers le haut puis vers la droite (ou de horizontal à vertical en allant de gauche vers le bas)
	static Rail_haut_vers_droite		= new Type_de_case('rail haut vers droite');

	// NOTE: faisant la jonction de horizontal à vertical en allant vers la droite puis vers le bas (ou de vertical vers horizontal en allant de haut vers gauche)
	static Rail_droite_vers_bas		= new Type_de_case('rail droite vers bas');

	// NOTE: faisant la jonction de vertical à horizontal en allant vers le bas puis vers la droite (ou de horizontal à vertical en allant de gauche vers le haut)
	static Rail_bas_vers_droite		= new Type_de_case('rail bas vers droite');

	static Wagon		= new Type_de_case('wagon');
	static Loco		= new Type_de_case('loco');
	constructor(nom) {
		this.nom = nom;
	}
}

class Direction{
	static Nord=new Direction("nord");
	static Sud=new Direction("sud");
	static ouest=new Direction("ouest");
	static est=new Direction("est");
	constructor(nom){
		this.direction=nom;
	}
}

/*------------------------------------------------------------*/
// Images
/*------------------------------------------------------------*/
const IMAGE_EAU = new Image();
IMAGE_EAU.src = 'images/eau.png';

const IMAGE_FORET = new Image();
IMAGE_FORET.src = 'images/foret.png';

const IMAGE_LOCO = new Image();
IMAGE_LOCO.src = 'images/locomotive.png';

const IMAGE_RAIL_HORIZONTAL = new Image();
IMAGE_RAIL_HORIZONTAL.src = 'images/rail-horizontal.png';

const IMAGE_RAIL_VERTICAL = new Image();
IMAGE_RAIL_VERTICAL.src = 'images/rail-vertical.png';

const IMAGE_RAIL_BAS_VERS_DROITE = new Image();
IMAGE_RAIL_BAS_VERS_DROITE.src = 'images/rail-bas-vers-droite.png';

const IMAGE_RAIL_DROITE_VERS_BAS = new Image();
IMAGE_RAIL_DROITE_VERS_BAS.src = 'images/rail-droite-vers-bas.png';

const IMAGE_RAIL_DROITE_VERS_HAUT = new Image();
IMAGE_RAIL_DROITE_VERS_HAUT.src = 'images/rail-droite-vers-haut.png';

const IMAGE_RAIL_HAUT_VERS_DROITE = new Image();
IMAGE_RAIL_HAUT_VERS_DROITE.src = 'images/rail-haut-vers-droite.png';

const IMAGE_WAGON = new Image();
IMAGE_WAGON.src = 'images/wagon.png';


/************************************************************/
// Variables globales
/************************************************************/

// TODO


/************************************************************/
/* Classes */
/************************************************************/

/*------------------------------------------------------------*/
// Plateau
/*------------------------------------------------------------*/

class Plateau{
	/* Constructeur d'un plateau vierge */
	constructor(){
		this.largeur = LARGEUR_PLATEAU;
		this.hauteur = HAUTEUR_PLATEAU;

		// NOTE: à compléter…

		// État des cases du plateau
		// NOTE: tableau de colonnes, chaque colonne étant elle-même un tableau de cases (beaucoup plus simple à gérer avec la syntaxe case[x][y] pour une coordonnée (x,y))
		this.cases = [];
		for (let x = 0; x < this.largeur; x++) {
			this.cases[x] = [];
			for (let y = 0; y < this.hauteur; y++) {
				this.cases[x][y] = Type_de_case.Foret;
			}
		}
	}
	
}
class Trains{
	constructor(){
		this.largeur = LARGEUR_PLATEAU+1;
		this.hauteur = HAUTEUR_PLATEAU+1;
		this.cases = [];
		for (let x = 0; x < this.largeur; x++) {
			this.cases[x] = [];
			for (let y = 0; y < this.hauteur; y++) {
				this.cases[x][y] = 0; // 0 : RIEN ; 1 : Locomotive ; 2 : Wagon
			}
		}
	}
	
}




/************************************************************/
// Méthodes
/************************************************************/

function image_of_case(type_de_case){
	switch(type_de_case){
		case Type_de_case.Foret					: return IMAGE_FORET;
		case Type_de_case.Eau					: return IMAGE_EAU;
		case Type_de_case.Rail_horizontal		: return IMAGE_RAIL_HORIZONTAL;
		case Type_de_case.Rail_vertical			: return IMAGE_RAIL_VERTICAL;
		case Type_de_case.Rail_droite_vers_haut	: return IMAGE_RAIL_DROITE_VERS_HAUT;
		case Type_de_case.Rail_haut_vers_droite	: return IMAGE_RAIL_HAUT_VERS_DROITE;
		case Type_de_case.Rail_droite_vers_bas	: return IMAGE_RAIL_DROITE_VERS_BAS;
		case Type_de_case.Rail_bas_vers_droite	: return IMAGE_RAIL_BAS_VERS_DROITE;
		case Type_de_case.Wagon	: return IMAGE_WAGON;
		case Type_de_case.Loco	: return IMAGE_LOCO;

    }
}


function dessine_case(contexte, plateau, x, y, trains){
	const la_case = plateau.cases[x][y];
	const la_case_train = trains.cases[x][y];

    if (la_case===Type_de_case.Rail_horizontal || la_case===Type_de_case.Rail_vertical || la_case===Type_de_case.Rail_droite_vers_haut ||la_case===Type_de_case.Rail_haut_vers_droite ||la_case===Type_de_case.Rail_droite_vers_bas ||la_case===Type_de_case.Rail_bas_vers_droite ) {
        contexte.fillStyle='gray';
        contexte.fillRect(x*LARGEUR_CASE, y*HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
    }
	let image_a_afficher=image_of_case(la_case);
	contexte.drawImage(image_a_afficher, x*LARGEUR_CASE, y*HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);


	if (la_case_train!=0){
		let image_a_afficher_train=image_of_case(la_case_train);
		contexte.drawImage(image_a_afficher_train, x*LARGEUR_CASE, y*HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
	}
}

function dessine_plateau(page, plateau, trains){
	// Dessin du plateau avec paysages et rails
	for (let x = 0; x < plateau.largeur; x++) {
		for (let y = 0; y < plateau.hauteur; y++) {
			dessine_case(page, plateau, x, y, trains);
		}
	}

	// NOTE: à compléter…
}


/************************************************************/
// Auditeurs
/************************************************************/

// TODO


/************************************************************/
// Plateau de jeu initial
/************************************************************/


function cree_plateau_initial(plateau){
	// Circuit
	plateau.cases[12][7] = Type_de_case.Rail_horizontal;
	plateau.cases[13][7] = Type_de_case.Rail_horizontal;
	plateau.cases[14][7] = Type_de_case.Rail_horizontal;
	plateau.cases[15][7] = Type_de_case.Rail_horizontal;
	plateau.cases[16][7] = Type_de_case.Rail_horizontal;
	plateau.cases[17][7] = Type_de_case.Rail_horizontal;
	plateau.cases[18][7] = Type_de_case.Rail_horizontal;
	plateau.cases[19][7] = Type_de_case.Rail_droite_vers_haut;
	plateau.cases[19][6] = Type_de_case.Rail_vertical;
	plateau.cases[19][5] = Type_de_case.Rail_droite_vers_bas;
	plateau.cases[12][5] = Type_de_case.Rail_horizontal;
	plateau.cases[13][5] = Type_de_case.Rail_horizontal;
	plateau.cases[14][5] = Type_de_case.Rail_horizontal;
	plateau.cases[15][5] = Type_de_case.Rail_horizontal;
	plateau.cases[16][5] = Type_de_case.Rail_horizontal;
	plateau.cases[17][5] = Type_de_case.Rail_horizontal;
	plateau.cases[18][5] = Type_de_case.Rail_horizontal;
	plateau.cases[11][5] = Type_de_case.Rail_haut_vers_droite;
	plateau.cases[11][6] = Type_de_case.Rail_vertical;
	plateau.cases[11][7] = Type_de_case.Rail_bas_vers_droite;

	// Segment isolé à gauche
	plateau.cases[0][7] = Type_de_case.Rail_horizontal;
	plateau.cases[1][7] = Type_de_case.Rail_horizontal;
	plateau.cases[2][7] = Type_de_case.Rail_horizontal;
	plateau.cases[3][7] = Type_de_case.Rail_horizontal;
	plateau.cases[4][7] = Type_de_case.Rail_horizontal;
	plateau.cases[5][7] = Type_de_case.Eau;
	plateau.cases[6][7] = Type_de_case.Rail_horizontal;
	plateau.cases[7][7] = Type_de_case.Rail_horizontal;

	// Plan d'eau
	for(let x = 22; x <= 27; x++){
		for(let y = 2; y <= 5; y++){
			plateau.cases[x][y] = Type_de_case.Eau;
		}
	}

	// Segment isolé à droite
	plateau.cases[22][8] = Type_de_case.Rail_horizontal;
	plateau.cases[23][8] = Type_de_case.Rail_horizontal;
	plateau.cases[24][8] = Type_de_case.Rail_horizontal;
	plateau.cases[25][8] = Type_de_case.Rail_horizontal;
	plateau.cases[26][8] = Type_de_case.Rail_bas_vers_droite;
	plateau.cases[27][8] = Type_de_case.Rail_horizontal;
	plateau.cases[28][8] = Type_de_case.Rail_horizontal;
	plateau.cases[29][8] = Type_de_case.Rail_horizontal;

	// TCHOU
	plateau.cases[3][10] = Type_de_case.Eau;
	plateau.cases[4][10] = Type_de_case.Eau;
	plateau.cases[4][11] = Type_de_case.Eau;
	plateau.cases[4][12] = Type_de_case.Eau;
	plateau.cases[4][13] = Type_de_case.Eau;
	plateau.cases[4][13] = Type_de_case.Eau;
	plateau.cases[5][10] = Type_de_case.Eau;

	plateau.cases[7][10] = Type_de_case.Eau;
	plateau.cases[7][11] = Type_de_case.Eau;
	plateau.cases[7][12] = Type_de_case.Eau;
	plateau.cases[7][13] = Type_de_case.Eau;
	plateau.cases[8][10] = Type_de_case.Eau;
	plateau.cases[9][10] = Type_de_case.Eau;
	plateau.cases[8][13] = Type_de_case.Eau;
	plateau.cases[9][13] = Type_de_case.Eau;

	plateau.cases[11][10] = Type_de_case.Eau;
	plateau.cases[11][11] = Type_de_case.Eau;
	plateau.cases[11][12] = Type_de_case.Eau;
	plateau.cases[11][13] = Type_de_case.Eau;
	plateau.cases[12][11] = Type_de_case.Eau;
	plateau.cases[13][10] = Type_de_case.Eau;
	plateau.cases[13][11] = Type_de_case.Eau;
	plateau.cases[13][12] = Type_de_case.Eau;
	plateau.cases[13][13] = Type_de_case.Eau;

	plateau.cases[15][10] = Type_de_case.Eau;
	plateau.cases[15][11] = Type_de_case.Eau;
	plateau.cases[15][12] = Type_de_case.Eau;
	plateau.cases[15][13] = Type_de_case.Eau;
	plateau.cases[16][10] = Type_de_case.Eau;
	plateau.cases[16][13] = Type_de_case.Eau;
	plateau.cases[17][10] = Type_de_case.Eau;
	plateau.cases[17][11] = Type_de_case.Eau;
	plateau.cases[17][12] = Type_de_case.Eau;
	plateau.cases[17][13] = Type_de_case.Eau;

	plateau.cases[19][10] = Type_de_case.Eau;
	plateau.cases[19][11] = Type_de_case.Eau;
	plateau.cases[19][12] = Type_de_case.Eau;
	plateau.cases[19][13] = Type_de_case.Eau;
	plateau.cases[20][13] = Type_de_case.Eau;
	plateau.cases[21][10] = Type_de_case.Eau;
	plateau.cases[21][11] = Type_de_case.Eau;
	plateau.cases[21][12] = Type_de_case.Eau;
	plateau.cases[21][13] = Type_de_case.Eau;
}


let caseSelect=null;

function calcul_nb_rail_gauche(plateau, x, y){
	let res=0;
	while(x>0 && plateau.cases[x][y]["nom"]==="rail horizontal"){
		res=res+1;
		x=x-1
	}
	return res;
}

function dessine_trains(contexte, plateau, trains){
	for (let ligne=0; ligne<trains.cases.length-1; ligne++){
		for (let col=0; col<trains.cases[ligne].length-1; col++){
			if (trains.cases[ligne][col]==1){
					trains.cases[ligne][col]=Type_de_case.Loco;
					dessine_case(contexte, plateau, ligne, col, trains);
			}else if (trains.cases[ligne][col]==2){
					trains.cases[ligne][col]=Type_de_case.Wagon;
					dessine_case(contexte, plateau, ligne, col, trains);
			}
		}
	}
}

function ajouter_train(contexte, plateau, caseX, caseY, trains){
		const NB_max=calcul_nb_rail_gauche(plateau, caseX, caseY);
		let tls=[];
		if (plateau.cases[caseX][caseY]["nom"]==="rail horizontal"){
				   	if (caseSelect=="TRAIN1"){
				   		trains.cases[caseX][caseY]=1;
				   		trains.cases[caseX-1][caseY]=10;
				   		tls.push(caseX, caseY);
				   		tls.push(caseX-1, caseY);
				   	}else if (caseSelect=="TRAIN2"){
				   		if ((NB_max)>=2){
				   			trains.cases[caseX][caseY]=1;
				   			tls.push(caseX, caseY);
				   			trains.cases[caseX-1][caseY]=2;
				   			tls.push(caseX-1, caseY);
				   		}
				   	}else if (caseSelect=="TRAIN4"){
				   		if ((NB_max)>=4){
				   			trains.cases[caseX][caseY]=1;
				   			tls.push(caseX, caseY);
				   			trains.cases[caseX-1][caseY]=2;
				   			tls.push(caseX-1, caseY);
				   			trains.cases[caseX-2][caseY]=2;
				   			tls.push(caseX-2, caseY);
				   			trains.cases[caseX-3][caseY]=2;
				   			tls.push(caseX-3, caseY);
				   		}
				   	}else if (caseSelect=="TRAIN6"){
				   		if ((NB_max)>=6){
				   			trains.cases[caseX][caseY]=1;
				   			tls.push(caseX, caseY);
				   			trains.cases[caseX-1][caseY]=2;
				   			tls.push(caseX-1, caseY);
				   			trains.cases[caseX-2][caseY]=2;
				   			tls.push(caseX-2, caseY);
				   			trains.cases[caseX-3][caseY]=2;
				   			tls.push(caseX-3, caseY);
				   			trains.cases[caseX-4][caseY]=2;
				   			tls.push(caseX-4, caseY);
				   			trains.cases[caseX-5][caseY]=2;
				   			tls.push(caseX-5, caseY);
							}
						}
		}
		tls.push(Type_de_case.Rail_horizontal)
		TRAINS[caseSelect].push(tls)
		dessine_trains(contexte, plateau, trains);
}


function is_next_case(plateau, x, y, direction, trains) {
	let dir;
	let dirx=0; let diry=0;
	if (direction==Type_de_case.Rail_horizontal){
		if (trains.cases[x+1][y]==0 || trains.cases[x+1][y]==10){
			dir=1;
		}else{
			dir=-1;
		}
		if (x+dir<LARGEUR_PLATEAU && x+dir>=0){
			if(plateau.cases[x+dir][y]["nom"]=="rail horizontal"){
				return [x+dir, y, Type_de_case.Rail_horizontal]
			}else if ((plateau.cases[x+1][y]["nom"]=="rail droite vers haut")){
				return [x+dir, y, Type_de_case.Rail_droite_vers_haut]
			}else if(plateau.cases[x+dir][y]["nom"]=="rail droite vers bas"){
				return [x+dir, y, Type_de_case.Rail_droite_vers_bas]
			}else if(plateau.cases[x+dir][y]["nom"]=="rail haut vers droite"){
				return [x+dir, y, Type_de_case.Rail_haut_vers_droite]
			}else if(plateau.cases[x+dir][y]["nom"]=="rail bas vers droite"){
				return [x+dir, y, Type_de_case.Rail_bas_vers_droite]
			}
		}
	}else	if (direction==Type_de_case.Rail_droite_vers_haut){
		if (trains.cases[x-1][y]==Type_de_case.Wagon){
			diry=-1;
		}else if (trains.cases[x][y-1]==Type_de_case.Wagon){
			dirx=-1;
		}
		if (x+dirx<LARGEUR_PLATEAU && y+diry<HAUTEUR_PLATEAU && x+dirx>=0 && y+diry>=0){
			if(plateau.cases[x+dirx][y+diry]["nom"]=="rail vertical"){
				return [x+dirx, y+diry, Type_de_case.Rail_vertical]
			}else if ((plateau.cases[x+dirx][y+diry]["nom"]=="rail droite vers bas")){
				return [x+dirx, y+diry, Type_de_case.Rail_droite_vers_bas]
			}else if ((plateau.cases[x+dirx][y+diry]["nom"]=="rail haut vers droite")){
				return [x+dirx, y+diry, Type_de_case.Rail_haut_vers_droite]
			}else if ((plateau.cases[x+dirx][y+diry]["nom"]=="rail horizontal")){
				return [x+dirx, y+diry, Type_de_case.Rail_horizontal]
			}
		}
	}else	if (direction==Type_de_case.Rail_vertical){
		if (trains.cases[x][y+1]==0){
			dir=1;
		}else{
			dir=-1;
		}
		if (y+dir<HAUTEUR_PLATEAU && y+dir>=0){
			if(plateau.cases[x][y+dir]["nom"]=="rail droite vers bas"){
				return [x, y+dir, Type_de_case.Rail_droite_vers_bas]
			}else if(plateau.cases[x][y+dir]["nom"]=="rail haut vers droite"){
				return [x, y+dir, Type_de_case.Rail_haut_vers_droite]
			}else if(plateau.cases[x][y+dir]["nom"]=="rail bas vers droite"){
				return [x, y+dir, Type_de_case.Rail_bas_vers_droite]
			}else if(plateau.cases[x][y+dir]["nom"]=="rail vertical"){
				return [x, y+dir, Type_de_case.Rail_vertical]
			}else if(plateau.cases[x][y+dir]["nom"]=="rail droite vers haut"){
				return [x, y+dir, Type_de_case.Rail_droite_vers_haut]
			}
		}
	}else	if (direction==Type_de_case.Rail_droite_vers_bas){
		if (trains.cases[x][y+1]==Type_de_case.Wagon){
			dirx=-1;
		}else if (trains.cases[x-1][y]==Type_de_case.Wagon){
			diry=1;
		}
		if (x+dirx<LARGEUR_PLATEAU && y+diry<HAUTEUR_PLATEAU && x+dirx>=0 && y+diry>=0){
			if(plateau.cases[x+dirx][y+diry]["nom"]=="rail horizontal"){
				return [x+dirx, y+diry, Type_de_case.Rail_horizontal]
			}else if(plateau.cases[x+dirx][y+diry]["nom"]=="rail bas vers droite"){
				return [x+dirx, y+diry, Type_de_case.Rail_bas_vers_droite]

			}else if(plateau.cases[x+dirx][y+diry]["nom"]=="rail vertical"){
				return [x+dirx, y+diry, Type_de_case.Rail_vertical]
			}
		}
	}else if (direction==Type_de_case.Rail_haut_vers_droite){
		if (trains.cases[x][y+1]==Type_de_case.Wagon){
			dirx=1;
		}else if (trains.cases[x+1][y]==Type_de_case.Wagon){
			diry=1;
		}
		if (x+dirx<LARGEUR_PLATEAU && y+diry<HAUTEUR_PLATEAU && x+dirx>=0 && y+diry>=0){
			if(plateau.cases[x+dirx][y+diry]["nom"]=="rail vertical"){
				return [x+dirx, y+diry, Type_de_case.Rail_vertical]
			}else if(plateau.cases[x+dirx][y+diry]["nom"]=="rail droite vers haut"){
				return [x+dirx, y+diry, Type_de_case.Rail_droite_vers_haut]
			}else if(plateau.cases[x+dirx][y+diry]["nom"]=="rail bas vers droite"){
				return [x+dirx, y+diry, Type_de_case.Rail_droite_vers_haut]
			}else if(plateau.cases[x+dirx][y+diry]["nom"]=="rail horizontal"){
				return [x+dirx, y+diry, Type_de_case.Rail_horizontal]
			}
		}
	}else	if (direction==Type_de_case.Rail_bas_vers_droite){
		if (trains.cases[x+1][y]==Type_de_case.Wagon){
			diry=-1;
		}else if (trains.cases[x][y-1]==Type_de_case.Wagon){
			dirx=1;
		}
		if (x+dirx<LARGEUR_PLATEAU && y+diry<HAUTEUR_PLATEAU && x+dirx>=0 && y+diry>=0){
			if(plateau.cases[x+dirx][y+diry]["nom"]=="rail droite vers haut"){
				return [x+dirx, y+diry, Type_de_case.Rail_droite_vers_haut]
			}else if(plateau.cases[x+dirx][y+diry]["nom"]=="rail droite vers bas"){
				return [x+dirx, y+diry, Type_de_case.Rail_droite_vers_bas]
			}else if(plateau.cases[x+dirx][y+diry]["nom"]=="rail horizontal"){
				return [x+dirx, y+diry, Type_de_case.Rail_horizontal]
			}else if(plateau.cases[x+dirx][y+diry]["nom"]=="rail vertical"){
				return [x+dirx, y+diry, Type_de_case.Rail_vertical]
			}
		}
	}

	return null;
}

function supprime_train(trainss, train, trains){
	console.log(trainss, train)
	const a_sup=TRAINS[trainss][train];
	for (let i=0; i<a_sup.length-1; i+=2){
		trains.cases[a_sup[i]][a_sup[i+1]]=0;
	}
	TRAINS[trainss].splice(train, 1)
}

function train_collision(plateau, trains){ // Ne fonctionne pas dans certains cas
	let ok=false; let c=0;
    for (let trainss in TRAINS){
        for (let train=0; train<TRAINS[trainss].length; train++){
			    for (let sous_train in TRAINS){
			        for (let sou=0; sou<TRAINS[sous_train].length; sou++){
			        	if (TRAINS[trainss][train]!=TRAINS[sous_train][sou])
			        		if (TRAINS[trainss][train][0]==TRAINS[sous_train][sou][0] && TRAINS[trainss][train][1]==TRAINS[sous_train][sou][1]){
			        			if (trainss==sous_train){
			        				c=-1;
			        			}
								supprime_train(trainss, train, trains);
								supprime_train(sous_train, sou+c, trains);
								ok=true;
			        		}
			        }
			    }
        }
    }
    return ok
}


function avance_trains(plateau, contexte, trains) {
    let mov=[];
    let x, y, b, v;
    let first=true;
    for (let trainss in TRAINS){
        for (let train=0; train<TRAINS[trainss].length; train++){
    		first=true;
            for (let i=0; i<TRAINS[trainss][train].length-1; i+=2){
				if (first){
	                let ispos=is_next_case(plateau, TRAINS[trainss][train][i], TRAINS[trainss][train][i+1], TRAINS[trainss][train][TRAINS[trainss][train].length-1], trains);
	                if (ispos==null){
	                	supprime_train(trainss, train, trains);
	                	break;
	                }
					TRAINS[trainss][train][TRAINS[trainss][train].length-1]=ispos[2]
		           	x=TRAINS[trainss][train][i];
		           	y=TRAINS[trainss][train][i+1];
		           	TRAINS[trainss][train][i]=ispos[0];
		           	TRAINS[trainss][train][i+1]=ispos[1];
		           	trains.cases[ispos[0]][ispos[1]]=1;
		           	trains.cases[x][y]=0;
		           	first=false;
		           	mov.push([ispos[0], ispos[1]])
		        }else{
		           	trains.cases[x][y]=trains.cases[TRAINS[trainss][train][i]][TRAINS[trainss][train][i+1]];
		           	trains.cases[TRAINS[trainss][train][i]][TRAINS[trainss][train][i+1]]=0;
		        	b=TRAINS[trainss][train][i]; 
		        	v=TRAINS[trainss][train][i+1];
					TRAINS[trainss][train][i]=x;
		          	TRAINS[trainss][train][i+1]=y;
		          	x=b;
		          	y=v;
		        }
				if (train_collision(plateau, trains)){
						return;
				}
            }
        }
     }
    dessine_trains(contexte, plateau, trains);
}

/************************************************************/
// Fonction principale
/************************************************************/

function initPlateau(plateau, contexte, trains) {
  const simu=document.getElementById('simulateur');
  simu.addEventListener('click', function(event) {
    if (caseSelect !== null) {
		  const rect = simu.getBoundingClientRect();
		  const x =event.clientX-rect.left;
		  const y =event.clientY-rect.top;
		  const caseX = Math.floor(x/LARGEUR_CASE);
		  const caseY = Math.floor(y/HAUTEUR_CASE);
    		if ([Type_de_case.Foret ,Type_de_case.Eau , Type_de_case.Rail_horizontal,Type_de_case.Rail_vertical, Type_de_case.Rail_droite_vers_haut, Type_de_case.Rail_haut_vers_droite, Type_de_case.Rail_droite_vers_bas, Type_de_case.Rail_bas_vers_droite, Type_de_case.Rail_bas_vers_droite].includes(caseSelect)){
      		plateau.cases[caseX][caseY]=caseSelect;
      		dessine_case(contexte, plateau, caseX, caseY, trains);
      }else{
      	ajouter_train(contexte, plateau, caseX, caseY, trains);
      }
    }
  });
}

function majBTN(bouton) {
  document.querySelectorAll('button').forEach(btn => {
    btn.disabled=false;
  });
  bouton.disabled=true;
}

function add_btn(nom, typecase){
	document.getElementById(nom).addEventListener('click', function() {
		caseSelect=typecase;
		majBTN(this);
	});
}

function init_button(){
	add_btn('bouton_foret', Type_de_case.Foret);
	add_btn('bouton_eau', Type_de_case.Eau);
	add_btn('bouton_rail_horizontal', Type_de_case.Rail_horizontal);
	add_btn('bouton_rail_vertical', Type_de_case.Rail_vertical);
	add_btn('bouton_rail_droite_vers_haut', Type_de_case.Rail_droite_vers_haut);
	add_btn('bouton_rail_haut_vers_droite', Type_de_case.Rail_haut_vers_droite);
	add_btn('bouton_rail_droite_vers_bas', Type_de_case.Rail_droite_vers_bas);
	add_btn('bouton_rail_bas_vers_droite', Type_de_case.Rail_bas_vers_droite);
	add_btn('bouton_rail_bas_vers_droite', Type_de_case.Rail_bas_vers_droite);
	add_btn('bouton_train_1', "TRAIN1");
	add_btn('bouton_train_2', "TRAIN2");
	add_btn('bouton_train_4', "TRAIN4");
	add_btn('bouton_train_6', "TRAIN6");
}

function lancer_les_train(plateau, contexte, trains){
  setInterval(function() {
  		if (AVANCE_TRAIN){
	    	avance_trains(plateau, contexte, trains);
	    	dessine_plateau(contexte, plateau, trains);
		}
   }, 500);// 2 coups par secondes

}

function bouton_pause(){
	let bouton=document.getElementById('bouton_pause');
	bouton.addEventListener('click', function() {
		AVANCE_TRAIN=!AVANCE_TRAIN;
    });
}
function tchou(){
	console.log("Tchou, attention au départ !");
	/*------------------------------------------------------------*/
	const contexte = document.getElementById('simulateur').getContext("2d");
	/*------------------------------------------------------------*/
	// NOTE: ce qui suit est sûrement à réécrire intégralement

	init_button();

	let plateau = new Plateau();
	let trains=new Trains();

	cree_plateau_initial(plateau);
	initPlateau(plateau, contexte, trains);
	lancer_les_train(plateau, contexte, trains);
	bouton_pause();
	dessine_plateau(contexte, plateau, trains);

}

/************************************************************/
// Programme principal
/************************************************************/
// NOTE: rien à modifier ici !
window.addEventListener("load", () => {
	// Appel à la fonction principale
	tchou();
});
