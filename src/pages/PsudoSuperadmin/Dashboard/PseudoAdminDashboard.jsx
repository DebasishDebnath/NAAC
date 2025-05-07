import React, { useEffect } from 'react'
import usePreviewDataPseudo from '../../../Apis/PseudoAdmin/PseudoAdminGetAllFiles'; // Import the correct hook

function PseudoAdminDashboard() {
    const { previewDataPseudo } = usePreviewDataPseudo();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await previewDataPseudo();
                console.log("Preview Data:", data);
            } catch (error) {
                console.error("Error fetching preview data:", error);
            }
        };

        fetchData();
    }, []); 

    return (
        <div>PseudoAdminDashboard</div>
    );
}

export default PseudoAdminDashboard;