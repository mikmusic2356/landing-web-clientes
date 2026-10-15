import { db, initDb } from "@/lib/turso";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await initDb();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (date) {
      const result = await db.execute({
        sql: "SELECT time FROM appointments WHERE date = ? AND status != 'cancelado'",
        args: [date],
      });
      const bookedTimes = result.rows.map((row) => row.time);
      return NextResponse.json({ success: true, bookedTimes });
    }

    // Si es para ver listado (dashboard)
    const result = await db.execute("SELECT * FROM appointments ORDER BY id DESC");
    const appointments = result.rows.map((row) => ({
      ...row,
      answers: row.answers_json ? JSON.parse(row.answers_json) : null,
    }));

    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await initDb();
    const body = await request.json();
    const { name, phone, email, date, time, answers, meet_link } = body;

    if (!name || !phone || !email || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Verificar si el horario ya está ocupado
    const check = await db.execute({
      sql: "SELECT id FROM appointments WHERE date = ? AND time = ? AND status != 'cancelado'",
      args: [date, time],
    });

    if (check.rows.length > 0) {
      return NextResponse.json(
        { success: false, error: "Este horario ya fue reservado. Por favor elige otro." },
        { status: 409 }
      );
    }

    const defaultMeet = meet_link || `https://meet.google.com/new`;
    const answersJson = answers ? JSON.stringify(answers) : "{}";

    const insertResult = await db.execute({
      sql: `INSERT INTO appointments (name, phone, email, date, time, meet_link, answers_json, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'agendado')`,
      args: [name, phone, email, date, time, defaultMeet, answersJson],
    });

    return NextResponse.json({
      success: true,
      id: Number(insertResult.lastInsertRowid),
      message: "Cita agendada exitosamente",
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await initDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID requerido" }, { status: 400 });
    }

    await db.execute({
      sql: "DELETE FROM appointments WHERE id = ?",
      args: [id],
    });

    return NextResponse.json({ success: true, message: "Cita eliminada" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    await initDb();
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID y estado requeridos" },
        { status: 400 }
      );
    }

    await db.execute({
      sql: "UPDATE appointments SET status = ? WHERE id = ?",
      args: [status, id],
    });

    return NextResponse.json({
      success: true,
      message: "Estado actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
