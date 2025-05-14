"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoCard } from "@/components/video-card"
import { getRecommendedVideos } from "@/lib/video-service"

export default function BrowsePage() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        // In a real app, this would use a search API
        const allVideos = await getRecommendedVideos(undefined, 20)
        setVideos(allVideos)
      } catch (error) {
        console.error("Error fetching videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-primary" href="/browse">
            Browse
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/profile">
            Profile
          </Link>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Browse Videos</h1>
          <div className="w-full md:w-auto flex gap-2">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search videos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="programming">Programming</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <div className="aspect-video bg-muted animate-pulse" />
                    <div className="p-3 space-y-2">
                      <div className="h-4 bg-muted animate-pulse rounded" />
                      <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    duration={video.duration}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">No videos found</h2>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="technology" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredVideos
                .filter((video) => video.category === "technology")
                .map((video) => (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    duration={video.duration}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="programming" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredVideos
                .filter((video) => video.category === "programming")
                .map((video) => (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    duration={video.duration}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="design" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredVideos
                .filter((video) => video.category === "design")
                .map((video) => (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    duration={video.duration}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="business" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredVideos
                .filter((video) => video.category === "business")
                .map((video) => (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    duration={video.duration}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
