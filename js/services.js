document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".services-hero");
  if(!section) return;

  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stage=section.querySelector("[data-service-stage]");
  const core=section.querySelector("[data-service-core]");
  const title=section.querySelector("[data-service-title]");
  const nodes=[...section.querySelectorAll(".service-node")];
  const coreTitle=section.querySelector("[data-core-title]");
  const coreCopy=section.querySelector("[data-core-copy]");
  const coreStatus=section.querySelector("[data-core-status]");
  const orbitOne=section.querySelector(".service-orbit-one");
  const orbitTwo=section.querySelector(".service-orbit-two");

  const content={
    edit:{
      title:"EVERYDAY<br>MADE EASIER",
      copy:"Curated help for the moments that keep changing.",
      accent:"var(--lime)"
    },
    age:{
      title:"RIGHT STAGE.<br>RIGHT FIT.",
      copy:"A clearer path through changing ages, sizes and routines.",
      accent:"var(--sage)"
    },
    gift:{
      title:"GIVE WITH<br>CONFIDENCE.",
      copy:"Thoughtful guidance when the little recipient matters most.",
      accent:"var(--berry)"
    },
    care:{
      title:"HELP THAT<br>STAYS CLOSE.",
      copy:"Practical support for the questions that arrive after checkout.",
      accent:"var(--lime)"
    }
  };

  const activate=(node,animate=true)=>{
    const item=content[node.dataset.service]||content.edit;
    nodes.forEach(n=>{
      const active=n===node;
      n.classList.toggle("is-active",active);
      n.setAttribute("aria-pressed",active?"true":"false");
    });

    if(!coreTitle||!coreCopy) return;

    if(window.gsap && animate && !reduce){
      gsap.timeline()
        .to([coreTitle,coreCopy],{y:9,opacity:0,duration:.15,ease:"power2.in",overwrite:true})
        .add(()=>{
          coreTitle.innerHTML=item.title;
          coreCopy.textContent=item.copy;
          if(coreStatus) coreStatus.textContent=(node.querySelector("strong")?.textContent || "ACTIVE SERVICE").replace(/\\n/g," ");
          core.style.setProperty("--service-accent",item.accent);
        })
        .to([coreTitle,coreCopy],{y:0,opacity:1,duration:.35,stagger:.035,ease:"power3.out"});
    }else{
      coreTitle.innerHTML=item.title;
      coreCopy.textContent=item.copy;
      if(coreStatus) coreStatus.textContent=(node.querySelector("strong")?.textContent || "ACTIVE SERVICE").replace(/\\n/g," ");
      core.style.setProperty("--service-accent",item.accent);
    }
  };

  nodes.forEach(node=>{
    node.setAttribute("aria-pressed",node.classList.contains("is-active")?"true":"false");
    node.addEventListener("mouseenter",()=>{
      if(window.innerWidth>767) activate(node);
    });
    node.addEventListener("focus",()=>activate(node));
    node.addEventListener("click",()=>activate(node));
  });
  activate(nodes[0],false);

  if(window.gsap){
    if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const introItems=section.querySelectorAll(".services-kicker,.services-index,.services-intro h1,.services-lead,.services-hero-cta,.services-side-note");
    const mapItems=section.querySelectorAll(".service-map-top,.service-node,.service-map-stamp");

    /* Section 1 is the first viewport: never leave its focal UI hidden waiting for scroll. */
    gsap.set(mapItems,{opacity:1,visibility:"visible",y:0});
    gsap.set(core,{opacity:1,visibility:"visible",scale:1,rotation:0,xPercent:-50,yPercent:-50});

    if(!reduce){
      const tl=gsap.timeline({defaults:{ease:"power4.out"}});
      tl.from(introItems,{y:28,opacity:0,duration:.65,stagger:.07})
        .from(mapItems,{y:18,duration:.5,stagger:.05},"-=.35")
        .fromTo(core,{scale:.86,rotation:-4},{scale:1,rotation:0,duration:.8,ease:"back.out(1.35)"},"-=.3");

      gsap.fromTo(orbitOne,
        {scale:.92,opacity:.35,rotation:-8},
        {scale:1,opacity:1,rotation:0,duration:1,ease:"power3.out"}
      );
      gsap.fromTo(orbitTwo,
        {scale:.88,opacity:.25,rotation:12},
        {scale:1,opacity:1,rotation:0,duration:1.1,ease:"power3.out"}
      );
    }

    if(!reduce){
      gsap.to(orbitOne,{rotation:360,duration:30,repeat:-1,ease:"none"});
      gsap.to(orbitTwo,{rotation:-360,duration:22,repeat:-1,ease:"none"});
      const ringA=section.querySelector(".service-core-ring-a");
      const ringB=section.querySelector(".service-core-ring-b");
      if(ringA) gsap.to(ringA,{rotation:360,duration:20,repeat:-1,ease:"none"});
      if(ringB) gsap.to(ringB,{rotation:-360,duration:28,repeat:-1,ease:"none"});
      gsap.to(core.querySelector(".service-core-tick-a"),{scale:1.35,opacity:.55,duration:1.4,repeat:-1,yoyo:true,ease:"sine.inOut"});
      gsap.to(core.querySelector(".service-core-tick-b"),{scale:.7,opacity:.7,duration:1.7,repeat:-1,yoyo:true,ease:"sine.inOut"});

      nodes.forEach((node,index)=>{
        gsap.to(node,{
          y:index%2? -3:3,
          duration:2.8+index*.18,
          repeat:-1,
          yoyo:true,
          ease:"sine.inOut",
          delay:index*.15
        });
      });

      if(stage && window.matchMedia("(pointer:fine)").matches){
        stage.addEventListener("pointermove",e=>{
          const r=stage.getBoundingClientRect();
          const x=(e.clientX-r.left)/r.width-.5;
          const y=(e.clientY-r.top)/r.height-.5;
          gsap.to(core,{x:x*9,y:y*7,rotateY:x*2,rotateX:-y*2,duration:.55,ease:"power2.out",overwrite:true});
          gsap.to(section.querySelector(".service-map-stamp"),{x:x*7,y:y*5,duration:.7,ease:"power2.out",overwrite:true});
        });
        stage.addEventListener("pointerleave",()=>{
          gsap.to(core,{x:0,y:0,rotateY:0,rotateX:0,duration:.65,ease:"power3.out"});
          gsap.to(section.querySelector(".service-map-stamp"),{x:0,y:0,duration:.65,ease:"power3.out"});
        });
      }
    }
  }

  const cta=section.querySelector(".services-hero-cta");
  if(cta && window.gsap && !reduce){
    const icon=cta.querySelector("i");
    cta.addEventListener("mouseenter",()=>{
      gsap.to(cta,{x:4,y:3,duration:.22,ease:"power2.out",overwrite:true});
      gsap.to(icon,{x:5,rotation:-8,duration:.22,ease:"power2.out",overwrite:true});
    });
    cta.addEventListener("mouseleave",()=>{
      gsap.to(cta,{x:0,y:0,duration:.28,ease:"power2.out",overwrite:true});
      gsap.to(icon,{x:0,rotation:0,duration:.25,ease:"power2.out",overwrite:true});
    });
  }
});


/* Services Section 2 — scroll reveal + interactive route */
document.addEventListener("DOMContentLoaded",()=>{
  const route=document.querySelector(".service-route");
  if(!route) return;

  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals=route.querySelectorAll("[data-route-reveal]");
  const steps=[...route.querySelectorAll("[data-route-step]")];
  const fill=route.querySelector(".route-line-fill");
  const dots=[...route.querySelectorAll(".route-dot")];

  if(window.gsap){
    if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    if(window.ScrollTrigger && !reduce){
      gsap.set(reveals,{y:30,opacity:0});
      gsap.set(steps,{x:38,opacity:0});
      gsap.set(dots,{scale:.5});

      const intro=gsap.timeline({
        scrollTrigger:{trigger:route,start:"top 68%",once:true}
      });
      intro.to(reveals,{y:0,opacity:1,duration:.65,stagger:.08,ease:"power4.out"})
           .to(steps,{x:0,opacity:1,duration:.65,stagger:.16,ease:"power4.out"},"-=.3")
           .to(dots,{scale:1,duration:.4,stagger:.12,ease:"back.out(2)"},"-=.45");

      gsap.to(fill,{
        height:"100%",
        ease:"none",
        scrollTrigger:{
          trigger:route,
          start:"top 55%",
          end:"bottom 68%",
          scrub:.7
        }
      });
    }else{
      gsap.set(reveals,{y:0,opacity:1});
      gsap.set(steps,{x:0,opacity:1});
      gsap.set(dots,{scale:1});
      if(fill) gsap.set(fill,{height:"100%"});
    }
  }

  const setActive=(step)=>{
    steps.forEach(s=>s.classList.toggle("is-active",s===step));
  };
  steps.forEach(step=>{
    step.addEventListener("mouseenter",()=>setActive(step));
    step.addEventListener("focus",()=>setActive(step));
    step.addEventListener("click",()=>setActive(step));
  });
  if(steps[0]) setActive(steps[0]);
});



/* Services Section 3 — layered editorial motion */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".service-showcase");
  if(!section || !window.gsap) return;

  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const eyebrow=section.querySelector(".showcase-eyebrow");
  const titleLines=[...section.querySelectorAll(".showcase-title-line")];
  const lead=section.querySelector(".showcase-lead");
  const cards=[...section.querySelectorAll(".showcase-card")];
  const note=section.querySelector(".showcase-note");
  const footer=section.querySelector(".showcase-footer");
  const check=section.querySelector(".symbol-check");
  const steps=section.querySelector(".symbol-steps");
  const gift=section.querySelector(".showcase-gift-mark");
  const noteMark=section.querySelector(".showcase-note-mark");

  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  if(reduce || !window.ScrollTrigger){
    gsap.set([eyebrow,...titleLines,lead,...cards,note,footer],{clearProps:"all"});
    return;
  }

  gsap.set(eyebrow,{y:18,opacity:0});
  gsap.set(titleLines,{yPercent:105,opacity:0});
  gsap.set(lead,{y:22,opacity:0});
  gsap.set(cards,{y:58,opacity:0});
  gsap.set(note,{y:30,opacity:0});
  gsap.set(footer,{opacity:0});

  if(check) gsap.set(check,{scale:.72,rotation:-18,opacity:0});
  if(steps) gsap.set(steps.children,{y:18,opacity:0});
  if(gift) gsap.set(gift,{scale:.72,rotation:-24,opacity:0});
  if(noteMark) gsap.set(noteMark,{scale:.7,rotation:-20,opacity:0});

  const tl=gsap.timeline({paused:true});
  tl.to(eyebrow,{y:0,opacity:1,duration:.45,ease:"power4.out"})
    .to(titleLines,{yPercent:0,opacity:1,duration:.72,stagger:.12,ease:"power4.out"},"-=.18")
    .to(lead,{y:0,opacity:1,duration:.5,ease:"power3.out"},"-=.42")
    .to(cards,{y:0,opacity:1,duration:.7,stagger:.13,ease:"power3.out"},"-=.25")
    .to(note,{y:0,opacity:1,duration:.5,ease:"power3.out"},"-=.25")
    .to(noteMark,{scale:1,rotation:0,opacity:1,duration:.5,ease:"back.out(1.8)"},"-=.28")
    .to(footer,{opacity:1,duration:.4},"-=.2");

  if(check) tl.to(check,{scale:1,rotation:0,opacity:1,duration:.6,ease:"back.out(1.7)"},"-=1.5");
  if(steps) tl.to(steps.children,{y:0,opacity:1,duration:.35,stagger:.08,ease:"back.out(1.5)"},"-=1.5");
  if(gift) tl.to(gift,{scale:1,rotation:0,opacity:1,duration:.6,ease:"back.out(1.7)"},"-=1.5");

  ScrollTrigger.create({
    trigger:section,
    start:"top 72%",
    once:true,
    onEnter:()=>tl.play()
  });

  // Decorative marks only; no content movement.
  if(check) gsap.to(check,{rotation:360,duration:16,repeat:-1,ease:"none",delay:1.8});
  if(gift) gsap.to(gift,{rotation:360,duration:20,repeat:-1,ease:"none",delay:2});
  if(steps) gsap.to(steps,{y:-3,duration:2.2,repeat:-1,yoyo:true,ease:"sine.inOut",delay:2});

  // Stable hover lift only.
  cards.forEach(card=>{
    card.addEventListener("pointerenter",()=>{
      gsap.to(card,{y:-8,duration:.28,ease:"power3.out",overwrite:"auto"});
    });
    card.addEventListener("pointerleave",()=>{
      gsap.to(card,{y:0,duration:.32,ease:"power3.out",overwrite:"auto"});
    });
  });
});






/* Services Section 4 — refined editorial decision note motion */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".service-decision-note");
  if(!section || !window.gsap) return;

  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const intro=section.querySelector("[data-decision-intro]");
  const paper=section.querySelector("[data-decision-paper]");
  const stamp=section.querySelector(".paper-stamp");
  const heading=section.querySelector(".paper-heading");
  const lines=[...section.querySelectorAll("[data-decision-line]")];
  const side=section.querySelector("[data-decision-side]");

  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  if(reduce || !window.ScrollTrigger){
    gsap.set([intro,paper,stamp,heading,...lines,side],{clearProps:"all"});
    return;
  }

  gsap.set(intro,{x:-28,opacity:0});
  gsap.set(paper,{x:42,opacity:0});
  gsap.set(stamp,{scale:.7,rotation:-20,opacity:0});
  gsap.set(heading,{y:22,opacity:0});
  gsap.set(lines,{x:18,opacity:0});
  gsap.set(side,{x:14,opacity:0});

  const tl=gsap.timeline({paused:true});
  tl.to(intro,{x:0,opacity:1,duration:.58,ease:"power4.out"})
    .to(paper,{x:0,opacity:1,duration:.68,ease:"power3.out"},"-=.28")
    .to(stamp,{scale:1,rotation:-8,opacity:1,duration:.5,ease:"back.out(1.65)"},"-=.3")
    .to(heading,{y:0,opacity:1,duration:.46,ease:"power3.out"},"-=.34")
    .to(lines,{x:0,opacity:1,duration:.38,stagger:.1,ease:"power3.out"},"-=.22")
    .to(side,{x:0,opacity:1,duration:.4,ease:"power3.out"},"-=.16");

  ScrollTrigger.create({
    trigger:section,
    start:"top 72%",
    once:true,
    onEnter:()=>tl.play()
  });

  // Tiny tactile stamp movement only; the paper itself remains still.
  gsap.to(stamp,{
    rotation:-5,
    duration:3.6,
    repeat:-1,
    yoyo:true,
    ease:"sine.inOut",
    delay:2
  });
});


/* Services Section 6 — three useful moments motion */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".service-useful-moments");
  if(!section || !window.gsap) return;
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const intro=section.querySelector("[data-moments-intro]");
  const path=section.querySelector("[data-moments-path]");
  const items=[...section.querySelectorAll("[data-moment]")];
  const footer=section.querySelector("[data-moments-footer]");

  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  if(reduce || !window.ScrollTrigger){
    gsap.set([intro,path,...items,footer],{clearProps:"all"});
    return;
  }

  gsap.set(intro,{y:30,opacity:0});
  gsap.set(path,{opacity:0});
  gsap.set(items,{x:-30,opacity:0});
  gsap.set(footer,{y:14,opacity:0});

  const tl=gsap.timeline({paused:true});
  tl.to(intro,{y:0,opacity:1,duration:.58,ease:"power4.out"})
    .to(path,{opacity:1,duration:.3},"-=.2")
    .to(items,{x:0,opacity:1,duration:.48,stagger:.13,ease:"power3.out"},"-=.16")
    .to(footer,{y:0,opacity:1,duration:.4,ease:"power3.out"},"-=.15");

  ScrollTrigger.create({
    trigger:section,start:"top 72%",once:true,onEnter:()=>tl.play()
  });
});

/* Services Section 5 — quiet hand interaction */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".service-quiet-hand");
  if(!section || !window.gsap) return;

  const reduce=window.matchMedia("(prefers-reduced-motion, reduce)").matches;
  const top=section.querySelector("[data-quiet-top]");
  const intro=section.querySelector("[data-quiet-intro]");
  const stage=section.querySelector("[data-quiet-stage]");
  const question=section.querySelector("[data-quiet-question]");
  const actions=[...section.querySelectorAll("[data-quiet-choice]")];
  const response=section.querySelector("[data-quiet-response]");
  const footer=section.querySelector("[data-quiet-footer]");

  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  if(reduce || !window.ScrollTrigger){
    gsap.set([top,intro,stage,question,...actions,response,footer],{clearProps:"all"});
  }else{
    gsap.set(top,{y:15,opacity:0});
    gsap.set(intro,{y:35,opacity:0});
    gsap.set(stage,{y:40,opacity:0});
    gsap.set(question,{x:-25,opacity:0});
    gsap.set(actions,{x:28,opacity:0});
    gsap.set(response,{y:12,opacity:0});
    gsap.set(footer,{y:12,opacity:0});

    const tl=gsap.timeline({paused:true});
    tl.to(top,{y:0,opacity:1,duration:.35,ease:"power3.out"})
      .to(intro,{y:0,opacity:1,duration:.58,ease:"power4.out"},"-=.12")
      .to(stage,{y:0,opacity:1,duration:.6,ease:"power3.out"},"-=.25")
      .to(question,{x:0,opacity:1,duration:.48,ease:"power3.out"},"-=.32")
      .to(actions,{x:0,opacity:1,duration:.42,stagger:.1,ease:"power3.out"},"-=.22")
      .to(response,{y:0,opacity:1,duration:.35,ease:"power3.out"},"-=.15")
      .to(footer,{y:0,opacity:1,duration:.35,ease:"power3.out"},"-=.15");

    ScrollTrigger.create({
      trigger:section,
      start:"top 72%",
      once:true,
      onEnter:()=>tl.play()
    });
  }

  const copy={
    fit:["01 / THE NEXT USEFUL STEP","Start with age, stage and what the day actually needs."],
    gift:["02 / THE NEXT USEFUL STEP","Start with who it is for and the moment you want to make."],
    after:["03 / THE NEXT USEFUL STEP","Start with the order, delivery or question that needs clarity."]
  };

  actions.forEach(action=>{
    action.addEventListener("click",()=>{
      actions.forEach(item=>item.classList.remove("is-active"));
      action.classList.add("is-active");
      const value=copy[action.dataset.quietChoice];
      if(!value || !response) return;

      const label=response.querySelector("span");
      const text=response.querySelector("strong");

      if(window.gsap && !reduce){
        gsap.to(response,{y:5,opacity:.25,duration:.12,onComplete:()=>{
          label.textContent=value[0];
          text.textContent=value[1];
          gsap.to(response,{y:0,opacity:1,duration:.28,ease:"power2.out"});
        }});
      }else{
        label.textContent=value[0];
        text.textContent=value[1];
      }
    });
  });
});
