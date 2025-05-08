import { useHttp } from '@/hooks/useHttp';

const SubmittedReports = () => {
    const {getReq} = useHttp();
    const token = sessionStorage.getItem('token');
    let response = null;
    const submittedReportData = async () => {
        try {
            response = await getReq('api/v2/user/Contribution', token);
            // console.log("report table:", response.data);
    
            // if (response.success)
            //     setSubmittedReports(response.data);
          } catch (error) {
            console.error('Failed to fetch user submitted reports:', error);
          }

          return response;
    }
  return {submittedReportData}
}

export default SubmittedReports