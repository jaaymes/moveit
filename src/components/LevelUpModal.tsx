import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../style/components/LevelUpModal.module.css'

export function LevelUpModal() {
  const {level, closeLevelUpModal} = useContext(ChallengesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabens!</strong>
        <p>Você Alcançou um novo Level</p>
        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Voltar"/>
        </button>
      </div>
    </div>
  )
}