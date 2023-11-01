import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/auth.service'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-fourth-page',
  templateUrl: './fourth-page.component.html',
  styleUrls: ['./fourth-page.component.css']
})
export class FourthPageComponent {
  
id:any;
mapData:any = { image: ''}

  constructor(private fireStorage: AngularFireStorage, private route: ActivatedRoute, private authService: AuthService) { }
  ngOnInit() {
    const userId = this.route.snapshot.queryParamMap.get('id');
    //this.router.queryParamMap.subscribe((params)=>
    {
  //const userId=params['id'];
  
  this.authService.singleBlog(userId).subscribe(
    (data) => {
      this.mapData = data?.data;
      console.log(this.mapData);
    },
    (error) => {
      console.log('error fetching user data', error);
    }
  );
  }
  
  }}