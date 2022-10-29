export interface IFlashcard {
  flashcardId: number;
  question: string;
  answer: string;
  sample: string;
  lastTime: string;
  passed: boolean;
}
