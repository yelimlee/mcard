import Form from '@/components/signup/Form'
import { COLLECIONS } from '@/constants'
import { FormValues } from '@/models/signup'
import { auth, store } from '@/remote/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

// form과 회원가입을 분리해서 signup에는 form에서 받아온 데이터를 받아서만 실행해준다
function SignupPage() {
  const navigate = useNavigate()
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, {
      displayName: name,
    })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayNmae: name,
    }

    // collection의 두번째 인자에 uid를 넣어서 doc의 id를 지정해준다
    await setDoc(doc(collection(store, COLLECIONS.USER), user.uid), newUser)
    navigate('/')
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}></Form>
    </div>
  )
}

export default SignupPage
