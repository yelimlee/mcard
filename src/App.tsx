import React from 'react'
import logo from './logo.svg'
import './App.css'
import Text from './components/shared/Text'
import Button from './components/shared/\bButton'

function App() {
  return (
    <div>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text typography="t2" color="blue">
        t2
      </Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text typography="t5">t5</Text>
      <Button>클릭해주세요</Button>
      <Button color="success">클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button color="error" weak={true}>
        클릭해주세요
      </Button>
      <Button size="large">클릭해주세요</Button>
      <Button full disabled>
        클릭해주세요
      </Button>
    </div>
  )
}

export default App
