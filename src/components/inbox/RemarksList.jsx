import React from 'react'
import VendorMsg from './VendorMsg'
import EicMsg from './EicMsg'
import { useSelector } from 'react-redux'

const RemarksList = () => {
  const data = useSelector(state => state.inbox.invoiceHistoryData?.history)
  const { invoiceHistoryData, invoiceHistoryDataIsSuccess } = useSelector(state => state.inbox)
  console.log(invoiceHistoryData.history)

  return (
    <div>
      {invoiceHistoryDataIsSuccess &&
        data?.map(item =>
          item.sent ? (
            <VendorMsg
              message={item.invoicehistory.remarks}
              time={`${item.dateofarrival} ${item.timeofarrival}`}
              key={item.id}
              fileName={item.invoicehistory.fileName}
              fileUrl={item.invoicehistory.fileurl}
            />
          ) : (
            <EicMsg
              message={item.invoicehistory.remarks}
              time={`${item.dateofarrival} ${item.timeofarrival}`}
              key={item.id}
              fileName={item.invoicehistory.fileName}
              fileUrl={item.invoicehistory.fileurl}
            />
          )
        )}
    </div>
  )
}

export default RemarksList
