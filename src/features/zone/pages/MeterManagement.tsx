import {
  useMemo,
  useState,
} from "react";

import {
  Plus,
  Eye,
  Pencil,
  Power,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  PageHeader,
  Button,
  DataTable,
  StatusBadge,
  Modal,
  Input,
  ConfirmDialog,
} from "../../../shared/components";

import type {
  Column,
  RowAction,
  SortState,
} from "../../../shared/types/table";

import {
  useDebounce,
} from "../../../shared/hooks/useDebounce";

import {
  useToast,
} from "../../../shared/toast/useToast";

interface Meter {
  id: string;
  owner: string;
  status: "Active" | "Deactivated";
  lastReading: number;
}

const sampleMeters: Meter[] = [
  {
    id: "MTR-001",
    owner: "Rahul Sharma",
    status: "Active",
    lastReading: 245,
  },
  {
    id: "MTR-002",
    owner: "Kiran Kumar",
    status: "Deactivated",
    lastReading: 185,
  },
  {
    id: "MTR-003",
    owner: "Priya Singh",
    status: "Active",
    lastReading: 320,
  },
  {
    id: "MTR-004",
    owner: "Amit Verma",
    status: "Active",
    lastReading: 125,
  },
  {
    id: "MTR-005",
    owner: "Neha Gupta",
    status: "Active",
    lastReading: 410,
  },
  {
    id: "MTR-006",
    owner: "Arjun Rao",
    status: "Deactivated",
    lastReading: 270,
  },
];

const columns: Column<Meter>[] = [
  {
    id: "id",
    header: "Meter ID",
    accessor: "id",
    sortable: true,
  },
  {
    id: "owner",
    header: "Owner",
    accessor: "owner",
    sortable: true,
  },
  {
    id: "status",
    header: "Status",
    accessor: "status",
    sortable: true,
    render: (meter) => (
      <StatusBadge status={meter.status} />
    ),
  },
  {
    id: "lastReading",
    header: "Last reading",
    accessor: "lastReading",
    sortable: true,
    render: (meter) =>
      `${meter.lastReading} kWh`,
  },
];

function isMeterKey(
  key: string
): key is keyof Meter {
  return (
    key === "id" ||
    key === "owner" ||
    key === "status" ||
    key === "lastReading"
  );
}

function MeterManagement() {
  const navigate = useNavigate();

  const { showToast } = useToast();

  const [search, setSearch] =
    useState("");

  const debouncedSearch =
    useDebounce(search);

  const [sort, setSort] =
    useState<SortState>({
      key: "id",
      direction: "asc",
    });

  const [page, setPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(5);

  const [selectedIds, setSelectedIds] =
    useState<string[]>([]);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [owner, setOwner] =
    useState("");

  const [ownerError, setOwnerError] =
    useState("");

  const [selectedMeter, setSelectedMeter] =
    useState<Meter | null>(null);

  const filteredMeters = useMemo(() => {
    const query =
      debouncedSearch.toLowerCase().trim();

    const result = sampleMeters.filter(
      (meter) =>
        meter.id.toLowerCase().includes(query) ||
        meter.owner.toLowerCase().includes(query)
    );

    const key = sort.key;

    if (!isMeterKey(key)) {
      return result;
    }

    result.sort((a, b) => {
      const first = a[key];
      const second = b[key];

      const comparison =
        typeof first === "number" &&
        typeof second === "number"
          ? first - second
          : String(first).localeCompare(
              String(second)
            );

      return sort.direction === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [debouncedSearch, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredMeters.length / pageSize
    )
  );

  const currentPage = Math.min(
    page,
    totalPages
  );

  const startIndex =
    (currentPage - 1) * pageSize;

  const pageData = filteredMeters.slice(
    startIndex,
    startIndex + pageSize
  );

  const actions: RowAction<Meter>[] = [
    {
      label: "View",
      icon: <Eye size={16} />,
      onClick: (meter) => {
        navigate(
          `/zone/meters/${meter.id}`
        );
      },
    },
    {
      label: "Edit",
      icon: <Pencil size={16} />,
      onClick: (meter) => {
        showToast(
          `Edit form for ${meter.id} will be implemented in the Zone module.`,
          "info"
        );
      },
    },
    {
      label: "Deactivate",
      icon: <Power size={16} />,
      danger: true,
      hidden: (meter) =>
        meter.status !== "Active",
      onClick: (meter) => {
        setSelectedMeter(meter);
      },
    },
    {
      label: "Activate",
      icon: <Power size={16} />,
      hidden: (meter) =>
        meter.status !== "Deactivated",
      onClick: (meter) => {
        setSelectedMeter(meter);
      },
    },
  ];

  function handleAddMeter() {
    if (!owner.trim()) {
      setOwnerError(
        "Meter owner is required"
      );

      return;
    }

    showToast(
      "Validation completed. No meter was saved in Phase 1.",
      "info"
    );

    setModalOpen(false);
    setOwner("");
    setOwnerError("");
  }

  const actionLabel =
    selectedMeter?.status === "Active"
      ? "Deactivate"
      : "Activate";

  return (
    <div>
      <PageHeader
        title="Meter Management"
        subtitle="Manage registered meters"
        actions={
          <Button
            icon={<Plus size={18} />}
            onClick={() => {
              setOwner("");
              setOwnerError("");
              setModalOpen(true);
            }}
          >
            Add meter
          </Button>
        }
      />

      <DataTable<Meter>
        data={pageData}
        columns={columns}
        getRowId={(meter) => meter.id}

        search={search}
        searchPlaceholder="Search meter or owner"
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}

        sort={sort}
        onSortChange={(value) => {
          setSort(value);
          setPage(1);
        }}

        page={currentPage}
        pageSize={pageSize}
        totalItems={filteredMeters.length}

        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}

        actions={actions}

        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}

        emptyTitle="No meters found"
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add meter"
        description="Enter meter owner information."
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() =>
                setModalOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              onClick={handleAddMeter}
            >
              Validate
            </Button>
          </>
        }
      >
        <Input
          label="Meter owner"
          placeholder="Enter owner name"
          value={owner}
          required
          error={ownerError}
          onChange={(event) => {
            setOwner(event.target.value);
            setOwnerError("");
          }}
        />
      </Modal>

      <ConfirmDialog
        open={selectedMeter !== null}
        title={`${actionLabel} meter`}
        message={`Are you sure you want to ${actionLabel.toLowerCase()} ${
          selectedMeter?.id ?? ""
        }?`}
        confirmLabel={actionLabel}
        danger={actionLabel === "Deactivate"}
        onCancel={() =>
          setSelectedMeter(null)
        }
        onConfirm={() => {
          showToast(
            "Action confirmed. Database records remain unchanged in Phase 1.",
            "info"
          );

          setSelectedMeter(null);
        }}
      />
    </div>
  );
}

export default MeterManagement;