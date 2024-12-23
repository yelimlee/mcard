import Top from '@/components/shared/Top'
import AdBanners from '@/components/home/AdBanners'
import CardLists from '@/components/home/CardLists'

function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요"
      />
      <AdBanners />
      <CardLists />
    </div>
  )
}

export default HomePage
