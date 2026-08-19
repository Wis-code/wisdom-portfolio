"use client";

export function PrintButton() {
  return (
    <button className="print-hint print-button" type="button" onClick={() => window.print()}>
      Download / save as PDF
    </button>
  );
}
