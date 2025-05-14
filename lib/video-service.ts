// This is a mock service that would be replaced with a real API in production

interface Video {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  duration: string
  views: string
  likes: number
  comments: number
  uploadDate: string
  category: string
  channel: {
    id: string
    name: string
    avatar: string
    subscribers: string
  }
}

const mockVideos: Video[] = [
  {
    id: "1",
    title: "The Future of AI: What's Next in Artificial Intelligence",
    description:
      "In this video, we explore the cutting-edge developments in AI and what we can expect in the coming years.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "12:34",
    views: "1.2M",
    likes: 45000,
    comments: 3200,
    uploadDate: "2 weeks ago",
    category: "technology",
    channel: {
      id: "channel1",
      name: "TechInsights",
      avatar: "/placeholder.svg?height=48&width=48",
      subscribers: "2.5M",
    },
  },
  {
    id: "2",
    title: "Web Development in 2025: The Essential Tools and Frameworks",
    description: "Discover the most important tools and frameworks that every web developer should know in 2025.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "8:22",
    views: "850K",
    likes: 32000,
    comments: 1800,
    uploadDate: "3 days ago",
    category: "programming",
    channel: {
      id: "channel2",
      name: "CodeMaster",
      avatar: "/placeholder.svg?height=48&width=48",
      subscribers: "1.8M",
    },
  },
  {
    id: "3",
    title: "Machine Learning Basics: A Beginner's Guide",
    description: "This comprehensive guide covers all the fundamentals of machine learning for beginners.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "15:45",
    views: "2.3M",
    likes: 78000,
    comments: 5400,
    uploadDate: "1 month ago",
    category: "education",
    channel: {
      id: "channel3",
      name: "LearnWithMe",
      avatar: "/placeholder.svg?height=48&width=48",
      subscribers: "3.2M",
    },
  },
  {
    id: "4",
    title: "Design Systems Explained: Creating Consistent User Experiences",
    description: "Learn how to create and implement design systems that ensure consistency across your products.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "10:15",
    views: "420K",
    likes: 18000,
    comments: 950,
    uploadDate: "5 days ago",
    category: "design",
    channel: {
      id: "channel4",
      name: "DesignPro",
      avatar: "/placeholder.svg?height=48&width=48",
      subscribers: "980K",
    },
  },
  {
    id: "5",
    title: "The Complete Guide to Next.js 15",
    description:
      "Learn everything about the latest features in Next.js 15, including the new App Router, Server Components, and more.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "18:30",
    views: "1.5M",
    likes: 62000,
    comments: 4100,
    uploadDate: "1 week ago",
    category: "programming",
    channel: {
      id: "channel5",
      name: "WebDevSimplified",
      avatar: "/placeholder.svg?height=48&width=48",
      subscribers: "2.1M",
    },
  },
  {
    id: "6",
    title: "Cybersecurity Essentials for Everyone",
    description: "Protect yourself online with these essential cybersecurity tips that everyone should know.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "14:22",
    views: "980K",
    likes: 41000,
    comments: 2300,
    uploadDate: "2 weeks ago",
    category: "technology",
    channel: {
      id: "channel6",
      name: "SecurityFirst",
      avatar: "/placeholder.svg?height=48&width=48",
      subscribers: "1.4M",
    },
  },
  {
    id: "7",
    title: "Building a SaaS Product from Scratch",
    description: "Follow along as we build a complete SaaS product from idea to launch.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "22:45",
    views: "750K",
    likes: 38000,
    comments: 1900,
    uploadDate: "3 weeks ago",
    category: "business",
    channel: {
      id: "channel7",
      name: "StartupGuru",
      avatar: "/placeholder.svg?height=48&width=48",
      subscribers: "1.2M",
    },
  },
  {
    id: "8",
    title: "The Psychology of User Experience Design",
    description: "Understand the psychological principles behind effective UX design.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "16:18",
    views: "630K",
    likes: 29000,
    comments: 1600,
    uploadDate: "1 month ago",
    category: "design",
    channel: {
      id: "channel8",
      name: "UXMaster",
      avatar: "/placeholder.svg?height=48&width=48",
      subscribers: "950K",
    },
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getVideoById(id: string): Promise<Video | null> {
  await delay(800) // Simulate network delay
  return mockVideos.find((video) => video.id === id) || null
}

export async function getRecommendedVideos(currentVideoId?: string, limit = 8): Promise<Video[]> {
  await delay(1000) // Simulate network delay

  // Filter out current video if provided
  let filteredVideos = currentVideoId ? mockVideos.filter((video) => video.id !== currentVideoId) : [...mockVideos]

  // In a real app, this would use an algorithm based on user preferences
  // For now, just shuffle the array to simulate recommendations
  filteredVideos = shuffleArray(filteredVideos)

  return filteredVideos.slice(0, limit)
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}
