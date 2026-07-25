const STORAGE_KEY = 'job-tracker:favorites'

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function isFavorite(jobId: string): boolean {
  return getFavorites().includes(jobId)
}

export function toggleFavorite(jobId: string): string[] {
  const current = getFavorites()
  const next = current.includes(jobId)
    ? current.filter((id) => id !== jobId)
    : [...current, jobId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}
