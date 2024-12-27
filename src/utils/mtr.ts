import {supabase} from "../services/supabase";

export const fetchMtrs = async () => {
    const { data } = await supabase.from("baseMtr").select("*");
    return data||[];
};