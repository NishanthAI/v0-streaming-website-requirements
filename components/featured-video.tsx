import Link from "next/link"
import { Play } from "lucide-react"

import { Button } from "@/components/ui/button"

export function FeaturedVideo() {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="aspect-[21/9] relative overflow-hidden">
        <img
          src="/placeholder.svg?height=500&width=1050"
          alt="Featured video thumbnail"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="max-w-lg">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            The Complete Guide to Next.js 15
          </h1>
          <p className="text-white/90 mb-4 line-clamp-2 md:line-clamp-3">
            Learn everything about the latest features in Next.js 15, including the new App Router, Server Components,
            and more.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2" asChild>
              <Link href="/video/featured-1">
                <Play className="h-4 w-4" />
                Watch Now
              </Link>
            </Button>
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
