import { useId } from "react";

import type { KeyboardEvent } from "react";

export interface TabItem<T extends string> {
  label: string;
  value: T;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  activeTab: T;
  onChange: (value: T) => void;
  idPrefix?: string;
}

function Tabs<T extends string>({
  items,
  activeTab,
  onChange,
  idPrefix,
}: TabsProps<T>) {
  const generatedId = useId();

  const prefix = idPrefix ?? generatedId;

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % items.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    const nextTab = items[nextIndex];

    onChange(nextTab.value);

    document.getElementById(`${prefix}-tab-${nextTab.value}`)?.focus();
  }

  return (
    <div className="tabs-container" role="tablist" aria-label="Page sections">
      {items.map((item, index) => (
        <button
          key={item.value}
          id={`${prefix}-tab-${item.value}`}
          type="button"
          role="tab"
          aria-selected={activeTab === item.value}
          aria-controls={`${prefix}-panel-${item.value}`}
          tabIndex={activeTab === item.value ? 0 : -1}
          className={`tab-button ${
            activeTab === item.value ? "tab-active" : ""
          }`}
          onClick={() => onChange(item.value)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
