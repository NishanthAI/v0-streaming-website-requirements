"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { getRecommendedVideos } from "@/lib/video-service"

interface RecommendedVideosProps {
  currentVideoId?: string
  limit?: number
}

export function RecommendedVideos({ currentVideoId, limit = 8 }: RecommendedVideosProps) {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        setLoading(true)
        const recommendedVideos = await getRecommendedVideos(currentVideoId, limit)
        setVideos(recommendedVideos)
      } catch (error) {
        console.error("Error fetching recommended videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendedVideos()
  }, [currentVideoId, limit])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: limit }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-muted animate-pulse" />
              <div className="p-3">
                <div className="h-4 bg-muted animate-pulse rounded mb-2" />
                <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (currentVideoId) {
    // Vertical layout for sidebar recommendations
    return (
      <div className="space-y-4">
        {videos.map((video) => (
          <Link key={video.id} href={`/video/${video.id}`} className="block">
            <div className="flex gap-3 group">
              <div className="relative flex-shrink-0 w-40 overflow-hidden rounded">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="object-cover aspect-video w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              <div>
                <h3 className="font-medium line-clamp-2 text-sm">{video.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{video.channel.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {video.views} views • {video.uploadDate}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  // Grid layout for homepage recommendations
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <Link key={video.id} href={`/video/${video.id}`}>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium line-clamp-2">{video.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{video.channel.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {video.views} views • {video.uploadDate}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
