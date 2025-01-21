import { useState } from "react";

export const useReport = () => {
  const [formValues, setFormValues] = useState({
    destinacao: "",
    responsavel: "",
    dataEntrada: "",
    convenio: "",
    grupo: "",
    robo: "",
    layout: "",
    solicitante: "",
    quantidade: 0,
    margemPma: "",
    higienizado: "",
    origem: "",
    nomeLote: "",
    dadosBancarios: "",
    observacao: "",
    inativacao: "",
    statusBase: "",
    variavel: "",
    taxaEntrega: 0,
    valor: 0,
    texto: "",
  });

  const handleChangeValues = (e, fieldName = null) => {
    if (fieldName) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [fieldName]: e.value,
      }));
    } else {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  }

  return { formValues, setFormValues, handleChangeValues }
}
