// montar botao de loagout

import React from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

const HandleLogout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    return (
        <button
         className="px-4 py-2 m-3 font-semibold text-blue-700 bg-transparent border border-blue-500 border-none rounded hover:bg-blue-500 hover:text-white hover:border-transparent" 
         onClick={handleLogout}
         
         >    
         <span className="pi pi-sign-out"></span>
            Sair
        </button>
    );

};

export default HandleLogout;
