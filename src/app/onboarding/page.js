"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./onboarding.module.css";
import confetti from "canvas-confetti";

const QUESTIONS = [
  {
    id: 1,
    stepLabel: "🚀 PASO 1 DE 7",
    title: "¿Qué tipo de WEB necesitas? 💻",
    subtitle: "Selecciona la opción que mejor describa tu objetivo:",
    options: [
      "🎯 Landing page · Conseguir clientes",
      "🌐 Página empresarial · Mostrar mi negocio",
      "🛒 Tienda online · Vender productos",
      "⚙️ Plataforma · Funciones a medida",
      "🔄 Rediseño · Mejorar mi web actual",
    ],
  },
  {
    id: 2,
    stepLabel: "🏢 PASO 2 DE 7",
    title: "¿En qué etapa está tu NEGOCIO?",
    subtitle: "Esto nos ayuda a entender tu punto de partida:",
    options: [
      "🚀 Ya tengo un negocio funcionando",
      "🌱 Estoy empezando mi negocio",
      "📱 Ya vendo por redes sociales",
      "🔎 Estoy explorando opciones",
    ],
  },
  {
    id: 3,
    stepLabel: "🎯 PASO 3 DE 7",
    title: "¿Qué quieres LOGRAR con tu web?",
    subtitle: "El impacto comercial principal que buscas:",
    options: [
      "👥 Conseguir más clientes",
      "💰 Vender por internet",
      "✨ Mejorar la imagen de mi negocio",
      "⚡ Automatizar tareas o procesos",
      "💡 Necesito orientación",
    ],
  },
  {
    id: 4,
    stepLabel: "💵 PASO 4 DE 7",
    title: "¿Cuánto quieres INVERTIR?",
    subtitle: "Rango de inversión previsto en COP:",
    options: [
      "💸 Menos de $400.000 COP",
      "💵 $400.000–$600.000 COP",
      "💰 $600.000–$1.200.000 COP",
      "🚀 Más de $1.200.000 COP",
      "🤔 Necesito una cotización",
    ],
  },
  {
    id: 5,
    stepLabel: "📅 PASO 5 DE 7",
    title: "¿Cuándo quieres lanzar tu WEB?",
    subtitle: "Define tu nivel de urgencia o fecha deseada:",
    options: [
      "⚡ Lo antes posible",
      "🗓️ En 7–15 días",
      "📆 En el próximo mes",
      "⏳ En 2–3 meses",
      "🤷 Aún no tengo fecha",
    ],
  },
  {
    id: 6,
    stepLabel: "🤝 PASO 6 DE 7",
    title: "¿Estás listo para CONTRATAR?",
    subtitle: "Tu disposición actual para iniciar:",
    options: [
      "✅ Sí, si la propuesta me convence",
      "🔎 Estoy comparando opciones",
      "🤝 Debo consultarlo con mi socio",
      "💲 Solo quiero conocer precios",
    ],
  },
  {
    id: 7,
    stepLabel: "🎁 PASO 7 DE 7",
    title: "¿Agendamos tu ASESORÍA GRATIS? 🎉",
    subtitle: "⏱️ 15 minutos · 🎥 Google Meet · Sin compromiso",
    options: [
      "🎉 Sí, quiero agendar mi videollamada",
      "💬 Quiero más información primero",
      "⏳ Prefiero hacerlo más adelante",
    ],
  },
];

// Generar días laborables (próximos días hábiles)
function getAvailableDays() {
  const days = [];
  const now = new Date();
  let added = 0;
  let offset = 1;

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const monthNames = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];

  while (added < 10) {
    const d = new Date(now);
    d.setDate(now.getDate() + offset);
    offset++;

    // Omitir domingos (0)
    if (d.getDay() === 0) continue;

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    days.push({
      dateStr,
      dayName: dayNames[d.getDay()],
      dayNum: d.getDate(),
      monthName: monthNames[d.getMonth()],
      fullDateLabel: `${dayNames[d.getDay()]} ${d.getDate()} de ${monthNames[d.getMonth()]}, ${yyyy}`,
    });
    added++;
  }
  return days;
}

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

const TARGET_WHATSAPP = "573118772498";

// Función de disparo de luces/confeti mágico
function triggerMagicSparkles() {
  try {
    // Destello de chispas en pantalla
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#00a859", "#34d399", "#f59e0b", "#60a5fa", "#ffffff"],
      ticks: 120,
      gravity: 1.1,
      scalar: 0.9,
    });
  } catch (err) {
    // Fallback silencioso si no carga canvas
  }
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0 a 6 (preguntas), 7 (agendador), 8 (exito)
  const [answers, setAnswers] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  // Scheduler state
  const availableDays = getAvailableDays();
  const [selectedDate, setSelectedDate] = useState(availableDays[0]?.dateStr || "");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Form contact info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successInfo, setSuccessInfo] = useState(null);

  // Cargar horas ocupadas al cambiar la fecha seleccionada
  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    fetch(`/api/appointments?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBookedTimes(data.bookedTimes || []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  const handleSelectOption = (questionObj, option) => {
    // Guardar respuesta con el título de la pregunta
    setAnswers((prev) => ({
      ...prev,
      [questionObj.title]: option,
    }));
  };

  const handleNext = () => {
    // Efecto de magia y luces
    triggerMagicSparkles();
    setIsFlashing(true);
    setIsTransitioning(true);

    setTimeout(() => {
      setIsFlashing(false);
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(QUESTIONS.length);
      }
      setIsTransitioning(false);
    }, 250);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQ = QUESTIONS[currentStep];
  const isQuestionStep = currentStep < QUESTIONS.length;
  const progressPercent = Math.round(((currentStep + 1) / (QUESTIONS.length + 1)) * 100);
  const selectedDayObj = availableDays.find((d) => d.dateStr === selectedDate);

  const handleConfirmMeeting = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedDate || !selectedTime) {
      setErrorMsg("Por favor selecciona un día y una hora para tu videollamada.");
      return;
    }
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg("Por favor completa tu nombre, WhatsApp y correo.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Guardar en Base de Datos Turso (todas las respuestas del cuestionario)
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          date: selectedDate,
          time: selectedTime,
          answers, // Objeto completo con las 7 preguntas y respuestas
          meet_link: "https://meet.google.com/new",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Ocurrió un error al agendar la reunión.");
      }

      // Gran explosión de confeti y magia al agendar
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#00a859", "#34d399", "#f59e0b", "#2563eb", "#ec4899"],
        });
      } catch (e) {}

      // 2. Preparar mensaje para WhatsApp al +573118772498
      const dateFormatted = selectedDayObj ? selectedDayObj.fullDateLabel : selectedDate;
      const respSummary = QUESTIONS.map((q, idx) => {
        const userResp = answers[q.title] || "No especificado";
        return `*${q.stepLabel}:*\n_${q.title}_\n👉 *${userResp}*`;
      }).join("\n\n");

      const whatsappText = `👋 *¡Nueva Solicitud de Reunión por Google Meet!* 🚀

👤 *DATOS DEL CLIENTE:*
• *Nombre:* ${name.trim()}
• *WhatsApp / Tel:* ${phone.trim()}
• *Correo:* ${email.trim()}

📅 *AGENDAMIENTO DE VIDEOLLAMADA:*
• *Fecha:* ${dateFormatted}
• *Hora:* ${selectedTime}
• *Plataforma:* Google Meet (15 minutos)

📋 *CUESTIONARIO DE ONBOARDING RESPONDIDO:*
${respSummary}

✨ _Enviado desde el Onboarding Interactivo_`;

      const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP}?text=${encodeURIComponent(whatsappText)}`;

      setSuccessInfo({
        name,
        dateFormatted,
        selectedTime,
        whatsappUrl,
      });

      // Abrir WhatsApp en nueva pestaña
      window.open(whatsappUrl, "_blank");

      // Paso de éxito final
      setCurrentStep(QUESTIONS.length + 1);
    } catch (err) {
      setErrorMsg(err.message || "Error al conectar con la base de datos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Aura mágica luminosa en el fondo */}
      <div
        className={`${styles.magicAura} ${isFlashing ? styles.magicAuraActive : ""}`}
      />

      <main className={styles.mainContent}>
        {/* Barra de progreso */}
        {currentStep <= QUESTIONS.length && (
          <div className={styles.progressHeader}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className={styles.stepIndicator}>
              <span>
                {isQuestionStep
                  ? `${currentQ.stepLabel}`
                  : "🎁 Agendamiento & Datos"}
              </span>
              <span>{progressPercent}% completado ✨</span>
            </div>
          </div>
        )}

        {/* Pasos de Preguntas (1 a 7) */}
        {isQuestionStep && (
          <div
            className={`${styles.card} ${styles.cardAnimateIn} ${
              isFlashing ? styles.cardFlashEffect : ""
            }`}
            key={currentQ.id}
          >
            <div className={styles.tagline}>{currentQ.stepLabel}</div>
            <h1 className={styles.questionTitle}>{currentQ.title}</h1>
            {currentQ.subtitle && (
              <p className={styles.questionSubtitle}>{currentQ.subtitle}</p>
            )}

            <div className={styles.optionsGrid}>
              {currentQ.options.map((opt, i) => {
                const isSelected = answers[currentQ.title] === opt;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectOption(currentQ, opt)}
                    className={`${styles.optionButton} ${
                      isSelected ? styles.optionSelected : ""
                    }`}
                  >
                    <div
                      className={`${styles.optionRadio} ${
                        isSelected ? styles.optionRadioActive : ""
                      }`}
                    >
                      {isSelected && <div className={styles.optionRadioInner} />}
                    </div>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.buttonRow}>
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.btnSecondary}
                >
                  ← Anterior
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleNext}
                disabled={!answers[currentQ.title] || isTransitioning}
                className={styles.btnPrimary}
              >
                {currentStep === QUESTIONS.length - 1
                  ? "Agendar mi Reunión 🎉"
                  : "Siguiente ✨"}
              </button>
            </div>
          </div>
        )}

        {/* Paso Final: Agendador Google Meet y Formulario */}
        {currentStep === QUESTIONS.length && (
          <div className={`${styles.card} ${styles.cardAnimateIn}`}>
            <div className={styles.schedulerContainer}>
              <div className={styles.scheduleHeader}>
                <div className={styles.tagline}>🎁 Agendamiento Confirmado</div>
                <h2>Elige el horario de tu Asesoría Gratis 📅</h2>
                <p style={{ color: "#4b6358", fontSize: "0.98rem", marginTop: "0.25rem" }}>
                  Selecciona el día y la hora disponible que mejor te convenga para conectarnos por Google Meet.
                </p>
                <div style={{ marginTop: "0.75rem" }}>
                  <span className={styles.meetBadge}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                    </svg>
                    Google Meet · 15 Minutos · Asesoría Personalizada
                  </span>
                </div>
              </div>

              {/* Selector de Días */}
              <div>
                <label style={{ fontSize: "0.92rem", fontWeight: "700", color: "#1f3d2f" }}>
                  1. Selecciona un día disponible:
                </label>
                <div className={styles.datePickerGrid}>
                  {availableDays.map((d) => {
                    const isSelected = selectedDate === d.dateStr;
                    return (
                      <button
                        key={d.dateStr}
                        type="button"
                        onClick={() => {
                          setSelectedDate(d.dateStr);
                          setSelectedTime("");
                        }}
                        className={`${styles.dateCard} ${
                          isSelected ? styles.dateCardSelected : ""
                        }`}
                      >
                        <div className={styles.dateDayName}>{d.dayName}</div>
                        <div className={styles.dateDayNum}>{d.dayNum}</div>
                        <div className={styles.dateMonthName}>{d.monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selector de Horas */}
              <div className={styles.timeSlotsSection}>
                <label style={{ fontSize: "0.92rem", fontWeight: "700", color: "#1f3d2f" }}>
                  2. Horarios disponibles ({selectedDayObj ? selectedDayObj.fullDateLabel : ""}):
                </label>
                {loadingSlots ? (
                  <p style={{ color: "#627d72", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                    Cargando horarios disponibles...
                  </p>
                ) : (
                  <div className={styles.slotsGrid}>
                    {TIME_SLOTS.map((slot) => {
                      const isBooked = bookedTimes.includes(slot);
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedTime(slot)}
                          className={`${styles.slotButton} ${
                            isSelected ? styles.slotSelected : ""
                          } ${isBooked ? styles.slotDisabled : ""}`}
                        >
                          {slot}
                          {isBooked && (
                            <div style={{ fontSize: "0.68rem", color: "#ef4444", fontWeight: 700 }}>
                              Reservado
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Formulario de Contacto */}
              <form onSubmit={handleConfirmMeeting} className={styles.formSection}>
                <label style={{ fontSize: "0.98rem", fontWeight: "800", color: "#0f291e" }}>
                  3. Tus datos para confirmar y enlazar la reunión:
                </label>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Nombre y Apellido *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Número de WhatsApp / Teléfono *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +57 311 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="Ej. tuempresa@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                </div>

                {selectedDate && selectedTime && (
                  <div className={styles.summaryBox}>
                    <div style={{ fontWeight: 800, color: "#00a859", marginBottom: "0.35rem" }}>
                      ✨ Resumen de tu videollamada:
                    </div>
                    <div className={styles.summaryItem}>
                      📅 <strong>Fecha:</strong> {selectedDayObj?.fullDateLabel}
                    </div>
                    <div className={styles.summaryItem}>
                      ⏰ <strong>Hora:</strong> {selectedTime} (Google Meet · 15 min)
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <p style={{ color: "#ef4444", fontSize: "0.95rem", marginTop: "0.6rem", fontWeight: 600 }}>
                    ⚠️ {errorMsg}
                  </p>
                )}

                <div style={{ marginTop: "1.75rem" }}>
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedTime}
                    className={styles.confirmBtn}
                  >
                    {isSubmitting ? (
                      "Guardando y abriendo WhatsApp..."
                    ) : (
                      <>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                        </svg>
                        Confirmar Reunión y Enviar a WhatsApp
                      </>
                    )}
                  </button>
                  <p style={{ fontSize: "0.82rem", color: "#627d72", textAlign: "center", marginTop: "0.75rem" }}>
                    Al confirmar, tus respuestas se guardarán en la base de datos y se abrirá WhatsApp con los detalles de tu cita.
                  </p>
                </div>
              </form>

              <div className={styles.buttonRow}>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.btnSecondary}
                >
                  ← Modificar Respuestas
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Paso de Éxito Final */}
        {currentStep > QUESTIONS.length && successInfo && (
          <div className={`${styles.card} ${styles.successCard}`}>
            <div className={styles.successIcon}>✓</div>
            <h2 style={{ fontSize: "1.9rem", color: "#0f291e", marginBottom: "0.5rem", fontWeight: 800 }}>
              ¡Reunión Agendada Exitosamente! 🎉
            </h2>
            <p style={{ color: "#374151", fontSize: "1.1rem", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
              Muchas gracias, <strong>{successInfo.name}</strong>. Tu cita y respuestas han quedado guardadas para el día <strong>{successInfo.dateFormatted}</strong> a las <strong>{successInfo.selectedTime}</strong>.
            </p>

            <div className={styles.summaryBox} style={{ maxWidth: "460px", margin: "0 auto 2rem", textAlign: "left" }}>
              <div>📹 <strong>Canal:</strong> Google Meet (15 minutos)</div>
              <div>💬 <strong>WhatsApp de destino:</strong> +57 311 877 2498</div>
              <div>💾 <strong>Estado:</strong> Registrado en la base de datos</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "340px", margin: "0 auto" }}>
              <a
                href={successInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.confirmBtn}
                style={{ textDecoration: "none", fontSize: "1rem" }}
              >
                Abrir WhatsApp de Nuevo 💬
              </a>
              <Link href="/" className={styles.btnSecondary} style={{ textAlign: "center" }}>
                Volver a la Web Principal
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
