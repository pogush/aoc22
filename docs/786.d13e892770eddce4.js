"use strict";(self.webpackChunkaoc22=self.webpackChunkaoc22||[]).push([[786],{786:(T,p,n)=>{n.r(p),n.d(p,{D09Module:()=>f});var v=n(6895),h=n(8505),r=n(1571),g=n(6691),S=n(4454),k=n(1827);class a{constructor(i,t,o){this.inputService=i,this.engineService=t,this.canvasService=o,this.commands=[],this.knots=[],this.visited=new Set}ngOnDestroy(){this.engineService.interrupt()}ngAfterViewInit(){let i;this.inputService.get("09").pipe((0,h.b)(()=>{i=performance.now()}),(0,h.b)(t=>this.processInput(t)),(0,h.b)(()=>this.process(2)),(0,h.b)(()=>this.process(10)),(0,h.b)(()=>{console.log(`Took ${performance.now()-i}ms`)})).subscribe()}processInput(i){for(const t of i){if(""===t)continue;const o=t.match(/^([RLUD]) (\d+)$/);if(null===o)throw new Error;const m=o[1],l=parseInt(o[2]);this.commands.push({direction:m,length:l})}}process(i=2){this.knots=[],this.visited.clear();for(let t=0;t<i;t++)this.knots.push([0,0]);for(const t of this.commands){const o="R"===t.direction?1:"L"===t.direction?-1:0,m="U"===t.direction?1:"D"===t.direction?-1:0;for(let l=0;l<t.length;l++){this.knots[0][0]+=o,this.knots[0][1]+=m;for(let d=1;d<this.knots.length;d++){const u=this.knots[d-1],s=this.knots[d],c=u[0]-s[0],e=u[1]-s[1];2===c?1===e||2===e?(s[0]+=1,s[1]+=1):0===e?s[0]+=1:(-1===e||-2===e)&&(s[0]+=1,s[1]-=1):-2===c?1===e||2===e?(s[0]-=1,s[1]+=1):0===e?s[0]-=1:(-1===e||-2===e)&&(s[0]-=1,s[1]-=1):2===e?1===c?(s[0]+=1,s[1]+=1):0===c?s[1]+=1:-1===c&&(s[0]-=1,s[1]+=1):-2===e&&(1===c?(s[0]+=1,s[1]-=1):0===c?s[1]-=1:-1===c&&(s[0]-=1,s[1]-=1))}this.addToVisited(this.knots[this.knots.length-1])}}console.log(this.visited.size)}addToVisited(i){this.visited.add(`[${i[0]}:${i[1]}]`)}static#t=this.\u0275fac=function(t){return new(t||a)(r.Y36(g.f),r.Y36(S.S),r.Y36(k.t))};static#s=this.\u0275cmp=r.Xpm({type:a,selectors:[["app-d09"]],decls:0,vars:0,template:function(t,o){},encapsulation:2})}var D=n(235);const y=[{path:"",component:a}];class f{static#t=this.\u0275fac=function(t){return new(t||f)};static#s=this.\u0275mod=r.oAB({type:f});static#i=this.\u0275inj=r.cJS({imports:[v.ez,D.Bz.forChild(y)]})}}}]);