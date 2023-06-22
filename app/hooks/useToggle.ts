import { Dispatch, SetStateAction, useCallback, useState } from 'react'

const useToggle = (
  initialState = false
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState(!!initialState)
  const toggle = useCallback(() => setState((state) => !state), [])

  return [state, toggle, setState]
}

export default useToggle
