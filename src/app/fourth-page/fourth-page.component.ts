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
viewImage:any;
imageUrl:string = ''


  constructor(private fireStorage: AngularFireStorage, private route: ActivatedRoute, private authService: AuthService) { }
  ngOnInit() {
  
    // Get the user ID from the query parameters
    this.route.queryParams.subscribe((params) => {
      const userId = params['id'];
      this.imageUrl = params['img']
      console.log("data454",this.imageUrl)

      // Fetch user data based on the ID
      this.authService.singleBlog(userId).subscribe(
        (data) => {
          this.viewImage  = data?.data;
          console.log(this.viewImage)
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    });
  }
  
  }
  
  