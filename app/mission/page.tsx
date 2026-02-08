'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, CheckCircle2, Play, Pause } from 'lucide-react'
import Link from 'next/link'

export default function MissionPage() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(720) // 12 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const mission = {
    title: 'Improve Speaking Fluency',
    duration: 12,
    description: 'Master conversational responses with guided speaking prompts',
    instructions: [
      'Listen to the conversation prompt carefully',
      'You have 1 minute to prepare your response',
      'Speak naturally for 1-2 minutes about the topic',
      'Record or mentally practice your response',
      'Compare with our model answer',
    ],
    focusArea: 'Speaking Fluency',
    difficulty: 'Intermediate',
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Mission Complete!
            </h2>
            <p className="text-muted-foreground mb-6">
              Great work! You've completed today's 12-minute speaking challenge.
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Time Spent</p>
                <p className="text-lg font-bold text-foreground">12 minutes</p>
              </div>
              <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground mb-1">Progress Toward</p>
                <p className="text-lg font-bold text-foreground">Band 7</p>
              </div>
            </div>

            <p className="text-sm text-foreground mb-6">
              +5 momentum points! Keep this up for consistent growth.
            </p>

            <div className="space-y-3">
              <Link href="/dashboard" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Back to Dashboard
                </Button>
              </Link>
              <Button variant="outline" className="w-full bg-transparent">
                View Feedback
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Header */}
      <header className="bg-white/50 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Card className="border-0 overflow-hidden">
          <div className="p-8">
            {/* Mission Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  {mission.focusArea}
                </span>
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-xs font-semibold rounded-full">
                  {mission.difficulty}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {mission.title}
              </h1>
              <p className="text-muted-foreground">
                {mission.description}
              </p>
            </div>

            {/* Timer Section */}
            {started && (
              <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-3 text-center">
                  Time Remaining
                </p>
                <div className="text-6xl font-bold text-center text-primary font-mono mb-6">
                  {formatTime(timeLeft)}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2 mb-6">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${((720 - timeLeft) / 720) * 100}%` }}
                  />
                </div>

                {/* Timer Controls */}
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsRunning(!isRunning)}
                    className="gap-2"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Resume
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Instructions */}
            {!started && (
              <div className="mb-8 p-6 bg-secondary/50 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  How to Complete This Mission
                </h3>
                <ol className="space-y-3">
                  {mission.instructions.map((instruction, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-sm text-foreground">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Mission Info */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="text-lg font-bold text-foreground">
                  {mission.duration} min
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Skill</p>
                <p className="text-lg font-bold text-foreground text-balance">
                  {mission.focusArea}
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Level</p>
                <p className="text-lg font-bold text-foreground">
                  {mission.difficulty}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!started ? (
                <>
                  <Button
                    onClick={() => {
                      setStarted(true)
                      setIsRunning(true)
                    }}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-base"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Mission
                  </Button>
                  <Link href="/dashboard" className="w-full">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      Not Now
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setCompleted(true)}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-base"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Complete Mission
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setStarted(false)
                      setIsRunning(false)
                      setTimeLeft(720)
                    }}
                    className="w-full"
                  >
                    Restart
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
