import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const GeneratePDF = ({ graphData }) => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Add the title
    doc.text("Stock Market Analysis Report", 20, 20);

    // Capture the graph using html2canvas
    const graphElement = document.getElementById("stock-graph");
    if (graphElement) {
      const canvas = await html2canvas(graphElement);
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 30, 180, 90); // Adjust position and size
    }

    // Save the PDF
    doc.save("stock_report.pdf");
  };

  return (
    <div>
      <button
        onClick={generatePDF}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Download PDF Report
      </button>
    </div>
  );
};

export default GeneratePDF;
