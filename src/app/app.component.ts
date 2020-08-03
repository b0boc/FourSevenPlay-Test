import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HexapiService } from './hexapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./css/app.component.min.css'],
  animations: [
    trigger('kicktheball', [
      state('1', style({
        backgroundColor: '{{primaryBg}}',
        left: '-1px',
        top: '-1px'
      }),{params: {primaryBg: 0}}),
      state('2', style({
        backgroundColor: '{{bg2}}',
        left: '{{maxLeft}}px',
        top: '{{maxTop}}px'
      }),{params: {bg2: 0, maxLeft: 360, maxTop:-1}}),
      state('3', style({
        backgroundColor: '{{bg3}}',
        left: '{{maxLeft}}px',
        top: '{{maxTop}}px'
      }),{params: {bg3: 0, maxLeft: 360, maxTop:160}}),
      state('4', style({
        backgroundColor: '{{bg4}}',
        left: '{{maxLeft}}px',
        top: '{{maxTop}}px'
      }),{params: {bg4: 0, maxLeft: -1, maxTop:160}}),
      transition('* => 1', animate('0ms')),
      transition('* => *', animate('2000ms ease')),
    ])
  ]
})


export class AppComponent implements OnInit  {

  // VARS
  title:string="Angular Test";
  showLayout:boolean;

  accessApi:boolean=true;
  hex :string; 
  primaryBg:string;
  bg2:string; 
  bg3:string; 
  bg4:string; 
  step:number=1; 
  
  maxLeft:number;
  maxTop:number;
  //END VARS

  @ViewChild('ballTag') ball:any;
  @ViewChild('boxTag') box:any;

  constructor(private apiCall: HexapiService){
  }


  ngOnInit(){
    this.accessHex();
  }

  animBall() { 
    switch(this.step) {
      default:
        this.accessHex();
      break;

      case 4:
        this.maxLeft=-1;
        this.maxTop=-1;
        this.step=1;
        break;
    }
  }

  accessHex() {
    if(this.accessApi) {
      this.accessApi = false;
      this.apiCall
      .getHex()
      .subscribe((data:any) => {

          this.hex = (data.new_color) ? data.new_color : 
                     (data.colors[0].hex) ? data.colors[0].hex : "#"+ 0 ;

          if(this.hex != "#"+0 && /^#([0-9A-F]{3}){1,2}$/i.test("#"+this.hex)) { 

            this.showLayout=true; 

            if(!this.primaryBg) { 
              this.primaryBg="#"+this.hex
              console.log("Primary color set to: #"+this.hex);
            }
            else {  
              switch(this.step) { 
                case 1:
                  this.bg2 = '#'+this.hex;
                  this.maxTop=-1;
                  this.maxLeft = this.box.nativeElement.offsetWidth-this.ball.nativeElement.offsetWidth-3; 
                  this.step++; 
                break;
                case 2:
                  this.bg3 = '#'+this.hex;
                  this.maxTop = this.box.nativeElement.offsetHeight-this.ball.nativeElement.offsetHeight-3;
                  this.maxLeft = this.box.nativeElement.offsetWidth-this.ball.nativeElement.offsetWidth-3;
                  this.step++;
                break;
                case 3:
                  this.bg4 = '#'+this.hex;
                  this.maxTop = this.box.nativeElement.offsetHeight-this.ball.nativeElement.offsetHeight-3;
                  this.maxLeft = -1;
                  this.step++;
                break;
              }
            }
          }

          else {
            console.log("%c Invalid color code fetched form API \n Check API response below" , 'background: red; color: white');
            console.log(data);
          }
        
          this.accessApi = true;
      });
    } else console.log("%c ..awaiting 1st API call", 'background:yellow; color:while;');

  }
    
}
