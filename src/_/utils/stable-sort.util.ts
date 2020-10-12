export function sort(
  array: any[],
  orderBy: string | string[],
  orderDir: 'desc' | 'asc' | undefined
): any[] {
  return stableSort(array, getCompareFunc(orderBy, orderDir));
}

function stableSort(array: any[], cmp: (a: any, b: any) => number): any[] {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getCompareFunc(
  orderBy: string | string[],
  orderDir: 'desc' | 'asc' | undefined
): (a: any, b: any) => number {
  return orderDir === 'desc'
    ? (a: any, b: any) => compareObjProps(a, b, orderBy)
    : (a: any, b: any) => -compareObjProps(a, b, orderBy);
}

function compareObjProps(a: any, b: any, orderBy: string | string[]): number {
  const fields: string[] = Array.isArray(orderBy) ? orderBy : [orderBy];
  let result = 0;
  for (let i = 0; i < fields.length; i += 1) {
    result = compareObjProp(a, b, fields[i]);
    if (result !== 0) {
      break;
    }
  }
  return result;
}

function compareObjProp(a: any, b: any, orderBy: string): number {
  const aValue = a[orderBy];
  const bValue = b[orderBy];
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}
