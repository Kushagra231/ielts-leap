'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Zap, CheckCircle2, TrendingUp, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('momentumLoopUser')
    if (userData) {
      router.push('/dashboard')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Navigation */}
      <header className="bg-white/50 backdrop-blur border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Momentum Loop</h1>
          </div>
          <Link href="/onboarding">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Build Daily Study Habits for IELTS
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Master the IELTS with Momentum Loop. Bite-sized micro-missions designed for busy students to build consistent progress toward your target band score.
            </p>
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-base px-8"
              >
                Start Your Journey
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Micro-Missions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Focused 10-30 minute tasks that target specific skills and build momentum daily.
                </p>
              </div>
            </Card>

            <Card className="border-0 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Real Progress
                </h3>
                <p className="text-sm text-muted-foreground">
                  Track your improvement across Listening, Reading, Writing, and Speaking skills.
                </p>
              </div>
            </Card>

            <Card className="border-0 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Smart Planning
                </h3>
                <p className="text-sm text-muted-foreground">
                  Personalized study plans based on your target band and available time.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Demo Section */}
        <section className="bg-primary/5 border-t border-primary/20 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  How It Works
                </h3>
                <ol className="space-y-4">
                  {[
                    'Set your target IELTS band score',
                    'Define your exam date and daily study time',
                    'Complete bite-sized micro-missions',
                    'Watch your momentum and skills grow',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </div>
                      <span className="text-foreground leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
                <Link href="/onboarding" className="mt-6 inline-block">
                  <Button className="bg-primary hover:bg-primary/90">
                    Begin Setup
                  </Button>
                </Link>
              </div>
              <Card className="border-0 bg-white/50 p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Today's Mission
                    </p>
                    <h4 className="text-lg font-bold text-foreground">
                      Speaking Fluency
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      12 minutes
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm font-semibold text-primary">
                      4/7 days completed this week
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">
                      Listening Progress
                    </p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-2/3" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Why Momentum Loop?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Designed for Busy Students',
                description:
                  'Studies fit perfectly into your schedule with 10, 20, or 30-minute options.',
              },
              {
                title: 'Skill-Focused Learning',
                description:
                  'Each mission targets specific skills to build your overall IELTS capability.',
              },
              {
                title: 'Visible Progress',
                description:
                  'Watch your band readiness increase with weekly momentum and skill tracking.',
              },
              {
                title: 'Consistent Momentum',
                description:
                  'Small daily wins build unstoppable momentum toward your target band.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-secondary/50 rounded-lg border border-border">
                <h4 className="font-bold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-t border-primary/20 py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Achieve Your IELTS Goal?
            </h3>
            <p className="text-muted-foreground mb-8">
              Start building your daily momentum today. Your IELTS success
              begins with consistent, focused effort.
            </p>
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-base px-8"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur border-t border-border py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Momentum Loop • Building IELTS success through daily micro-missions
          </p>
        </div>
      </footer>
    </div>
  )
}
