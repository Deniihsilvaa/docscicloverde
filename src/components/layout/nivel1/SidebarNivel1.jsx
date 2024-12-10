import { Accordion, AccordionTab } from "primereact/accordion";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import PropTypes from "prop-types"; // Importing PropTypes

export default function SidebarNivel1({ isOpen, Isclose }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
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
                label="Registro"
                text
                raised
                onClick={() => handleNavigation("/cadastropessoas")}
              />
              <Button
                label="Extrato de recibo"
                text
                raised
                onClick={() => handleNavigation("/cadastroprodutos")}
              />
            </div>
          </div>
        </AccordionTab>

      </Accordion>
    </div>
  );
}

// PropTypes validation
SidebarNivel1.propTypes = {
  isOpen: PropTypes.any, // isOpen should be a boolean and required
  Isclose: PropTypes.any,
};
