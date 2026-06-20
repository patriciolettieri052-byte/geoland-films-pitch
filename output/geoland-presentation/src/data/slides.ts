export interface SlideData {
  id: number;
  title?: string;
  overline?: string;
  text: string;
  backgroundMedia: string;
  isTitleBlue?: boolean;
  overlayOpacity?: number;
  isBold?: boolean;
  isItalic?: boolean;
  titleSize?: string;
  variant?: "subtitulo" | "titulo" | "portada" | "portada81" | "portadafinal" | "texto" | "barras" | "barras-pro" | "apertura" | "apertura2" | "hub" | "backtest-stats" | "backtest-cities" | "numeric" | "business-units" | "reviews" | "neural-map" | "titulo-grande" | "titulo-chico" | "advisors" | "roadmap" | "soluciones-grid" | "diagrama-fuentes" | "diagrama-expansion" | "market" | "texto-arriba" | "titulo-cuerpo-bold" | "validation-hud";
  align?: "left" | "center" | "right" | "center-left";
  maxWidth?: string;
  ctaUrl?: string;
  ctaText?: string;
  footer?: string;
}

export const slides: SlideData[] = [
  {
    id: 1,
    title: "PROBLEM",
    text: "",
    variant: "titulo-grande",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 2,
    title: "EN EL MUNDO SE GENERAN 402M DE TERABYTES DE INFORMACIÓN POR DÍA.",
    text: "Pero las decisiones más importantes todavía dependen de sistemas fragmentados.<br/>— Exploding Topics.",
    variant: "titulo-grande",
    backgroundMedia: "3.mp4",
    overlayOpacity: 45,
    maxWidth: "1000px"
  },
  {
    id: 3,
    title: "",
    text: "30% | IDC | Tiempo perdido por profesionales buscando y organizando información ;; 40% | Techdata | De empresas reporta pérdidas por datos fragmentados.",
    variant: "numeric",
    backgroundMedia: "4.mp4",
    overlayOpacity: 45
  },
  {
    id: 4,
    title: "3% DEL BENEFICIO ANUAL PERDIDO",
    text: "Por malas decisiones y datos fragmentados.<br/>— Gartner.",
    variant: "titulo-grande",
    backgroundMedia: "5.mp4",
    overlayOpacity: 45
  },
  {
    id: 5,
    title: "USD 95B DE PÉRDIDAS EN LOGÍSTICA",
    text: "Por año sólo en Estados Unidos por ineficiencias.<br/>— McKinsey.",
    variant: "titulo-grande",
    backgroundMedia: "6.mp4",
    overlayOpacity: 45
  },
  {
    id: 6,
    title: "USD 11B DE PÉRDIDAS EN LA INDUSTRIA AÉREA",
    text: "En 2025 por ineficiencias operativas y fragmentación en supply chain.<br/>— IATA + Oliver Wyman.",
    variant: "titulo-grande",
    backgroundMedia: "7.mp4",
    overlayOpacity: 45
  },
  {
    id: 7,
    title: "EN CINE, UN SOLO DÍA DE RETRASO PUEDE SIGNIFICAR CIENTOS DE MILES DE EUROS PERDIDOS.",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "8.mp4",
    overlayOpacity: 45
  },
  {
    id: 8,
    title: "EN UN MERCADO GLOBAL DE USD 360B ANUALES.",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "9.png",
    overlayOpacity: 45
  },
  {
    id: 9,
    title: "+300.000 PRODUCTORAS EN EL MUNDO",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "10.png",
    overlayOpacity: 45
  },
  {
    id: 10,
    title: "+9.500 PELICULAS A NIVEL GLOBAL POR AÑO",
    text: "SIN CONTAR: series, publicidad, branded content, eventos, fashion productions,<br/>streaming content.",
    variant: "titulo-grande",
    backgroundMedia: "11.png",
    overlayOpacity: 45
  },
  {
    id: 11,
    title: "MILLONES DE LOCACIONES Y DECISIONES<br/>OPERACIONALES CADA AÑO.",
    text: "Eso significa:",
    variant: "texto-arriba",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 12,
    title: "MERCADO FRAGMENTADO",
    text: "Hoy las búsquedas de locaciones operan de forma fragmentada, combinando<br/>scouts, referencias visuales, contactos y análisis humanos en procesos que pueden<br/>llevar semanas o incluso meses para encontrar la locación adecuada.",
    variant: "titulo-chico",
    backgroundMedia: "13.png",
    overlayOpacity: 45
  },
  {
    id: 13,
    title: "EL PROBLEMA REAL",
    text: "<strong>La industria NO tiene un sistema global de decisión estandarizado.</strong><br/>Tiene: imágenes, bases dispersas, scouts, intuición, contactos, y mucha fricción.",
    variant: "titulo-chico",
    backgroundMedia: "14.mp4",
    overlayOpacity: 45
  },
  {
    id: 14,
    title: "NINGUNA ORGANIZA LA DECISIÓN OPERACIONAL COMPLETA.",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "15.mp4",
    overlayOpacity: 45
  },
  {
    id: 15,
    title: "THE IDEA",
    text: "",
    variant: "titulo-grande",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 16,
    title: "DURANTE AÑOS, LAS EMPRESAS CONSTRUYERON SISTEMAS PARA ALMACENAR DATOS.",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "17.mp4",
    overlayOpacity: 45
  },
  {
    id: 17,
    title: "DESPUÉS, PARA PROCESARLOS.",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "18.mp4",
    overlayOpacity: 45
  },
  {
    id: 18,
    title: "AHORA, VIENE LA CAPA QUE FALTA.",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 19,
    title: "LA DE DECISIÓN.",
    text: "Los datos por sí solos no hacen al mundo más inteligente.<br/>Las decisiones que tomamos con ellos sí.",
    variant: "titulo-grande",
    backgroundMedia: "20.mp4",
    overlayOpacity: 45
  },
  {
    id: 20,
    title: "PRESENTAMOS:",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 21,
    text: "",
    variant: "portada",
    backgroundMedia: "22.mp4",
    overlayOpacity: 45
  },
  {
    id: 22,
    title: "DECISION SYSTEM FOR FILM PRODUCTION",
    text: "Un sistema de inteligencia de decisión para producción cinematográfica que combina la comprensión contextual de la IA con el rigor del software de precisión, diseñado para encontrar la mejor locación para cada escena, cruzando lo que la producción busca visualmente con lo que realmente necesita para rodar: permisos, costos, logística, clima, luz e infraestructura.",
    variant: "titulo-chico",
    backgroundMedia: "23.png",
    overlayOpacity: 45,
    align: "right",
    maxWidth: "780px"
  },
  {
    id: 23,
    title: "NO ES UN PORTAL.<br/>NO ES UN DASHBOARD.<br/>NO ES UNA HERRAMIENTA DE BÚSQUEDA.",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "",
    overlayOpacity: 0,
    align: "center-left"
  },
  {
    id: 24,
    title: "",
    text: "Puedes iniciar un análisis describiendo una escena, conversando con el agente, subiendo una referencia visual o cargando un guion técnico.",
    variant: "texto",
    backgroundMedia: "25.png",
    overlayOpacity: 35,
    align: "left",
    maxWidth: "600px"
  },
  {
    id: 25,
    title: "",
    text: "Luego, el <strong>Production Strategy Vector</strong> transforma las necesidades de la escena en un perfil inteligente para comparar locaciones por viabilidad, eficiencia y compatibilidad real de producción.",
    variant: "texto",
    backgroundMedia: "26.png",
    overlayOpacity: 35,
    align: "right",
    maxWidth: "600px"
  },
  {
    id: 26,
    title: "",
    text: "GEOLAND organiza los resultados en cards inteligentes, rankeadas por G-Score y alineadas con las prioridades reales de producción.",
    variant: "texto",
    backgroundMedia: "27.png",
    overlayOpacity: 35,
    align: "left",
    maxWidth: "600px"
  },
  {
    id: 27,
    title: "",
    text: "Al seleccionar una card, GEOLAND abre un dashboard profundo con el análisis completo de la locación: G-Score, costes, luz, permisos, riesgos, viabilidad y próximos pasos.",
    variant: "texto",
    backgroundMedia: "28.png",
    overlayOpacity: 35,
    align: "right",
    maxWidth: "660px"
  },
  {
    id: 28,
    title: "",
    text: "<strong>Mis Proyectos</strong> centraliza escenas, búsquedas y locaciones guardadas en un espacio operativo con avances, permisos, equipo local, logística y próximos pasos.",
    variant: "texto",
    backgroundMedia: "29.png",
    overlayOpacity: 35,
    align: "left",
    maxWidth: "600px"
  },
  {
    id: 29,
    title: "",
    text: "Incluso, puedes activar una locación y contactar desde GEOLAND a profesionales verificados para validarla, prepararla y convertirla en una opción lista para rodar.",
    variant: "texto",
    backgroundMedia: "30.png",
    overlayOpacity: 35,
    align: "right",
    maxWidth: "600px"
  },
  {
    id: 30,
    title: "PROOF",
    text: "",
    variant: "titulo-grande",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 31,
    title: "La locación linda que arruina el rodaje.",
    text: "Una plaza histórica en Praga obtiene un match visual de 97%, pero GEOLAND detecta que el ángulo solar en la semana de rodaje genera sombras duras exactamente durante la ventana prevista de cámara, además de alto flujo turístico entre las 10:30 y las 13:00. El sistema recomienda una plaza secundaria con 91% de similitud visual, pero con mejor orientación solar, menor tráfico peatonal, acceso lateral para camiones técnicos y permisos más rápidos. Visualmente era apenas inferior; productivamente era muy superior.",
    variant: "titulo-cuerpo-bold",
    backgroundMedia: "32.mp4",
    overlayOpacity: 45,
    align: "left",
    maxWidth: "650px"
  },
  {
    id: 32,
    title: "Continuidad visual entre ciudades distintas.",
    text: "El guion pide París, Viena y una ciudad alpina, pero GEOLAND detecta que varias escenas pueden resolverse en un único cluster operativo en Budapest y alrededores, manteniendo continuidad visual europea mediante calles, fachadas, interiores institucionales y rooftops compatibles. El sistema reduce cambios de ciudad, evita traslados largos, reutiliza iluminación, concentra permisos y mantiene una coherencia estética que el espectador no percibiría como sustitución. Eso convierte tres países en una operación mucho más simple.",
    variant: "titulo-cuerpo-bold",
    backgroundMedia: "33.mp4",
    overlayOpacity: 45,
    align: "right",
    maxWidth: "650px"
  },
  {
    id: 33,
    title: "El rebate que no conviene.",
    text: "Una producción quiere elegir una ciudad por su incentivo fiscal más alto, pero GEOLAND calcula que la distancia entre locaciones, la falta de proveedores técnicos cercanos y la complejidad de permisos anulan gran parte del beneficio. Recomienda otra ciudad con menor rebate, pero con estudios, rental houses, hoteles, crew local, hospitales y accesos logísticos dentro de un radio de 25 minutos.  El sistema demuestra que el \"mejor incentivo\" no siempre es la mejor decisión económica. Y en segundos.",
    variant: "titulo-cuerpo-bold",
    backgroundMedia: "34.mp4",
    overlayOpacity: 45,
    align: "left",
    maxWidth: "650px"
  },
  {
    id: 34,
    title: "CADA OPERACIÓN ALIMENTA Y MEJORA EL SISTEMA",
    text: "Combinando: Workflows operacionales / Operational Memory / Scoring propietario / Datasets contextuales / Orquestación vertical especializada / Lógica de producción / Inteligencia acumulativa.",
    variant: "titulo-grande",
    backgroundMedia: "35.png",
    overlayOpacity: 45,
    align: "right",
    maxWidth: "650px"
  },
  {
    id: 35,
    title: "FUENTES DE DATOS DEL SISTEMA",
    text: "Toda esta información se cruza con el PSV para recomendar qué locación conviene,<br/>por qué, con qué riesgos, a qué coste y cómo hacerla filmable.",
    variant: "diagrama-fuentes",
    backgroundMedia: "",
    overlayOpacity: 70
  },
  {
    id: 36,
    title: "MARKET",
    text: "",
    variant: "titulo-grande",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 37,
    title: "TAMAÑO DE MERCADO",
    text: "TAM | 300.000 COMPAÑÍAS | TOTAL ADDRESSABLE MARKET - Mercado total potencial global ;; SAM | 60.000 COMPAÑÍAS | SERVICEABLE AVAILABLE MARKET - Compañías que realizan producciones de forma recurrente, gestionan múltiples locaciones y enfrentan decisiones complejas de producción, logistica, permisos, costes y viabilidad ;; SOM | 2.000 - 4.000 COMPAÑÍAS (3% al 6.7% del SAM) | SERVICEABLE OBTAINABLE MARKET - Mercado capturable realista",
    variant: "market",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 38,
    title: "LAS SOLUCIONES ACTUALES<br/>RESUELVEN PARTES AISLADAS DEL PROCESO",
    text: "ShotDeck | Solo referencias visuales ;; Set Scouter | Marketplace de locaciones ;; StudioBinder | Planificacion de produccion ;; Wrapbook | Payroll y operaciones ;; Reel-Scout | Solo bases de locaciones ;; Production HUB | Directorio industrial",
    variant: "soluciones-grid",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 39,
    title: "NINGUNA ORGANIZA LA DECISIÓN OPERACIONAL COMPLETA.",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 40,
    title: "BUILT TO SCALE.<br/>ONE SYSTEM. MULTIPLE INDUSTRIES.",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 41,
    title: "80% UNIVERSAL. 20% ADAPTABLE.",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "Para la 41.mp4",
    overlayOpacity: 45
  },
  {
    id: 42,
    title: "GEOLAND ES PARA PRODUCTION FILM.",
    text: "Pero el motor central es común para otras verticales en un futuro: scoring,<br/>agentes, variables, contexto, análisis comparativo, visión computacional,<br/>verificación y explicación.",
    variant: "titulo-grande",
    backgroundMedia: "43.mp4",
    overlayOpacity: 45
  },
  {
    id: 43,
    title: "",
    text: "Pudiendo más adelante, adaptar el contexto operacional.",
    variant: "texto",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 44,
    title: "REAL ESTATE AND FARMLAND",
    text: "ROI / IRR / NOI, RIESGO Y CONTEXTO MACRO, REGULACIÓN Y FISCALIDAD, COMPARABLES GLOBALES, DEMANDA Y CRECIMIENTO, UBICACIÓN Y CONECTIVIDAD, COSTES OPERATIVOS, VISIÓN COMPUTACIONAL DEL ACTIVO, ESTRATEGIAS DE INVERSIÓN, TIMING DE MERCADO.",
    variant: "diagrama-expansion",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 45,
    title: "AVIATION & AERONAUTICS",
    text: "RUTAS Y SLOTS, CLIMA Y CONDICIONES OPERATIVAS, COMBUSTIBLE Y COSTES, MANTENIMIENTO Y DISPONIBILIDAD, ASIGNACIÓN DE TRIPULACIÓN, RIESGO OPERATIVO, TIMING Y EFICIENCIA, COORDINACIÓN MULTI-SISTEMA, DISPONIBILIDAD DE ASSETS, OPTIMIZACIÓN OPERACIONAL.",
    variant: "diagrama-expansion",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 46,
    title: "LOGISTICS & SUPPLY CHAIN",
    text: "RUTAS Y TIEMPOS OPERATIVOS, COSTES LOGÍSTICOS, CONGESTIÓN Y CAPACIDAD, CLIMA Y RIESGO OPERATIVO, RIESGO GEOPOLÍTICO, PUERTOS - HUBS Y NODOS CRÍTICOS, DISTRIBUCIÓN DE ASSETS, SUPPLY CHAIN FRAGMENTATION, OPTIMIZACIÓN MULTI-VARIABLE, EFICIENCIA OPERACIONAL.",
    variant: "diagrama-expansion",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 47,
    title: "RETAIL EXPANSION",
    text: "DEMOGRAFÍA Y CONSUMO, TRÁFICO Y MOVILIDAD, COMPETENCIA Y SATURACIÓN, COSTES INMOBILIARIOS, POTENCIAL COMERCIAL, CRECIMIENTO URBANO, INGRESOS Y CONTEXTO ECONÓMICO, ACCESIBILIDAD Y CONECTIVIDAD, RIESGO OPERATIVO, EXPANSIÓN MULTI-CIUDAD.",
    variant: "diagrama-expansion",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 48,
    title: "EL PATRÓN ES SIEMPRE EL MISMO:",
    text: "Datos fragmentados -> análisis complejo -> decisión clara.",
    variant: "titulo-grande",
    backgroundMedia: "49.mp4",
    overlayOpacity: 45
  },
  {
    id: 49,
    title: "TEAM",
    text: "",
    variant: "titulo-grande",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 50,
    title: "",
    text: `<div class='flex flex-col md:flex-row gap-16 justify-center items-start w-full max-w-[1200px] mx-auto mt-4'><div class='flex flex-col items-center text-center w-full md:w-1/2'><img src='team/pato_transparent.png' class='w-48 h-48 md:w-64 md:h-64 object-cover object-top mb-8 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]' /><h3 style="font-family:'League Gothic',sans-serif;font-size:1.5rem;letter-spacing:0.12em;" class='text-white mb-2 uppercase'>Patricio Lettieri</h3><h4 class='text-geoland-blue tracking-[0.2em] text-[10px] md:text-xs uppercase mb-6' style="font-family:'Arimo',sans-serif;">Co-Founder - Data Infrastucture</h4><p style="font-family:'Arimo',sans-serif;" class='text-white/60 text-xs md:text-sm leading-relaxed font-light text-center'>Especialista en data, análisis e IA aplicada, con más de 15 años de experiencia en marketing analítico y operaciones estratégicas para marcas como John Deere y Porsche. En GEOLAND conecta fuentes de datos, modelos inteligentes y ejecución operativa para transformar información compleja en decisiones claras y accionables.</p></div><div class='flex flex-col items-center text-center w-full md:w-1/2'><img src='team/pepe_transparent.png' class='w-48 h-48 md:w-64 md:h-64 object-cover object-top mb-8 scale-[1.15] origin-top [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]' /><h3 style="font-family:'League Gothic',sans-serif;font-size:1.5rem;letter-spacing:0.12em;" class='text-white mb-2 uppercase'>José Luis Curcio</h3><h4 class='text-geoland-blue tracking-[0.2em] text-[10px] md:text-xs uppercase mb-6' style="font-family:'Arimo',sans-serif;">Co-Founder, Product vision & Strategy</h4><p style="font-family:'Arimo',sans-serif;" class='text-white/60 text-xs md:text-sm leading-relaxed font-light text-center'>Publicista, estratega y director creativo con más de 18 años innovando para marcas globales como Coca-Cola, Ford y Samsung. Desde su experiencia en campañas y rodajes internacionales, conceptualizó GEOLAND y hoy lidera la visión, el diseño estratégico y la orquestación del equipo para convertir creatividad, tecnología y complejidad operativa en un sistema de inteligencia de decisión.</p></div></div>`,
    backgroundMedia: "",
    overlayOpacity: 0,
    align: "center",
    maxWidth: "1400px"
  },
  {
    id: 51,
    title: "",
    text: `<div class='flex flex-col md:flex-row gap-16 justify-center items-start w-full max-w-[1200px] mx-auto mt-4'><div class='flex flex-col items-center text-center w-full md:w-1/2'><img src='team/juancarlos_transparent.png' class='w-48 h-48 md:w-64 md:h-64 object-cover object-top mb-8 scale-[1.25] origin-top [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]' /><h3 style="font-family:'League Gothic',sans-serif;font-size:1.5rem;letter-spacing:0.12em;" class='text-white mb-2 uppercase'>Juan Carlos Casalderrey</h3><h4 class='text-geoland-blue tracking-[0.2em] text-[10px] md:text-xs uppercase mb-6' style="font-family:'Arimo',sans-serif;">Partner - Engineering / Mythology Labs</h4><p style="font-family:'Arimo',sans-serif;" class='text-white/60 text-xs md:text-sm leading-relaxed font-light text-center'>Formado en Arquitectura y Diseño de Sistemas y Contratos Complejos en Tecnología. Desarrollador, consultor técnico y Co-Founder de Mythology Labs. En GEOLAND, aporta criterio técnico, liderazgo operativo y capacidad para ejecutar una plataforma robusta, escalable y orientada a negocio.</p></div><div class='flex flex-col items-center text-center w-full md:w-1/2'><img src='team/damian_transparent.png' class='w-48 h-48 md:w-64 md:h-64 object-cover object-top mb-8 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]' /><h3 style="font-family:'League Gothic',sans-serif;font-size:1.5rem;letter-spacing:0.12em;" class='text-white mb-2 uppercase'>Damián Scheck</h3><h4 class='text-geoland-blue tracking-[0.2em] text-[10px] md:text-xs uppercase mb-6' style="font-family:'Arimo',sans-serif;">Partner - Engineering / Mythology Labs</h4><p style="font-family:'Arimo',sans-serif;" class='text-white/60 text-xs md:text-sm leading-relaxed font-light text-center'>Analista de Sistemas de Computación, Licenciado en Sistemas, desarrollador de software, Co-Founder y CTO de Mythology Labs. En GEOLAND, lidera la arquitectura técnica, la calidad del código y el desarrollo de una plataforma robusta, escalable y segura, preparada para crecer con estándares profesionales de ingeniería.</p></div></div>`,
    backgroundMedia: "",
    overlayOpacity: 0,
    align: "center",
    maxWidth: "1400px"
  },
  {
    id: 52,
    title: "VALIDACIÓN INICIAL",
    text: "",
    variant: "validation-hud",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 53,
    title: "ASESORES & EARLY USERS",
    text: "Andy Hosman | Director | Luky Monday - US & LATAM / Go East Creative - Middle East & Asia / Hungry Man - Brasil / Oriental Films - U.S, LATAM, Spain. ;; Nico Bottero | Director & Producer | Los Modernos Films - Traviamento Films / Netflix - Coordinador de Arte. ;; Oliver Garland | Director & Founder | Olga Lee - Producción audiovisual destacada con presencia global, laureada a nivel internacional - U.S, LATAM, Europe. ;; Paulo Carneiro | Director & Execitive Producer | Máster por la ESTC de Lisboa y HEAD de Ginebra. En 2018 fundó Bam Bam Cinema y dirigió Bostofrio, premiada y exhibida en más de 40 festivales. Sus trabajos posteriores incluyen Périphérique Nord y A savana e a Montanha (2024), también premiada. ;; Fede Cetta | Executive Producer & Founder | El Cielo Cine - Reconocida por su proyección internacional, sus producciones han participado en festivales de Cannes, Visions du Réel, BAFICI y Ventana Sur. La compañía desarrolla largometrajes, documentales y producciones internacionales premiadas. ;; Natalia Azzato | Producer | El Camino Films - Productora audiovisual con operaciones en Uruguay, Argentina, Brasil y Chile, especializada en brindar soporte de producción en Sudamérica para proyectos internacionales, especialmente de Norteamérica y Europa.",
    variant: "advisors",
    backgroundMedia: "53.png",
    overlayOpacity: 45
  },
  {
    id: 54,
    title: "ALCANCE OPERATIVO & ROADMAP",
    text: "",
    variant: "roadmap",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 55,
    title: "THE FUTURE BELONGS TO BETTER DECISIONS",
    text: "",
    variant: "titulo-chico",
    backgroundMedia: "",
    overlayOpacity: 0
  },
  {
    id: 56,
    title: "GEOLAND",
    text: "Decision System for Film Production",
    variant: "portada81",
    backgroundMedia: "portada2.mp4",
    overlayOpacity: 45
  },
  {
    id: 57,
    title: "LET'S TALK",
    text: "",
    variant: "titulo-grande",
    backgroundMedia: "",
    overlayOpacity: 0
  }
];
