import { Component, OnInit } from '@angular/core';
import { PostProvider } from "../../providers/post-provider";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nome: string = '';
  email: string = '';
  senha: string = '';
  constructor(private router: Router, private postPvdr: PostProvider, public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async register() {
    let body = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      action: 'register'
    };
    this.postPvdr.postData(body, 'data.php').subscribe(async data =>{
      var alertmsg = data.msg
      if(data.success) {
        this.router.navigate(['/home']);
        const toast = await this.toastCtrl.create({
          message: 'Register succesful.',
          duration: 2000
        });
        toast.present();
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
