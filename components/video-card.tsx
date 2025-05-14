import Link from "next/link"
import { Play } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface VideoCardProps {
  id: string
  title: string
  thumbnail: string
  duration: string
  progress?: number
}

export function VideoCard({ id, title, thumbnail, duration, progress }: VideoCardProps) {
  return (
    <Link href={`/video/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-0 relative">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={thumbnail || "/placeholder.svg"}
              alt={title}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
              {duration}
            </div>
            {progress !== undefined && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                <div className="h-full bg-red-500" style={{ width: `${progress}%` }} />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
              <Play className="h-12 w-12 text-white" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-3">
          <h3 className="font-medium line-clamp-2">{title}</h3>
        </CardFooter>
      </Card>
    </Link>
  )
}
