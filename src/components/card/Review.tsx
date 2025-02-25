import { useQuery } from 'react-query'
import Skeleton from '../shared/Skeleton'
import Spacing from '../shared/Spacing'
import { useInView } from 'react-intersection-observer'

function Review() {
  // ref : 우리가 보여주고 싶은곳과 매칭을 해주면 ref된 컴포넌트가 노출이 되었을 때 inView의 값이 바뀐다
  // inView (boolean)
  // triggerOnce 최초 한번 컴포넌트가 보여질때만 실행됨
  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(['너무 좋아요', '꼭 신청하세요!!!'])
        }, 2_000)
      })
    },
    {
      enabled: inView,
    },
  )
  return (
    <div ref={ref}>
      {isLoading ? (
        <>
          <Skeleton width={30} height={10} />
          <Spacing size={3} />
          <Skeleton width={30} height={10} />
        </>
      ) : (
        data.map((review) => <div key={review}>{review}</div>)
      )}
    </div>
  )
}

export default Review
