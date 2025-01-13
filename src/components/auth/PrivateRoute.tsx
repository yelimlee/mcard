// 인증이 필요한 페이지의 경우 유저의 정보를 받아 어떤 페이지로 이동할지 결정해주는 페이지
import useUser from '@/hooks/auth/useUser'
import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/signin" replace={true} />
  }

  // 유저정보가 있는 경우 받아온 path로 이동
  return <>{children}</>
}

export default PrivateRoute
