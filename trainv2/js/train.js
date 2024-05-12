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

/*------------------------------------------------------------*/


const LARGEUR_PLATEAU	= 30;
const HAUTEUR_PLATEAU	= 15;


const LARGEUR_CASE	= 45;
const HAUTEUR_CASE	= 45;
let TRAINS={"TRAIN1":[], "TRAIN2":[], "TRAIN4":[], "TRAIN6":[]};
let AVANCE_TRAIN=true;


/*------------------------------------------------------------*/

/*------------------------------------------------------------*/
class Type_de_case{
	static Foret						= new Type_de_case('foret');

	static Eau							= new Type_de_case('eau');

	static Rail_horizontal				= new Type_de_case('rail horizontal');

	static Rail_vertical				= new Type_de_case('rail vertical');

	
	static Rail_droite_vers_haut		= new Type_de_case('rail droite vers haut');

	
	static Rail_haut_vers_droite		= new Type_de_case('rail haut vers droite');

	
	static Rail_droite_vers_bas		= new Type_de_case('rail droite vers bas');

	
	static Rail_bas_vers_droite		= new Type_de_case('rail bas vers droite');

	static Wagon		= new Type_de_case('wagon');
	static Loco		= new Type_de_case('loco');

	static Monstre = new Type_de_case('monstre');
	static Explosion = new Type_de_case('explosion');

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

/*------------------------------------------------------------*/
const IMAGE_EAU = new Image();

const IMAGE_FORET = new Image();

const IMAGE_LOCO = new Image();
IMAGE_LOCO.src = 'images/locomotive1.png';

const IMAGE_RAIL_HORIZONTAL = new Image();

const IMAGE_RAIL_VERTICAL = new Image();

const IMAGE_RAIL_BAS_VERS_DROITE = new Image();

const IMAGE_RAIL_DROITE_VERS_BAS = new Image();

const IMAGE_RAIL_DROITE_VERS_HAUT = new Image();

const IMAGE_RAIL_HAUT_VERS_DROITE = new Image();

const IMAGE_WAGON = new Image();
IMAGE_WAGON.src = 'images/wagon2.png';

const IMAGE_RERB = new Image();
IMAGE_RERB.src = 'images/rerb.png';


const IMAGE_MONSTRE = new Image();
IMAGE_MONSTRE.src = 'images/monstre.png';

const IMAGE_EXPLOSION = new Image();
IMAGE_EXPLOSION.src = 'images/explosion.png';


function init_images(nom){
	if (nom=="Monde Glacial"){
		IMAGE_EAU.src = 'images/glace.png';
		IMAGE_FORET.src = 'images/foret_glace.png';
		IMAGE_RAIL_HORIZONTAL.src = 'images/rail-horizontal.png';
		IMAGE_RAIL_VERTICAL.src = 'images/rail-vertical.png';
		IMAGE_RAIL_BAS_VERS_DROITE.src = 'images/rail-bas-vers-droite.png';
		IMAGE_RAIL_DROITE_VERS_BAS.src = 'images/rail-droite-vers-bas.png';
		IMAGE_RAIL_DROITE_VERS_HAUT.src = 'images/rail-droite-vers-haut.png';
		IMAGE_RAIL_HAUT_VERS_DROITE.src = 'images/rail-haut-vers-droite.png';
	}else if (nom=="Monde Désertique"){
		IMAGE_EAU.src = 'images/eau_desert.png';
		IMAGE_FORET.src = 'images/sable.png';
		IMAGE_RAIL_HORIZONTAL.src = 'images/rail-horizontal.png';
		IMAGE_RAIL_VERTICAL.src = 'images/rail-vertical.png';
		IMAGE_RAIL_BAS_VERS_DROITE.src = 'images/rail-bas-vers-droite.png';
		IMAGE_RAIL_DROITE_VERS_BAS.src = 'images/rail-droite-vers-bas.png';
		IMAGE_RAIL_DROITE_VERS_HAUT.src = 'images/rail-droite-vers-haut.png';
		IMAGE_RAIL_HAUT_VERS_DROITE.src = 'images/rail-haut-vers-droite.png';
	}else{
		IMAGE_EAU.src = 'images/mer.png';
		IMAGE_FORET.src = 'images/foret5.png';
		IMAGE_RAIL_HORIZONTAL.src = 'images/rail-horizontal.png';
		IMAGE_RAIL_VERTICAL.src = 'images/rail-vertical.png';
		IMAGE_RAIL_BAS_VERS_DROITE.src = 'images/rail-bas-vers-droite.png';
		IMAGE_RAIL_DROITE_VERS_BAS.src = 'images/rail-droite-vers-bas.png';
		IMAGE_RAIL_DROITE_VERS_HAUT.src = 'images/rail-droite-vers-haut.png';
		IMAGE_RAIL_HAUT_VERS_DROITE.src = 'images/rail-haut-vers-droite.png';
	}


}

/************************************************************/

/************************************************************/




/************************************************************/
/* Classes */
/************************************************************/

/*------------------------------------------------------------*/

/*------------------------------------------------------------*/

class Plateau{
	/* Constructeur d'un plateau vierge */
	constructor(){
		this.largeur = LARGEUR_PLATEAU;
		this.hauteur = HAUTEUR_PLATEAU;

		

		
		
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
				this.cases[x][y] = 0; 
			}
		}
	}
	
}




/************************************************************/

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

		case Type_de_case.rer_b : return IMAGE_RERB ;
		case Type_de_case.Monstre : return IMAGE_MONSTRE;
		case Type_de_case.Explosion : return IMAGE_EXPLOSION ;

    }
}


function dessine_case(contexte, plateau, x, y, trains){
	const la_case = plateau.cases[x][y];
	const la_case_train = trains.cases[x][y];

    if (la_case===Type_de_case.Rail_horizontal || la_case===Type_de_case.Rail_vertical || la_case===Type_de_case.Rail_droite_vers_haut ||la_case===Type_de_case.Rail_haut_vers_droite ||la_case===Type_de_case.Rail_droite_vers_bas ||la_case===Type_de_case.Rail_bas_vers_droite ) {
        contexte.fillStyle='#333333';
        contexte.fillRect(x*LARGEUR_CASE, y*HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
    }

    if (la_case===Type_de_case.Foret) {
        contexte.fillStyle='green';
        contexte.fillRect(x*LARGEUR_CASE, y*HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
    }

    if (la_case===Type_de_case.Monstre) {
        contexte.fillStyle='green';
        contexte.fillRect(x*LARGEUR_CASE, y*HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
    }

    if (la_case===Type_de_case.Explosion) {
        contexte.fillStyle='orange';
        contexte.fillRect(x*LARGEUR_CASE, y*HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
    }

    if (la_case===Type_de_case.Eau) {
        contexte.fillStyle='#87CEEB';
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
	
	for (let x = 0; x < plateau.largeur; x++) {
		for (let y = 0; y < plateau.hauteur; y++) {
			dessine_case(page, plateau, x, y, trains);
		}
	}

	
}


/************************************************************/

/************************************************************/




/************************************************************/

/************************************************************/


function cree_plateau_initial(plateau, monde){
	if (monde=="Monde Glacial"){
		for (let x = 0; x <= 4; x++) {
		  for (let y = 0; y <= 14; y++) {
		    plateau.cases[x][y] = Type_de_case.Foret;
		  }
		}
		for (let x = 25; x <= 29; x++) {
		  for (let y = 0; y <= 14; y++) {
		    plateau.cases[x][y] = Type_de_case.Foret;
		  }
		}

		
		for (let x = 10; x <= 14; x++) {
		  for (let y = 0; y <= 4; y++) {
		    plateau.cases[x][y] = Type_de_case.Eau;
		  }
		}
		for (let x = 15; x <= 19; x++) {
		  for (let y = 10; y <= 14; y++) {
		    plateau.cases[x][y] = Type_de_case.Eau;
		  }
		}

		
		for (let x = 5; x <= 9; x++) {
		  plateau.cases[x][7] = Type_de_case.Rail_horizontal;
		}
		for (let x = 20; x <= 24; x++) {
		  plateau.cases[x][7] = Type_de_case.Rail_horizontal;
		}
		plateau.cases[9][7] = Type_de_case.Rail_bas_vers_droite;
		plateau.cases[9][8] = Type_de_case.Rail_vertical;
		plateau.cases[9][9] = Type_de_case.Rail_vertical;
		plateau.cases[9][10] = Type_de_case.Rail_haut_vers_droite;
		for (let x = 10; x <= 19; x++) {
		  plateau.cases[x][10] = Type_de_case.Rail_horizontal;
		}
		plateau.cases[20][10] = Type_de_case.Rail_bas_vers_droite;
		plateau.cases[20][9] = Type_de_case.Rail_vertical;
		plateau.cases[20][8] = Type_de_case.Rail_vertical;
		plateau.cases[20][7] = Type_de_case.Rail_haut_vers_droite;

		
		plateau.cases[5][5] = Type_de_case.Monstre;
		plateau.cases[24][5] = Type_de_case.Monstre;
		plateau.cases[14][2] = Type_de_case.Monstre;

		
		plateau.cases[5][10] = Type_de_case.Loco;
		plateau.cases[6][10] = Type_de_case.Wagon;
		plateau.cases[7][10] = Type_de_case.Wagon;

		
		plateau.cases[22][1] = Type_de_case.Explosion;
		plateau.cases[8][13] = Type_de_case.Explosion;

	}else if (monde=="Monde Mystérieux"){
		for (let x = 0; x <= 29; x++) {
		  if (x < 10 || x > 20) {
		    plateau.cases[x][7] = Type_de_case.Rail_horizontal;
		  }
		}
		plateau.cases[10][7] = Type_de_case.Rail_bas_vers_droite;
		plateau.cases[10][8] = Type_de_case.Rail_vertical;
		plateau.cases[10][9] = Type_de_case.Rail_vertical;
		plateau.cases[10][10] = Type_de_case.Rail_haut_vers_droite;
		for (let x = 11; x <= 19; x++) {
		  plateau.cases[x][10] = Type_de_case.Rail_horizontal;
		}
		plateau.cases[20][10] = Type_de_case.Rail_bas_vers_droite;
		plateau.cases[20][9] = Type_de_case.Rail_vertical;
		plateau.cases[20][8] = Type_de_case.Rail_vertical;
		plateau.cases[20][7] = Type_de_case.Rail_haut_vers_droite;

		
		for (let x = 0; x <= 8; x++) {
		  for (let y = 0; y <= 6; y++) {
		    plateau.cases[x][y] = Type_de_case.Foret;
		  }
		}

		
		for (let x = 21; x <= 29; x++) {
		  for (let y = 11; y <= 14; y++) {
		    plateau.cases[x][y] = Type_de_case.Eau;
		  }
		}

		
		plateau.cases[15][5] = Type_de_case.Monstre;
		plateau.cases[5][12] = Type_de_case.Monstre;
		plateau.cases[25][2] = Type_de_case.Monstre;

		
		plateau.cases[5][7] = Type_de_case.Loco;
		plateau.cases[6][7] = Type_de_case.Wagon;
		plateau.cases[7][7] = Type_de_case.Wagon;

		
		plateau.cases[14][1] = Type_de_case.Explosion;
		plateau.cases[28][6] = Type_de_case.Explosion;

	}else if (monde=="Monde Loop"){
		for (let x = 0; x <= 29; x++) {
		  plateau.cases[x][0] = Type_de_case.Rail_horizontal; 
		  plateau.cases[x][14] = Type_de_case.Rail_horizontal; 
		}
		for (let y = 1; y <= 14; y++) {
		  plateau.cases[0][y] = Type_de_case.Rail_vertical; 
		  plateau.cases[29][y] = Type_de_case.Rail_vertical; 
		}
		
		plateau.cases[0][0] = Type_de_case.Rail_haut_vers_droite; 
		plateau.cases[29][0] = Type_de_case.Rail_droite_vers_bas; 
		plateau.cases[0][14] = Type_de_case.Rail_bas_vers_droite; 
		plateau.cases[29][14] = Type_de_case.Rail_droite_vers_haut; 

		
		for (let x = 5; x <= 24; x++) {
		  plateau.cases[x][4] = Type_de_case.Rail_horizontal;
		  plateau.cases[x][10] = Type_de_case.Rail_horizontal;
		}
		for (let y = 5; y <= 10; y++) {
		  plateau.cases[5][y] = Type_de_case.Rail_vertical;
		  plateau.cases[24][y] = Type_de_case.Rail_vertical;
		}
		
		plateau.cases[5][4] = Type_de_case.Rail_haut_vers_droite;
		plateau.cases[24][4] = Type_de_case.Rail_droite_vers_bas;
		plateau.cases[5][10] = Type_de_case.Rail_bas_vers_droite;
		plateau.cases[24][10] = Type_de_case.Rail_droite_vers_haut;

		
		plateau.cases[14][4] = Type_de_case.Rail_droite_vers_bas;
		plateau.cases[14][10] = Type_de_case.Rail_droite_vers_haut;
		plateau.cases[15][4] = Type_de_case.Rail_haut_vers_droite;
		plateau.cases[15][10] = Type_de_case.Rail_bas_vers_droite;
		plateau.cases[15][9] = Type_de_case.Rail_vertical;
		plateau.cases[15][8] = Type_de_case.Rail_vertical;
		plateau.cases[15][7] = Type_de_case.Rail_vertical;
		plateau.cases[15][6] = Type_de_case.Rail_vertical;
		plateau.cases[15][5] = Type_de_case.Rail_vertical;

		plateau.cases[14][9] = Type_de_case.Rail_vertical;
		plateau.cases[14][8] = Type_de_case.Rail_vertical;
		plateau.cases[14][7] = Type_de_case.Rail_vertical;
		plateau.cases[14][6] = Type_de_case.Rail_vertical;
		plateau.cases[14][5] = Type_de_case.Rail_vertical;

		
		plateau.cases[10][7] = Type_de_case.Monstre; 
		plateau.cases[20][7] = Type_de_case.Explosion; 

		
		plateau.cases[14][1] = Type_de_case.Loco; 
		plateau.cases[15][1] = Type_de_case.Wagon; 
		plateau.cases[16][1] = Type_de_case.Wagon; 

	}else if (monde=="Monde Désertique"){

		
		for (let x = 0; x < 30; x++) {
		  plateau.cases[x][0] = Type_de_case.Rail_horizontal;
		  plateau.cases[x][14] = Type_de_case.Rail_horizontal;
		}
		for (let y = 1; y < 14; y++) {
		  plateau.cases[0][y] = Type_de_case.Rail_vertical;
		  plateau.cases[29][y] = Type_de_case.Rail_vertical;
		}

		
		plateau.cases[0][0] = Type_de_case.Rail_droite_vers_bas;
		plateau.cases[29][0] = Type_de_case.Rail_droite_vers_haut;
		plateau.cases[0][14] = Type_de_case.Rail_haut_vers_droite;
		plateau.cases[29][14] = Type_de_case.Rail_bas_vers_droite;

		
		plateau.cases[5][5] = Type_de_case.Eau;
		plateau.cases[24][10] = Type_de_case.Eau;

		
		plateau.cases[5][4] = Type_de_case.Foret;
		plateau.cases[24][9] = Type_de_case.Foret;
		plateau.cases[5][6] = Type_de_case.Foret;
		plateau.cases[24][11] = Type_de_case.Foret;

		
		plateau.cases[15][7] = Type_de_case.Rail_horizontal;
		plateau.cases[15][6] = Type_de_case.Rail_vertical;
		plateau.cases[15][8] = Type_de_case.Rail_vertical;
		plateau.cases[14][7] = Type_de_case.Rail_droite_vers_haut;
		plateau.cases[16][7] = Type_de_case.Rail_haut_vers_droite;

	}
}


let caseSelect=null;

function calcul_nb_rail_gauche(plateau, x, y){
	let res=0;
	while(x>0 && plateau.cases[x][y]["nom"]==="rail horizontal"){
		res=res+1;
		x=x-1
	}
	return res-1
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
    	var sound = document.getElementById("tchou");
    	sound.play();
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
    var sound = document.getElementById("explosion");
    sound.play();
	const a_sup=TRAINS[trainss][train];
	for (let i=0; i<a_sup.length-1; i+=2){
		trains.cases[a_sup[i]][a_sup[i+1]]=0;
	}
	TRAINS[trainss].splice(train, 1)
}

function train_collision(plateau, trains){ 

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



function jouerSonAleatoire(sounds) {
    var randomIndex = Math.floor(Math.random() * sounds.length);
    sounds[randomIndex].play();
}


function jouerCrissementRoues() {
    var sound = document.getElementById("crissement-roues");
    sound.play();
}


function virage(plateau, trains) {
    for (let trainss in TRAINS) {
        for (let train = 0; train < TRAINS[trainss].length; train++) {
            for (let i = 0; i < TRAINS[trainss][train].length - 1; i += 2) {
                let direction = TRAINS[trainss][train][TRAINS[trainss][train].length - 1];
                let x = TRAINS[trainss][train][i];
                let y = TRAINS[trainss][train][i + 1];
                let nextCase = is_next_case(plateau, x, y, direction, trains);
                
                if (nextCase && (nextCase[2] === Type_de_case.Rail_droite_vers_bas ||
                                 nextCase[2] === Type_de_case.Rail_droite_vers_haut ||
                                 nextCase[2] === Type_de_case.Rail_bas_vers_droite ||
                                 nextCase[2] === Type_de_case.Rail_haut_vers_droite)) {
                    jouerCrissementRoues();
                }
            }
        }
    }
    
}

var positionMonstre_x = 22, positionMonstre_y = 7;
let typeCasePrecedent = Type_de_case.Foret;

function deplacerMonstre(contexte, plateau, trains, deltaX, deltaY) {
    
    const nouvellePosX = positionMonstre_x + deltaX;
    const nouvellePosY = positionMonstre_y + deltaY;
    const ancienPosX = positionMonstre_x;
    const ancienPosY = positionMonstre_y;
    
    

    if (nouvellePosX >= 0 && nouvellePosX < plateau.largeur && nouvellePosY >= 0 && nouvellePosY < plateau.hauteur) {
        
        if (plateau.cases[nouvellePosX][nouvellePosY] !== Type_de_case.Eau) {
            
            positionMonstre_x = nouvellePosX;
            positionMonstre_y = nouvellePosY;

            
            plateau.cases[ancienPosX][ancienPosY] = typeCasePrecedent;
            typeCasePrecedent = plateau.cases[nouvellePosX][nouvellePosY];
            plateau.cases[nouvellePosX][nouvellePosY] = Type_de_case.Monstre;
                
          
            dessine_case(contexte, plateau, positionMonstre_x, positionMonstre_y, trains);
            dessine_case(contexte, plateau, ancienPosX, ancienPosY, trains);
           
        }
    }
}



/************************************************************/

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




document.addEventListener("keydown", function(event) {
    const direction = event.key;

    
    switch(direction) {
        case "ArrowUp":
            deplacerMonstre(contexte, plateau, trains, 0, -1);
            break;
        case "ArrowDown":
            deplacerMonstre(contexte, plateau, trains, 0, 1);
            break;
        case "ArrowLeft":
            deplacerMonstre(contexte, plateau, trains, -1, 0);
            break;
        case "ArrowRight":
            deplacerMonstre(contexte, plateau, trains, 1, 0);
            break;
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
function sounds(plateau, trains){
    var sound = document.getElementById("intro");
    sound.play();
	let avancementInterval = setInterval(function() {
		virage(plateau, trains);
	}, 500);
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

function haute_vitesse(tim, first){
	if (first){
	    var sound = document.getElementById("haute_vitesse");
	    sound.play();
	}
	let avancementInterval = setInterval(function() {
    	var sound = document.getElementById("haute_vitesse");
    	sound.play();
	}, tim);
}

function bouton_pause(){
	let bouton=document.getElementById('bouton_pause');
	bouton.addEventListener('click', function() {
		AVANCE_TRAIN=!AVANCE_TRAIN;
    });
}
function lancer_les_train(plateau, contexte, trains){
	const slider = document.getElementById("vitesseRange");
	const vitesseValeur = document.getElementById("vitesseValeur");
	let first=true;
	vitesseValeur.innerHTML = slider.value;

	slider.addEventListener('input', function() {
	    vitesseValeur.innerHTML = this.value;
		clearInterval(avancementInterval);
	    const nouvelleVitesse = parseInt(this.value);
  		if (AVANCE_TRAIN){
	    	avancementInterval= setInterval(function() {
	        	avance_trains(plateau, contexte, trains);
	        	dessine_plateau(contexte, plateau, trains);
	    	}, 1000-nouvelleVitesse);
	    }
	    if (1000-nouvelleVitesse<300){
	    	haute_vitesse(5000, first);
	    	first=false;
	    }else{
	    	haute_vitesse(10000000000000*32);
	    }
	});
	let avancementInterval = setInterval(function() {
		avance_trains(plateau, contexte, trains);
		dessine_plateau(contexte, plateau, trains);
	}, 500);
}


document.addEventListener("DOMContentLoaded", function() {
    const loadButton=document.getElementById('loadButton');
    const mondeSelect=document.getElementById('mondeSelect');

    loadButton.addEventListener('click', function() {
        const mondeSelectionne = mondeSelect.value;
        if (!mondeSelectionne) {
            alert('Veuillez sélectionner un monde avant de démarrer.');
            return;
        }
        init_images(mondeSelectionne)
        tchou(mondeSelectionne);
    });
});

function tchou(monde){
	console.log("Tchou, attention au départ !");
	/*------------------------------------------------------------*/
	const contexte = document.getElementById('simulateur').getContext("2d");

	/*------------------------------------------------------------*/
	init_button();

	let plateau = new Plateau();
	let trains=new Trains();
	sounds(plateau, trains);
	cree_plateau_initial(plateau, monde);
	initPlateau(plateau, contexte, trains);
	lancer_les_train(plateau, contexte, trains);
	bouton_pause();
	dessine_plateau(contexte, plateau, trains);

}
