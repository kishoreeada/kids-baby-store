
/* Contact page — Section 01 */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".contact-conversation");
  const form=document.querySelector("#contactForm");
  if(!section) return;

  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if(window.gsap && window.ScrollTrigger && !reduce){
    gsap.registerPlugin(ScrollTrigger);
    const top=section.querySelector("[data-contact-reveal]");
    const copy=section.querySelector("[data-contact-copy]");
    const formPanel=section.querySelector("[data-contact-form]");
    const foot=section.querySelector(".contact-section-foot");

    gsap.set(top,{y:15,opacity:0});
    gsap.set(copy,{x:-28,opacity:0});
    gsap.set(formPanel,{x:28,opacity:0});
    gsap.set(foot,{y:12,opacity:0});

    const tl=gsap.timeline({paused:true});
    tl.to(top,{y:0,opacity:1,duration:.35,ease:"power3.out"})
      .to(copy,{x:0,opacity:1,duration:.62,ease:"power4.out"},"-=.1")
      .to(formPanel,{x:0,opacity:1,duration:.58,ease:"power3.out"},"-=.4")
      .to(foot,{y:0,opacity:1,duration:.35,ease:"power3.out"},"-=.2");

    ScrollTrigger.create({
      trigger:section,start:"top 76%",once:true,onEnter:()=>tl.play()
    });
  }

  if(!form) return;

  const fields={
    name:form.querySelector("#contactName"),
    email:form.querySelector("#contactEmail"),
    topic:form.querySelector("#contactTopic"),
    message:form.querySelector("#contactMessage")
  };
  const status=form.querySelector("#contactFormStatus");

  const setError=(key,msg)=>{
    const el=form.querySelector(`[data-error-for="${key}"]`);
    if(el) el.textContent=msg;
  };

  form.addEventListener("submit",(event)=>{
    event.preventDefault();
    Object.keys(fields).forEach(k=>setError(k,""));
    if(status) status.textContent="";

    let valid=true;
    const name=fields.name.value.trim();
    const email=fields.email.value.trim();
    const topic=fields.topic.value;
    const message=fields.message.value.trim();

    if(!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(name)){
      setError("name","Please enter your name."); valid=false;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      setError("email","Please enter a valid email."); valid=false;
    }
    if(!topic){
      setError("topic","Choose one option."); valid=false;
    }
    if(message.length<10){
      setError("message","Please tell us a little more."); valid=false;
    }

    if(!valid){
      const first=form.querySelector(".contact-error:not(:empty)");
      first?.closest(".contact-field")?.querySelector("input,select,textarea")?.focus();
      return;
    }

    if(status){
      status.textContent="Thanks — your message is ready to be sent.";
    }
    form.reset();
  });
});


/* Contact page — Section 02 */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".contact-next-answer");
  if(!section || !window.gsap || !window.ScrollTrigger) return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);
  const top=section.querySelector("[data-next-reveal]");
  const copy=section.querySelector("[data-next-copy]");
  const orbit=section.querySelector("[data-next-orbit]");
  const routes=section.querySelectorAll(".answer-route");
  const foot=section.querySelector(".next-answer-foot");

  gsap.set(top,{y:14,opacity:0});
  gsap.set(copy,{x:-32,opacity:0});
  gsap.set(orbit,{scale:.82,opacity:0,rotation:-10});
  gsap.set(routes,{x:30,opacity:0});
  gsap.set(foot,{y:12,opacity:0});

  const tl=gsap.timeline({paused:true});
  tl.to(top,{y:0,opacity:1,duration:.35,ease:"power3.out"})
    .to(copy,{x:0,opacity:1,duration:.58,ease:"power4.out"},"-=.12")
    .to(orbit,{scale:1,opacity:1,rotation:0,duration:.75,ease:"back.out(1.4)"},"-=.42")
    .to(routes,{x:0,opacity:1,duration:.42,stagger:.11,ease:"power3.out"},"-=.45")
    .to(foot,{y:0,opacity:1,duration:.35,ease:"power3.out"},"-=.18");

  ScrollTrigger.create({
    trigger:section,
    start:"top 74%",
    once:true,
    onEnter:()=>tl.play()
  });

  gsap.to(section.querySelector(".orbit-ring-one"),{
    rotation:360,
    duration:28,
    repeat:-1,
    ease:"none",
    transformOrigin:"50% 50%"
  });
  gsap.to(section.querySelector(".orbit-ring-two"),{
    rotation:-360,
    duration:19,
    repeat:-1,
    ease:"none",
    transformOrigin:"50% 50%"
  });
});


/* Contact page — Section 03 */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".contact-order-journey");
  if(!section || !window.gsap || !window.ScrollTrigger) return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);

  const top=section.querySelector(".order-journey-top");
  const heading=section.querySelector(".order-journey-heading");
  const steps=section.querySelectorAll(".order-step");
  const progress=section.querySelector(".order-track-progress");
  const foot=section.querySelector(".order-journey-foot");

  gsap.set(top,{y:12,opacity:0});
  gsap.set(heading,{y:24,opacity:0});
  gsap.set(steps,{y:30,opacity:0});
  gsap.set(foot,{y:12,opacity:0});

  const tl=gsap.timeline({paused:true});
  tl.to(top,{y:0,opacity:1,duration:.35,ease:"power3.out"})
    .to(heading,{y:0,opacity:1,duration:.58,ease:"power4.out"},"-=.1")
    .to(steps,{y:0,opacity:1,duration:.48,stagger:.1,ease:"power3.out"},"-=.25")
    .to(foot,{y:0,opacity:1,duration:.32,ease:"power3.out"},"-=.12");

  ScrollTrigger.create({
    trigger:section,
    start:"top 72%",
    once:true,
    onEnter:()=>{
      tl.play();
      gsap.to(progress,{
        width:"100%",
        duration:1.35,
        delay:.25,
        ease:"power2.inOut",
        onComplete:()=>{
          if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
            gsap.to(progress,{
              width:"100%",
              duration:2.6,
              repeat:-1,
              ease:"none",
              modifiers:{
                width:()=> "100%"
              }
            });
          }
        }
      });

      // A small travelling signal gives the timeline a living, moving quality.
      const signal=progress.querySelector(":scope");
      gsap.fromTo(progress,{
        opacity:.72
      },{
        opacity:1,
        duration:1.2,
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut"
      });
    }
  });

  // Mobile: progress travels vertically instead of horizontally.
  // Gentle scroll-linked movement keeps the four stages visually alive.
  steps.forEach((step,index)=>{
    gsap.to(step,{
      y:index%2===0 ? -7 : 7,
      ease:"none",
      scrollTrigger:{
        trigger:section,
        start:"top bottom",
        end:"bottom top",
        scrub:1.4
      }
    });
  });

  if(window.matchMedia("(max-width:767px)").matches){
    gsap.set(progress,{width:2,height:0});
    ScrollTrigger.create({
      trigger:section,
      start:"top 70%",
      once:true,
      onEnter:()=>{
        gsap.to(progress,{
          height:"100%",
          duration:1.35,
          delay:.25,
          ease:"power2.inOut"
        });
      }
    });
  }
  ScrollTrigger.create({
    trigger:section,
    start:"top 72%",
    once:true,
    onEnter:()=>{
      steps.forEach((step,index)=>{
        gsap.to(step.querySelector(".order-step-marker"),{
          scale:1.06,
          duration:.32,
          delay:.8+(index*.22),
          yoyo:true,
          repeat:1,
          ease:"power2.out"
        });
      });
    }
  });

});

/* ---------------------------------------------------------
   Cursor-reactive parallax — Contact Section 3
   Desktop pointer only; intentionally disabled on touch.
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".contact-order-journey");
  if(!section) return;

  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer=window.matchMedia("(pointer:fine)");
  if(reduced.matches || !pointer.matches) return;

  const heading=section.querySelector(".order-journey-heading");
  const track=section.querySelector(".order-track");
  const foot=section.querySelector(".order-journey-foot");
  const cards=section.querySelectorAll(".order-step-card");
  const markers=section.querySelectorAll(".order-step-marker");

  let targetX=0,targetY=0,currentX=0,currentY=0,raf=0;

  const render=()=>{
    currentX += (targetX-currentX)*0.09;
    currentY += (targetY-currentY)*0.09;

    const x=currentX;
    const y=currentY;

    section.style.setProperty("--mx",`${x.toFixed(2)}px`);
    section.style.setProperty("--my",`${y.toFixed(2)}px`);

    cards.forEach((card,index)=>{
      const depth=(index+1)*0.8;
      card.style.transform=`translate3d(${(x*depth/12).toFixed(2)}px,${(y*depth/15).toFixed(2)}px,0)`;
    });

    markers.forEach((marker,index)=>{
      const depth=(index+1)*0.35;
      marker.style.transform=`translate3d(${(x*depth/10).toFixed(2)}px,${(y*depth/12).toFixed(2)}px,0)`;
    });

    if(Math.abs(targetX-currentX)>0.05 || Math.abs(targetY-currentY)>0.05){
      raf=requestAnimationFrame(render);
    }else{
      raf=0;
    }
  };

  section.addEventListener("pointermove",(event)=>{
    const rect=section.getBoundingClientRect();
    const px=(event.clientX-rect.left)/rect.width-.5;
    const py=(event.clientY-rect.top)/rect.height-.5;

    // Small movement: intentionally subtle, not a distracting 3D effect.
    targetX=px*18;
    targetY=py*12;

    if(!raf) raf=requestAnimationFrame(render);
  });

  section.addEventListener("pointerleave",()=>{
    targetX=0;
    targetY=0;
    if(!raf) raf=requestAnimationFrame(render);
  });
});

document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector(".contact-small-things");if(!s||!window.gsap||!window.ScrollTrigger)return;if(!matchMedia("(prefers-reduced-motion: reduce)").matches){const a=s.querySelectorAll(".small-detail-card");gsap.set(s.querySelector(".small-things-top"),{y:14,opacity:0});gsap.set(s.querySelector(".small-things-intro"),{y:25,opacity:0});gsap.set(a,{y:35,opacity:0});ScrollTrigger.create({trigger:s,start:"top 72%",once:true,onEnter:()=>{gsap.to(s.querySelector(".small-things-top"),{y:0,opacity:1,duration:.35});gsap.to(s.querySelector(".small-things-intro"),{y:0,opacity:1,duration:.55,delay:.08});gsap.to(a,{y:0,opacity:1,duration:.5,stagger:.12,delay:.15,ease:"power3.out"})}});if(matchMedia("(pointer:fine)").matches){s.addEventListener("pointermove",e=>{const r=s.getBoundingClientRect(),x=e.clientX/r.width-r.left/r.width-.5,y=e.clientY/r.height-r.top/r.height-.5;a.forEach((el,i)=>el.style.transform=`translate(${x*(i+1)*3}px,${y*(i+1)*2}px)`)});s.addEventListener("pointerleave",()=>a.forEach(el=>el.style.transform=""))}}});

