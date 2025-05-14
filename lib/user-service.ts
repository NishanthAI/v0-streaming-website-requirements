// This is a mock service that would be replaced with a real API in production

interface UserPreference {
  videoId: string
  category: string
  watchedAt: string
}

// In a real app, this would be stored in a database
let userPreferences: UserPreference[] = []

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function updateUserPreferences(preference: UserPreference): Promise<void> {
  await delay(300) // Simulate network delay

  // Add to the beginning of the array (most recent first)
  userPreferences = [preference, ...userPreferences]

  // Keep only the last 50 preferences to avoid memory issues
  if (userPreferences.length > 50) {
    userPreferences = userPreferences.slice(0, 50)
  }

  console.log("User preferences updated:", userPreferences)
}

export async function getUserPreferences(): Promise<UserPreference[]> {
  await delay(300) // Simulate network delay
  return [...userPreferences]
}

// This function would analyze user preferences to determine their interests
// In a real app, this would use more sophisticated algorithms
export async function getUserInterests(): Promise<Record<string, number>> {
  await delay(500) // Simulate network delay

  const interests: Record<string, number> = {}

  userPreferences.forEach((pref) => {
    if (!interests[pref.category]) {
      interests[pref.category] = 0
    }

    // More recent preferences have higher weight
    const daysAgo = Math.floor((Date.now() - new Date(pref.watchedAt).getTime()) / (1000 * 60 * 60 * 24))
    const weight = Math.max(1, 10 - daysAgo) // Higher weight for more recent views

    interests[pref.category] += weight
  })

  return interests
}
