import { useQuestionsStore } from './store/questions'

export function Footer() {
  const questions = useQuestionsStore(state => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer == null) unanswered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅${correct} correct ❌${incorrect} incorrect ❓${unanswered} unanswered`}</strong>
    </footer>
  )
}
