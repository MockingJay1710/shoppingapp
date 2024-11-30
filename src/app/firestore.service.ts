import { Injectable } from '@angular/core';
import { Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  getDoc,
  deleteDoc
} from '@angular/fire/firestore';
import {LignePanier} from "./models/LignePanier";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  products : Array<any> | undefined

  constructor(private fireStore:Firestore) { }

  addCommande(userid:string,montant:number,details:Array<LignePanier>){
    const commandeData : any = {userid : userid, montantTotal: montant,dateCommande:new Date(),details:details}
    //code pour firestore
    const collectionInstance = collection(this.fireStore,'orders')
    addDoc(collectionInstance,commandeData)
      .then(()=>console.log("data saved successfully !"))
      .catch(error=>console.log(error))
  }

  getAllOrders(){
    const collectionInstance = collection(this.fireStore,'orders')

    return  collectionData(collectionInstance, {idField : 'id'})

  }

  getOrderId(id:string){
    const collectionInstance = collection(this.fireStore,'orders')

    const docinstance = doc(this.fireStore,'orders',id)

    return getDoc(docinstance)


  }

  updateOrder(id:string){
    const docinstance = doc(this.fireStore,'products',id)
    const updatedOrder : any= {name : "updated name", montant : 1000}
    updateDoc(docinstance,updatedOrder)
      .then(()=>console.log(`Order with ${id} updated successfully ! `))
      .catch(error=>console.log(error))
  }

  deleteOrder(id:string){
    const docinstance = doc(this.fireStore,'orders',id)
    deleteDoc(docinstance)
      .then(()=>console.log('data deleted !'))
      .catch(error=>console.log(error))
  }
}
