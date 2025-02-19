import { User } from './user'

export interface Term {
  id: string
  link?: string
  title: string
}

// 카드 신청 상태
export const APPLY_STATUS = {
  READY: 'READY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
} as const

export interface ApplyValues {
  userId: User['uid']
  terms: Array<Term['id']>
  appliedAt: Date
  cardId: string
  salary: string
  creditScore: string
  payDate: string
  isMaster: boolean
  isHipass: boolean
  isRf: boolean
  status: keyof typeof APPLY_STATUS // keyof typeof : 객체의 key값을 타입으로 쓰고 싶을때 READY | PROGRESS | COMPLETE | REJECT
}

export interface Option {
  label: string
  value?: string | number | undefined
}
