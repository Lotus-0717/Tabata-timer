// 引入需要的模組和類型
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { TabataOptions, Sequence } from '../types';
import useSound from 'use-sound';
import ShortBeep from '../assets/short-beep.mp3';
import LongBeep from '../assets/long-beep.mp3';

// 定義組件的props類型
interface TabataTimerProps {
  videoState: string; // 視頻的狀態，例如"start"
  tabataOptions: TabataOptions; // Tabata運動的選項，包括休息時間、運動時間和序列
}

// 定義組件
function TabataTimer({ videoState, tabataOptions }: TabataTimerProps) {
  const [playShortBeep] = useSound(ShortBeep);
  const [playLongBeep] = useSound(LongBeep);
  // 定義狀態變量
  const [timerData, setTimerData] = useState({
    sequenceName: '',
    sequenceIndex: 0, // 當前序列的索引
    timeLeft: 0, // 當前序列剩餘的時間
  });
  const [timer, setTimer] = useState<number | null>(null); // 計時器

  // 初始化或重置計時器的函數
  const initializeTimer = (sequence: Sequence[], sequenceIndex: number = 0) => {
    setTimerData({
      sequenceName: sequence[sequenceIndex].stage,
      sequenceIndex, // 設置當前序列的索引
      timeLeft: sequence[sequenceIndex]?.time || 0, // 設置當前序列剩餘的時間
    });
  };

  // 開始倒數計時的函數
  const startCountDown = () => {
    if (timer) clearInterval(timer); // 如果計時器已存在，則清除它
    const newTimer = setInterval(() => {
      // 創建一個新的計時器
      setTimerData((prev) => {
        if (prev.timeLeft > 1) {
          // 如果還有剩餘時間，則減少剩餘時間
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        } else {
          // 如果沒有剩餘時間，則檢查是否有下一個序列
          const nextIndex = prev.sequenceIndex + 1;
          if (tabataOptions.sequence[nextIndex]) {
            // 如果有下一個序列，則初始化計時器並開始新的倒數
            initializeTimer(tabataOptions.sequence, nextIndex);
            return {
              sequenceIndex: nextIndex,
              timeLeft: tabataOptions.sequence[nextIndex].time,
              sequenceName: tabataOptions.sequence[nextIndex].stage,
            };
          } else {
            // 如果沒有下一個序列，則清除計時器
            clearInterval(newTimer);
            return prev;
          }
        }
      });
    }, 1000);
    setTimer(newTimer); // 更新計時器的狀態
  };

  // 使用useEffect來監聽videoState和sequence的變化，並控制計時器
  useEffect(() => {
    if (videoState === 'start' && tabataOptions.sequence.length > 0) {
      // 如果視頻開始並且有序列，則初始化計時器並開始倒數
      initializeTimer(tabataOptions.sequence);
      startCountDown();
    } else if (videoState === 'pausing' && timer !== null) {
      clearInterval(timer);
    } else if (videoState === 'playing') {
      startCountDown();
    } else if (videoState === 'ready' && timer !== null) {
      clearInterval(timer);
      setTimer(null);
      setTimerData({
        sequenceIndex: 0,
        timeLeft: 0,
        sequenceName: '',
      });
    }

    return () => {
      // 在組件卸載或videoState變化時，清除計時器
      if (timer) clearInterval(timer);
    };
  }, [videoState]);

  useEffect(() => {
    if (timerData.timeLeft <= 3) {
      playShortBeep();
    }
  }, [timerData.timeLeft]);

  useEffect(() => {
    playLongBeep();
  }, [timerData.sequenceIndex]);

  // 渲染剩餘時間
  return (
    <>
      <Typography variant="h3">{timerData.sequenceName}</Typography>
      <Typography variant="h3">{timerData.timeLeft}</Typography>
    </>
  );
}

export default TabataTimer;
