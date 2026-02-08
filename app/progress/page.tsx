'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, TrendingUp, Volume2, BookOpen, PenTool, MessageCircle, Flame } from 'lucide-react'
import Link from 'next/link'

interface UserData {
  bandScore: string
  examDate: string
  dailyTime: string
}

export default function ProgressPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('momentumLoopUser')
    if (!data) {
      router.push('/onboarding')
      return
    }
    setUserData(JSON.parse(data) as UserData)
  }, [router])

  if (!userData) {
    return null
  }

  const weeklyData = [
    { day: 'Mon', completed: true, minutes: 12 },
    { day: 'Tue', completed: true, minutes: 10 },
    { day: 'Wed', completed: false, minutes: 0 },
    { day: 'Thu', completed: true, minutes: 15 },
    { day: 'Fri', completed: true, minutes: 12 },
    { day: 'Sat', completed: true, minutes: 20 },
    { day: 'Sun', completed: false, minutes: 0 },
  ]

  const skillProgress = [
    {
      name: 'Listening',
      icon: Volume2,
      current: 65,
      previous: 58,
      improvement: '+7%',
      trend: 'up',
    },
    {
      name: 'Reading',
      icon: BookOpen,
      current: 72,
      previous: 68,
      improvement: '+4%',
      trend: 'up',
    },
    {
      name: 'Writing',
      icon: PenTool,
      current: 58,
      previous: 52,
      improvement: '+6%',
      trend: 'up',
    },
    {
      name: 'Speaking',
      icon: MessageCircle,
      current: 54,
      previous: 48,
      improvement: '+6%',
      trend: 'up',
    },
  ]

  const completedDays = weeklyData.filter((d) => d.completed).length
  const totalMinutes = weeklyData.reduce((sum, d) => sum + d.minutes, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Header */}
      <header className="bg-white/50 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Progress
          </h1>
          <p className="text-muted-foreground">
            Track your IELTS preparation journey
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    This Week
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {completedDays}/7
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-0">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Minutes
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalMinutes}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-0">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Target Band
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {userData.bandScore}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">🎯</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="text-lg font-bold text-primary">On Track</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Activity */}
          <Card className="lg:col-span-2 border-0">
            <div className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-6">
                Weekly Activity
              </h2>

              {/* Day Breakdown */}
              <div className="space-y-4 mb-6">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-muted-foreground">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <div className="h-8 bg-muted rounded-lg flex items-center overflow-hidden">
                        {day.completed && (
                          <div
                            className="h-full bg-primary flex items-center justify-end px-2"
                            style={{
                              width: `${(day.minutes / 30) * 100}%`,
                            }}
                          >
                            <span className="text-xs text-primary-foreground font-semibold">
                              {day.minutes}m
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {day.completed && (
                      <span className="text-lg">✓</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Weekly Stats */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg border border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Days Completed
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {completedDays}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Avg. Minutes
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {Math.round(totalMinutes / completedDays)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Motivational Card */}
          <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  You're on track for Band {userData.bandScore}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  With your current momentum, you're building strong foundations
                  across all four skills.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    Keep up the momentum
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Maintain your daily streak
                  </p>
                </div>
                <Link href="/dashboard" className="w-full">
                  <Button
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Start Today's Mission
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Skill Progress */}
        <Card className="border-0 mb-8">
          <div className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Skill Development
            </h2>

            <div className="space-y-6">
              {skillProgress.map((skill) => {
                const Icon = skill.icon
                return (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-sm font-bold text-foreground">
                            {skill.current}%
                          </span>
                          <span className="text-xs text-primary ml-2 font-semibold">
                            {skill.improvement}
                          </span>
                        </div>
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Progress value={skill.current} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Current
                        </p>
                      </div>
                      <div className="flex-1">
                        <Progress
                          value={skill.previous}
                          className="h-2 opacity-50"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Previous
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        {/* Bottom Actions */}
        <div className="flex gap-4">
          <Link href="/dashboard" className="flex-1">
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
            >
              Back to Dashboard
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="flex-1 bg-transparent">
            Share Progress
          </Button>
        </div>
      </main>
    </div>
  )
}
