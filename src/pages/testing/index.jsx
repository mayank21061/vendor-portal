import { Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import useDebounce from 'src/customHooks/useDebounce'

export default function MyComponent() {
  const [inputValue, setInputValue] = useState('')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue.length > 0 && inputValue.trim() === debouncedInputValue) {
      // instead of alert do api call
      alert(debouncedInputValue)
    }
  }, [debouncedInputValue, inputValue])

  return (
    <Paper>
      <input type='text' value={inputValue} onChange={e => setInputValue(e.target.value)} />
    </Paper>
  )
}
