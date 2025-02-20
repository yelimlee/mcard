import { COLLECIONS } from '@/constants'
import { ApplyValues } from '@/models/apply'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { store } from './firebase'

export async function applyCard(applyValues: ApplyValues) {
  // step 프로퍼티만 제외하고 업로드
  const { step, ...updateApplyValues } = applyValues
  return addDoc(collection(store, COLLECIONS.CARD_APPLY), updateApplyValues)
}

// 카드의 status 업데이트
export async function updateApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  const [applied] = snapshot.docs

  updateDoc(applied.ref, applyValues)
}

// 이미 카드 신청을 했는지 조회
export async function getAppliedCard({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  // 데이터가 없는 경우 -> 신청 안한 상태
  if (snapshot.docs.length === 0) {
    return null
  }

  const [applied] = snapshot.docs
  return applied.data() as ApplyValues
}
