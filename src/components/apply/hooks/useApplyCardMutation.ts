import { useAlertContext } from '@/contexts/AlertContext'
import { ApplyValues } from '@/models/apply'
import { applyCard } from '@/remote/apply'
import { useMutation } from 'react-query'

// 성공과 실패했을 때 결과(로직)를 외부로부터 받을것임
interface useApplyCardMutationProps {
  onSuccess: () => void
  onError: () => void
}

// 카드 신청에 대한 정보를 파이어베이스에 저장해주는 함수
function useApplyCardMutation({
  onSuccess,
  onError,
}: useApplyCardMutationProps) {
  const { open } = useAlertContext()

  // useMutation: 서버에 변경작업(비동기) 요청시 사용, onSuccess와 onError로 캐치할 수 있다
  return useMutation((applyValues: ApplyValues) => applyCard(applyValues), {
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      open({
        title: '카드를 신청하지 못했어요. 나중에 다시 시도해주세요.',
        onButtonClick: () => {
          onError()
        },
      })
    },
  })
}

export default useApplyCardMutation
