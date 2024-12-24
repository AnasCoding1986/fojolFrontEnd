import React from "react";
import { jsPDF } from "jspdf";

const GeneratePDF = ({ stockData, graphRef }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add report title and details
    doc.text("Stock Market Analysis Report", 20, 20);
    doc.text(`Stock Symbol: ${stockData["Meta Data"]["2. Symbol"]}`, 20, 30);
    doc.text(`Interval: ${stockData["Meta Data"]["3. Interval"]}`, 20, 40);

    // Add the graph to the PDF
    if (graphRef?.current) {
      const graphImage = graphRef.current.toBase64Image();
      doc.addImage(graphImage, "PNG", 15, 50, 180, 100);
    } else {
      doc.text("Graph data not available.", 20, 70);
    }

    doc.save("stock_report.pdf");
  };

  return (
    <div className="mt-4">
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
