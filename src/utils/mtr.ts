import {supabase} from "../services/supabase";

export const fetchMtrs = async () => {
    const { data } = await supabase.from("base_request").select("*");
    return data||[];
};