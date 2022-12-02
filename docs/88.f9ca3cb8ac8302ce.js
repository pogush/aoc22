"use strict";(self.webpackChunkaoc22=self.webpackChunkaoc22||[]).push([[88],{6088:(it,R,o)=>{o.r(R),o.d(R,{D02Module:()=>S});var M=o(6895),f=o(8505),A=o(4243),e=o(2329),G=o(9751),W=o(8421);const{isArray:x}=Array;var D=o(515),j=o(5403),K=o(3269);var T=o(9646),L=o(7445),B=o(2722);class N extends A.x{constructor(){super(...arguments),this.frustumSize=1e3,this.shapeSpeed=250,this.rounds=[],this.worldShapes=[],this.materialWhite=new e.vBJ({color:14935011}),this.materialBlack=new e.vBJ({color:1843233}),this.materialGreen=new e.vBJ({color:2582609}),this.materialYellow=new e.vBJ({color:15322471}),this.materialRed=new e.vBJ({color:13449025}),this.shapeOutcomeGeometry=new e.zf8(16,16),this.shapeRockGeometry=new e.zf8(16,6),this.shapePaperGeometry=new e._12(28,28),this.shapeScissorsGeometry=new e.zf8(16,3)}setup(){this.camera=new e.iKG(this.frustumSize/-2,this.frustumSize/2,this.frustumSize/2,this.frustumSize/-2,0,1e4),this.camera.position.set(this.frustumSize/2,this.frustumSize/2,1),this.add(this.camera),this.engineService.setMainCamera(this.camera);const t=new e._12(this.frustumSize,2),s=new e.Kj0(t,this.materialRed);s.position.set(this.frustumSize/2,800,0),this.add(s);const n=new e.Kj0(t,this.materialGreen);n.position.set(this.frustumSize/2,600,0),this.add(n);const i=new e.Kj0(t,this.materialWhite);i.position.set(this.frustumSize/2,500,0),this.add(i);const c=new e.Kj0(t,this.materialGreen);c.position.set(this.frustumSize/2,300,0),this.add(c);const r=new e.Kj0(t,this.materialWhite);r.position.set(this.frustumSize/2,200,0),this.add(r)}start(){(function F(...p){const t=(0,K.jO)(p),s=function I(p){return 1===p.length&&x(p[0])?p[0]:p}(p);return s.length?new G.y(n=>{let i=s.map(()=>[]),c=s.map(()=>!1);n.add(()=>{i=c=null});for(let r=0;!n.closed&&r<s.length;r++)(0,W.Xf)(s[r]).subscribe((0,j.x)(n,a=>{if(i[r].push(a),i.every(h=>h.length)){const h=i.map(m=>m.shift());n.next(t?t(...h):h),i.some((m,O)=>!m.length&&c[O])&&n.complete()}},()=>{c[r]=!0,!i[r].length&&n.complete()}));return()=>{i=c=null}}):D.E})((0,T.of)(...this.rounds),(0,L.F)(500)).pipe((0,B.R)(this.disposed$),(0,f.b)(([t,s])=>this.manageRound(s,t))).subscribe()}update(){for(const t of this.worldShapes)t.mesh.position.x-=this.shapeSpeed*this.deltaTime,t.mesh.position.x<-100&&this.remove(t.mesh)}setRounds(t){this.rounds=t}manageRound(t,s){if(this.worldShapes.findIndex(m=>m.roundIndex===t)>=0)return;const i=new e.Kj0(this.getGeometryForShape(s.part1.opponent),this.materialWhite);i.position.set(this.frustumSize+100,800,1),this.add(i);const c=new e.Kj0(this.getGeometryForShape(s.part1.me),this.materialWhite);c.position.set(this.frustumSize+100,600,1),this.add(c);const r=new e.Kj0(this.shapeOutcomeGeometry,this.getMaterialForOutcome(s.part1.outcome));r.position.set(this.frustumSize+100,500,1),this.add(r);const a=new e.Kj0(this.getGeometryForShape(s.part2.me),this.materialWhite);a.position.set(this.frustumSize+100,300,1),this.add(a);const h=new e.Kj0(this.shapeOutcomeGeometry,this.getMaterialForOutcome(s.part2.outcome));h.position.set(this.frustumSize+100,200,1),this.add(h),this.worldShapes.push({mesh:i,roundIndex:t}),this.worldShapes.push({mesh:c,roundIndex:t}),this.worldShapes.push({mesh:r,roundIndex:t}),this.worldShapes.push({mesh:a,roundIndex:t}),this.worldShapes.push({mesh:h,roundIndex:t})}getGeometryForShape(t){return"Rock"===t?this.shapeRockGeometry:"Paper"===t?this.shapePaperGeometry:this.shapeScissorsGeometry}getMaterialForOutcome(t){return"Win"===t?this.materialGreen:"Loss"===t?this.materialRed:this.materialYellow}}const k={A:"Rock",B:"Paper",C:"Scissors"},Z={X:"Rock",Y:"Paper",Z:"Scissors"},$={X:"Loss",Y:"Draw",Z:"Win"},Q={Rock:{Rock:"Draw",Paper:"Win",Scissors:"Loss"},Paper:{Rock:"Loss",Paper:"Draw",Scissors:"Win"},Scissors:{Rock:"Win",Paper:"Loss",Scissors:"Draw"}},b={Rock:{Loss:"Scissors",Draw:"Rock",Win:"Paper"},Paper:{Loss:"Rock",Draw:"Paper",Win:"Scissors"},Scissors:{Loss:"Paper",Draw:"Scissors",Win:"Rock"}},w={Rock:1,Paper:2,Scissors:3},g={Loss:0,Draw:3,Win:6};var l=o(1571),q=o(6691),_=o(4454),tt=o(1827);class u{constructor(t,s,n){this.inputService=t,this.engineService=s,this.canvasService=n,this.rounds=[]}ngOnDestroy(){this.engineService.interrupt()}ngAfterViewInit(){this.inputService.get("02","1").pipe((0,f.b)(t=>this.process(t)),(0,f.b)(()=>this.bootstrap())).subscribe()}process(t){let s=0,n=0;const i=[];for(const a of t){if(""===a)continue;const h=a.split(""),d=k[h[0]],v=Z[h[2]],P=$[h[2]],y=Q[d][v],z=b[d][P],C={opponent:d,me:v,outcome:y,points:w[v]+g[y]},E={opponent:d,me:z,outcome:P,points:w[z]+g[P]};s+=C.points,n+=E.points,i.push({part1:C,part2:E})}this.rounds=i.map(a=>({v:a,r:Math.random()})).sort((a,h)=>a.r-h.r).map(({v:a})=>a);const r=n;console.log("Part1",s),console.log("Part2",r)}bootstrap(){if(null!==this.canvasService.canvas){const t=new N(this.engineService);t.setRounds(this.rounds),this.engineService.setScene(t),this.engineService.bootstrap()}}static#t=this.\u0275fac=function(s){return new(s||u)(l.Y36(q.f),l.Y36(_.S),l.Y36(tt.t))};static#s=this.\u0275cmp=l.Xpm({type:u,selectors:[["app-d02"]],decls:0,vars:0,template:function(s,n){},encapsulation:2})}var st=o(235);const et=[{path:"",component:u}];class S{static#t=this.\u0275fac=function(s){return new(s||S)};static#s=this.\u0275mod=l.oAB({type:S});static#e=this.\u0275inj=l.cJS({imports:[M.ez,st.Bz.forChild(et)]})}}}]);