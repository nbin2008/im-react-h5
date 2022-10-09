import React, {FC} from "react";
import { Outlet } from "react-router-dom"

const A: FC = (props => {

  return (
    <div>
      a
      <Outlet />
    </div>
  )
})

export default A