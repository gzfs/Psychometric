"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";

// Quiz data
const quizData = {
  traits: [
    {
      name: "Delayed Gratification",
      questions: [
        {
          id: "Q1",
          question:
            "When given a choice between getting $15 now and $20 in two weeks, what would you pick?",
          options: {
            A: { text: "$15 now", score: 2 },
            B: { text: "$20 in two weeks", score: 4 },
          },
        },
        {
          id: "Q2",
          question:
            "How do you respond when you see a flash sale on something you didn't plan to buy?",
          options: {
            A: { text: "I buy it immediately – it's a deal!", score: 1 },
            B: {
              text: "I think about it for a day before deciding.",
              score: 3,
            },
            C: { text: "I only buy things I planned for.", score: 4 },
          },
        },
        {
          id: "Q3",
          question: "You receive unexpected money. How do you handle it?",
          options: {
            A: { text: "I spend it right away.", score: 1 },
            B: { text: "I save half and spend half.", score: 3 },
            C: { text: "I save or invest the entire amount.", score: 4 },
          },
        },
        {
          id: "Q4",
          question:
            "If you're craving a snack but the vending machine is far away, what do you do?",
          options: {
            A: { text: "Walk and get the snack immediately.", score: 2 },
            B: { text: "Wait until the next break or meal.", score: 4 },
          },
        },
        {
          id: "Q5",
          question:
            "Would you rather receive a $100 gift card today or $150 in three months?",
          options: {
            A: { text: "$100 today.", score: 1 },
            B: { text: "$150 in three months.", score: 4 },
          },
        },
        {
          id: "Q6",
          question:
            "When budgeting for a vacation, how do you manage spending?",
          options: {
            A: { text: "I splurge while on vacation.", score: 1 },
            B: { text: "I stick to a moderate spending plan.", score: 3 },
            C: { text: "I strictly adhere to a tight budget.", score: 4 },
          },
        },
      ],
    },
    {
      name: "Integrity",
      questions: [
        {
          id: "Q7",
          question: "If you receive extra change at a store, what do you do?",
          options: {
            A: { text: "Return it immediately.", score: 4 },
            B: { text: "Keep it – it's their mistake.", score: 1 },
          },
        },
        {
          id: "Q8",
          question:
            "You notice an error in your favor on your credit card statement. What's your next move?",
          options: {
            A: { text: "Report it to the bank.", score: 4 },
            B: {
              text: "Wait to see if it's corrected automatically.",
              score: 1,
            },
          },
        },
        {
          id: "Q9",
          question:
            "If given the opportunity to cut corners on a project without anyone noticing, what do you do?",
          options: {
            A: { text: "I complete the project fully.", score: 4 },
            B: { text: "I take the shortcut.", score: 1 },
          },
        },
        {
          id: "Q10",
          question:
            "How do you handle paying back a friend who forgot about the loan?",
          options: {
            A: { text: "I repay them without being reminded.", score: 4 },
            B: { text: "I only repay if they ask.", score: 2 },
          },
        },
        {
          id: "Q11",
          question:
            "Your workplace overpaid you on your last check. What do you do?",
          options: {
            A: { text: "Notify HR immediately.", score: 4 },
            B: { text: "Keep it and hope it goes unnoticed.", score: 1 },
          },
        },
        {
          id: "Q12",
          question:
            "Would you take responsibility for a mistake you didn't make to protect your team?",
          options: {
            A: { text: "Yes, if it protects the team.", score: 4 },
            B: { text: "No, I would explain the truth.", score: 1 },
          },
        },
      ],
    },
    {
      name: "Locus of Control",
      questions: [
        {
          id: "Q13",
          question:
            "What do you believe is the main factor in your financial success?",
          options: {
            A: { text: "My hard work and decisions.", score: 4 },
            B: { text: "The economy and external factors.", score: 2 },
          },
        },
        {
          id: "Q14",
          question:
            "If you fail at something financially, what is your first thought?",
          options: {
            A: { text: "I made poor decisions.", score: 4 },
            B: { text: "Bad luck or circumstances.", score: 2 },
          },
        },
        {
          id: "Q15",
          question: "How do you approach financial planning?",
          options: {
            A: { text: "I actively plan and set goals.", score: 4 },
            B: { text: "I adapt to situations as they come.", score: 3 },
            C: { text: "I rely on others for financial advice.", score: 2 },
          },
        },
      ],
    },
    {
      name: "Materialism",
      questions: [
        {
          id: "Q16",
          question: "How important are luxury items to you?",
          options: {
            A: { text: "Very important, I enjoy high-end products.", score: 2 },
            B: {
              text: "Not important, I prefer functionality over luxury.",
              score: 4,
            },
          },
        },
        {
          id: "Q17",
          question:
            "When making a major purchase, what's your primary consideration?",
          options: {
            A: { text: "Brand reputation and status.", score: 2 },
            B: { text: "Value for money and practicality.", score: 4 },
          },
        },
      ],
    },
    {
      name: "Risk Aversion",
      questions: [
        {
          id: "Q18",
          question: "How do you approach investment opportunities?",
          options: {
            A: { text: "I prefer safe, low-risk investments.", score: 4 },
            B: {
              text: "I'm willing to take risks for higher returns.",
              score: 2,
            },
          },
        },
        {
          id: "Q19",
          question:
            "When faced with a new financial product, what's your reaction?",
          options: {
            A: {
              text: "I research thoroughly before considering it.",
              score: 4,
            },
            B: {
              text: "I'm excited to try new financial opportunities.",
              score: 2,
            },
          },
        },
      ],
    },
  ],
};

// Flatten the questions array
const allQuestions = quizData.traits.flatMap((trait) => trait.questions);

// QuizStart component
const QuizStart = ({ onStart }: { onStart: () => void }) => (
  <Card className="w-[450px]">
    <CardHeader>
      <CardTitle>CredLens Psychometric Quiz</CardTitle>
      <CardDescription>
        Analyze your personality and financial behavior
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        This quiz consists of 19 questions and will help us understand your
        financial behavior better. Your responses will be used to calculate your
        credit risk and provide insights into your financial personality.
      </p>
    </CardContent>
    <CardFooter>
      <Button onClick={onStart} className="w-full">
        Start Quiz
      </Button>
    </CardFooter>
  </Card>
);

// QuizQuestion component
const QuizQuestion = ({
  question,
  onAnswer,
}: {
  question: any;
  onAnswer: (questionId: string, option: string) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (optionKey: string, checked: boolean) => {
    // Uncheck previous selection if any
    if (selectedOption && selectedOption !== optionKey) {
      const prevCheckbox = document.getElementById(
        selectedOption
      ) as HTMLInputElement;
      if (prevCheckbox) prevCheckbox.checked = false;
    }

    // Update state and trigger parent callback only if checked
    if (checked) {
      setSelectedOption(optionKey);
      onAnswer(question.id, optionKey);
    } else {
      setSelectedOption(null);
    }
  };

  // Reset selection when question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [question.id]);

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {Object.entries(question.options).map(
            ([key, value]: [string, any]) => (
              <div className="flex items-center space-x-2" key={key}>
                <Checkbox
                  id={key}
                  checked={selectedOption === key}
                  onCheckedChange={(checked) =>
                    handleOptionSelect(key, checked as boolean)
                  }
                />
                <Label
                  htmlFor={key}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {value.text}
                </Label>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Scoring functions
const interpretScore = (score: number) => {
  if (score >= 65) return "Low Credit Risk";
  else if (score >= 55) return "Moderate Credit Risk";
  else if (score >= 40) return "High Credit Risk";
  else return "Very High Credit Risk";
};

const personalityCombination = (scores: Record<string, number>) => {
  const combo = [];

  if (scores["Delayed Gratification"] > 20)
    combo.push("Patient, Future-focused");
  else combo.push("Impulsive, Short-term focused");

  if (scores["Integrity"] > 20) combo.push("Highly Honest and Responsible");
  else combo.push("Ethically Inconsistent");

  if (scores["Locus of Control"] > 18)
    combo.push("Self-driven and Accountable");
  else combo.push("Blames External Factors");

  if (scores["Materialism"] < 12) combo.push("Values Stability over Luxury");
  else combo.push("Materialistic and Status-driven");

  if (scores["Risk Aversion"] > 18)
    combo.push("Risk Averse, Security-oriented");
  else combo.push("Risk-tolerant, Seeks High Rewards");

  return combo;
};

// QuizResults component
const QuizResults = ({ responses }: { responses: Record<string, string> }) => {
  const traitScores: Record<string, number> = {
    "Delayed Gratification": 0,
    Integrity: 0,
    "Locus of Control": 0,
    Materialism: 0,
    "Risk Aversion": 0,
  };

  let totalScore = 0;

  allQuestions.forEach((question) => {
    const trait = quizData.traits.find((t) =>
      t.questions.some((q) => q.id === question.id)
    )!.name;
    const response = responses[question.id];
    const score = question.options[response]?.score || 0;
    traitScores[trait] += score;
    totalScore += score;
  });

  const riskLevel = interpretScore(totalScore);
  const personalityTraits = personalityCombination(traitScores);

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Your CredLens Profile</CardTitle>
        <CardDescription>Based on your psychometric assessment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Overall Credit Risk: {riskLevel}</h3>
          <Progress value={(totalScore / 76) * 100} className="w-full mt-2" />
          <p className="text-sm text-muted-foreground mt-1">
            Score: {totalScore} / 76
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Trait Breakdown:</h3>
          <ul className="list-disc list-inside">
            {Object.entries(traitScores).map(([trait, score]) => (
              <li key={trait}>
                {trait}: {score}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Your Financial Personality:</h3>
          <ul className="list-disc list-inside">
            {personalityTraits.map((trait, index) => (
              <li key={index}>{trait}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => window.location.reload()} className="w-full">
          Retake Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main QuizContainer component
const QuizContainer = ({ id }: { id: string }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (quizCompleted) {
      fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responses),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            console.log(data.data);
            fetch("http://10.42.98.216:5000/misc/update-id", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: parseInt(id),
                psychometric_score: data.data.total_score / 76,
              }),
            });
          }
        });
    }
  }, [quizCompleted]);

  const handleStart = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (questionId: string, option: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: option }));
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  if (!quizStarted) {
    return <QuizStart onStart={handleStart} />;
  }

  if (quizCompleted) {
    return <QuizResults responses={responses} />;
  }

  return (
    <div className="space-y-4">
      <QuizQuestion
        question={allQuestions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
      <div className="text-center">
        Question {currentQuestionIndex + 1} of {allQuestions.length}
      </div>
      <Progress
        value={(currentQuestionIndex / allQuestions.length) * 100}
        className="w-full"
      />
      {currentQuestionIndex < allQuestions.length - 1 && (
        <Button
          onClick={() =>
            handleAnswer(allQuestions[currentQuestionIndex].id, "skip")
          }
          className="w-full"
        >
          Skip
        </Button>
      )}
    </div>
  );
};

export default function PsychometricQuiz() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <QuizContainer id={id} />
    </div>
  );
}
