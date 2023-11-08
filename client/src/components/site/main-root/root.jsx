import React from 'react'
import { Outlet } from 'react-router-dom'
import SiteFooter from '../../../layouts/site/footer/footer'

const SiteRoot = () => {
  return (
    <>
      <Outlet/>
      <SiteFooter/>
    </>
  )
}

export default SiteRoot
