/**
 * Mock data utility for testing chat interface
 * Fetches random user data from the backend's /api/static-data endpoint
 */

export async function fetchMockUser() {
  try {
    const response = await fetch('http://localhost:8000/api/static-data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('[Mock Data] Fetched mock user:', data)
    return data
  } catch (error) {
    console.error('[Mock Data] Error fetching from backend:', error)
    // Fallback to local generation if backend is unavailable
    return generateLocalMockUser()
  }
}

/**
 * Generate a mock user locally using same logic as backend
 * Ensures consistency when backend is unavailable
 */
export function generateLocalMockUser() {
  const ADJECTIVES = ["Happy", "Quick", "Clever", "Bright", "Calm", "Cool", "Swift", "Witty", "Smart", "Keen", 
                      "Sunny", "Lucky", "Merry", "Jolly", "Eager", "Ready", "Brave", "Noble", "Kind", "Free"]
  const NOUNS = ["Panda", "Phoenix", "Tiger", "Eagle", "Fox", "Wolf", "Owl", "Hawk", "Bear", "Dragon", 
                 "Lion", "Panther", "Raven", "Falcon", "Whale", "Dolphin", "Swan", "Peacock", "Penguin", "Otter"]
  const BIOS = [
    "Love to chat and meet new people",
    "Always up for interesting conversations",
    "Curious about different perspectives",
    "Enjoy deep talks and memes alike",
    "Open-minded and friendly",
    "Here to connect and have fun",
    "Just here to vibe and chat",
    "Looking for genuine conversations",
    "Passionate about interesting topics",
    "Let's talk about anything!",
    "Food enthusiast and movie lover",
    "Travel addict seeking connection",
    "Music is my love language",
    "Dog person and book nerd",
    "Always learning new things"
  ]

  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)]
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  const nickname = `${randomChoice(ADJECTIVES)}${randomChoice(NOUNS)}`
  const bio = randomChoice(BIOS)
  const gender = randomChoice(["male", "female", "non-binary", "prefer-not-to-say"])
  const status = randomChoice(["ONLINE", "IDLE"])

  const maleLimit = randomInt(3, 7)
  const femaleLimit = randomInt(3, 7)
  const nonBinaryLimit = randomInt(3, 7)
  const preferNotToSayLimit = randomInt(3, 7)

  return {
    device_id: `mock_${randomInt(100000, 999999)}`,
    profile: {
      nickname,
      bio,
      gender,
      status
    },
    daily_limits: {
      male: maleLimit,
      female: femaleLimit,
      "non-binary": nonBinaryLimit,
      "prefer-not-to-say": preferNotToSayLimit
    },
    remaining_matches: {
      male: randomInt(1, maleLimit),
      female: randomInt(1, femaleLimit),
      "non-binary": randomInt(1, nonBinaryLimit),
      "prefer-not-to-say": randomInt(1, preferNotToSayLimit)
    }
  }
}
