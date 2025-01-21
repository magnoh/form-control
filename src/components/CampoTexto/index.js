import "./CampoTexto.css";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-green/theme.css";
import { InputNumber } from "primereact/inputnumber";
import convenios from "../../fields/Convenios.json"; // assuming it's a large list
import React, { useState} from "react";
import { AutoComplete } from 'primereact/autocomplete';

const CampoTexto = ({ formValues, handleChangeValues }) => {
  const optionSelectedInfoblip = () => {
    const OPTION_SELECTED = "INFOBLIP";
    const { destinacao } = formValues.destinacao;
    if (destinacao && destinacao === OPTION_SELECTED) {
      return false;
    }
    return true;
  };

  const isDisabled = optionSelectedInfoblip();
  const [filteredConvenios, setFilteredConvenios] = useState([]); 


  const searchConvenios = (event) => {
      const query = event.query.toLowerCase();
      const results = convenios
          .filter((convenio) => 
            convenio.convenio.toLowerCase().includes(query) || false
          )
          .slice(0, 20); 
      setFilteredConvenios(results);
  };


  return (
    <div className="flex flex-row flex-wrap ">
      <div className="w-1/3 mt-10">
        <Dropdown
          className="w-[90%] font-normal rounded-md bg-[#1a1a1e] hover:border-b-green-1000 border-[#f3f3f30c] text-[#fffff5d2]"
          type="text"
          options={[
            { destinacao: "COMERCIAL" },
            { destinacao: "INFOBLIP" },
            { destinacao: "4NET" },
          ]}
          name="destinacao"
          optionLabel="destinacao"
          value={formValues.destinacao}
          onChange={handleChangeValues}
          placeholder="Selecione o destino"
          color="#fffff5d2"
        />
      </div>

      <div className="w-1/3 mt-10">
        <Dropdown
          className="w-[90%] font-normal rounded-md  bg-[#1a1a1e]  hover:border-b-green-1000 border-[#f3f3f30c]"
          type="text"
          options={[
            { responsavel: "BRENDA" },
            { responsavel: "CRIS" },
            { responsavel: "FABIO" },
            { responsavel: "GISELE" },
            { responsavel: "LARA" },
            { responsavel: "LUCAS" },
            { responsavel: "RAPHA" },
            { responsavel: "SIDNEI" },
            { responsavel: "WELL" },
          ]}
          name="responsavel"
          optionLabel="responsavel"
          value={formValues.responsavel}
          onChange={handleChangeValues}
          placeholder="Selecione o Responsável"
        />
      </div>

      <div className="w-1/3 mt-10">
        <Calendar
          className="w-[90%] "
          inputClassName="calendario placeholder-[#fffff5d2] hover:border-b-green-1000 border-[#f3f3f30c]"
          type="date"
          name="dataEntrada"
          value={formValues.dataEntrada}
          onChange={handleChangeValues}
          placeholder="Selecione a data de entrada"
          dateFormat="dd/mm/yy"
          showIcon
          autoComplete="off"
        />
      </div>

      {/* <div className="w-1/3 mt-10">
        <span className="p-float-label">
          <InputText
            className="w-[90%] hover:border-b-green-1000 border-[#f3f3f30c] font-normal text-[#fffff5d2] rounded-md  bg-[#1a1a1e] placeholder-[#fffff5d27a]"
            type="text"
            name="convenio"
            value={formValues.convenio}
            onChange={handleChangeValues}
            placeholder="Digite o nome do convênio"

          />
          <label className="text-[#fffff5d2]" htmlFor="convenio">Convênio</label>
        </span>
      </div> */}

      <div className="w-1/3 mt-10">
        <AutoComplete
          className="w-[90%]"
          inputClassName="hover:border-b-green-1000 border-[#f3f3f30c] text-[#fffff5d2] rounded-md bg-[#1a1a1e]"
          name="convenio"
          value={formValues.convenio}
          suggestions={filteredConvenios}
          completeMethod={searchConvenios}
          field="convenio"
          onChange={(e) => handleChangeValues(e, "convenio")}
          placeholder="Digite o nome do convênio"
          dropdown
        />
      </div>

      <div className="w-1/3 mt-10 ">
        <span className="p-float-label">
          <InputText
            type="text"
            className="w-[90%] font-normal rounded-md bg-[#1a1a1e] text-[#fffff5d2] hover:border-b-green-1000 border-[#f3f3f30c] "
            name="grupo"
            value={formValues.grupo}
            onChange={handleChangeValues}
            placeholder="Digite o endereço do Grupo"
          />
          <label className="text-[#fffff5d2]" htmlFor="grupo">
            Grupo
          </label>
        </span>
      </div>

      <div className="w-1/3 mt-10">
        <Dropdown
          className="w-[90%] font-normal rounded-md bg-[#1a1a1e] text-[#fffff5d2] hover:border-b-green-1000 border-[#f3f3f30c]"
          type="text"
          options={[
            { layout: "CARTÃO" },
            { layout: "CONSIGNA" },
            { layout: "PADRÃO" },
          ]}
          name="layout"
          optionLabel="layout"
          value={formValues.layout}
          onChange={handleChangeValues}
          placeholder="Selecione o tipo do Layout"
        />
      </div>

      <div className="w-1/3 mt-10">
        <span className="p-float-label">
          <InputText
            className="w-[90%] font-normal  rounded-md  bg-[#1a1a1e] text-[#fffff5d2] hover:border-b-green-1000 border-[#f3f3f30c]"
            type="text"
            name="solicitante"
            value={formValues.solicitante}
            onChange={handleChangeValues}
            placeholder="Digite o endereço do Solicitante"
          />
          <label className="text-[#fffff5d2]" htmlFor="solicitante">
            Solicitante
          </label>
        </span>
      </div>

      <div className="w-1/3 mt-10">
        <Dropdown
          className="w-[90%] hover:border-b-green-1000 border-[#f3f3f30c] font-normal rounded-md  bg-[#1a1a1e]"
          type="text"
          options={[{ robo: "SIM" }, { robo: "NÃO" }]}
          name="robo"
          optionLabel="robo"
          value={formValues.robo}
          onChange={handleChangeValues}
          placeholder="Defina se será robo"
        />
      </div>

      <div className="w-1/3 mt-10 justify-content-center">
        <span className="p-float-label">
          <InputNumber
            className="w-[90%] font-normal "
            inputClassName=" border border-[#f3f3f30c] hover:border-b-green-1000"
            name="quantidade"
            value={formValues.quantidade}
            onChange={(e) => handleChangeValues(e, "quantidade")}
            placeholder="Digite a quantidade de leads"
            showButtons
            min={0}
            max={1000000}
            useGrouping={false}
          />
          <label className="text-[#fffff5d2]" htmlFor="quantidade">
            Quantidade
          </label>
        </span>
      </div>
      <div className="w-1/3 mt-10">
        <Dropdown
          className="w-[90%] hover:border-b-green-1000 border-[#f3f3f30c] font-normal rounded-md bg-[#1a1a1e] text-[#fffff5d2]"
          type="text"
          options={[
            { margemPma: "CELESTE" },
            { margemPma: "DATA FAST" },
            { margemPma: "FVE" },
            { margemPma: "IN100" },
            { margemPma: "MASTER" },
            { margemPma: "MULTICORBAN" },
            { margemPma: "ORÁCULO" },
            { margemPma: "PORTAL" },
            { margemPma: "SHAREPOINT" },
          ]}
          name="margemPma"
          optionLabel="margemPma"
          value={formValues.margemPma}
          onChange={handleChangeValues}
          placeholder="Selecione o local da consulta de margem"
        />
      </div>

      <div className="w-1/3 mt-10">
        <Dropdown
          className="w-[90%] hover:border-b-green-1000 border-[#f3f3f30c] font-normal   rounded-md  bg-[#1a1a1e] text-[#fffff5d2]"
          type="text"
          options={[
            { higienizado: "BB CAP" },
            { higienizado: "CONFIRME" },
            { higienizado: "LEMIT" },
            { higienizado: "ORÁCULO" },
          ]}
          name="higienizado"
          optionLabel="higienizado"
          value={formValues.higienizado}
          onChange={handleChangeValues}
          showClear
          placeholder="Selecione o endereço da higienização"
        />
      </div>

      <div className="w-1/3 mt-10">
        <Dropdown
          className="w-[90%] hover:border-b-green-1000 border-[#f3f3f30c] font-normal   rounded-md  bg-[#1a1a1e] text-[#fffff5d2]"
          type="text"
          options={[
            { origem: "COMERCIAL" },
            { origem: "FORNECEDOR" },
            { origem: "LEGADO" },
            { origem: "ORÁCULO" },
            { origem: "PROMOTIVA" },
            { origem: "PORTAL DO SERVIDOR" },
          ]}
          name="origem"
          optionLabel="origem"
          value={formValues.origem}
          onChange={handleChangeValues}
          placeholder="Selecione o endereço da origem"
        />
      </div>

      <div className="w-1/3 mt-10">
        <span className="p-float-label">
          <InputText
            className="w-[90%] hover:border-b-green-1000 border-[#f3f3f30c] font-normal  rounded-md  bg-[#1a1a1e] text-[#fffff5d2]"
            type="text"
            name="nomeLote"
            value={formValues.nomeLote}
            onChange={handleChangeValues}
            placeholder="Digite o nome do lote"
          />
          <label className="text-[#fffff5d2]" htmlFor="nomeLote">
            Nome do lote
          </label>
        </span>
      </div>

      <div className="w-1/3 mt-10">
        <Dropdown
          className="w-[90%] hover:border-b-green-1000 border-[#f3f3f30c] font-normal   rounded-md  bg-[#1a1a1e] text-[#fffff5d2]"
          type="text"
          options={[{ dadosBancarios: "SIM" }, { dadosBancarios: "NÃO" }]}
          name="dadosBancarios"
          optionLabel="dadosBancarios"
          value={formValues.dadosBancarios}
          onChange={handleChangeValues}
          placeholder="Contêm dados bancarios"
        />
      </div>

      <div className="w-1/3 mt-10">
        <span className="p-float-label">
          <InputText
            className="w-[90%] hover:border-b-green-1000 border-[#f3f3f30c] font-normal rounded-md  bg-[#1a1a1e] text-[#fffff5d2]"
            type="text"
            name="observacao"
            value={formValues.observacao}
            onChange={handleChangeValues}
            placeholder="Exemplo de Base"
          />
          <label className="text-[#fffff5d2]" htmlFor="observacao">
            Observação
          </label>
        </span>
      </div>

      <div className="w-1/3 mt-10">
        <Calendar
          className="w-[90%]"
          inputClassName="calendario placeholder-[#fffff5d2] hover:border-b-green-1000 border-[#f3f3f30c]"
          id="inativacao"
          name="inativacao"
          value={formValues.inativacao}
          onChange={handleChangeValues}
          placeholder="Selecione a data de inativação"
          dateFormat="dd/mm/yy"
          showIcon
          autoComplete="off"
        />
      </div>
      <div className="w-1/3 mt-10">
        <Dropdown
          className="w-[90%] hover:border-b-green-1000 border-[#f3f3f30c] font-normal rounded-md  bg-[#1a1a1e] "
          type="text"
          options={[
            { statusBase: "ATIVA" },
            { statusBase: "EM PAUSA" },
            { statusBase: "INATIVA" },
          ]}
          name="statusBase"
          optionLabel="statusBase"
          value={formValues.statusBase}
          onChange={handleChangeValues}
          placeholder="Selecione o status da base"
        />
      </div>
      <div className="w-1/3 mt-10">
        <Dropdown
          className="w-[90%] hover:border-b-green-1000 border-[#f3f3f30c] font-normal rounded-md bg-[#1a1a1e] placeholder-bg-[#fffff5d2]"
          type="text"
          options={[{ variavel: "SIM" }, { variavel: "NÃO" }]}
          name="variavel"
          optionLabel="variavel"
          value={formValues.variavel}
          onChange={handleChangeValues}
          disabled={isDisabled}
          placeholder="Variavel"
        />
      </div>

      <div className="w-1/3 mt-10 ">
        <span className="p-float-label">
          <InputNumber
            className="w-[90%] "
            inputClassName="font-normal text-[#fffff5d2] hover:border-b-green-1000 border-[#f3f3f30c]"
            inputId="label-taxa"
            name="taxaEntrega"
            value={formValues.taxaEntrega}
            placeholder="Digite a taxa de entrega"
            onChange={(e) => handleChangeValues(e, "taxaEntrega")}
            showButtons
            suffix="%"
            disabled={isDisabled}
          />
          <label className="text-[#fffff5d2]" htmlFor="label-taxa">
            Taxa de Entrega
          </label>
        </span>
      </div>

      <div className="w-1/3 mt-10">
        <span className="p-float-label">
          <InputNumber
            className="w-[90%]"
            inputClassName="hover:border-b-green-1000 border-[#f3f3f30c] font-normal rounded-md "
            inputId="label-valor"
            value={formValues.valor}
            name="valor"
            onChange={(e) => handleChangeValues(e, "valor")}
            showButtons
            mode="currency"
            currency="BRA"
            locale="pt-BR"
            min={0}
            max={1000000}
            format="str"
            disabled={isDisabled}
            placeholder="Digite o valor do lead"
          />
          <label className="text-[#fffff5d2]" htmlFor="label-valor">
            Valor
          </label>
        </span>
      </div>
      <div className="w-1/3 mt-10">
        <span className="p-float-label">
          <InputText
            className="w-[90%] hover:border-b-green-1000 border-[#f3f3f30c] bg-[#1a1a1e] font-normal rounded-md"
            name="texto"
            value={formValues.texto}
            onChange={handleChangeValues}
            placeholder="Digite.."
            showButtons
          />
          <label className="text-[#fffff5d2]" htmlFor="input-texto">
            Texto
          </label>
        </span>
      </div>
    </div>
  );
};

export default CampoTexto;
