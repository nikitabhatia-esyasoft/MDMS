import { useEffect, useRef, useState } from "react";

import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  EllipsisVertical,
} from "lucide-react";

import type {
  Column,
  RowAction,
  SortState,
} from "../types/table";

import Input from "./Input";
import Pagination from "./Pagination";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];

  getRowId: (row: T) => string;

  loading?: boolean;
  error?: string;

  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  sort?: SortState;
  onSortChange?: (sort: SortState) => void;

  page: number;
  pageSize: number;
  totalItems: number;

  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;

  actions?: RowAction<T>[];

  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;

  emptyTitle?: string;
  emptyDescription?: string;
}

function DataTable<T extends object>({
  data,
  columns,
  getRowId,

  loading = false,
  error,

  search = "",
  onSearchChange,
  searchPlaceholder = "Search...",

  sort,
  onSortChange,

  page,
  pageSize,
  totalItems,

  onPageChange,
  onPageSizeChange,

  actions = [],

  selectable = false,
  selectedIds = [],
  onSelectionChange,

  emptyTitle = "No records found",
  emptyDescription = "Try changing your search or filters.",
}: DataTableProps<T>) {
  const [openActionId, setOpenActionId] =
    useState<string | null>(null);

  const tableRef = useRef<HTMLDivElement>(null);

  const selectAllRef =
    useRef<HTMLInputElement>(null);

  const currentIds = data.map(getRowId);

  const allSelected =
    currentIds.length > 0 &&
    currentIds.every((id) =>
      selectedIds.includes(id)
    );

  const someSelected =
    currentIds.some((id) =>
      selectedIds.includes(id)
    ) && !allSelected;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        someSelected;
    }
  }, [someSelected, loading, error, data.length]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        event.target instanceof Element &&
        !event.target.closest(".table-action-wrapper")
      ) {
        setOpenActionId(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenActionId(null);
      }
    }

    document.addEventListener(
      "click",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "click",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  function handleSort(column: Column<T>) {
    if (!column.sortable || !onSortChange) {
      return;
    }

    const key =
      column.sortKey ??
      String(column.accessor ?? column.id);

    const direction =
      sort?.key === key &&
      sort.direction === "asc"
        ? "desc"
        : "asc";

    onSortChange({
      key,
      direction,
    });
  }

  function toggleRow(id: string) {
    if (!onSelectionChange) return;

    if (selectedIds.includes(id)) {
      onSelectionChange(
        selectedIds.filter(
          (selectedId) => selectedId !== id
        )
      );
    } else {
      onSelectionChange([
        ...selectedIds,
        id,
      ]);
    }
  }

  function toggleAllRows() {
    if (!onSelectionChange) return;

    if (allSelected) {
      onSelectionChange(
        selectedIds.filter(
          (id) => !currentIds.includes(id)
        )
      );
    } else {
      onSelectionChange([
        ...new Set([
          ...selectedIds,
          ...currentIds,
        ]),
      ]);
    }
  }

  function renderCell(
    row: T,
    column: Column<T>
  ) {
    if (column.render) {
      return column.render(row);
    }

    if (column.accessor !== undefined) {
      const value = row[column.accessor];

      return value == null
        ? "—"
        : String(value);
    }

    return "—";
  }

  return (
    <div
      className="data-table-card"
      ref={tableRef}
    >
      <div className="table-toolbar">
        {onSearchChange && (
          <div className="table-search">
            <Search
              size={18}
              className="table-search-icon"
            />

            <Input
              aria-label="Search records"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(event) => {
                setOpenActionId(null);
                onSearchChange(event.target.value);
              }}
              className="table-search-input"
            />
          </div>
        )}

        {selectable &&
          selectedIds.length > 0 && (
            <span className="table-selection-count">
              {selectedIds.length} selected
            </span>
          )}
      </div>

      {loading ? (
        <Loader message="Loading records..." />
      ) : error ? (
        <EmptyState
          title="Unable to load records"
          description={error}
        />
      ) : data.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
        />
      ) : (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                {selectable && (
                  <th className="table-checkbox-cell">
                    <input
                      ref={selectAllRef}
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAllRows}
                      aria-label="Select all rows on this page"
                    />
                  </th>
                )}

                {columns.map((column) => {
                  const key =
                    column.sortKey ??
                    String(
                      column.accessor ?? column.id
                    );

                  const isSorted =
                    sort?.key === key;

                  return (
                    <th
                      key={column.id}
                      scope="col"
                      style={{
                        width: column.width,
                        textAlign:
                          column.align ?? "left",
                      }}
                      aria-sort={
                        column.sortable
                          ? isSorted
                            ? sort.direction === "asc"
                              ? "ascending"
                              : "descending"
                            : "none"
                          : undefined
                      }
                    >
                      {column.sortable &&
                      onSortChange ? (
                        <button
                          type="button"
                          className="table-sort-button"
                          onClick={() => {
                            setOpenActionId(null);
                            handleSort(column);
                          }}
                        >
                          {column.header}

                          {isSorted ? (
                            sort.direction === "asc" ? (
                              <ArrowUp size={14} />
                            ) : (
                              <ArrowDown size={14} />
                            )
                          ) : (
                            <ArrowUpDown size={14} />
                          )}
                        </button>
                      ) : (
                        column.header
                      )}
                    </th>
                  );
                })}

                {actions.length > 0 && (
                  <th scope="col">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {data.map((row) => {
                const id = getRowId(row);

                const visibleActions =
                  actions.filter(
                    (action) =>
                      !action.hidden?.(row)
                  );

                return (
                  <tr
                    key={id}
                    className={
                      selectable &&
                      selectedIds.includes(id)
                        ? "table-row-selected"
                        : ""
                    }
                  >
                    {selectable && (
                      <td className="table-checkbox-cell">
                        <input
                          type="checkbox"
                          checked={
                            selectedIds.includes(id)
                          }
                          onChange={() =>
                            toggleRow(id)
                          }
                          aria-label={`Select row ${id}`}
                        />
                      </td>
                    )}

                    {columns.map((column) => (
                      <td
                        key={column.id}
                        style={{
                          textAlign:
                            column.align ?? "left",
                        }}
                      >
                        {renderCell(row, column)}
                      </td>
                    ))}

                    {actions.length > 0 && (
                      <td>
                        {visibleActions.length > 0 && (
                          <div className="table-action-wrapper">
                            <button
                              type="button"
                              className="table-action-trigger"
                              aria-label={`Actions for ${id}`}
                              aria-expanded={
                                openActionId === id
                              }
                              onClick={() =>
                                setOpenActionId(
                                  (previous) =>
                                    previous === id
                                      ? null
                                      : id
                                )
                              }
                            >
                              <EllipsisVertical
                                size={18}
                              />
                            </button>

                            {openActionId === id && (
                              <div className="table-action-menu">
                                {visibleActions.map(
                                  (action) => (
                                    <button
                                      key={action.label}
                                      type="button"
                                      disabled={
                                        action.disabled?.(
                                          row
                                        )
                                      }
                                      className={
                                        action.danger
                                          ? "table-action-danger"
                                          : ""
                                      }
                                      onClick={() => {
                                        setOpenActionId(
                                          null
                                        );

                                        action.onClick(
                                          row
                                        );
                                      }}
                                    >
                                      {action.icon}
                                      {action.label}
                                    </button>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="table-pagination">
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={(nextPage) => {
            setOpenActionId(null);
            onPageChange(nextPage);
          }}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}

export default DataTable;