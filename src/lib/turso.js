import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL || "libsql://ventadepaginasweb-mikmusic2356.aws-us-east-2.turso.io";
const authToken = process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTIwMzQxOTIsImlkIjoiMDFhMTNkOGYtYTUwMS03ZjdlLTg4MmItMWRhYTc3ZjBlYzkyIiwia2lkIjoiT19jVUNRdEI2Y3hWTlBrSzJFZFJPTEI0ZUhqR2wweFEtNUlEUVNaSjBOUSIsInJpZCI6IjdmYThjOGQ3LTFkMDQtNGFlMS1hN2FkLTQzZDUwNjVlOTYxZiJ9.dz6mgThrmOxzA7eehI6ugCe2deU0CTG2_UiMewRc8TjsGm5fIgfVyyTb_PS0SQUU4bbi1amMjpS-Wb36KM07DQ";

export const db = createClient({
  url,
  authToken,
});

export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      meet_link TEXT,
      answers_json TEXT,
      status TEXT DEFAULT 'agendado'
    );
  `);
}
