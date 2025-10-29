import React from 'react'
import Counter from '../hooks/useState/Counter'
import FetchData from '../hooks/useEffect/FetchData'
import ChangeBg from '../hooks/useLayOutEffect/ChangeBg'
import IndianGov from '../hooks/useContext/propsdrilling/IndianGov'
import Reducer from '../hooks/useReducer/Reducer'
import Cart from '../hooks/useMemo/cart'
import CallbackExample from '../hooks/useCallBack/Index'
import TransitionExample from '../hooks/useTransition/Index'
import RefExample from '../hooks/useRef/Index'
import IdExample from '../hooks/useId'
import CustomHookExample from '../hooks/customeHook/Index'

const App = () => {
  return (
    <div>
      {/* useState hook */}
      <Counter />

      {/* useEffect hook */}
      <FetchData />

      {/* useLayoutEffect hook */}
      <ChangeBg />

      {/* Props Drilling & useContext hook */}
      <IndianGov />

      {/* useReducer Hook */}
      <Reducer />

      {/* useMemo */}
      <Cart />

      {/* useCallback Hook */}
      <CallbackExample />

      {/* useTransition Hook */}
      <TransitionExample />

      {/* useRef Hook */}
      <RefExample />

      {/* useId */}
      <IdExample />

      {/* Custom Hook */}
      <CustomHookExample />
    </div>
  )
}

export default App
