import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'

function FullPageLoader({ message }: { message?: string }) {
  console.log(message)

  return (
    <Flex
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img
          src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-47-323_512.gif"
          width={120}
          alt=""
        />
        {message != null ? (
          <>
            <Spacing size={120} />
            <Text typography="t4" bold={true}>
              {message}
            </Text>
          </>
        ) : null}
      </Flex>
    </Flex>
  )
}

export default FullPageLoader
