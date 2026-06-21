
const USERS = [
  { email: "admin@siga.cl", password: "1234", name: "Administrador SIGA", role: "Administrador" },
  { email: "funcionario@siga.cl", password: "1234", name: "Funcionario Aduanas", role: "Funcionario Aduanas" },
  { email: "pasajero@siga.cl", password: "1234", name: "Pasajero Demo", role: "Pasajero" }
];

const KEY = "siga_v010_base";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let currentUser = null;

let state = JSON.parse(localStorage.getItem(KEY) || "null") || {
  tramites: [
    { id: "TR-2026-001", pasajero: "Pasajero Demo", documento: "11.111.111-1", tipo: "Salida", estado: "En revisión", observacion: "Pre-trámite creado." },
    { id: "TR-2026-002", pasajero: "María Demo", documento: "22.222.222-2", tipo: "Ingreso", estado: "Aprobado", observacion: "Sin observaciones." }
  ]
};

function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function nextId() { return "TR-2026-" + String(state.tramites.length + 1).padStart(3, "0"); }
function esc(v) { return String(v ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }
function badge(v) { return `<span class="badge">${esc(v)}</span>`; }

$("#loginForm").onsubmit = e => {
  e.preventDefault();
  const email = $("#email").value.trim().toLowerCase();
  const pass = $("#password").value;
  const user = USERS.find(u => u.email === email && u.password === pass);
  if (!user) {
    $("#loginMsg").textContent = "Credenciales incorrectas.";
    return;
  }
  currentUser = user;
  $("#login").classList.add("hidden");
  $("#app").classList.remove("hidden");
  $("#userInfo").textContent = `${user.name} · ${user.role}`;
  show("dashboard");
};

$("#logout").onclick = () => {
  currentUser = null;
  $("#app").classList.add("hidden");
  $("#login").classList.remove("hidden");
};

$$("aside button[data-view]").forEach(btn => btn.onclick = () => show(btn.dataset.view));

function show(view) {
  $$("aside button[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  const titles = { dashboard: "Panel principal", consulta: "Consulta de trámite", pretramite: "Pre-trámite", reportes: "Reportes" };
  $("#viewTitle").textContent = titles[view];

  if (view === "dashboard") dashboard();
  if (view === "consulta") consulta();
  if (view === "pretramite") pretramite();
  if (view === "reportes") reportes();
}

function dashboard() {
  $("#view").innerHTML = `
    <div class="grid">
      <div class="card"><strong>${state.tramites.length}</strong>Trámites registrados</div>
      <div class="card"><strong>${state.tramites.filter(t => t.estado === "En revisión").length}</strong>En revisión</div>
      <div class="card"><strong>${state.tramites.filter(t => t.estado === "Aprobado").length}</strong>Aprobados</div>
    </div>
  `;
}

function renderTable(data) {
  const rows = data.map(t => `<tr><td><strong>${t.id}</strong></td><td>${esc(t.pasajero)}</td><td>${esc(t.documento)}</td><td>${esc(t.tipo)}</td><td>${badge(t.estado)}</td><td>${esc(t.observacion)}</td></tr>`).join("");
  return `<table><thead><tr><th>ID</th><th>Pasajero</th><th>Documento</th><th>Tipo</th><th>Estado</th><th>Observación</th></tr></thead><tbody>${rows || "<tr><td colspan='6'>Sin registros.</td></tr>"}</tbody></table>`;
}

function consulta() {
  $("#view").innerHTML = `
    <section class="table-card">
      <h3>Consulta de trámite</h3>
      <input id="search" placeholder="Buscar por ID, pasajero o documento">
      <div id="tableBox" style="margin-top:14px">${renderTable(state.tramites)}</div>
    </section>
  `;
  $("#search").oninput = e => {
    const q = e.target.value.toLowerCase();
    const data = state.tramites.filter(t => Object.values(t).join(" ").toLowerCase().includes(q));
    $("#tableBox").innerHTML = renderTable(data);
  };
}

function pretramite() {
  $("#view").innerHTML = `
    <section class="form-card">
      <h3>Crear pre-trámite</h3>
      <form id="preForm" class="form-grid">
        <div><label>Pasajero</label><input name="pasajero" required></div>
        <div><label>Documento</label><input name="documento" required></div>
        <div><label>Tipo de movimiento</label><select name="tipo"><option>Salida</option><option>Ingreso</option></select></div>
        <div class="span-2"><label>Observación</label><textarea name="observacion"></textarea></div>
        <div class="span-2"><button type="submit">Guardar pre-trámite</button></div>
      </form>
    </section>
  `;
  $("#preForm").onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    state.tramites.unshift({
      id: nextId(),
      pasajero: fd.get("pasajero"),
      documento: fd.get("documento"),
      tipo: fd.get("tipo"),
      estado: "En revisión",
      observacion: fd.get("observacion") || "Pre-trámite creado."
    });
    save();
    alert("Pre-trámite guardado.");
    show("consulta");
  };
}

function reportes() {
  $("#view").innerHTML = `
    <section class="table-card">
      <h3>Reporte general</h3>
      ${renderTable(state.tramites)}
    </section>
  `;
}
