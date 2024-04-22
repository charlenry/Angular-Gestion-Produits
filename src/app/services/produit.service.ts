import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categorie } from '../model/categorie.model';
import { rcApiURLProd,  rcApiURLCat, drApiURLCat } from '../config';
import { CategorieWrapper } from '../model/categorieWrapped.model';
import { AuthService } from './auth.service';

/* const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}; */

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits!: Produit[]; //un tableau de produits

  constructor(private http: HttpClient, private authService: AuthService) {}

  /* listerProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(apiURLProd + '/all');
  } */

 /*  creerHeaders(): HttpHeaders {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    return new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
  } */

  listerProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(rcApiURLProd + '/all');
  }

  /* ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(apiURLProd + '/addProd', prod, httpOptions);
  } */

  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(rcApiURLProd + '/addProd', prod);
  }

  /* supprimerProduit(id: number) {
    const url = `${apiURLProd}/delProdById/${id}`;
    return this.http.delete(url, httpOptions);
  } */

  supprimerProduit(id: number) {
    const url = `${rcApiURLProd}/delProdById/${id}`;
    return this.http.delete(url);
  }

  /* consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURLProd}/getProdById/${id}`;
    return this.http.get<Produit>(url);
  } */

  consulterProduit(id: number): Observable<Produit> {
    const url = `${rcApiURLProd}/getProdById/${id}`;
    return this.http.get<Produit>(url);
  }

  /* modifierProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(apiURLProd + '/updateProd', prod, httpOptions);
  } */

  modifierProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(rcApiURLProd + '/updateProd', prod);
  }

  // Retourner la liste des produits d'une catégorie donnée
  rechercherProduitsParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${rcApiURLProd}/prodsByCat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherProduitsParNom(nom: string): Observable<Produit[]> {
    const url = `${rcApiURLProd}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }


  /* // Utilise l'API de RestController pour lister les catégories
  listerCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(apiURLProduits + '/cat');
  } */

  // Utilise l'API de Spring Data Rest pour lister les catégories
  listerCategories(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(drApiURLCat);
  }

  // Utilise l'API de Spring Data Rest pour ajouter une catégorie
  // Cette méthode est la même pour ajouter ou modifier une catégorie
  // Voir produitServiceImpl.java dans la partie Spring Boot
  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(drApiURLCat, cat);
  }

  // Utilise l'API de Spring Data Rest pour supprimer une catégorie
  supprimerCategorieParId(idCat: number): Observable<Categorie> {
    const url = `${drApiURLCat}/${idCat}`;
    return this.http.delete<Categorie>(url);
  }

}
