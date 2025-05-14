"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { History, Bookmark, Settings, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoCard } from "@/components/video-card"
import { getUserPreferences } from "@/lib/user-service"
import { getVideoById } from "@/lib/video-service"

export default function ProfilePage() {
  const [watchHistory, setWatchHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        setLoading(true)
        const preferences = await getUserPreferences()

        // Get the videos from the watch history
        const videos = await Promise.all(
          preferences.map(async (pref) => {
            const video = await getVideoById(pref.videoId)
            return video
          }),
        )

        // Filter out null values and limit to 12 videos
        setWatchHistory(videos.filter(Boolean).slice(0, 12))
      } catch (error) {
        console.error("Error fetching watch history:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWatchHistory()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-xl font-bold">StreamFlix</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/browse">
            Browse
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-primary" href="/profile">
            Profile
          </Link>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="flex flex-col items-center p-6 bg-muted rounded-lg">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <img src="/placeholder.svg?height=96&width=96" alt="Profile" className="rounded-full" />
              </div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-sm text-muted-foreground mb-4">john.doe@example.com</p>
              <div className="w-full space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/profile">
                    <History className="mr-2 h-4 w-4" />
                    Watch History
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/profile/saved">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Saved Videos
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/profile/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

            <Tabs defaultValue="history">
              <TabsList className="mb-6">
                <TabsTrigger value="history">Watch History</TabsTrigger>
                <TabsTrigger value="saved">Saved Videos</TabsTrigger>
                <TabsTrigger value="liked">Liked Videos</TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="mt-0">
                <h2 className="text-xl font-semibold mb-4">Recently Watched</h2>
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <div className="aspect-video bg-muted animate-pulse" />
                        <div className="p-3 space-y-2">
                          <div className="h-4 bg-muted animate-pulse rounded" />
                          <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : watchHistory.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {watchHistory.map((video) => (
                      <VideoCard
                        key={video.id}
                        id={video.id}
                        title={video.title}
                        thumbnail={video.thumbnail}
                        duration={video.duration}
                        progress={Math.floor(Math.random() * 100)} // Simulated progress
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <History className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No watch history yet</h3>
                    <p className="text-muted-foreground mb-4">Videos you watch will appear here</p>
                    <Button asChild>
                      <Link href="/browse">Browse Videos</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved" className="mt-0">
                <h2 className="text-xl font-semibold mb-4">Saved Videos</h2>
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No saved videos yet</h3>
                  <p className="text-muted-foreground mb-4">Videos you save will appear here</p>
                  <Button asChild>
                    <Link href="/browse">Browse Videos</Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="liked" className="mt-0">
                <h2 className="text-xl font-semibold mb-4">Liked Videos</h2>
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <ThumbsUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No liked videos yet</h3>
                  <p className="text-muted-foreground mb-4">Videos you like will appear here</p>
                  <Button asChild>
                    <Link href="/browse">Browse Videos</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

function ThumbsUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  )
}
