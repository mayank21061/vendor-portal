import React from 'react'
import VendorMsg from './VendorMsg'
import EicMsg from './EicMsg'
import { useSelector } from 'react-redux'

const RemarksList = () => {
  const data = useSelector(state => state.inbox.invoiceHistoryData?.history)
  const { invoiceHistoryData, invoiceHistoryDataIsSuccess } = useSelector(state => state.inbox)
  console.log(invoiceHistoryData)
  // const data = [
  //   {
  //     id: '1',
  //     date: '123456',
  //     invoiceNumber: '789012',
  //     invoiceAmount: '25000',
  //     type: 'Pending',
  //     remarks: 'Delhi'
  //   },
  //   {
  //     id: '2',
  //     date: '654321',
  //     invoiceNumber: '345678',
  //     invoiceAmount: '30000',
  //     type: 'Completed',
  //     remarks: 'Mumbai'
  //   },
  //   {
  //     id: '3',
  //     date: '112233',
  //     invoiceNumber: '998877',
  //     invoiceAmount: '15000',
  //     type: 'In Progress',
  //     remarks: 'Chennai'
  //   },
  //   {
  //     id: '4',
  //     date: '445566',
  //     invoiceNumber: '776655',
  //     invoiceAmount: '40000',
  //     type: 'Pending',
  //     remarks: 'Kolkata'
  //   },
  //   {
  //     id: '5',
  //     date: '778899',
  //     invoiceNumber: '223344',
  //     invoiceAmount: '50000',
  //     type: 'Completed',
  //     remarks: 'Bangalore'
  //   },
  //   {
  //     id: '6',
  //     date: '990011',
  //     invoiceNumber: '554433',
  //     invoiceAmount: '35000',
  //     type: 'In Progress',
  //     remarks:
  //       'Hyderabad xerctvbyunhjimk,jntfvrcsexcdr6tfv7bgyiunhiojukyjtrhchr6t7vyukbnr6ct7vyygifbdjjdfgsdfgehgnfvdncirroezdfvncoirsdfvnierizsdkl'
  //   }
  // ]
  return (
    <div>
      {invoiceHistoryDataIsSuccess &&
        data?.map(item =>
          item.sent ? (
            <VendorMsg message={item.invoicehistory.remarks} time={item.forwardRevertDate} key={item.id} />
          ) : (
            <EicMsg message={item.invoicehistory.remarks} time={item.forwardRevertDate} key={item.id} />
          )
        )}
    </div>
  )
}

export default RemarksList
