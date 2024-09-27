import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { saveJob } from "@/api/apiJobs";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const {
    fetchFuction: fnSavedJobs,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });
  const { user } = useUser();

  const handleSavedJob = async () => {
    await fnSavedJobs({
      user_id: user?.id,
      job_id: job?.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between bold">
          {job?.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job?.company && <img src={job?.company?.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job?.location}
          </div>
        </div>
        <hr />
        <div>
          {job?.description.substring(0, job?.description?.indexOf("."))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`job/${job?.id}`} className="flex-1">
          <Button variant={"secondary"} className="w-full">
            View Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant={"outline"}
            className="w-15"
            onClick={handleSavedJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
