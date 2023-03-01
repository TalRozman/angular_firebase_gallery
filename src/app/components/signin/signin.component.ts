import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { FileUploadService } from 'src/app/services/file-upload.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(
    private afAuth: AngularFireAuth,private upFile : FileUploadService
  ) { }
  // like def_init in python to initialize the properties of an object
  ngOnInit(): void { }

  loginWithGoogle() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(googleResponse => {
        const userId = googleResponse.user?.uid;
        googleResponse.user?.photoURL ? this.upFile.usrImg= googleResponse.user?.photoURL:""
        if (userId) {
          localStorage.setItem('userId', userId);
        }

      }).catch(err => {
        // Login error
        console.log(err);
      });
  }

}
