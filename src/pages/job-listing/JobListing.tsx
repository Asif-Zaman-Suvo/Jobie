import { getAllJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  const { isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  // State for location
  const [location, setLocation] = useState("");

  // State for company_id
  const [company_id, setCompany_id] = useState("");
  const {
    fetchFuction: fnJobs,
    data: jobsData,
    loading: loadingJobs,
  } = useFetch(getAllJobs, { location, searchQuery, company_id });

  console.log(jobsData, "jobsData");

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, searchQuery, location, company_id]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="green" />;
  }

  return <div>JobListing</div>;
};

export default JobListing;
