"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"

export function MathProblemGenerator() {
  const [generatedProblems, setGeneratedProblems] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // This would normally call an API to generate problems
    // For demo purposes, we'll just create some sample problems
    const sampleProblems = [
      "Solve for x: 2x + 5 = 13",
      "Find the derivative of f(x) = x² + 3x - 2",
      "Calculate the area of a circle with radius 4 cm",
      "Simplify the expression: 3(2x - 4) + 5x",
      "Solve the system of equations: { 2x + y = 7, x - y = 1 }",
    ]

    setGeneratedProblems(sampleProblems)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h3 className="text-2xl font-bold">ExamWell Problem Generator</h3>
          <p className="mt-2">
            Describe exactly what you want in an exam problem below and hit generate to receive a list of problems
            tailor-made for you!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <div className="bg-blue-500 text-white p-3 rounded-lg text-center mb-2">
                <Label htmlFor="subject" className="text-lg font-medium">
                  Subject
                </Label>
              </div>
              <Input id="subject" placeholder="e.g. AP Calculus BC" className="w-full border-gray-300 rounded-md" />
            </div>

            <div>
              <div className="bg-blue-500 text-white p-3 rounded-lg text-center mb-2">
                <Label htmlFor="topic" className="text-lg font-medium">
                  Topic
                </Label>
              </div>
              <Input id="topic" placeholder="e.g. Optimization" className="w-full border-gray-300 rounded-md" />
            </div>

            <div>
              <div className="bg-blue-500 text-white p-3 rounded-lg text-center mb-2">
                <Label className="text-lg font-medium">Depth Of Knowledge Levels</Label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="recall" />
                  <Label htmlFor="recall">Recall</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skills" />
                  <Label htmlFor="skills">Skills</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="reasoning" />
                  <Label htmlFor="reasoning">Reasoning</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="extended" />
                  <Label htmlFor="extended">Extended Thinking</Label>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-blue-500 text-white p-3 rounded-lg text-center mb-2">
                <Label className="text-lg font-medium">Format of Question</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="multiple-choice" />
                  <Label htmlFor="multiple-choice">Multiple-choice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="short-answer" />
                  <Label htmlFor="short-answer">Short-answer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="free-response" />
                  <Label htmlFor="free-response">Free-response</Label>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-blue-500 text-white p-3 rounded-lg text-center mb-2">
                <Label htmlFor="diversity" className="text-lg font-medium">
                  Diversity of Names
                </Label>
              </div>
              <Input
                id="diversity"
                placeholder="e.g. historically Black names etc."
                className="w-full border-gray-300 rounded-md"
              />
            </div>

            <div>
              <div className="bg-blue-500 text-white p-3 rounded-lg text-center mb-2">
                <Label htmlFor="parameters" className="text-lg font-medium">
                  Additional Parameters
                </Label>
              </div>
              <Input
                id="parameters"
                placeholder="e.g. pythagorean theorem, trig functions etc."
                className="w-full border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full text-lg"
            >
              Generate!
            </Button>
          </div>
        </form>
      </Card>

      {generatedProblems.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Generated Problems</h3>
          <div className="grid gap-4">
            {generatedProblems.map((problem, index) => (
              <Card key={index} className="p-6 shadow-md">
                <p className="text-lg">{problem}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

