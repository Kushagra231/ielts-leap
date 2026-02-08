'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CheckCircle2 } from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [bandScore, setBandScore] = useState('')
  const [examDate, setExamDate] = useState('')
  const [dailyTime, setDailyTime] = useState('')

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Save to localStorage for prototype
      localStorage.setItem(
        'momentumLoopUser',
        JSON.stringify({
          bandScore,
          examDate,
          dailyTime,
        })
      )
      router.push('/dashboard')
    }
  }

  const canProceed = () => {
    if (step === 1) return bandScore
    if (step === 2) return examDate
    if (step === 3) return dailyTime
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Momentum Loop</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Your daily IELTS companion
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>

          {/* Step content */}
          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    What's your target IELTS band score?
                  </h2>
                  <RadioGroup value={bandScore} onValueChange={setBandScore}>
                    {['5.5', '6.0', '6.5', '7.0', '7.5', '8.0'].map((score) => (
                      <div
                        key={score}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary cursor-pointer transition-colors"
                      >
                        <RadioGroupItem value={score} id={`band-${score}`} />
                        <Label
                          htmlFor={`band-${score}`}
                          className="cursor-pointer flex-1 font-medium"
                        >
                          Band {score}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    When is your exam date?
                  </h2>
                  <Input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    How much time can you study daily?
                  </h2>
                  <RadioGroup value={dailyTime} onValueChange={setDailyTime}>
                    {[
                      { value: '10', label: '10 minutes' },
                      { value: '20', label: '20 minutes' },
                      { value: '30', label: '30 minutes' },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary cursor-pointer transition-colors"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`time-${option.value}`}
                        />
                        <Label
                          htmlFor={`time-${option.value}`}
                          className="cursor-pointer flex-1 font-medium"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {step === 3 ? 'Get Started' : 'Next'}
            </Button>
          </div>

          {/* Progress text */}
          <p className="text-xs text-center text-muted-foreground mt-4">
            Step {step} of 3
          </p>
        </div>
      </Card>
    </div>
  )
}
