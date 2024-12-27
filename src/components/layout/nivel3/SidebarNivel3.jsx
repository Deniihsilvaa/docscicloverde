import { Accordion, AccordionTab } from "primereact/accordion";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import PropTypes from "prop-types"; // Importing PropTypes

export default function Sidebar({ isOpen, Isclose }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate.apply(this, [`/admin/${path}`]);
    Isclose();
  };

  return (
    <div
      className={`sidebar bg-slate-900 text-white transition-all duration-500 ${
        isOpen ? "w-60" : "w-0 overflow-hidden"
      }`}
    >
      <Accordion activeIndex={0}>
        <AccordionTab header="Cadastros">
          <div className="m-0">
            <div className="grid grid-cols-1 gap-4">

              <Button
                label="Cadastro de Usuario"
                text
                raised
                onClick={() => handleNavigation("UserRegistrationForm")}
              />
              <Button
                label="Produtos"
                text
                raised
                onClick={() => handleNavigation("cadastroprodutos")}
              />
            </div>
          </div>
        </AccordionTab>

        <AccordionTab header="Registros">
          <div className="m-0 ">
            <div className="grid grid-cols-1 gap-4">
              <Button
                label="NFE"
                text
                raised
                onClick={() => handleNavigation("nfe")}
              />
              <Button
                label="MTR"
                text
                raised
                onClick={() => handleNavigation("mtr")}
              />
              <Button
               label="Request" 
               text
                raised 
                onClick={() => handleNavigation("request")}
                />
            </div>
          </div>
        </AccordionTab>
        <AccordionTab header="Operacional">
          <div className="m-0 ">
            <div className="grid grid-cols-1 gap-4">
              <Button
                label="Registro de colaboradores"
                text
                raised
                onClick={() => handleNavigation("registro")}
              />
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  );
}

// PropTypes validation
Sidebar.propTypes = {
  isOpen: PropTypes.any, // isOpen should be a boolean and required
  Isclose: PropTypes.any,
};
