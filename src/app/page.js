'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Configuración general modificable fácilmente por el usuario
const CONFIG = {
  whatsappNumber: '+573118772498', // Reemplazar con el número real (incluyendo prefijo de país, sin el +)
  whatsappMessage: 'Estoy interesado en tus servicios como diseñador web, ¿podemos hablar?',
  brandName: 'WEB CLIENTES',
  brandSlogan: 'Tu negocio en internet',
  priceCOP: '499.900',
};

// Enlace directo a WhatsApp
const getWhatsappLink = (customMsg = CONFIG.whatsappMessage) => {
  return `https://wa.me/${CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(customMsg)}`;
};

// Componente para la simulación animada al pasar el cursor (hover) en el showcase
function ShowcasePhone({ demo }) {
  const [screen, setScreen] = useState('store'); // 'store' o 'whatsapp'
  const [cursor, setCursor] = useState('idle'); // 'idle', 'moving', 'clicked'
  const [pressed, setPressed] = useState(false);
  const [timeoutsList, setTimeoutsList] = useState([]);

  const startAnimation = () => {
    stopAnimation();

    const t1 = setTimeout(() => {
      setCursor('moving');
    }, 400);

    const t2 = setTimeout(() => {
      setCursor('clicked');
      setPressed(true);
    }, 1400);

    const t3 = setTimeout(() => {
      setScreen('whatsapp');
      setCursor('idle');
      setPressed(false);
    }, 1700);

    setTimeoutsList([t1, t2, t3]);
  };

  const stopAnimation = () => {
    timeoutsList.forEach(clearTimeout);
    setTimeoutsList([]);
    setScreen('store');
    setCursor('idle');
    setPressed(false);
  };

  useEffect(() => {
    return () => timeoutsList.forEach(clearTimeout);
  }, [timeoutsList]);

  return (
    <div
      className={styles.showcaseCard}
      onMouseEnter={startAnimation}
      onMouseLeave={stopAnimation}
    >
      <span className={styles.mockupTitle}>{demo.title}</span>
      <div className={styles.demoPhone}>
        <div className={styles.phoneScreen}>
          {screen === 'store' ? (
            <div className={styles.demoSite}>
              <div className={styles.demoSiteHeader}>
                <span>{demo.name}</span>
                <span>🛒</span>
              </div>
              <div className={styles.demoSiteBody}>
                <div
                  className={styles.demoSiteImg}
                  style={{
                    backgroundImage: `url(${demo.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <span className={styles.demoSiteName}>{demo.name}</span>
                <p className={styles.demoSiteText}>Servicios de alta calidad al mejor precio del mercado.</p>
                <button className={`${styles.demoSiteBtn} ${pressed ? styles.phoneStoreBtnPressed : ''}`}>
                  📱 {demo.btnText}
                </button>
              </div>

              {/* Cursor animado */}
              <div className={`${styles.phoneCursor} ${styles[`cursor_${cursor}`]}`} style={{ fontSize: '24px' }}>
                👆
              </div>
            </div>
          ) : (
            <div className={styles.phoneWhatsappScreen}>
              <div className={styles.phoneWhatsappHeader} style={{ padding: '6px 8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className={styles.phoneWhatsappBack}>←</span>
                  <div className={styles.phoneWhatsappAvatar} style={{ width: '18px', height: '18px', fontSize: '9px' }}>W</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span className={styles.phoneWhatsappName} style={{ fontSize: '9px' }}>{demo.name}</span>
                    <span className={styles.phoneWhatsappStatus} style={{ fontSize: '7px' }}>En línea</span>
                  </div>
                </div>
              </div>
              <div className={styles.phoneWhatsappBody} style={{ padding: '8px' }}>
                <div className={styles.phoneWhatsappBubble} style={{ maxWidth: '90%', padding: '6px 10px', borderRadius: '6px', fontSize: '9px' }}>
                  <span>Hola, me interesa agendar para {demo.title} 🚀</span>
                  <div className={styles.phoneWhatsappTime} style={{ fontSize: '6px' }}>
                    10:30 AM <span style={{ color: '#34b7f1', fontWeight: 'bold' }}>✓✓</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Estados para la simulación animada del teléfono en la portada
  const [demoScreen, setDemoScreen] = useState('store'); // 'store' o 'whatsapp'
  const [cursorState, setCursorState] = useState('idle'); // 'idle', 'moving', 'clicked'
  const [btnPressed, setBtnPressed] = useState(false);

  useEffect(() => {
    const loop = () => {
      setDemoScreen('store');
      setCursorState('idle');
      setBtnPressed(false);

      const moveTimeout = setTimeout(() => {
        setCursorState('moving');
      }, 1200);

      const clickTimeout = setTimeout(() => {
        setCursorState('clicked');
        setBtnPressed(true);
      }, 2500);

      const screenTimeout = setTimeout(() => {
        setDemoScreen('whatsapp');
        setCursorState('idle');
        setBtnPressed(false);
      }, 2900);

      return { moveTimeout, clickTimeout, screenTimeout };
    };

    let timeouts = loop();
    const interval = setInterval(() => {
      timeouts = loop();
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeouts.moveTimeout);
      clearTimeout(timeouts.clickTimeout);
      clearTimeout(timeouts.screenTimeout);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Datos para los ejemplos de negocios (mockups)
  const businessDemos = [
    {
      title: 'Tienda de Calzado',
      name: 'Zapatillas Urbanas',
      price: '$59.99',
      image: '/images/calzado.avif',
      btnText: 'COMPRAR POR WHATSAPP',
      emoji: '👟'
    },
    {
      title: 'Ropa y Moda',
      name: 'Boutique Elegancia',
      price: '$35.00',
      image: '/images/ropa.avif',
      btnText: 'COMPRAR POR WHATSAPP',
      emoji: '👗'
    },
    {
      title: 'Clínica Veterinaria',
      name: 'Veterinaria Pro',
      price: 'Cita en Línea',
      image: '/images/veterinaria.avif',
      btnText: 'AGENDAR CITA',
      emoji: '🩺'
    },
    {
      title: 'Gimnasios',
      name: 'Power Gym',
      price: 'Planes Mensuales',
      image: '/images/gym.avif',
      btnText: 'QUIERO MÁS INFO',
      emoji: '💪'
    },
    {
      title: 'Restaurantes',
      name: 'Burger & Co.',
      price: '$12.99',
      image: '/images/restaurante.png',
      btnText: 'PEDIR POR WHATSAPP',
      emoji: '🍔'
    },
    {
      title: 'Frutería',
      name: 'Mercado Fresco',
      price: 'Domicilio Express',
      image: '/images/fruteria.png',
      btnText: 'HACER PEDIDO',
      emoji: '🍎'
    }
  ];

  // Preguntas frecuentes
  const faqs = [
    {
      q: '¿Qué incluye la página por $499.900 COP?',
      a: 'Incluye diseño 100% responsive optimizado para celulares, integración directa de botones de compra hacia tu WhatsApp, hosting y subdominio incluidos por el primer año, galería de tus productos o servicios, y optimización de velocidad.'
    },
    {
      q: '¿Realmente está lista en menos de 48 horas?',
      a: 'Sí. Una vez nos entregues la información básica de tu negocio (fotos, precios y descripción), nuestro equipo empieza a trabajar y tu página estará al aire en un plazo máximo de 48 horas hábiles.'
    },
    {
      q: '¿Tengo que pagar mensualidades?',
      a: 'No. El pago es único por la creación y configuración. El dominio y hosting están incluidos por 1 año. Al año siguiente, solo renuevas los servicios de alojamiento a un costo mínimo estándar.'
    },
    {
      q: '¿Cómo funciona el embudo de WhatsApp?',
      a: 'Cuando un cliente visita tu página desde su celular, ve tu catálogo y al hacer clic en "Comprar" o "Preguntar", se le abrirá automáticamente su WhatsApp con un mensaje preconfigurado indicándote exactamente qué producto o servicio le interesa. Tú cierras la venta directamente.'
    },
    {
      q: '¿Puedo tener un dominio propio (.com, .co)?',
      a: '¡Por supuesto! Si ya tienes un dominio o deseas comprar uno propio (ej. www.tunegocio.com), te ayudamos a conectarlo sin ningún costo adicional.'
    }
  ];

  return (
    <div className={styles.main}>
      {/* Header & Navigation */}
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.nav} ${menuOpen ? styles.menuActive : ''}`}>
          <div className={styles.logoContainer} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className={styles.logoIcon}>W</div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>{CONFIG.brandName}</span>
              <span className={styles.logoSub}>{CONFIG.brandSlogan}</span>
            </div>
          </div>

          <ul className={styles.navLinks}>
            <li><a href="#beneficios">Beneficios</a></li>
            <li><a href="#ejemplos">Ejemplos</a></li>
            <li><a href="#como-funciona">Cómo funciona</a></li>
            <li><a href="#precios">Precios</a></li>
            <li><a href="#preguntas">Preguntas Frecuentes</a></li>
          </ul>

          <a href={getWhatsappLink()} className={`${styles.headerBtn} ${styles.pulseButton}`}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.904 7.904 0 0 0 1.08 3.971L0 16l4.143-1.086A7.9 7.9 0 0 0 7.993 16c4.367 0 7.926-3.558 7.93-7.93A7.897 7.897 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.101-1.194-.59-1.378-.658-.185-.067-.32-.103-.454.101-.135.203-.52.659-.637.793-.117.135-.235.151-.438.05-2.007-.997-3.213-2.749-3.713-3.621-.13-.226-.014-.349.1-.462.101-.102.203-.236.304-.354.1-.117.135-.198.203-.33.067-.132.033-.248-.017-.35-.05-.101-.454-1.093-.622-1.498-.164-.395-.325-.341-.454-.347-.117-.006-.252-.007-.387-.007-.135 0-.356.05-.542.253-.186.203-.709.693-.709 1.69 0 1 .726 1.967.828 2.102.102.134 1.43 2.183 3.465 3.063.483.21.86.335 1.154.429.485.154.927.132 1.277.08.39-.058 1.194-.488 1.362-.958.167-.47.167-.872.117-.957-.05-.084-.185-.135-.388-.236z"/>
            </svg>
            Quiero más clientes
          </a>

          <div className={styles.menuToggle} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileActive : ''}`}>
          <ul className={styles.mobileMenuLinks}>
            <li><a href="#beneficios" onClick={toggleMenu}>Beneficios</a></li>
            <li><a href="#ejemplos" onClick={toggleMenu}>Ejemplos</a></li>
            <li><a href="#como-funciona" onClick={toggleMenu}>Cómo funciona</a></li>
            <li><a href="#precios" onClick={toggleMenu}>Precios</a></li>
            <li><a href="#preguntas" onClick={toggleMenu}>Preguntas Frecuentes</a></li>
          </ul>
          <a href={getWhatsappLink()} className={`${styles.headerBtn} ${styles.mobileMenuBtn}`}>
            Quiero más clientes
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <span>⚡ Páginas web optimizadas para convertir</span>
            </div>
            <h1 className={styles.heroTitle}>
              Más <span>Clientes</span> por WhatsApp en Menos de <mark>48 Horas</mark>
            </h1>
            <p className={styles.heroDesc}>
              Creamos páginas profesionales y veloces que convierten visitantes cotidianos en clientes reales y ventas directas a tu WhatsApp.
            </p>

            <div className={styles.heroChecklist}>
              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Lista en menos de 48 horas</span>
              </div>
              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Adaptada a celulares</span>
              </div>
              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Diseño profesional y moderno</span>
              </div>
              <div className={styles.checkItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Botón directo a WhatsApp</span>
              </div>
            </div>

            <div className={styles.ctaContainer}>
              <a href={getWhatsappLink()} className={`${styles.btnPrimary} ${styles.pulseButton}`}>
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.904 7.904 0 0 0 1.08 3.971L0 16l4.143-1.086A7.9 7.9 0 0 0 7.993 16c4.367 0 7.926-3.558 7.93-7.93A7.897 7.897 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.101-1.194-.59-1.378-.658-.185-.067-.32-.103-.454.101-.135.203-.52.659-.637.793-.117.135-.235.151-.438.05-2.007-.997-3.213-2.749-3.713-3.621-.13-.226-.014-.349.1-.462.101-.102.203-.236.304-.354.1-.117.135-.198.203-.33.067-.132.033-.248-.017-.35-.05-.101-.454-1.093-.622-1.498-.164-.395-.325-.341-.454-.347-.117-.006-.252-.007-.387-.007-.135 0-.356.05-.542.253-.186.203-.709.693-.709 1.69 0 1 .726 1.967.828 2.102.102.134 1.43 2.183 3.465 3.063.483.21.86.335 1.154.429.485.154.927.132 1.277.08.39-.058 1.194-.488 1.362-.958.167-.47.167-.872.117-.957-.05-.084-.185-.135-.388-.236z"/>
                </svg>
                QUIERO MÁS CLIENTES
              </a>
              <span className={styles.ctaSubtext}> Te asesoramos gratis por WhatsApp 📲 </span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={`${styles.phoneMockup} ${styles.floatElement}`}>
              <div className={styles.phoneScreen}>
                {demoScreen === 'store' ? (
                  <>
                    <div className={styles.phoneHeader}>
                      <span>TU NEGOCIO</span>
                      <span>☰</span>
                    </div>
                    <div className={styles.phoneContent}>
                      <div className={styles.phoneStoreCard}>
                        <div className={styles.phoneStoreImg} style={{ backgroundImage: 'url("/images/zapatillas.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        </div>
                        <span className={styles.phoneStoreName}>Zapatillas Deportivas Pro</span>
                        <span className={styles.phoneStorePrice}>$59.99 USD</span>
                        <button
                          className={`${styles.phoneStoreBtn} ${btnPressed ? styles.phoneStoreBtnPressed : ''}`}
                          onClick={() => window.open(getWhatsappLink('Hola, me interesan las Zapatillas Deportivas Pro de $59.99 USD'), '_blank')}
                        >
                          🛒 COMPRAR POR WHATSAPP
                        </button>
                      </div>
                    </div>

                    {/* Cursor / Puntero que da clic */}
                    <div className={`${styles.phoneCursor} ${styles[`cursor_${cursorState}`]}`}>
                      👆
                    </div>
                  </>
                ) : (
                  <div className={styles.phoneWhatsappScreen}>
                    <div className={styles.phoneWhatsappHeader}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={styles.phoneWhatsappBack}>←</span>
                        <div className={styles.phoneWhatsappAvatar}>W</div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span className={styles.phoneWhatsappName}>{CONFIG.brandName}</span>
                          <span className={styles.phoneWhatsappStatus}>En línea</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '12px' }}>📞</span>
                    </div>
                    <div className={styles.phoneWhatsappBody}>
                      <div className={styles.phoneWhatsappBubble}>
                        <span>{CONFIG.whatsappMessage}</span>
                        <div className={styles.phoneWhatsappTime}>
                          10:30 AM <span style={{ color: '#34b7f1', fontWeight: 'bold' }}>✓✓</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.floatWhatsapp} onClick={() => window.open(getWhatsappLink(), '_blank')}>
              <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.904 7.904 0 0 0 1.08 3.971L0 16l4.143-1.086A7.9 7.9 0 0 0 7.993 16c4.367 0 7.926-3.558 7.93-7.93A7.897 7.897 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.101-1.194-.59-1.378-.658-.185-.067-.32-.103-.454.101-.135.203-.52.659-.637.793-.117.135-.235.151-.438.05-2.007-.997-3.213-2.749-3.713-3.621-.13-.226-.014-.349.1-.462.101-.102.203-.236.304-.354.1-.117.135-.198.203-.33.067-.132.033-.248-.017-.35-.05-.101-.454-1.093-.622-1.498-.164-.395-.325-.341-.454-.347-.117-.006-.252-.007-.387-.007-.135 0-.356.05-.542.253-.186.203-.709.693-.709 1.69 0 1 .726 1.967.828 2.102.102.134 1.43 2.183 3.465 3.063.483.21.86.335 1.154.429.485.154.927.132 1.277.08.39-.058 1.194-.488 1.362-.958.167-.47.167-.872.117-.957-.05-.084-.185-.135-.388-.236z"/>
              </svg>
            </div>

            <div className={styles.moneyVisual}>
              <span className={styles.moneyStack}>💵</span>
              <div className={styles.moneyText}>
                <span className={styles.moneyVal}>+ Ventas Diarias</span>
                <span className={styles.moneyLabel}>Directas a tu chat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VS Section */}
      <section id="beneficios" className={styles.vsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Cada día sin presencia online son clientes que terminan comprando a <span>tu competencia</span>.
            </h2>
            <p className={styles.sectionDesc}>La diferencia entre perder ventas a diario o tener tu canal de ventas funcionando en piloto automático.</p>
          </div>

          <div className={styles.vsGrid}>
            {/* Sin Página Web */}
            <div className={`${styles.vsCard} ${styles.vsCardNegative}`}>
              <h3 className={`${styles.vsCardTitle} ${styles.vsCardTitleNegative}`}>❌ SIN PÁGINA WEB</h3>
              <div className={styles.vsImgPlaceholder}>
                <span className={styles.vsStoreClosed}>CERRADO</span>
                🏢
              </div>
              <ul className={`${styles.vsList} ${styles.vsListNegative}`}>
                <li>No apareces en las búsquedas de Google</li>
                <li>No generas confianza ni credibilidad</li>
                <li>Pierdes clientes todos los días</li>
                <li>Ventas limitadas al horario físico</li>
              </ul>
            </div>

            {/* VS Badge */}
            <div className={styles.vsBadge}>VS</div>

            {/* Con Página Web */}
            <div className={`${styles.vsCard} ${styles.vsCardPositive}`}>
              <h3 className={`${styles.vsCardTitle} ${styles.vsCardTitlePositive}`}>✅ CON PÁGINA PROFESIONAL</h3>
              <div className={styles.vsImgPlaceholder}>
                <span className={styles.vsStoreOpen}>ABIERTO 24/7</span>
                🏪
              </div>
              <ul className={`${styles.vsList} ${styles.vsListPositive}`}>
                <li>Más consultas directas de clientes a tu WhatsApp</li>
                <li>Brindas total confianza y seriedad</li>
                <li>Catálogo interactivo disponible 24/7</li>
                <li>Incrementas tus ventas desde la primera semana</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase / Ejemplos Section */}
      <section id="ejemplos" className={styles.showcaseSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Así podría verse tu negocio <span>esta misma semana</span></h2>
            <p className={styles.sectionDesc}>Diseñamos interfaces adaptadas a tu nicho de mercado con botones y llamados a la acción claros.</p>
          </div>

          <div className={styles.sliderContainer}>
            {businessDemos.map((demo, idx) => (
              <ShowcasePhone demo={demo} key={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Process / Pasos Section */}
      <section id="como-funciona" className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Así de fácil: tu página lista en <span>4 pasos</span></h2>
            <p className={styles.sectionDesc}>Un proceso ágil, rápido y sin complicaciones técnicas para ti.</p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>1</span>
              <div className={styles.stepIcon}>💬</div>
              <h3 className={styles.stepTitle}>Nos escribes</h3>
              <p className={styles.stepDesc}>Cuéntanos brevemente sobre tu negocio y envíanos la información y fotos básicas.</p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNum}>2</span>
              <div className={styles.stepIcon}>🎨</div>
              <h3 className={styles.stepTitle}>Creamos tu página</h3>
              <p className={styles.stepDesc}>Diseñamos una landing page profesional adaptada para móviles y enfocada en vender.</p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNum}>3</span>
              <div className={styles.stepIcon}>🚀</div>
              <h3 className={styles.stepTitle}>La publicamos</h3>
              <p className={styles.stepDesc}>Subimos tu sitio a internet en menos de 48 horas con hosting y dominio configurado.</p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNum}>4</span>
              <div className={styles.stepIcon}>💸</div>
              <h3 className={styles.stepTitle}>Recibes clientes</h3>
              <p className={styles.stepDesc}>Los visitantes verán tu sitio y te enviarán pedidos directamente a tu WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Todo lo que tu negocio necesita para <span>vender más</span></h2>
            <p className={styles.sectionDesc}>No necesitas saber programar ni preocuparte por el soporte técnico. Nosotros nos encargamos.</p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3 className={styles.featureTitle}>Diseño 100% Celular</h3>
              <p className={styles.featureDesc}>El 90% de tus compradores provienen de smartphones. Tu sitio se verá impecable y cargará al instante.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔗</div>
              <h3 className={styles.featureTitle}>Botón a WhatsApp</h3>
              <p className={styles.featureDesc}>Sin formularios aburridos. Tus clientes inician la compra con un solo clic enviando un mensaje directo.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🛍️</div>
              <h3 className={styles.featureTitle}>Galería de Servicios</h3>
              <p className={styles.featureDesc}>Muestra de forma atractiva tus productos principales, menús o portafolio de trabajos.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⏱️</div>
              <h3 className={styles.featureTitle}>Entrega en 48 Horas</h3>
              <p className={styles.featureDesc}>Valoramos tu tiempo. Tu negocio tendrá presencia profesional en internet de manera inmediata.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌐</div>
              <h3 className={styles.featureTitle}>Hosting Incluido</h3>
              <p className={styles.featureDesc}>Nos encargamos del alojamiento web para que no tengas que preocuparte de costos extra.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎯</div>
              <h3 className={styles.featureTitle}>Foco en Conversión</h3>
              <p className={styles.featureDesc}>Cada sección está diseñada estratégicamente para guiar al usuario a contactarte.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Funnel Banner */}
      <section className={styles.funnelBanner}>
        <div className={`${styles.container} ${styles.funnelGrid}`}>
          <div>
            <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px' }}>De visitante a cliente en solo 3 pasos</h3>
            <div className={styles.funnelSteps}>
              <div className={styles.funnelStep}>
                <div className={styles.funnelStepIcon}>👤</div>
                <span className={styles.funnelStepTitle}>1. Visitante</span>
                <span className={styles.funnelStepDesc}>Entra a tu página</span>
              </div>
              <div className={styles.funnelArrow}>➔</div>
              <div className={styles.funnelStep}>
                <div className={styles.funnelStepIcon}>💬</div>
                <span className={styles.funnelStepTitle}>2. WhatsApp</span>
                <span className={styles.funnelStepDesc}>Escribe interesado</span>
              </div>
              <div className={styles.funnelArrow}>➔</div>
              <div className={styles.funnelStep}>
                <div className={styles.funnelStepIcon}>💰</div>
                <span className={styles.funnelStepTitle}>3. Venta</span>
                <span className={styles.funnelStepDesc}>Cierras el negocio</span>
              </div>
            </div>
          </div>

          <div className={styles.funnelVisual}>
            <div className={styles.funnelVisualMoney}>💵💵</div>
            <div className={styles.funnelVisualText}>
              <h4>Más Clientes y Ventas</h4>
              <p>El camino más corto para digitalizar tu negocio hoy mismo sin gastar fortunas en sistemas complejos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Tarifas Section */}
      <section id="precios" className={styles.pricingSection}>
        <div className={styles.container} style={{ maxWidth: '1000px' }}>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingLeft}>
              <h3>Página Profesional + WhatsApp</h3>
              <p className={styles.pricingLeftSub}>Lista en menos de 48 horas</p>

              <div className={styles.pricingLeftChecklist}>
                <div className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Pago único, sin sorpresas</span>
                </div>
                <div className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Diseño totalmente profesional</span>
                </div>
                <div className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Optimizada para conversiones</span>
                </div>
                <div className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Soporte técnico incluido</span>
                </div>
                <div className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Sin mensualidades ocultas</span>
                </div>
                <div className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Catálogo listo para vender</span>
                </div>
              </div>
            </div>

            <div className={styles.pricingCard}>
              <span className={styles.pricingBadge}>Oferta Especial</span>
              <p className={styles.pricingLabel}>PAGO ÚNICO</p>
              <div className={styles.pricingPrice}>
                ${CONFIG.priceCOP}<span>COP</span>
              </div>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>Incluye hosting y subdominio por 1 año.</p>
              <a href={getWhatsappLink(`Hola, me interesa agendar la demostración y contratar la página profesional de $${CONFIG.priceCOP} COP`)} className={styles.pricingCardBtn}>
                <span>🤝</span> QUIERO VENDER MÁS
              </a>
              <p className={styles.pricingCardSub}>Te responderemos en minutos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simulated Chat & CTA */}
      <section className={styles.chatCtaSection}>
        <div className={styles.container}>
          <div className={styles.chatWrapper}>
            <div className={styles.chatHeader}>
              <div className={styles.chatAvatar}>💬</div>
              <div className={styles.chatInfo}>
                <span className={styles.chatName}>Soporte {CONFIG.brandName}</span>
                <span className={styles.chatStatus}>En línea • responde al instante</span>
              </div>
            </div>
            <div className={styles.chatBody}>
              <div className={`${styles.chatBubble} ${styles.chatBubbleSent}`}>
                <span>Hola, quiero más información sobre las páginas web con WhatsApp 🤫</span>
                <div className={styles.chatTime}>10:30 AM</div>
              </div>
              <div className={`${styles.chatBubble} ${styles.chatBubbleRecv}`}>
                <span>¡Hola! Claro que sí, con mucho gusto te asesoro y armamos la estructura ideal para tu negocio. 🚀</span>
                <div className={styles.chatTime}>10:30 AM</div>
              </div>
            </div>
          </div>

          <h2 className={styles.chatCtaTitle}>
            Tu próximo cliente podría estar buscando tu negocio <span>ahora mismo</span>.
          </h2>
          <p className={styles.chatCtaDesc}>
            No envíes tus clientes a la competencia. Facilítales el contacto con una landing page rápida y directa.
          </p>

          <a href={getWhatsappLink('Hola, quiero ordenar mi página hoy mismo')} className={`${styles.btnPrimary} ${styles.pulseButton}`}>
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.904 7.904 0 0 0 1.08 3.971L0 16l4.143-1.086A7.9 7.9 0 0 0 7.993 16c4.367 0 7.926-3.558 7.93-7.93A7.897 7.897 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.101-1.194-.59-1.378-.658-.185-.067-.32-.103-.454.101-.135.203-.52.659-.637.793-.117.135-.235.151-.438.05-2.007-.997-3.213-2.749-3.713-3.621-.13-.226-.014-.349.1-.462.101-.102.203-.236.304-.354.1-.117.135-.198.203-.33.067-.132.033-.248-.017-.35-.05-.101-.454-1.093-.622-1.498-.164-.395-.325-.341-.454-.347-.117-.006-.252-.007-.387-.007-.135 0-.356.05-.542.253-.186.203-.709.693-.709 1.69 0 1 .726 1.967.828 2.102.102.134 1.43 2.183 3.465 3.063.483.21.86.335 1.154.429.485.154.927.132 1.277.08.39-.058 1.194-.488 1.362-.958.167-.47.167-.872.117-.957-.05-.084-.185-.135-.388-.236z"/>
            </svg>
            QUIERO MI PÁGINA HOY
          </a>
          <p style={{ marginTop: '15px', fontSize: '13px', color: 'var(--text-muted)' }}>Haz clic y te asesoramos gratis</p>
        </div>
      </section>

      {/* FAQ / Preguntas Frecuentes Section */}
      <section id="preguntas" className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Preguntas <span>Frecuentes</span></h2>
            <p className={styles.sectionDesc}>Resolvemos tus dudas al instante para que comiences con seguridad.</p>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, idx) => (
              <div className={`${styles.faqItem} ${activeFaq === idx ? styles.faqActive : ''}`} key={idx}>
                <button className={styles.faqQuestion} onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  <span className={styles.faqIcon}>+</span>
                </button>
                <div className={styles.faqAnswer}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div className={styles.footerCol}>
            <div className={styles.logoContainer} style={{ marginBottom: '15px' }}>
              <div className={styles.logoIcon}>W</div>
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>{CONFIG.brandName}</span>
                <span className={styles.logoSub}>{CONFIG.brandSlogan}</span>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Creamos páginas optimizadas que multiplican las consultas y ventas de los negocios locales de forma automatizada por WhatsApp.
            </p>
          </div>

          <div className={styles.footerCol}>
            <h4>Enlaces</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#beneficios">Beneficios</a></li>
              <li><a href="#ejemplos">Ejemplos</a></li>
              <li><a href="#como-funciona">Cómo funciona</a></li>
              <li><a href="#precios">Precios</a></li>
              <li><a href="#preguntas">Preguntas frecuentes</a></li>
              <li><Link href="/politica-de-privacidad">Política de privacidad</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Contacto</h4>
            <div className={styles.footerSocials} style={{ marginBottom: '15px' }}>
              <a href={getWhatsappLink()} className={styles.socialIcon} aria-label="WhatsApp">📲</a>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Atención rápida y asesoría 100% personalizada.</p>
          </div>
        </div>

        <div className={`${styles.container} ${styles.footerBottom}`}>
          <span className={styles.footerCopyright}>
            © {new Date().getFullYear()} {CONFIG.brandName}. Todos los derechos reservados.
          </span>
          <span className={styles.footerCopyright} style={{ fontSize: '11px' }}>
            Diseñado con enfoque en la conversión y optimización móvil.
          </span>
        </div>
      </footer>
    </div>
  );
}
