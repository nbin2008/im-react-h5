import React, {FC} from "react";
import 'src/assets/css/page/login.scss'

const Login: FC = () => {

  return (
    <div className='page-login'>
      <div className='login-bg'></div>
      <div className='tab-box'>
        <span>账号登陆</span>
        <span>手机登陆</span>
      </div>
    </div>
  )
}

export default Login