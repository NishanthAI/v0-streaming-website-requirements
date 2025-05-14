"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  src: string
  poster?: string
  title: string
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const onLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const onEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("ended", onEnded)

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("ended", onEnded)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }

    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)

    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  const handleSeek = (value: number[]) => {
    const seekTime = value[0]
    setCurrentTime(seekTime)

    if (videoRef.current) {
      videoRef.current.currentTime = seekTime
    }
  }

  const toggleFullscreen = () => {
    const container = document.querySelector(".video-container") as HTMLElement

    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const handleMouseMove = () => {
    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  return (
    <div
      className="video-container relative rounded-lg overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full aspect-video"
        poster={poster}
        preload="metadata"
        playsInline
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
        <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
        Your browser does not support the video tag.
      </video>

      {/* Video Title Overlay */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent text-white transition-opacity",
          showControls ? "opacity-100" : "opacity-0",
        )}
      >
        <h2 className="text-lg font-medium line-clamp-1">{title}</h2>
      </div>

      {/* Play/Pause Overlay */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity",
          isPlaying ? "opacity-0" : "opacity-100",
        )}
      >
        <Button
          size="icon"
          variant="ghost"
          className="h-20 w-20 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={togglePlay}
        >
          <Play className="h-10 w-10 fill-white" />
        </Button>
      </div>

      {/* Controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity",
          showControls ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex flex-col gap-2">
          {/* Progress Bar */}
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer [&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&>span:first-child_span]:bg-red-500"
          />

          {/* Controls Row */}
          <div className="flex items-center gap-2 text-white">
            <Button size="icon" variant="ghost" className="h-9 w-9 text-white hover:bg-white/20" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button size="icon" variant="ghost" className="h-9 w-9 text-white hover:bg-white/20">
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button size="icon" variant="ghost" className="h-9 w-9 text-white hover:bg-white/20">
              <SkipForward className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="h-9 w-9 text-white hover:bg-white/20" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-24 cursor-pointer [&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&>span:first-child_span]:bg-white"
              />
            </div>

            <div className="ml-2 text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button size="icon" variant="ghost" className="h-9 w-9 text-white hover:bg-white/20">
                <Settings className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
