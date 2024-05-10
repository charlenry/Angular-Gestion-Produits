import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Gestion de produits';

  public profile!: KeycloakProfile;
  public username!: string;
  isAdmin: boolean = false;

  constructor(public keycloakService: KeycloakService) {}

  ngOnInit() {
    let isConnected = this.keycloakService.isLoggedIn();
    if (isConnected) this.keycloakService.loadUserProfile().then(profile => {
      this.profile = profile!;
      this.username = this.profile.username!;
      this.isAdmin = this.keycloakService.isUserInRole('ADMIN');
      console.log("profile", this.profile);
    });
  }

  async onLogout() {
    await this.keycloakService.logout(window.location.origin);
  }

  async onLogin() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }

}
