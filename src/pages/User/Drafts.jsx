import DraftsTable from '@/components/Drafts/DraftsTable'
import React, { useEffect } from 'react'
import { useHttp } from '@/hooks/useHttp'

const Drafts = () => {
  const { getReq } = useHttp();
  const accessToken = sessionStorage.getItem("token");
  // console.log(accessToken)
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const json = await getReq(`api/v2/user/tempContribution`, accessToken);
        console.log(json)
      } catch (error) {
        console.log("Error fetching journal publication!", error);
      }
    }
    fetchJournals()
  }, [])


  return (
    <div >
      <DraftsTable />
    </div>
  )
}

export default Drafts
