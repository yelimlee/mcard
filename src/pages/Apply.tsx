import Apply from '@/components/apply'
import useAppliedCard from '@/components/apply/hooks/useAppliedCard'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import { APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// apply > index.tsx의 완성된 데이터를 가지고 신청 로직 실행
function ApplyPage() {
  const navigate = useNavigate()
  const user = useUser()
  const { id } = useParams() as { id: string }
  const [readyToPoll, setReadyToPoll] = useState(false)
  const { open } = useAlertContext()

  // suspense : data값이 처음에는 undefined로 뜨다가 나중에 데이터가 들어오는데 처음부터 데이터의 값이 있으면 좋을때
  // 그래서 데이터를 불러올때는 fallback을 보여주고 데이터가 다 불러진 후에 Apply.tsx가 불러온다
  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }
        // 이미 카드 신청이 완료됨
        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
          return
        }

        // 카드 재심사 요청
        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
        userId: user?.uid as string,
        cardId: id,
      })
      // replace : 뒤로가기시 전단계 컴포넌트가 아닌 카드상세페이지로 이동
      navigate('/apply/done?success=true', { replace: true })
    },
    onError: async () => {
      await updateApplyCard({
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
        userId: user?.uid as string,
        cardId: id,
      })
      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      // 값이 추가되었을 때 => 폴링시작
      setReadyToPoll(true)
    },
    onError: () => {
      // 다시 상세 페이지 이동
      window.history.back()
    },
  })

  // 카드 신청 정보데이터가 없고 이미 신청한상태면 null return
  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (readyToPoll || 카드를신청중인가) {
    return <FullPageLoader message="카드를 신청중입니다" />
  }

  return (
    <Apply
      onSubmit={mutate}
      appliedStatus={data != null && data?.status === APPLY_STATUS.COMPLETE}
    />
  )
}

export default ApplyPage
