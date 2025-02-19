import Apply from '@/components/apply'
import { useState } from 'react'

// apply > index.tsx의 완성된 데이터를 가지고 신청 로직 실행
function ApplyPage() {
  const [step, setStep] = useState(2)

  const handleSubmit = () => {
    // TODO : 카드신청
  }

  return <Apply step={step} onSubmit={handleSubmit} />
}

export default ApplyPage
