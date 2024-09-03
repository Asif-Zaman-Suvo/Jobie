import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

type Callback<T> = (
  supabaseAccessToken: string | null | undefined,
  options: any,
  args: any[]
) => Promise<T>;

type UseFetchResult<T> = {
  fetchFuction: (...args: any[]) => Promise<void>;
  data: T | undefined;
  loading: boolean | null;
  error: any | null;
};

const useFetch = <T,>(
  callback: Callback<T>,
  options = {}
): UseFetchResult<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<any | null>(null);

  const { session } = useSession();

  const fetchFuction = async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const supabaseAccessToken: string | null | undefined =
        await session?.getToken({
          template: "supabase",
        });

      const response = await callback(supabaseAccessToken, options, args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { fetchFuction, data, loading, error };
};

export default useFetch;
