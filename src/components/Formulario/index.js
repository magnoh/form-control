import "./Formulario.css";
import CampoTexto from "../CampoTexto";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "react-toastify/dist/ReactToastify.css";
import "primeicons/primeicons.css";
import { useReport } from "../../hooks/use-reports";
import React, { useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Formulario = () => {
  const { formValues, setFormValues, handleChangeValues } = useReport();
  const toast = useRef(null);

  const transformData = () => {
    return {
      destinacao: formValues.destinacao.destinacao,
      responsavel: formValues.responsavel.responsavel.toUpperCase(),
      data_entrada: formatDate(formValues.dataEntrada),
      convenio: formValues.convenio.convenio.toString(),
      grupo: formValues.grupo.toUpperCase(),
      layout: formValues.layout.layout,
      solicitante: formValues.solicitante.toUpperCase(),
      robo: formValues.robo.robo,
      quantidade: formValues.quantidade.toString().toUpperCase(),
      margem_pma: formValues.margemPma.margemPma || null,
      higienizado: formValues.higienizado.higienizado || null,
      origem: formValues.origem.origem,
      nome_lote: formValues.nomeLote.toUpperCase(),
      dados_bancarios: formValues.dadosBancarios.dadosBancarios,
      observacao: formValues.observacao.toUpperCase(),
      data_inativacao: formValues.inativacao
        ? formatDate(formValues.inativacao)
        : null,
      status_base: formValues.statusBase.statusBase,
      variavel: formValues.variavel.variavel,
      taxa_entrega: formValues.taxaEntrega.toString().toUpperCase(),
      valor: formValues.valor.toString().toUpperCase(),
      texto: formValues.texto.toUpperCase(),
    };
  };

  const formatDate = (datas) => {
    const date = new Date(datas);

    if (isNaN(date.getTime())) {
      return null;
    }

    return date.toISOString().split("T")[0];
  };

  const envioFormulario = async (e) => {
    e.preventDefault();
    const confirmSubmission = async () => {
      const today = new Date().toISOString().split("T")[0];
      const dataEntrada = formatDate(formValues.dataEntrada);
      const dataInativacao = formValues.inativacao 
        ? formatDate(formValues.inativacao)
        : null;
  
      const camposObrigatorios = [
        "responsavel",
        "dataEntrada",
        "convenio",
        "grupo",
        "robo",
        "layout",
        "solicitante",
        "quantidade",
        "origem",
        "nomeLote",
        "dadosBancarios",
        "statusBase",
      ];

      const camposObrigatorioInfoblip = [
        "variavel",
        "taxaEntrega",
        "valor",
        "texto",
      ];

      for (const campo of camposObrigatorios) {
        if (!formValues[campo]) {
          toast.current.show({
            severity: "info",
            summary: `O campo ${campo} não pode estar vazio!`,
            life: 3000,
          });
          return;
        }
      }

      if (formValues.destinacao.destinacao === "INFOBLIP") {
        for (const campo of camposObrigatorioInfoblip) {
          if (!formValues[campo]) {
            toast.current.show({
              severity: "info",
              summary: `O campo ${campo} não pode estar vazio!`,
              life: 3000,
            });
            return;
          }
        }
      }

      if (dataEntrada > today) {
        toast.current.show({
          severity: "info",
          summary: "A data de entrada deve ser a data do dia!",
          life: 3000,
        });
        return;
      }
      
      if (dataInativacao && dataInativacao < dataEntrada) {
        toast.current.show({
          severity: "info",
          summary:
            "A data de inativação não pode ser antes da data de entrada!",
          life: 3000,
        });
        return;
      }

      try {
        const data = transformData();

        const response = await fetch(
          `${process.env.REACT_APP_API}/api/relatorios`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.status === 201) {
          toast.current.show({
            severity: "success",
            summary: "Formulário enviado com sucesso!",
            life: 3000,
          });
          setFormValues({
            destinacao: "",
            responsavel: "",
            dataEntrada: "",
            convenio: "",
            grupo: "",
            robo: "",
            layout: "",
            solicitante: "",
            quantidade: "",
            margemPma: "",
            higienizado: "",
            origem: "",
            nomeLote: "",
            dadosBancarios: "",
            observacao: "",
            inativacao: "",
            statusBase: "",
            variavel: "",
            taxaEntrega: "",
            valor: "",
            texto: "",
          });
        } else {
          toast.current.show({
            severity: "danger",
            summary: "Erro ao enviar o formulário.",
            life: 3000,
          });
        }
      } catch (err) {
        toast.current.show({
          severity: "danger",
          summary: "Erro ao enviar o formulário.",
          life: 3000,
        });
        console.error(err);
      }
    };

    confirmDialog({
      message: "Confirma o envio do formulario?",
      header: "Confirmação",
      icon: "pi pi-exclamation-triangle",
      accept: confirmSubmission,
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={envioFormulario}>
        <Toast ref={toast} />
        <ConfirmDialog />
        <div className="space-x-6">
          <h2 className="flex flex-1 text-4xl md:text-center justify-center font-semibold text-white">
            <img 
              src=".\images\forms.png" 
              alt="">
            </img>
            Controle de Bases
            </h2>
        </div>
        <CampoTexto
          formValues={formValues}
          handleChangeValues={handleChangeValues}
        />

        <div className="w-[97%] flex justify-end mt-5">
          <Button
            icon="pi pi-send"
            className="m-0 rounded-lg bg-[#04b200] hover:bg-green-600 px-6 py-2 text-sm font-semibold leading-8 text-white hover border-none"
            label="Enviar"
            severity="secondary"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Formulario;
