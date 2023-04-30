import React from 'react'
import AdminRoute from './adminRoute'
import { Outlet } from 'react-router-dom'
export default function rightside() {
    return (
        <div>
            <Outlet />
        </div>
    )
}
