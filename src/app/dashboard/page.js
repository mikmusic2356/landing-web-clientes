"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import styles from "./dashboard.module.css";
import loginStyles from "./login.module.css";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Estados del Formulario de Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Estados de datos de citas
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilterType, setDateFilterType] = useState("all");
  const [customDate, setCustomDate] = useState("");

  // Modal para ver más información
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Verificar si ya hay una sesión activa
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchAppointments();
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, accessKey }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchAppointments();
      } else {
        setLoginError(data.error || "Datos de acceso incorrectos");
      }
    } catch (err) {
      setLoginError("Error de conexión con el servidor");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setAccessKey("");
  };

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments || []);
      } else {
        setError(data.error || "No se pudieron obtener las citas.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este agendamiento?")) return;
    try {
      const res = await fetch(`/api/appointments?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) => prev.filter((item) => item.id !== id));
        if (selectedAppointment?.id === id) {
          setSelectedAppointment(null);
        }
      } else {
        alert("Error al eliminar: " + data.error);
      }
    } catch (err) {
      alert("Error al eliminar agendamiento.");
    }
  };

  const STATUS_OPTIONS = [
    { value: "agendado", label: "🗓️ Agendado" },
    { value: "reunion_realizada", label: "✅ Ya tuve la reunión" },
    { value: "incomunicado", label: "📵 Cliente incomunicado" },
    { value: "posponer", label: "⏳ Posponer" },
    { value: "venta_realizada", label: "💰 Venta realizada" },
  ];

  const [savingStatusId, setSavingStatusId] = useState(null);
  const [statusDrafts, setStatusDrafts] = useState({});

  const handleStatusChange = (id, newStatus) => {
    setStatusDrafts((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const handleSaveStatus = async (id) => {
    const newStatus = statusDrafts[id];
    if (!newStatus) return;

    setSavingStatusId(id);
    try {
      const res = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedAppointment?.id === id) {
          setSelectedAppointment((prev) => ({ ...prev, status: newStatus }));
        }
        setStatusDrafts((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      } else {
        alert("Error al guardar: " + data.error);
      }
    } catch (err) {
      alert("Error de conexión al actualizar estado");
    } finally {
      setSavingStatusId(null);
    }
  };

  // Lógica de filtrado y búsqueda
  const filteredAppointments = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split("T")[0];

    return appointments.filter((item) => {
      if (dateFilterType === "today" && item.date !== today) return false;
      if (dateFilterType === "tomorrow" && item.date !== tomorrow) return false;
      if (dateFilterType === "upcoming" && item.date < today) return false;
      if (dateFilterType === "custom" && customDate && item.date !== customDate) return false;

      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const answersStr = item.answers ? JSON.stringify(item.answers).toLowerCase() : "";
        const matchName = (item.name || "").toLowerCase().includes(term);
        const matchPhone = (item.phone || "").toLowerCase().includes(term);
        const matchEmail = (item.email || "").toLowerCase().includes(term);
        const matchDate = (item.date || "").toLowerCase().includes(term);
        const matchTime = (item.time || "").toLowerCase().includes(term);
        const matchRegDate = (item.created_at || "").toLowerCase().includes(term);
        const matchId = String(item.id).includes(term);
        const matchAnswers = answersStr.includes(term);

        if (
          !matchName &&
          !matchPhone &&
          !matchEmail &&
          !matchDate &&
          !matchTime &&
          !matchRegDate &&
          !matchId &&
          !matchAnswers
        ) {
          return false;
        }
      }

      return true;
    });
  }, [appointments, searchTerm, dateFilterType, customDate]);

  const todayStr = new Date().toISOString().split("T")[0];
  const upcomingCount = appointments.filter((a) => a.date >= todayStr).length;

  // 1. Pantalla de carga inicial
  if (checkingAuth) {
    return (
      <div className={loginStyles.loginContainer}>
        <div style={{ color: "#94a3b8", fontSize: "1rem" }}>
          Verificando credenciales de acceso...
        </div>
      </div>
    );
  }

  // 2. Pantalla de Login de Autenticación (Usuario, Contraseña y Llave de Acceso)
  if (!isAuthenticated) {
    return (
      <div className={loginStyles.loginContainer}>
        <div className={loginStyles.loginCard}>
          <div className={loginStyles.loginHeader}>
            <div className={loginStyles.lockIcon}>🔒</div>
            <h1 className={loginStyles.loginTitle}>Acceso Administrador</h1>
            <p className={loginStyles.loginSubtitle}>
              Autenticación de seguridad requerida para ver los prospectos
            </p>
          </div>

          <form onSubmit={handleLogin} className={loginStyles.loginForm}>
            <div className={loginStyles.inputGroup}>
              <label className={loginStyles.inputLabel}>Nombre de Usuario</label>
              <input
                type="text"
                required
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={loginStyles.loginInput}
              />
            </div>

            <div className={loginStyles.inputGroup}>
              <label className={loginStyles.inputLabel}>Contraseña</label>
              <input
                type="password"
                required
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={loginStyles.loginInput}
              />
            </div>

            <div className={loginStyles.inputGroup}>
              <label className={loginStyles.inputLabel}>
                <span>Llave de Acceso (Access Key)</span>
                <span className={loginStyles.keyBadge}>Obligatorio</span>
              </label>
              <input
                type="text"
                required
                placeholder="KEY-XXXX-COL-XXXX"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className={loginStyles.loginInput}
              />
            </div>

            {loginError && (
              <div className={loginStyles.errorBox}>
                <span>⚠️</span> {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className={loginStyles.btnLogin}
            >
              {isLoggingIn ? "Verificando..." : "Ingresar al Panel →"}
            </button>
          </form>

          <div className={loginStyles.loginFooter}>
            <Link href="/" className={loginStyles.backLink}>
              ← Volver a la página web
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Panel de Control Autenticado
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.logoBadge}>TURSO SQL</span>
            <h1 className={styles.title}>Panel de Control · Prospectos & Citas</h1>
          </div>
          <div className={styles.headerActions}>
            <button onClick={fetchAppointments} className={styles.refreshBtn}>
              🔄 Actualizar
            </button>
            <Link href="/onboarding" className={styles.viewSiteBtn}>
              Ver Onboarding ↗
            </Link>
            <Link href="/" className={styles.viewSiteBtn}>
              Web Principal ↗
            </Link>
            <button onClick={handleLogout} className={loginStyles.logoutBtn}>
              Cerrar Sesión 🚪
            </button>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        {/* Métricas rápidas */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Registros</div>
            <div className={styles.statValue}>{appointments.length}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Próximas Reuniones</div>
            <div className={styles.statValue} style={{ color: "#00a859" }}>
              {upcomingCount}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Coincidencias de Búsqueda</div>
            <div className={styles.statValue} style={{ color: "#38bdf8" }}>
              {filteredAppointments.length}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Destino WhatsApp</div>
            <div className={styles.statValue} style={{ fontSize: "1.2rem", marginTop: "0.75rem", color: "#25d366" }}>
              +57 311 877 2498
            </div>
          </div>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div className={styles.filtersBar}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Buscar por nombre, teléfono, correo, fecha, respuesta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.dateFilterGroup}>
            <span className={styles.dateFilterLabel}>📅 Filtrar Cita:</span>
            <select
              value={dateFilterType}
              onChange={(e) => setDateFilterType(e.target.value)}
              className={styles.dateFilterSelect}
            >
              <option value="all">Todas las fechas</option>
              <option value="today">Reuniones de Hoy</option>
              <option value="tomorrow">Reuniones de Mañana</option>
              <option value="upcoming">Próximas en adelante</option>
              <option value="custom">Fecha específica...</option>
            </select>

            {dateFilterType === "custom" && (
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className={styles.customDateInput}
              />
            )}

            {(searchTerm || dateFilterType !== "all" || customDate) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setDateFilterType("all");
                  setCustomDate("");
                }}
                className={styles.clearFiltersBtn}
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Tabla Limpia y Ordenada */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3>Listado de Prospectos ({filteredAppointments.length})</h3>
            <span className={styles.dbTag}>● Base de datos en Turso</span>
          </div>

          {loading ? (
            <div className={styles.emptyState}>
              <p>Cargando información desde la base de datos...</p>
            </div>
          ) : error ? (
            <div className={styles.emptyState} style={{ color: "#ef4444" }}>
              <p>⚠️ {error}</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className={styles.emptyState}>
              <h4>No se encontraron prospectos</h4>
              <p>Prueba ajustando los filtros o realiza un nuevo registro desde el onboarding.</p>
            </div>
          ) : (
            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Fecha & Hora Registro</th>
                    <th>Fecha & Hora Reunión</th>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Estado de la Cita</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((item) => {
                    const cleanPhone = (item.phone || "").replace(/\D/g, "");
                    const waLink = `https://wa.me/${cleanPhone}`;
                    const currentStatus = statusDrafts[item.id] !== undefined ? statusDrafts[item.id] : (item.status || "agendado");
                    const hasChanged = statusDrafts[item.id] !== undefined && statusDrafts[item.id] !== (item.status || "agendado");

                    return (
                      <tr key={item.id}>
                        {/* 1. Fecha y hora del registro */}
                        <td>
                          <div className={styles.regDateBadge}>
                            <span className={styles.regDateText}>
                              {item.created_at || "Reciente"}
                            </span>
                            <span className={styles.regIdText}>ID #{item.id}</span>
                          </div>
                        </td>

                        {/* 2. Fecha y hora de la reunión */}
                        <td>
                          <div className={styles.meetingBadge}>
                            <span className={styles.meetingDate}>{item.date}</span>
                            <span className={styles.meetingTime}>⏰ {item.time}</span>
                          </div>
                        </td>

                        {/* 3. Nombre */}
                        <td>
                          <div className={styles.clientName}>{item.name}</div>
                          <div className={styles.clientEmail}>{item.email}</div>
                        </td>

                        {/* 4. Teléfono */}
                        <td>
                          <span className={styles.clientPhone}>{item.phone}</span>
                        </td>

                        {/* 5. Estado Desplegable + Botón Guardar Cambios */}
                        <td>
                          <div className={styles.statusSelectGroup}>
                            <select
                              value={currentStatus}
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                              className={styles.statusSelect}
                            >
                              {STATUS_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>

                            {hasChanged && (
                              <button
                                onClick={() => handleSaveStatus(item.id)}
                                disabled={savingStatusId === item.id}
                                className={styles.btnSaveStatus}
                              >
                                {savingStatusId === item.id ? "Guardando..." : "💾 Guardar"}
                              </button>
                            )}
                          </div>
                        </td>

                        {/* 6. Acciones: Ver más información, WhatsApp, Eliminar */}
                        <td>
                          <div className={styles.actionCell}>
                            <button
                              onClick={() => setSelectedAppointment(item)}
                              className={styles.btnDetails}
                            >
                              👁️ Ver más información
                            </button>

                            {cleanPhone && (
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.whatsappLink}
                                title="Abrir WhatsApp con cliente"
                              >
                                💬 WhatsApp
                              </a>
                            )}

                            <button
                              onClick={() => handleDelete(item.id)}
                              className={styles.deleteBtn}
                              title="Eliminar registro"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Pestaña Emergente / Modal con Toda la Información Recibida del Cliente */}
      {selectedAppointment && (
        <div className={styles.modalOverlay} onClick={() => setSelectedAppointment(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <div className={styles.modalAvatar}>
                  {(selectedAppointment.name || "C")[0].toUpperCase()}
                </div>
                <div>
                  <h3 className={styles.modalTitle}>{selectedAppointment.name}</h3>
                  <p className={styles.modalSubtitle}>
                    Registro ID #{selectedAppointment.id} · Creado el {selectedAppointment.created_at}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className={styles.modalCloseBtn}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Sección de Datos de Contacto y Cita */}
              <div className={styles.detailSection}>
                <span className={styles.sectionHeading}>📅 Datos del Agendamiento</span>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Fecha de la Videollamada</span>
                    <span className={styles.infoVal} style={{ color: "#00a859" }}>
                      {selectedAppointment.date}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Hora Programada</span>
                    <span className={styles.infoVal} style={{ color: "#00a859" }}>
                      {selectedAppointment.time}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Teléfono / WhatsApp</span>
                    <span className={styles.infoVal}>{selectedAppointment.phone}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Correo Electrónico</span>
                    <span className={styles.infoVal}>{selectedAppointment.email}</span>
                  </div>
                  <div className={styles.infoItemFull}>
                    <span className={styles.infoLabel}>Estado Actual del Prospecto</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.25rem' }}>
                      <select
                        value={statusDrafts[selectedAppointment.id] !== undefined ? statusDrafts[selectedAppointment.id] : (selectedAppointment.status || 'agendado')}
                        onChange={(e) => handleStatusChange(selectedAppointment.id, e.target.value)}
                        className={styles.statusSelect}
                        style={{ padding: '0.55rem 0.8rem', fontSize: '0.9rem' }}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {statusDrafts[selectedAppointment.id] !== undefined && statusDrafts[selectedAppointment.id] !== (selectedAppointment.status || 'agendado') && (
                        <button
                          onClick={() => handleSaveStatus(selectedAppointment.id)}
                          disabled={savingStatusId === selectedAppointment.id}
                          className={styles.btnSaveStatus}
                          style={{ padding: '0.55rem 0.9rem' }}
                        >
                          {savingStatusId === selectedAppointment.id ? 'Guardando...' : '💾 Guardar Cambios'}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className={styles.infoItemFull}>
                    <span className={styles.infoLabel}>Enlace Google Meet</span>
                    <a
                      href={selectedAppointment.meet_link || "https://meet.google.com/new"}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#38bdf8", textDecoration: "underline", fontSize: "0.9rem" }}
                    >
                      {selectedAppointment.meet_link || "https://meet.google.com/new"} ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Sección de Respuestas del Onboarding */}
              <div className={styles.detailSection}>
                <span className={styles.sectionHeading}>📋 Respuestas del Cuestionario</span>
                <div className={styles.answersContainer}>
                  {selectedAppointment.answers && Object.keys(selectedAppointment.answers).length > 0 ? (
                    Object.entries(selectedAppointment.answers).map(([pregunta, respuesta], idx) => (
                      <div key={idx} className={styles.answerCard}>
                        <div className={styles.answerQ}>{pregunta}</div>
                        <div className={styles.answerA}>
                          <span>👉</span> {respuesta}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: "#64748b", fontSize: "0.9rem" }}>
                      No se registraron respuestas específicas para este cliente.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              {selectedAppointment.phone && (
                <a
                  href={`https://wa.me/${selectedAppointment.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.whatsappLink}
                  style={{ padding: "0.6rem 1.1rem" }}
                >
                  💬 Escribir al WhatsApp
                </a>
              )}
              <button
                onClick={() => setSelectedAppointment(null)}
                className={styles.btnDetails}
                style={{ background: "rgba(255,255,255,0.06)", color: "#fff", borderColor: "rgba(255,255,255,0.15)" }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
