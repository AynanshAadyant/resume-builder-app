import { useReactToPrint} from "react-to-print" 

interface printPDFParams{ 
    ref: any,
    fileName : string
}

export const usePrintPdf = ({ref, fileName = "document" } : printPDFParams) => {
  return useReactToPrint({
    contentRef: ref,
    documentTitle: fileName,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
    `,
  });
};