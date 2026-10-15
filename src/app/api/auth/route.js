import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const VALID_USER = process.env.ADMIN_USER || "admin";
const VALID_PASSWORD = process.env.ADMIN_PASSWORD || "AdminWeb2026*";
const VALID_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY || "KEY-9877-COL-2498";
const AUTH_SECRET = process.env.ADMIN_AUTH_SECRET || "secret_session_key_webclientes_998822";

export async function POST(request) {
  try {
    const { username, password, accessKey } = await request.json();

    if (
      username === VALID_USER &&
      password === VALID_PASSWORD &&
      accessKey === VALID_ACCESS_KEY
    ) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", AUTH_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 días de sesión
      });

      return NextResponse.json({ success: true, message: "Autenticación exitosa" });
    }

    return NextResponse.json(
      { success: false, error: "Credenciales o Llave de Acceso inválidas" },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Error en el servidor de autenticación" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");

    if (sessionCookie && sessionCookie.value === AUTH_SECRET) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true, message: "Sesión cerrada" });
}
