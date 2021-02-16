import { Formation } from "src/app/formation/model/formation";

export class Categorie {
    id!: number;
    designation!: string;
    formations!: Formation[];
}
