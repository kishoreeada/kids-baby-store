AOS.init({once:true,offset:60,duration:850,easing:"ease-out-cubic"});
const body=document.body, header=document.getElementById("siteHeader");
if(header) window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>35),{passive:true});

const menu=document.querySelector(".mobile-menu"), menuToggle=document.querySelector(".menu-toggle"), menuClose=document.querySelector(".menu-close");
function setMenu(open){
  if(!menu || !menuToggle) return;
  menu.classList.toggle("open",open);
  menu.setAttribute("aria-hidden",String(!open));
  menuToggle.setAttribute("aria-expanded",String(open));
  body.classList.toggle("menu-open",open);
}
if(menuToggle) menuToggle.addEventListener("click",()=>setMenu(true));
if(menuClose) menuClose.addEventListener("click",()=>setMenu(false));
document.querySelectorAll(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));


/* V66 — Canonical page navigation. Real pages navigate normally; same-page hashes scroll only when explicitly used. */
(() => {
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const normalize = (href) => {
    if (!href) return "";
    const clean = href.split("#")[0].split("?")[0];
    return (clean || "index.html").replace(/^\.\//, "").toLowerCase();
  };
  const allLinks = document.querySelectorAll(".desktop-nav a, .mobile-menu nav a, .footer-main-nav a");
  allLinks.forEach(link => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#") && normalize(href) === current) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
    if (href.startsWith("#")) {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({behavior:"smooth", block:"start"});
        }
      });
    }
  });
})();

if(window.gsap){
  const tl=gsap.timeline({defaults:{ease:"power4.out"}});
  tl.from(".hero h1",{y:70,opacity:0,duration:1.05,delay:.15})
    .from(".hero-copy>p",{y:25,opacity:0,duration:.65},"-=.55")
    .from(".hero-actions",{y:20,opacity:0,duration:.6},"-=.4")
    .from(".hero-perks",{y:18,opacity:0,duration:.6},"-=.35")
    .from(".age-badge",{scale:.65,rotation:-12,opacity:0,duration:.7},"-=.55")
    .from(".scribble",{x:25,opacity:0,duration:.6},"-=.45");
  gsap.to(".age-badge",{y:-9,rotation:10,duration:2.3,repeat:-1,yoyo:true,ease:"sine.inOut"});
  gsap.to(".scribble",{y:7,duration:2.8,repeat:-1,yoyo:true,ease:"sine.inOut"});
  gsap.to(".hero-photo img",{scale:1.035,duration:8,repeat:-1,yoyo:true,ease:"sine.inOut"});
}
// CTA contract: unfinished/product-detail actions intentionally resolve to the custom 404 page.
document.querySelectorAll(".cta-404").forEach((cta)=>{
  cta.addEventListener("click",(event)=>{
    // Keep the navigation deterministic even if future markup changes the href.
    if(cta.getAttribute("href") !== "404.html"){
      event.preventDefault();
      window.location.href = "404.html";
    }
  });
});

if(window.gsap){
  document.querySelectorAll(".journey-card").forEach((card,index)=>{
    card.style.opacity="0"; card.style.transform="translateY(40px)";
    const observer=new IntersectionObserver((entries,obs)=>{
      if(entries[0].isIntersecting){
        gsap.to(card,{y:0,opacity:1,duration:.8,delay:index*.12,ease:"power4.out"});
        obs.disconnect();
      }
    },{threshold:.12});
    observer.observe(card);
  });
}

// Section 2 reveal: staged, image-led commerce entrance.
document.querySelectorAll(".age-panel").forEach((card,index)=>{
  card.style.opacity="0";
  card.style.transform="translateY(35px)";
  const observer=new IntersectionObserver((entries,obs)=>{
    if(entries[0].isIntersecting){
      gsap.to(card,{opacity:1,y:0,duration:.75,delay:index*.1,ease:"power3.out"});
      obs.disconnect();
    }
  },{threshold:.12});
  observer.observe(card);
});



/* =========================================================
   SECTION 3 — GSAP + AOS MOTION SYSTEM
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      disable: "mobile"
    });
  }

  if (!window.gsap) return;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const canvas = document.querySelector(".day-canvas");
  const statement = document.querySelector(".day-statement");
  const spine = document.querySelector(".spine-line");
  const moments = gsap.utils.toArray(".day-moment");
  const orbits = gsap.utils.toArray(".day-orbit");
  const dots = gsap.utils.toArray(".spine-dot");
  const cta = document.querySelector(".day-cta");

  /* Central statement: subtle scale + opacity entrance. */
  if (statement) {
    gsap.fromTo(statement,
      { scale: 0.82, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: canvas ? {
          trigger: canvas,
          start: "top 72%",
          once: true
        } : undefined
      }
    );
  }

  /* Time spine draws itself while the section enters. */
  if (spine) {
    gsap.set(spine, { transformOrigin: "top center", scaleY: 0 });
    gsap.to(spine, {
      scaleY: 1,
      duration: 1.35,
      ease: "power2.inOut",
      scrollTrigger: canvas ? {
        trigger: canvas,
        start: "top 70%",
        once: true
      } : undefined
    });
  }

  /* Four moments slide in from alternating sides. */
  moments.forEach((moment, index) => {
    const fromX = index % 2 === 0 ? -55 : 55;
    gsap.fromTo(moment,
      { x: fromX, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: canvas ? {
          trigger: canvas,
          start: "top 68%",
          once: true
        } : undefined
      }
    );
  });

  /* Timeline dots pulse independently. */
  dots.forEach((dot, index) => {
    gsap.fromTo(dot,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        delay: 0.35 + index * 0.18,
        ease: "back.out(1.7)",
        scrollTrigger: canvas ? {
          trigger: canvas,
          start: "top 70%",
          once: true
        } : undefined
      }
    );

    gsap.to(dot, {
      scale: 1.35,
      opacity: 0.55,
      duration: 1.1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.8 + index * 0.15
    });
  });

  /* Decorative orbits rotate slowly for depth. */
  orbits.forEach((orbit, index) => {
    gsap.to(orbit, {
      rotation: index % 2 ? -360 : 360,
      duration: 28 + index * 8,
      repeat: -1,
      ease: "none"
    });
  });

  /* CTA hover uses GSAP for a tactile response. */
  if (cta) {
    const arrow = cta.querySelector("i");
    cta.addEventListener("mouseenter", () => {
      gsap.to(cta, { y: -3, duration: 0.22, ease: "power2.out" });
      if (arrow) gsap.to(arrow, { x: 5, duration: 0.22, ease: "power2.out" });
    });
    cta.addEventListener("mouseleave", () => {
      gsap.to(cta, { y: 0, duration: 0.28, ease: "power2.out" });
      if (arrow) gsap.to(arrow, { x: 0, duration: 0.28, ease: "power2.out" });
    });
  }

  /* Gentle pointer depth on the canvas, disabled on touch devices. */
  if (canvas && window.matchMedia("(pointer:fine)").matches) {
    const statementEl = canvas.querySelector(".day-statement");
    const momentsEl = canvas.querySelectorAll(".day-moment");

    canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(statementEl, { xPercent: -50, yPercent: -50, x: x * 12, y: y * 10, duration: 0.55, overwrite: true });
      gsap.to(momentsEl, {
        x: (i) => x * (i % 2 ? -9 : 9),
        y: y * 5,
        duration: 0.7,
        overwrite: true,
        stagger: 0.015
      });
    });

    canvas.addEventListener("mouseleave", () => {
      gsap.to(statementEl, { xPercent: -50, yPercent: -50, x: 0, y: 0, duration: 0.7 });
      gsap.to(momentsEl, { x: 0, y: 0, duration: 0.7, stagger: 0.02 });
    });
  }
});

/* =========================================================
   SECTION 4 — GSAP + AOS MOTION
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const edit = document.querySelector(".the-edit");
  if (!edit) return;

  if (window.AOS) {
    AOS.refreshHard();
  }

  if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const stage = edit.querySelector(".edit-stage");
  const center = edit.querySelector(".edit-center");
  const words = gsap.utils.toArray(".edit-stage-word", edit);
  const details = gsap.utils.toArray(".edit-detail", edit);
  const sparks = gsap.utils.toArray(".edit-spark", edit);

  if (stage) {
    gsap.fromTo(center,
      {scale:.72, opacity:0, rotation:-8},
      {
        scale:1, opacity:1, rotation:0, duration:1.15, ease:"back.out(1.4)",
        scrollTrigger:{trigger:stage,start:"top 72%",once:true}
      }
    );

    gsap.fromTo(words,
      {opacity:0, y:35},
      {
        opacity:.9, y:0, duration:.85, stagger:.12, ease:"power3.out",
        scrollTrigger:{trigger:stage,start:"top 75%",once:true}
      }
    );

    gsap.fromTo(details,
      {opacity:0, x:(i)=>i%2===0?-45:45},
      {
        opacity:1, x:0, duration:.8, stagger:.14, ease:"power3.out",
        scrollTrigger:{trigger:stage,start:"top 70%",once:true}
      }
    );

    gsap.fromTo(sparks,
      {scale:0, opacity:0, rotation:-45},
      {
        scale:1, opacity:1, rotation:0, duration:.6, stagger:.1, ease:"back.out(2)",
        scrollTrigger:{trigger:stage,start:"top 72%",once:true}
      }
    );

    gsap.to(center.querySelector(".disc-back"),{
      rotation:352, duration:24, repeat:-1, ease:"none"
    });

    sparks.forEach((spark,index)=>{
      gsap.to(spark,{
        y:index%2? -9:9,
        duration:1.7+index*.2,
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut"
      });
    });
  }

  edit.querySelectorAll(".edit-action").forEach(action=>{
    const arrow=action.querySelector("i");
    action.addEventListener("mouseenter",()=>{
      gsap.to(action,{y:-4,duration:.22,ease:"power2.out"});
      if(arrow) gsap.to(arrow,{x:5,duration:.22,ease:"power2.out"});
    });
    action.addEventListener("mouseleave",()=>{
      gsap.to(action,{y:0,duration:.25,ease:"power2.out"});
      if(arrow) gsap.to(arrow,{x:0,duration:.25,ease:"power2.out"});
    });
  });

  if (stage && window.matchMedia("(pointer:fine)").matches) {
    const moving=[...words,...details,sparks[0],sparks[1],sparks[2]].filter(Boolean);
    stage.addEventListener("mousemove",(e)=>{
      const r=stage.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      gsap.to(center,{x:x*10,y:y*8,duration:.65,overwrite:true});
      moving.forEach((el,i)=>{
        gsap.to(el,{x:x*(i%2?8:-8),y:y*(i%3?5:-5),duration:.7,overwrite:true});
      });
    });
    stage.addEventListener("mouseleave",()=>{
      gsap.to(center,{x:0,y:0,duration:.65});
      moving.forEach(el=>gsap.to(el,{x:0,y:0,duration:.65}));
    });
  }
});

/* =========================================================
   V15 — SECTION 4 MOTION
   ========================================================= */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".parent-promise");
  if(!section) return;
  if(window.AOS) AOS.refreshHard();
  if(!window.gsap) return;
  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const manifesto=section.querySelector(".promise-manifesto");
  const rows=gsap.utils.toArray(".promise-row",section);
  const cta=section.querySelector(".promise-cta");

  if(manifesto){
    gsap.fromTo(manifesto,{opacity:0,x:-45},{opacity:1,x:0,duration:.85,ease:"power3.out",
      scrollTrigger:{trigger:section,start:"top 72%",once:true}});
  }
  gsap.fromTo(rows,{opacity:0,x:45},{opacity:1,x:0,duration:.72,stagger:.12,ease:"power3.out",
    scrollTrigger:{trigger:section,start:"top 68%",once:true}});

  rows.forEach(row=>{
    const arrow=row.querySelector("i");
    row.addEventListener("mouseenter",()=>{
      if(arrow) gsap.to(arrow,{rotation:45,duration:.3,ease:"power2.out"});
    });
    row.addEventListener("mouseleave",()=>{
      if(arrow) gsap.to(arrow,{rotation:0,duration:.3,ease:"power2.out"});
    });
  });

  if(cta){
    const arrow=cta.querySelector("i");
    cta.addEventListener("mouseenter",()=>{
      gsap.to(cta,{y:-3,duration:.22,ease:"power2.out"});
      if(arrow) gsap.to(arrow,{x:5,duration:.22,ease:"power2.out"});
    });
    cta.addEventListener("mouseleave",()=>{
      gsap.to(cta,{y:0,duration:.25,ease:"power2.out"});
      if(arrow) gsap.to(arrow,{x:0,duration:.25,ease:"power2.out"});
    });
  }
});

/* =========================================================
   SECTION 4 — VISUAL QA MOTION
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".parent-promise");
  if (!section || !window.gsap) return;

  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const rows = gsap.utils.toArray(".promise-row", section);
  const manifesto = section.querySelector(".promise-manifesto");
  const cta = section.querySelector(".promise-cta");

  rows.forEach((row,index)=>{
    gsap.fromTo(row,
      {opacity:0, x:24},
      {
        opacity:1, x:0, duration:.65, delay:index*.07, ease:"power3.out",
        scrollTrigger:{trigger:row,start:"top 86%",once:true}
      }
    );

    const arrow=row.querySelector("i");
    row.addEventListener("mouseenter",()=>{
      if (arrow) gsap.to(arrow,{rotation:45,scale:1.08,duration:.25,ease:"power2.out"});
    });
    row.addEventListener("mouseleave",()=>{
      if (arrow) gsap.to(arrow,{rotation:0,scale:1,duration:.25,ease:"power2.out"});
    });
  });

  if (manifesto) {
    gsap.fromTo(manifesto,
      {opacity:0, y:24},
      {opacity:1,y:0,duration:.8,ease:"power3.out",
       scrollTrigger:{trigger:manifesto,start:"top 82%",once:true}}
    );
  }

  if (cta) {
    const arrow=cta.querySelector("i");
    cta.addEventListener("mouseenter",()=>{
      gsap.to(cta,{x:3,y:2,duration:.2,ease:"power2.out"});
      if(arrow) gsap.to(arrow,{x:5,duration:.2,ease:"power2.out"});
    });
    cta.addEventListener("mouseleave",()=>{
      gsap.to(cta,{x:0,y:0,duration:.25,ease:"power2.out"});
      if(arrow) gsap.to(arrow,{x:0,duration:.25,ease:"power2.out"});
    });
  }
});

/* =========================================================
   SECTION 6 — THE EVERYDAY MOMENTS MOTION
   ========================================================= */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".moment-edit");
  if(!section || !window.gsap) return;
  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const intro=section.querySelector(".moment-intro");
  const items=gsap.utils.toArray(".moment-item",section);
  if(intro) gsap.fromTo(intro,{opacity:0,x:-28},{opacity:1,x:0,duration:.85,ease:"power3.out",scrollTrigger:{trigger:section,start:"top 78%",once:true}});
  gsap.fromTo(items,{opacity:0,x:28},{opacity:1,x:0,duration:.65,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:section,start:"top 68%",once:true}});
  if(window.matchMedia("(pointer:fine)").matches){
    items.forEach(item=>{
      const mark=item.querySelector(".moment-mark");
      item.addEventListener("mousemove",e=>{
        const r=item.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        if(mark) gsap.to(mark,{x:x*5,duration:.35,overwrite:true});
      });
      item.addEventListener("mouseleave",()=>{if(mark) gsap.to(mark,{x:0,duration:.35,overwrite:true})});
    });
  }
});

/* =========================================================
   SECTION 7 — THE LITTLE JOURNAL MOTION
   ========================================================= */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".journal-field");
  if(!section || !window.gsap) return;
  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const copy=section.querySelector(".journal-hero-copy");
  const feature=section.querySelector(".journal-feature");
  const rail=gsap.utils.toArray(".journal-rail-item",section);
  if(copy) gsap.fromTo(copy,{opacity:0,y:28},{opacity:1,y:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:section,start:"top 76%",once:true}});
  if(feature) gsap.fromTo(feature,{opacity:0,y:32,scale:.985},{opacity:1,y:0,scale:1,duration:.9,ease:"power3.out",scrollTrigger:{trigger:feature,start:"top 82%",once:true}});
  gsap.fromTo(rail,{opacity:0,x:22},{opacity:1,x:0,duration:.55,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:section,start:"top 58%",once:true}});
  if(window.matchMedia("(pointer:fine)").matches && feature){
    feature.addEventListener("mousemove",e=>{const r=feature.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;gsap.to(feature,{rotationY:x*1.2,rotationX:-y*1.2,transformPerspective:900,duration:.5,overwrite:true});});
    feature.addEventListener("mouseleave",()=>gsap.to(feature,{rotationY:0,rotationX:0,duration:.5,overwrite:true}));
  }
});


/* =========================================================
   SECTION 8 — CLOSING NOTE MOTION
   Controlled reveal + subtle stage movement.
   ========================================================= */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".closing-section");
  if(!section || !window.gsap) return;
  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const copy=section.querySelector(".closing-copy");
  const stage=section.querySelector(".closing-stage");
  const panel=section.querySelector(".closing-panel");
  const letter=section.querySelector(".closing-letter");
  const cta=section.querySelector(".closing-cta");
  const trigger={trigger:section,start:"top 72%",once:true};
  if(copy) gsap.fromTo(copy,{opacity:0,x:-34},{opacity:1,x:0,duration:.9,ease:"power3.out",scrollTrigger:trigger});
  if(stage) gsap.fromTo(stage,{opacity:0,x:35},{opacity:1,x:0,duration:1,ease:"power3.out",delay:.12,scrollTrigger:trigger});
  if(panel) gsap.fromTo(panel,{rotation:-9,y:25},{rotation:-4,y:0,duration:1,ease:"power3.out",delay:.2,scrollTrigger:trigger});
  if(letter) gsap.fromTo(letter,{opacity:0,x:45},{opacity:1,x:0,duration:1.15,ease:"power3.out",delay:.15,scrollTrigger:trigger});
  if(window.matchMedia("(pointer:fine)").matches && stage){
    stage.addEventListener("mousemove",e=>{
      const r=stage.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      if(panel) gsap.to(panel,{x:x*10,y:y*7,duration:.55,ease:"power2.out",overwrite:true});
      if(letter) gsap.to(letter,{x:x*-12,y:y*-6,duration:.8,ease:"power2.out",overwrite:true});
    });
    stage.addEventListener("mouseleave",()=>{
      if(panel) gsap.to(panel,{x:0,y:0,duration:.6,ease:"power2.out"});
      if(letter) gsap.to(letter,{x:0,y:0,duration:.7,ease:"power2.out"});
    });
  }
  if(cta){
    const icon=cta.querySelector("i");
    cta.addEventListener("mouseenter",()=>{if(icon) gsap.to(icon,{x:6,duration:.2});});
    cta.addEventListener("mouseleave",()=>{if(icon) gsap.to(icon,{x:0,duration:.2});});
  }
});



/* =========================================================
   SECTION 5 — EVERYDAY EDIT MOTION
   ========================================================= */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".everyday-edit");
  if(!section || !window.gsap) return;
  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const intro=section.querySelector(".everyday-intro");
  const categories=gsap.utils.toArray(".everyday-category",section);
  const icons=gsap.utils.toArray(".everyday-icon",section);
  const trigger={trigger:section,start:"top 76%",once:true};
  if(intro) gsap.fromTo(intro,{opacity:0,y:28},{opacity:1,y:0,duration:.8,ease:"power3.out",scrollTrigger:trigger});
  gsap.fromTo(categories,{opacity:0,y:30},{opacity:1,y:0,duration:.65,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:section,start:"top 60%",once:true}});
  if(window.matchMedia("(pointer:fine)").matches){
    categories.forEach((category,index)=>{
      const icon=icons[index];
      category.addEventListener("mouseenter",()=>{if(icon) gsap.to(icon,{rotation:-8,scale:1.08,duration:.35,ease:"power2.out"});});
      category.addEventListener("mouseleave",()=>{if(icon) gsap.to(icon,{rotation:0,scale:1,duration:.4,ease:"power2.out"});});
    });
  }
});

/* V66 — FOOTER: canonical page state + newsletter validation. */
document.addEventListener("DOMContentLoaded",()=>{
  const footer=document.querySelector(".site-footer");
  if(!footer) return;
  const current=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  footer.querySelectorAll(".footer-nav-link").forEach(link=>{
    const href=(link.getAttribute("href")||"").split("#")[0].split("?")[0].replace(/^\.\//,"").toLowerCase()||"index.html";
    const active=href===current;
    link.classList.toggle("active",active);
    if(active) link.setAttribute("aria-current","page");
    else link.removeAttribute("aria-current");
  });

  const form=document.getElementById("footerNewsletter");
  const email=document.getElementById("footerEmail");
  const error=document.getElementById("footerEmailError");
  if(form && email && error){
    const showError=(message)=>{error.textContent=message;email.setAttribute("aria-invalid","true");email.classList.add("is-invalid");};
    const clearError=()=>{error.textContent="";email.removeAttribute("aria-invalid");email.classList.remove("is-invalid");};
    email.addEventListener("input",clearError);
    form.addEventListener("submit",event=>{
      event.preventDefault();
      const value=email.value.trim();
      const valid=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      if(!value){showError("Please enter your email address.");email.focus();return;}
      if(!valid){showError("Please enter a valid email address.");email.focus();return;}
      clearError();
      window.location.href="404.html";
    });
  }
});

/* V55 — ABOUT SECTION 2 MOTION */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".about-standard");
  if(!section || !window.gsap) return;
  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const intro=section.querySelector(".standard-intro");
  const board=section.querySelector(".standard-board");
  const rows=gsap.utils.toArray(".standard-row",section);
  const progress=section.querySelector(".standard-progress span");
  const orbitL=section.querySelector(".orbit-left");
  const orbitR=section.querySelector(".orbit-right");
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){gsap.set([intro,board,...rows],{clearProps:"all"});return;}
  const tl=gsap.timeline({scrollTrigger:{trigger:section,start:"top 72%",once:true}});
  tl.fromTo(intro,{opacity:0,x:-55},{opacity:1,x:0,duration:.8,ease:"power3.out"})
    .fromTo(board,{opacity:0,x:55,scale:.97},{opacity:1,x:0,scale:1,duration:.85,ease:"power3.out"},"-=.55")
    .fromTo(rows,{opacity:0,y:28},{opacity:1,y:0,duration:.55,stagger:.12,ease:"power2.out"},"-=.45")
    .fromTo(progress,{scaleX:0},{scaleX:1,duration:1.2,ease:"power2.out"},"-=.35");
  gsap.to(orbitL,{rotation:360,duration:34,repeat:-1,ease:"none"});
  gsap.to(orbitR,{rotation:-360,duration:46,repeat:-1,ease:"none"});
  rows.forEach((row,index)=>{
    const icon=row.querySelector(".standard-icon");
    row.addEventListener("mouseenter",()=>{
      rows.forEach(r=>r.classList.remove("is-active"));
      row.classList.add("is-active");
      if(icon) gsap.to(icon,{rotation:-7,scale:1.08,duration:.25,ease:"power2.out"});
    });
    row.addEventListener("mouseleave",()=>{if(icon) gsap.to(icon,{rotation:0,scale:1,duration:.3,ease:"power2.out"});});
    row.addEventListener("focus",()=>row.classList.add("is-active"));
    row.addEventListener("blur",()=>{if(!row.matches(":hover") && index!==0) row.classList.remove("is-active")});
  });
  const sig=section.querySelector(".standard-signature i");
  if(sig){gsap.to(sig,{x:5,duration:.9,repeat:-1,yoyo:true,ease:"sine.inOut"});}
});

/* V84 — BLOG SECTION 6 MOTION: closing manifesto reveal + scroll choreography. */
document.addEventListener("DOMContentLoaded",()=>{
  const section=document.querySelector(".blog-final-v2");
  if(!section || !window.gsap) return;
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const field=section.querySelector(".final-v2-field");
  const ghost=section.querySelector(".final-v2-ghost");
  const side=section.querySelector(".final-v2-side-label");
  const kicker=section.querySelector(".final-v2-kicker");
  const title=section.querySelector("#finalV2Title");
  const titleLines=title ? Array.from(title.children) : [];
  const message=section.querySelector(".final-v2-message");
  const principles=gsap.utils.toArray(".final-v2-principle",section);
  const endmark=section.querySelector(".final-v2-endmark");
  const rule=section.querySelector(".final-v2-rule");
  const cta=section.querySelector(".final-v2-cta");

  if(reduce){
    gsap.set([kicker,...titleLines,message,...principles,endmark,side],{clearProps:"all"});
    if(rule) gsap.set(rule,{scaleX:1});
    return;
  }

  /* Initial states are deliberately applied by GSAP so the section remains
     fully readable if JavaScript/GSAP is unavailable. */
  gsap.set(kicker,{opacity:0,y:22});
  gsap.set(titleLines,{opacity:0,y:90,clipPath:"inset(100% 0 0 0)"});
  gsap.set(message,{opacity:0,x:55});
  gsap.set(principles,{opacity:0,y:34});
  gsap.set(endmark,{opacity:0,x:28});
  if(side) gsap.set(side,{opacity:0,y:20});
  if(rule) gsap.set(rule,{scaleX:0,transformOrigin:"left center"});

  const reveal=()=>{
    const tl=gsap.timeline({defaults:{ease:"power4.out"}});
    if(rule) tl.to(rule,{scaleX:1,duration:.8,ease:"power2.out"},0);
    if(side) tl.to(side,{opacity:1,y:0,duration:.5,ease:"power3.out"},.08);
    tl.to(kicker,{opacity:1,y:0,duration:.55},.12)
      .to(titleLines[0],{opacity:1,y:0,clipPath:"inset(0% 0 0 0)",duration:.8},.22)
      .to(titleLines[1],{opacity:1,y:0,clipPath:"inset(0% 0 0 0)",duration:.8},.36)
      .to(titleLines[2],{opacity:1,y:0,clipPath:"inset(0% 0 0 0)",duration:.9},.50)
      .to(message,{opacity:1,x:0,duration:.7},.48)
      .to(principles,{opacity:1,y:0,duration:.55,stagger:.12,ease:"power3.out"},.72)
      .to(endmark,{opacity:1,x:0,duration:.55,ease:"back.out(1.4)"},1.05);
  };

  if(window.ScrollTrigger){
    ScrollTrigger.create({trigger:section,start:"top 78%",once:true,onEnter:reveal});

    if(field && ghost){
      gsap.to(ghost,{xPercent:8,ease:"none",scrollTrigger:{trigger:field,start:"top bottom",end:"bottom top",scrub:1.3}});
    }
    if(field && title){
      gsap.to(title,{y:-18,ease:"none",scrollTrigger:{trigger:field,start:"top bottom",end:"bottom top",scrub:1}});
    }
    if(message){
      gsap.to(message,{y:-12,ease:"none",scrollTrigger:{trigger:section,start:"top bottom",end:"bottom top",scrub:1.1}});
    }
  } else {
    reveal();
  }

  /* A restrained breathing motion keeps the final section alive after entry. */
  if(ghost){
    gsap.to(ghost,{letterSpacing:"-.105em",duration:6,repeat:-1,yoyo:true,ease:"sine.inOut"});
  }

  principles.forEach((item)=>{
    const word=item.querySelector("strong");
    if(!word) return;
    item.addEventListener("mouseenter",()=>{
      gsap.to(word,{x:10,letterSpacing:"-.02em",duration:.3,ease:"power3.out",overwrite:true});
    });
    item.addEventListener("mouseleave",()=>{
      gsap.to(word,{x:0,letterSpacing:"-.06em",duration:.35,ease:"power3.out",overwrite:true});
    });
  });

  if(cta){
    const icon=cta.querySelector("i");
    cta.addEventListener("mouseenter",()=>{
      gsap.to(cta,{x:7,duration:.25,ease:"power3.out",overwrite:true});
      if(icon) gsap.to(icon,{x:5,rotation:-12,duration:.25,ease:"power3.out",overwrite:true});
    });
    cta.addEventListener("mouseleave",()=>{
      gsap.to(cta,{x:0,duration:.35,ease:"power3.out",overwrite:true});
      if(icon) gsap.to(icon,{x:0,rotation:0,duration:.3,ease:"power3.out",overwrite:true});
    });
  }

  if(endmark){
    const icon=endmark.querySelector("i");
    endmark.addEventListener("mouseenter",()=>{
      gsap.to(endmark,{x:7,duration:.25,ease:"power3.out",overwrite:true});
      if(icon) gsap.to(icon,{x:6,rotation:-8,duration:.25,ease:"power3.out",overwrite:true});
    });
    endmark.addEventListener("mouseleave",()=>{
      gsap.to(endmark,{x:0,duration:.35,ease:"power3.out",overwrite:true});
      if(icon) gsap.to(icon,{x:0,rotation:0,duration:.3,ease:"power3.out",overwrite:true});
    });
  }

  if(field && message && window.innerWidth>900){
    field.addEventListener("pointermove",(event)=>{
      const r=field.getBoundingClientRect();
      const x=(event.clientX-r.left)/r.width-.5;
      const y=(event.clientY-r.top)/r.height-.5;
      gsap.to(message,{x:x*7,y:y*5,duration:.45,ease:"power2.out",overwrite:"auto"});
    });
    field.addEventListener("pointerleave",()=>gsap.to(message,{x:0,y:0,duration:.55,ease:"power3.out",overwrite:"auto"}));
  }
});
