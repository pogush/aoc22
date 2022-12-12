"use strict";(self.webpackChunkaoc22=self.webpackChunkaoc22||[]).push([[106],{3106:(b,p,n)=>{n.r(p),n.d(p,{D12Module:()=>u});var f=n(6895),d=n(8505),a=n(1571),g=n(6691),v=n(4454),m=n(1827);class I{constructor(){this.rowIndex=0,this.colIndex=0,this.id="",this.height=0,this.neighbors=[],this.previous=null,this.value=1/0}}class w{constructor(){this.nodes=new Map,this.startNodeId="",this.endNodeId="",this.queue=[],this.visited=new Set}traverseFromStart(){return this.visited.clear(),this.queue=[this.startNodeId],this.traverse()}traverseFromStartPart2(){return this.visited.clear(),this.queue=Array.from(this.nodes.values()).filter(s=>0===s.height).map(s=>s.id),this.traverse()}traverse(s=0){const e=[];for(;this.queue.length>0;){const t=this.queue.pop();if(t===this.endNodeId)return s;if(void 0===t)throw new Error;if(this.visited.has(t))continue;this.visited.add(t);const h=this.nodes.get(t);if(void 0===h)throw new Error;for(const i of h.neighbors)this.visited.has(i.id)||e.push(i.id)}if(e.length)return this.queue=e,this.traverse(s+1);throw new Error}}class l{constructor(s,e,t){this.inputService=s,this.engineService=e,this.canvasService=t,this.graph=new w}ngOnDestroy(){this.engineService.interrupt()}ngAfterViewInit(){let s;this.inputService.get("12").pipe((0,d.b)(()=>{s=performance.now()}),(0,d.b)(e=>this.processInput(e)),(0,d.b)(()=>this.process()),(0,d.b)(()=>this.processPart2()),(0,d.b)(()=>{console.log(`Took ${performance.now()-s}ms`)})).subscribe()}processInput(s){const e=[];for(let t=0;t<s.length;t++){const h=s[t];if(""===h)continue;e.push([]);const i=h.split("");for(let o=0;o<i.length;o++){const r=new I;r.id=this.getNodeId(t,o),r.rowIndex=t,r.colIndex=o;let c=i[o];"S"===c?(this.graph.startNodeId=r.id,c="a"):"E"===c&&(this.graph.endNodeId=r.id,c="z"),r.height=c.charCodeAt(0)-97,e[t].push(r)}}for(let t=0;t<e.length;t++){const h=e[t];for(let i=0;i<h.length;i++){const o=h[i],r=[];t>0&&r.push(e[t-1][i]),t<e.length-1&&r.push(e[t+1][i]),i<h.length-1&&r.push(e[t][i+1]),i>0&&r.push(e[t][i-1]),o.neighbors.push(...r.filter(c=>c.height<=o.height+1)),this.graph.nodes.set(o.id,o)}}}process(){const s=this.graph.traverseFromStart();console.log("Part1",s)}processPart2(){const s=this.graph.traverseFromStartPart2();console.log("Part2",s)}getNodeId(s,e){return`[${s}:${e}]`}static#t=this.\u0275fac=function(e){return new(e||l)(a.Y36(g.f),a.Y36(v.S),a.Y36(m.t))};static#e=this.\u0275cmp=a.Xpm({type:l,selectors:[["app-d12"]],decls:0,vars:0,template:function(e,t){},encapsulation:2})}var S=n(235);const N=[{path:"",component:l}];class u{static#t=this.\u0275fac=function(e){return new(e||u)};static#e=this.\u0275mod=a.oAB({type:u});static#s=this.\u0275inj=a.cJS({imports:[f.ez,S.Bz.forChild(N)]})}}}]);