import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Política de Privacidad | Web Clientes',
  description: 'Conoce nuestras políticas de seguridad, manejo de datos personales bajo Habeas Data y el desarrollo de nuestro sitio web.',
};

export default function PoliticaPrivacidad() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← Volver al Inicio
        </Link>

        <div className={styles.card}>
          <h1 className={styles.title}>Política de Privacidad y Tratamiento de Datos</h1>
          <span className={styles.meta}>Última actualización: Junio de 2026</span>

          <div className={styles.content}>
            <p>
              En <strong>WEB CLIENTES</strong> nos tomamos muy en serio la seguridad y la confidencialidad de tu información personal. Esta política explica cómo recolectamos, almacenamos y protegemos tus datos cuando interactúas con nuestra plataforma.
            </p>

            <h2>1. Protección de Datos y Habeas Data</h2>
            <p>
              Todos los datos personales registrados en esta página web o entregados a nuestro equipo de trabajo a través del embudo de WhatsApp son tratados bajo el estricto cumplimiento de la <strong>Ley de Protección de Datos Personales (Ley de Habeas Data)</strong>.
            </p>
            <p>
              Como titular de tus datos, tienes derecho a conocer, actualizar, rectificar y solicitar la eliminación de tu información de nuestras bases de datos en cualquier momento escribiendo a nuestros canales autorizados.
            </p>

            <h2>2. Uso Exclusivo de la Información</h2>
            <p>
              Te garantizamos con absoluta firmeza que tus datos personales (nombre, número de contacto, detalles del negocio u otra información confidencial):
            </p>
            <ul>
              <li><strong>No se usarán para fines externos</strong> a la cotización, desarrollo y soporte de tu proyecto web.</li>
              <li><strong>No serán vendidos, alquilados, intercambiados ni compartidos</strong> con terceras empresas bajo ningún concepto.</li>
              <li>Quedan almacenados de manera interna y exclusiva para la operación de nuestra plataforma y tus servicios contratados.</li>
            </ul>

            <div className={styles.highlightBox}>
              🔒 Tu información está segura con nosotros. El embudo a WhatsApp asegura una comunicación directa y encriptada de extremo a extremo entre tú y nuestro equipo.
            </div>

            <h2>3. Transparencia en la Creación y Seguridad Web</h2>
            <p>
              Creemos firmemente en la transparencia de nuestros procesos digitales. Por ello, informamos a todos nuestros usuarios que este sitio web y las maquetaciones utilizadas en nuestros servicios fueron diseñados y optimizados utilizando la <strong>colaboración de agentes avanzados de Inteligencia Artificial (IA)</strong>.
            </p>
            <p>
              Este enfoque nos permite acelerar la arquitectura del diseño, simular flujos de usuario complejos y mejorar significativamente la experiencia del visitante. Sin embargo, aclaramos que:
            </p>
            <p>
              <strong>La mayor parte del trabajo técnico, estructuración de código, personalización final del embudo y control de calidad recae en el programador humano</strong>. La IA actúa como una herramienta de apoyo avanzada para garantizar que tu página cargue al instante y sea sumamente efectiva, pero cada línea de código es revisada, adaptada y asegurada de forma artesanal por un profesional técnico para garantizar la estabilidad a largo plazo.
            </p>

            <h2>4. Modificaciones a la Política</h2>
            <p>
              Nos reservamos el derecho de modificar esta política en cualquier momento para adaptarla a novedades legislativas o prácticas del mercado. Los cambios serán publicados en esta misma sección.
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          © {new Date().getFullYear()} WEB CLIENTES. Todos los derechos reservados.
        </div>
      </div>
    </main>
  );
}
