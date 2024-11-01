import { Component, inject } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter} from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule} from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule,
    MatDatepickerModule, 
    FormsModule, 
    AsyncPipe, 
    MatProgressBarModule,
  NgIf],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

 
  user: User = new User;
  birthDate!: Date;
  loading = false;

  constructor(private firebaseService: FirebaseService){}

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Benutzer:', this.user);
    this.loading = true;

    this.firebaseService.addUser(this.user)
      .then((docRef) => {
        console.log("Benutzer hinzugefügt mit ID:", docRef.id);
        this.loading = false;
        // Optional: Erfolgsmeldung anzeigen oder Dialog schließen
      })
      .catch((error) => {
        console.error("Fehler beim Hinzufügen des Benutzers:", error);
        this.loading = false;
        // Optional: Fehlermeldung im UI anzeigen
      });
    
    
  }

}
