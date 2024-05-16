import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { devtools, persist } from 'zustand/middleware'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,
          fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json()

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit)
            set({ questions }, false, 'FETCH_QUESTIONS')
          },
          selectAnswer: (questionId: number, answerIndex: number) => {
            const state = get()
            const newQuestions = structuredClone(state.questions)
            const questionIndex = newQuestions.findIndex(
              q => q.id === questionId,
            )
            const questionInfo = newQuestions[questionIndex]
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex
            if (isCorrectUserAnswer) confetti()
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            }
            set({ questions: newQuestions }, false, 'SELECT_ANSWER')
          },
          goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, 'NEXT_QUESTION')
            }
          },
          goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const nextQuestion = currentQuestion - 1

            if (nextQuestion >= 0) {
              set({ currentQuestion: nextQuestion }, false, 'PREVIOUS_QUESTION')
            }
          },
        }
      },
      {
        name: 'questions',
      },
    ),
  ),
)
