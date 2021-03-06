import { useContext} from 'react';
import { countDownContext } from '../contexts/CountDownContext';
import styles from '../style/components/countDown.module.css';

export function CountDown() {
  const {minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    startCountDown, 
    resetCountDown} = useContext(countDownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      { hasFinished ? (
        <button disabled
          className={styles.countDownButton}
        >
          Ciclo Encerrado
        </button>
      ) :
        <>
          {isActive ? (
            <button
              type="button"
              onClick={resetCountDown}
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
            >
              Abandonar Ciclo
            </button>
          ) : (
              <button
                type="button"
                onClick={startCountDown}
                className={styles.countDownButton}>
                Iniciar Ciclo
              </button>
            )}
        </>
      }

    </div>
  )
}