import Button from '../shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { card_list } from '@/mock/data'
import { COLLECIONS } from '@/constants'
// writeBatch : 파이어베이스에 여러 데이터(doc)을 업데이트할때 건별로 올리면 비효율적이기 때문에 writeBatch를 사용해서 한꺼번에 업데이트 해준다

function CardListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    // 카드리스트를 for문을 돌면서 batch에 값을 누적해준다
    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECIONS.CARD))
      // batch에 card데이터를 넣어준다
      batch.set(docRef, card)
    })
    // commit처리를 해야 실제 값이 반영이 된다 (비동기 작업)
    await batch.commit()
    alert('카드리스트 추가완료!')
  }
  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>
}

export default CardListAddButton
