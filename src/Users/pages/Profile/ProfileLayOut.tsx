import { Switch } from 'antd'
import React, { useState } from 'react'
import Profile from './Profile'
import Profile2 from './Profile2'

const ProfileLayOut = () => {
    const [state, setState] = useState(true)
    const [tab, setTab] = useState("user");
    return (
        <div className='container'>

            <Switch onChange={() => setState(prev => !prev)} />
            <br />
            <br />
            {
                state ? <Profile tab={tab} setTab={setTab} /> : <Profile2 tab={tab} setTab={setTab} />
            }
        </div>
    )
}

export default ProfileLayOut
