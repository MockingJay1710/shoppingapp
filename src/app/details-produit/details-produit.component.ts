import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Product } from '../models/Product';
import { SharedService } from '../shared-service.service';
import { ProduitService } from "../produit.service";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../models/User";
import {AuthService} from "../auth.service";
import {myComment} from "../models/Comment";

@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produit.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgStyle,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitsComponent implements OnInit {
  product!: Product;  // Define the product attribute of type Product
  commentForm: FormGroup;
  comments: myComment[] = [];
  showForm: boolean = false;
  isLoggedIn!: boolean;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private sharedService: SharedService,
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.commentForm = fb.group({
      comment: ['', Validators.required], // Comment field
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]], // Rating field, initialized to 0
      user: ['', Validators.required] // User name field
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      // Subscribe to the observable returned by getProductById
      this.produitService.getProductById(+productId).subscribe(
        (product: Product | undefined) => {
          if (product) {
            this.product = product; // Assign the fetched product to the product attribute
          } else {
            console.error('Product not found');
          }
        },
        error => {
          console.error('Error fetching product:', error);
        }
      );
    }
    this.authService.isAuth$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );
  }

  addComment() {
    if (this.commentForm.valid) {
      const user = new User(this.commentForm.value.user, '', ''); // Only name is used
      const rating = this.commentForm.value.rating;
      const commentText = this.commentForm.value.comment;
      const date = new Date();

      // Create a new `Comment` object
      const newComment = new myComment(user, rating, commentText, new Date());

      // Push the new comment to the comments array
      this.comments.push(newComment);

      // Reset the form and hide the comment form
      this.commentForm.reset()
      this.commentForm.patchValue({ rating: 0 }); // Reset rating to 0
    }
  }

  getColor() {
    return this.product?.stock > 0 ? 'green' : 'red';
  }

  getState() {
    return this.product?.stock > 0 ? 'En stock' : 'En rupture de stock';
  }

  addToPanier() {
    if (this.product) {
      this.sharedService.addProductToCart({ produit: this.product, quantite: 1 });
    }
  }

  toggleForm() {
    if (this.isLoggedIn) {
      this.showForm = !this.showForm;
    } else {
      this.router.navigate(['/signin']);
    }

  }

  setRating(rating: number) {
    this.commentForm.patchValue({ rating });
  }
}
