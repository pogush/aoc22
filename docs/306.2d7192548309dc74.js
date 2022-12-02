"use strict";(self.webpackChunkaoc22=self.webpackChunkaoc22||[]).push([[306],{2306:(P,S,a)=>{a.r(S),a.d(S,{D01Module:()=>v});var w=a(6895),y=a(8505),M=a(4243),n=a(2329);class z extends M.x{constructor(){super(...arguments),this.rotationSpeed=.25,this.elves=[]}setup(){this.camera=new n.cPb(65,1.6,.1,100),this.camera.position.x=10,this.camera.position.y=7,this.camera.lookAt(0,0,0),this.add(this.camera),this.engineService.setMainCamera(this.camera);const t=new n.Ox3(16777215,1);t.position.set(1,5,1),t.lookAt(0,0,0),this.add(t);const e=new n.Ox3(16777215,.75);e.position.set(-9,5,-9),t.lookAt(0,0,0),this.add(e);const o=new n.DvJ(18,.1,18),i=new n.vBJ({color:14935011}),r=new n.Kj0(o,i);this.add(r),this.createElves()}start(){}update(){const t=this.camera.position.x,o=this.camera.position.z,i=this.rotationSpeed*this.deltaTime;this.camera.position.x=t*Math.cos(i)+o*Math.sin(i),this.camera.position.z=o*Math.cos(i)-t*Math.sin(i),this.camera.lookAt(new n.Pa4(0,0,0))}setElves(t){this.elves=t}createElves(){const t=new n.DvJ(.75,4,.75);t.translate(0,1,0);const e=new n.xoR({color:2582609}),o=new n.xoR({color:15322471}),i=new n.xoR({color:13449025}),r=new n.xoR({color:13449025});let f=0;for(let h=-8;h<8;h++)for(let p=-8;p<8;p++){const s=this.elves[f],c=h+.5,g=p+.5;let d=e;1===s.ranking?d=o:2===s.ranking?d=i:3===s.ranking&&(d=r);const u=new n.Kj0(t,d);u.scale.y=s.scale,u.position.x=c,u.position.z=g,this.add(u),f++}}}var l=a(1571),R=a(6691),k=a(4454),A=a(1827);class m{constructor(t,e,o){this.inputService=t,this.engineService=e,this.canvasService=o,this.elves=[]}ngOnDestroy(){this.engineService.interrupt()}ngAfterViewInit(){this.inputService.get("01","1").pipe((0,y.b)(t=>this.process(t)),(0,y.b)(()=>this.bootstrap())).subscribe()}bootstrap(){if(null!==this.canvasService.canvas){const t=new z(this.engineService);t.setElves(this.elves),this.engineService.setScene(t),this.engineService.bootstrap()}}process(t){const e=[];let o={x:0,y:0,calories:[],total:0,scale:0,ranking:0};for(const s of t)""!==s?o.calories.push(parseInt(s)):(o.total=o.calories.reduce((c,g)=>c+g,0),e.push(o),o={x:0,y:0,calories:[],total:0,scale:0,ranking:0});e.sort((s,c)=>s.total-c.total).reverse();const i=e[e.length-1].total,r=e[0].total,p=e[0].total+e[1].total+e[2].total;console.log("Part1",r),console.log("Part2",p);for(let s=e.length;s<256;s++)e.push({x:0,y:0,calories:[],total:0,scale:0,ranking:0});this.elves=e.map((s,c)=>({...s,scale:s.total>0?s.total/r:i/r,ranking:c+1})).map(s=>({v:s,r:Math.random()})).sort((s,c)=>s.r-c.r).map(({v:s})=>s)}static#t=this.\u0275fac=function(e){return new(e||m)(l.Y36(R.f),l.Y36(k.S),l.Y36(A.t))};static#e=this.\u0275cmp=l.Xpm({type:m,selectors:[["app-d01"]],decls:0,vars:0,template:function(e,o){},encapsulation:2})}var C=a(235);const D=[{path:"",component:m}];class v{static#t=this.\u0275fac=function(e){return new(e||v)};static#e=this.\u0275mod=l.oAB({type:v});static#s=this.\u0275inj=l.cJS({imports:[w.ez,C.Bz.forChild(D)]})}}}]);