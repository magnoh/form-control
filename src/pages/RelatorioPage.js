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

import { columns } from './columns'
import { useReport } from "../hooks/use-reports";

export default function RelatorioPage() {
  const toast = useRef(null)
  const { readRelatorio, updateRelatorio, items, setItems } = useReport(toast)
  const dt = useRef(null);
  const [totalQuantidade, setTotalQuantidade] = useState(0);

  const [statuses] = useState([
    { label: "ATIVA", value: "ATIVA" },
    { label: "EM PAUSA", value: "EM PAUSA" },
    { label: "INATIVA", value: "INATIVA" }
  ]);

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
    readRelatorio()
  }, []);

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
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const onRowEditComplete = useCallback((e) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      let { newData, index } = e;

      newData.data_inativacao = newData.data_inativacao ? formatDate(newData.data_inativacao) : null;
      updatedItems[index] = newData;

      updateRelatorio(newData);
      return updatedItems;
    });
  }, []);

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
        options={Array.isArray(statuses) ? statuses : []}
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

  const statusRowFilterTemplate = useCallback((options) => (
    <Dropdown
      value={options.value}
      options={Array.isArray(statuses) ? statuses : []}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="Selecione o status"
      className="p-column-filter"
      showClear
      style={{ minWidth: '12rem' }}
      showFilterMenu={false}
    />
  ), [statuses]);



  const inativacaoEditor = (options) => {
    return (
      <Calendar
        inputClassName="calendario placeholder-[#fffff5d2] hover:border-b-green-1000 border-[#f3f3f30c]"
        value={options.value ? new Date(options.value) : null}
        onChange={(e) => options.editorCallback(e.value ? formatDate(e.value) : null)}
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
          data-pr-tooltip={renderTooltipByTextColumn(rowData, field)}
          data-pr-position="top"
          data-pr-tooltip-options={`tooltipClassName: 'custom-tooltip'`}
        >
          {rowData[field]}
        </span>

        <Tooltip target=".ellipsis-text" />
      </>
    );
  };

  const renderTooltipByTextColumn = (rowData, field) => {
    const acceptsColumns = ['texto', 'observacao']
    return acceptsColumns.includes(field) ? rowData[field] : null
  } 

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap justify-between items-center space-x-2">
        <MultiSelect
          value={visibleColumns}
          options={Array.isArray(columns) ? columns : []}
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
              rows={5}
              editMode="row"
              tableStyle={{ width: "100%", minWidth: "20rem", height: "5rem" }}
            >
              {visibleColumns.map((col) => (
                <Column
                  key={col.field}
                  field={col.field}
                  header={col.header}
                  sortable
                  filter={filters[col.field]}
                  filterMenuStyle={{ width: '14rem' }}
                  showFilterMenu={false}
                  filterPlaceholder={`Buscar: ${col.header}`}
                  body={(rowData) =>
                    col.field === "status_base" ? statusBodyTemplate(rowData) : renderTooltipContent(rowData, col.field)
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