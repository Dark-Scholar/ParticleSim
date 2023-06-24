(()=>{"use strict";const t=(i,s)=>{let e=Math.floor(Math.random()*(s-i+1)+i);return 0===e&&(e=t(i,s)),e},i=t,s=class{ctx;x;y;radius;color;velocityX;velocityY;speed;velocityXMutator;velocityYMutator;constructor({ctx:t,x:i,y:s,radius:e,color:o,speed:h,velocityX:a,velocityY:r,velocityXMutator:c=1,velocityYMutator:n=1}){this.ctx=t,this.x=i,this.y=s,this.radius=e,this.color=o,this.velocityX=a,this.velocityY=r,this.speed=h,this.velocityXMutator=c,this.velocityYMutator=n}draw(){this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),this.ctx.fillStyle=this.color,this.ctx.shadowColor="rgba(0, 0, 0, 0.3)",this.ctx.shadowBlur=.6,this.ctx.shadowOffsetX=3,this.ctx.shadowOffsetY=3,this.ctx.fill(),this.ctx.closePath()}update(){this.x+=this.velocityX*this.speed*Math.PI/this.velocityXMutator,this.y+=this.velocityY*this.speed*Math.PI/this.velocityYMutator}};var e;!function(t){let i;!function(t){t.PARTICLEINPUT="num_particles",t.VELOCITYINPUT="num_velocity",t.SPEEDINPUT="num_speed"}(i=t.SIMCONTROLS||(t.SIMCONTROLS={})),t.SIMCONTROLS_NAME="sim_controls"}(e||(e={}));const o=e;var h;!function(t){t.INITIAL_PARTICLE_NUM=i(1,1e3),t.INITIAL_VELOCITY_DIVISOR=5,t.INITIAL_SPEED=1}(h||(h={}));const a=h,r=new class{MAX_PARTICLES=1e3;MIN_PARTICLES=1;MAX_ITER=1e6;root;canvas;ctx;boundary;constructor({containerId:t,width:i,height:s}){this.root=document.querySelector(`#${t}`),this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),i&&s&&(this.canvas.width=i,this.canvas.height=s)}initialize(){this.root&&(this.root.style.backgroundColor="white",this.root.style.borderRadius="2%",this.root.style.boxShadow="0 0 10px rgba(0, 0, 0, 0.3)",this.root.style.border="1px solid black",this.root.style.position="relative",this.root.style.width="100%",this.root.style.height="90vh",this.root.appendChild(this.canvas),window.addEventListener("resize",this.resizeCanvas.bind(this)),this.resizeCanvas()),this.boundary=new class{x;y;width;height;constructor(t,i,s,e){this.x=t,this.y=i,this.width=s,this.height=e}isCollidingWith(t){const{x:i,y:s,radius:e}=t;return i+e>this.x+this.width||i-e<this.x||s+e>this.y+this.height||s-e<this.y}resolveCollision(t){const{x:i,y:s,radius:e,velocityX:o,velocityY:h}=t;(i+e>this.x+this.width||i-e<this.x)&&(t.velocityX=-o+(.2*Math.random()-.1)),(s+e>this.y+this.height||s-e<this.y)&&(t.velocityY=-h+(.2*Math.random()-.1))}resolveCollisions(t){for(const i of t)this.isCollidingWith(i)&&this.resolveCollision(i)}}(0,0,this.canvas.width,this.canvas.height)}clearCanvas(){this.ctx?.clearRect(0,0,this.canvas.width,this.canvas.height)}resizeCanvas(){this.root&&this.ctx&&(this.canvas.width=this.root.offsetWidth,this.canvas.height=this.root.offsetHeight)}drawLine(t,i,s,e){this.ctx&&(this.ctx.moveTo(t,i),this.ctx.lineTo(s,e),this.ctx.stroke())}}({containerId:"canvas"});r.initialize();let c=a.INITIAL_PARTICLE_NUM,n=a.INITIAL_VELOCITY_DIVISOR,l=a.INITIAL_SPEED,I=[];const d=new class{form;constructor(t){this.form=document.querySelector(`#${t}`)}getInputValue(t){return this.form.querySelector(`#${t}`).value}setInputValue(t,i){this.form.querySelector(`#${t}`).value=i}}(o.SIMCONTROLS_NAME),u=document.getElementById(o.SIMCONTROLS.PARTICLEINPUT),v=document.getElementById(o.SIMCONTROLS.SPEEDINPUT),y=()=>{if(c=parseInt(u.value,10)||a.INITIAL_PARTICLE_NUM,c!==I.length){I=[];let t=0;for(;t<c&&t<r.MAX_ITER;)I.push(new s({ctx:r.ctx,x:i(0,r.canvas.width),y:i(0,r.canvas.height),radius:10,color:"#"+(1048575*Math.random()*1e6).toString(16).slice(0,6),speed:l,velocityX:i(-2,2),velocityY:i(-2,2),velocityXMutator:n,velocityYMutator:n})),t++}};u.addEventListener("keydown",(t=>{"Enter"===t.key&&y()})),v.addEventListener("keydown",(t=>{"Enter"===t.key&&(l=parseInt(v.value,10)||a.INITIAL_SPEED,y())})),d.setInputValue(o.SIMCONTROLS.PARTICLEINPUT,a.INITIAL_PARTICLE_NUM.toString()),d.setInputValue(o.SIMCONTROLS.VELOCITYINPUT,n.toString()),d.setInputValue(o.SIMCONTROLS.SPEEDINPUT,a.INITIAL_SPEED.toString()),y();const T=()=>{r.clearCanvas();for(const t of I)t.speed=l,t.draw(),t.update();r.boundary.resolveCollisions(I),requestAnimationFrame(T)};T()})();