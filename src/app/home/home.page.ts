import { Component } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;
  senha: string;

  constructor(private fb: Facebook, private router: Router, public toastCtrl: ToastController, private postPvdr: PostProvider) {}

  async login(){
  if (this.email === undefined || this.senha === undefined) {
    const toast = await this.toastCtrl.create({
      message: 'You must type something',
      duration: 2000
    });
    toast.present();
  } else {
    let body = {
      email: this.email,
      senha: this.senha,
      action: 'login'
    };
    this.postPvdr.postData(body, 'data.php').subscribe(async data =>{
      var alertmsg = data.msg
      if(data.success) {
        this.router.navigate(['/feed']);
      } else {
        const toast = await this.toastCtrl.create({
          message: alertmsg,
          duration: 2000
        });
        toast.present();
      }
    })
  }
  }
  register(){
    this.router.navigate(['/register']);
  }
  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => this.router.navigate(['/feed']))
  .catch(e => alert('Error logging into Facebook'));


    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

  }

}
