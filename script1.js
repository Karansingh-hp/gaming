const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const nav = $("#nav");
$("#menuToggle").addEventListener("click", () => nav.classList.toggle("open"));
$$("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const authModal = $("#authModal");
const modalTitle = $("#modalTitle");
const authMessage = $("#authMessage");
function openAuth(title){ modalTitle.textContent = title; authMessage.textContent = ""; authModal.classList.add("show"); }
$("#loginOpen").onclick = () => openAuth("Welcome Back");
$("#signupOpen").onclick = () => openAuth("Create Your Account");
$("#getStarted").onclick = () => openAuth("Get Started");
$("#modalClose").onclick = () => authModal.classList.remove("show");
authModal.addEventListener("click", e => { if(e.target === authModal) authModal.classList.remove("show"); });

$("#authForm").addEventListener("submit", e => {
  e.preventDefault();
  authMessage.textContent = "Demo account submitted successfully.";
  showToast("Welcome to GamePulse!");
  setTimeout(() => authModal.classList.remove("show"), 1200);
});

const searchModal = $("#searchModal");
$("#searchOpen").onclick = () => { searchModal.classList.add("show"); $("#searchInput").focus(); };
$("#searchClose").onclick = () => searchModal.classList.remove("show");
searchModal.addEventListener("click", e => { if(e.target === searchModal) searchModal.classList.remove("show"); });

$("#searchInput").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  const names = ["Call of Duty: Modern Warfare III","EA SPORTS FC 24","Fortnite","Red Dead Redemption 2","PUBG Mobile Battle Royale Cup"];
  const found = names.filter(x => x.toLowerCase().includes(q));
  $("#searchResult").textContent = q ? (found.length ? "Found: " + found.join(" • ") : "No matching results.") : "";
});

function showToast(message){
  const t = $("#toast");
  t.textContent = message;
  t.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}
$$("[data-toast]").forEach(btn => btn.addEventListener("click", () => showToast(btn.dataset.toast)));

document.addEventListener("keydown", e => {
  if(e.key === "Escape"){ authModal.classList.remove("show"); searchModal.classList.remove("show"); }
});

const sections = [...$$("main section[id]")];
const links = [...$$("nav a")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s => observer.observe(s));
