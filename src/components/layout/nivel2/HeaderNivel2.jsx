import { Menubar } from "primereact/menubar";
import PropTypes from "prop-types";
import HandleLogout from "../../buttons/HandleLogout";


export default function Header() {

  return (
    <Menubar
      className="p-shadow-2"
      start={
        <div className="flex align-items-center">
          
          <h2 className="ml-2 text-xl font-bold text-blue-600">Ciclo Verde</h2>
          <HandleLogout />
        </div>
      }
    />
  );
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
