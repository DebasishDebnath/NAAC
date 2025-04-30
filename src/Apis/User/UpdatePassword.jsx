import { useHttp } from '@/hooks/useHttp';
import React from 'react'

const UseUserUpdatePassword = () => {
    const { patchReq } = useHttp();
    const token = sessionStorage.getItem('token');

    const updatePassword = async (data) => {
          const response = await patchReq(`api/v2/user/updatePassword`, token, data);
        //   console.log("Password Update Response:", response);
          return response;
      };
    
      return { updatePassword };
}

export default UseUserUpdatePassword