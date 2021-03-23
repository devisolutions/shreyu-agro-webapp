import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill, BillItems } from '../bill';
import { BillsService } from '../bills.service';
import { CommonStateService } from '../common-state.service';

@Component({
  selector: 'app-invoice-viewer',
  templateUrl: './invoice-viewer.component.html',
  styleUrls: ['./invoice-viewer.component.css'],
})
export class InvoiceViewerComponent implements OnInit {
  imgPath = 'http://localhost:8080/shreyu-agro/assets/krishnaji.png';
  // imgPath = 'assets/krishnaji.png';
  id: number;
  bill: Bill;
  pdfName: string;
  dataSource: BillItems[];
  @ViewChild('mainScreen', null) elementView: ElementRef;
  viewHeight: number;

  displayedColumns = [
    // 'product_code',
    'product_name',
    'product_weight',
    'hsn_code',
    'product_price',
    'product_quantity',
    'total_wo_gst',
    'product_cgst',
    'product_sgst',
    'gst_amount',
    'total'
  ];

  constructor(
    private route: ActivatedRoute,
    private billservice: BillsService,
    private commonStateService: CommonStateService,
    private router: Router
  ) {}
  ngOnInit() {
    this.commonStateService.setCurrentComponentName('InvoiceViewerComponent');
    this.id = this.route.snapshot.params['id'];
    this.billservice.getBillById(this.id).subscribe((data) => {
      this.bill = data;
      this.dataSource = data.billItems;
      this.dataSource.sort((a, b) => a.productOrder - b.productOrder);
      this.pdfName =
        data.id + '_' + data.buyerName + '_' + data.dateOfBill + '.pdf';
    });
  }
  printInvoice() {
    // const data = document.getElementById('pdf-content');  // Id of the table
    // html2canvas(data).then(canvas => {
    //     // Few necessary setting options
    //     const imgWidth = 208;
    //     const pageCount = 0;
    //     const imgHeight = canvas.height * imgWidth / canvas.width;
    //     const contentDataURL = canvas.toDataURL('image/png');
    //     const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    //     const position = 0;
    //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //     pdf.save(this.pdfName); // Generated PDF
    //   });
    // const data = document.getElementById('pdf-content');
    // html2canvas(data).then((canvas) => {
    //   // Few necessary setting options
    //   console.log(canvas);
    //   var doc = new jspdf.jsPDF('p', 'mm');
    //   var pageHeight= doc.internal.pageSize.getHeight();
    //   //const imgWidth = 208;
    //   var imgheight = canvas.height * 25.4 / 96; //px to mm
    //   var pagecount = Math.ceil(imgheight / pageHeight);
    //   //const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   const contentDataURL = canvas.toDataURL('image/png');
    //   const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    //   const position = 0;
    //   //const pageHeight = this.elementView.nativeElement.offsetHeight * 25.4 / 96;
    //   //const pagecount = Math.ceil(imgHeight / pageHeight);
    //   console.log(pagecount)
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //   // pdf.save(this.pdfName); // Generated PDF
    // });
    //   var doc = new jspdf.jsPDF("p", "mm");
    //   const data = document.getElementById('pdf-content');
    //   html2canvas(data).then((canvas) => {
    //     var imgData = canvas.toDataURL("image/png");
    //     var pageHeight = doc.internal.pageSize.getHeight();
    //     var pageWidth = doc.internal.pageSize.getWidth();
    //     var imgheight = (canvas.height * 25.4) / 96; //px to mm
    //   var pagecount = Math.ceil(imgheight / pageHeight);
    //   /* add initial page */
    //   doc.addPage("a4", "p");
    //   doc.addImage(imgData, "PNG", 2, 0, pageWidth - 4, 0);
    //   /* add extra pages if the div size is larger than a a4 size */
    //   if (pagecount > 0) {
    //     var j = 1;
    //     while (j != pagecount) {
    //       doc.addPage("a4", "p");
    //       doc.addImage(imgData, "PNG", 2, -(j * pageHeight), pageWidth - 4, 0);
    //       j++;
    //     }
    //     doc.save(this.pdfName)
    //   }
    //   });
    // }
  }

  convertWeight(productName: string, weightInGms: number): string {
    let weight: string;
    if (weightInGms < 1000) {
      weight = weightInGms.toString();
    } else {
      weight = (weightInGms / 1000).toString();
    }
    if (productName.toLowerCase().includes('sauce') || productName.toLowerCase().includes('vinegar')) {
      return weightInGms < 1000 ? weight + ' ml' : weight + ' Ltr';
    } else {
      return weightInGms < 1000 ? weight + ' gms' : weight + ' Kg';
    }
  }

  routeToGenerateNewInvoice(): void {
    this.router.navigate(['/generateInvoice']);
    this.commonStateService.setCurrentComponentName('AddInvoiceComponent');
  }
}
