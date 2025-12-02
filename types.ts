export enum GiftType {
  PROPHECY = 'Prophecy',
  SERVING = 'Serving',
  TEACHING = 'Teaching',
  EXHORTATION = 'Exhortation',
  GIVING = 'Giving',
  LEADERSHIP = 'Leadership',
  MERCY = 'Mercy',
  WISDOM = 'Wisdom',
  KNOWLEDGE = 'Knowledge',
  FAITH = 'Faith'
}

export interface Question {
  id: number;
  text: string;
  gift: GiftType;
}

export interface GiftDefinition {
  type: GiftType;
  name: string;
  description: string;
  biblicalReference: string;
  characteristics: string[];
}

export interface QuizState {
  answers: Record<number, number>; // questionId -> score (1-5)
  isComplete: boolean;
  currentStep: number;
}

export interface UserResult {
  gift: GiftType;
  score: number;
  percentage: number;
}

export type ViewState = 'LANDING' | 'QUIZ' | 'RESULTS' | 'COACH';