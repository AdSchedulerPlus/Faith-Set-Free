import { GiftType, Question, GiftDefinition } from './types';

export const GIFT_DEFINITIONS: Record<GiftType, GiftDefinition> = {
  [GiftType.PROPHECY]: {
    type: GiftType.PROPHECY,
    name: 'Prophecy',
    description: 'The capacity to proclaim God’s truth with power and clarity in a timely and culturally sensitive fashion for correction, repentance, or edification.',
    biblicalReference: 'Romans 12:6, 1 Corinthians 12:10',
    characteristics: ['Truth-teller', 'Insightful', 'Conviction-oriented', 'Direct']
  },
  [GiftType.SERVING]: {
    type: GiftType.SERVING,
    name: 'Serving (Helps)',
    description: 'The capacity to identify unmet needs involved in a task, and to make use of available resources to meet those needs and help accomplish the desired results.',
    biblicalReference: 'Romans 12:7, 1 Corinthians 12:28',
    characteristics: ['Practical', 'Hands-on', 'Reliable', 'Observant']
  },
  [GiftType.TEACHING]: {
    type: GiftType.TEACHING,
    name: 'Teaching',
    description: 'The capacity to communicate information relevant to the health and ministry of the body and its members in such a way that others will learn.',
    biblicalReference: 'Romans 12:7, 1 Corinthians 12:28',
    characteristics: ['Logical', 'Systematic', 'Research-oriented', 'Clear communicator']
  },
  [GiftType.EXHORTATION]: {
    type: GiftType.EXHORTATION,
    name: 'Exhortation',
    description: 'The capacity to offer encouragement, comfort, and counsel to those in need, helping them become all God wants them to be.',
    biblicalReference: 'Romans 12:8',
    characteristics: ['Encouraging', 'Positive', 'Action-oriented', 'Optimistic']
  },
  [GiftType.GIVING]: {
    type: GiftType.GIVING,
    name: 'Giving',
    description: 'The capacity to contribute material resources to the work of the Lord with liberality and cheerfulness.',
    biblicalReference: 'Romans 12:8',
    characteristics: ['Generous', 'Resourceful', 'Disciplined', 'Trusting']
  },
  [GiftType.LEADERSHIP]: {
    type: GiftType.LEADERSHIP,
    name: 'Leadership',
    description: 'The capacity to set goals in accordance with God’s purpose and to communicate them to others in such a way that they voluntarily and harmoniously work together.',
    biblicalReference: 'Romans 12:8',
    characteristics: ['Visionary', 'Decisive', 'Inspiring', 'Strategic']
  },
  [GiftType.MERCY]: {
    type: GiftType.MERCY,
    name: 'Mercy',
    description: 'The capacity to feel genuine empathy and compassion for individuals who suffer distressing physical, mental, or emotional problems.',
    biblicalReference: 'Romans 12:8',
    characteristics: ['Empathetic', 'Compassionate', 'Sensitive', 'Patient']
  },
  [GiftType.WISDOM]: {
    type: GiftType.WISDOM,
    name: 'Wisdom',
    description: 'The ability to apply spiritual truth effectively to meet a need in a specific situation.',
    biblicalReference: '1 Corinthians 12:8',
    characteristics: ['Insightful', 'Problem-solver', 'Practical', 'Discerning']
  },
  [GiftType.KNOWLEDGE]: {
    type: GiftType.KNOWLEDGE,
    name: 'Knowledge',
    description: 'The ability to discover, accumulate, analyze, and clarify information and ideas that are pertinent to the growth and well-being of the body.',
    biblicalReference: '1 Corinthians 12:8',
    characteristics: ['Inquisitive', 'Academic', 'Thorough', 'Studious']
  },
  [GiftType.FAITH]: {
    type: GiftType.FAITH,
    name: 'Faith',
    description: 'The capacity to discern with extraordinary confidence the will and purposes of God for the future of His work.',
    biblicalReference: '1 Corinthians 12:9',
    characteristics: ['Trusting', 'Confident', 'Visionary', 'Unwavering']
  }
};

// A condensed set of questions (3 per gift for a 30 question test to be efficient but effective)
export const QUESTIONS: Question[] = [
  // Prophecy
  { id: 1, text: "I feel a strong need to speak the truth, even if it might offend others.", gift: GiftType.PROPHECY },
  { id: 2, text: "I easily detect insincerity or wrong motives in others.", gift: GiftType.PROPHECY },
  { id: 3, text: "I have a strong sense of right and wrong and feel compelled to correct injustice.", gift: GiftType.PROPHECY },
  // Serving
  { id: 4, text: "I enjoy doing tasks that help others, even if no one notices.", gift: GiftType.SERVING },
  { id: 5, text: "I prefer doing a job myself rather than delegating it to someone else.", gift: GiftType.SERVING },
  { id: 6, text: "I often see practical needs that others miss and jump in to meet them.", gift: GiftType.SERVING },
  // Teaching
  { id: 7, text: "I enjoy studying the Bible in depth to understand its meaning.", gift: GiftType.TEACHING },
  { id: 8, text: "I get excited when I can explain complex ideas in a way people understand.", gift: GiftType.TEACHING },
  { id: 9, text: "I pay close attention to the accuracy of words and facts.", gift: GiftType.TEACHING },
  // Exhortation
  { id: 10, text: "I love encouraging people to live up to their full potential.", gift: GiftType.EXHORTATION },
  { id: 11, text: "I find it easy to apply biblical truths to practical daily living.", gift: GiftType.EXHORTATION },
  { id: 12, text: "People often come to me for advice or counseling when they are struggling.", gift: GiftType.EXHORTATION },
  // Giving
  { id: 13, text: "I manage my money well so that I can give generously to God's work.", gift: GiftType.GIVING },
  { id: 14, text: "I feel a deep joy when I can meet a financial need for someone anonymously.", gift: GiftType.GIVING },
  { id: 15, text: "I view my resources primarily as tools for the Kingdom rather than for my own comfort.", gift: GiftType.GIVING },
  // Leadership
  { id: 16, text: "I enjoy organizing people and resources to accomplish a common goal.", gift: GiftType.LEADERSHIP },
  { id: 17, text: "I naturally think about the 'big picture' and where we are heading.", gift: GiftType.LEADERSHIP },
  { id: 18, text: "When there is no clear direction, I naturally step up to take charge.", gift: GiftType.LEADERSHIP },
  // Mercy
  { id: 19, text: "I am drawn to people who are hurting, lonely, or outcast.", gift: GiftType.MERCY },
  { id: 20, text: "I feel the pain of others deeply and want to alleviate their suffering.", gift: GiftType.MERCY },
  { id: 21, text: "I am often told that I am a good listener and a safe person to cry with.", gift: GiftType.MERCY },
  // Wisdom
  { id: 22, text: "I can often see a solution to a problem when others are confused.", gift: GiftType.WISDOM },
  { id: 23, text: "People often seek my perspective on difficult decisions.", gift: GiftType.WISDOM },
  { id: 24, text: "I tend to understand the long-term consequences of actions before others do.", gift: GiftType.WISDOM },
  // Knowledge
  { id: 25, text: "I love gathering information and facts to clarify truth.", gift: GiftType.KNOWLEDGE },
  { id: 26, text: "I am patient in research and organizing data.", gift: GiftType.KNOWLEDGE },
  { id: 27, text: "I enjoy memorizing and categorizing biblical truths.", gift: GiftType.KNOWLEDGE },
  // Faith
  { id: 28, text: "I firmly believe God will handle obstacles even when I can't see the solution.", gift: GiftType.FAITH },
  { id: 29, text: "I am often ready to take risks for God that others find reckless.", gift: GiftType.FAITH },
  { id: 30, text: "I have an unshakeable confidence in God's promises during difficult times.", gift: GiftType.FAITH },
];