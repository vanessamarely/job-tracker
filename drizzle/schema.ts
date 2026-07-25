import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const jobs = sqliteTable('jobs', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  empresa: text('empresa', { length: 100 }).notNull(),
  cargo: text('cargo', { length: 200 }).notNull(),
  url: text('url'),
  descripcion: text('descripcion'),
  estado: text('estado', {
    enum: ['wishlist', 'applied', 'interviewing', 'offer', 'rejected'],
  })
    .notNull()
    .default('wishlist'),
  salary: integer('salary'),
  priority: text('priority', { enum: ['high', 'medium', 'low'] })
    .notNull()
    .default('medium'),
  adaptedCv: text('adapted_cv'),
  coverLetter: text('cover_letter'),
  interviewNotes: text('interview_notes'),
  deadline: text('deadline'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(datetime('now'))`),
})

export const profile = sqliteTable('profile', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().default(''),
  email: text('email').notNull().default(''),
  title: text('title').notNull().default(''),
  baseCv: text('base_cv').notNull().default(''),
  skills: text('skills').notNull().default(''),
})

export type Job = typeof jobs.$inferSelect
export type NewJob = typeof jobs.$inferInsert
export type Profile = typeof profile.$inferSelect
