import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/auth.service'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit{

  mapData: any;
  message: any=[];
  mapRes: any;
  

ngOnInit(){
  this.fetchData();
}

constructor(private http: HttpClient, private authservice: AuthService, private router: Router){
  this.fetchData();
}

fetchData() {

  this.http.get('http://localhost:4000/map/getall').subscribe(
    (data) => {
  
      console.log('API Response:', data);
      
      this.mapData = data as any[];
     
      console.log(this.mapData);
    },
    (error) => {
     
      console.error('API Error:', error);
    }
  );
  }
  deletemapimg(mapid: any) {
    this.authservice.deletemap(mapid).subscribe((res:any)=>{
    this.mapRes = res || {};
    console.log(this.mapRes);
    if (this.mapRes["message"] == "success") {
      alert("Deleted successfully");
      this.fetchData();
      }else{
        alert("error deleting post");
      }
   })
  }
  view(id:any){
    this.router.navigate(['/fourth-page'],{
    queryParams:{
      id:id,
    
    }
  })}



}
