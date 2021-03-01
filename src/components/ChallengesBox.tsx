import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { countDownContext } from '../contexts/CountDownContext';
import styles from '../style/components/ChallengesBox.module.css';
import { CompletedChallenges } from './CompletedChallenges';

export function ChallengesBox() {
  const { activeChallenge, resetChallenges, completeChallenge } = useContext(ChallengesContext)
  const { resetCountDown } = useContext(countDownContext)

  function handleChallengesSucceeded(){
    completeChallenge();
    resetCountDown();
  }

  function handleChallengesFailed(){
    resetChallenges();
    resetCountDown();
  }


  return (
    <div className={styles.challengeContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>
            Ganhe {activeChallenge.amount} XP
          </header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo Desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeButtonFailed}
              onClick={handleChallengesFailed}

            >Falhei</button>
            <button
              type="button"
              className={styles.challengeButtonSucceeded}
              onClick={handleChallengesSucceeded}
            >Completei
            </button>

          </footer>

        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um clico para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level UP" />
          Avançe de level completando desafios
          </p>
          </div>
        )}

    </div>
  )
}