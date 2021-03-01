import styles from '../style/components/Profile.module.css'

import { ChallengesContext } from '../contexts/ChallengesContext'
import { useContext } from 'react'

export function Profile(){
  const { level } = useContext( ChallengesContext)
  
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/jaaymes.png" alt=""/>
      <div>
        <strong>Jaymes Costa</strong>
        <p>
          <img src="icons/level.svg" alt=""/>
          Level {level}</p>
      </div>
    </div>
  )
}