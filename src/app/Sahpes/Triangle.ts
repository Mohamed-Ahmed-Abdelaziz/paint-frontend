import { Renderer2 } from "@angular/core";
import { Shape } from "./Shape";
import { fabric } from 'fabric';

export class Triangle implements Shape{
    x1: any;
    y1: any;
    x2: any = null;
    y2: any = null;
    x3:any = null;
    y3:any = null;
    stroke: any;
    stroke_width: any;
    fill: any;
    type: any;
    id: any;
    shape: any;
    count:number = 0;

    constructor( private canvas:any){
        this.type = 'triangle';
        this.shape = new fabric.Triangle({
            left: 30,
            top:30,
            fill:"",
            name: 'triangle'
        })
    
    }
    
    
    draw(event: MouseEvent): void {
       
        
    }
    startDraw(event: MouseEvent): void {
        
    }
    
    set(id:number, stroke: string, fill: string, stroke_width: string): void {
        this.stroke = stroke;
        this.fill = fill;
        this.stroke_width = stroke_width;
        this.id = 't' + id.toString();
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
        return false;
    }
    delete():void{
        
    }
    resize(event:MouseEvent): void {
        throw new Error("Method not implemented.");
    }


}