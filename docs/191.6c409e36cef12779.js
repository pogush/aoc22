"use strict";(self.webpackChunkaoc22=self.webpackChunkaoc22||[]).push([[191],{5191:(x,a,e)=>{e.r(a),e.d(a,{D10Module:()=>o});var u=e(6895),i=e(8505),r=e(1571),m=e(6691),l=e(4454),d=e(1827);class p{constructor(t,s){this.type=t,this.value=s}}class C{constructor(t){this.commands=t,this.running=!1,this.x=1,this.currentCommandIndex=0,this.currentCommandCycle=0,this.currentCycle=0,this.resultPart1=0,this.resultPart2=""}run(){for(this.running=!0;this.running;){this.currentCycle++,(this.currentCycle-20)%40==0&&(this.resultPart1+=this.currentCycle*this.x);const t=this.currentCycle%40-1;this.resultPart2+=this.x>=t-1&&this.x<=t+1?"#":".";const s=this.commands[this.currentCommandIndex];this.currentCommandCycle++,"noop"===s.type&&1===this.currentCommandCycle?(this.currentCommandCycle=0,this.currentCommandIndex++):"addx"===s.type&&2===this.currentCommandCycle&&(this.x+=s.value,this.currentCommandCycle=0,this.currentCommandIndex++),this.currentCommandIndex>=this.commands.length&&(this.running=!1)}}getResult(t){if("1"===t)return`${this.resultPart1}`;{let s="\n";for(let n=0;n<this.resultPart2.length;n++)s+=this.resultPart2[n],n>0&&(n+1)%40==0&&(s+="\n");return s}}}class c{constructor(t,s,n){this.inputService=t,this.engineService=s,this.canvasService=n,this.commands=[]}ngOnDestroy(){this.engineService.interrupt()}ngAfterViewInit(){let t;this.inputService.get("10").pipe((0,i.b)(()=>{t=performance.now()}),(0,i.b)(s=>this.processInput(s)),(0,i.b)(()=>this.process()),(0,i.b)(()=>{console.log(`Took ${performance.now()-t}ms`)})).subscribe()}processInput(t){for(const s of t){if(""===s)continue;let n=s.match(/^(addx|noop) ?(-?\d*)?$/);if(null===n)throw new Error;const h=n[1],y="addx"===h?parseInt(n[2]):0;this.commands.push(new p(h,y))}}process(){const t=new C(this.commands);t.run(),console.log("Part1",t.getResult("1")),console.log("Part2",t.getResult("2"))}static#t=this.\u0275fac=function(s){return new(s||c)(r.Y36(m.f),r.Y36(l.S),r.Y36(d.t))};static#s=this.\u0275cmp=r.Xpm({type:c,selectors:[["app-d10"]],decls:0,vars:0,template:function(s,n){},encapsulation:2})}var f=e(235);const g=[{path:"",component:c}];class o{static#t=this.\u0275fac=function(s){return new(s||o)};static#s=this.\u0275mod=r.oAB({type:o});static#n=this.\u0275inj=r.cJS({imports:[u.ez,f.Bz.forChild(g)]})}}}]);