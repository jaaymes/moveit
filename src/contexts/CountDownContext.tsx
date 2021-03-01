import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountDownContextData{
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  startCountDown: ()=>void;
  resetCountDown: ()=>void;
}
interface CountDownroviderProps {
  children: ReactNode;
}

export const countDownContext = createContext({} as CountDownContextData)
let countDownTimeOut: NodeJS.Timeout;

export function CountDownProvider({children}: CountDownroviderProps){
  const { startNewChallenges } = useContext(ChallengesContext);
  const [time, setime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60

  function startCountDown() {
    setIsActive(true);

  }
  function resetCountDown() {
    clearTimeout(countDownTimeOut);
    setIsActive(false);
    setime(0.1 * 60);
    setHasFinished(false);

  }
  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeOut = setTimeout(() => {
        setime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenges();
    }
  }, [isActive, time])
  return(
    <countDownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountDown,
      resetCountDown
    }}>
      {children}
    </countDownContext.Provider>
  )
}