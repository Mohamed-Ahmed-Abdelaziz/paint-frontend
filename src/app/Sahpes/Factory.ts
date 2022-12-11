import { Renderer2 } from "@angular/core";
import { Circle } from "./Circle";
import { Eclipse } from "./Eclipse";
import { Line } from "./Line";
import { Polygon } from "./Polygon";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";
import { Triangle } from "./Triangle";

export class Factory{
    constructor( private canavas: any){}
    
    getShape(shapeType:string){		

        if(shapeType.trim().toLowerCase() == 'circle'){
            return new Circle( this.canavas).shape;
        }else if(shapeType.trim().toLowerCase() == 'rectangle'){
            return new Rectangle(this.canavas).shape;
        }else if(shapeType.trim().toLowerCase() == 'line'){
            return new Line( this.canavas).shape;
        }else if(shapeType.trim().toLowerCase() == 'triangle'){
            return new Triangle( this.canavas).shape;
        }else if(shapeType.trim().toLowerCase() == 'polygon'){
            return new Polygon( this.canavas).shape;
        }else if(shapeType.trim().toLowerCase() == 'eclipse'){
            return new Eclipse( this.canavas).shape;
        }else {
            return null;
        }

     }
}