import { Renderer2 } from "@angular/core";
import { fabric } from 'fabric';
import { Shape } from "./Shape";


export class Circle implements Shape{

    
    shape: any;
    x1: any;
    y1: any;
    x2: any;
    y2: any;
    type: any;
    id: any;
    stroke: any;
    stroke_width: any;
    fill: any;
    offset_x:any;
    offset_y:any;
    private r:any;
    //constructor(private render:Renderer2, private SVG:any){this.type = 'circle'}
    constructor( private canvas:any){
        this.type = 'circle'
        this.shape = new fabric.Circle({
            radius :50,
            top:30,
            left:30,
            fill: "",
            lockRotation:true,
            name: 'circle' 
        } );
    }

    draw(event: MouseEvent): void {
        this.x2 = event.offsetX;
        this.y2 = event.offsetY;
        this.r = Math.sqrt(Math.pow(this.x1 - this.x2, 2) + Math.pow(this.y1 - this.y2, 2));
        //this.shape.setAttribute('radius', this.r);
       // this.render.appendChild(this.SVG.nativeElement, this.shape);
       
    }
    startDraw(event: MouseEvent): void {
        /*
        var fillElement = document.getElementById('fill');
        this.stroke = document.getElementById('strokeColor')?.getAttribute('value');
        
        if (fillElement?.classList.contains('fill')){
           var color = document.getElementById('colorFill')?.getAttribute('value');
            this.fill =  color;
        }else{
            this.fill = 'none';
        }*/

        // this.x1 = event.offsetX;
        // this.y1 = event.offsetY;
        // //this.shape = this.render.createElement('circle', 'svg');
        // // this.shape.setAttribute('cx', this.x1);
        // // this.shape.setAttribute('cy', this.y1);
        // this.shape.setAttribute('stroke', this.stroke);
        // this.shape.setAttribute('fill', this.fill);
        // this.shape.setAttribute('stroke-width', this.stroke_width);
        // this.shape.setAttribute('id', this.id);
        // this.canvas.add(this.shape)
    
    }

    set(id:number, stroke: string, fill: string, stroke_width: string): void {
        this.stroke = stroke;
        this.fill = fill;
        this.stroke_width = stroke_width;
        this.id = 'c' + id.toString();
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
        console.log(this.x2, this.y2);
    }
    ContainPoint(x: any, y: any): boolean {
        return this.distance(this.x1, this.y1, x, y) <= this.r + this.stroke_width;
    }
    distance(x1:any, y1:any, x2:any, y2:any){
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }
    
    

    /*get copy of this object*/

    public clone(): this {
        const clone = Object.create(this);
        clone.x1 = this.x1;
        clone.y1 = this.y1;
        clone.x2 = this.x2;
        clone.y2 = this.y2;
        clone.r = this.r;
        clone.stroke = this.stroke;
        clone.stroke_width = this.stroke_width;
        clone.fill = this.fill;
        clone.shape = this.shape;        
        clone.type = this.type;
        clone.id = this.id;
        return clone;

    }
    getType(): string {
        return this.type;
    }
    getId():string{
        return this.id.toString();
    }
    
    getCopy(id:any):Shape{
        console.log(id);
        const clone = Object.create(this);
        clone.x1 = this.x1 + 20;
        clone.y1 = this.y1 + 20;
        clone.x2 = this.x2 + 20;
        clone.y2 = this.y2 + 20;
        clone.r = this.r;
        clone.stroke = this.stroke;
        clone.stroke_width = this.stroke_width;
        clone.fill = this.fill;
        clone.type = this.type; 
        clone.id = 'c' + id.toString(); 
        //clone.shape = this.render.createElement('circle', 'svg');
        clone.shape.setAttribute('cx', clone.x1);
        clone.shape.setAttribute('cy', clone.y1);
        clone.shape.setAttribute('r', clone.r);
        clone.shape.setAttribute('stroke', clone.stroke);
        clone.shape.setAttribute('stroke-width', clone.stroke_width);
        clone.shape.setAttribute('id', clone.id);
        clone.shape.setAttribute('fill', clone.fill);
 //       clone.render.appendChild(this.SVG.nativeElement, clone.shape);
        return clone;
    }
    delete():void{
        document.getElementById(this.id.toString())?.remove();
    }
    resize(event:MouseEvent){
        this.x2 = event.offsetX;
        this.y2 = event.offsetY;
        this.r = Math.sqrt(Math.pow(this.x1 - this.x2, 2) + Math.pow(this.y1 - this.y2, 2)); 
        document.getElementById(this.id.toString())?.setAttribute('r', this.r);
    }
    mouseOnEdges(event:MouseEvent): boolean{
        var x = event.offsetX;
        var y = event.offsetY;
        var r = Math.sqrt(Math.pow(this.x1 - x, 2) + Math.pow(this.y1 - y, 2));
        if (Math.abs(this.r - r) < 5){
            return true;
        }
        return false;

    }
    

    
}