import {Component, Input, OnInit} from '@angular/core';
import { LignePanier } from '../models/LignePanier';
import {FormsModule} from "@angular/forms";
import {SharedService} from "../shared-service.service";
import {Router} from "@angular/router";
import {FirebaseAuthService} from "../firebase-auth.service";
import {FirestoreService} from "../firestore.service";

@Component({
  selector: 'app-panier',
  imports: [
    FormsModule
  ],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css',
  standalone: true
})
export class PanierComponent implements OnInit{
  @Input() items: LignePanier[] = [];
  constructor(private sharedService: SharedService,
              private authService: FirebaseAuthService,
              private router: Router,
              private fireStoreService :FirestoreService) {
  }

  ngOnInit(): void {
    // Subscribe to the shared service's cart items
    this.sharedService.cartItems$.subscribe(cartItems => {
      this.items = cartItems;
    });
  }

  updateQuantite(index: number, newQuantite: number) {
    if (newQuantite < 1) {
      this.items[index].quantite = 1;
    } else {
      this.items[index].quantite = newQuantite;
    }
  }

  calculateTotal(): number {
    return this.items.reduce(
      (acc, item) => acc + item.produit.price * item.quantite,
      0
    );
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  async validerPanier() {
    if (this.authService.isLoggedIn()) {
      const userId = await this.authService.getUserId();
      if (userId) {
        const montant = this.calculateTotal();
        const details = this.items;

        // Use CommandeService to add the order
        this.fireStoreService.addCommande(userId, montant, details);

        alert('Panier validé avec succès!');
        this.items = [];  // Clear the cart after validation
      } else {
        console.log("User ID could not be retrieved.");
      }
    } else {
      this.router.navigate(['/signin']);
    }
  }


  increaseQuantity(index: number) {
    this.items[index].quantite += 1;
  }

  decreaseQuantity(index: number) {
    if (this.items[index].quantite > 1) {
      this.items[index].quantite -= 1;
    }
  }
}
