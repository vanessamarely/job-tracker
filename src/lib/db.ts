import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { desc, eq } from 'drizzle-orm'
import * as schema from '../../drizzle/schema'
import path from 'path'
import type { Job, CreateJobInput, UpdateJobInput, Profile, UpdateProfileInput } from '@/types'

// En Vercel el filesystem del deploy es de solo lectura fuera de /tmp.
// Ahí guardamos la demo (sin persistencia entre cold starts) solo para que
// la app cargue — en local (npm run dev) esto no cambia nada.
const DB_PATH = process.env.VERCEL
  ? path.join('/tmp', 'job-tracker.db')
  : path.join(process.cwd(), 'job-tracker.db')

// Singleton – survives Next.js hot-reload in development
const g = globalThis as typeof globalThis & {
  _sqlite?: Database.Database
}

function getClient(): Database.Database {
  if (!g._sqlite) {
    g._sqlite = new Database(DB_PATH)
    g._sqlite.pragma('journal_mode = WAL')
    g._sqlite.pragma('foreign_keys = ON')
    initSchema(g._sqlite)
  }
  return g._sqlite
}

function initSchema(sqlite: Database.Database): void {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      empresa TEXT NOT NULL,
      cargo TEXT NOT NULL,
      url TEXT,
      descripcion TEXT,
      estado TEXT NOT NULL DEFAULT 'wishlist',
      salary INTEGER,
      priority TEXT NOT NULL DEFAULT 'medium',
      adapted_cv TEXT,
      cover_letter TEXT,
      interview_notes TEXT,
      deadline TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL DEFAULT '',
      base_cv TEXT NOT NULL DEFAULT '',
      skills TEXT NOT NULL DEFAULT ''
    );

    INSERT OR IGNORE INTO profile (id, name, email, title, base_cv, skills)
    VALUES (1, '', '', '', '', '');
  `)
}

function getDb() {
  return drizzle(getClient(), { schema })
}

// ─── Jobs ────────────────────────────────────────────────────────────────────

export function getAllJobs(): Job[] {
  return getDb()
    .select()
    .from(schema.jobs)
    .orderBy(desc(schema.jobs.createdAt))
    .all() as Job[]
}

export function getJobById(id: string): Job | undefined {
  return getDb()
    .select()
    .from(schema.jobs)
    .where(eq(schema.jobs.id, id))
    .get() as Job | undefined
}

export function createJob(data: CreateJobInput): Job {
  const id = crypto.randomUUID()
  getDb()
    .insert(schema.jobs)
    .values({ ...data, id })
    .run()
  return getJobById(id)!
}

export function updateJob(id: string, data: UpdateJobInput): Job | undefined {
  getDb()
    .update(schema.jobs)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(schema.jobs.id, id))
    .run()
  return getJobById(id)
}

export function deleteJob(id: string): void {
  getDb().delete(schema.jobs).where(eq(schema.jobs.id, id)).run()
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export function getProfile(): Profile {
  return getDb()
    .select()
    .from(schema.profile)
    .where(eq(schema.profile.id, 1))
    .get() as Profile
}

export function updateProfile(data: UpdateProfileInput): Profile {
  getDb()
    .update(schema.profile)
    .set(data)
    .where(eq(schema.profile.id, 1))
    .run()
  return getProfile()
}
