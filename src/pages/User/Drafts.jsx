import DraftsTable from '@/components/Drafts/DraftsTable'
import React, { useEffect, useState } from 'react'
import { useHttp } from '@/hooks/useHttp'

const Drafts = () => {
  const [draftData, setDraftData] = useState([])
  const { getReq } = useHttp();
  const accessToken = sessionStorage.getItem("token");
  // console.log(accessToken)
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const json = await getReq(`api/v2/user/tempContribution`, accessToken);
        setDraftData(json?.data)
        console.log(json?.data)
      } catch (error) {
        console.log("Error fetching journal publication!", error);
      }
    }
    fetchJournals()
  }, [])


  return (
    <div >
      <DraftsTable draftData={draftData} />
    </div>
  )
}

export default Drafts
