import React from 'react'
import VendorMsg from './VendorMsg'
import EicMsg from './EicMsg'

const RemarksList = () => {
  const data = [
    {
      id: '1',
      date: '123456',
      invoiceNumber: '789012',
      invoiceAmount: '25000',
      type: 'Pending',
      remarks: 'Delhi'
    },
    {
      id: '2',
      date: '654321',
      invoiceNumber: '345678',
      invoiceAmount: '30000',
      type: 'Completed',
      remarks: 'Mumbai'
    },
    {
      id: '3',
      date: '112233',
      invoiceNumber: '998877',
      invoiceAmount: '15000',
      type: 'In Progress',
      remarks: 'Chennai'
    },
    {
      id: '4',
      date: '445566',
      invoiceNumber: '776655',
      invoiceAmount: '40000',
      type: 'Pending',
      remarks: 'Kolkata'
    },
    {
      id: '5',
      date: '778899',
      invoiceNumber: '223344',
      invoiceAmount: '50000',
      type: 'Completed',
      remarks: 'Bangalore'
    },
    {
      id: '6',
      date: '990011',
      invoiceNumber: '554433',
      invoiceAmount: '35000',
      type: 'In Progress',
      remarks:
        'Hyderabad xerctvbyunhjimk,jntfvrcsexcdr6tfv7bgyiunhiojukyjtrhchr6t7vyukbnr6ct7vyygifbdjjdfgsdfgehgnfvdncirroezdfvncoirsdfvnierizsdkl'
    }
  ]
  return (
    <div>
      {data.map(item =>
        item.id % 2 == 0 ? (
          <VendorMsg message={item.remarks} time={item.invoiceAmount} />
        ) : (
          <EicMsg message={item.remarks} time={item.invoiceAmount} />
        )
      )}
    </div>
  )
}

export default RemarksList
