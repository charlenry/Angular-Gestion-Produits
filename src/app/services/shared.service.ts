import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Service non utilisé pout l'instant

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Note that BehaviorSubject is used here to share state. It can provide the current value to its subscribers.
  private stateSource = new BehaviorSubject<any>(null);
  // Create an observable that can be modified only by this service
  currentState = this.stateSource.asObservable();

  constructor() { }

  changeState(state: any) {
    this.stateSource.next(state);
  }
}


// Utilisation de ce service dans AppComponent
/* 
import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(private sharedService: SharedService) { }

  changeState() {
    this.sharedService.changeState({data: 'New State'});
  }
} 
*/


// Utilisation de ce service dans le service AuthGuard
/* 
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sharedService: SharedService) { }

  canActivate(): boolean {
    this.sharedService.currentState.subscribe(state => {
      console.log(state);
    });
    return true;
  }
} 
*/


