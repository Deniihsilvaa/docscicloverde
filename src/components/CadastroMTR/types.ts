 // src/components/CadastroMTR/index.ts
 import { supabase } from "../../services/supabase";

 export async function fetchTransportadoras() {
   const { data, error } = await supabase.from("baseTransport").select("id, name");

   if (error) {
     console.error("Error fetching transportadoras:", error);
     return [];
   }
   const transportadoras = data.map((transportadora) => ({
     code: transportadora.id,
     value: transportadora.name,
   }));
   return transportadoras;
 }

 