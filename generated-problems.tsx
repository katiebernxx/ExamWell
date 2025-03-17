"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react"

interface Problem {
  id: string
  subject: string
  topic: string
  difficulty: string
  question: string
  solution: string
  verified: boolean
}

const sampleProblems: Problem[] = [
  {
    id: "1",
    subject: "Calculus",
    topic: "Optimization",
    difficulty: "Advanced",
    question:
      "A farmer wants to fence a rectangular area adjacent to a river. If the farmer has 100 meters of fencing and the river acts as one side of the rectangle (no fencing needed), what dimensions will maximize the enclosed area?",
    solution:
      "Let w = width and l = length. Area = w × l. Perimeter = 2w + l = 100. Solve l = 100 - 2w. Area = w(100-2w) = 100w - 2w². Take derivative: dA/dw = 100 - 4w. Set equal to 0: 100 - 4w = 0. w = 25. Therefore l = 50. Maximum area is 1250 square meters.",
    verified: false,
  },
  {
    id: "2",
    subject: "Algebra",
    topic: "Systems of Equations",
    difficulty: "Intermediate",
    question:
      "Chen and Maria went to the store to buy school supplies. Chen bought 2 notebooks and 3 pens for $13. Maria bought 4 notebooks and 1 pen for $17. What is the cost of one notebook and one pen?",
    solution:
      "Let x = cost of notebook, y = cost of pen\n2x + 3y = 13\n4x + y = 17\nMultiply first equation by 2: 4x + 6y = 26\nSubtract from second equation: -5y = -9\ny = $1.80 per pen\nSubstitute back: 2x + 3(1.80) = 13\n2x + 5.40 = 13\n2x = 7.60\nx = $3.80 per notebook",
    verified: false,
  },
  {
    id: "3",
    subject: "Geometry",
    topic: "Trigonometry",
    difficulty: "Basic",
    question:
      "Aisha is flying a kite that is 100 feet away from her horizontally. The angle of elevation to the kite is 60 degrees. How high is the kite?",
    solution:
      "Using tangent of 60°:\ntan(60°) = height/100\nheight = 100 × tan(60°)\ntan(60°) ≈ 1.732\nheight ≈ 173.2 feet",
    verified: false,
  },
]

export function GeneratedProblems() {
  const [problems, setProblems] = useState(sampleProblems)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleProblem = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const toggleVerification = (id: string) => {
    setProblems(problems.map((problem) => (problem.id === id ? { ...problem, verified: !problem.verified } : problem)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Your Generated Problems</h2>
        <div className="flex gap-4">
          <Badge variant="outline" className="text-sm">
            Total Problems: {problems.length}
          </Badge>
          <Badge variant="outline" className="text-sm">
            Verified: {problems.filter((p) => p.verified).length}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {problems.map((problem) => (
          <Card key={problem.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{problem.subject}</h3>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{problem.topic}</Badge>
                    <Badge variant="outline">{problem.difficulty}</Badge>
                  </div>
                </div>
                <Button
                  variant={problem.verified ? "default" : "outline"}
                  className={`flex items-center gap-2 ${problem.verified ? "bg-green-600 hover:bg-green-700" : ""}`}
                  onClick={() => toggleVerification(problem.id)}
                >
                  {problem.verified ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Verified
                    </>
                  ) : (
                    "I used this!"
                  )}
                </Button>
              </div>

              <p className="text-gray-700 mb-4">{problem.question}</p>

              <Button variant="ghost" className="flex items-center gap-2" onClick={() => toggleProblem(problem.id)}>
                {expandedId === problem.id ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Hide Solution
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show Solution
                  </>
                )}
              </Button>

              <AnimatePresence>
                {expandedId === problem.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Solution:</h4>
                      <p className="text-gray-700 whitespace-pre-line">{problem.solution}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

