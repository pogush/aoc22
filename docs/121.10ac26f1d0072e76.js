"use strict";(self.webpackChunkaoc22=self.webpackChunkaoc22||[]).push([[121],{4121:(T,l,n)=>{n.r(l),n.d(l,{D11Module:()=>m});var I=n(6895),c=n(8505),i=n(1571),v=n(6691),k=n(4454),g=n(1827);class u{constructor(){this.monkeys=[],this.modulo=1}addMonkey(t){this.monkeys.push(t),this.modulo*=t.test}simulateFirst(t){for(let s=0;s<t;s++)this.simulateRoundFirst();const e=this.monkeys.sort((s,o)=>o.itemsInspected-s.itemsInspected);return e[0].itemsInspected*e[1].itemsInspected}simulateSecond(t){for(let s=0;s<t;s++)this.simulateRoundSecond();const e=this.monkeys.sort((s,o)=>o.itemsInspected-s.itemsInspected);return e[0].itemsInspected*e[1].itemsInspected}simulateRoundFirst(){for(const t of this.monkeys){for(const e of t.items){t.itemsInspected++;const s=this.doOperation(e,t.operation,t.operand),o=Math.floor(s/3);this.monkeys[o%t.test==0?t.monkeyTrue:t.monkeyFalse].items.push(o)}t.items=[]}}simulateRoundSecond(){for(const t of this.monkeys){for(const e of t.items){t.itemsInspected++;const o=this.doOperation(e,t.operation,t.operand)%this.modulo;this.monkeys[o%t.test==0?t.monkeyTrue:t.monkeyFalse].items.push(o)}t.items=[]}}doOperation(t,e,s){return"old"===s&&(s=t),"+"===e?t+s:t*s}}class a{constructor(t,e,s){this.inputService=t,this.engineService=e,this.canvasService=s,this.simulationFirst=new u,this.simulationSecond=new u}ngOnDestroy(){this.engineService.interrupt()}ngAfterViewInit(){let t;this.inputService.get("11").pipe((0,c.b)(()=>{t=performance.now()}),(0,c.b)(e=>this.processInput(e)),(0,c.b)(()=>this.process()),(0,c.b)(()=>{console.log(`Took ${performance.now()-t}ms`)})).subscribe()}processInput(t){for(let e=0;e<t.length/7;e++){const s=7*e,o=t[s+1].substring(18).split(", ").map(M=>parseInt(M)),r=t[s+2][23],d=t[s+2].substring(25),p="old"===d?"old":parseInt(d),h=parseInt(t[s+3].substring(21)),y=parseInt(t[s+4].substring(29)),f=parseInt(t[s+5].substring(30));this.simulationFirst.addMonkey({items:[...o],operation:r,operand:p,test:h,monkeyTrue:y,monkeyFalse:f,itemsInspected:0}),this.simulationSecond.addMonkey({items:[...o],operation:r,operand:p,test:h,monkeyTrue:y,monkeyFalse:f,itemsInspected:0})}}process(){const t=this.simulationFirst.simulateFirst(20);console.log("Part1",t);const e=this.simulationSecond.simulateSecond(1e4);console.log("Part2",e)}static#t=this.\u0275fac=function(e){return new(e||a)(i.Y36(v.f),i.Y36(k.S),i.Y36(g.t))};static#s=this.\u0275cmp=i.Xpm({type:a,selectors:[["app-d11"]],decls:0,vars:0,template:function(e,s){},encapsulation:2})}var S=n(235);const F=[{path:"",component:a}];class m{static#t=this.\u0275fac=function(e){return new(e||m)};static#s=this.\u0275mod=i.oAB({type:m});static#e=this.\u0275inj=i.cJS({imports:[I.ez,S.Bz.forChild(F)]})}}}]);