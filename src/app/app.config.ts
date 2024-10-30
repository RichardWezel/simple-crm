import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"simple-crm-1033e",
      "appId":"1:783212638267:web:3ba1e8e5978f92db0dac1e",
      "storageBucket":"simple-crm-1033e.appspot.com",
      "apiKey":"AIzaSyC0ZUd1OysPOpKcWSuJPGcMvAwhuZCe1sI",
      "authDomain":"simple-crm-1033e.firebaseapp.com",
      "messagingSenderId":"783212638267"})), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore())
  ]
};
