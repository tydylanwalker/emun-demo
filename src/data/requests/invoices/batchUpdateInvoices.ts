import { IInvoice } from '../../interfaces/IInvoice';

export async function batchUpdateInvoices(invoices: IInvoice[]): Promise<boolean> {
  // const body: {
  //   index: number;
  //   row: IInvoice;
  // }[] = [];
  // const notFound: IInvoice[] = [];

  // updateInvoices.forEach((row) => {
  //   console.log('run');
  //   const index = invoices.findIndex((invoice) => invoice.guid === row.guid);
  //   console.log(index);
  //   if (index === -1) notFound.push(row);
  //   else {
  //     body.push({
  //       index,
  //       row,
  //     });
  //   }
  // });
  // console.log('updates: ', body);
  // console.log('not found: ', notFound);

  const response = await fetch('/api/batchUpdateInvoices', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoices),
  });

  return response.ok;
}
