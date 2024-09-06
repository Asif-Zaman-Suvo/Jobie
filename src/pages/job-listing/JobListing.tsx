import { getAllJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard/JobCard";
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

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="green" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobsData && jobsData?.length
            ? jobsData?.map((job) => {
                return <JobCard key={job?.id} job={job} />;
              })
            : "No Jobs Found"}
        </div>
      )}
    </div>
  );
};

export default JobListing;
