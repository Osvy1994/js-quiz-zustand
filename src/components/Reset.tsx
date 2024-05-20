import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'

export function Reset() {
  const resetGame = useQuestionsStore(state => state.resetGame)
  return (
    <Button onClick={resetGame} variant='outlined' sx={{ marginTop: '30px' }}>
      Reset
    </Button>
  )
}
