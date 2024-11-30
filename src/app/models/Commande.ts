import {LignePanier} from "./LignePanier";

export class Commande {
  id: number;
  userId: string;
  dateCommande: Date;
  montantTotal: number;
  details: LignePanier[];
  constructor(id : number,userId: string, dateCommande: Date, montantTotal: number, details: LignePanier[]) {
    this.id = id;
    this.userId = userId;
    this.dateCommande = dateCommande;
    this.montantTotal = montantTotal;
    this.details = details;
  }
}
