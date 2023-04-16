import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isUser = false;
  opened = true;
  public opened2 = false;

  isSeller = false;
  isAdmin = false;
  role: string;
  isLogin = false;
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.setTitle('Bookstore');
    console.log('role check toolbar', this.role);
    if (this.role === 'admin') {
     this.isAdmin = true;
     this.isLogin = true;
   }
    if (this.role === 'seller') {
     this.isSeller = true;
     this.isLogin = true;
   }
    if (this.role === 'user') {
     this.isUser = true;
     this.isLogin = true;
     console.log('is user ', this.isUser);
   }
  }
  public setTitle( dashboard: string) {
    this.titleService.setTitle( dashboard );
    }
}
