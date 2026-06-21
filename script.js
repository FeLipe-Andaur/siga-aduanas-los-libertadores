const USERS = [
  { email: "admin@siga.cl", password: "1234", name: "Administrador SIGA", role: "Administrador" },
  { email: "funcionario@siga.cl", password: "1234", name: "Funcionario Aduanas", role: "Funcionario Aduanas" },
  { email: "pasajero@siga.cl", password: "1234", name: "Pasajero Demo", role: "Pasajero" },
  { email: "sag@siga.cl", password: "1234", name: "Inspector SAG", role: "Inspector SAG" },
  { email: "pdi@siga.cl", password: "1234", name: "Control PDI", role: "Control PDI" },
  { email: "deshabilitado@siga.cl", password: "1234", name: "Usuario Deshabilitado", role: "Pasajero" }
];

const STORAGE_KEY = "siga_aduanas_fidedigno_v1";
const SESSION_KEY = "siga_aduanas_session_v1";

const seed = {
  tramites: [
    { id: "TR-2026-001", pasajero: "Pasajero Demo", documento: "11.111.111-1", nacionalidad: "Chile", tipo: "Salida temporal", destino: "Argentina", patente: "ABCD-12", menor: "No", doc: "Pendiente", sag: "Pendiente", pdi: "Pendiente", estado: "En revisión", obs: "Pre-trámite demo para salida por Los Libertadores.", creadoPor: "pasajero@siga.cl", fecha: "2026-06-12" },
    { id: "TR-2026-002", pasajero: "María González", documento: "22.222.222-2", nacionalidad: "Chile", tipo: "Ingreso", destino: "Chile", patente: "WXYZ-88", menor: "Sí", doc: "Aprobado", sag: "Aprobado", pdi: "Aprobado", estado: "Aprobado", obs: "Documentación revisada correctamente.", creadoPor: "funcionario@siga.cl", fecha: "2026-06-11" },
    { id: "TR-2026-003", pasajero: "Carlos Pérez", documento: "AR-88991", nacionalidad: "Argentina", tipo: "Ingreso", destino: "Chile", patente: "JKLT-31", menor: "No", doc: "Aprobado", sag: "Observado", pdi: "Pendiente", estado: "Observado", obs: "Declaración SAG observada por alimentos declarados.", creadoPor: "funcionario@siga.cl", fecha: "2026-06-10" }
  ],
  menores: [
    { id: "MEN-001", tramiteId: "TR-2026-002", nombre: "Menor Demo", documento: "33.333.333-3", tipoViaje: "Ambos padres presentes", autorizacion: "Autorización notarial", acompanante: "Ambos padres", respaldo: "Certificado y cédulas revisadas", estado: "Aprobado", observacion: "Autorización validada para el trámite de ejemplo." }
  ],
  vehiculos: [
    { id: "VEH-001", tramiteId: "TR-2026-001", patente: "ABCD-12", chasis: "CHASIS-DEMO-001", conductor: "Pasajero Demo", titular: "Pasajero Demo", tipoVehiculo: "Particular", movimiento: "Salida temporal", documentoArgentino: "No aplica", estadoDocumento: "Vigente", permiso: "Permiso turismo 180 días", estado: "Registrado" }
  ],
  sagDecl: [
    { id: "SAG-001", tramiteId: "TR-2026-003", alimentos: "Sí", mascotas: "No", detalle: "Alimentos declarados para inspección.", estado: "Observado" }
  ],
  usuarios: USERS.map((u, i) => ({ id: i + 1, nombre: u.name, correo: u.email, rol: u.role, estado: u.email === "deshabilitado@siga.cl" ? "Inactivo" : "Activo" })),
  integraciones: [
    { organismo: "SAG", estado: "Pendiente", ultima: "Sin sincronizar" },
    { organismo: "PDI", estado: "Pendiente", ultima: "Sin sincronizar" },
    { organismo: "Aduana Argentina", estado: "Pendiente", ultima: "Sin sincronizar" }
  ],
  bitacora: [
    { fecha: "2026-06-12 10:00", usuario: "Sistema", modulo: "Inicio", accion: "Carga inicial del prototipo." }
  ]
};

const views = [
  { id: "dashboard", label: "Panel principal", roles: ["Administrador","Funcionario Aduanas","Pasajero","Inspector SAG","Control PDI"] },
  { id: "consulta", label: "Consulta de trámite", roles: ["Administrador","Funcionario Aduanas","Pasajero","Inspector SAG","Control PDI"] },
  { id: "checklist", label: "Checklist documental", roles: ["Administrador","Funcionario Aduanas","Pasajero"] },
  { id: "pretramite", label: "Pre-trámite", roles: ["Administrador","Funcionario Aduanas","Pasajero"] },
  { id: "menores", label: "Menores de edad", roles: ["Administrador","Funcionario Aduanas","Pasajero"] },
  { id: "documentacion", label: "Documentación", roles: ["Administrador","Funcionario Aduanas"] },
  { id: "vehiculos", label: "Vehículos", roles: ["Administrador","Funcionario Aduanas","Pasajero"] },
  { id: "sag", label: "Declaración SAG", roles: ["Administrador","Funcionario Aduanas","Pasajero","Inspector SAG"] },
  { id: "productosSag", label: "Productos SAG", roles: ["Administrador","Funcionario Aduanas","Pasajero","Inspector SAG"] },
  { id: "mascotas", label: "Mascotas", roles: ["Administrador","Funcionario Aduanas","Pasajero","Inspector SAG"] },
  { id: "pdi", label: "Control PDI", roles: ["Administrador","Funcionario Aduanas","Control PDI"] },
  { id: "integracion", label: "Integración", roles: ["Administrador","Funcionario Aduanas"] },
  { id: "conciliacion", label: "Conciliación Argentina", roles: ["Administrador","Funcionario Aduanas"] },
  { id: "flujo", label: "Flujo y ventanillas", roles: ["Administrador","Funcionario Aduanas"] },
  { id: "reportes", label: "Reportes", roles: ["Administrador","Funcionario Aduanas"] },
  { id: "usuarios", label: "Usuarios", roles: ["Administrador"] },
  { id: "bitacora", label: "Bitácora", roles: ["Administrador","Funcionario Aduanas"] }
];

let state = loadState();
let currentUser = loadSession();
let currentView = "dashboard";

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return clone(seed);
    }
    const parsed = JSON.parse(raw);
    return { ...clone(seed), ...parsed };
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return clone(seed);
  }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function loadSession() { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); } catch { return null; } }
function saveSession() {
  const token = "JWT-SIGA-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  currentUser.sessionToken = token;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
  sessionStorage.setItem("siga_session_token", token);
}
function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem("siga_session_token");
}
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 2600);
}
function esc(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function addLog(modulo, accion) {
  state.bitacora.unshift({
    fecha: new Date().toLocaleString("es-CL"),
    usuario: currentUser ? currentUser.email : "Sistema",
    modulo,
    accion
  });
  saveState();
}
function badge(value) {
  const t = String(value).toLowerCase();
  let cls = "info";
  if (t.includes("aprob") || t.includes("activo") || t.includes("registrado") || t.includes("sincronizado")) cls = "ok";
  else if (t.includes("pendiente") || t.includes("revisión")) cls = "warn";
  else if (t.includes("observ") || t.includes("fall") || t.includes("inactivo") || t.includes("rechaz") || t.includes("bloque") || t.includes("reten") || t.includes("caduc")) cls = "bad";
  return `<span class="badge ${cls}">${esc(value)}</span>`;
}
function table(headers, rows) {
  return `<div class="table-wrap"><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.length ? rows.join("") : `<tr><td colspan="${headers.length}">Sin registros.</td></tr>`}</tbody></table></div>`;
}

function setFieldError(form, name, message) {
  const field = form.querySelector(`[name="${name}"]`);
  if (!field) return;
  field.classList.add("input-error");
  let box = field.parentElement.querySelector(".field-error");
  if (!box) {
    box = document.createElement("div");
    box.className = "field-error";
    field.parentElement.appendChild(box);
  }
  box.textContent = message;
}
function clearFieldErrors(form) {
  form.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
  form.querySelectorAll(".field-error").forEach(el => el.remove());
  form.querySelectorAll(".form-alert").forEach(el => el.remove());
}
function validateRequiredFields(form, names) {
  clearFieldErrors(form);
  let ok = true;
  names.forEach(name => {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field || String(field.value || "").trim()) return;
    ok = false;
    setFieldError(form, name, "Campo obligatorio.");
  });
  if (!ok) {
    const alert = document.createElement("div");
    alert.className = "form-alert bad-alert";
    alert.textContent = "Complete los campos obligatorios marcados en rojo.";
    form.prepend(alert);
  }
  return ok;
}
function showProcessAlert(form, message, critical = false) {
  if (!form) return;
  form.querySelectorAll(".form-alert").forEach(el => el.remove());
  const alert = document.createElement("div");
  alert.className = `form-alert ${critical ? "critical-alert" : "bad-alert"}`;
  alert.textContent = message;
  form.prepend(alert);
}
function playAlertSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 880;
    gain.gain.value = 0.04;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 450);
  } catch (e) {
    // El navegador puede bloquear audio automático; la alerta visual sigue activa.
  }
}
function escapePdfText(text) {
  return String(text ?? "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[()\\]/g, "\\$&");
}
function downloadSimplePdf(filename, title, lines) {
  const safeLines = [title, ...lines].map(escapePdfText);
  let content = "BT /F1 16 Tf 50 790 Td (" + safeLines[0] + ") Tj ET\n";
  let y = 755;
  safeLines.slice(1).forEach(line => {
    content += "BT /F1 11 Tf 50 " + y + " Td (" + line + ") Tj ET\n";
    y -= 18;
  });

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Length " + content.length + " >>\\nstream\\n" + content + "endstream"
  ];

  let pdf = "%PDF-1.4\\n";
  const offsets = [0];
  objects.forEach((obj, idx) => {
    offsets.push(pdf.length);
    pdf += (idx + 1) + " 0 obj\\n" + obj + "\\nendobj\\n";
  });
  const xref = pdf.length;
  pdf += "xref\\n0 " + (objects.length + 1) + "\\n0000000000 65535 f \\n";
  offsets.slice(1).forEach(off => {
    pdf += String(off).padStart(10, "0") + " 00000 n \\n";
  });
  pdf += "trailer\\n<< /Size " + (objects.length + 1) + " /Root 1 0 R >>\\nstartxref\\n" + xref + "\\n%%EOF";

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportExcel(filename, arr) {
  if (!arr.length) return toast("No hay datos para exportar.");
  const headers = Object.keys(arr[0]);
  const rows = arr.map(item => `<tr>${headers.map(h => `<td>${esc(item[h])}</td>`).join("")}</tr>`).join("");
  const html = `<table><thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table>`;
  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportCsv(filename, arr) {
  if (!arr.length) return toast("No hay datos para exportar.");
  const headers = Object.keys(arr[0]);
  const content = [
    headers.join(";"),
    ...arr.map(item => headers.map(h => `"${String(item[h] ?? "").replaceAll('"', '""')}"`).join(";"))
  ].join("\n");
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function nextId(prefix, array) { return `${prefix}-${String(array.length + 1).padStart(3, "0")}`; }
function canAccess(view) { return view.roles.includes(currentUser.role); }
function viewLabel(view) {
  if (view.id === "checklist" && currentUser && currentUser.role === "Pasajero") {
    return "Mis documentos requeridos";
  }
  return view.label;
}
function visibleTramites() {
  if (currentUser.role === "Pasajero") {
    return state.tramites.filter(t => t.creadoPor === currentUser.email);
  }
  return state.tramites;
}
function tramiteOptions() {
  return visibleTramites().map(t => `<option value="${t.id}">${t.id} | ${esc(t.pasajero)}</option>`).join("");
}
function visibleMenores() {
  const allowedIds = new Set(visibleTramites().map(t => t.id));
  return state.menores.filter(m => allowedIds.has(m.tramiteId));
}
function menorEstadoPorAutorizacion(autorizacion, estadoSolicitado) {
  if (autorizacion === "Documento pendiente" || autorizacion === "Sin autorización") return "Observado";
  return estadoSolicitado;
}
function visibleMascotas() {
  const allowedIds = new Set(visibleTramites().map(t => t.id));
  return (state.mascotas || []).filter(m => allowedIds.has(m.tramiteId));
}
function mascotaEstadoSAG(certificado, vacuna, estadoSolicitado) {
  const invalidos = ["Pendiente", "Vencido", "Vencida", "No presenta"];
  if (invalidos.includes(certificado) || invalidos.includes(vacuna)) return "Observado";
  return estadoSolicitado;
}
function visibleChecklist() {
  const allowedIds = new Set(visibleTramites().map(t => t.id));
  return (state.checklists || []).filter(c => allowedIds.has(c.tramiteId));
}
function visibleProductosSag() {
  const allowedIds = new Set(visibleTramites().map(t => t.id));
  return (state.productosSag || []).filter(p => allowedIds.has(p.tramiteId));
}
function estadoChecklist(estadoSolicitado) {
  if (estadoSolicitado === "Pendiente" || estadoSolicitado === "Vencido" || estadoSolicitado === "No presenta") return "Observado";
  return estadoSolicitado;
}
function estadoProductoSag(condicion, estadoSolicitado) {
  if (condicion === "Producto prohibido" || condicion === "Requiere inspección" || condicion === "No declarado") return "Observado";
  return estadoSolicitado;
}
function estadoConciliacion(ladoChile, ladoArgentina) {
  return ladoChile === ladoArgentina ? "Conciliado" : "Diferencia detectada";
}
function evaluarMenor(tipoViaje, autorizacion, respaldo, documento) {
  const tieneRespaldo = String(respaldo || "").trim().length > 0;
  if (!documento || !String(documento).trim()) {
    return { estado: "Bloqueado", observacion: "Documento de identidad del menor obligatorio. Flujo migratorio detenido." };
  }
  if (tipoViaje === "Ambos padres presentes") {
    return { estado: "Aprobado", observacion: "Filiación validada con ambos padres presentes." };
  }
  if (tipoViaje === "Viaja con un padre") {
    if (autorizacion === "Autorización notarial" && tieneRespaldo) {
      return { estado: "Aprobado", observacion: "Autorización notarial validada para viaje con un padre." };
    }
    return { estado: "Bloqueado", observacion: "Salida bloqueada: requiere autorización notarial vigente del padre/madre ausente." };
  }
  if (tipoViaje === "Viaja solo o con tercero") {
    if ((autorizacion === "Autorización notarial" || autorizacion === "Autorización judicial") && tieneRespaldo) {
      return { estado: "Aprobado", observacion: "Autorización validada para viaje con tercero o sin padres." };
    }
    return { estado: "Bloqueado", observacion: "Salida bloqueada: requiere autorización de ambos padres o resolución judicial." };
  }
  if (autorizacion === "Autorización judicial" && tieneRespaldo) {
    return { estado: "Aprobado", observacion: "Trámite aprobado y vinculado a autorización judicial." };
  }
  return { estado: "Bloqueado", observacion: "Salida bloqueada por autorización insuficiente del menor." };
}
function evaluarMascota(responsable, tutorLegal, autorizacionTutor, certificado, vacuna, estadoSolicitado) {
  if (responsable === "Menor de edad" && (!tutorLegal || !autorizacionTutor)) {
    return { estado: "Bloqueado", observacion: "Un menor no puede declarar mascota sin tutor legal responsable." };
  }
  if (responsable === "Representante legal" && (!tutorLegal || !autorizacionTutor)) {
    return { estado: "Bloqueado", observacion: "El representante debe registrar tutoría o autorización de responsabilidad." };
  }
  const invalidos = ["Pendiente", "Vencido", "Vencida", "No presenta"];
  if (invalidos.includes(certificado) || invalidos.includes(vacuna)) {
    return { estado: "Observado", observacion: "Requiere revisión SAG por certificado o vacuna pendiente/vencida/no presentada." };
  }
  return { estado: estadoSolicitado, observacion: "Mascota registrada y asociada al responsable legal." };
}
function evaluarVehiculo(tipoVehiculo, estadoDocumento, movimiento) {
  if (estadoDocumento === "Inválido") return { estado: "Rechazado", permiso: "Ingreso rechazado", observacion: "Documento inválido o inexistente. Ingreso bloqueado." };
  if (estadoDocumento === "Vencido") return { estado: "Observado", permiso: "Flujo pausado", observacion: "Documento vencido; flujo pausado para revisión." };
  if (movimiento === "Formulario de salida temporal") return { estado: "Pendiente", permiso: "Formulario de salida temporal generado", observacion: "Documento generado en estado pendiente." };
  if (tipoVehiculo === "Diplomático") return { estado: "Registrado", permiso: "Permiso diplomático 90 días", observacion: "Permiso especial emitido por condición diplomática/oficial." };
  if (tipoVehiculo === "Particular") return { estado: "Registrado", permiso: "Permiso turismo 180 días", observacion: "Permiso estándar emitido para vehículo particular." };
  if (tipoVehiculo === "Documento argentino") return { estado: "Registrado", permiso: "Ingreso autorizado en tránsito", observacion: "Documento argentino vigente validado para ingreso." };
  return { estado: "Registrado", permiso: "Documento generado", observacion: "Vehículo registrado correctamente." };
}
function hasActiveDuplicateDocument(documento) {
  const normalized = String(documento || "").trim().toLowerCase();
  return state.tramites.some(t => String(t.documento).trim().toLowerCase() === normalized && t.estado === "En revisión");
}
function renderTramitesTable(data, actions = false) {
  const rows = data.map(t => `
    <tr>
      <td><strong>${t.id}</strong><br><span class="small">${esc(t.fecha)}</span></td>
      <td>${esc(t.pasajero)}<br><span class="small">${esc(t.documento)}</span></td>
      <td>${esc(t.tipo)}<br><span class="small">${esc(t.destino)}</span></td>
      <td>${esc(t.patente)}</td>
      <td>${badge(t.doc)}</td>
      <td>${badge(t.sag)}</td>
      <td>${badge(t.pdi)}</td>
      <td>${badge(t.estado)}</td>
      ${actions ? `<td class="actions"><button type="button" class="btn secondary" data-approve="${t.id}">Aprobar</button><button type="button" class="btn outline" data-observe="${t.id}">Observar</button></td>` : ""}
    </tr>
  `);
  const headers = ["ID","Pasajero","Tipo","Vehículo","Doc.","SAG","PDI","Estado"];
  if (actions) headers.push("Acción");
  return table(headers, rows);
}
function bindGenericApprove() {
  $$('[data-approve]').forEach(btn => btn.onclick = () => {
    const t = state.tramites.find(x => x.id === btn.dataset.approve);
    if (!t) return;
    t.estado = "Aprobado";
    if (t.doc !== "Observado") t.doc = "Aprobado";
    if (t.sag !== "Observado") t.sag = "Aprobado";
    if (t.pdi !== "Observado") t.pdi = "Aprobado";
    addLog("Trámite", `Aprobación general del trámite ${t.id}.`);
    saveState();
    toast("Trámite aprobado.");
    go(currentView);
  });
  $$('[data-observe]').forEach(btn => btn.onclick = () => {
    const t = state.tramites.find(x => x.id === btn.dataset.observe);
    if (!t) return;
    t.estado = "Observado";
    t.obs = "Observado por revisión funcional.";
    addLog("Trámite", `Trámite ${t.id} marcado como observado.`);
    saveState();
    toast("Trámite observado.");
    go(currentView);
  });
}

function init() {
  if (!currentUser) {
    $("#loginScreen").classList.remove("hidden");
    $("#appShell").classList.add("hidden");
    return;
  }
  $("#loginScreen").classList.add("hidden");
  $("#appShell").classList.remove("hidden");
  $("#sessionName").textContent = currentUser.name;
  $("#sessionRole").textContent = currentUser.role;
  renderNav();
  go(currentView);
}

function renderNav() {
  $("#sideNav").innerHTML = views.filter(canAccess).map(v => `<button type="button" class="nav-btn ${v.id === currentView ? 'active' : ''}" data-view="${v.id}">${viewLabel(v)}</button>`).join("");
  $$(".nav-btn").forEach(btn => btn.onclick = () => {
    $("#sidebar").classList.remove("open");
    go(btn.dataset.view);
  });
}
function go(id) {
  const view = views.find(v => v.id === id);
  currentView = (view && canAccess(view)) ? id : "dashboard";
  $("#viewTitle").textContent = viewLabel(views.find(v => v.id === currentView));
  renderNav();
  ({ dashboard, consulta, checklist, pretramite, menores, documentacion, vehiculos, sag, productosSag, mascotas, pdi, integracion, conciliacion, flujo, reportes, usuarios, bitacora })[currentView]();
}

function dashboard() {
  const vt = visibleTramites();
  const menoresVisibles = visibleMenores();
  const mascotasVisibles = visibleMascotas();
  const checklistPendiente = visibleChecklist().filter(c => c.estado === "Pendiente" || c.estado === "Observado" || c.estado === "Vencido" || c.estado === "No presenta").length;
  const productosObservados = visibleProductosSag().filter(p => p.estado === "Observado" || p.estado === "Pendiente").length;
  const observed = vt.filter(t => t.estado === "Observado" || t.sag === "Observado" || t.pdi === "Observado").length;
  $("#viewContainer").innerHTML = `
    <div class="kpi">
      <div class="kpi-card"><strong>${vt.length}</strong>Trámites visibles</div>
      <div class="kpi-card"><strong>${vt.filter(t => t.estado === "En revisión").length}</strong>En revisión</div>
      <div class="kpi-card"><strong>${vt.filter(t => t.sag === "Pendiente").length}</strong>SAG pendiente</div>
      <div class="kpi-card"><strong>${observed}</strong>Observados</div>
    </div>

    <div class="grid grid-4 operational-status">
      <div class="card status-card"><h3>Checklist pendiente</h3><strong>${checklistPendiente}</strong><span>Documentos por regularizar</span></div>
      <div class="card status-card"><h3>Menores asociados</h3><strong>${menoresVisibles.length}</strong><span>Registros vinculados a trámites</span></div>
      <div class="card status-card"><h3>Mascotas declaradas</h3><strong>${mascotasVisibles.length}</strong><span>Registros vinculados a SAG</span></div>
      <div class="card status-card"><h3>Productos SAG observados</h3><strong>${productosObservados}</strong><span>Alimentos/productos por revisar</span></div>
    </div>

    <section class="table-card" style="margin-top:18px">
      <h3>Últimos trámites</h3>
      ${renderTramitesTable(vt.slice(0, 8), currentUser.role !== "Pasajero")}
    </section>
  `;
  bindGenericApprove();
}

function consulta() {
  $("#viewContainer").innerHTML = `
    <section class="table-card">
      <h3>Consulta de trámite</h3>
      <p>Busca por ID, pasajero, documento, patente, estado o destino.</p>
      <div class="toolbar">
        <div><label>Buscar</label><input id="qSearch" placeholder="TR-2026-001, Pasajero Demo, ABCD-12..."></div>
        <div><label>Estado</label><select id="qStatus"><option value="todos">Todos</option><option>En revisión</option><option>Aprobado</option><option>Observado</option></select></div>
        <div><label>Tipo</label><select id="qType"><option value="todos">Todos</option><option>Salida temporal</option><option>Ingreso</option><option>Tránsito</option></select></div>
        <button type="button" id="qClear" class="btn secondary">Limpiar</button>
      </div>
      <div id="queryResults"></div>
    </section>
  `;
  const render = () => {
    const term = $("#qSearch").value.toLowerCase();
    const status = $("#qStatus").value;
    const type = $("#qType").value;
    const rows = visibleTramites().filter(t => {
      const text = Object.values(t).join(" ").toLowerCase();
      return text.includes(term) && (status === "todos" || t.estado === status) && (type === "todos" || t.tipo === type);
    });
    $("#queryResults").innerHTML = renderTramitesTable(rows, currentUser.role !== "Pasajero");
    bindGenericApprove();
  };
  ["#qSearch", "#qStatus", "#qType"].forEach(sel => $(sel).addEventListener(sel === "#qSearch" ? "input" : "change", render));
  $("#qClear").onclick = () => { $("#qSearch").value = ""; $("#qStatus").value = "todos"; $("#qType").value = "todos"; render(); };
  render();
}



function checklist() {
  const dataChecklist = visibleChecklist();

  if (currentUser.role === "Pasajero") {
    const rows = dataChecklist.map(c => `
      <tr>
        <td>${esc(c.categoria)}</td>
        <td>${esc(c.documento)}</td>
        <td>${badge(c.estado)}</td>
        <td>${esc(c.observacion || "Sin observación")}</td>
      </tr>
    `);

    $("#viewContainer").innerHTML = `
      <section class="table-card">
        <h3>Mis documentos requeridos</h3>
        <p>Revisa los documentos asociados a tu trámite antes de llegar a ventanilla.</p>
        ${table(["Categoría","Documento requerido","Estado","Observación"], rows)}
      </section>
    `;
    return;
  }

  const rows = dataChecklist.map(c => `
    <tr>
      <td><strong>${c.id}</strong></td>
      <td>${esc(c.tramiteId)}</td>
      <td>${esc(c.categoria)}</td>
      <td>${esc(c.documento)}</td>
      <td>${badge(c.estado)}</td>
      <td>${esc(c.observacion || "Sin observación")}</td>
      <td class="actions">
        <button type="button" class="btn secondary" data-check-ok="${c.id}">Marcar OK</button>
        <button type="button" class="btn outline" data-check-obs="${c.id}">Observar</button>
      </td>
    </tr>
  `);

  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Checklist documental</h3>
        <p>Valida documentos obligatorios antes de la atención en ventanilla.</p>
        <form id="checkForm" class="form-grid">
          <div>
            <label>Trámite asociado</label>
            <select name="tramiteId" required>${tramiteOptions()}</select>
          </div>
          <div>
            <label>Categoría</label>
            <select name="categoria">
              <option>Pasajero</option>
              <option>Menor</option>
              <option>Vehículo</option>
              <option>SAG</option>
              <option>Mascota</option>
            </select>
          </div>
          <div class="span-2">
            <label>Documento requerido</label>
            <input name="documento" required placeholder="Ej: Pasaporte vigente, autorización notarial, formulario de vehículo">
          </div>
          <div>
            <label>Estado documental</label>
            <select name="estado">
              <option>Pendiente</option>
              <option>Aprobado</option>
              <option>Vencido</option>
              <option>No presenta</option>
            </select>
          </div>
          <div class="span-2">
            <label>Observación</label>
            <textarea name="observacion" placeholder="Detalle de documento faltante, vencido o inconsistente."></textarea>
          </div>
          <div class="span-2 actions">
            <button class="btn primary" type="submit">Agregar documento</button>
          </div>
        </form>
      </section>

      <section class="table-card">
        <h3>Documentos por trámite</h3>
        ${table(["ID","Trámite","Categoría","Documento requerido","Estado","Observación","Acción"], rows)}
      </section>
    </div>
  `;

  $("#checkForm").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const estadoFinal = estadoChecklist(fd.get("estado"));
    const item = {
      id: nextId("CHK", state.checklists || []),
      tramiteId: fd.get("tramiteId"),
      categoria: fd.get("categoria"),
      documento: fd.get("documento"),
      estado: estadoFinal,
      observacion: fd.get("observacion") || (estadoFinal === "Observado" ? "Documento pendiente, vencido o no presentado." : "Sin observación.")
    };

    if (!state.checklists) state.checklists = [];
    state.checklists.unshift(item);

    const tramite = state.tramites.find(t => t.id === item.tramiteId);
    if (tramite && estadoFinal === "Observado") {
      tramite.doc = "Observado";
      tramite.estado = "Observado";
      tramite.obs = "Trámite observado por documentación requerida.";
    }

    addLog("Checklist documental", `Documento ${item.id} agregado al trámite ${item.tramiteId}.`);
    saveState();
    toast("Documento agregado al checklist.");
    go("checklist");
  };

  bindChecklistActions();
}

function pretramite() {
  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Crear pre-trámite</h3>
        <p>Requisito funcional implementado como formulario operativo.</p>
        <form id="preForm" class="form-grid">
          <div><label>Pasajero *</label><input name="pasajero" required></div>
          <div><label>Documento *</label><input name="documento" required></div>
          <div><label>Nacionalidad *</label><input name="nacionalidad" value="Chile" required></div>
          <div><label>Tipo</label><select name="tipo"><option>Salida temporal</option><option>Ingreso</option><option>Tránsito</option></select></div>
          <div><label>Destino *</label><input name="destino" value="Argentina" required></div>
          <div><label>Viaja con menor</label><select name="menor"><option>No</option><option>Sí</option></select></div>
          <div><label>Patente</label><input name="patente" placeholder="ABCD-12"></div>
          <div><label>Estado documental inicial</label><select name="doc"><option>Pendiente</option><option>Aprobado</option><option>Observado</option></select></div>
          <div class="span-2"><label>Observaciones</label><textarea name="obs"></textarea></div>
          <div class="span-2 actions"><button class="btn primary" type="submit">Guardar pre-trámite</button><button class="btn secondary" type="reset">Limpiar</button></div>
        </form>
      </section>
      <section class="table-card">
        <h3>Trámites registrados</h3>
        ${renderTramitesTable(visibleTramites(), currentUser.role !== "Pasajero")}
      </section>
    </div>
  `;
  $("#preForm").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (hasActiveDuplicateDocument(fd.get("documento"))) {
      toast("Ya existe un trámite activo en revisión para ese documento.");
      addLog("Pre-trámite", `Intento bloqueado por duplicidad documental: ${fd.get("documento")}.`);
      return;
    }
    const id = `TR-2026-${String(state.tramites.length + 1).padStart(3, "0")}`;
    const docStatus = fd.get("doc");
    state.tramites.unshift({
      id,
      pasajero: fd.get("pasajero").trim(),
      documento: fd.get("documento").trim(),
      nacionalidad: fd.get("nacionalidad").trim(),
      tipo: fd.get("tipo"),
      destino: fd.get("destino").trim(),
      patente: (fd.get("patente") || "").trim() || "No registra",
      menor: fd.get("menor"),
      doc: docStatus,
      sag: "Pendiente",
      pdi: "Pendiente",
      estado: docStatus === "Observado" ? "Observado" : "En revisión",
      obs: fd.get("obs") || "Sin observaciones.",
      creadoPor: currentUser.email,
      fecha: new Date().toISOString().slice(0, 10)
    });
    addLog("Pre-trámite", `Creación del trámite ${id}.`);
    saveState();
    toast("Pre-trámite creado correctamente.");
    go("pretramite");
  };
  bindGenericApprove();
}


function menores() {
  const dataMenores = visibleMenores();
  const rows = dataMenores.map(m => `
    <tr>
      <td><strong>${m.id}</strong></td>
      <td>${esc(m.tramiteId)}</td>
      <td>${esc(m.nombre)}</td>
      <td>${esc(m.documento)}</td>
      <td>${esc(m.tipoViaje || "No informado")}</td>
      <td>${esc(m.autorizacion)}</td>
      <td>${badge(m.estado)}</td>
      <td>${esc(m.observacion || "Sin observación")}</td>
      ${currentUser.role !== "Pasajero" ? `<td class="actions"><button type="button" class="btn secondary" data-menor-aprobar="${m.id}">Aprobar</button><button type="button" class="btn outline" data-menor-observar="${m.id}">Observar</button></td>` : ""}
    </tr>
  `);

  const headers = ["ID","Trámite","Menor","Documento","Tipo de viaje","Autorización","Estado","Observación"];
  if (currentUser.role !== "Pasajero") headers.push("Acción");

  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Registrar menor de edad</h3>
        <p>Registra el escenario de viaje del menor y valida la autorización correspondiente.</p>
        <form id="menorForm" class="form-grid">
          <div><label>Trámite asociado</label><select name="tramiteId" required>${tramiteOptions()}</select></div>
          <div><label>Nombre del menor *</label><input name="nombre" required placeholder="Ej: Menor Demo"></div>
          <div><label>Documento del menor *</label><input name="documento" required placeholder="RUN, DNI o pasaporte"></div>
          <div><label>Tipo de viaje</label><select name="tipoViaje"><option>Ambos padres presentes</option><option>Viaja con un padre</option><option>Viaja solo o con tercero</option></select></div>
          <div><label>Autorización</label><select name="autorizacion"><option>Ambos padres presentes</option><option>Autorización notarial</option><option>Autorización judicial</option><option>Documento pendiente</option><option>Sin autorización</option></select></div>
          <div><label>Acompañante / tutor</label><input name="acompanante" placeholder="Padre, madre, tutor o tercero responsable"></div>
          <div class="span-2"><label>Respaldo autorización</label><input name="respaldo" placeholder="Código, folio, archivo o referencia del respaldo"></div>
          <div class="span-2"><label>Observación</label><textarea name="observacion" placeholder="Detalle de filiación, tutoría, autorización o motivo de observación."></textarea></div>
          <div class="span-2 actions"><button class="btn primary" type="submit">Validar menor</button><button class="btn secondary" type="reset">Limpiar</button></div>
        </form>
      </section>

      <section class="table-card">
        <h3>Menores registrados</h3>
        ${table(headers, rows)}
      </section>
    </div>
  `;

  $("#menorForm").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const evaluacion = evaluarMenor(fd.get("tipoViaje"), fd.get("autorizacion"), fd.get("respaldo"), fd.get("documento"));

    if (evaluacion.estado === "Bloqueado") {
      showProcessAlert(e.target, evaluacion.observacion, true);
      toast(evaluacion.observacion);
      addLog("Menores de edad", `Flujo bloqueado en trámite ${fd.get("tramiteId")}: ${evaluacion.observacion}`);
      return;
    }

    const item = {
      id: nextId("MEN", state.menores),
      tramiteId: fd.get("tramiteId"),
      nombre: fd.get("nombre").trim(),
      documento: fd.get("documento").trim(),
      tipoViaje: fd.get("tipoViaje"),
      autorizacion: fd.get("autorizacion"),
      acompanante: fd.get("acompanante"),
      respaldo: fd.get("respaldo"),
      estado: evaluacion.estado,
      observacion: fd.get("observacion") || evaluacion.observacion
    };

    state.menores.unshift(item);

    const tramite = state.tramites.find(t => t.id === item.tramiteId);
    if (tramite) {
      tramite.menor = "Sí";
      tramite.doc = item.estado;
      if (item.estado === "Observado") {
        tramite.estado = "Observado";
        tramite.obs = "Trámite observado por documentación de menor de edad.";
      }
    }

    addLog("Menores de edad", `Menor ${item.id} validado en trámite ${item.tramiteId}: ${item.estado}.`);
    saveState();
    toast(item.estado === "Aprobado" ? "Documentación del menor aprobada." : "Menor registrado con observación.");
    go("menores");
  };

  bindMenorActions();
}

function bindMenorActions() {
  $$("[data-menor-aprobar]").forEach(btn => btn.onclick = () => {
    const menor = state.menores.find(m => m.id === btn.dataset.menorAprobar);
    if (!menor) return;
    menor.estado = "Aprobado";
    menor.observacion = "Autorización validada por funcionario.";
    const tramite = state.tramites.find(t => t.id === menor.tramiteId);
    if (tramite) {
      tramite.doc = "Aprobado";
      if (tramite.sag === "Aprobado" && tramite.pdi === "Aprobado") tramite.estado = "Aprobado";
    }
    addLog("Menores de edad", `Menor ${menor.id} aprobado en trámite ${menor.tramiteId}.`);
    saveState();
    toast("Documentación del menor aprobada.");
    go("menores");
  });

  $$("[data-menor-observar]").forEach(btn => btn.onclick = () => {
    const menor = state.menores.find(m => m.id === btn.dataset.menorObservar);
    if (!menor) return;
    menor.estado = "Observado";
    menor.observacion = "Observado por funcionario para revisión de autorización.";
    const tramite = state.tramites.find(t => t.id === menor.tramiteId);
    if (tramite) {
      tramite.doc = "Observado";
      tramite.estado = "Observado";
      tramite.obs = "Trámite observado por autorización de menor.";
    }
    addLog("Menores de edad", `Menor ${menor.id} observado en trámite ${menor.tramiteId}.`);
    saveState();
    toast("Documentación del menor observada.");
    go("menores");
  });
}

function documentacion() {
  const rows = state.menores.map(m => `<tr><td><strong>${m.id}</strong></td><td>${m.tramiteId}</td><td>${esc(m.nombre)}</td><td>${esc(m.documento)}</td><td>${esc(m.autorizacion)}</td><td>${badge(m.estado)}</td></tr>`);
  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Registrar documentación de menor</h3><p class="small">La gestión principal está en el módulo “Menores de edad”. Esta vista queda como apoyo documental para funcionarios.</p>
        <form id="docForm" class="form-grid">
          <div><label>Trámite</label><select name="tramiteId">${tramiteOptions()}</select></div>
          <div><label>Nombre del menor *</label><input name="nombre" required></div>
          <div><label>Documento del menor *</label><input name="documento" required></div>
          <div><label>Tipo de autorización</label><select name="autorizacion"><option>Autorización notarial</option><option>Autorización judicial</option><option>Ambos padres presentes</option><option>Documento pendiente</option><option>Sin autorización</option></select></div>
          <div><label>Estado documental</label><select name="estado"><option>Pendiente</option><option>Aprobado</option><option>Observado</option></select></div>
          <div class="span-2 actions"><button class="btn primary" type="submit">Guardar documentación</button></div>
        </form>
      </section>
      <section class="table-card">
        <h3>Documentación registrada</h3>
        ${table(["ID","Trámite","Menor","Documento","Autorización","Estado"], rows)}
      </section>
    </div>
  `;
  $("#docForm").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const estadoDoc = menorEstadoPorAutorizacion(fd.get("autorizacion"), fd.get("estado"));
    const item = { id: nextId("MEN", state.menores), tramiteId: fd.get("tramiteId"), nombre: fd.get("nombre"), documento: fd.get("documento"), autorizacion: fd.get("autorizacion"), estado: estadoDoc };
    state.menores.unshift(item);
    const t = state.tramites.find(x => x.id === item.tramiteId);
    if (t) {
      t.menor = "Sí";
      t.doc = item.estado;
      if (item.estado === "Observado") t.estado = "Observado";
    }
    addLog("Documentación", `Documentación de menor registrada para ${item.tramiteId}.`);
    saveState();
    toast("Documentación registrada.");
    go("documentacion");
  };
}

function vehiculos() {
  const rows = state.vehiculos.map(v => `
    <tr>
      <td><strong>${v.id}</strong></td>
      <td>${esc(v.tramiteId)}</td>
      <td>${esc(v.patente)}</td>
      <td>${esc(v.chasis || "No informado")}</td>
      <td>${esc(v.conductor || v.titular)}</td>
      <td>${esc(v.tipoVehiculo || "Particular")}</td>
      <td>${esc(v.estadoDocumento || "Vigente")}</td>
      <td>${esc(v.permiso || "Pendiente")}</td>
      <td>${badge(v.estado)}</td>
      <td class="actions"><button type="button" class="btn secondary" data-pdf-veh="${v.id}">Descargar PDF</button></td>
    </tr>
  `);
  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Registrar vehículo</h3>
        <form id="vehForm" class="form-grid" novalidate>
          <div><label>Trámite</label><select name="tramiteId">${tramiteOptions()}</select></div>
          <div><label>Patente *</label><input name="patente"></div>
          <div><label>Chasis *</label><input name="chasis"></div>
          <div><label>Conductor *</label><input name="conductor"></div>
          <div><label>Titular *</label><input name="titular"></div>
          <div><label>Tipo de vehículo</label><select name="tipoVehiculo"><option>Particular</option><option>Diplomático</option><option>Documento argentino</option></select></div>
          <div><label>Movimiento</label><select name="movimiento"><option>Formulario de salida temporal</option><option>Permiso turismo</option><option>Admisión temporal</option><option>Ingreso</option></select></div>
          <div><label>Documento argentino / código</label><input name="documentoArgentino" placeholder="Opcional o requerido para ingreso argentino"></div>
          <div><label>Estado documento</label><select name="estadoDocumento"><option>Vigente</option><option>Inválido</option><option>Vencido</option></select></div>
          <div class="span-2 actions"><button class="btn primary" type="submit">Guardar vehículo</button></div>
        </form>
      </section>
      <section class="table-card">
        <h3>Vehículos registrados</h3>
        ${table(["ID","Trámite","Patente","Chasis","Conductor","Tipo","Documento","Permiso","Estado","PDF"], rows)}
      </section>
    </div>
  `;

  $("#vehForm").onsubmit = (e) => {
    e.preventDefault();
    if (!validateRequiredFields(e.target, ["tramiteId", "patente", "chasis", "conductor", "titular"])) return;

    const fd = new FormData(e.target);
    const evaluacion = evaluarVehiculo(fd.get("tipoVehiculo"), fd.get("estadoDocumento"), fd.get("movimiento"));

    const item = {
      id: nextId("VEH", state.vehiculos),
      tramiteId: fd.get("tramiteId"),
      patente: fd.get("patente"),
      chasis: fd.get("chasis"),
      conductor: fd.get("conductor"),
      titular: fd.get("titular"),
      tipoVehiculo: fd.get("tipoVehiculo"),
      movimiento: fd.get("movimiento"),
      documentoArgentino: fd.get("documentoArgentino") || "No aplica",
      estadoDocumento: fd.get("estadoDocumento"),
      permiso: evaluacion.permiso,
      estado: evaluacion.estado
    };

    state.vehiculos.unshift(item);
    const t = state.tramites.find(x => x.id === item.tramiteId);
    if (t) {
      t.patente = item.patente;
      if (item.estado === "Observado" || item.estado === "Rechazado") {
        t.estado = item.estado;
        t.obs = evaluacion.observacion;
      }
    }
    addLog("Vehículos", `Vehículo ${item.patente} procesado: ${item.permiso}.`);
    saveState();
    toast(evaluacion.observacion);
    go("vehiculos");
  };

  $$("[data-pdf-veh]").forEach(btn => btn.onclick = () => {
    const veh = state.vehiculos.find(v => v.id === btn.dataset.pdfVeh);
    if (!veh) return;
    downloadSimplePdf(`permiso-${veh.id}.pdf`, "Permiso Vehicular SIGA", [
      `ID: ${veh.id}`,
      `Tramite: ${veh.tramiteId}`,
      `Patente: ${veh.patente}`,
      `Chasis: ${veh.chasis || "No informado"}`,
      `Conductor: ${veh.conductor || "No informado"}`,
      `Titular: ${veh.titular || "No informado"}`,
      `Tipo: ${veh.tipoVehiculo || "No informado"}`,
      `Movimiento: ${veh.movimiento || "No informado"}`,
      `Permiso: ${veh.permiso || "Pendiente"}`,
      `Estado: ${veh.estado || "Pendiente"}`,
      `Fecha emision: ${new Date().toLocaleString("es-CL")}`
    ]);
    addLog("Vehículos", `PDF descargado para permiso de vehículo ${veh.id}.`);
    saveState();
  });
}

function sag() {
  const rows = state.sagDecl.map(s => `<tr><td><strong>${s.id}</strong></td><td>${s.tramiteId}</td><td>${esc(s.alimentos)}</td><td>${esc(s.mascotas)}</td><td>${esc(s.detalle)}</td><td>${badge(s.estado)}</td><td>${esc(s.comprobante || "Sin comprobante")}</td></tr>`);
  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Declaración jurada SAG</h3>
        <p class="small">Declaración general de productos regulados. Para detalle de productos o mascotas use los módulos específicos.</p>
        <form id="sagForm" class="form-grid" novalidate>
          <div><label>Trámite</label><select name="tramiteId">${tramiteOptions()}</select></div>
          <div><label>Declara productos regulados *</label><select name="alimentos"><option value="">Seleccione</option><option>No</option><option>Sí</option></select></div>
          <div><label>Declara mascotas *</label><select name="mascotas"><option value="">Seleccione</option><option>No</option><option>Sí</option></select></div>
          <div><label>Tipo de declaración *</label><select name="tipoDeclaracion"><option value="">Seleccione</option><option>Sin productos</option><option>Producto permitido</option><option>Producto prohibido</option></select></div>
          <div class="span-2"><label>Detalle</label><textarea name="detalle" placeholder="Descripción del producto, alimento o motivo de observación"></textarea></div>
          <div class="span-2 actions"><button class="btn primary" type="submit">Enviar declaración SAG</button></div>
        </form>
      </section>
      <section class="table-card">
        <h3>Declaraciones SAG</h3>
        ${table(["ID","Trámite","Productos","Mascotas","Detalle","Estado","Comprobante"], rows)}
      </section>
    </div>
  `;
  $("#sagForm").onsubmit = (e) => {
    e.preventDefault();
    if (!validateRequiredFields(e.target, ["tramiteId", "alimentos", "mascotas", "tipoDeclaracion"])) return;

    const fd = new FormData(e.target);
    const tipo = fd.get("tipoDeclaracion");

    let estado = "Aprobado";
    let comprobante = "Declaración aceptada sin observaciones";
    if (tipo === "Producto permitido") comprobante = "Declaración aceptada con inspección visual";
    if (tipo === "Producto prohibido") {
      estado = "Retenido para inspección";
      comprobante = "Retenido para inspección SAG";
      showProcessAlert(e.target, "Alerta SAG: producto retenido para inspección.", true);
      playAlertSound();
    }

    const item = {
      id: nextId("SAG", state.sagDecl),
      tramiteId: fd.get("tramiteId"),
      alimentos: fd.get("alimentos"),
      mascotas: fd.get("mascotas"),
      detalle: fd.get("detalle") || tipo,
      estado,
      comprobante
    };

    state.sagDecl.unshift(item);
    const t = state.tramites.find(x => x.id === item.tramiteId);
    if (t) {
      t.sag = estado === "Retenido para inspección" ? "Observado" : "Aprobado";
      if (estado === "Retenido para inspección") {
        t.estado = "Observado";
        t.obs = "Trámite observado por retención SAG.";
      }
    }
    addLog("SAG", `Declaración ${item.id} registrada para ${item.tramiteId}: ${item.estado}.`);
    saveState();
    toast(estado === "Aprobado" ? "Declaración SAG aceptada." : "Producto retenido para inspección SAG.");
    if (estado !== "Retenido para inspección") go("sag");
  };
}

function productosSag() {
  const rows = visibleProductosSag().map(p => `
    <tr>
      <td><strong>${p.id}</strong></td>
      <td>${esc(p.tramiteId)}</td>
      <td>${esc(p.tipo)}</td>
      <td>${esc(p.descripcion)}</td>
      <td>${esc(p.condicion)}</td>
      <td>${badge(p.estado)}</td>
      <td>${esc(p.observacion || "Sin observación")}</td>
      ${currentUser.role !== "Pasajero" ? `<td class="actions"><button type="button" class="btn secondary" data-prod-ok="${p.id}">Aprobar</button><button type="button" class="btn outline" data-prod-obs="${p.id}">Observar</button></td>` : ""}
    </tr>
  `);
  const headers = ["ID","Trámite","Tipo","Descripción","Condición","Estado SAG","Observación"];
  if (currentUser.role !== "Pasajero") headers.push("Acción");

  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Productos SAG</h3>
        <p>Registra productos animales, vegetales o alimentos declarados para control SAG.</p>
        <form id="productoSagForm" class="form-grid">
          <div><label>Trámite asociado</label><select name="tramiteId" required>${tramiteOptions()}</select></div>
          <div><label>Tipo de producto</label><select name="tipo"><option>Alimento</option><option>Producto animal</option><option>Producto vegetal</option><option>Otro producto declarado</option></select></div>
          <div class="span-2"><label>Descripción</label><input name="descripcion" required placeholder="Ej: Frutas, lácteos, semillas, carne, producto vegetal"></div>
          <div><label>Condición</label><select name="condicion"><option>Declarado sin observación</option><option>Requiere inspección</option><option>Producto prohibido</option><option>No declarado</option></select></div>
          <div><label>Estado solicitado SAG</label><select name="estado"><option>Pendiente</option><option>Aprobado</option><option>Observado</option></select></div>
          <div class="span-2"><label>Observación</label><textarea name="observacion" placeholder="Detalle de revisión o motivo de observación."></textarea></div>
          <div class="span-2 actions"><button class="btn primary" type="submit">Guardar producto</button></div>
        </form>
      </section>
      <section class="table-card">
        <h3>Productos declarados</h3>
        ${table(headers, rows)}
      </section>
    </div>
  `;

  $("#productoSagForm").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const estadoFinal = estadoProductoSag(fd.get("condicion"), fd.get("estado"));
    const item = {
      id: nextId("PROD", state.productosSag || []),
      tramiteId: fd.get("tramiteId"),
      tipo: fd.get("tipo"),
      descripcion: fd.get("descripcion"),
      condicion: fd.get("condicion"),
      estado: estadoFinal,
      observacion: fd.get("observacion") || (estadoFinal === "Observado" ? "Requiere revisión SAG por condición declarada." : "Sin observación.")
    };
    if (!state.productosSag) state.productosSag = [];
    state.productosSag.unshift(item);

    const tramite = state.tramites.find(t => t.id === item.tramiteId);
    if (tramite) {
      tramite.sag = item.estado;
      if (item.estado === "Observado") {
        tramite.estado = "Observado";
        tramite.obs = "Trámite observado por declaración SAG de producto.";
      }
    }

    addLog("Productos SAG", `Producto ${item.id} asociado al trámite ${item.tramiteId} con estado ${item.estado}.`);
    saveState();
    toast("Producto SAG registrado.");
    go("productosSag");
  };

  bindProductoSagActions();
}

function bindProductoSagActions() {
  $$("[data-prod-ok]").forEach(btn => btn.onclick = () => {
    const item = (state.productosSag || []).find(p => p.id === btn.dataset.prodOk);
    if (!item) return;
    item.estado = "Aprobado";
    item.condicion = "Declarado sin observación";
    item.observacion = "Producto revisado y aprobado por SAG.";
    const tramite = state.tramites.find(t => t.id === item.tramiteId);
    if (tramite) tramite.sag = "Aprobado";
    addLog("Productos SAG", `Producto ${item.id} aprobado.`);
    saveState();
    toast("Producto aprobado por SAG.");
    go("productosSag");
  });
  $$("[data-prod-obs]").forEach(btn => btn.onclick = () => {
    const item = (state.productosSag || []).find(p => p.id === btn.dataset.prodObs);
    if (!item) return;
    item.estado = "Observado";
    item.observacion = "Producto observado por SAG para revisión.";
    const tramite = state.tramites.find(t => t.id === item.tramiteId);
    if (tramite) {
      tramite.sag = "Observado";
      tramite.estado = "Observado";
      tramite.obs = "Trámite observado por producto SAG.";
    }
    addLog("Productos SAG", `Producto ${item.id} observado.`);
    saveState();
    toast("Producto observado.");
    go("productosSag");
  });
}

function mascotas() {
  const dataMascotas = visibleMascotas();
  const rows = dataMascotas.map(m => `
    <tr>
      <td><strong>${m.id}</strong></td>
      <td>${esc(m.tramiteId)}</td>
      <td>${esc(m.nombre)}</td>
      <td>${esc(m.especie)}</td>
      <td>${esc(m.raza || "No informado")}</td>
      <td>${esc(m.responsable || "Mayor de edad")}</td>
      <td>${esc(m.tutorLegal || "No aplica")}</td>
      <td>${esc(m.microchip)}</td>
      <td>${esc(m.certificado)}</td>
      <td>${esc(m.vacuna)}</td>
      <td>${badge(m.estado)}</td>
      <td>${esc(m.observacion || "Sin observación")}</td>
      ${currentUser.role !== "Pasajero" ? `<td class="actions"><button type="button" class="btn secondary" data-mascota-aprobar="${m.id}">Aprobar</button><button type="button" class="btn outline" data-mascota-observar="${m.id}">Observar</button></td>` : ""}
    </tr>
  `);

  const headers = ["ID","Trámite","Mascota","Especie","Raza","Responsable","Tutor legal","Microchip","Certificado","Vacuna","Estado SAG","Observación"];
  if (currentUser.role !== "Pasajero") headers.push("Acción");

  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Declarar mascota</h3>
        <p>Registra mascotas asociadas al trámite y valida la responsabilidad legal del tutor.</p>
        <form id="mascotaForm" class="form-grid">
          <div><label>Trámite asociado</label><select name="tramiteId" required>${tramiteOptions()}</select></div>
          <div><label>Nombre de la mascota *</label><input name="nombre" required placeholder="Ej: Mascota Demo"></div>
          <div><label>Especie</label><select name="especie"><option>Perro</option><option>Gato</option><option>Otro</option></select></div>
          <div><label>Raza</label><input name="raza" placeholder="Ej: Mestizo"></div>
          <div><label>Responsable que declara</label><select name="responsable"><option>Mayor de edad</option><option>Menor de edad</option><option>Representante legal</option></select></div>
          <div><label>Tutor legal</label><input name="tutorLegal" placeholder="Requerido si declara menor o representante"></div>
          <div class="span-2"><label>Autorización / tutela</label><input name="autorizacionTutor" placeholder="Folio, documento o referencia de tutoría"></div>
          <div><label>Microchip</label><select name="microchip"><option>Sí</option><option>No</option><option>No informado</option></select></div>
          <div><label>Certificado sanitario</label><select name="certificado"><option>Vigente</option><option>Pendiente</option><option>Vencido</option><option>No presenta</option></select></div>
          <div><label>Vacuna antirrábica</label><select name="vacuna"><option>Vigente</option><option>Pendiente</option><option>Vencida</option><option>No presenta</option></select></div>
          <div><label>Estado solicitado SAG</label><select name="estado"><option>Pendiente</option><option>Aprobado</option><option>Observado</option></select></div>
          <div class="span-2"><label>Observación</label><textarea name="observacion" placeholder="Detalle de revisión SAG, tutoría o requisito pendiente."></textarea></div>
          <div class="span-2 actions"><button class="btn primary" type="submit">Registrar mascota</button><button class="btn secondary" type="reset">Limpiar</button></div>
        </form>
      </section>

      <section class="table-card">
        <h3>Mascotas declaradas</h3>
        ${table(headers, rows)}
      </section>
    </div>
  `;

  $("#mascotaForm").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const evaluacion = evaluarMascota(fd.get("responsable"), fd.get("tutorLegal"), fd.get("autorizacionTutor"), fd.get("certificado"), fd.get("vacuna"), fd.get("estado"));

    if (evaluacion.estado === "Bloqueado") {
      toast(evaluacion.observacion);
      addLog("Mascotas", `Registro bloqueado por falta de tutor legal en trámite ${fd.get("tramiteId")}.`);
      return;
    }

    const item = {
      id: nextId("MAS", state.mascotas || []),
      tramiteId: fd.get("tramiteId"),
      nombre: fd.get("nombre").trim(),
      especie: fd.get("especie"),
      raza: fd.get("raza") || "No informado",
      responsable: fd.get("responsable"),
      tutorLegal: fd.get("tutorLegal") || "No aplica",
      autorizacionTutor: fd.get("autorizacionTutor") || "No aplica",
      microchip: fd.get("microchip"),
      certificado: fd.get("certificado"),
      vacuna: fd.get("vacuna"),
      estado: evaluacion.estado,
      observacion: fd.get("observacion") || evaluacion.observacion
    };

    if (!state.mascotas) state.mascotas = [];
    state.mascotas.unshift(item);

    const tramite = state.tramites.find(t => t.id === item.tramiteId);
    if (tramite) {
      tramite.sag = item.estado;
      if (item.estado === "Observado") {
        tramite.estado = "Observado";
        tramite.obs = "Trámite observado por declaración de mascota.";
      }
    }

    addLog("Mascotas", `Mascota ${item.id} asociada al trámite ${item.tramiteId}: ${item.estado}.`);
    saveState();
    toast(item.estado === "Aprobado" ? "Mascota registrada correctamente." : "Mascota registrada con observación.");
    go("mascotas");
  };

  bindMascotaActions();
}

function bindMascotaActions() {
  $$("[data-mascota-aprobar]").forEach(btn => btn.onclick = () => {
    const mascota = (state.mascotas || []).find(m => m.id === btn.dataset.mascotaAprobar);
    if (!mascota) return;
    mascota.estado = "Aprobado";
    mascota.certificado = "Vigente";
    mascota.vacuna = "Vigente";
    mascota.observacion = "Documentación sanitaria validada por SAG.";
    const tramite = state.tramites.find(t => t.id === mascota.tramiteId);
    if (tramite) {
      tramite.sag = "Aprobado";
      if (tramite.doc === "Aprobado" && tramite.pdi === "Aprobado") tramite.estado = "Aprobado";
    }
    addLog("Mascotas", `Mascota ${mascota.id} aprobada por SAG en trámite ${mascota.tramiteId}.`);
    saveState();
    toast("Mascota aprobada por SAG.");
    go("mascotas");
  });

  $$("[data-mascota-observar]").forEach(btn => btn.onclick = () => {
    const mascota = (state.mascotas || []).find(m => m.id === btn.dataset.mascotaObservar);
    if (!mascota) return;
    mascota.estado = "Observado";
    mascota.observacion = "Observada por SAG para revisión sanitaria.";
    const tramite = state.tramites.find(t => t.id === mascota.tramiteId);
    if (tramite) {
      tramite.sag = "Observado";
      tramite.estado = "Observado";
      tramite.obs = "Trámite observado por documentación sanitaria de mascota.";
    }
    addLog("Mascotas", `Mascota ${mascota.id} observada por SAG en trámite ${mascota.tramiteId}.`);
    saveState();
    toast("Mascota observada por SAG.");
    go("mascotas");
  });
}

function pdi() {
  const rows = state.tramites.map(t => `
    <tr>
      <td><strong>${t.id}</strong></td>
      <td>${esc(t.pasajero)}</td>
      <td>${esc(t.documento)}</td>
      <td>${badge(t.pdi)}</td>
      <td>${esc(t.obs)}</td>
      <td class="actions"><button type="button" class="btn secondary" data-pdi-ok="${t.id}">Aprobar PDI</button><button type="button" class="btn outline" data-pdi-ob="${t.id}">Observar</button></td>
    </tr>
  `);
  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Validar identidad PDI</h3>
        <p>Escanea o digita el RUN, DNI o pasaporte para validar identidad y vigencia del documento.</p>
        <form id="pdiForm" class="form-grid" novalidate>
          <div><label>Trámite</label><select name="tramiteId">${state.tramites.map(t => `<option value="${t.id}">${t.id} | ${esc(t.pasajero)}</option>`).join("")}</select></div>
          <div><label>Documento escaneado *</label><input name="documento" placeholder="RUN, DNI o pasaporte"></div>
          <div><label>Vigencia del documento</label><select name="vigencia"><option>Vigente</option><option>Vencido</option></select></div>
          <div><label>Consulta migratoria</label><select name="alerta"><option>Sin alerta</option><option>Alerta migratoria</option></select></div>
          <div class="span-2 actions"><button class="btn primary" type="submit">Validar PDI</button></div>
        </form>
      </section>
      <section class="table-card">
        <h3>Control PDI</h3>
        ${table(["Trámite","Pasajero","Documento","Estado PDI","Observaciones","Acción"], rows)}
      </section>
    </div>
  `;
  $("#pdiForm").onsubmit = (e) => {
    e.preventDefault();
    if (!validateRequiredFields(e.target, ["tramiteId", "documento"])) return;

    const fd = new FormData(e.target);
    const t = state.tramites.find(x => x.id === fd.get("tramiteId"));
    if (!t) return;
    const ingresado = String(fd.get("documento")).trim().toLowerCase();
    const real = String(t.documento).trim().toLowerCase();

    if (fd.get("alerta") === "Alerta migratoria" || ingresado.includes("alerta") || ingresado.includes("arraigo")) {
      t.pdi = "Bloqueado";
      t.estado = "Bloqueado";
      t.obs = "Alerta migratoria activa; bloqueo de salida y retención para supervisor PDI.";
      showProcessAlert(e.target, "ALERTA MIGRATORIA ACTIVA: bloquear salida y avisar a supervisor.", true);
      playAlertSound();
      addLog("PDI", `Alerta migratoria activa para trámite ${t.id}.`);
      saveState();
      toast("Alerta migratoria activa. Salida bloqueada.");
      return;
    }

    if (fd.get("vigencia") === "Vencido") {
      t.pdi = "Rechazado";
      t.estado = "Rechazado";
      t.obs = "Documento vencido; tránsito rechazado hasta renovación.";
      showProcessAlert(e.target, "Documento vencido. Tránsito rechazado.", true);
      addLog("PDI", `Documento vencido rechazado para trámite ${t.id}.`);
      saveState();
      toast("Documento vencido. Tránsito rechazado.");
      return;
    }

    if (ingresado === real) {
      t.pdi = "Aprobado";
      t.obs = "Identidad confirmada en control PDI.";
      addLog("PDI", `Identidad validada para trámite ${t.id}.`);
      toast("Identidad confirmada.");
    } else {
      t.pdi = "Observado";
      t.estado = "Observado";
      t.obs = "Documento no coincide con el trámite. Requiere revisión PDI.";
      addLog("PDI", `Identidad observada para trámite ${t.id}.`);
      toast("Documento no coincide; trámite observado.");
    }
    saveState();
    go("pdi");
  };
  $$('[data-pdi-ok]').forEach(btn => btn.onclick = () => updatePdi(btn.dataset.pdiOk, "Aprobado"));
  $$('[data-pdi-ob]').forEach(btn => btn.onclick = () => updatePdi(btn.dataset.pdiOb, "Observado"));
}

function integracion() {
  const rows = state.integraciones.map(i => `<tr><td><strong>${i.organismo}</strong></td><td>${badge(i.estado)}</td><td>${esc(i.ultima)}</td><td><button type="button" class="btn secondary" data-sync="${i.organismo}">Sincronizar</button></td></tr>`);
  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="table-card"><h3>Integración simulada</h3><p>Representa la interoperabilidad con organismos relacionados.</p>${table(["Organismo","Estado","Última sincronización","Acción"], rows)}</section>
      <section class="card"><h3>Organismos relacionados</h3><div class="list"><div class="item"><strong>SAG:</strong> sincronización de declaración fitozoosanitaria.</div><div class="item"><strong>PDI:</strong> sincronización de control migratorio.</div><div class="item"><strong>Aduana Argentina:</strong> interoperabilidad fronteriza simulada.</div></div></section>
    </div>
  `;
  $$('[data-sync]').forEach(btn => btn.onclick = () => {
    const it = state.integraciones.find(x => x.organismo === btn.dataset.sync);
    if (!it) return;
    it.estado = "Sincronizado";
    it.ultima = new Date().toLocaleString("es-CL");
    addLog("Integración", `Sincronización completada con ${it.organismo}.`);
    saveState();
    toast(`Sincronización con ${it.organismo} completada.`);
    go("integracion");
  });
}


function conciliacion() {
  const rows = (state.conciliaciones || []).map(c => `
    <tr>
      <td><strong>${c.id}</strong></td>
      <td>${esc(c.tramiteId)}</td>
      <td>${esc(c.ladoChile)}</td>
      <td>${esc(c.ladoArgentina)}</td>
      <td>${badge(c.estado)}</td>
      <td>${esc(c.observacion || "Sin observación")}</td>
      <td><button type="button" class="btn secondary" data-conciliar="${c.id}">Conciliar</button></td>
    </tr>
  `);
  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Conciliación Argentina</h3>
        <p>Contrasta el estado del trámite entre Chile y la contraparte argentina.</p>
        <form id="concForm" class="form-grid">
          <div><label>Trámite asociado</label><select name="tramiteId" required>${tramiteOptions()}</select></div>
          <div><label>Estado lado Chile</label><select name="ladoChile"><option>Egreso registrado</option><option>Ingreso registrado</option><option>Pendiente de confirmación</option></select></div>
          <div><label>Estado lado Argentina</label><select name="ladoArgentina"><option>Egreso registrado</option><option>Ingreso registrado</option><option>Pendiente de confirmación</option></select></div>
          <div class="span-2"><label>Observación</label><textarea name="observacion" placeholder="Diferencia detectada, coordinación o respaldo manual."></textarea></div>
          <div class="span-2 actions"><button class="btn primary" type="submit">Registrar conciliación</button></div>
        </form>
      </section>
      <section class="table-card">
        <h3>Conciliaciones registradas</h3>
        ${table(["ID","Trámite","Chile","Argentina","Estado","Observación","Acción"], rows)}
      </section>
    </div>
  `;
  $("#concForm").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const item = {
      id: nextId("CON", state.conciliaciones || []),
      tramiteId: fd.get("tramiteId"),
      ladoChile: fd.get("ladoChile"),
      ladoArgentina: fd.get("ladoArgentina"),
      estado: estadoConciliacion(fd.get("ladoChile"), fd.get("ladoArgentina")),
      observacion: fd.get("observacion") || "Sin observación."
    };
    if (!state.conciliaciones) state.conciliaciones = [];
    state.conciliaciones.unshift(item);
    if (item.estado === "Diferencia detectada") {
      const tramite = state.tramites.find(t => t.id === item.tramiteId);
      if (tramite) {
        tramite.estado = "Observado";
        tramite.obs = "Trámite observado por diferencia de conciliación con Argentina.";
      }
    }
    addLog("Conciliación Argentina", `Conciliación ${item.id} registrada para ${item.tramiteId}: ${item.estado}.`);
    saveState();
    toast("Conciliación registrada.");
    go("conciliacion");
  };
  $$("[data-conciliar]").forEach(btn => btn.onclick = () => {
    const item = (state.conciliaciones || []).find(c => c.id === btn.dataset.conciliar);
    if (!item) return;
    item.ladoArgentina = item.ladoChile;
    item.estado = "Conciliado";
    item.observacion = "Estados homologados entre Chile y Argentina.";
    addLog("Conciliación Argentina", `Conciliación ${item.id} marcada como conciliada.`);
    saveState();
    toast("Conciliación actualizada.");
    go("conciliacion");
  });
}

function flujo() {
  const rows = (state.flujoAtencion || []).map(f => `
    <tr>
      <td><strong>${f.id}</strong></td>
      <td>${esc(f.tipoFlujo)}</td>
      <td>${esc(f.ventanilla)}</td>
      <td>${esc(f.prioridad)}</td>
      <td>${badge(f.estado)}</td>
      <td>${esc(f.observacion || "Sin observación")}</td>
      <td class="actions"><button type="button" class="btn secondary" data-flujo-atender="${f.id}">Atender</button><button type="button" class="btn outline" data-flujo-orientar="${f.id}">Derivar orientación</button></td>
    </tr>
  `);
  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Flujo y ventanillas</h3>
        <p>Permite segregar personas, vehículos particulares y camiones para reducir cuellos de botella.</p>
        <form id="flujoForm" class="form-grid">
          <div><label>Tipo de flujo</label><select name="tipoFlujo"><option>Personas</option><option>Vehículos particulares</option><option>Camiones</option><option>Trámite incompleto</option></select></div>
          <div><label>Ventanilla / módulo</label><input name="ventanilla" required placeholder="Ej: V1, V2, C1, Orientación"></div>
          <div><label>Prioridad</label><select name="prioridad"><option>Normal</option><option>Alta</option><option>Crítica</option></select></div>
          <div><label>Estado</label><select name="estado"><option>En espera</option><option>En atención</option><option>Derivado orientación</option><option>Finalizado</option></select></div>
          <div class="span-2"><label>Observación</label><textarea name="observacion" placeholder="Detalle de segregación, sobrecarga o motivo de derivación."></textarea></div>
          <div class="span-2 actions"><button class="btn primary" type="submit">Registrar flujo</button></div>
        </form>
      </section>
      <section class="table-card">
        <h3>Flujos activos</h3>
        ${table(["ID","Tipo","Ventanilla","Prioridad","Estado","Observación","Acción"], rows)}
      </section>
    </div>
  `;
  $("#flujoForm").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const item = {
      id: nextId("FLU", state.flujoAtencion || []),
      tipoFlujo: fd.get("tipoFlujo"),
      ventanilla: fd.get("ventanilla"),
      prioridad: fd.get("prioridad"),
      estado: fd.get("estado"),
      observacion: fd.get("observacion") || "Sin observación."
    };
    if (!state.flujoAtencion) state.flujoAtencion = [];
    state.flujoAtencion.unshift(item);
    addLog("Flujo y ventanillas", `Flujo ${item.id} registrado: ${item.tipoFlujo}.`);
    saveState();
    toast("Flujo registrado.");
    go("flujo");
  };
  $$("[data-flujo-atender]").forEach(btn => btn.onclick = () => {
    const item = (state.flujoAtencion || []).find(f => f.id === btn.dataset.flujoAtender);
    if (!item) return;
    item.estado = "En atención";
    addLog("Flujo y ventanillas", `Flujo ${item.id} enviado a atención.`);
    saveState();
    go("flujo");
  });
  $$("[data-flujo-orientar]").forEach(btn => btn.onclick = () => {
    const item = (state.flujoAtencion || []).find(f => f.id === btn.dataset.flujoOrientar);
    if (!item) return;
    item.estado = "Derivado orientación";
    item.ventanilla = "Orientación";
    item.observacion = "Derivado a orientación para completar antecedentes antes de ventanilla formal.";
    addLog("Flujo y ventanillas", `Flujo ${item.id} derivado a orientación.`);
    saveState();
    go("flujo");
  });
}

function reportes() {
  $("#viewContainer").innerHTML = `
    <section class="table-card">
      <h3>Reportes operacionales</h3>
      <div class="toolbar">
        <div><label>Buscar</label><input id="repQ"></div>
        <div><label>Estado</label><select id="repStatus"><option value="todos">Todos</option><option>En revisión</option><option>Aprobado</option><option>Observado</option></select></div>
        <div><label>Tipo</label><select id="repType"><option value="todos">Todos</option><option>Salida temporal</option><option>Ingreso</option><option>Tránsito</option></select></div>
        <div class="actions"><button type="button" id="repCsv" class="btn primary">Exportar CSV</button><button type="button" id="repExcel" class="btn secondary">Exportar Excel</button><button type="button" id="repPrint" class="btn secondary">Imprimir / PDF</button></div>
      </div>
      <div id="repResults"></div>
    </section>
  `;
  const render = () => {
    const term = $("#repQ").value.toLowerCase();
    const st = $("#repStatus").value;
    const tp = $("#repType").value;
    const data = state.tramites.filter(t => Object.values(t).join(" ").toLowerCase().includes(term) && (st === "todos" || t.estado === st) && (tp === "todos" || t.tipo === tp));
    $("#repResults").innerHTML = renderTramitesTable(data, false);
  };
  ["#repQ", "#repStatus", "#repType"].forEach(sel => $(sel).addEventListener(sel === "#repQ" ? "input" : "change", render));
  $("#repCsv").onclick = () => exportCsv("reporte-tramites-siga.csv", state.tramites);
  $("#repExcel").onclick = () => exportExcel("reporte-tramites-siga.xls", state.tramites);
  $("#repPrint").onclick = () => window.print();
  render();
}

function usuarios() {
  const rows = state.usuarios.map(u => `<tr><td>${u.id}</td><td>${esc(u.nombre)}</td><td>${esc(u.correo)}</td><td>${esc(u.rol)}</td><td>${badge(u.estado)}</td><td><button type="button" class="btn outline" data-user-toggle="${u.id}">${u.estado === "Activo" ? "Desactivar" : "Activar"}</button></td></tr>`);
  $("#viewContainer").innerHTML = `
    <div class="grid grid-2">
      <section class="form-card">
        <h3>Crear usuario</h3>
        <form id="userForm" class="form-grid">
          <div><label>Nombre *</label><input name="nombre" required></div>
          <div><label>Correo *</label><input name="correo" type="email" required></div>
          <div><label>Rol</label><select name="rol"><option>Funcionario Aduanas</option><option>Administrador</option><option>Pasajero</option><option>Inspector SAG</option><option>Control PDI</option></select></div>
          <div><label>Estado</label><select name="estado"><option>Activo</option><option>Inactivo</option></select></div>
          <div class="span-2 actions"><button class="btn primary" type="submit">Crear usuario</button></div>
        </form>
      </section>
      <section class="table-card">
        <h3>Usuarios del sistema</h3>
        ${table(["ID","Nombre","Correo","Rol","Estado","Acción"], rows)}
      </section>
    </div>
  `;
  $("#userForm").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    state.usuarios.push({ id: state.usuarios.length + 1, nombre: fd.get("nombre"), correo: fd.get("correo"), rol: fd.get("rol"), estado: fd.get("estado") });
    addLog("Usuarios", `Usuario ${fd.get("correo")} creado.`);
    saveState();
    toast("Usuario creado.");
    go("usuarios");
  };
  $$('[data-user-toggle]').forEach(btn => btn.onclick = () => {
    const user = state.usuarios.find(u => String(u.id) === btn.dataset.userToggle);
    if (!user) return;
    user.estado = user.estado === "Activo" ? "Inactivo" : "Activo";
    addLog("Usuarios", `Usuario ${user.correo} cambiado a ${user.estado}.`);
    saveState();
    go("usuarios");
  });
}

function bitacora() {
  const rows = state.bitacora.map(b => `<tr><td>${esc(b.fecha)}</td><td>${esc(b.usuario)}</td><td>${esc(b.modulo)}</td><td>${esc(b.accion)}</td></tr>`);
  $("#viewContainer").innerHTML = `
    <section class="table-card">
      <div class="actions"><h3 style="margin-right:auto">Bitácora de trazabilidad</h3><button type="button" id="csvAudit" class="btn secondary">Exportar CSV</button><button type="button" id="resetDemo" class="btn danger">Restablecer datos demo</button></div>
      ${table(["Fecha","Usuario","Módulo","Acción"], rows)}
    </section>
  `;
  $("#csvAudit").onclick = () => exportCsv("bitacora-siga.csv", state.bitacora);
  $("#resetDemo").onclick = () => {
    if (!confirm("¿Restablecer datos de demostración?")) return;
    state = clone(seed);
    saveState();
    toast("Datos de demostración restablecidos.");
    go("dashboard");
  };
}

$("#loginForm").onsubmit = (e) => {
  e.preventDefault();
  const email = $("#email").value.trim().toLowerCase();
  const password = $("#password").value;
  const user = USERS.find(u => u.email === email);
  const record = state.usuarios.find(u => u.correo === email);

  if (!user) {
    $("#loginMsg").textContent = "Acceso denegado: usuario no registrado.";
    addLog("Autenticación", `Intento fallido: usuario no registrado (${email}).`);
    return;
  }
  if (record && record.estado !== "Activo") {
    $("#loginMsg").textContent = "La cuenta está inactiva. Contacte a un administrador.";
    addLog("Autenticación", `Intento bloqueado por usuario inactivo: ${email}.`);
    return;
  }
  if (user.password !== password) {
    $("#loginMsg").textContent = "Contraseña incorrecta.";
    addLog("Autenticación", `Intento fallido por contraseña incorrecta: ${email}.`);
    return;
  }

  $("#loginMsg").textContent = "";
  currentUser = user;
  saveSession();
  addLog("Autenticación", `Inicio de sesión de ${email}.`);
  init();
};
$$('[data-demo]').forEach(btn => btn.onclick = () => {
  $("#email").value = btn.dataset.demo;
  $("#password").value = "1234";
});
$("#logoutBtn").onclick = () => {
  addLog("Autenticación", `Cierre de sesión de ${currentUser.email}.`);
  currentUser = null;
  clearSession();
  init();
};
$("#menuBtn").onclick = () => $("#sidebar").classList.toggle("open");

init();
