import Script from "next/script";
import "./globals.css";

// Configuración de herramientas de marketing (Meta Pixel y Microsoft Clarity)
const CONFIG = {
  metaPixelId: '', // Ingresa tu ID de Meta Pixel aquí. Ej: '1234567890'
  clarityId: '',   // Ingresa tu ID de Microsoft Clarity aquí. Ej: 'ab12cd34ef'
};

export const metadata = {
  title: "Páginas Web Profesionales con WhatsApp | Web Clientes",
  description: "Creamos páginas profesionales y veloces que convierten visitantes en clientes reales con pedidos directos a tu WhatsApp en menos de 48 horas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Integración Condicional de Meta Pixel */}
        {CONFIG.metaPixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${CONFIG.metaPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${CONFIG.metaPixelId}&ev=PageView&noscript=1`}
                alt="meta"
              />
            </noscript>
          </>
        )}

        {/* Integración Condicional de Microsoft Clarity */}
        {CONFIG.clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script", "${CONFIG.clarityId}");
            `}
          </Script>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
