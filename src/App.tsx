import React from 'react'
import logo from './logo.svg'
import './App.css'
import Text from './components/shared/Text'
import Button from './components/shared/Button'
import Input from './components/shared/Input'
import Textfield from './components/shared/TextField'
import TextField from './components/shared/TextField'

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
      {/* <Input placeholder="로그인" aria-invalid={false} /> */}
      {/* <Input aria-invalid={true} /> */}
      <TextField label="아이디" />
      <TextField
        label="패스워드"
        hasError={true}
        helpMessage="비밀번호를 입력해 주세요."
      />
    </div>
  )
}

export default App
