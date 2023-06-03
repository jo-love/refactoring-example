// 문제점: 코드의 가독성이 떨어짐, 함수 안에서 코드가 하는 일이 많고 여러가지 기능임 -> 재사용성이 떨어짐

export function printOwing(invoice) {
  //지역변수는 사용하는 곳과 최대한 가까운 곳에 위치하기
  let outstanding = 0;

  //배너를 출력
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');

  // calculate outstanding
  for (const o of invoice.orders) {
    // 절차지향적인 코드를 함수형 프로그래밍으로 작성하면 더 좋다
    outstanding += o.amount;
  }

  // record due date
  const today = new Date();
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30,
  );

  //print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

// 수정본
export function modifiedPrintOwing(invoice) {
  printBanner();

  // 총 가격을 계산
  let outstanding = calculateOutstaing(invoice);

  recordDueDate(invoice);

  printDetails(invoice, outstanding);

  const printBanner = () => {
    console.log('***********************');
    console.log('**** Customer Owes ****');
    console.log('***********************');
  };
}

const calculateOutstaing = (invoice) => {
  return invoice.orders.reduce((sum, order) => (sum += order.amount), 0);
  // return invoice.orders.reduce((sum, order) => sum + order.amount, 0);
};

const recordDueDate = (invoice) => {
  const today = new Date();
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30,
  );
};

const printDetails = (invoice, outstanding) => {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
};

const invoice = {
  orders: [{ amount: 2 }, { amount: 5 }],
  customer: '엘리',
};
printOwing(invoice);
