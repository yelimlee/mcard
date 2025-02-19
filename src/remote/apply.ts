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
  return addDoc(collection(store, COLLECIONS.CARD_APPLY), applyValues)
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
