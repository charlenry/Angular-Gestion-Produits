import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categorie } from '../model/categorie.model';
import { apiURLProd, apiURLCat } from '../config';
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

  creerHeaders(): HttpHeaders {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    return new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
  }

  listerProduits(): Observable<Produit[]> {
    let httpHeaders = this.creerHeaders();
    return this.http.get<Produit[]>(apiURLProd + '/all', {
      headers: httpHeaders,
    });
  }

  /* ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(apiURLProd + '/addProd', prod, httpOptions);
  } */

  ajouterProduit(prod: Produit): Observable<Produit> {
    let httpHeaders = this.creerHeaders();
    return this.http.post<Produit>(apiURLProd + '/addProd', prod, {
      headers: httpHeaders,
    });
  }

  /* supprimerProduit(id: number) {
    const url = `${apiURLProd}/delProdById/${id}`;
    return this.http.delete(url, httpOptions);
  } */

  supprimerProduit(id: number) {
    const url = `${apiURLProd}/delProdById/${id}`;
    let httpHeaders = this.creerHeaders();
    return this.http.delete(url, { headers: httpHeaders });
  }

  /* consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURLProd}/getProdById/${id}`;
    return this.http.get<Produit>(url);
  } */

  consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURLProd}/getProdById/${id}`;
    let httpHeaders = this.creerHeaders();
    return this.http.get<Produit>(url, { headers: httpHeaders });
  }

  /* modifierProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(apiURLProd + '/updateProd', prod, httpOptions);
  } */

  modifierProduit(prod: Produit): Observable<Produit> {
    let httpHeaders = this.creerHeaders();
    return this.http.put<Produit>(apiURLProd + '/updateProd', prod, {
      headers: httpHeaders,
    });
  }

  // Retourner la liste des produits d'une catégorie donnée
  rechercherProduitsParCategorie(idCat: number): Observable<Produit[]> {
    let httpHeaders = this.creerHeaders();
    const url = `${apiURLProd}/prodsByCat/${idCat}`;
    return this.http.get<Produit[]>(url, {
      headers: httpHeaders,
    });
  }

  rechercherProduitsParNom(nom: string): Observable<Produit[]> {
    let httpHeaders = this.creerHeaders();
    const url = `${apiURLProd}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url, {
      headers: httpHeaders,
    });
  }

  /* // Utilise l'API de RestController pour lister les catégories
  listerCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(apiURLProduits + '/cat');
  } */

  // Utilise l'API de Spring Data Rest pour lister les catégories
  listerCategories(): Observable<CategorieWrapper> {
    let httpHeaders = this.creerHeaders();
    return this.http.get<CategorieWrapper>(apiURLCat, {
      headers: httpHeaders,
    });
  }

  // Utilise l'API de Spring Data Rest pour ajouter une catégorie
  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    // Cette méthode est la même pour ajouter ou modifier une catégorie
    // Voir produitServiceImpl.java dans la partie Spring Boot
    let httpHeaders = this.creerHeaders();
    return this.http.post<Categorie>(apiURLCat, cat, {
      headers: httpHeaders,
    });
  }
}
