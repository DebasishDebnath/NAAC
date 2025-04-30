import DraftsTable from '@/components/Drafts/DraftsTable'
import React, { useEffect, useState } from 'react'
import {FetchJournals} from '@/Apis/Drafts/FetchJournals';
const Drafts = () => {
  const [draftData, setDraftData] = useState([])
 const {fetchJournals} = FetchJournals()
  // console.log(accessToken)
  useEffect(() => {
    const draftData = async ()=>{
      try {
        const response = await fetchJournals()
        setDraftData(response)
        console.log(response)
      } catch (error) {
        console.log("Error fetching Draft Data!!", error)
      }
    }
    draftData()
  }, [])


  return (
    <div >
      <DraftsTable draftData={draftData} />
    </div>
  )
}

export default Drafts
