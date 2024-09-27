import supabaseClient from "@/utils/supabase";

interface IJobsData {
  location: string;
  company_id: number;
  searchQuery: string;
}

export async function getAllJobs(
  token: any,
  { location, company_id, searchQuery }: IJobsData
) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),saved: saved_job(id)");

  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }
  const { data, error } = await query;
  if (error) {
    console.error("error getting jobs", error);
    return null;
  }

  return data;
}

export async function saveJob(
  token: any,
  { alreadySaved }: any,
  saveData: any
) {
  console.log(saveData, "save");
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_job")
      .delete()
      .eq("job_id", saveData?.job_id);
    if (deleteError) {
      console.error("error deleting saved jobs", deleteError);
      return null;
    }

    console.log(data, "data");
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_job")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("error fetching jobs", insertError);
      return null;
    }

    console.log(data);
  }
}
