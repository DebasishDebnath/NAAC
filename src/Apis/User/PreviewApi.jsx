import { useHttp } from '@/hooks/useHttp';
import React from 'react'

const usePreviewData = () => {
    const { getReq } = useHttp();
    const token = sessionStorage.getItem('token');

    const  previewData= async () => {
          const response = await getReq(`api/v2/user/tempContribution`, token);
        //   console.log("Password Update Response:", response);
          return response;
      };
    
      return { previewData };
}

export default usePreviewData