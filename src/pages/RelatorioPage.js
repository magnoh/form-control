import React, { useState, useEffect, useRef, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { IconField } from "primereact/iconfield";
import { Tag } from "primereact/tag";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode } from "primereact/api";
import "react-toastify/dist/ReactToastify.css";
import "./RelatorioPage.css";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Tooltip } from 'primereact/tooltip';


export default function RelatorioPage() {
  const [items, setItems] = useState([]);
  const toast = useRef(null);
  const dt = useRef(null);
  const [totalQuantidade, setTotalQuantidade] = useState(0);

  const [statuses] = useState([
    { label: "ATIVA", value: "ATIVA" },
    { label: "EM PAUSA", value: "EM PAUSA" },
    { label: "INATIVA", value: "INATIVA" }
  ]);
  
  const columns = [
    
    { field: "destinacao", header: "Destino" },
    { field: "responsavel", header: "Responsavel" },
    { field: "data_entrada", header: "Data de Entrada" },
    { field: "convenio", header: "Convenio" },
    { field: "grupo", header: "Grupo" },
    { field: "layout", header: "Layout" },
    { field: "solicitante", header: "Solicitante" },
    { field: "robo", header: "Robo" },
    { field: "quantidade", header: "Quantidade" },
    { field: "margem_pma", header: "Margem Pma" },
    { field: "higienizado", header: "Higienizado" },
    { field: "origem", header: "Origem" },
    { field: "nome_lote", header: "Nome Lote" },
    { field: "dados_bancarios", header: "Dados Bancarios" },
    { field: "observacao", header: "Observacao" },
    { field: "data_inativacao", header: "Data da Inativacao" },
    { field: "status_base", header: "Status da Base" },
    { field: "variavel", header: "Variavel" },
    { field: "taxa_entrega", header: "Taxa da Entrega" },
    { field: "valor", header: "Valor" },
    { field: "texto", header: "Texto" },
    { field: "data_criacao", header: "Data Criação" },
  ];

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    destinacao: { value: null, matchMode: FilterMatchMode.CONTAINS },
    responsavel: { value: null, matchMode: FilterMatchMode.CONTAINS },
    data_entrada: { value: null, matchMode: FilterMatchMode.CONTAINS },
    convenio: { value: null, matchMode: FilterMatchMode.CONTAINS },
    grupo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    layout: { value: null, matchMode: FilterMatchMode.CONTAINS },
    solicitante: { value: null, matchMode: FilterMatchMode.CONTAINS },
    robo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    quantidade: { value: null, matchMode: FilterMatchMode.CONTAINS },
    margem_pma: { value: null, matchMode: FilterMatchMode.CONTAINS },
    higienizado: { value: null, matchMode: FilterMatchMode.CONTAINS },
    origem: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nome_lote: { value: null, matchMode: FilterMatchMode.CONTAINS },
    dados_bancarios: { value: null, matchMode: FilterMatchMode.CONTAINS },
    observacao: { value: null, matchMode: FilterMatchMode.CONTAINS },
    data_inativacao: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status_base: { value: null, matchMode: FilterMatchMode.EQUALS },
    variavel: { value: null, matchMode: FilterMatchMode.CONTAINS },
    taxa_entrega: { value: null, matchMode: FilterMatchMode.CONTAINS },
    valor: { value: null, matchMode: FilterMatchMode.CONTAINS },
    texto: { value: null, matchMode: FilterMatchMode.CONTAINS },
    
  });

  useEffect(() => {
    const readRelatorio = async () => {
      
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/relatorios`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const results = await response.json();

        setItems(results);
        if (response.status === 200) {
          console.log("Dados salvo com sucesso");
        }
      } catch (err) {
        console.error(err);
      }
    };

    readRelatorio();
  }, []);

  const updateRelatorio = async (data) => {
    if (typeof data.taxa_entrega === 'number') {
      data.taxa_entrega = String(data.taxa_entrega); 
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/relatorios/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 204) {
        toast.current.show({
          severity: "success",
          summary: "Relatório atualizado com sucesso!",
          life: 3000,
        });
      } else {
        const errorText = await response.text();
        toast.current.show({
          severity: "danger",
          summary: "Erro ao enviar o formulário.",
          detail: errorText,
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

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const calculateTotalQuantity = useCallback(() => {
    let filteredItems = [...items];
  
    // Aplicando filtros globais
    if (filters.global.value) {
      filteredItems = filteredItems.filter((item) =>
        Object.keys(item).some((key) =>
          String(item[key]).toLowerCase().includes(filters.global.value.toLowerCase())
        )
      );
    }
  
    // Aplicando filtros específicos (exemplo: quantidade)
    if (filters.quantidade.value) {
      filteredItems = filteredItems.filter((item) =>
        String(item.quantidade).includes(filters.quantidade.value)
      );
    }
  
    // Somando as quantidades
    const total = filteredItems.reduce((acc, item) => {
      const quantidade = parseFloat(item.quantidade) || 0; // Garantir que quantidade seja um número
      return acc + quantidade;
    }, 0);
  
    setTotalQuantidade(total);
  }, [filters, items]);

  useEffect(() => {
    // Calcular a quantidade total sempre que os filtros ou os itens mudarem
    calculateTotalQuantity();
  }, [filters, items, calculateTotalQuantity]); // Recalcular quando filters ou items mudarem


  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const formatDate = (datas) => {
    const date = new Date(datas);

    if (isNaN(date.getTime())) {
      return null;
    }

    return date.toISOString().split("T")[0];
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('int');
  };

  const onRowEditComplete = (e) => {
    let _products = [...items];
    let { newData, index } = e;
  
    newData.data_inativacao = newData.data_inativacao ? formatDate(newData.data_inativacao): null;
    
    _products[index] = newData;
    setItems(_products);
    updateRelatorio(newData);
  };

  const getSeverity = (value) => {
    switch (value) {
      case "ATIVA":
        return "success";

      case "EM PAUSA":
        return "warning";

      case "INATIVA":
        return "danger";

      default:
        return null;
    }
  };

  

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        style={{ maxWidth: '12rem' }}
        options={statuses}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Selecione o status."
        itemTemplate={(option) => {
          return <Tag value={option.label} severity={getSeverity(option.label)}></Tag>;
        }}
      />
    );
  };

  const priceEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        defaultChecked
        suffix="%"
        inputId="percent"
      />
    );
  };
  
  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Selecione o status"
        className="p-column-filter"
        showClear
        style={{ minWidth: '12rem' }}
        showFilterMenu={false}
      />
    );
  };

  

  const inativacaoEditor = (options) => {
    return (
      <Calendar
        inputClassName="calendario placeholder-[#fffff5d2] hover:border-b-green-1000 border-[#f3f3f30c]"
        value={options.value ? new Date(options.value) : null}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Selecione a data"
        dateFormat="dd/mm/yy"
        showIcon
        autoComplete="off"
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status_base}
        severity={getSeverity(rowData.status_base)}
      />
    );
  };

  const renderTooltipContent = (rowData, field) => {
    return (
      <>
        <span
          className="ellipsis-text"
          data-pr-tooltip={rowData[field]}
          data-pr-position="top"
          data-pr-tooltip-options={`tooltipClassName: 'custom-tooltip'`} 
        >
          {rowData[field]}
        </span>
        
        <Tooltip target=".ellipsis-text" />
      </>
    );
  };

  
  
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap justify-between items-center space-x-2">
        <MultiSelect
          value={visibleColumns}
          options={columns}
          optionLabel="header"
          onChange={onColumnToggle}
          className="w-full sm:w-1/4 md:w-1/6 rounded-md border hover:border-b-green-1000 border-[#303035]"
          display="chip"
          placeholder="Select Columns"
        />
  
        <IconField iconPosition="left" className="w-full sm:w-3/4 md:w-4/12  flex justify-content-end">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Digite para buscar..."
            className="w-full rounded-md bg-[#1a1a1e] hover:border-b-green-1000 text-white border-[#303035]"
          />
        </IconField>
        
        <h3 className="qtd-title">Quantidade de Mailings: {formatCurrency(totalQuantidade)}</h3>

        <Button label="Exportar" icon="pi pi-upload" onClick={() => dt.current.exportCSV()} />
      </div>
    );
  };
  
  const header = renderHeader();

  return (
    <div className="relatorio-page-container place-items-center p-0">
      <Card className="card-relatorio border border-[#f3f3f30c] bg-[#1a1a1e]">
        <Toast ref={toast} />
          <h2 className="flex text-4xl md:text-center justify-center font-semibold text-white">
            <img src=".\images\relatorio-financeiro.png" alt="" />
            Tabela de Relatorios
          </h2>
        <section className="w-full m-1 border border-[#f3f3f30c] flex-1">
          <div className="w-full">
            <DataTable
              className="tables items-center"
              ref={dt}
              header={header}
              filters={filters}
              filterDisplay="row"
              value={items}
              onRowEditComplete={onRowEditComplete}
              scrollable
              paginator
              rows={20}
              editMode="row"
              tableStyle={{ width: "100%", minWidth: "20rem", height: "5rem" }}
            >
              {visibleColumns.map((col) => (
                <Column
                  key={col.field}
                  field={col.field}
                  header={col.header}
                  sortable
                  filter={filters}
                  filterMenuStyle={{ width: '14rem' }}
                  showFilterMenu={false}
                  filterPlaceholder={`Buscar: ${col.header}`}
                  body={(rowData) =>
                    col.field === "status_base"
                      ? statusBodyTemplate(rowData)
                      : renderTooltipContent(rowData, col.field)
                  }
                  editor={(options) => {
                    if (col.field === "status_base") {
                      return statusEditor(options);
                    } else if (col.field === "taxa_entrega") {
                      return priceEditor(options);
                    } else if (col.field === "data_inativacao") {
                      return inativacaoEditor(options);
                    } else {
                      return null;
                    }
                   
                  }}
                  filterElement={
                    col.field === "status_base" 
                      ? statusRowFilterTemplate 
                        : undefined
                  }
                  style={{
                    minWidth: '12rem',
                    maxWidth: '20rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'center',
                    textTransform: 'uppercase'
                  }}
                />
              ))}
              <Column
                rowEditor
                headerStyle={{ width: '10%', minWidth: '8rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center' }}
              />
            </DataTable>
          </div>
        </section>
      </Card>
    </div>
  );
}  