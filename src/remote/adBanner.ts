import { COLLECIONS } from '@/constants'
import { AdBanner } from '@/models/card'
import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

export async function getAdBenners() {
  const adBannerSnapshot = await getDocs(collection(store, COLLECIONS.ADBANNER))
  return adBannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}
