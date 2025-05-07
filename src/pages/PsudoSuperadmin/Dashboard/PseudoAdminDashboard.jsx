import React, { useEffect } from 'react'
import usePreviewDataPseudo from '../../../Apis/PseudoAdmin/PseudoAdminGetAllFiles'; // Import the correct hook

function PseudoAdminDashboard() {
    const { previewDataPseudo } = usePreviewDataPseudo(); // Use the imported hook

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
    }, []); // Add previewDataPseudo to the dependency array

    return (
        <div>PseudoAdminDashboard</div>
    );
}

export default PseudoAdminDashboard;