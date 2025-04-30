import { useHttp } from '@/hooks/useHttp';
import React from 'react'

const useFinalSubmit = () => {
    const { postReq } = useHttp();
    const token = sessionStorage.getItem('token');

    const  finalSubmit= async () => {
          const response = await postReq(`api/v2/user/finalsubmit`, token,{});
        //   console.log("Password Update Response:", response);
          return response;
      };
    
      return { finalSubmit };
}

export default useFinalSubmit