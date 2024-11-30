import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Commande} from "../models/Commande";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  private ordersCollection;

  constructor(private firestore: Firestore) {
    this.ordersCollection = collection(this.firestore, 'orders'); // Update to 'orders'
  }



  getValidCommandes(): Observable<Commande[]> {
    return collectionData(this.ordersCollection, { idField: 'id' }).pipe(
      map((orders: any[]) =>
        orders.map((order: any) => ({
          ...order,
          dateCommande: order.dateCommande.toDate(), // Convert Firestore Timestamp to Date
        }))
      )
    ) as Observable<Commande[]>;
  }

}
