import { FormValues } from '@/models/signin'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import TextField from '../shared/TextField'

function Form({ onSubmit }: { onSubmit: (FormValues: FormValues) => void }) {
  // controlled방식
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])
  const 제출가능한상태인가 = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="test@gmail.com"
        onChange={handleFormValues}
        value={formValues.email}
      ></TextField>
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        onChange={handleFormValues}
        value={formValues.password}
      ></TextField>
      <Spacing size={32} />
      <Button
        size="medium"
        disabled={제출가능한상태인가 === false}
        onClick={() => {
          onSubmit(formValues)
        }}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

const linkStyles = css`
  text-align: center;

  &>span: hover {
    color: ${colors.blue};
  }
`

//유효성 검사
function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  // 이메일 형식이 아닐 경우
  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해 주세요'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }
  return errors
}

export default Form
