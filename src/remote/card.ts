import { COLLECIONS } from '@/constants'
import {
  collection,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'
import { Card } from '@/models/card'

// pageParam: 지금 보이고 있는 맨 마지막 요소(커서)
export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECIONS.CARD), limit(10))
      : query(
          collection(store, COLLECIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )
  const cardSnapshot = await getDocs(cardQuery)

  // 마지막 커서 찾기
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  // 데이터
  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
  return { items, lastVisible }
}
