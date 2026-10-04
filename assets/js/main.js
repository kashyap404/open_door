/* ============================================================
   PROJECT LIST — one line per project.
   ============================================================ */
const PROJECTS = [
  { folder: "picolink",        name: "PicoLink",        tag: "Embedded / Communication Protocols",      desc: "an RP2040-based embedded platform built around VGA graphics generation and a composite USB HID + CDC device.", live: true },
  { folder: "splattera",       name: "Splattera",       tag: "Computer Vision / 3DGS",        desc: "A scalable 3D reconstruction pipeline for turning long video trajectories into photorealistic digital environments.", live: true },
  { folder: "blazescript",     name: "Blazescript",     tag: "Compilers / LLVM",    desc: "A custom programming language built from scratch using AOT compilation via LLVM to WebAssembly for faster web workloads.", live: true },
  { folder: "micromouse",      name: "MicroMouse",      tag: "Embedded / PCB Design",  desc: "An autonomous robot that maps the maze, finds the optimal path, and races to the finish.", live: true },
  { folder: "amazedex",        name: "Amazedex",        tag: "Reinforcement Learning / Sim2Real", desc: "A reinforcement learning project focused on autonomous in-hand dexterous manipulation using a 4-fingered hand", live: true },
  { folder: "astrartos",       name: "AstraRTOS",       tag: "Embedded Systems / OS",        desc: "AstraRTOS is a real-time operating system (RTOS) from scratch for ARM Cortex m-4 microcontrollers.", live: true },
  { folder: "mission-mimosa",  name: "Mission Mimosa",  tag: "Robot Learning / Embedded",              desc: "Giving robots a sense of touch, so they can see, feel, and interact with the world.", live: true },
  { folder: "platypulse",      name: "PlatyPulse",      tag: "Embedded / Communication / PCB",            desc: "PlatyPulse is a compact wireless experimentation platform combining RF, RFID/NFC, and IR, enabling users to capture, analyze, store, and replay signals through one handheld device.", live: true },
  { folder: "tinygpu",         name: "TinyGPU",         tag: "GPU / ASIC design ",      desc: "A custom RISC-V matrix accelerator delivering 16× speedup on 4×4 matrix multiplication.", live: true },
  { folder: "flexwalk",        name: "FLEXWALK",        tag: "CAD / 3D DESIGN",        desc: "A humanoid bipedal robot. It has hip pitch, hip roll, knee pitch, and ankle pitch which we CAD'd and built. We are moving it using closed loop controls.", live: true },
  { folder: "virel",           name: "ViReL",           tag: "RL / VLM",            desc: "ViReL is a spatially grounded Vision-Language Model that leverages GRPO policy optimization to strengthen visual reasoning, minimize spatial hallucinations, and enable reliable, perception-driven decision-making for robotic manipulation.", live: true },
  { folder: "reforge",         name: "Reforge",         tag: "Embedded Systems / FPGA",           desc: "A custom development board integrating an iCE40 FPGA with an ESP32-WROOM, designed to combine hardware-level processing with flexible file management, control, and communication.", live: true },
  { folder: "icarus",          name: "Icarus",          tag: "Embedded / PCB Design ",      desc: "An FPV quadcopter engineered entirely from scratch using  custom PCB hardware design and  embedded firmware", live: true },
  { folder: "waddle",          name: "Waddle",          tag: "Bipedal Locomotion / RL",        desc: "A bipedal robot that walks by using Reinforcement Learning algorithms in simulation", live: true },
  { folder: "columbus-maximus",name: "Columbus Maximus",tag: "Embedded / ROS / SLAM",    desc: "Giving a robot the ability to see, understand where it is, and find its own way ", live: true },
  { folder: "aura",            name: "AURA",            tag: "Embedded / Communication", desc: "Project AURA aims to transmit messages/data by harvesting electrical energy from ambient FM signals and using the harvested energy to perform FM backscatter communication.", live: true },
  { folder: "mcqueen",         name: "McQueen",         tag: "Imitation Learning / Autonomous",      desc: "An autonomous RC car that sees, learns, and drives in real time.", live: true },
  { folder: "wheres-waldo",    name: "Where's Waldo",   tag: "Comp Vision / FPGA Design",         desc: "A custom YOLO accelerator that detects a live feed on an FPGA", live: true }
];

/* ---------- build the cards ---------- */
const grid = document.getElementById("projectGrid");
PROJECTS.forEach((p, i) => {
  const a = document.createElement("a");
  a.className = "pcard reveal";
  a.style.setProperty("--d", `${(i % 4) * 70}ms`);            
  a.href = p.live ? `${p.folder}/` : "#";
  if(!p.live){
    a.setAttribute("aria-disabled", "true");
    a.addEventListener("click", e => e.preventDefault());     
  }
  a.innerHTML = `
    <div class="info">
      <span class="tag">${p.tag}</span>
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
    </div>`;
  grid.appendChild(a);
});

/* ---------- mobile menu ---------- */
const burgerBtn = document.getElementById("burgerBtn");
const mobileNav = document.getElementById("mobileNav");
const setMenu = open => {
  mobileNav.classList.toggle("open", open);
  burgerBtn.setAttribute("aria-expanded", String(open));
  burgerBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
burgerBtn.addEventListener("click", () => setMenu(!mobileNav.classList.contains("open")));
mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

/* ---------- reveal on scroll ---------- */
const revealEls = document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
  revealEls.forEach(el => io.observe(el));
}else{
  revealEls.forEach(el => el.classList.add("in"));
}

/* ---------- scroll progress line under the nav ---------- */
const progressBar = document.getElementById("progressBar");
const setProgress = () => {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  progressBar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
};
addEventListener("scroll", setProgress, { passive: true });
setProgress();

/* ---------- hero parallax ---------- */
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroImg = document.getElementById("heroImg");
const heroPhoto = document.querySelector(".hero-photo");
if(heroImg && heroPhoto && !reduceMotion){
  let ticking = false;
  const parallax = () => {
    const r = heroPhoto.getBoundingClientRect();
    if(r.bottom > 0){
      const p = Math.min(1, Math.max(0, -r.top / r.height));   
      heroImg.style.transform = `translate3d(0, ${(p * 4).toFixed(2)}%, 0) scale(1.12)`;
    }
    ticking = false;
  };
  addEventListener("scroll", () => {
    if(!ticking){ requestAnimationFrame(parallax); ticking = true; }
  }, { passive: true });
  parallax();
}