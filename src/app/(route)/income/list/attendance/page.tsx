
import React from 'react'
import AttendanceChartContainer from '../../components/Dashboard/AttendanceChartContainer'
import PieChartContainer from '../../components/Dashboard/PieChartContainer'
import Donat from '../../components/Dashboard/Donatchart' 

export default function page() {
  return (
    <div className='flex flex-col gap-4'>
    <div><AttendanceChartContainer/></div>
    <div><PieChartContainer/></div>
    <div><Donat/></div>
    </div>
  )
}
