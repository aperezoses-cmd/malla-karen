const PERFIL_ACTIVO = typeof PERFIL !== "undefined" && PERFIL && typeof PERFIL === "object" ? PERFIL : null;
const STORAGE_KEY = PERFIL_ACTIVO?.storageKey || "malla-derecho-2025-v1";

const ESTADOS = {
  pendiente: { label: "Pendiente" },
  cursando: { label: "Cursando" },
  aprobado: { label: "Aprobado" },
  reprobado: { label: "Reprobado" }
};

function estadoPorDefecto() {
  const base = {
    minima: PERFIL_ACTIVO?.minima ?? 4,
    registros: {}
  };
  if (!PERFIL_ACTIVO) return base;

  const aprobados = new Set(PERFIL_ACTIVO.semestresAprobados || []);
  const cursando = new Set(PERFIL_ACTIVO.semestresCursando || []);

  TODOS_LOS_CURSOS.forEach((curso) => {
    if (aprobados.has(curso.semestre)) {
      base.registros[curso.id] = { estado: "aprobado", nota: null, comentario: "", auto: false };
    } else if (cursando.has(curso.semestre)) {
      base.registros[curso.id] = { estado: "cursando", nota: null, comentario: "", auto: false };
    }
  });

  return base;
}

const registroPorDefecto = () => ({
  estado: "pendiente",
  nota: null,
  comentario: "",
  auto: false
});

let estado = cargarEstado();
let filtroActual = "todos";
let busquedaActual = "";

const mallaEl = document.getElementById("malla");
const emptyStateEl = document.getElementById("empty-state");
const busquedaEl = document.getElementById("busqueda");
const filtrosEl = document.getElementById("filtros");
const minimaEl = document.getElementById("nota-minima");
const toastEl = document.getElementById("toast");

function cargarEstado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!guardado || typeof guardado !== "object") return estadoPorDefecto();
    return {
      minima: normalizarMinima(guardado.minima),
      registros: guardado.registros && typeof guardado.registros === "object" ? guardado.registros : {}
    };
  } catch (error) {
    return estadoPorDefecto();
  }
}

function guardarEstado() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  } catch (error) {
    mostrarToast("No se pudo guardar en este navegador");
  }
}

function normalizarMinima(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return 4;
  return Math.min(7, Math.max(1, Math.round(numero * 10) / 10));
}

function obtenerRegistro(id) {
  const guardado = estado.registros[id];
  return {
    ...registroPorDefecto(),
    ...(guardado && typeof guardado === "object" ? guardado : {}),
    estado: ESTADOS[guardado?.estado] ? guardado.estado : "pendiente"
  };
}

function ponerRegistro(id, registro) {
  estado.registros[id] = registro;
}

function notaComoNumero(valor) {
  if (valor === "" || valor === null || valor === undefined) return null;
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return null;
  return Math.min(7, Math.max(1, Math.round(numero * 10) / 10));
}

function estadoSegunNota(nota) {
  return nota !== null && nota >= estado.minima ? "aprobado" : "reprobado";
}

function recalcularEstadosPorNota() {
  TODOS_LOS_CURSOS.forEach((curso) => {
    const registro = obtenerRegistro(curso.id);
    if (registro.nota !== null) {
      registro.estado = estadoSegunNota(registro.nota);
      registro.auto = true;
      ponerRegistro(curso.id, registro);
    }
  });
}

function escaparHtml(texto) {
  return String(texto ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatoNota(numero) {
  return numero.toFixed(1).replace(".", ",");
}

function totales() {
  const conteo = { aprobado: 0, cursando: 0, pendiente: 0, reprobado: 0 };
  let sumaNotas = 0;
  let cantidadNotas = 0;

  TODOS_LOS_CURSOS.forEach((curso) => {
    const registro = obtenerRegistro(curso.id);
    conteo[registro.estado] += 1;
    if (registro.nota !== null) {
      sumaNotas += registro.nota;
      cantidadNotas += 1;
    }
  });

  return {
    ...conteo,
    promedio: cantidadNotas ? sumaNotas / cantidadNotas : null,
    total: TODOS_LOS_CURSOS.length
  };
}

function renderResumen() {
  const t = totales();
  const pct = t.total ? Math.round((t.aprobado / t.total) * 100) : 0;

  document.getElementById("stat-aprobados").textContent = t.aprobado;
  document.getElementById("stat-cursando").textContent = t.cursando;
  document.getElementById("stat-pendientes").textContent = t.pendiente;
  document.getElementById("stat-reprobados").textContent = t.reprobado;
  document.getElementById("stat-promedio").textContent = t.promedio === null ? "—" : formatoNota(t.promedio);

  document.getElementById("avance-texto").textContent = `${t.aprobado} / ${t.total} aprobados`;
  document.getElementById("avance-pct").textContent = `${pct}%`;
  document.getElementById("avance-fill").style.width = `${pct}%`;
  document.getElementById("avance-barra").setAttribute("aria-valuenow", String(pct));
}

function progresoSemestre(semestre) {
  const aprobados = semestre.cursos.filter((curso) => obtenerRegistro(curso.id).estado === "aprobado").length;
  return { aprobados, total: semestre.cursos.length, pct: Math.round((aprobados / semestre.cursos.length) * 100) };
}

function htmlTags(curso) {
  const tags = [...curso.tags].sort((a, b) => ORDEN_COMPETENCIAS.indexOf(a) - ORDEN_COMPETENCIAS.indexOf(b));
  const etiquetas = tags.map((tag) => `<span class="tag tag-${tag}" title="${escaparHtml(COMPETENCIAS[tag])}">${tag}</span>`).join("");
  const tipo = curso.tipo ? `<span class="tipo">${escaparHtml(curso.tipo)}</span>` : "";
  return etiquetas + tipo;
}

function htmlCurso(curso, indice) {
  const registro = obtenerRegistro(curso.id);
  const opciones = Object.entries(ESTADOS)
    .map(([valor, datos]) => `<option value="${valor}"${valor === registro.estado ? " selected" : ""}>${datos.label}</option>`)
    .join("");

  return `
    <article class="curso ${registro.estado}" data-id="${escaparHtml(curso.id)}">
      <div class="curso-top">
        <h4 class="curso-nombre"><span class="curso-num">${String(indice + 1).padStart(2, "0")}</span>${escaparHtml(curso.nombre)}</h4>
        <span class="estado ${registro.estado}">${ESTADOS[registro.estado].label}</span>
      </div>
      <div class="tags">${htmlTags(curso)}</div>
      <div class="curso-controles">
        <label class="campo">
          <span>Nota</span>
          <input type="number" data-campo="nota" min="1" max="7" step="0.1" inputmode="decimal"
                 value="${registro.nota === null ? "" : registro.nota}" placeholder="—" aria-label="Nota de ${escaparHtml(curso.nombre)}">
        </label>
        <label class="campo">
          <span>Estado</span>
          <select data-campo="estado" aria-label="Estado de ${escaparHtml(curso.nombre)}">${opciones}</select>
        </label>
      </div>
      <textarea class="comentario" data-campo="comentario" rows="1"
                placeholder="Anotación (opcional)" aria-label="Anotación de ${escaparHtml(curso.nombre)}">${escaparHtml(registro.comentario)}</textarea>
    </article>`;
}

function cursoEsVisible(curso) {
  const registro = obtenerRegistro(curso.id);
  const coincideTexto = curso.nombre.toLocaleLowerCase("es").includes(busquedaActual);
  const coincideEstado = filtroActual === "todos" || registro.estado === filtroActual;
  return coincideTexto && coincideEstado;
}

function renderMalla() {
  let visibles = 0;
  const html = MALLA.map((semestre) => {
    const cursos = semestre.cursos.map((curso, indice) => ({ curso, indice })).filter(({ curso }) => cursoEsVisible(curso));
    if (!cursos.length) return "";
    visibles += cursos.length;
    const progreso = progresoSemestre(semestre);

    return `
      <section class="semestre" data-semestre="${semestre.semestre}" aria-label="Semestre ${semestre.semestre}">
        <div class="semestre-head">
          <div class="semestre-title">
            <h3>${semestre.semestre}° Semestre</h3>
            <span>Ciclo ${semestre.ciclo}</span>
          </div>
          <div class="semestre-sub">
            <span class="semestre-conteo">${progreso.aprobados}/${progreso.total} aprobados</span>
            <span>${progreso.pct}%</span>
          </div>
          <div class="semestre-track"><div class="semestre-fill" style="width:${progreso.pct}%"></div></div>
        </div>
        ${cursos.map(({ curso, indice }) => htmlCurso(curso, indice)).join("")}
      </section>`;
  }).join("");

  mallaEl.innerHTML = html;
  emptyStateEl.hidden = visibles > 0;
}

function render() {
  minimaEl.value = estado.minima;
  renderResumen();
  renderMalla();
}

function actualizarTarjeta(card, id) {
  const registro = obtenerRegistro(id);
  card.classList.remove(...Object.keys(ESTADOS));
  card.classList.add(registro.estado);
  const badge = card.querySelector(".estado");
  badge.className = `estado ${registro.estado}`;
  badge.textContent = ESTADOS[registro.estado].label;
}

function actualizarProgresosSemestres() {
  MALLA.forEach((semestre) => {
    const seccion = mallaEl.querySelector(`[data-semestre="${semestre.semestre}"]`);
    if (!seccion) return;
    const progreso = progresoSemestre(semestre);
    seccion.querySelector(".semestre-conteo").textContent = `${progreso.aprobados}/${progreso.total} aprobados`;
    seccion.querySelector(".semestre-fill").style.width = `${progreso.pct}%`;
    seccion.querySelector(".semestre-sub span:last-child").textContent = `${progreso.pct}%`;
  });
}

function mostrarToast(mensaje) {
  toastEl.textContent = mensaje;
  toastEl.classList.add("visible");
  clearTimeout(mostrarToast.timer);
  mostrarToast.timer = setTimeout(() => toastEl.classList.remove("visible"), 2400);
}

function aplicarPerfil() {
  if (!PERFIL_ACTIVO) return;

  document.title = PERFIL_ACTIVO.titulo || document.title;

  const chip = document.getElementById("perfil-chip");
  if (chip) {
    chip.hidden = false;
    chip.textContent = PERFIL_ACTIVO.chip || `${PERFIL_ACTIVO.nombre} · ${PERFIL_ACTIVO.anioTexto || ""}`.trim();
  }

  const titulo = document.getElementById("resumen-titulo");
  if (titulo) titulo.textContent = PERFIL_ACTIVO.tituloResumen || `Avance de ${PERFIL_ACTIVO.nombre}`;

  const eyebrow = document.querySelector(".eyebrow");
  if (eyebrow && PERFIL_ACTIVO.anioTexto) {
    eyebrow.textContent = `${PERFIL_ACTIVO.nombre} · ${PERFIL_ACTIVO.anioTexto}`;
  }

  const textoHero = document.querySelector(".hero-text");
  if (textoHero && PERFIL_ACTIVO.textoHero) textoHero.textContent = PERFIL_ACTIVO.textoHero;
}

mallaEl.addEventListener("input", (evente) => {
  const campo = evente.target.dataset.campo;
  const card = evente.target.closest(".curso");
  if (!card || !campo) return;

  const id = card.dataset.id;
  const registro = obtenerRegistro(id);

  if (campo === "nota") {
    const nota = notaComoNumero(evente.target.value);
    registro.nota = nota;
    if (nota === null) {
      if (registro.auto) {
        registro.estado = "pendiente";
        registro.auto = false;
      }
    } else {
      registro.estado = estadoSegunNota(nota);
      registro.auto = true;
    }
    ponerRegistro(id, registro);
    actualizarTarjeta(card, id);
    renderResumen();
    actualizarProgresosSemestres();
    guardarEstado();
    return;
  }

  if (campo === "comentario") {
    registro.comentario = evente.target.value;
    ponerRegistro(id, registro);
    guardarEstado();
  }
});

mallaEl.addEventListener("change", (evente) => {
  if (evente.target.dataset.campo !== "estado") return;
  const card = evente.target.closest(".curso");
  if (!card) return;
  const id = card.dataset.id;
  const registro = obtenerRegistro(id);
  registro.estado = evente.target.value;
  registro.auto = false;
  ponerRegistro(id, registro);
  actualizarTarjeta(card, id);
  renderResumen();
  actualizarProgresosSemestres();
  guardarEstado();
});

busquedaEl.addEventListener("input", (evente) => {
  busquedaActual = evente.target.value.trim().toLocaleLowerCase("es");
  renderMalla();
});

filtrosEl.addEventListener("click", (evente) => {
  const boton = evente.target.closest("[data-filtro]");
  if (!boton) return;
  filtroActual = boton.dataset.filtro;
  filtrosEl.querySelectorAll(".chip").forEach((chip) => chip.classList.toggle("active", chip === boton));
  renderMalla();
});

minimaEl.addEventListener("change", (evente) => {
  estado.minima = normalizarMinima(evente.target.value);
  evente.target.value = estado.minima;
  recalcularEstadosPorNota();
  guardarEstado();
  render();
  mostrarToast(`Nota mínima actualizada a ${formatoNota(estado.minima)}`);
});

document.getElementById("btn-exportar").addEventListener("click", () => {
  const contenido = JSON.stringify({ version: 1, ...estado }, null, 2);
  const url = URL.createObjectURL(new Blob([contenido], { type: "application/json" }));
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = "progreso-malla-derecho.json";
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(url);
  mostrarToast("Progreso exportado");
});

document.getElementById("btn-importar").addEventListener("click", () => {
  document.getElementById("archivo-importar").click();
});

document.getElementById("archivo-importar").addEventListener("change", async (evente) => {
  const archivo = evente.target.files?.[0];
  if (!archivo) return;
  try {
    const datos = JSON.parse(await archivo.text());
    if (!datos || typeof datos.registros !== "object") throw new Error("Formato inválido");
    const idsValidos = new Set(TODOS_LOS_CURSOS.map((curso) => curso.id));
    const registros = {};
    Object.entries(datos.registros).forEach(([id, registro]) => {
      if (!idsValidos.has(id) || !registro || typeof registro !== "object") return;
      registros[id] = {
        estado: ESTADOS[registro.estado] ? registro.estado : "pendiente",
        nota: notaComoNumero(registro.nota),
        comentario: typeof registro.comentario === "string" ? registro.comentario : "",
        auto: Boolean(registro.auto)
      };
    });
    estado = { minima: normalizarMinima(datos.minima), registros };
    guardarEstado();
    render();
    mostrarToast("Progreso importado");
  } catch (error) {
    mostrarToast("El archivo no tiene un formato válido");
  }
  evente.target.value = "";
});

document.getElementById("btn-reiniciar").addEventListener("click", () => {
  if (!confirm("¿Reiniciar todas tus notas, estados y anotaciones?")) return;
  estado = estadoPorDefecto();
  guardarEstado();
  render();
  mostrarToast("Progreso reiniciado");
});

aplicarPerfil();
if (PERFIL_ACTIVO && !localStorage.getItem(STORAGE_KEY)) guardarEstado();
render();
