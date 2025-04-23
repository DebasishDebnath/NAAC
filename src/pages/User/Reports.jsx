import ReportTable from '@/components/Reports/ReportTable'
import React from 'react'

const Reports = () => {
  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-4">Submissions</h1>
      <ReportTable />
    </div>
  )
}

export default Reports
