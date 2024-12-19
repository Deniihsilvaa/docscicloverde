 // src/components/CadastroMTR/index.ts
 import { supabase } from "../../services/supabase";

 export async function fetchTransportadoras() {
   const { data, error } = await supabase.from("baseTransport").select("id, name");

   if (error) {
     console.error("Error fetching transportadoras:", error);
     return [];
   }

   return data.map((t) => ({ code: t.id, value: t.name })); 
 }
 