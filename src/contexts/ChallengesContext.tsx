import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';

interface challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelup: () => void;
  startNewChallenges: () => void;
  activeChallenge: challenge;
  resetChallenges: () => void;
  experienceToNextLevel: number;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;

}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number
  currentExperience: number
  challengesCompleted: number

}
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setlevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setchallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])


  function resetChallenges() {
    setActiveChallenge(null)

  }

  function levelup() {
    setlevel(level + 1);
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenges() {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];


    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio 🔥🔥', {
        body: `Valendo ${challenge.amount} xp`
      })
    }
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelup();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setchallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      levelup,
      currentExperience,
      challengesCompleted,
      startNewChallenges,
      activeChallenge,
      resetChallenges,
      experienceToNextLevel,
      completeChallenge,
      closeLevelUpModal
    }}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}