// 인증 처리
import { userAtom } from '@/atoms/user'
import { auth } from '@/remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'

// children : index.tsx에서 <App/>
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)

  const setUser = useSetRecoilState(userAtom)
  // onAuthStateChanged : 최초 한번 실행
  onAuthStateChanged(auth, (user) => {
    // 로그인시 유저정보를 recoil에 해당 atom에 맞는 값을 저장해서 유저 정보 전역 저장
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    } else {
      setUser(null)
    }
    setInitialize(true)
  })
  if (initialize === false) {
    return null
  }
  return <>{children}</>
}

export default AuthGuard
