import React from 'react'

const Footer = () => {
    const year=new Date().getFullYear();
  return (
    <>
    <br />
        <span style={{color:"#fff"}}>Copyright © {year} All Rights Reserved Md Sohail Ansari</span>
    </>
  )
}

export default Footer