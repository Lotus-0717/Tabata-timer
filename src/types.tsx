export interface TabataOptions {
  cycleCount: number;
  exerciseTime: number;
  restTime: number;
  isExerciseImmediately: boolean;
  sequence: Sequence[];
}

export interface Sequence {
  stage: 'rest' | 'exercise';
  time: number;
}
