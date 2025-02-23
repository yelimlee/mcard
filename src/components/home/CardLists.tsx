import { getCards } from '@/remote/card'
import { useInfiniteQuery } from 'react-query'
import ListRow from '../shared/ListRow'
import flatten from 'lodash.flatten'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'
import Badge from '../shared/Badge'
import { useNavigate } from 'react-router-dom'

function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapshot, allPages) => {
        return snapshot.lastVisible
      },
    },
  )

  // [[첫번째 페이지 데이터], [두번째 페이지 데이터], [세번째 페이지 데이터]...]
  // -> 이중구조되어있는 array를 lodash를 사용해 flat화 해준다
  const cards = flatten(data?.pages.map(({ items }) => items))

  const navigate = useNavigate()

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) {
    return null
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={cards?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={
                  card.payback != null ? <Badge label={card.payback} /> : null
                }
                withArrow={true}
                onClick={() => navigate(`/card/${card.id}`)}
              ></ListRow>
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
