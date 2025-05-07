import { useHttp } from '@/hooks/useHttp';
import React from 'react'

const usePreviewDataPseudo = () => {
    const { getReq } = useHttp();
    const token = sessionStorage.getItem('token');

    const  previewDataPseudo= async () => {
          const response = await getReq(`api/v2/pseudoUser/getContribution`, token);
        //   console.log("Password Update Response:", response);
          return response;
      };
    
      return { previewDataPseudo };
}

export default usePreviewDataPseudo