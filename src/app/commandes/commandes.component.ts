import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Commande} from "../models/Commande";
import {CommandesService} from "./commandes.service";
import {AsyncPipe, CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    CurrencyPipe,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  commandes$!: Observable<Commande[]>;

  constructor(private commandesService: CommandesService) {}

  ngOnInit(): void {
    this.commandes$ = this.commandesService.getValidCommandes();
  }
}
