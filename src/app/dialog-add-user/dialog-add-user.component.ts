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
import { AsyncPipe } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    MatProgressBarModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  firestore: Firestore = inject(Firestore);
  user: User = new User;
  birthDate!: Date;
  loading = false;

  constructor(){}

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('user', this.user);
    this.loading = true;
    const usersCollection = collection(this.firestore, 'users');

    addDoc(usersCollection, this.user.toJSON())
    .then((docRef) => {
      console.log("Benutzer hinzugefügt mit ID: ", docRef.id);
      this.loading = false;
      // Optional: Zeige eine Erfolgsmeldung an oder schließe den Dialog
    })
    .catch((error) => {
      console.error("Fehler beim Hinzufügen des Benutzers: ", error);
      // Optional: Zeige eine Fehlermeldung im UI an
    });
    
    
  }

}
