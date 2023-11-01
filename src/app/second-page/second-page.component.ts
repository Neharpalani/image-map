import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent {

  // ... Other class properties

  // Store the selected polygon points
  private polygonPoints: { x: number; y: number }[] = [];
  selectedAreas: { x1: number; y1: number; x2: number; y2: number }[] = [];
  mapid: any;
  private ctx: CanvasRenderingContext2D | null = null;
  canvas: any;
  image: any;


  // ... Other class methods

  // Handle mouse down event
  onMouseDown(e: MouseEvent) {
    if (!this.ctx) {
      console.error('2D context is not available');
      return;
    }

    // Record the mouse position
    const x = e.offsetX;
    const y = e.offsetY;

    // Add the point to the polygonPoints array
    this.polygonPoints.push({ x, y });

    // Draw the polygon with the updated points
    this.drawSelectionPolygon();
  }

  // Handle mouse move event (if needed)
  onMouseMove(e: MouseEvent) {
    // Handle mouse move logic here
    // You can access event properties like event.clientX and event.clientY
  }

  // Handle mouse up event
  onMouseUp() {
    // Finalize the polygon drawing
    this.drawSelectionPolygon();

    // Calculate the polygon's coordinates or perform other actions
    if (this.polygonPoints.length > 2) {
      const coordinates = this.polygonPoints.map(point => `x=${point.x}, y=${point.y}`).join(', ');
      console.log(`Polygon Coordinates: ${coordinates}`);
    }
  }

  // Draw the polygon using the recorded points
  drawSelectionPolygon() {
    if (!this.ctx) {
      console.error('2D context is not available');
      return;
    }

    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // Redraw the image
    this.ctx.drawImage(this.image.nativeElement, 0, 0);

    // Draw the polygon
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();

    if (this.polygonPoints.length > 0) {
      this.ctx.moveTo(this.polygonPoints[0].x, this.polygonPoints[0].y);

      for (let i = 1; i < this.polygonPoints.length; i++) {
        this.ctx.lineTo(this.polygonPoints[i].x, this.polygonPoints[i].y);
      }

      this.ctx.closePath();
      this.ctx.stroke();
    }
  }
}
