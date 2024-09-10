import React from 'react'
import RemarksList from './RemarksList'
import RemarksInput from './RemarksInput'

const RemarksHistory = ({ rowData }) => {
  return (
    <>
      <RemarksList />
      <RemarksInput rowData={rowData} />
    </>
  )
}

export default RemarksHistory
