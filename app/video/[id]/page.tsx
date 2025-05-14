"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, Bookmark } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { VideoPlayer } from "@/components/video-player"
import { RecommendedVideos } from "@/components/recommended-videos"
import { getVideoById } from "@/lib/video-service"
import { updateUserPreferences } from "@/lib/user-service"

interface VideoPageProps {
  params: {
    id: string
  }
}

export default function VideoPage({ params }: VideoPageProps) {
  const [video, setVideo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true)
        const videoData = await getVideoById(params.id)
        setVideo(videoData)

        // Update user preferences for better recommendations
        await updateUserPreferences({
          videoId: params.id,
          category: videoData.category,
          watchedAt: new Date().toISOString(),
        })
      } catch (error) {
        console.error("Error fetching video:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Video not found</h1>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-xl font-bold">Back to Home</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoPlayer src={video.videoUrl} poster={video.thumbnail} title={video.title} />
            <div className="mt-4">
              <h1 className="text-2xl font-bold">{video.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <span>{video.views} views</span>
                <span>•</span>
                <span>{video.uploadDate}</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  {video.likes}
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {video.comments} Comments
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  Save
                </Button>
              </div>
              <Separator className="my-6" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <img
                    src={video.channel.avatar || "/placeholder.svg?height=48&width=48"}
                    alt={video.channel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{video.channel.name}</h3>
                  <p className="text-sm text-muted-foreground">{video.channel.subscribers} subscribers</p>
                  <p className="mt-4">{video.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
            <RecommendedVideos currentVideoId={params.id} limit={5} />
          </div>
        </div>
      </main>
    </div>
  )
}
