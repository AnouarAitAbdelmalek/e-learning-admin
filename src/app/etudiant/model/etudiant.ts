import { Formation } from "src/app/formation/model/formation";

export class Etudiant {
    id!: number;
    nom!: string;
    prenom!: string;
    cin!: string;
    adresse!: string;
    telephone!: string;
    username!: string;
    email!: string;
    image!: string;
    password!: string;
    formations!: Formation[];
}
