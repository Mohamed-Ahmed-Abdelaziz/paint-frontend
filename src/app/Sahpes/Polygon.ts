import { Renderer2 } from "@angular/core";
import { fabric } from 'fabric';
import { Shape } from "./Shape";

export class Polygon implements Shape{
    x1: any;
    y1: any;
    x2: any;
    y2: any;
    stroke: any;
    stroke_width: any;
    fill: any;
    type: any;
    id: any;
    shape: any;

    constructor(private canvas:any){
        this.type = 'polygon';
        this.shape= new fabric.Polygon([
            { x: 200, y: 10 },
            { x: 250, y: 50 },
            { x: 250, y: 100},
            { x: 150, y: 100},
            { x: 150, y: 50 },
            
            ], {
                top:30,
                left:30,
                fill:""
            });
    }
    
    
    draw(event: MouseEvent): void {
        this.x2 = event.offsetX;
        this.y2 = event.offsetY;
    }
    startDraw(event: MouseEvent): void {
        this.x1 = event.offsetX;
        this.y1 = event.offsetY;
     //   this.shape = this.render.createElement('polygon', 'svg');
        this.shape.setAttribute('points', this.x1 + ' ' + this.y1);
        this.shape.setAttribute('stroke', this.stroke);
        this.shape.setAttribute('fill', this.fill);
        this.shape.setAttribute('stroke-width', this.stroke_width);
      //  this.render.appendChild(this.SVG.nativeElement, this.shape);

    }
    
    set(id:number, stroke: string, fill: string, stroke_width: string): void {
        this.stroke = stroke;
        this.fill = fill;
        this.stroke_width = stroke_width;
        this.id = 'p' + id.toString();
    }
    clone(): this {
        const clone = Object.create(this);
        clone.x1 = this.x1;
        clone.y1 = this.y1;
        clone.x2 = this.x2;
        clone.y2 = this.y2;
        clone.stroke = this.stroke;
        clone.stroke_width = this.stroke_width;
        clone.fill = this.fill;
        clone.shape = this.shape;        
        clone.type = this.type;
        clone.id = this.id;
        return clone;
    }
    ContainPoint(x: any, y: any): boolean {
        return false;
    }
    getId():string{
        return this.id.toString();
    }
    getType(): string {
        return this.type.toString();
    }
    mouseOnEdges(event:MouseEvent):boolean{
        /*not implemented yet */
        return false;
    }
    resize(event: MouseEvent): void {
        /*not implemented yet */
    }
    delete(): void {
        /*not implemented yet */
    }


}