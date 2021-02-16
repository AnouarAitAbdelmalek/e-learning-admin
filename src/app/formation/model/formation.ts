import { Categorie } from "src/app/categorie/model/categorie";
import { Etudiant } from "src/app/etudiant/model/etudiant";
import { Intervenant } from "src/app/intervenant/model/intervenant";
import { Seance } from "src/app/seance/model/seance";

export class Formation {
    id!: number;
    titre!: string;
    description!: string;
    dateDebut: Date = new Date;
    dateFin: Date = new Date;
    intervenant: Intervenant= new Intervenant;
    categorie: Categorie = new Categorie;
    etudiants: Etudiant[] = [];
    seances: Seance[]= [];
    note!: number;
    //image!: File;
    image!: string;
    commentaires: string[]= [];
    prix!: number;
}
