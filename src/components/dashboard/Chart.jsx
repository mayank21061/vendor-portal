// import * as React from 'react'
// import { BarChart } from '@mui/x-charts' // Adjust this path if necessary
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'

// const valueFormatter = value => `${value}`

// export default function MonthlyBarChart() {
//   const [selectedMonth, setSelectedMonth] = React.useState('Jan 2024')

//   const handleChange = event => {
//     setSelectedMonth(event.target.value)
//   }

//   const filteredData = dataset.filter(data => data.month === selectedMonth)

//   const series = [
//     { dataKey: 'submitted', label: 'Submitted', valueFormatter, gradient: 'linear-gradient(94deg, #2196f3, #64b5f6)' }, // Blue gradient
//     { dataKey: 'eicRejected', label: 'Rejected', valueFormatter, gradient: 'linear-gradient(94deg, #f44336, #ef5350)' }, // Red gradient
//     { dataKey: 'eicApproved', label: 'Approved', valueFormatter, gradient: 'linear-gradient(94deg, #4caf50, #81c784)' }, // Green gradient
//     { dataKey: 'toFinance', label: 'To Finance', valueFormatter, gradient: 'linear-gradient(94deg, #ff4081, #f06292)' }, // Pink gradient
//     { dataKey: 'toPayment', label: 'To Payment', valueFormatter, gradient: 'linear-gradient(94deg, #ff9800, #ffb74d)' }, // Orange gradient
//     { dataKey: 'paid', label: 'Paid', valueFormatter, gradient: 'linear-gradient(94deg, #673ab7, #9575cd)' } // Purple gradient
//   ]

//   const chartSetting = {
//     height: 450,
//     tooltip: true,
//     layout: 'vertical',
//     seriesLayoutBy: 'row',
//     margin: { bottom: 30, top: 100 }
//   }

//   return (
//     <div
//       style={{
//         width: '100%',
//         // background: 'linear-gradient(94deg, #a3c6e8 39%, #b0cdef 60%, #c7e4ff 89%)',
//         padding: '20px',
//         borderRadius: '10px'
//       }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
//         <h2 style={{ margin: '0', color: '#333' }}>Monthly Overview</h2>
//         {/* <FormControl>
//           <Select
//             labelId='month-select-label'
//             id='month-select'
//             value={selectedMonth}
//             onChange={handleChange}
//             style={{ maxWidth: '100px', textAlign: 'left', background: '#ffffff', borderRadius: '4px' }}
//             size='small'
//           >
//             {dataset.map(data => (
//               <MenuItem key={data.month} value={data.month}>
//                 {data.month}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl> */}
//       </div>
//       <BarChart
//         series={[
//           { data: [35, 44, 24, 34] },
//           { data: [51, 6, 49, 30] },
//           { data: [15, 25, 30, 50] },
//           { data: [60, 50, 15, 25] }
//         ]}
//         height={290}
//         xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
//         margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
//       />
//     </div>
//   )
// }
import * as React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts/ChartsAxis'

const chartSetting = {
  width: 1250,
  height: 350
  // sx: {
  //   [`.${axisClasses.left} .${axisClasses.label}`]: {
  //     transform: 'translate(-20px, 0)'
  //   }
  // }
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
        { dataKey: 'eicApproved', label: 'Approved', valueFormatter },
        { dataKey: 'submitted', label: 'Pending', valueFormatter },
        { dataKey: 'paid', label: 'Completed', valueFormatter },
        { dataKey: 'eicRejected', label: 'Rejected', valueFormatter }
      ]}
      {...chartSetting}
    />
  )
}
