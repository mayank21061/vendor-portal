import * as React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts/ChartsAxis'

const chartSetting = {
  height: 350,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)'
    }
  }
}

const dataset = [
  {
    month: 'Jan 2024',
    submitted: 59,
    eicRejected: 57,
    eicApproved: 86,
    toFinance: 21,
    toPayment: 18,
    paid: 15
  },
  {
    month: 'Feb 2024',
    submitted: 50,
    eicRejected: 52,
    eicApproved: 78,
    toFinance: 28,
    toPayment: 25,
    paid: 20
  },
  {
    month: 'Mar 2024',
    submitted: 47,
    eicRejected: 53,
    eicApproved: 16,
    toFinance: 41,
    toPayment: 37,
    paid: 30
  },
  {
    month: 'Apr 2024',
    submitted: 54,
    eicRejected: 56,
    eicApproved: 92,
    toFinance: 73,
    toPayment: 65,
    paid: 60
  },
  {
    month: 'May 2024',
    submitted: 57,
    eicRejected: 69,
    eicApproved: 92,
    toFinance: 99,
    toPayment: 90,
    paid: 85
  },
  {
    month: 'Jun 2024',
    submitted: 60,
    eicRejected: 63,
    eicApproved: 19,
    toFinance: 14,
    toPayment: 30,
    paid: 25
  },
  {
    month: 'Jul 2024',
    submitted: 59,
    eicRejected: 60,
    eicApproved: 15,
    toFinance: 319,
    toPayment: 30,
    paid: 29
  },
  {
    month: 'Aug 2024',
    submitted: 65,
    eicRejected: 60,
    eicApproved: 96,
    toFinance: 89,
    toPayment: 80,
    paid: 90
  },
  {
    month: 'Sep 2024',
    submitted: 51,
    eicRejected: 51,
    eicApproved: 95,
    toFinance: 91,
    toPayment: 90,
    paid: 80
  },
  {
    month: 'Oct 2024',
    submitted: 60,
    eicRejected: 65,
    eicApproved: 97,
    toFinance: 55,
    toPayment: 50,
    paid: 45
  },
  {
    month: 'Nov 2024',
    submitted: 67,
    eicRejected: 64,
    eicApproved: 76,
    toFinance: 48,
    toPayment: 45,
    paid: 40
  },
  {
    month: 'Dec 2024',
    submitted: 61,
    eicRejected: 70,
    eicApproved: 93,
    toFinance: 25,
    toPayment: 20,
    paid: 15
  }
]

const valueFormatter = value => `${value}`

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'eicApproved', label: 'Approved', valueFormatter, color: '#F89880' },
        { dataKey: 'submitted', label: 'Pending', valueFormatter, color: '#D3D3D3' },
        { dataKey: 'paid', label: 'Completed', valueFormatter, color: '#48BF40' },
        { dataKey: 'eicRejected', label: 'Rejected', valueFormatter, color: '#FF2E2E' }
      ]}
      {...chartSetting}
    />
  )
}
