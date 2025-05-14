import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/video-card"
import { FeaturedVideo } from "@/components/featured-video"
import { RecommendedVideos } from "@/components/recommended-videos"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Play className="h-6 w-6 text-red-500" />
          <span className="ml-2 text-xl font-bold">StreamFlix</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/browse">
            Browse
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/profile">
            Profile
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16 bg-black">
          <div className="container px-4 md:px-6">
            <FeaturedVideo />
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Continue Watching</h2>
                <p className="text-muted-foreground">Pick up where you left off.</p>
              </div>
              <Button variant="ghost" className="gap-1" asChild>
                <Link href="/browse">
                  See all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <VideoCard
                id="1"
                title="The Future of AI"
                thumbnail="/placeholder.svg?height=200&width=350"
                duration="12:34"
                progress={65}
              />
              <VideoCard
                id="2"
                title="Web Development in 2025"
                thumbnail="/placeholder.svg?height=200&width=350"
                duration="8:22"
                progress={30}
              />
              <VideoCard
                id="3"
                title="Machine Learning Basics"
                thumbnail="/placeholder.svg?height=200&width=350"
                duration="15:45"
                progress={90}
              />
              <VideoCard
                id="4"
                title="Design Systems Explained"
                thumbnail="/placeholder.svg?height=200&width=350"
                duration="10:15"
                progress={10}
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Recommended For You</h2>
                <p className="text-muted-foreground">Based on your viewing history and preferences.</p>
              </div>
              <Button variant="ghost" className="gap-1" asChild>
                <Link href="/browse">
                  See all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <RecommendedVideos />
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-muted-foreground">© 2025 StreamFlix. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
