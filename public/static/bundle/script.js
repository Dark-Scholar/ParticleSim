(()=>{"use strict";const t=(e,s)=>{let i=Math.floor(Math.random()*(s-e+1)+e);return 0===i&&(i=t(e,s)),i},e=t,s=()=>"#"+(1048575*Math.random()*1e6).toString(16).slice(0,6),i=class{ctx;x;y;radius;color;velocityX;velocityY;speed;velocityXMutator;velocityYMutator;mass;constructor({ctx:t,x:e,y:s,radius:i,color:o,speed:a,velocityX:c,velocityY:r,velocityXMutator:h=1,velocityYMutator:l=1,mass:n=1}){this.ctx=t,this.x=e,this.y=s,this.radius=i,this.color=o,this.velocityX=c,this.velocityY=r,this.speed=a,this.velocityXMutator=h,this.velocityYMutator=l,this.mass=n}draw(){this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),this.ctx.fillStyle=this.color,this.ctx.shadowColor="rgba(0, 0, 0, 0.3)",this.ctx.shadowBlur=.6,this.ctx.shadowOffsetX=3,this.ctx.shadowOffsetY=3,this.ctx.fill(),this.ctx.closePath()}update(){this.x+=this.velocityX*this.speed*Math.PI/this.velocityXMutator,this.y+=this.velocityY*this.speed*Math.PI/this.velocityYMutator}};var o;!function(t){let e;!function(t){t.PARTICLEINPUT="num_particles",t.VELOCITYINPUT="num_velocity",t.SPEEDINPUT="num_speed",t.MASSINPUT="num_mass",t.RADIUSINPUT="num_radius",t.BACKGROUNDINPUT="bg_color"}(e=t.SIMCONTROLS||(t.SIMCONTROLS={})),t.SIMCONTROLS_NAME="sim_controls"}(o||(o={}));const a=o;var c;!function(t){t.INITIAL_PARTICLE_NUM=e(1,1e3),t.INITIAL_VELOCITY_DIVISOR=5,t.INITIAL_SPEED=1,t.INITIAL_MASS=1,t.INITIAL_RADIUS=10}(c||(c={}));const r=c,h=new class{MAX_PARTICLES=1e3;MIN_PARTICLES=1;MAX_ITER=1e6;backgroundColor;root;canvas;ctx;boundary;constructor({containerId:t,width:e,height:s,backgroundColor:i="white"}){this.root=document.querySelector(`#${t}`),this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.backgroundColor=i,e&&s&&(this.canvas.width=e,this.canvas.height=s)}initialize(){this.root&&(this.root.style.backgroundColor=this.backgroundColor,this.root.style.borderRadius="2%",this.root.style.boxShadow="0 0 10px rgba(0, 0, 0, 0.3)",this.root.style.border="1px solid black",this.root.style.position="relative",this.root.style.width="100%",this.root.style.height="90vh",this.root.appendChild(this.canvas),window.addEventListener("resize",this.resizeCanvas.bind(this)),this.resizeCanvas()),this.boundary=new class{x;y;width;height;constructor(t,e,s,i){this.x=t,this.y=e,this.width=s,this.height=i}isCollidingWith(t){const{x:e,y:s,radius:i}=t;return e+i>this.x+this.width||e-i<this.x||s+i>this.y+this.height||s-i<this.y}resolveCollision(t){const{x:e,y:s,radius:i,velocityX:o,velocityY:a}=t;(e+i>this.x+this.width||e-i<this.x)&&(t.velocityX=-o+(.2*Math.random()-.1)),(s+i>this.y+this.height||s-i<this.y)&&(t.velocityY=-a+(.2*Math.random()-.1))}resolveCollisions(t){for(const e of t)this.isCollidingWith(e)&&this.resolveCollision(e)}}(0,0,this.canvas.width,this.canvas.height)}clearCanvas(){this.ctx.fillStyle=this.backgroundColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}resizeCanvas(){this.root&&this.ctx&&(this.canvas.width=this.root.offsetWidth,this.canvas.height=this.root.offsetHeight)}drawLine(t,e,s,i){this.ctx&&(this.ctx.moveTo(t,e),this.ctx.lineTo(s,i),this.ctx.stroke())}}({containerId:"canvas"});h.initialize();let l=r.INITIAL_VELOCITY_DIVISOR,n=r.INITIAL_SPEED,I=r.INITIAL_RADIUS,d=[];const u=new class{form;constructor(t){this.form=document.querySelector(`#${t}`)}getInputValue(t){return this.form.querySelector(`#${t}`).value}setInputValue(t,e){this.form.querySelector(`#${t}`).value=e}}(a.SIMCONTROLS_NAME),v=document.getElementById(a.SIMCONTROLS.PARTICLEINPUT),y=document.getElementById(a.SIMCONTROLS.SPEEDINPUT),S=document.getElementById(a.SIMCONTROLS.MASSINPUT),T=document.getElementById(a.SIMCONTROLS.RADIUSINPUT),N=document.getElementById(a.SIMCONTROLS.BACKGROUNDINPUT),g=()=>{const t=parseInt(v.value,10)||r.INITIAL_PARTICLE_NUM;t>d.length?L({particles:d,desiredNumParticles:t}):t<d.length?M({particles:d,desiredNumParticles:t}):C()},C=()=>{for(let t=0;t<d.length;t++)d[t].radius=I},L=({particles:t,desiredNumParticles:o})=>{const a=o-t.length;let c=0;for(;c<a&&c<h.MAX_ITER;){const o=new i({ctx:h.ctx,x:e(0,h.canvas.width),y:e(0,h.canvas.height),radius:I,color:s(),speed:n,velocityX:e(-2,2),velocityY:e(-2,2),velocityXMutator:l,velocityYMutator:l});t.push(o),c++}},M=({particles:t,desiredNumParticles:e})=>{const s=t.length-e;t.splice(e,s)};v.addEventListener("change",(t=>{g()})),y.addEventListener("change",(t=>{n=parseFloat(y.value)||r.INITIAL_SPEED,g()})),S.addEventListener("change",(t=>{n=parseFloat(S.value)||r.INITIAL_MASS,g()})),T.addEventListener("change",(t=>{I=parseFloat(T.value)||r.INITIAL_RADIUS,g()})),N.addEventListener("change",(t=>{h.backgroundColor=N.value})),u.setInputValue(a.SIMCONTROLS.PARTICLEINPUT,r.INITIAL_PARTICLE_NUM.toString()),u.setInputValue(a.SIMCONTROLS.VELOCITYINPUT,l.toString()),u.setInputValue(a.SIMCONTROLS.SPEEDINPUT,r.INITIAL_SPEED.toString()),u.setInputValue(a.SIMCONTROLS.MASSINPUT,r.INITIAL_MASS.toString()),u.setInputValue(a.SIMCONTROLS.RADIUSINPUT,r.INITIAL_RADIUS.toString()),u.setInputValue(a.SIMCONTROLS.BACKGROUNDINPUT,"#FFFFFF"),g();const x=document.getElementById("canvas");x.addEventListener("click",(t=>{const o=x.getBoundingClientRect(),a=t.clientX-o.left,c=t.clientY-o.top;d.push(new i({ctx:h.ctx,x:a,y:c,radius:10,color:s(),speed:n,velocityX:e(-2,2),velocityY:e(-2,2),velocityXMutator:l,velocityYMutator:l})),v.value=d.length.toString()}));const m=()=>{h.clearCanvas();for(let t=0;t<d.length;t++){const e=d[t];e.speed=n,e.draw();const s=e.x+e.velocityX,i=e.y+e.velocityY,o=s-e.radius<0||s+e.radius>h.canvas.width,a=i-e.radius<0||i+e.radius>h.canvas.height;o&&(e.velocityX*=-1,e.x+=e.velocityX),a&&(e.velocityY*=-1,e.y+=e.velocityY),e.update();for(let s=t+1;s<d.length;s++){const t=d[s],i=t.x-e.x,o=t.y-e.y,a=Math.sqrt(i*i+o*o);if(a<e.radius+t.radius){const s=i/a,c=o/a,r=(t.velocityX-e.velocityX)*s+(t.velocityY-e.velocityY)*c;if(r<0){const i=2*r/(e.mass+t.mass);e.velocityX+=i*t.mass*s,e.velocityY+=i*t.mass*c,t.velocityX-=i*e.mass*s,t.velocityY-=i*e.mass*c;const o=.5*(a-e.radius-t.radius);e.x-=o*s,e.y-=o*c,t.x+=o*s,t.y+=o*c}}}}requestAnimationFrame(m)};m()})();