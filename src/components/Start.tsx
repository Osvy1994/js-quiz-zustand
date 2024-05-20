import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'

export const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const LIMIT_QUESTIONS = 10

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }

  return (
    <div style={{ marginTop: '16px' }}>
      <Button onClick={handleClick} variant='contained'>
        Start Game!
      </Button>
    </div>
  )
}
