import { COLLECIONS } from '@/constants'
import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'
import { Card } from '@/models/card'

export async function getCards() {
  const cardSnapshot = await getDocs(collection(store, COLLECIONS.CARD))
  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}
