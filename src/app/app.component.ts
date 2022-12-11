import { state } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { CanvasSaverService } from './canvas-saver.service';
import { Factory } from './Sahpes/Factory';
//import 'fabric-history';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private service: CanvasSaverService) { }
  ctx: any;
  
  stroke: any = "black";
  stroke_width: any = 1;
  selctedShape: any;
  isFillClicked = false;
  Action: string = "";
  selctedTool:string = ""
  sahpes: any;
  ismouseDown: boolean = false;
  fillColor:any = '';
  isDrawing: boolean = false;
  isDown:boolean = false;
  shape:any = ""
  eras:boolean= false
  bruch:boolean=false

fillClicked(){
    
  if (!this.isFillClicked){
    this.isFillClicked = true;

  }else{
    this.isFillClicked = false;
  }
}
resize() {
throw new Error('Method not implemented.');
}
move() {
throw new Error('Method not implemented.');
} 
  title = 'paintWEB';
  free : boolean = false;  
  canvas = new fabric.Canvas(document.querySelector('canvas'));
  canvasHistory = {
    state: [""],
    currentStateIndex: -1,
    undoStatus: false,
    redoStatus: false,
    undoFinishedStatus: true,
    redoFinishedStatus: true,
  };
  ngOnInit(): void {
    this.getCanvasNames();
    document.getElementById('colorFill')?.addEventListener("input", this.changeColorForFill);
    document.getElementById('strokeColor')?.addEventListener("input", this.changeColorForStroke);
    document.getElementById('strokeSize')?.addEventListener("input", this.changeSizeOfStroke);
    this.canvas = new fabric.Canvas('canvas');
    this.ctx = this.canvas.getContext();
    this.canvas.isDrawingMode = this.free
    //this.canvas.selection = false
    this.canvas.on('object:added', () => {
      if(this.eras){
        alert(this.canvas.getObjects().length)
        this.canvas.getObjects()[this.canvas.getObjects().length - 1].set("selectable" , false)
      }
      this.updateHistory();
    });
    this.canvas.on('object:modified', () => {
      this.updateHistory();
    });
  }


  CapureDrawButton(type: string){
    this.eras = false
    this.bruch = false
    // const factory = new Factory(this.renderer, this.svg);
    // this.selctedShape = factory.getShape(type);
    // this.selctedTool = 'draw';
    // this.isDrawing = true;
    // document.querySelectorAll('._button').forEach((butt) =>{
    //   butt.classList.remove('active');
    // });
    // document.getElementById(type)?.classList.add('active');
    this.free = false
    this.canvas.isDrawingMode = this.free
    this.shape = type
    const factory = new Factory(this.canvas)
    this.selctedShape = factory.getShape(type)
    this.selctedShape.set("stroke", this.stroke)
    if(this.isFillClicked){
      this.selctedShape.set("fill",this.fillColor)
    }
    let n = this.stroke_width/1
    this.selctedShape.set("strokeWidth",n)
    this.canvas.add(this.selctedShape)
    this.canvas.renderAll()
    this.selctedTool = 'draw';
    //this.draw()
    this.isDrawing = true
    //this.selctedShape.startDraw()
  }

  fill(color : string){
    if(this.canvas.getActiveObject()!=null){
      let temp = this.canvas.getActiveObject()
      temp?.set("name","clone")
      if(temp!= null)
        this.canvas.add(temp)
      this.updateHistory();
    }
    this.canvas.renderAll();
  }
  copy(){
    const factory = new Factory(this.canvas)
    let x = this.canvas.getActiveObject()?.name
    if(x!=null)
      this.selctedShape = factory.getShape(x)
    if(this.selctedShape){
    	this.selctedShape.set("fill" , this.canvas.getActiveObject()?.fill)
      this.selctedShape?.set("top", 150);
    	this.selctedShape?.set("left", 150);
      this.selctedShape.set("stroke", this.canvas.getActiveObject()?.stroke)
      this.selctedShape.set("scaleX", this.canvas.getActiveObject()?.scaleX)
      this.selctedShape.set("scaleY", this.canvas.getActiveObject()?.scaleY)
      this.selctedShape.set("strokeWidth",this.canvas.getActiveObject()?.strokeWidth)
      this.canvas.add(this.selctedShape);
      //this.canvas.item(this.canvas.size() - 1).controlsAboveOverlay;
    }
    this.canvas.renderAll();  
}


  delete(){
    this.eras = false
    this.bruch = false
    let temp = this.canvas.getActiveObject()
    if(temp!=null){
      this.canvas.remove(this.canvas.getActiveObject()??temp)
      this.updateHistory();
    }
    this.canvas.renderAll();
  }

  draw(){
    this.free = false
    this.canvas.isDrawingMode = this.free
    const rect = new fabric.Rect({
      left: 30,
      top: 30,
      strokeWidth: 1,
      stroke: "black",
      fill: "red",
      width: 100,
      height: 100,
      selectable: true,
      hasRotatingPoint: false
    });
    this.canvas.add(rect)
    //alert(rect.sendToBack())
    //console.log(rect.sendToBack())
    //this.canvas._objects.push(rect)
    console.log(this.canvas.sendToBack(rect))
    this.canvas.renderAll()
    //this.updateHistory();
  }
  
  updateHistory(){
    if (this.canvasHistory.undoStatus === true || this.canvasHistory.redoStatus === true) {
      console.log('Do not do anything, this got triggered automatically while the undo and redo actions were performed');
    } else {
      const jsonData = this.canvas.toJSON();
      const canvasAsJson = JSON.stringify(jsonData);
      if (this.canvasHistory.currentStateIndex < this.canvasHistory.state.length - 1) {

          const indexToBeInserted = this.canvasHistory.currentStateIndex + 1;
          this.canvasHistory.state[indexToBeInserted] = canvasAsJson;
          const elementsToKeep = indexToBeInserted + 1;
          console.log(`History rewritten, preserved ${elementsToKeep} items`);
          this.canvasHistory.state = this.canvasHistory.state.splice(0, elementsToKeep);

      // NOTE: This happens when there is a new item pushed to the canvasHistory (normal case) 20180912:Alevale
      } else {
          console.log('push to canvasHistory');
          this.canvasHistory.state.push(canvasAsJson);
      }

      this.canvasHistory.currentStateIndex = this.canvasHistory.state.length - 1;
    }
  };



  undo(){
    this.eras = false
    this.bruch = false
    this.free = false
    this.canvas.isDrawingMode = this.free
    if (this.canvasHistory.currentStateIndex - 1 === -1) {
      console.log('do not do anything anymore, you are going far to the past, before creation, there was nothing');
      return;
    }

    if (this.canvasHistory.undoFinishedStatus) {
      this.canvasHistory.undoFinishedStatus = false;
      this.canvasHistory.undoStatus = true;
      this.canvas.loadFromJSON(this.canvasHistory.state[this.canvasHistory.currentStateIndex - 1], () => {
          this.canvas.renderAll();
          this.canvasHistory.undoStatus = false;
          this.canvasHistory.currentStateIndex--;
          this.canvasHistory.undoFinishedStatus = true;
      });
    }
  };

  redo(){
    this.eras = false
    this.bruch = false
    this.free = false
    this.canvas.isDrawingMode = this.free
    if (this.canvasHistory.currentStateIndex + 1 === this.canvasHistory.state.length) {
      console.log('do not do anything anymore, you do not know what is after the present, do not mess with the future');
      return;
    }

    if (this.canvasHistory.redoFinishedStatus) {
      this.canvasHistory.redoFinishedStatus = false;
      this.canvasHistory.redoStatus = true;
      this.canvas.loadFromJSON(this.canvasHistory.state[this.canvasHistory.currentStateIndex + 1], () => {
          this.canvas.renderAll();
          this.canvasHistory.redoStatus = false;
          this.canvasHistory.currentStateIndex++;
          this.canvasHistory.redoFinishedStatus = true;
      });
    }
  };
  freeHand(){
    this.eras = false
    this.bruch = false
    this.free = !this.free
    this.canvas.isDrawingMode = this.free
    let brush = new fabric.PencilBrush(this.canvas)
    brush.color = this.stroke
    brush.width = this.stroke_width/1
    this.canvas.freeDrawingBrush = brush;
    this.canvas.renderAll()
  }
  changeColorForStroke = (event:any) =>{
    this.free = false
    this.canvas.isDrawingMode = this.free
    this.stroke = event.target.value;
  }

  changeColorForFill = (event:any) =>{
    this.free = false
    this.canvas.isDrawingMode = this.free
    this.fillColor = event.target.value
  }
  changeSizeOfStroke = (event:any) => {
    this.free = false
    this.canvas.isDrawingMode = this.free
    this.stroke_width = event.target.value;
  }
  brush(){
    this.free = false
    this.eras = false
    this.bruch = !this.bruch
    this.canvas.isDrawingMode = this.bruch
    let brush = new fabric.PencilBrush(this.canvas)
    brush.color = this.stroke
    brush.width = this.stroke_width*5
    this.canvas.freeDrawingBrush = brush;
    this.canvas.renderAll()
  }
  erase(){
    this.free = false
    this.bruch = false
    this.eras = !this.eras
    this.canvas.isDrawingMode = this.eras
    let brush = new fabric.PencilBrush(this.canvas)
    brush.color = "#F3E6E6"
    brush.width = this.stroke_width*5
    this.canvas.freeDrawingBrush = brush;
    this.canvas.renderAll()
  }
  //---------------------------------------
  //methods for saving canvas drawings
  save(){
    const inputValue = (document.getElementById("fileName") as HTMLInputElement).value;
    const selectBox = document.getElementById("canvasFiles") as HTMLSelectElement;
    
    if(inputValue.length == 0) alert("you must provide a name");
    else {
      var canvasUrl = document.querySelector('canvas')!.toDataURL();
      var canvas = {
        "name": inputValue,
        "data": canvasUrl
      }
      this.service.addCanvas(canvas).subscribe();
      console.log(inputValue);
      var option = document.createElement("option");
      option.value = inputValue;
      option.text = inputValue;
      selectBox.add(option);
    }

  }
  getClicked(){
    var selectBox = document.getElementById("canvasFiles") as HTMLSelectElement;
    if(selectBox.options.length>0){
      var strOption = selectBox.options[selectBox.selectedIndex].value;
      this.getCanvas(strOption);
    }else{
      alert("there are no previously saved files");
    }
  }
  deleteClicked(){
    var selectBox = document.getElementById("canvasFiles") as HTMLSelectElement;
    if(selectBox.options.length>0){
      var strOption = selectBox.options[selectBox.selectedIndex].value;
      this.service.deleteCanvas(strOption).subscribe();
      selectBox.remove(selectBox.selectedIndex);
    }
  }
  getCanvas(name: string){
    this.service.getCanvas(name).subscribe(response =>{
      this.canvas.clear();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      var cimg2 = new Image;
      cimg2.src = response;
      cimg2.onload = () => { this.ctx.drawImage(cimg2, 0, 0, this.canvas.width!, this.canvas.height!); };
      this.canvas.setBackgroundImage(response, this.canvas.renderAll.bind(this.canvas));
      
    })
  }
  getCanvasNames(){
    const selectBox = document.getElementById("canvasFiles") as HTMLSelectElement;
    var canvasNames: Array<string>;
    this.service.getCanvasNames().subscribe(response => {
      canvasNames = response as Array<string>;

      for(let i = 0; i < canvasNames.length; i++){
        var option = document.createElement("option");
        option.value = canvasNames[i];
        option.text = canvasNames[i];
        selectBox.add(option);
      }
    });
    
  }
  clear(){
    this.canvas.clear();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}



//var circle, isDown, origX, origY;



