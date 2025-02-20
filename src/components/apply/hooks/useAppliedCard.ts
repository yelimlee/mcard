// getAppliedCard()를 이용하여 유저의 카드 신청 정보를 가져온다

import { ApplyValues } from '@/models/apply'
import { getAppliedCard } from '@/remote/apply'
import { useQuery, UseQueryOptions } from 'react-query'

function useAppliedCard({
  userId,
  cardId,
  options,
}: {
  userId: string
  cardId: string
  options?: Pick<
    UseQueryOptions<ApplyValues | null>,
    'onSuccess' | 'onError' | 'suspense'
  >
}) {
  return useQuery(
    ['applied', userId, cardId],
    () => getAppliedCard({ userId, cardId }),
    options,
  )
}

export default useAppliedCard
