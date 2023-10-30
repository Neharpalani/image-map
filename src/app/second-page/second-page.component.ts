
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/auth.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent {

  indexno: number =1;
  file: any;
  updatedData = { image: '',message:''}
  userData: any
  mapRes:any
  mapid:any
  constructor(private fireStorage: AngularFireStorage, private router: Router, private routing: ActivatedRoute, private authService: AuthService, private renderer: Renderer2) { }
  ngOnInit() {
    this.routing.queryParams.subscribe( params => {
      this.mapid = params['url']
      console.log(this.mapid)
    })     
  }
  @ViewChild('myCanvas', { static: true })
  canvas!: ElementRef;
  @ViewChild('myImage', { static: true }) image!: ElementRef;
  private ctx!: CanvasRenderingContext2D;

  private polygons: { x: number; y: number }[][] = [];
  private currentPolygon: { x: number; y: number }[] = [];

  private isDrawing = false; // Flag to indicate if a polygon is being drawn

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  addVertex(event: MouseEvent) {
    if (this.isDrawing) {
      const canvas = this.canvas.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.currentPolygon.push({ x, y }); // Add the vertex to the current polygon
      this.drawPolygons(); // Redraw all saved polygons
    }
  }

  startNewPolygon() {
    // Finish the current polygon and add it to the polygons array
    if (this.currentPolygon.length > 2) {
      this.polygons.push([...this.currentPolygon]);
    }

    // Reset the current polygon
    this.currentPolygon = [];

    // Redraw all saved polygons
    this.drawPolygons();

    // Start drawing a new polygon
    this.isDrawing = true;
  }
  getCordinates() {
    // Finish the current polygon and add it to the polygons array
    if (this.currentPolygon.length > 2) {
      this.polygons.push([...this.currentPolygon]);
    }
    console.log('polygons', this.polygons);
  }

  
   drawPolygons() {
    const ctx = this.ctx;
    ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    // Redraw the initial image
    this.drawImage();

    for (const polygon of this.polygons) {
      this.drawPolygon(polygon); // Draw each saved polygon
    }

    // Draw the current polygon (if it's being drawn)
    this.drawPolygon(this.currentPolygon);

  }

  drawPolygon(vertices: { x: number; y: number }[]) {
    const ctx = this.ctx;

    ctx.beginPath();

    if (vertices.length >= 2) {
      ctx.moveTo(vertices[0].x, vertices[0].y);

      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
      }
    }

    ctx.closePath();
    ctx.stroke();
  }

  drawImage() {
    const canvas = this.canvas.nativeElement;
    const image = this.image.nativeElement;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0); // Draw the image at (0, 0) on the canvas
  }

  
  //   // Customize the polygon's stroke and fill styles
  //   ctx.strokeStyle = 'blue'; // Stroke color
  //   ctx.lineWidth = 2; // Stroke width
  //   ctx.fillStyle = 'rgba(0, 0, 255, 0.3)'; // Fill color with transparency
  //   ctx.stroke(); // Draw the stroke
  //   ctx.fill(); // Fill the polygon
  // }
  

  // // @ViewChild('selectionCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  // // @ViewChild('image', { static: true }) image!: ElementRef<HTMLImageElement>;

  // private ctx: CanvasRenderingContext2D | null = null;
  // private isSelecting = false;
  // private startX!: number;
  // private startY!: number;
  // private endX!: number;
  // private endY!: number;
  // selectedAreas: { x1: number; y1: number; x2: number; y2: number }[] = [];

  // ngAfterViewInit(): void {
  //   if (this.image) {
  //     this.image.nativeElement.onload = () => this.onImageLoad();
  //   }
  // }


  onImageLoad() {
    console.log('Image loaded');
    // Set the canvas size to match the image size after the image is loaded
    this.canvas.nativeElement.width = this.image.nativeElement.width;
    this.canvas.nativeElement.height = this.image.nativeElement.height;

    // Get the rendering context
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (!this.ctx) {
      console.error('Could not get 2D context for canvas');
      return;  
    }

    //     // Draw the initial image
    this.ctx.drawImage(this.image.nativeElement, 0, 0);
  }

  tableData: any[] = [];

  addnewarea() {
    this.tableData.push({ index: this.indexno});
    this.indexno++
    console.log(this.tableData)
  }

}
