// first-page.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/auth.service'


@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent  {
  
  file: any;
  mapData = { image: ''}
  userData: any 
  
  constructor(private fireStorage:AngularFireStorage ,private authService: AuthService){}


  
//   @ViewChild('selectionCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
//   @ViewChild('image', { static: true }) image!: ElementRef<HTMLImageElement>;

//   private ctx: CanvasRenderingContext2D | null = null;
//   private isSelecting = false;
//   private startX!: number;
//   private startY!: number;
//   private endX!: number;
//   private endY!: number;
//   private selectedAreas: { x1: number; y1: number; x2: number; y2: number }[] = [];

//   // Set the image path here
//   private imagePath = '../../assets/componenet one.png';

//   ngOnInit() {
//     this.image.nativeElement.src = this.imagePath;
//     this.image.nativeElement.onload = () => this.onImageLoad();
//   }

//   onImageLoad() {
//     console.log('Image loaded');
//     // Set the canvas size to match the image size after the image is loaded
//     this.canvas.nativeElement.width = this.image.nativeElement.width;
//     this.canvas.nativeElement.height = this.image.nativeElement.height;

//     // Get the rendering context
//     this.ctx = this.canvas.nativeElement.getContext('2d');
//     if (!this.ctx) {
//       console.error('Could not get 2D context for canvas');
//       return;
//     }

//     // Draw the initial image
//     this.ctx.drawImage(this.image.nativeElement, 0, 0);
//   }

//   drawSelectionRect(x1: number, y1: number, x2: number, y2: number) {
//     if (!this.ctx) {
//       console.error('2D context is not available');
//       return;
//     }

//     // Clear the previous selection
//     this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

//     // Redraw the image
//     this.ctx.drawImage(this.image.nativeElement, 0, 0);

//     // Draw the selection rectangle
//     this.ctx.strokeStyle = 'red';
//     this.ctx.lineWidth = 2;
//     this.ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
//   }

//   displayCoordinates(x1: number, y1: number, x2: number, y2: number) {
//     const coordinatesText = `Selected Area: x1=${x1}, y1=${y1}, x2=${x2}, y2=${y2}`;
//     console.log(coordinatesText);
//     // Display coordinates as needed
//   }

//   onMouseDown(e: MouseEvent) {
//     if (!this.ctx) {
//       console.error('2D context is not available');
//       return;
//     }

//     this.isSelecting = true;
//     this.startX = e.offsetX;
//     this.startY = e.offsetY;
//   }

//   onMouseMove(e: MouseEvent) {
//     if (!this.ctx || !this.isSelecting) {
//       return;
//     }

//     this.endX = e.offsetX;
//     this.endY = e.offsetY;
//     this.drawSelectionRect(this.startX, this.startY, this.endX, this.endY);
//   }

//   onMouseUp() {
//     if (!this.ctx || !this.isSelecting) {
//       return;
//     }

//     this.isSelecting = false;
//     this.selectedAreas.push({ x1: this.startX, y1: this.startY, x2: this.endX, y2: this.endY });
//     this.displayCoordinates(this.startX, this.startY, this.endX, this.endY);
//   }
// }
//  async onFileChange(event:any){ 
//   const file = event.target.files[0];
//   if(file){
//     const path = `yt/${file.name}`
//     const uploadTask = await this.fireStorage.upload(path,file)
//     const url = await uploadTask.ref.getDownloadURL()
//     console.log(url)
//   }
// }
onFileChange(event:any){ 
  this.file = event.target.files[0];
}
async onSubmit() {
  console.log("")
  const path = `yt/${this.file.name}`
  const uploadTask =await this.fireStorage.upload(path, this.file)
  const url = await uploadTask.ref.getDownloadURL()
  this.mapData.image = url;
 

 this.authService.createImage(this.mapData).subscribe((res:any)=>{
 this.userData = res;
 console.log(this.userData.message);

if(this.userData.message =="image added successfully"){

  alert("image added successfully");
  
}else{ 

  alert("OOPs Something went wrong");
}
})

}
}
