// user-detail.component.ts

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user.class';
import { Observable, of } from 'rxjs';
import { switchMap, tap, catchError, finalize } from 'rxjs/operators';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user$!: Observable<User | undefined>;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.user$ = this.route.paramMap.pipe(
        switchMap(params => {
          const id = params.get('id');
          if (id) {
            console.log('Extrahierte ID:', id); // Logge die ID
            return this.firebaseService.getUserById(id).pipe(
              tap(user => {
                if (user) {
                  console.log('Abgerufener Benutzer:', user); // Logge die Benutzerdaten
                } else {
                  console.warn('Kein Benutzer mit dieser ID gefunden.');
                  this.error = 'Kein Benutzer mit dieser ID gefunden.';
                }
              }),
              catchError(err => {
                console.error('Fehler beim Abrufen des Benutzers:', err);
                this.error = 'Fehler beim Abrufen des Benutzers.';
                return of(undefined);
              }),
              finalize(() => {
                this.loading = false; // Setze loading auf false, egal ob erfolgreich oder mit Fehler
              })
            );
          } else {
            console.error('Keine Benutzer-ID in der URL gefunden.');
            this.error = 'Keine Benutzer-ID in der URL gefunden.';
            this.loading = false;
            return of(undefined);
          }
        })
      );
    }
  }

  editMenu() {

  }

  editUserdetail() {

  }
}
