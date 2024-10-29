import { IUploadCommissionsRow } from '../components/payments/upload-commissions/UploadCommissions';
import { customersMock } from '../data/customers';
import { invoicesMock } from '../data/invoices';
import { ordersMock } from '../data/orders';

function findCustomer(name: string, id: string) {
  let customer = customersMock.filter((customer) => customer.name === name);
  let error = {
    errorText: '',
    function: () => {},
  };
  let columnWithError = null;
  if (customer) {
    if (customer.length > 1) {
      const customerFound = customer.find((customer) => customer.id === id);
      if (customerFound) customer = [customerFound];
      else {
        columnWithError = 'customerId';
        error = {
          errorText: 'Duplicate customers found',
          function: () => window.alert('Open dialog to search for correct ' + customer[0].name),
        };
      }
    }
  } else {
    columnWithError = 'customerName';
    error = {
      errorText: 'No Matching Customer Found',
      function: () => window.alert('dialog to look for matching customer or create a new one'),
    };
  }

  return {
    customer,
    columnWithError,
    error,
  };
}

export function createRowWithMatchingRecords(row: { [key: string]: any }): IUploadCommissionsRow {
  const invoiceFound = invoicesMock.find((invoice) => invoice.invoiceNumber === row['Invoice Number']);

  if (invoiceFound) {
    const {
      invoiceNumber,
      poNumber,
      retailerId,
      companyName,
      invoiceDate,
      orderNumber,
      salesRepID,
      commissionPercent,
    } = invoiceFound;
    const customer = findCustomer(companyName, retailerId);

    const newRow: IUploadCommissionsRow = {
      poNumber: {
        value: poNumber,
      },
      invoiceNumber: {
        value: invoiceNumber,
      },
      invoiceAmount: {
        value: row['Invoice Amount'],
      },
      customerId: {
        value: customer.customer[0]?.id || retailerId,
        error:
          customer.columnWithError === 'customerId'
            ? {
                errorText: customer.error.errorText,
                function: customer.error.function,
              }
            : null,
      },
      customerName: {
        value: customer.customer[0]?.name || companyName,
        error:
          customer.columnWithError === 'customerName'
            ? {
                errorText: customer.error.errorText,
                function: customer.error.function,
              }
            : null,
      },
      address: {
        value: customer.customer[0]?.address || row['Address'],
        error:
          customer.columnWithError === 'address'
            ? {
                errorText: customer.error.errorText,
                function: customer.error.function,
              }
            : null,
      },
      commissionPercent: {
        value: commissionPercent + '%',
      },
      invoiceDate: {
        value: invoiceDate,
      },
      orderNumber: {
        value: orderNumber,
      },
      writingRep: {
        value: salesRepID,
      },
      currentRep: {
        value: salesRepID,
      },
    };
    return newRow;
  }
  const orderFound = ordersMock.find((order) => order.purchaseOrder === row['PO Number']);
  if (orderFound) {
    const { id, purchaseOrder, companyName, retailerId, currentRepName, writingRepName } = orderFound;

    const customer = findCustomer(companyName, retailerId);

    const newRow: IUploadCommissionsRow = {
      poNumber: {
        value: purchaseOrder,
      },
      invoiceNumber: {
        value: row['Invoice Number'],
        error: {
          errorText: 'No matching invoice found',
          function: () => window.alert('Open dialog to search invoices for PO #: ' + purchaseOrder),
        },
      },
      invoiceAmount: {
        value: row['Invoice Amount'],
      },
      customerId: {
        value: customer.customer[0]?.id || retailerId,
        error:
          customer.columnWithError === 'customerId'
            ? {
                errorText: customer.error.errorText,
                function: customer.error.function,
              }
            : null,
      },
      customerName: {
        value: customer.customer[0]?.name || companyName,
        error:
          customer.columnWithError === 'customerName'
            ? {
                errorText: customer.error.errorText,
                function: customer.error.function,
              }
            : null,
      },
      address: {
        value: customer.customer[0]?.address || row['Address'],
        error:
          customer.columnWithError === 'address'
            ? {
                errorText: customer.error.errorText,
                function: customer.error.function,
              }
            : null,
      },
      commissionPercent: {
        value: row['Commission Amount'] + '%',
      },
      invoiceDate: {
        value: row['Invoice Date'],
      },
      orderNumber: {
        value: id,
      },
      writingRep: {
        value: writingRepName,
      },
      currentRep: {
        value: currentRepName,
      },
    };
    return newRow;
  }
  const customer = findCustomer(row['Customer Name'], row['Customer ID']);

  const newRow: IUploadCommissionsRow = {
    poNumber: {
      value: row['PO Number'],
      error: {
        errorText: 'No matching order found',
        function: () => window.alert('Opening dialog of selected vendors orders'),
      },
    },
    invoiceNumber: {
      value: row['Invoice Number'],
      error: {
        errorText: 'No matching Invoice found',
        function: () => window.alert('Opening dialog of invoices for selected vendor'),
      },
    },
    invoiceAmount: {
      value: row['Invoice Amount'],
    },
    customerId: {
      value: customer.customer[0]?.id || row['Customer ID'],
      error:
        customer.columnWithError === 'customerId'
          ? {
              errorText: customer.error.errorText,
              function: customer.error.function,
            }
          : null,
    },
    customerName: {
      value: customer.customer[0]?.name || row['Customer Name'],
      error:
        customer.columnWithError === 'customerName'
          ? {
              errorText: customer.error.errorText,
              function: customer.error.function,
            }
          : null,
    },
    address: {
      value: customer.customer[0]?.address || row['Address'],
      error:
        customer.columnWithError === 'address'
          ? {
              errorText: customer.error.errorText,
              function: customer.error.function,
            }
          : null,
    },
    commissionPercent: {
      value: row['Commission Amount'] + '%',
    },
    invoiceDate: {
      value: row['Invoice Date'],
    },
    orderNumber: {
      value: row['Order Number'],
    },
    writingRep: {
      value: row['Writing Rep'],
    },
    currentRep: {
      value: row['Current Rep'],
    },
  };
  return newRow;
}
