import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import ListRow from '@/components/shared/ListRow'
import Top from '@/components/shared/Top'
import { getCard } from '@/remote/card'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useCallback } from 'react'
import useUser from '@/hooks/auth/useUser'
import { useAlertContext } from '@/contexts/AlertContext'
import Spacing from '@/components/shared/Spacing'
import Review from '@/components/card/Review'

function CardPage() {
  const { id = '' } = useParams()

  const navigate = useNavigate()

  // enabled : 조건에 따라 데이터를 호출여부를 설정함
  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })

  const user = useUser()
  const { open } = useAlertContext()
  const moveToApply = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능입니다',
        onButtonClick: () => {
          navigate(`/signin`, { state: `/apply/${id}` })
        },
      })
      return
    }
    navigate(`/apply/${id}`)
  }, [user, id, open, navigate])

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data
  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              initial={{ opacity: 0, translateX: -90 }}
              transition={{
                duration: 0.8,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
              whileInView={{
                opacity: 1,
                translateX: 0,
              }}
              key={text}
            >
              <ListRow
                left={IconCheck()}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
                as="div"
              />
            </motion.li>
          )
        })}
      </ul>
      {promotion != null ? (
        <Flex css={termsContainerStyles} direction="column">
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}
      <Spacing size={1000} />
      <Review />
      <Spacing size={100} />
      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={moveToApply}
      />
    </div>
  )
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

function IconCheck() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
      />
      <path d="M16 24L22 30L34 18" stroke="white" />
    </svg>
  )
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`
export default CardPage
