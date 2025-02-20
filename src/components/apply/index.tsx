import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import useUser from '@/hooks/auth/useUser'
import { ApplyValues, APPLY_STATUS } from '@/models/apply'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// 3개의 신청 컴포넌트로 부터 받은 데이터를 관리
function Apply({
  onSubmit,
  appliedStatus,
}: {
  onSubmit: (applyValues: ApplyValues) => void
  appliedStatus: boolean
}) {
  const user = useUser()
  const { id } = useParams() as { id: string }
  // unique한 로컬스토리지 키값 생성
  const storageKey = `applied=${user?.uid}-${id}`

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)

    if (applied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      }
    }
    return JSON.parse(applied)
  })

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey)
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    } else {
      // TODO 카드 신청하고 재신청하면 로컬에 계속 생기는거 고쳐야함ㅡㅡ
      if (!appliedStatus) {
        localStorage.setItem(storageKey, JSON.stringify(applyValues))
      }
    }
  }, [applyValues, onSubmit, storageKey, appliedStatus])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  return (
    <div>
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  )
}

export default Apply
