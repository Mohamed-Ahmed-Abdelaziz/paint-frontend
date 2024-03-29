import { Renderer2 } from "@angular/core";
import { Shape } from "./Shape";
import { fabric } from 'fabric';

export class Eclipse implements Shape{
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
    offset_x:any;
    offset_y:any;
    private rx:any;
    private ry:any;

    constructor(private canvas:any){
        this.type = 'eclipse';
        this.shape= new fabric.Ellipse({
            top:30,
            left:50,
            fill:"",
            rx:25,
            ry:50,
            name: 'eclipse'
        })
    }
    

    draw(event: MouseEvent): void {
        this.x2 = event.offsetX;
        this.y2 = event.offsetY;
        this.rx = Math.abs(this.x2 - this.x1);
        this.ry = Math.abs(this.y2 - this.y1);
        this.shape.setAttribute('rx', this.rx);
        this.shape.setAttribute('ry', this.ry);
    //    this.render.appendChild(this.SVG.nativeElement, this.shape);
    }
    startDraw(event: MouseEvent): void {
        this.x1 = event.offsetX;
        this.y1 = event.offsetY;
      //  this.shape = this.render.createElement('ellipse', 'svg');
        this.shape.setAttribute('cx', this.x1);
        this.shape.setAttribute('cy', this.y1);
        this.shape.setAttribute('id', this.id);
        this.shape.setAttribute('stroke', this.stroke);
        this.shape.setAttribute('fill', this.fill);
        this.shape.setAttribute('stroke-width', this.stroke_width);
    }
    set(id:number, stroke: string, fill: string, stroke_width: string): void {
        this.stroke = stroke;
        this.fill = fill;
        this.stroke_width = stroke_width;
        this.id = 'e' + id.toString();
    }
    updatePosition(event:MouseEvent){
        this.offset_x = event.offsetX - this.x1;
        this.offset_y = event.offsetY - this.y1;
    }
    update(event:MouseEvent){
        var element = document.getElementById(this.id.toString());
        var width = this.x2 - this.x1;
        var height = this.y2 - this.y1;
        var m = event.offsetX - this.offset_x;
        var v = event.offsetY - this.offset_y;
        this.x1 = m;
        this.y1 = v;
        this.x2 = m + width;
        this.y2 = v + height;
        element?.setAttribute('cx', this.x1);
        element?.setAttribute('cy', this.y1);
    }
    ContainPoint(x: any, y: any): boolean {
        /*not implemented yet */
        return true;
    }
    clone(): this {
        const clone = Object.create(this);
        clone.x1 = this.x1;
        clone.y1 = this.y1;
        clone.x2 = this.x2;
        clone.y2 = this.y2;
        clone.rx = this.rx;
        clone.ry = this.ry;
        clone.stroke = this.stroke;
        clone.stroke_width = this.stroke_width;
        clone.fill = this.fill;
        clone.shape = this.shape;
        clone.id = this.id;
        clone.type = this.type; 
        return clone;
    }
    getId():string{
        return this.id.toString();
    }
    getType(): string {
        return this.type.toString();
    }
    getCopy(id:any):Shape{
        const clone = Object.create(this);
        clone.x1 = this.x1 + 20;
        clone.y1 = this.y1 + 20;
        clone.x2 = this.x2 + 20;
        clone.y2 = this.y2 + 20;
        clone.stroke = this.stroke;
        clone.stroke_width = this.stroke_width;
        clone.fill = this.fill;
        clone.type = this.type; 
        clone.rx = this.rx;
        clone.ry = this.ry;
        clone.id = 'e' + id.toString(); 
        //clone.shape = this.render.createElement('ellipse', 'svg');
        clone.shape.setAttribute('cx', clone.x1);
        clone.shape.setAttribute('cy', clone.y1);
        clone.shape.setAttribute('id', clone.id);
        clone.shape.setAttribute('stroke', clone.stroke);
        clone.shape.setAttribute('fill', clone.fill);
        clone.shape.setAttribute('stroke-width', clone.stroke_width);
        clone.shape.setAttribute('rx', clone.rx);
        clone.shape.setAttribute('ry', clone.ry);
        //clone.render.appendChild(this.SVG.nativeElement, clone.shape);
        return clone;
    }
    delete():void{
        document.getElementById(this.id.toString())?.remove();
    }
    mouseOnEdges(event:MouseEvent):boolean{
        /*not implemented yet */
        return false;
    }
    resize(event: MouseEvent): void {
        /*not implemented yet */
        
    }


}