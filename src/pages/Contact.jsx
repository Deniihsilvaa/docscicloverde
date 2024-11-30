import { Card } from "primereact/card";
import { Button } from "primereact/button";

const Contact = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card
        title="Entre em Contato Conosco"
        style={{ width: "90%", maxWidth: "600px" }}
        className="p-5 shadow-2"
      >
        <p className="mb-4 text-lg">
          Estamos aqui para ajudar! Preencha o formulário abaixo ou entre em
          contato pelos nossos canais:
        </p>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Seu Nome"
            className="w-full p-inputtext"
          />
          <input
            type="email"
            placeholder="Seu Email"
            className="w-full p-inputtext"
          />
          <textarea
            placeholder="Sua Mensagem"
            rows="4"
            className="w-full p-inputtextarea"
          ></textarea>
          <Button
            label="Enviar Mensagem"
            icon="pi pi-send"
            className="w-full p-button-rounded p-button-primary"
          />
        </div>
      </Card>
    </div>
  );
};

export default Contact;
