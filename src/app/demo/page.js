"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./demo.module.css";

const NICHES_DATA = {
  gym: {
    id: "gym",
    name: "Gimnasio",
    icon: "🏋️‍♂️",
    indicator: "ENTRENAMIENTO EXCLUSIVO",
    title: "CONSIGUE EL CUERPO DE TUS SUEÑOS SIN EXCUSAS",
    subTitle: "Acceso ilimitado a equipos de última generación, rutinas personalizadas por expertos y la comunidad fitness que te motivará a superar tus límites cada día.",
    benefits: [
      "Planes nutricionales hechos a tu medida.",
      "Acceso 24/7 a nuestras sedes VIP.",
      "Entrenadores certificados listos para guiarte."
    ],
    images: [
      "/images/demo/gym.png",
      "/images/demo/gym2.png",
      "/images/demo/gym3.png"
    ],
    priceBase: 49.99,
    properties: [
      {
        id: "plan",
        label: "Selecciona tu Membresía",
        options: [
          { name: "Mensual", priceOffset: 0 },
          { name: "Trimestral (-15%)", priceOffset: 77.48 },
          { name: "Anual (-30%)", priceOffset: 369.92 }
        ]
      },
      {
        id: "coach",
        label: "Servicios Adicionales",
        options: [
          { name: "Solo acceso", priceOffset: 0 },
          { name: "+ Coach Personal (+ $20.00)", priceOffset: 20 }
        ]
      }
    ],
    reviews: [
      {
        text: "«Pasé de no tener motivación a entrenar 5 días a la semana. Las instalaciones son increíbles y la app de seguimiento hace todo más fácil.»",
        author: "Carlos Mendoza, Miembro Gold",
        stars: 5
      },
      {
        text: "«He bajado 12 kilos de grasa corporal en 6 meses con la asesoría nutricional y el plan personalizado. ¡Muy recomendado!»",
        author: "Valeria Rojas, Emprendedora",
        stars: 5
      },
      {
        text: "«La maquinaria es de primera y el ambiente de entrenamiento es de absoluto enfoque. Siempre hay entrenadores listos a ayudarte.»",
        author: "Diego Torres, Atleta Amateur",
        stars: 5
      },
      {
        text: "«Las clases dinámicas de spinning y entrenamiento funcional son fantásticas, con música y luces neón que te llenan de energía.»",
        author: "Camila Silva, Diseñadora",
        stars: 5
      },
      {
        text: "«Me encanta el área de recuperación muscular. Los baños y vestuarios son de nivel de hotel de lujo, muy limpios siempre.»",
        author: "Andrés Gutiérrez, Ingeniero",
        stars: 5
      },
      {
        text: "«El horario extendido es ideal. Puedo venir a entrenar después de la oficina y no encuentro congestión. Los entrenamientos son muy eficientes.»",
        author: "Mariana Ruiz, Abogada",
        stars: 5
      }
    ],
    theme: {
      "--theme-primary": "#f97316", // Orange
      "--theme-primary-hover": "#ea580c",
      "--theme-bg": "#0f172a",
      "--theme-bg-side": "#1e293b",
      "--theme-bg-option": "#334155",
      "--theme-text": "#cbd5e1",
      "--theme-text-heading": "#ffffff",
      "--theme-text-muted": "#94a3b8",
      "--theme-border": "rgba(255, 255, 255, 0.08)",
      "--theme-shadow": "rgba(249, 115, 22, 0.25)",
      "--theme-shadow-hover": "rgba(249, 115, 22, 0.4)"
    }
  },
  ropa: {
    id: "ropa",
    name: "Moda / Ropa",
    icon: "👕",
    indicator: "NUEVA COLECCIÓN",
    title: "VISTE CON ELEGANCIA Y PERSONALIDAD PROPIA",
    subTitle: "Prendas exclusivas diseñadas para quienes no temen destacar. Confeccionadas con algodón premium 100% orgánico y acabados a mano de alta costura.",
    benefits: [
      "Envíos gratis a todo el país por compras mínimas.",
      "Garantía de devolución total por 30 días.",
      "Diseños originales con unidades ultra limitadas."
    ],
    images: [
      "/images/demo/ropa.png",
      "/images/demo/ropa2.png",
      "/images/demo/ropa3.png"
    ],
    priceBase: 89.90,
    properties: [
      {
        id: "talla",
        label: "Elige tu Talla",
        options: [
          { name: "S", priceOffset: 0 },
          { name: "M", priceOffset: 0 },
          { name: "L", priceOffset: 0 },
          { name: "XL", priceOffset: 5 }
        ]
      },
      {
        id: "color",
        label: "Color Exclusivo",
        options: [
          { name: "Beige Natural", priceOffset: 0 },
          { name: "Negro Obsidiana", priceOffset: 0 },
          { name: "Blanco Marfil", priceOffset: 0 }
        ]
      }
    ],
    reviews: [
      {
        text: "«La calidad de la tela es de otro planeta. Se siente pesada, elegante y el corte se adapta perfecto a mi cuerpo. Volveré a comprar sin duda.»",
        author: "Sofia Restrepo, Clienta Frecuente",
        stars: 5
      },
      {
        text: "«El pedido me llegó en solo 24 horas a Bogotá. El empaque perfumado es de lujo y la prenda es súper cómoda para cualquier ocasión.»",
        author: "Juanita Pérez, Estudiante",
        stars: 5
      },
      {
        text: "«Me gusta mucho que sean piezas exclusivas. No vas por la calle y ves a cinco personas con tu mismo outfit. El diseño es minimalista y premium.»",
        author: "Esteban Restrepo, Creador de Contenido",
        stars: 5
      },
      {
        text: "«Es ropa de diseñador a una fracción del costo tradicional. El algodón orgánico se siente súper suave al contacto con la piel.»",
        author: "Isabella Gómez, Asesora de Moda",
        stars: 5
      },
      {
        text: "«Compré la camiseta Beige Natural y tras 10 lavadas sigue impecable, sin perder forma ni color. Definitivamente vale cada centavo.»",
        author: "Santiago Ruiz, Programador",
        stars: 5
      },
      {
        text: "«El chat de soporte me asesoró inmediatamente sobre qué talla elegir según mis medidas y el ajuste fue perfecto. Excelente servicio al cliente.»",
        author: "Luciana Vélez, Arquitecta",
        stars: 5
      }
    ],
    theme: {
      "--theme-primary": "#d97706", // Gold/Amber
      "--theme-primary-hover": "#b45309",
      "--theme-bg": "#121212",
      "--theme-bg-side": "#1a1a1a",
      "--theme-bg-option": "#2a2a2a",
      "--theme-text": "#d1d5db",
      "--theme-text-heading": "#f3f4f6",
      "--theme-text-muted": "#9ca3af",
      "--theme-border": "rgba(255, 255, 255, 0.08)",
      "--theme-shadow": "rgba(217, 119, 6, 0.25)",
      "--theme-shadow-hover": "rgba(217, 119, 6, 0.4)"
    }
  },
  calzado: {
    id: "calzado",
    name: "Calzado",
    icon: "👟",
    indicator: "EDICIÓN LIMITADA",
    title: "DOMINA LA CIUDAD CON CADA PASO QUE DAS",
    subTitle: "Sneakers urbanos con tecnología de amortiguación responsiva de impacto. Siente la máxima comodidad en tus pies sin sacrificar el estilo callejero moderno.",
    benefits: [
      "Plantilla ergonómica de espuma viscoelástica.",
      "Suela antideslizante con agarre de alta tracción.",
      "Materiales transpirables de calidad espacial."
    ],
    images: [
      "/images/demo/calzado.png",
      "/images/demo/calzado2.png",
      "/images/demo/calzado3.png"
    ],
    priceBase: 129.99,
    properties: [
      {
        id: "talla",
        label: "Talla (US)",
        options: [
          { name: "8.5", priceOffset: 0 },
          { name: "9.0", priceOffset: 0 },
          { name: "9.5", priceOffset: 0 },
          { name: "10.0", priceOffset: 0 },
          { name: "11.0", priceOffset: 0 }
        ]
      },
      {
        id: "diseno",
        label: "Estilo",
        options: [
          { name: "Rojo Fuego & Carbón", priceOffset: 0 },
          { name: "Edición Negra Total (+ $15.00)", priceOffset: 15 }
        ]
      }
    ],
    reviews: [
      {
        text: "«Caminar con estas zapatillas es como flotar sobre nubes. Además, el diseño en rojo y gris combina con todo y llama mucho la atención en la calle.»",
        author: "Mateo Ortiz, Diseñador Visual",
        stars: 5
      },
      {
        text: "«Hago caminatas diarias de 10 kilómetros y estas zapatillas han eliminado por completo el dolor de talón. Súper ergonómicas.»",
        author: "Paula Medina, Fisioterapeuta",
        stars: 5
      },
      {
        text: "«Un calzado robusto, estético y con materiales de altísima calidad. La tracción en piso húmedo es excelente.»",
        author: "Nicolás Restrepo, Entrenador",
        stars: 5
      },
      {
        text: "«Me encanta el sistema de cordones de ajuste rápido y la transpirabilidad de la malla. Mis pies siempre se sienten frescos.»",
        author: "Sara Bermúdez, Runner Aficionada",
        stars: 5
      },
      {
        text: "«Compré la versión negra completa y es perfecta tanto para el gimnasio como para salir de noche informal. Gran compra.»",
        author: "Daniel Espinoza, Consultor",
        stars: 5
      },
      {
        text: "«El servicio de entrega rápida cumplió a cabalidad: pedí el calzado por la tarde y lo recibí a la mañana siguiente. Muy profesional.»",
        author: "Alejandro Giraldo, Ingeniero",
        stars: 5
      }
    ],
    theme: {
      "--theme-primary": "#dc2626", // Red
      "--theme-primary-hover": "#b91c1c",
      "--theme-bg": "#0f172a",
      "--theme-bg-side": "#1e293b",
      "--theme-bg-option": "#334155",
      "--theme-text": "#cbd5e1",
      "--theme-text-heading": "#ffffff",
      "--theme-text-muted": "#94a3b8",
      "--theme-border": "rgba(255, 255, 255, 0.08)",
      "--theme-shadow": "rgba(220, 38, 38, 0.25)",
      "--theme-shadow-hover": "rgba(220, 38, 38, 0.4)"
    }
  },
  mascotas: {
    id: "mascotas",
    name: "Mascotas",
    icon: "🐶",
    indicator: "BIENESTAR ANIMAL",
    title: "AMOR Y SALUD EN CADA BOCADO PARA TU MEJOR AMIGO",
    subTitle: "Alimento súper premium formulado por veterinarios expertos. Ingredientes 100% naturales libres de conservantes artificiales para ver a tu mascota feliz y llena de energía.",
    benefits: [
      "Mejora notablemente el brillo del pelaje en 3 semanas.",
      "Digestión óptima garantizada con prebióticos.",
      "Despacho exprés a domicilio en 2 horas."
    ],
    images: [
      "/images/demo/mascotas.png",
      "/images/demo/mascotas2.png",
      "/images/demo/mascotas3.png"
    ],
    priceBase: 34.50,
    properties: [
      {
        id: "peso",
        label: "Presentación del Saco",
        options: [
          { name: "3 kg (Prueba)", priceOffset: 0 },
          { name: "8 kg (Ahorro)", priceOffset: 32.50 },
          { name: "15 kg (Familiar)", priceOffset: 65.50 }
        ]
      },
      {
        id: "tipo",
        label: "Fórmula Específica",
        options: [
          { name: "Cachorros", priceOffset: 0 },
          { name: "Adultos Razas Medianas/Grandes", priceOffset: 0 },
          { name: "Seniors / Cuidado Articular (+ $5.00)", priceOffset: 5 }
        ]
      }
    ],
    reviews: [
      {
        text: "«A mi perrita le encantó desde el primer día. Sufrió de problemas estomacales por meses, pero con esta comida su digestión cambió por completo.»",
        author: "Liliana Vega y 'Luna'",
        stars: 5
      },
      {
        text: "«El pelo de mi pastor alemán brilla muchísimo más desde que come esta marca. El veterinario me felicitó por su gran estado físico.»",
        author: "Jorge Bernal, Administrador",
        stars: 5
      },
      {
        text: "«Es la primera vez que mi mascota se come todo el plato sin dejar nada. Se nota la diferencia de los ingredientes frescos.»",
        author: "Diana Ortiz, Diseñadora de Interiores",
        stars: 5
      },
      {
        text: "«El envío rápido en 2 horas a domicilio funciona excelente. Es muy útil cuando se te olvida comprar comida y estás sobre el tiempo.»",
        author: "Carlos Henao, Chef",
        stars: 5
      },
      {
        text: "«Fórmula de gran calidad, sin harinas de subproductos ni conservantes raros. Mi bulldog francés ya no sufre de alergias en la piel.»",
        author: "Andrea Londoño, Publicista",
        stars: 5
      },
      {
        text: "«Excelente relación calidad-precio para ser una comida súper premium. Rinde muchísimo y a mi perro le fascina.»",
        author: "Felipe Soto, Estudiante Universitario",
        stars: 5
      }
    ],
    theme: {
      "--theme-primary": "#f43f5e", // Rose/Coral
      "--theme-primary-hover": "#e11d48",
      "--theme-bg": "#091e1d", // Dark teal-green
      "--theme-bg-side": "#0f3634",
      "--theme-bg-option": "#1a4d4a",
      "--theme-text": "#ccfbf1",
      "--theme-text-heading": "#ffffff",
      "--theme-text-muted": "#99f6e4",
      "--theme-border": "rgba(20, 184, 166, 0.15)",
      "--theme-shadow": "rgba(244, 63, 94, 0.25)",
      "--theme-shadow-hover": "rgba(244, 63, 94, 0.4)"
    }
  },
  odontologia: {
    id: "odontologia",
    name: "Odontología",
    icon: "🦷",
    indicator: "TECNOLOGÍA DENTAL",
    title: "CONSIGUE LA SONRISA QUE SIEMPRE QUISISTE MOSTRAR",
    subTitle: "Tratamientos estéticos avanzados y ortodoncia invisible de última generación. Profesionales altamente calificados en un ambiente relajado y ultra moderno.",
    benefits: [
      "Valoración diagnóstica con escaneo 3D gratis.",
      "Facilidades de pago y financiamiento directo.",
      "Urgencias y citas prioritarias el mismo día."
    ],
    images: [
      "/images/demo/odontologia.png",
      "/images/demo/odontologia2.png",
      "/images/demo/odontologia3.png"
    ],
    priceBase: 120.00,
    properties: [
      {
        id: "servicio",
        label: "Servicio de Interés",
        options: [
          { name: "Limpieza Dental Premium", priceOffset: 0 },
          { name: "Blanqueamiento Led Avanzado (+ $80.00)", priceOffset: 80 },
          { name: "Ortodoncia Invisible (Abono Inicial)", priceOffset: 180 }
        ]
      },
      {
        id: "sucursal",
        label: "Sucursal",
        options: [
          { name: "Sede Norte (Exclusiva)", priceOffset: 0 },
          { name: "Sede Centro (Fácil Acceso)", priceOffset: 0 }
        ]
      }
    ],
    reviews: [
      {
        text: "«La atención es impecable. Me hice el blanqueamiento láser y los resultados superaron mis expectativas, no sentí nada de sensibilidad.»",
        author: "Dr. Andrés Faria, Odontólogo General",
        stars: 5
      },
      {
        text: "«Empecé mi tratamiento de alineadores invisibles hace 4 meses y el cambio ya es notorio. Nadie se da cuenta que los llevo puestos.»",
        author: "Mónica Salazar, Recepcionista",
        stars: 5
      },
      {
        text: "«Clínica impecable, con equipos de alta tecnología que hacen que las citas sean súper cortas y nada dolorosas. Reservas web súper fáciles.»",
        author: "Roberto Gómez, Administrador de Redes",
        stars: 5
      },
      {
        text: "«Llevé a mis dos hijos para su revisión de rutina y la odontopediatra tiene una paciencia increíble. Ya no le tienen miedo al dentista.»",
        author: "Patricia Jaramillo, Madre de Familia",
        stars: 5
      },
      {
        text: "«Excelente asesoría financiera. Pude pagar mi ortodoncia en cómodas cuotas mensuales sin intereses. El resultado va excelente.»",
        author: "Sebastián Cadavid, Estudiante",
        stars: 5
      },
      {
        text: "«Tuve una molestia muy fuerte en una muela por la noche, me dieron una cita de urgencia a primera hora de la mañana y me atendieron rápido.»",
        author: "Clara Inés, Pensionada",
        stars: 5
      }
    ],
    theme: {
      "--theme-primary": "#0ea5e9", // Sky Blue
      "--theme-primary-hover": "#0284c7",
      "--theme-bg": "#0f172a",
      "--theme-bg-side": "#1e293b",
      "--theme-bg-option": "#334155",
      "--theme-text": "#cbd5e1",
      "--theme-text-heading": "#ffffff",
      "--theme-text-muted": "#94a3b8",
      "--theme-border": "rgba(255, 255, 255, 0.08)",
      "--theme-shadow": "rgba(14, 165, 233, 0.25)",
      "--theme-shadow-hover": "rgba(14, 165, 233, 0.4)"
    }
  },
  tecnologia: {
    id: "tecnologia",
    name: "Tecnología",
    icon: "⌚",
    indicator: "ALTA TECNOLOGÍA",
    title: "EL FUTURO EN TU MUÑECA CON MÁXIMO RENDIMIENTO",
    subTitle: "Reloj inteligente premium con monitoreo biométrico avanzado en tiempo real, GPS autónomo y batería de larga duración (hasta 14 días continuos sin recargas).",
    benefits: [
      "Sensores de grado médico integrados.",
      "Pantalla AMOLED ultra brillante anti-rayones.",
      "Garantía oficial y soporte técnico premium de 1 año."
    ],
    images: [
      "/images/demo/tecnologia.png",
      "/images/demo/tecnologia2.png",
      "/images/demo/tecnologia3.png"
    ],
    priceBase: 249.99,
    properties: [
      {
        id: "almacenamiento",
        label: "Capacidad / Versión",
        options: [
          { name: "Active Edition (64GB)", priceOffset: 0 },
          { name: "Pro Titanium Edition (128GB) (+ $50.00)", priceOffset: 50 }
        ]
      },
      {
        id: "color",
        label: "Pulsera Extra de Regalo",
        options: [
          { name: "Silicona Deportiva Negra", priceOffset: 0 },
          { name: "Cuero Premium Marrón", priceOffset: 0 },
          { name: "Titanio Metálico", priceOffset: 15 }
        ]
      }
    ],
    reviews: [
      {
        text: "«La precisión del lector de ritmo cardíaco y el GPS es increíble para mis carreras de montaña. La pantalla se ve perfecta incluso bajo el sol directo.»",
        author: "Laura Pinzón, Triatleta Pro",
        stars: 5
      },
      {
        text: "«La batería es su punto más fuerte. Llevo 11 días usándolo con notificaciones activas y aún me queda un 20%. Se carga súper rápido.»",
        author: "José Miguel, Consultor IT",
        stars: 5
      },
      {
        text: "«La pantalla AMOLED es una locura, la respuesta táctil es inmediata y la interfaz se siente fluida y muy moderna.»",
        author: "Camilo Reyes, Diseñador UX",
        stars: 5
      },
      {
        text: "«El cuerpo de titanio se siente súper premium y robusto. Le he dado varios golpes accidentales en el gimnasio y no tiene ni un rayón.»",
        author: "Natalia Franco, Fotógrafa",
        stars: 5
      },
      {
        text: "«Sincroniza todas mis apps al instante y las llamadas bluetooth se escuchan con absoluta claridad. Muy útil para contestar manejando.»",
        author: "Kevin Alzate, Asesor Comercial",
        stars: 5
      },
      {
        text: "«El registro de las fases de sueño (profundo, ligero y REM) me ha ayudado a ajustar mis hábitos de descanso de manera medible.»",
        author: "Valentina Osorio, Investigadora",
        stars: 5
      }
    ],
    theme: {
      "--theme-primary": "#06b6d4", // Cyan
      "--theme-primary-hover": "#0891b2",
      "--theme-bg": "#030712",
      "--theme-bg-side": "#0b0f19",
      "--theme-bg-option": "#1f2937",
      "--theme-text": "#9ca3af",
      "--theme-text-heading": "#ffffff",
      "--theme-text-muted": "#6b7280",
      "--theme-border": "rgba(6, 182, 212, 0.15)",
      "--theme-shadow": "rgba(6, 182, 212, 0.25)",
      "--theme-shadow-hover": "rgba(6, 182, 212, 0.4)"
    }
  },
  servicios: {
    id: "servicios",
    name: "Servicios",
    icon: "💼",
    indicator: "CRECIMIENTO ACELERADO",
    title: "DUPLICA TU FACTURACIÓN Y DOMINA TU SECTOR",
    subTitle: "Estrategias de marketing digital automatizadas para llenar tu agenda de clientes calificados. Creamos sistemas de prospección automatizada adaptados a tu modelo de negocio.",
    benefits: [
      "Embudo de ventas personalizado llave en mano.",
      "Campañas publicitarias optimizadas por expertos.",
      "Garantía por contrato: si no creces, no pagas."
    ],
    images: [
      "/images/demo/servicios.png",
      "/images/demo/servicios2.png",
      "/images/demo/servicios3.png"
    ],
    priceBase: 399.00,
    properties: [
      {
        id: "plan",
        label: "Paquete de Crecimiento",
        options: [
          { name: "Starter (Prospección Básica)", priceOffset: 0 },
          { name: "Pro Scale (Estrategia Completa) (+ $200.00)", priceOffset: 200 },
          { name: "Elite VIP (Embudo + Automatizaciones)", priceOffset: 600 }
        ]
      },
      {
        id: "soporte",
        label: "Soporte Semanal",
        options: [
          { name: "Soporte Grupal / Correo", priceOffset: 0 },
          { name: "Canal Slack 1-a-1 Directo (+ $100.00)", priceOffset: 100 }
        ]
      }
    ],
    reviews: [
      {
        text: "«Implementamos su sistema y logramos duplicar el número de clientes mensuales en solo 45 días. El retorno de inversión ha sido masivo.»",
        author: "Juan Esteban Gómez, CEO de InmoTech",
        stars: 5
      },
      {
        text: "«Teníamos dudas sobre las agencias tradicionales de marketing, pero este sistema de prospección automatizada funciona 24/7 de verdad. Excelente.»",
        author: "María Fernanda, Directora Médica",
        stars: 5
      },
      {
        text: "«La consultoría 1-a-1 por Slack nos ayudó a pulir nuestro gancho de ventas y optimizar los costos publicitarios de inmediato. Gran equipo.»",
        author: "Carlos Mario, Fundador de SaaS",
        stars: 5
      },
      {
        text: "«En menos de un mes de lanzar las campañas logramos agendar más llamadas cualificadas que en todo el trimestre anterior. Altamente recomendado.»",
        author: "Sandra Milena, Consultora Externa",
        stars: 5
      },
      {
        text: "«El embudo llave en mano nos ahorró semanas de trabajo técnico. Lo entregaron tal cual lo prometieron en 48 horas y listo para captar leads.»",
        author: "Javier Castro, Cofundador de Startup",
        stars: 5
      },
      {
        text: "«La mejor inversión en marketing que hemos hecho. El sistema nos genera contactos diarios interesados en contratar nuestros servicios profesionales.»",
        author: "Patricia Restrepo, Socia de Bufete",
        stars: 5
      }
    ],
    theme: {
      "--theme-primary": "#10b981", // Emerald Green
      "--theme-primary-hover": "#059669",
      "--theme-bg": "#0f172a",
      "--theme-bg-side": "#1e293b",
      "--theme-bg-option": "#334155",
      "--theme-text": "#cbd5e1",
      "--theme-text-heading": "#ffffff",
      "--theme-text-muted": "#94a3b8",
      "--theme-border": "rgba(255, 255, 255, 0.08)",
      "--theme-shadow": "rgba(16, 185, 129, 0.25)",
      "--theme-shadow-hover": "rgba(16, 185, 129, 0.4)"
    }
  }
};

export default function DemoPage() {
  const [selectedNicheKey, setSelectedNicheKey] = useState("gym");
  const currentNiche = NICHES_DATA[selectedNicheKey];

  // Active indices for elements inside the preview card
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Auto-rotation effect for reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex(prev => (prev + 1) % currentNiche.reviews.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [selectedNicheKey, currentNiche.reviews.length]);

  // Tracking options selections
  const [selections, setSelections] = useState({
    plan: currentNiche.properties[0]?.options[0]?.name || "",
    coach: currentNiche.properties[1]?.options[0]?.name || "",
    talla: currentNiche.properties[0]?.options[0]?.name || "",
    color: currentNiche.properties[1]?.options[0]?.name || "",
    diseno: currentNiche.properties[1]?.options[0]?.name || "",
    peso: currentNiche.properties[0]?.options[0]?.name || "",
    tipo: currentNiche.properties[1]?.options[0]?.name || "",
    servicio: currentNiche.properties[0]?.options[0]?.name || "",
    sucursal: currentNiche.properties[1]?.options[0]?.name || "",
    almacenamiento: currentNiche.properties[0]?.options[0]?.name || "",
    soporte: currentNiche.properties[1]?.options[0]?.name || ""
  });

  const handleNicheChange = (key) => {
    setSelectedNicheKey(key);
    setActiveImageIndex(0);
    setActiveReviewIndex(0);
    // Reset selections for the new niche's options
    const newNiche = NICHES_DATA[key];
    const newSelections = {};
    newNiche.properties.forEach(prop => {
      newSelections[prop.id] = prop.options[0]?.name || "";
    });
    setSelections(newSelections);
  };

  const handleSelectOption = (propertyId, optionName) => {
    setSelections(prev => ({
      ...prev,
      [propertyId]: optionName
    }));
  };

  const handlePrevReview = () => {
    setActiveReviewIndex(prev => (prev - 1 + currentNiche.reviews.length) % currentNiche.reviews.length);
  };

  const handleNextReview = () => {
    setActiveReviewIndex(prev => (prev + 1) % currentNiche.reviews.length);
  };

  // Compute Current Price
  let totalPrice = currentNiche.priceBase;
  currentNiche.properties.forEach(prop => {
    const selectedOptionName = selections[prop.id];
    const optionObj = prop.options.find(opt => opt.name === selectedOptionName);
    if (optionObj) {
      totalPrice += optionObj.priceOffset;
    }
  });

  // Build WhatsApp Link
  const getWhatsAppMessage = () => {
    let msg = `¡Hola! Me interesa comprar el servicio/producto de la plantilla de *${currentNiche.name}*.\n\n`;
    currentNiche.properties.forEach(prop => {
      msg += `*${prop.label}:* ${selections[prop.id]}\n`;
    });
    msg += `\n*Precio Total Simulado:* $${totalPrice.toFixed(2)} USD\n\n`;
    msg += `¡Quiero implementar esta estructura en mi propio negocio!`;
    return `https://wa.me/573000000000?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className={styles.demoPage}>
      {/* Control Panel Header */}
      <header className={styles.headerControl}>
        <div className={styles.headerContent}>
          <div className={styles.headerTop}>
            <div className={styles.logoText}>
              Web<span>Clientes</span> Demo
            </div>
            <div className={styles.badge}>Simulador Interactivo</div>
          </div>
          <p className={styles.instructions}>
            Selecciona el nicho de tu negocio abajo para previsualizar cómo adaptaremos tu landing page de ventas con copywriting agresivo, fotos premium y checkout integrado.
          </p>
          <div className={styles.selectorRow}>
            {Object.values(NICHES_DATA).map((niche) => (
              <button
                key={niche.id}
                onClick={() => handleNicheChange(niche.id)}
                className={`${styles.nicheButton} ${
                  selectedNicheKey === niche.id ? styles.nicheButtonActive : ""
                }`}
                style={
                  selectedNicheKey === niche.id
                    ? { "--theme-primary": niche.theme["--theme-primary"], "--theme-shadow": niche.theme["--theme-shadow"] }
                    : {}
                }
              >
                <span>{niche.icon}</span> {niche.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Simulator Sandbox container with dynamic variables applied inline */}
      <main className={styles.simulationContainer}>
        <div
          className={styles.mockupWrapper}
          style={currentNiche.theme}
        >
          {/* Main preview page mockup */}
          <div className={styles.mockupGrid}>
            
            {/* Copywriting Pitch */}
            <div className={styles.copywritingCol}>
              <span className={styles.nicheIndicator}>
                {currentNiche.indicator}
              </span>
              <h1 className={styles.mainTitle}>
                {currentNiche.title}
              </h1>
              <p className={styles.subTitle}>
                {currentNiche.subTitle}
              </p>
              
              {/* Core Benefits */}
              <div className={styles.featuresList}>
                {currentNiche.benefits.map((benefit, index) => (
                  <div key={index} className={styles.featureItem}>
                    <svg
                      className={styles.featureIcon}
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Review Testimonials Carousel Card */}
              <div className={styles.reviewsBlock}>
                <div className={styles.carouselHeader}>
                  <span className={styles.carouselTitle}>Opiniones Clientes</span>
                  <div className={styles.carouselNav}>
                    <button onClick={handlePrevReview} className={styles.navBtn} aria-label="Anterior opinión">‹</button>
                    <button onClick={handleNextReview} className={styles.navBtn} aria-label="Siguiente opinión">›</button>
                  </div>
                </div>

                <div className={styles.reviewCard}>
                  <p className={styles.reviewText}>
                    {currentNiche.reviews[activeReviewIndex]?.text}
                  </p>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.stars}>
                      {"★".repeat(currentNiche.reviews[activeReviewIndex]?.stars || 5)}
                    </div>
                    <span>{currentNiche.reviews[activeReviewIndex]?.author}</span>
                  </div>
                </div>

                <div className={styles.dotsRow}>
                  {currentNiche.reviews.map((_, idx) => (
                    <span
                      key={idx}
                      onClick={() => setActiveReviewIndex(idx)}
                      className={`${styles.dot} ${activeReviewIndex === idx ? styles.dotActive : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product visual & purchase column */}
            <div className={styles.visualCol}>
              
              {/* Product Gallery */}
              <div className={styles.productDisplayWrapper}>
                <div className={styles.productDisplay}>
                  <Image
                    src={currentNiche.images[activeImageIndex]}
                    alt={`${currentNiche.name} vista ${activeImageIndex + 1}`}
                    fill
                    className={styles.productImage}
                    sizes="(max-width: 900px) 100vw, 500px"
                    priority
                  />
                </div>
                {/* 3 Clickable Gallery Thumbnails */}
                <div className={styles.galleryRow}>
                  {currentNiche.images.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`${styles.thumbnailBtn} ${styles.thumbnailBtnHover} ${
                        activeImageIndex === idx ? styles.thumbnailActive : ""
                      }`}
                    >
                      <Image
                        src={imgSrc}
                        alt={`Vista miniatura ${idx + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Selections Section */}
              <div className={styles.propertiesSection}>
                {currentNiche.properties.map((prop) => (
                  <div key={prop.id} className={styles.propertyGroup}>
                    <span className={styles.propertyLabel}>{prop.label}</span>
                    <div className={styles.optionsGrid}>
                      {prop.options.map((opt) => (
                        <button
                          key={opt.name}
                          onClick={() => handleSelectOption(prop.id, opt.name)}
                          className={`${styles.optionButton} ${
                            selections[prop.id] === opt.name
                              ? styles.optionButtonActive
                              : ""
                          }`}
                        >
                          {opt.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing & CTA Section */}
              <div className={styles.buyingSection}>
                <div className={styles.priceBlock}>
                  <span className={styles.priceLabel}>Precio de Oferta:</span>
                  <span className={styles.priceValue}>
                    ${totalPrice.toFixed(2)} <span style={{ fontSize: "1rem", fontWeight: "normal" }}>USD</span>
                  </span>
                </div>
                
                <div className={styles.actionsGrid}>
                  <a
                    href={getWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnWhatsapp}
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 2.019 14.12 1.01 11.493 1.01 6.058 1.01 1.632 5.381 1.629 10.81c-.001 1.674.452 3.308 1.31 4.733L1.925 21.9l6.572-1.722c.007-.004.015-.008.022-.012z" />
                    </svg>
                    Comprar por WhatsApp
                  </a>
                  <button
                    onClick={() => alert("¡Demostración de pago virtual! Esto simula una redirección a MercadoPago, Stripe o PayPal.")}
                    className={styles.btnVirtual}
                  >
                    Comprar Online
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Persistent Footer Banner Pitching the Service */}
      <footer className={styles.floatingFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerText}>
            ¿Quieres una página así para tu negocio? <strong>La entregamos lista para vender en 48 horas.</strong>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/" className={styles.footerCTA}>
              Ver Planes y Precios →
            </Link>
            <a
              href="https://wa.me/573118772498?text=Hola!%20Vi%20la%20demo%20de%20plantillas%20y%20me%20gustar%C3%ADa%20cotizar%20una%20p%C3%A1gina%20web%20para%20mi%20negocio."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerWhatsapp}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: "2px" }}>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 2.019 14.12 1.01 11.493 1.01 6.058 1.01 1.632 5.381 1.629 10.81c-.001 1.674.452 3.308 1.31 4.733L1.925 21.9l6.572-1.722c.007-.004.015-.008.022-.012z" />
              </svg>
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
