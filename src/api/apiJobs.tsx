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
