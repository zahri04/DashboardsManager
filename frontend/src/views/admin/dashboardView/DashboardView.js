import { useParams, Redirect } from "react-router-dom";
import AxiosInstance from "Axios.js";
import { useEffect, useState } from "react";

const DashboardView = () => {
  const { id } = useParams();
  const [iframeUrl, setIframeUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      return;
    }

    const fetchDashboard = async () => {
      try {
        const response = await AxiosInstance.get(`/metabase/dashboard/${id}`);
        if (response?.data?.iframeSrc) {
          setIframeUrl(response.data.iframeSrc);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setError(true);
      }
    };

    fetchDashboard();
  }, [id]);

  if (error) {
    return (
      <div className="p-6 text-red-600 bg-red-100 border border-red-400 rounded">
        Dashboard not found or failed to load.
      </div>
    );
  }

  return (
    <div className="border-2 sm:px-6 lg:px-4">
      {iframeUrl ? (
        <iframe
          title="Metabase Dashboard"
          src={iframeUrl}
          height="1000px"
          width="100%"
          allowTransparency="true"
          frameBorder="0"
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default DashboardView;
