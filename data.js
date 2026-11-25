// Malla curricular Derecho 2025 — Universidad Autónoma de Chile
// Fuente: https://admision.uautonoma.cl/content/uploads/2025/01/Malla-Derecho-2025.pdf
// La malla indicada por la universidad es referencial y puede estar sujeta a modificaciones.

const COMPETENCIAS = {
  HC: "Habilidades de Comunicación",
  TE: "Trabajo en Equipo",
  CE: "Comportamiento Ético",
  PC: "Pensamiento Crítico",
  RS: "Responsabilidad Social"
};

const ORDEN_COMPETENCIAS = ["HC", "TE", "CE", "PC", "RS"];

const MALLA = [
  {
    semestre: 1,
    ciclo: "Inicial",
    cursos: [
      { id: "historia-derecho", nombre: "Historia del Derecho", tags: ["CE", "PC"] },
      { id: "historia-evolucion-instituciones-civiles", nombre: "Historia y Evolución de las Instituciones Civiles", tags: ["CE", "PC"] },
      { id: "derecho-politico", nombre: "Derecho Político", tags: ["CE", "PC", "RS"] },
      { id: "introduccion-economia", nombre: "Introducción a la Economía", tags: ["CE", "PC", "RS"] },
      { id: "introduccion-derecho", nombre: "Introducción al Derecho", tags: ["CE", "PC", "RS"] },
      { id: "electivo-comunicacion-1", nombre: "Electivo de Comunicación", tags: ["HC"], tipo: "Electivo" }
    ]
  },
  {
    semestre: 2,
    ciclo: "Inicial",
    cursos: [
      { id: "historia-institucional-chile", nombre: "Historia Institucional de Chile", tags: ["CE", "PC"] },
      { id: "fundamentos-filosoficos-derecho", nombre: "Fundamentos Filosóficos del Derecho", tags: ["CE", "PC"] },
      { id: "teoria-ley-personas", nombre: "Teoría de la Ley y las Personas", tags: ["CE", "PC"] },
      { id: "teoria-constitucional", nombre: "Teoría Constitucional", tags: ["CE", "PC"] },
      { id: "argumentacion-juridica-debate", nombre: "Argumentación Jurídica y Debate", tags: ["HC", "CE", "PC"] },
      { id: "electivo-comunicacion-2", nombre: "Electivo de Comunicación", tags: ["HC"], tipo: "Electivo" }
    ]
  },
  {
    semestre: 3,
    ciclo: "Inicial",
    cursos: [
      { id: "acto-juridico", nombre: "Acto Jurídico", tags: ["CE", "PC"] },
      { id: "organizacion-atribuciones-tribunales", nombre: "Organización y Atribuciones de los Tribunales", tags: ["CE", "PC", "RS"] },
      { id: "derecho-constitucional-organico", nombre: "Derecho Constitucional Orgánico", tags: ["CE", "PC", "RS"] },
      { id: "teoria-delito", nombre: "Teoría del Delito", tags: ["CE", "PC"] },
      { id: "negociacion-etica-profesional", nombre: "Negociación y Ética Profesional", tags: ["TE", "CE", "PC", "RS"] },
      { id: "electivo-desarrollo-pensamiento", nombre: "Electivo de Desarrollo del Pensamiento", tags: ["HC"], tipo: "Electivo" }
    ]
  },
  {
    semestre: 4,
    ciclo: "Inicial",
    cursos: [
      { id: "bienes", nombre: "Bienes", tags: ["PC"] },
      { id: "teoria-proceso", nombre: "Teoría del Proceso", tags: ["PC"] },
      { id: "derechos-garantias-constitucionales", nombre: "Derechos y Garantías Constitucionales", tags: ["CE", "PC", "RS"] },
      { id: "derecho-internacional-publico", nombre: "Derecho Internacional Público", tags: ["CE", "PC"] },
      { id: "teoria-reaccion-penal", nombre: "Teoría de la Reacción Penal", tags: ["CE", "PC", "RS"] },
      { id: "taller-integracion-1", nombre: "Taller de Integración I", tags: ["PC"], tipo: "Taller" }
    ]
  },
  {
    semestre: 5,
    ciclo: "Intermedio",
    cursos: [
      { id: "teoria-obligaciones", nombre: "Teoría de las Obligaciones", tags: ["CE", "PC"] },
      { id: "procedimientos-civiles-cognicion", nombre: "Procedimientos Civiles de Cognición", tags: ["CE", "PC"] },
      { id: "derecho-individual-trabajo", nombre: "Derecho Individual del Trabajo", tags: ["CE", "PC"] },
      { id: "delitos-particular-1", nombre: "Delitos en Particular I", tags: ["CE", "PC"] },
      { id: "electivo-desarrollo-personal", nombre: "Electivo de Desarrollo Personal", tags: ["CE"], tipo: "Electivo" }
    ]
  },
  {
    semestre: 6,
    ciclo: "Intermedio",
    cursos: [
      { id: "fuentes-obligaciones", nombre: "Fuentes de las Obligaciones", tags: ["CE", "PC"] },
      { id: "procedimientos-ejecucion-cautela", nombre: "Procedimientos de Ejecución y Cautela", tags: ["CE", "PC"] },
      { id: "derecho-mercantil", nombre: "Derecho Mercantil", tags: ["CE", "PC"] },
      { id: "derecho-colectivo-trabajo-seguridad-social", nombre: "Derecho Colectivo del Trabajo y Seguridad Social", tags: ["CE", "PC"] },
      { id: "delitos-particular-2", nombre: "Delitos en Particular II", tags: ["CE", "PC"] },
      { id: "electivo-responsabilidad-social", nombre: "Electivo de Responsabilidad Social", tags: ["RS"], tipo: "Electivo" }
    ]
  },
  {
    semestre: 7,
    ciclo: "Intermedio",
    cursos: [
      { id: "derecho-familia", nombre: "Derecho de Familia", tags: ["CE", "PC"] },
      { id: "responsabilidad-civil", nombre: "Responsabilidad Civil", tags: ["CE", "PC", "RS"] },
      { id: "derecho-societario", nombre: "Derecho Societario", tags: ["CE", "PC"] },
      { id: "derecho-administrativo-1", nombre: "Derecho Administrativo I", tags: ["CE", "PC", "RS"] },
      { id: "derecho-procesal-penal", nombre: "Derecho Procesal Penal", tags: ["CE", "PC", "RS"] },
      { id: "taller-litigacion", nombre: "Taller de Litigación", tags: ["HC", "TE", "CE", "PC", "RS"], tipo: "Taller" }
    ]
  },
  {
    semestre: 8,
    ciclo: "Avanzado",
    cursos: [
      { id: "derecho-sucesorio", nombre: "Derecho Sucesorio", tags: ["CE", "PC", "RS"] },
      { id: "procedimientos-especiales-orales", nombre: "Procedimientos Especiales Orales", tags: ["HC", "CE", "PC"] },
      { id: "contratacion-mercantil", nombre: "Contratación Mercantil", tags: ["CE", "PC"] },
      { id: "derecho-administrativo-2", nombre: "Derecho Administrativo II", tags: ["CE", "PC"] },
      { id: "derecho-tributario-1", nombre: "Derecho Tributario I", tags: ["CE", "PC", "RS"] },
      { id: "optativo-especialidad-1", nombre: "Optativo de Especialidad I", tags: ["HC", "CE", "PC"], tipo: "Optativo" },
      { id: "taller-integracion-2", nombre: "Taller de Integración II", tags: ["HC", "TE", "CE", "PC", "RS"], tipo: "Taller" }
    ]
  },
  {
    semestre: 9,
    ciclo: "Avanzado",
    cursos: [
      { id: "recursos", nombre: "Recursos", tags: ["CE", "PC", "RS"] },
      { id: "seminario-investigacion", nombre: "Seminario de Investigación", tags: ["HC", "CE", "PC", "RS"] },
      { id: "reorganizacion-liquidacion-patrimonial", nombre: "Reorganización y Liquidación Patrimonial", tags: ["CE", "PC", "RS"] },
      { id: "derecho-tributario-2", nombre: "Derecho Tributario II", tags: ["CE", "PC", "RS"] },
      { id: "optativo-especialidad-2", nombre: "Optativo de Especialidad II", tags: ["HC", "CE", "PC", "RS"], tipo: "Optativo" },
      { id: "clinica-juridica", nombre: "Clínica Jurídica", tags: ["TE", "CE"], tipo: "Clínica" }
    ]
  },
  {
    semestre: 10,
    ciclo: "Avanzado",
    cursos: [
      { id: "taller-integracion-3", nombre: "Taller de Integración III", tags: ["HC", "TE", "CE", "PC", "RS"], tipo: "Taller" }
    ]
  }
];

const TODOS_LOS_CURSOS = MALLA.flatMap((semestre) =>
  semestre.cursos.map((curso) => ({ ...curso, semestre: semestre.semestre, ciclo: semestre.ciclo }))
);
