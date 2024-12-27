import { css } from '@emotion/react'
import Flex from '../shared/Flex'
import FixedBottomButton from '../shared/FixedBottomButton'
import Spacing from '../shared/Spacing'
import TextField from '../shared/TextField'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { FormValues } from '@/models/signup'
import validator from 'validator'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  // const [name, setName] = useStatus('') 이렇게 따로할수있지만 필드가 많은경우 아래처럼 한꺼번에 처리
  // controlled방식
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  // blur가 되었을때 dirty처리가 되어 dirty인 경우 유효성 검사 시작
  const [dirty, setDirty] = useState<Partial<FormValues>>()

  // 리렌더링이 계속 일어나고 함수들도 새롭게 만들어지는데 함수는 바깥의 값에 의존하고 있지 않다 useCallback을 사용하면서 계속 새롭계 생성되는걸 막는다
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name) // 'name' 속성으로 알수있음
    // console.log(e.target.value)
    // 기존의 값(prevFormValues)은 복사가 되고 방금 입력한 속성의 값만 변경됨
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한상태인가 = Object.keys(errors).length === 0

  // 'name' 속성을 넣는 이유 : input에 입력할때 handleFormValues에서 이벤트가 어떤 필드인지 구분하기 위해
  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="abc@gmail.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty?.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty?.email) && errors.email}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty?.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty?.password) && errors.password}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        type="password"
        name="rePassword"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty?.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty?.rePassword) && errors.rePassword}
        onBlur={handleBlur}
      />
      <TextField
        label="이름"
        placeholder="홍길동"
        name="name"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty?.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty?.name) && errors.name}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <FixedBottomButton
        label="회원가입"
        disabled={제출가능한상태인가 === false}
        onClick={() => {
          onSubmit(formValues)
        }}
      />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
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
  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호를 8글자 이상 입력해주세요'
  } else if (
    validator.equals(formValues.rePassword, formValues.password) === false
  ) {
    errors.rePassword = '비밀번호를 확인해주세요'
  }
  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요'
  }

  return errors
}

export default Form
