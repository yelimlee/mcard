import Agreement from '../shared/Agreement'
import { 약관목록 } from '@constants/apply'
import { useCallback, useState } from 'react'
import { MouseEvent } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'
import { ApplyValues } from '@/models/apply'

function Terms({ onNext }: { onNext: (terms: ApplyValues['terms']) => void }) {
  const [termAgreements, setTermAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({ ...prev, [term.id]: false }),
      {},
    )
  })

  // title가 checked되는 순간에 true/false로 바꾸기
  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  const 모든약관이_동의되었는가 = Object.values(termAgreements).every(
    (동의여부) => 동의여부,
  )

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={모든약관이_동의되었는가}
          onChange={handleAllAgreement}
        >
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            checked={termAgreements[id]}
            onChange={(_, checked) => {
              setTermAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
            link={link}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={모든약관이_동의되었는가 === false}
        onClick={() => {
          onNext(Object.keys(termAgreements))
        }}
      />
    </div>
  )
}
export default Terms
