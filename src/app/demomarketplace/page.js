"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./marketplace.module.css";

const NICHES_CONFIG = {
  gym: {
    id: "gym",
    name: "Gimnasio",
    icon: "🏋️‍♂️",
    slides: [
      { tag: "OFERTA EXCLUSIVA", title: "¡20% DE DESCUENTO EN PLAN ANUAL!", desc: "Matricúlate hoy usando el código promocional FIT20 y accede a todas nuestras sedes VIP.", image: "/images/demo/gym.png" },
      { tag: "CLASE GRATIS", title: "¡AGENDA TU SESIÓN DE PRUEBA 100% GRATIS!", desc: "Escríbenos por WhatsApp para coordinar tu pase de cortesía de 1 día con entrenador.", image: "/images/demo/gym2.png" },
      { tag: "REGALO DE BIENVENIDA", title: "¡CREATINA PURA GRATIS CON TU MATRÍCULA!", desc: "Llévate un bote de suplementación y un shaker premium con tu plan trimestral o anual.", image: "/images/demo/gym3.png" }
    ],
    categories: ["Todos", "Equipamiento", "Suplementos", "Accesorios"],
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
    slides: [
      { tag: "BIENVENIDA", title: "¡ENVÍO GRATIS EN TU PRIMER PEDIDO!", desc: "Utiliza el código FIRSTFREE en el carrito. Válido para envíos a todo el territorio nacional.", image: "/images/demo/ropa.png" },
      { tag: "TEMPORADA", title: "¡COLECCIÓN DE VERANO: 15% DE DESCUENTO!", desc: "Obtén rebajas exclusivas con el código VERANO15 en camisas y pantalones seleccionados.", image: "/images/demo/ropa2.png" },
      { tag: "EDICIÓN LIMITADA", title: "¡UNIDADES ULTRA LIMITADAS POR DISEÑO!", desc: "Prendas confeccionadas a mano con algodón orgánico premium. Solo 20 piezas exclusivas.", image: "/images/demo/ropa3.png" }
    ],
    categories: ["Todos", "Camisas", "Pantalones", "Accesorios"],
    theme: {
      "--theme-primary": "#d97706", // Gold
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
    slides: [
      { tag: "DESCUENTO DE LANZAMIENTO", title: "¡10% DE DESCUENTO ADICIONAL EN TIENDA!", desc: "Código: SNEAKERS10. Válido en toda la línea de tenis urbanos y zapatillas running.", image: "/images/demo/calzado.png" },
      { tag: "ENVÍO RÁPIDO", title: "¡ENTREGA EXPRÉS 24 HORAS SIN COSTO!", desc: "Realiza tu pedido hoy y estrena mañana. Garantía de logística prioritaria asegurada.", image: "/images/demo/calzado2.png" },
      { tag: "GARANTÍA TOTAL", title: "¡PRUÉBALOS POR 30 DÍAS SIN COMPROMISOS!", desc: "¿No te ajustó la talla o no te gustaron? Te devolvemos el dinero de inmediato.", image: "/images/demo/calzado3.png" }
    ],
    categories: ["Todos", "Deportivo", "Casual", "Formal"],
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
    slides: [
      { tag: "ALIMENTACIÓN SALUDABLE", title: "¡15% OFF EN NUTRICIÓN SÚPER PREMIUM!", desc: "Código: PUPPY15. Alimento natural para cachorros y adultos formulado por expertos.", image: "/images/demo/mascotas.png" },
      { tag: "OBSEQUIO ESPECIAL", title: "¡KIT DE JUGUETES DE BIENVENIDA GRATIS!", desc: "Llévate un set de mordedores interactivos por compras de catálogo superiores a $50.", image: "/images/demo/mascotas2.png" },
      { tag: "ENVÍO EXPRESS", title: "¡ENTREGAS EN 2 HORAS A DOMICILIO!", desc: "El mejor servicio prioritario de reparto para que nunca le falte alimento a tu mejor amigo.", image: "/images/demo/mascotas3.png" }
    ],
    categories: ["Todos", "Alimento", "Juguetes", "Higiene"],
    theme: {
      "--theme-primary": "#f43f5e", // Rose
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
    slides: [
      { tag: "DIAGNÓSTICO DIGITAL", title: "¡VALORACIÓN 3D E INFORME INICIAL GRATUITO!", desc: "Agenda hoy por WhatsApp y obtén tu escaneo odontológico gratis para tu ortodoncia.", image: "/images/demo/odontologia.png" },
      { tag: "ESTÉTICA DENTAL", title: "¡30% OFF EN BLANQUEAMIENTO LED PRO!", desc: "Consigue la sonrisa blanca que deseas con tecnología láser indolora de alta gama.", image: "/images/demo/odontologia2.png" },
      { tag: "FACILIDADES DE PAGO", title: "¡ALINEADORES INVISIBLES SIN CUOTA INICIAL!", desc: "Financiamiento directo con pagos mensuales flexibles adaptados a tu presupuesto.", image: "/images/demo/odontologia3.png" }
    ],
    categories: ["Todos", "Ortodoncia", "Estética", "Higiene"],
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
    slides: [
      { tag: "REGALO EXCLUSIVO", title: "¡CORREA DE CUERO DE REGALO CON TU COMPRA!", desc: "Adquiere el Smartwatch Titanium Edition hoy y llévate una pulsera extra sin costo.", image: "/images/demo/tecnologia.png" },
      { tag: "AUDIO PRO", title: "¡10% OFF EN AUDÍFONOS CON CANCELACIÓN DE RUIDO!", desc: "Código promocional: AUDIO10. Vive la música con sonido envolvente Hifi de alta resolución.", image: "/images/demo/tecnologia2.png" },
      { tag: "COMPRA SEGURA", title: "¡GARANTÍA OFICIAL EXTENDIDA DE 18 MESES!", desc: "Aseguramos la máxima calidad. Soporte técnico preferencial y reemplazo inmediato.", image: "/images/demo/tecnologia3.png" }
    ],
    categories: ["Todos", "Smartwatches", "Auriculares", "Cargadores"],
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
    slides: [
      { tag: "DIAGNÓSTICO COMERCIAL", title: "¡AUDITORÍA DE EMBUDOS DE VENTA GRATUITA!", desc: "Analizamos tu sistema actual de prospección por WhatsApp y te damos soluciones de mejora.", image: "/images/demo/servicios.png" },
      { tag: "GARANTÍA DE TIEMPO", title: "¡LANDING PAGE EN 48 HORAS O ES GRATIS!", desc: "Te garantizamos la entrega ultra rápida de tu sitio web listo para vender bajo contrato.", image: "/images/demo/servicios2.png" },
      { tag: "PRODUCCIÓN MENSUAL", title: "¡15% DE DESCUENTO EN GESTIÓN DE ANUNCIOS!", desc: "Código: GROWTH15. Potencia tu captación con campañas optimizadas por profesionales.", image: "/images/demo/servicios3.png" }
    ],
    categories: ["Todos", "Marketing", "Desarrollo", "Asesorías"],
    theme: {
      "--theme-primary": "#10b981", // Emerald
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

const INITIAL_PRODUCTS = [
  // 🏋️‍♂️ GYM (10)
  { id: "g1", niche: "gym", name: "Mancuernas Hexagonales Cemento (Set 10kg)", price: 39.99, stars: 5, category: "Equipamiento", image: "/images/demo/gym.png" },
  { id: "g2", niche: "gym", name: "Proteína de Suero Whey Gold Standard 2lb", price: 49.99, stars: 5, category: "Suplementos", image: "/images/demo/gym2.png" },
  { id: "g3", niche: "gym", name: "Rueda de Abdominales Doble Rodamiento Pro", price: 19.99, stars: 4, category: "Accesorios", image: "/images/demo/gym3.png" },
  { id: "g4", niche: "gym", name: "Barra Olímpica de Acero Cromado 20kg", price: 119.99, stars: 5, category: "Equipamiento", image: "/images/demo/gym.png" },
  { id: "g5", niche: "gym", name: "Creatina Monohidratada Micronizada 300g", price: 29.99, stars: 5, category: "Suplementos", image: "/images/demo/gym2.png" },
  { id: "g6", niche: "gym", name: "Banda Elásticas de Resistencia (Set de 5)", price: 14.99, stars: 4, category: "Accesorios", image: "/images/demo/gym3.png" },
  { id: "g7", niche: "gym", name: "Banco de Pecho Ajustable Multiposición", price: 149.99, stars: 5, category: "Equipamiento", image: "/images/demo/gym.png" },
  { id: "g8", niche: "gym", name: "Aminoácidos BCAA Polvo Sabor Frambuesa", price: 24.99, stars: 4, category: "Suplementos", image: "/images/demo/gym2.png" },
  { id: "g9", niche: "gym", name: "Cinturón de Cuero de Levantamiento Pesas", price: 34.99, stars: 5, category: "Accesorios", image: "/images/demo/gym3.png" },
  { id: "g10", niche: "gym", name: "Colchoneta de Yoga Fitness Antideslizante", price: 12.99, stars: 4, category: "Accesorios", image: "/images/demo/gym.png" },

  // 👕 MODA / ROPA (10)
  { id: "r1", niche: "ropa", name: "Camisa de Lino Beige Corte Regular", price: 45.00, stars: 5, category: "Camisas", image: "/images/demo/ropa.png" },
  { id: "r2", niche: "ropa", name: "Pantalón Chino Slim Fit Casual", price: 55.00, stars: 4, category: "Pantalones", image: "/images/demo/ropa2.png" },
  { id: "r3", niche: "ropa", name: "Bufanda de Lana Cashmere Flecos", price: 25.00, stars: 5, category: "Accesorios", image: "/images/demo/ropa3.png" },
  { id: "r4", niche: "ropa", name: "Camiseta Algodón Orgánico Pesado", price: 29.00, stars: 4, category: "Camisas", image: "/images/demo/ropa.png" },
  { id: "r5", niche: "ropa", name: "Jeans Denim Rígido Azul Clásico", price: 65.00, stars: 5, category: "Pantalones", image: "/images/demo/ropa2.png" },
  { id: "r6", niche: "ropa", name: "Cinturón de Cuero Café Hebilla Plata", price: 35.00, stars: 4, category: "Accesorios", image: "/images/demo/ropa3.png" },
  { id: "r7", niche: "ropa", name: "Sobretodo Elegante Lana Paño Gris", price: 145.00, stars: 5, category: "Camisas", image: "/images/demo/ropa.png" },
  { id: "r8", niche: "ropa", name: "Pantaloneta de Lino Verano Cordón", price: 38.00, stars: 4, category: "Pantalones", image: "/images/demo/ropa2.png" },
  { id: "r9", niche: "ropa", name: "Gafas de Sol Estilo Retro Acetato", price: 42.00, stars: 5, category: "Accesorios", image: "/images/demo/ropa3.png" },
  { id: "r10", niche: "ropa", name: "Camisa Oxford Clásica Azul Celeste", price: 49.00, stars: 4, category: "Camisas", image: "/images/demo/ropa.png" },

  // 👟 CALZADO (10)
  { id: "c1", niche: "calzado", name: "Tenis Running Pro Amortiguación Rojo", price: 129.99, stars: 5, category: "Deportivo", image: "/images/demo/calzado.png" },
  { id: "c2", niche: "calzado", name: "Mocasines de Cuero Marrón Confort", price: 89.99, stars: 4, category: "Casual", image: "/images/demo/calzado2.png" },
  { id: "c3", niche: "calzado", name: "Zapatos Oxford Formales de Vestir", price: 149.99, stars: 5, category: "Formal", image: "/images/demo/calzado3.png" },
  { id: "c4", niche: "calzado", name: "Sneakers Urbanos Suela Goma Carbón", price: 99.99, stars: 4, category: "Casual", image: "/images/demo/calzado.png" },
  { id: "c5", niche: "calzado", name: "Botas de Cuero Invierno Forro Lana", price: 139.99, stars: 5, category: "Casual", image: "/images/demo/calzado2.png" },
  { id: "c6", niche: "calzado", name: "Zapatillas de Deporte Trail Antideslizantes", price: 119.99, stars: 5, category: "Deportivo", image: "/images/demo/calzado3.png" },
  { id: "c7", niche: "calzado", name: "Sandalias de Cuero Premium Verano", price: 59.99, stars: 4, category: "Casual", image: "/images/demo/calzado.png" },
  { id: "c8", niche: "calzado", name: "Zapatos de Vestir Charol Boda", price: 169.99, stars: 5, category: "Formal", image: "/images/demo/calzado2.png" },
  { id: "c9", niche: "calzado", name: "Tenis Deportivos Malla Transpirable", price: 79.99, stars: 4, category: "Deportivo", image: "/images/demo/calzado3.png" },
  { id: "c10", niche: "calzado", name: "Zapatos Derby Casuales de Nobuck", price: 109.99, stars: 4, category: "Casual", image: "/images/demo/calzado.png" },

  // 🐶 MASCOTAS (10)
  { id: "m1", niche: "mascotas", name: "Croquetas Naturales Súper Premium 15kg", price: 67.00, stars: 5, category: "Alimento", image: "/images/demo/mascotas.png" },
  { id: "m2", niche: "mascotas", name: "Rascador de Tres Niveles Felpa Gatos", price: 45.00, stars: 4, category: "Juguetes", image: "/images/demo/mascotas2.png" },
  { id: "m3", niche: "mascotas", name: "Champú Hipoalergénico Avena Orgánica", price: 15.50, stars: 5, category: "Higiene", image: "/images/demo/mascotas3.png" },
  { id: "m4", niche: "mascotas", name: "Alimento Húmedo Filete Receta Pollo", price: 2.50, stars: 4, category: "Alimento", image: "/images/demo/mascotas.png" },
  { id: "m5", niche: "mascotas", name: "Juguete Mordedor de Goma Alta Tracción", price: 9.99, stars: 5, category: "Juguetes", image: "/images/demo/mascotas2.png" },
  { id: "m6", niche: "mascotas", name: "Cepillo Quita Pelo Profesional Mascotas", price: 12.50, stars: 4, category: "Higiene", image: "/images/demo/mascotas3.png" },
  { id: "m7", niche: "mascotas", name: "Galletas Naturales Sabor Pato Avena", price: 7.99, stars: 5, category: "Alimento", image: "/images/demo/mascotas.png" },
  { id: "m8", niche: "mascotas", name: "Pelotas de Tenis Interactivas Set (3)", price: 6.50, stars: 4, category: "Juguetes", image: "/images/demo/mascotas2.png" },
  { id: "m9", niche: "mascotas", name: "Cortauñas Ergonómico Navaja Acero", price: 11.00, stars: 4, category: "Higiene", image: "/images/demo/mascotas3.png" },
  { id: "m10", niche: "mascotas", name: "Arnés de Pecho Seguridad Reflectivo", price: 24.99, stars: 5, category: "Juguetes", image: "/images/demo/mascotas.png" },

  // 🦷 ODONTOLOGÍA (10)
  { id: "o1", niche: "odontologia", name: "Kit de Alineadores Invisibles Avanzados", price: 599.00, stars: 5, category: "Ortodoncia", image: "/images/demo/odontologia.png" },
  { id: "o2", niche: "odontologia", name: "Kit de Blanqueamiento Dental Led Pro", price: 79.99, stars: 4, category: "Estética", image: "/images/demo/odontologia2.png" },
  { id: "o3", niche: "odontologia", name: "Cepillo de Dientes Eléctrico Sónico 3D", price: 45.00, stars: 5, category: "Higiene", image: "/images/demo/odontologia3.png" },
  { id: "o4", niche: "odontologia", name: "Consulta Diagnóstica e Integral Odontología", price: 30.00, stars: 5, category: "Ortodoncia", image: "/images/demo/odontologia.png" },
  { id: "o5", niche: "odontologia", name: "Servicio de Limpieza Dental Láser Premium", price: 89.00, stars: 5, category: "Estética", image: "/images/demo/odontologia2.png" },
  { id: "o6", niche: "odontologia", name: "Seda Dental Orgánica Libre Plástico (x3)", price: 9.99, stars: 4, category: "Higiene", image: "/images/demo/odontologia3.png" },
  { id: "o7", niche: "odontologia", name: "Bracket de Zafiro Estético Sede Norte", price: 350.00, stars: 5, category: "Ortodoncia", image: "/images/demo/odontologia.png" },
  { id: "o8", niche: "odontologia", name: "Carilla de Resina Estética (Precio Pieza)", price: 180.00, stars: 5, category: "Estética", image: "/images/demo/odontologia2.png" },
  { id: "o9", niche: "odontologia", name: "Pasta Dental Remineralizante Hidroxiapatita", price: 12.50, stars: 4, category: "Higiene", image: "/images/demo/odontologia3.png" },
  { id: "o10", niche: "odontologia", name: "Protector Bucal Deportivo a Medida", price: 25.00, stars: 4, category: "Ortodoncia", image: "/images/demo/odontologia.png" },

  // ⌚ TECNOLOGÍA (10)
  { id: "t1", niche: "tecnologia", name: "Smartwatch Active Titanium Pro GPS", price: 299.99, stars: 5, category: "Smartwatches", image: "/images/demo/tecnologia.png" },
  { id: "t2", niche: "tecnologia", name: "Auriculares Inalámbricos ANC Hifi", price: 129.99, stars: 5, category: "Auriculares", image: "/images/demo/tecnologia2.png" },
  { id: "t3", niche: "tecnologia", name: "Cargador Inalámbrico Rápido QI 3 en 1", price: 39.99, stars: 4, category: "Cargadores", image: "/images/demo/tecnologia3.png" },
  { id: "t4", niche: "tecnologia", name: "Smartwatch Active Sport Edition 44mm", price: 189.99, stars: 4, category: "Smartwatches", image: "/images/demo/tecnologia.png" },
  { id: "t5", niche: "tecnologia", name: "Auriculares Deportivos In-Ear Bluetooth", price: 79.99, stars: 4, category: "Auriculares", image: "/images/demo/tecnologia2.png" },
  { id: "t6", niche: "tecnologia", name: "Cargador Rápido GaN Ultra compacto 65W", price: 29.99, stars: 5, category: "Cargadores", image: "/images/demo/tecnologia3.png" },
  { id: "t7", niche: "tecnologia", name: "Correa Smartwatch Cuero Natural Lujo", price: 24.99, stars: 4, category: "Smartwatches", image: "/images/demo/tecnologia.png" },
  { id: "t8", niche: "tecnologia", name: "Audífonos Over-Ear Cable Monitoreo", price: 149.99, stars: 5, category: "Auriculares", image: "/images/demo/tecnologia2.png" },
  { id: "t9", niche: "tecnologia", name: "Batería Portátil Magnética QI 10.000mAh", price: 45.00, stars: 4, category: "Cargadores", image: "/images/demo/tecnologia3.png" },
  { id: "t10", niche: "tecnologia", name: "Cable USB-C a USB-C Trenzado Reforzado", price: 12.99, stars: 4, category: "Cargadores", image: "/images/demo/tecnologia.png" },

  // 💼 SERVICIOS (10)
  { id: "s1", niche: "servicios", name: "Plan de Gestión Mensual Redes Sociales", price: 199.00, stars: 5, category: "Marketing", image: "/images/demo/servicios.png" },
  { id: "s2", niche: "servicios", name: "Desarrollo Landing Page de Ventas Express", price: 350.00, stars: 5, category: "Desarrollo", image: "/images/demo/servicios2.png" },
  { id: "s3", niche: "servicios", name: "Auditoría SEO Completa y Reporte Técnico", price: 80.00, stars: 4, category: "Asesorías", image: "/images/demo/servicios3.png" },
  { id: "s4", niche: "servicios", name: "Campaña Conversión Anuncios Meta Ads", price: 299.00, stars: 5, category: "Marketing", image: "/images/demo/servicios.png" },
  { id: "s5", niche: "servicios", name: "Diseño Web E-commerce Shopify Completo", price: 750.00, stars: 5, category: "Desarrollo", image: "/images/demo/servicios2.png" },
  { id: "s6", niche: "servicios", name: "Asesoría Estratégica Modelamiento Negocios", price: 120.00, stars: 4, category: "Asesorías", image: "/images/demo/servicios3.png" },
  { id: "s7", niche: "servicios", name: "Redacción Profesional Copywriting 5 Páginas", price: 149.00, stars: 5, category: "Marketing", image: "/images/demo/servicios.png" },
  { id: "s8", niche: "servicios", name: "Mantenimiento Técnico Mensual WordPress/Next", price: 75.00, stars: 4, category: "Desarrollo", image: "/images/demo/servicios2.png" },
  { id: "s9", niche: "servicios", name: "Optimización de Velocidad y Carga Web", price: 99.00, stars: 5, category: "Desarrollo", image: "/images/demo/servicios3.png" },
  { id: "s10", niche: "servicios", name: "Diagnóstico Inicial de Prospección Digital", price: 45.00, stars: 4, category: "Asesorías", image: "/images/demo/servicios.png" }
];

export default function DemoMarketplacePage() {
  const [selectedNicheKey, setSelectedNicheKey] = useState("gym");
  const currentNiche = NICHES_CONFIG[selectedNicheKey];

  const [activeTab, setActiveTab] = useState("cliente");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [priceRange, setPriceRange] = useState(800);

  // Active slide index for the image slider hero banner
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Dynamic products state
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // CRUD Form States
  const [editingProductId, setEditingProductId] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    category: "",
    stars: 5,
    image: ""
  });

  // Automatically reset category and slide index when niche changes
  useEffect(() => {
    setSelectedCategory("Todos");
    setActiveSlideIndex(0);
  }, [selectedNicheKey]);

  // Slide rotation interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIndex(prev => (prev + 1) % currentNiche.slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [selectedNicheKey, currentNiche.slides.length]);

  const handleNicheChange = (key) => {
    setSelectedNicheKey(key);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.price || !formState.category) {
      alert("Por favor completa los campos requeridos.");
      return;
    }

    const priceNum = parseFloat(formState.price);
    if (isNaN(priceNum)) {
      alert("El precio debe ser un número válido.");
      return;
    }

    const imagePath = formState.image || `/images/demo/${selectedNicheKey}.png`;

    if (editingProductId) {
      setProducts(prev =>
        prev.map(p =>
          p.id === editingProductId
            ? { ...p, name: formState.name, price: priceNum, category: formState.category, stars: parseInt(formState.stars), image: imagePath }
            : p
        )
      );
      setEditingProductId(null);
    } else {
      const newProduct = {
        id: `custom_${Date.now()}`,
        niche: selectedNicheKey,
        name: formState.name,
        price: priceNum,
        stars: parseInt(formState.stars),
        category: formState.category,
        image: imagePath
      };
      setProducts(prev => [newProduct, ...prev]);
    }

    setFormState({
      name: "",
      price: "",
      category: currentNiche.categories[1] || "",
      stars: 5,
      image: ""
    });
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setFormState({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stars: product.stars,
      image: product.image
    });
  };

  const handleDeleteClick = (productId) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto del inventario?")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setFormState({
      name: "",
      price: "",
      category: currentNiche.categories[1] || "",
      stars: 5,
      image: ""
    });
  };

  useEffect(() => {
    setFormState(prev => ({
      ...prev,
      category: currentNiche.categories[1] || ""
    }));
  }, [selectedNicheKey, currentNiche.categories]);

  const nicheProducts = products.filter(p => p.niche === selectedNicheKey);

  const filteredProducts = nicheProducts.filter(p => {
    const matchCat = selectedCategory === "Todos" || p.category === selectedCategory;
    const matchPrice = p.price <= priceRange;
    return matchCat && matchPrice;
  });

  const getProductWhatsappLink = (product) => {
    const msg = `¡Hola! Me interesa comprar el siguiente producto del catálogo virtual *${currentNiche.name}*:\n\n` +
                `*Producto:* ${product.name}\n` +
                `*Categoría:* ${product.category}\n` +
                `*Precio:* $${product.price.toFixed(2)} USD\n\n` +
                `¿Tienen disponibilidad de envío inmediato?`;
    return `https://wa.me/573118772498?text=${encodeURIComponent(msg)}`;
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex(prev => (prev - 1 + currentNiche.slides.length) % currentNiche.slides.length);
  };

  const handleNextSlide = () => {
    setActiveSlideIndex(prev => (prev + 1) % currentNiche.slides.length);
  };

  return (
    <div className={styles.marketplacePage}>
      {/* Control Panel Header Selector */}
      <header className={styles.headerControl}>
        <div className={styles.headerContent}>
          <div className={styles.headerTop}>
            <div className={styles.logoText}>
              Web<span>Clientes</span> Marketplace
            </div>
            <div className={styles.badge}>Simulador Multivendedor</div>
          </div>
          <div className={styles.selectorRow}>
            {Object.values(NICHES_CONFIG).map((niche) => (
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

      {/* Tabs Row */}
      <div className={styles.tabRow} style={currentNiche.theme}>
        <div className={styles.tabContentWidth}>
          <button
            onClick={() => setActiveTab("cliente")}
            className={`${styles.tabButton} ${activeTab === "cliente" ? styles.tabButtonActive : ""}`}
          >
             Vista Cliente (Tienda)
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`${styles.tabButton} ${activeTab === "admin" ? styles.tabButtonActive : ""}`}
          >
             Vista Administrador (CRUD)
          </button>
        </div>
      </div>

      {/* Marketplace Body Container */}
      <div className={styles.storeContainer} style={currentNiche.theme}>
        <div className={styles.storeContentWidth}>
          
          {/* =========================================
             VISTA CLIENTE (TIENDA VIRTUAL)
             ========================================= */}
          {activeTab === "cliente" && (
            <>
              {/* Responsive Hero Banner Image Slider */}
              <div className={styles.heroBanner}>
                {currentNiche.slides.map((slide, index) => (
                  <div
                    key={index}
                    className={styles.slideContainer}
                    style={{ display: activeSlideIndex === index ? "block" : "none" }}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className={styles.slideImage}
                      sizes="(max-width: 1250px) 100vw, 1200px"
                      priority={index === 0}
                    />
                    <div className={styles.slideOverlay}>
                      <div className={styles.slideText}>
                        <span className={styles.slideTag}>{slide.tag}</span>
                        <h2 className={styles.slideTitle}>{slide.title}</h2>
                        <p className={styles.slideDesc}>{slide.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Arrow Controls */}
                <button onClick={handlePrevSlide} className={styles.slideArrowPrev} aria-label="Slide anterior">‹</button>
                <button onClick={handleNextSlide} className={styles.slideArrowNext} aria-label="Siguiente slide">›</button>
                
                {/* Slide Indicator Dots */}
                <div className={styles.slideDots}>
                  {currentNiche.slides.map((_, idx) => (
                    <span
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`${styles.slideDot} ${activeSlideIndex === idx ? styles.slideDotActive : ""}`}
                    />
                  ))}
                </div>
              </div>

              {/* Category buttons horizontal quick navigation */}
              <div className={styles.horizontalCategories}>
                {currentNiche.categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`${styles.catBtn} ${selectedCategory === cat ? styles.catBtnActive : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sidebar + Grid Catalog Layout */}
              <div className={styles.catalogLayout}>
                {/* Sidebar Filter panel */}
                <aside className={styles.sidebar}>
                  <div className={styles.filterGroup}>
                    <h3 className={styles.filterTitle}>Categorías</h3>
                    <div className={styles.filterList}>
                      {currentNiche.categories.map((cat) => {
                        const count = cat === "Todos" 
                          ? nicheProducts.length 
                          : nicheProducts.filter(p => p.category === cat).length;
                        return (
                          <div
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`${styles.filterItem} ${selectedCategory === cat ? styles.filterItemActive : ""}`}
                          >
                            <span>{cat}</span>
                            <span className={styles.filterCount}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.filterGroup}>
                    <h3 className={styles.filterTitle}>Filtrar por Precio</h3>
                    <input
                      type="range"
                      min="1"
                      max="800"
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className={styles.priceRangeInput}
                    />
                    <div className={styles.priceLimits}>
                      <span>$1 USD</span>
                      <strong>Max: ${priceRange} USD</strong>
                    </div>
                  </div>
                </aside>

                {/* Products Grid */}
                <main className={styles.productsGrid}>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div key={product.id} className={styles.productCard}>
                        <div className={styles.cardImgWrapper}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className={styles.cardImg}
                            sizes="280px"
                            priority
                          />
                        </div>
                        <div className={styles.cardBody}>
                          <span className={styles.cardCategory}>{product.category}</span>
                          <h4 className={styles.cardTitle}>{product.name}</h4>
                          <div className={styles.cardRating}>
                            <span className={styles.stars}>{"★".repeat(product.stars)}</span>
                            <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>({product.stars}.0)</span>
                          </div>
                          
                          <div className={styles.cardFooter}>
                            <div className={styles.cardPriceRow}>
                              <span className={styles.priceLabel}>Precio:</span>
                              <span className={styles.priceValue}>${product.price.toFixed(2)} USD</span>
                            </div>
                            <a
                              href={getProductWhatsappLink(product)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.btnWhatsapp}
                            >
                              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 2.019 14.12 1.01 11.493 1.01 6.058 1.01 1.632 5.381 1.629 10.81c-.001 1.674.452 3.308 1.31 4.733L1.925 21.9l6.572-1.722c.007-.004.015-.008.022-.012z" />
                              </svg>
                              Comprar por WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.emptyState}>
                      <h3>No se encontraron productos</h3>
                      <p>Intenta ajustar los filtros de precio o de categoría para ver resultados.</p>
                    </div>
                  )}
                </main>
              </div>
            </>
          )}

          {/* =========================================
             VISTA ADMINISTRADOR (CRUD PANEL)
             ========================================= */}
          {activeTab === "admin" && (
            <div className={styles.adminLayout}>
              {/* Product Edit / Creation Form */}
              <div className={styles.formCard}>
                <h3 className={styles.formTitle}>
                  {editingProductId ? "Editar Producto" : "Agregar Nuevo Producto"}
                </h3>
                <form onSubmit={handleFormSubmit} className={styles.adminForm}>
                  <div className={styles.formGroup}>
                    <label>Nombre del Producto *</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder="Ej. T-Shirt Premium, Mancuerna, etc."
                      value={formState.name}
                      onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Precio (USD) *</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder="Ej. 49.99"
                      value={formState.price}
                      onChange={(e) => setFormState(prev => ({ ...prev, price: e.target.value }))}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Categoría *</label>
                    <select
                      className={styles.selectField}
                      value={formState.category}
                      onChange={(e) => setFormState(prev => ({ ...prev, category: e.target.value }))}
                      required
                    >
                      {currentNiche.categories.filter(c => c !== "Todos").map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Calificación (Estrellas)</label>
                    <select
                      className={styles.selectField}
                      value={formState.stars}
                      onChange={(e) => setFormState(prev => ({ ...prev, stars: parseInt(e.target.value) }))}
                    >
                      <option value="5">★★★★★ (5 estrellas)</option>
                      <option value="4">★★★★☆ (4 estrellas)</option>
                      <option value="3">★★★☆☆ (3 estrellas)</option>
                      <option value="2">★★☆☆☆ (2 estrellas)</option>
                      <option value="1">★☆☆☆☆ (1 estrella)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>URL de la Imagen (Opcional)</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder="Ruta local o url externa de imagen"
                      value={formState.image}
                      onChange={(e) => setFormState(prev => ({ ...prev, image: e.target.value }))}
                    />
                  </div>

                  <button type="submit" className={styles.btnSubmit}>
                    {editingProductId ? "Guardar Cambios" : "Guardar Producto"}
                  </button>

                  {editingProductId && (
                    <button type="button" onClick={handleCancelEdit} className={styles.btnCancel}>
                      Cancelar Edición
                    </button>
                  )}
                </form>
              </div>

              {/* Inventory Table List */}
              <div className={styles.inventoryCard}>
                <h3 className={styles.formTitle}>Listado de Inventario ({currentNiche.name})</h3>
                <div className={styles.tableWrapper}>
                  <table className={styles.inventoryTable}>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Calificación</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nicheProducts.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <div className={styles.tableImgCell}>
                              <div className={styles.tableImg}>
                                <Image src={product.image} alt={product.name} fill style={{ objectFit: "cover" }} sizes="40px" />
                              </div>
                              <span className={styles.tableName}>{product.name}</span>
                            </div>
                          </td>
                          <td>{product.category}</td>
                          <td><strong>${product.price.toFixed(2)} USD</strong></td>
                          <td>{"★".repeat(product.stars)}</td>
                          <td>
                            <div className={styles.actionsCell}>
                              <button onClick={() => handleEditClick(product)} className={styles.btnEdit}>Editar</button>
                              <button onClick={() => handleDeleteClick(product.id)} className={styles.btnDelete}>Eliminar</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Persistent Footer Banner Pitching the Service */}
      <footer className={styles.floatingFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerText}>
            ¿Quieres un catálogo virtual completo con gestión de inventario? <strong>Diseño premium en 48 horas.</strong>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/" className={styles.footerCTA}>
              Ver Planes y Precios →
            </Link>
            <a
              href="https://wa.me/573118772498?text=Hola!%20Vi%20la%20demo%20del%20marketplace%20con%20inventario%20y%20me%20gustar%C3%ADa%20cotizar%20este%20sistema%20para%20mi%20empresa."
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
