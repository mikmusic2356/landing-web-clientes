import "./globals.css";

export const metadata = {
  title: "Páginas Web Profesionales con WhatsApp | Web Clientes",
  description: "Creamos páginas profesionales y veloces que convierten visitantes en clientes reales con pedidos directos a tu WhatsApp en menos de 48 horas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

