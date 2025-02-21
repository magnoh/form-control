import { useState } from "react";
import { Api } from "../api/api";

export const useReport = (toast) => {
  const [items, setItems] = useState([]);
  
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

  const api = new Api()
  
  const readRelatorio = async () => {
    try {
      const { results, response } = await api.get('relatorios')
      setItems(results);

      if (response.status === 200) {
        console.log("Dados salvo com sucesso");
      }
    } catch (err) {
      console.error(err);
    }
  }

  
  const updateRelatorio = async (data) => {
    if (typeof data.taxa_entrega === 'number') {
       data.taxa_entrega = String(data.taxa_entrega);
    }

    try {
      const response = await api.put(`relatorios/${data.id}`, data)
    
      if (response.status === 204) {
        toast.current.show({
          severity: "success",
          summary: "Relatório atualizado com sucesso!",
          life: 3000,
        });
      } 
    } catch (err) {
      toast.current.show({
        severity: "info",
        summary: "Ocorreu algum erro ao enviar o formulário.",
        life: 3000,
      });
      console.error("Erro ao enviar dados:", err);
    }
  };

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

  return { formValues, setFormValues, handleChangeValues, readRelatorio, updateRelatorio, items, setItems }
}
