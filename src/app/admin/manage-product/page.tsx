import React from 'react'
import { SidebarAdmin } from '../components/SideBarAdmin'
import ProductPage from './components/ProductPage'

const ManageProductPage = () => {
  return (
    <section className='flex'>
        <SidebarAdmin/>
        <ProductPage />
    </section>
  )
}

export default ManageProductPage