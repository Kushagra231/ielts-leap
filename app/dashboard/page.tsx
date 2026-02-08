'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, Zap, Volume2, BookOpen, PenTool, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface UserData {
  bandScore: string
  examDate: string
  dailyTime: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [daysUntilExam, setDaysUntilExam] = useState(0)

  useEffect(() => {
    const data = localStorage.getItem('momentumLoopUser')
    if (!data) {
      router.push('/onboarding')
      return
    }
    const parsed = JSON.parse(data) as UserData
    setUserData(parsed)

    // Calculate days until exam
    const examDate = new Date(parsed.examDate)
    const today = new Date()
    const diff = Math.ceil(
      (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )
    setDaysUntilExam(Math.max(0, diff))
  }, [router])

  if (!userData) {
    return null
  }

  const completedDays = 4
  const totalDays = 7
  const skills = [
    { name: 'Listening', progress: 65, icon: Volume2 },
    { name: 'Reading', progress: 72, icon: BookOpen },
    { name: 'Writing', progress: 58, icon: PenTool },
    { name: 'Speaking', progress: 54, icon: MessageCircle },
  ]

  const missions = [
    {
      id: 1,
      title: 'Improve Speaking Fluency',
      duration: '12 minutes',
      description: 'Practice conversation skills with guided prompts',
      completed: false,
    },
    {
      id: 2,
      title: 'Listening Comprehension',
      duration: '10 minutes',
      description: 'Enhanced attention to detail in audio passages',
      completed: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Header */}
      <header className="bg-white/50 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Momentum Loop</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              localStorage.removeItem('momentumLoopUser')
              router.push('/onboarding')
            }}
          >
            Reset
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back!
          </h2>
          <p className="text-muted-foreground">
            You're on track for Band {userData.bandScore} • {daysUntilExam} days
            until exam
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Micro-Mission Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">
                      Today's Mission
                    </p>
                    <h3 className="text-2xl font-bold text-foreground">
                      {missions[0].title}
                    </h3>
                  </div>
                  <div className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-medium">
                    {missions[0].duration}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  {missions[0].description}
                </p>
                <p className="text-sm font-semibold text-primary mb-4">
                  10 minutes today moves your score
                </p>
                <Link href="/mission">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Start Mission
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Weekly Momentum Tracker */}
            <Card className="border-0">
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  This Week's Momentum
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const completed = i < completedDays
                    const today = i === new Date().getDay()
                    return (
                      <div
                        key={i}
                        className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                          completed
                            ? 'bg-primary/10 border border-primary/30'
                            : today
                              ? 'bg-accent/10 border border-accent/30'
                              : 'bg-muted'
                        }`}
                      >
                        <span className="text-xs font-medium text-muted-foreground mb-2">
                          {'MTWTFSS'[i]}
                        </span>
                        {completed && (
                          <span className="text-lg">✓</span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-foreground font-semibold">
                    {completedDays} of {totalDays} days completed
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Skills Progress */}
          <div className="space-y-6">
            <Card className="border-0">
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  Band Readiness
                </h3>
                <div className="space-y-5">
                  {skills.map((skill) => {
                    const Icon = skill.icon
                    return (
                      <div key={skill.name}>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {skill.progress}%
                          </span>
                        </div>
                        <Progress
                          value={skill.progress}
                          className="h-2 bg-muted"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>

            {/* Encouragement Card */}
            <Card className="bg-gradient-to-br from-accent/10 to-primary/5 border-accent/30">
              <div className="p-6">
                <p className="text-sm font-semibold text-foreground mb-2">
                  You're on track!
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  With consistent {userData.dailyTime}-minute sessions, you're
                  building the momentum to hit Band {userData.bandScore}.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/mission">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <div className="p-4 text-center">
                <div className="text-2xl mb-2">🎯</div>
                <p className="text-sm font-semibold text-foreground">
                  Start Mission
                </p>
              </div>
            </Card>
          </Link>
          <Link href="/progress">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <div className="p-4 text-center">
                <div className="text-2xl mb-2">📈</div>
                <p className="text-sm font-semibold text-foreground">
                  View Progress
                </p>
              </div>
            </Card>
          </Link>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <div className="p-4 text-center">
              <div className="text-2xl mb-2">⏰</div>
              <p className="text-sm font-semibold text-foreground">
                Schedule
              </p>
            </div>
          </Card>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <div className="p-4 text-center">
              <div className="text-2xl mb-2">⭐</div>
              <p className="text-sm font-semibold text-foreground">
                Achievements
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
