import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CanvasSaverService } from '../canvas-saver.service';

@Component({
  selector: 'app-canvas-saver',
  templateUrl: './canvas-saver.component.html',
  styleUrls: ['./canvas-saver.component.css']
})
export class CanvasSaverComponent implements OnInit {

  c2:HTMLCanvasElement ;
  ctx2: any;

  constructor(private service: CanvasSaverService) { }

  ngOnInit(): void {
    this.c2 = <HTMLCanvasElement> document.getElementById("myCanvas2");
    this.ctx2 = this.c2.getContext("2d");
    this.getCanvasNames();
    // this.ctx2.beginPath();
    // this.ctx2.arc(108, 60, 30, 0, 2 * Math.PI);
    // this.ctx2.stroke();
  }
  save(){
    const inputValue = (document.getElementById("fileName") as HTMLInputElement).value;
    const selectBox = document.getElementById("canvasFiles") as HTMLSelectElement;
    
    if(inputValue.length == 0) alert("you must provide a name");
    else {
      var canvasUrl = this.c2.toDataURL();
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
      // var canvasData: String = response;
      var cimg2 = new Image;
      cimg2.src = response;
      cimg2.onload = () => { this.ctx2.drawImage(cimg2, 0, 0, this.c2.width, this.c2.height); };
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

}
