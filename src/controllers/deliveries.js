/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
import dayjs from 'dayjs';

function addMonth(segmentedDate) {
  let month = segmentedDate[1];
  let year = Number(segmentedDate[2]);

  if (month === '01') {
    month = '02';
  } else if (month === '02') {
    month = '03';
  } else if (month === '03') {
    month = '04';
  } else if (month === '04') {
    month = '05';
  } else if (month === '05') {
    month = '06';
  } else if (month === '06') {
    month = '07';
  } else if (month === '07') {
    month = '08';
  } else if (month === '08') {
    month = '09';
  } else if (month === '09') {
    month = '10';
  } else if (month === '10') {
    month = '11';
  } else if (month === '11') {
    month = '12';
  } else if (month === '12') {
    month = '01';
    year += 1;
  }

  const finalDate = [segmentedDate[0], month, year];
  return finalDate.join('/');
}

function verifyDate(dates) {
  const finalDates = [];
  for (let i = 0; i < dates.length; i += 1) {
    const date = dayjs(dates[i]).format('MM/DD/YYYY');
    const verify = new Date(date);
    const weekDay = verify.getDay();
    if (weekDay === 0) {
      const rightDate = dayjs(date).format('DD/MM/YYYY');
      finalDates.push(dayjs(rightDate).add(1, 'day').format('MM/DD/YYYY'));
    } else if (weekDay === 6) {
      const rightDate = dayjs(date).format('DD/MM/YYYY');
      finalDates.push(dayjs(rightDate).add(2, 'day').format('MM/DD/YYYY'));
    } else {
      const rightDate = dayjs(date).format('DD/MM/YYYY');
      finalDates.push(dayjs(rightDate).add(0, 'day').format('MM/DD/YYYY'));
    }
  }
  return finalDates;
}

// eslint-disable-next-line max-len
export default function registerDeliveries(signature_date, delivery_plan, plan_name) {
  let finalDates = [];

  let segmentedDate = [];
  const date = dayjs(signature_date).format('DD/MM/YYYY');
  segmentedDate = date.split('/');

  const dates = [];

  if (plan_name === 'mensal' && delivery_plan === 'um') {
    if (segmentedDate[0] !== '01') {
      segmentedDate[0] = '01';
    }
    dates.push(addMonth(segmentedDate));
    dates.push(addMonth(dates[0].split('/')));
    dates.push(addMonth(dates[1].split('/')));
    dates.push(addMonth(dates[2].split('/')));
    dates.push(addMonth(dates[3].split('/')));
    dates.push(addMonth(dates[4].split('/')));
    dates.push(addMonth(dates[5].split('/')));
    dates.push(addMonth(dates[6].split('/')));
    dates.push(addMonth(dates[7].split('/')));
    dates.push(addMonth(dates[8].split('/')));
    dates.push(addMonth(dates[9].split('/')));
    dates.push(addMonth(dates[10].split('/')));
    dates.push(addMonth(dates[11].split('/')));
    dates.push(addMonth(dates[12].split('/')));
    dates.push(addMonth(dates[13].split('/')));
    dates.push(addMonth(dates[14].split('/')));
    finalDates = verifyDate(dates);
  } else if (plan_name === 'mensal' && delivery_plan === 'dez') {
    if (segmentedDate[0] !== '10') {
      segmentedDate[0] = '10';
    }
    dates.push(addMonth(segmentedDate));
    dates.push(addMonth(dates[0].split('/')));
    dates.push(addMonth(dates[1].split('/')));
    dates.push(addMonth(dates[2].split('/')));
    dates.push(addMonth(dates[3].split('/')));
    dates.push(addMonth(dates[4].split('/')));
    dates.push(addMonth(dates[5].split('/')));
    dates.push(addMonth(dates[6].split('/')));
    dates.push(addMonth(dates[7].split('/')));
    dates.push(addMonth(dates[8].split('/')));
    dates.push(addMonth(dates[9].split('/')));
    dates.push(addMonth(dates[10].split('/')));
    dates.push(addMonth(dates[11].split('/')));
    dates.push(addMonth(dates[12].split('/')));
    dates.push(addMonth(dates[13].split('/')));
    dates.push(addMonth(dates[14].split('/')));
    finalDates = verifyDate(dates);
  } else if (plan_name === 'mensal' && delivery_plan === 'vinte') {
    if (segmentedDate[0] !== '20') {
      segmentedDate[0] = '20';
    }
    dates.push(addMonth(segmentedDate));
    dates.push(addMonth(dates[0].split('/')));
    dates.push(addMonth(dates[1].split('/')));
    dates.push(addMonth(dates[2].split('/')));
    dates.push(addMonth(dates[3].split('/')));
    dates.push(addMonth(dates[4].split('/')));
    dates.push(addMonth(dates[5].split('/')));
    dates.push(addMonth(dates[6].split('/')));
    dates.push(addMonth(dates[7].split('/')));
    dates.push(addMonth(dates[8].split('/')));
    dates.push(addMonth(dates[9].split('/')));
    dates.push(addMonth(dates[10].split('/')));
    dates.push(addMonth(dates[11].split('/')));
    dates.push(addMonth(dates[12].split('/')));
    dates.push(addMonth(dates[13].split('/')));
    dates.push(addMonth(dates[14].split('/')));
    finalDates = verifyDate(dates);
  } else if (plan_name === 'semanal' && delivery_plan === 'segunda') {
    const day = dayjs(signature_date).format('MM/DD/YYYY');
    const verify = new Date(day);
    const weekDay = verify.getDay();
    let firstDay = '';
    if (weekDay === 0) {
      firstDay = dayjs(day).add(1, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 1) {
      firstDay = dayjs(day).add(7, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 2) {
      firstDay = dayjs(day).add(6, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 3) {
      firstDay = dayjs(day).add(5, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 4) {
      firstDay = dayjs(day).add(4, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 5) {
      firstDay = dayjs(day).add(3, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 6) {
      firstDay = dayjs(day).add(2, 'day').format('MM/DD/YYYY');
    }
    finalDates.push(firstDay);
    finalDates.push(dayjs(finalDates[0]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[1]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[2]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[3]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[4]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[5]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[6]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[7]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[8]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[9]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[10]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[11]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[12]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[13]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[14]).add(1, 'week').format('MM/DD/YYYY'));
  } else if (plan_name === 'semanal' && delivery_plan === 'quarta') {
    const day = dayjs(signature_date).format('MM/DD/YYYY');
    const verify = new Date(day);
    const weekDay = verify.getDay();
    let firstDay = '';
    if (weekDay === 0) {
      firstDay = dayjs(day).add(3, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 1) {
      firstDay = dayjs(day).add(2, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 2) {
      firstDay = dayjs(day).add(1, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 3) {
      firstDay = dayjs(day).add(7, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 4) {
      firstDay = dayjs(day).add(6, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 5) {
      firstDay = dayjs(day).add(5, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 6) {
      firstDay = dayjs(day).add(4, 'day').format('MM/DD/YYYY');
    }
    finalDates.push(firstDay);
    finalDates.push(dayjs(finalDates[0]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[1]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[2]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[3]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[4]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[5]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[6]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[7]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[8]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[9]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[10]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[11]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[12]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[13]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[14]).add(1, 'week').format('MM/DD/YYYY'));
  } else if (plan_name === 'semanal' && delivery_plan === 'sexta') {
    const day = dayjs(signature_date).format('MM/DD/YYYY');
    const verify = new Date(day);
    const weekDay = verify.getDay();
    let firstDay = '';
    if (weekDay === 0) {
      firstDay = dayjs(day).add(5, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 1) {
      firstDay = dayjs(day).add(4, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 2) {
      firstDay = dayjs(day).add(3, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 3) {
      firstDay = dayjs(day).add(2, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 4) {
      firstDay = dayjs(day).add(1, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 5) {
      firstDay = dayjs(day).add(7, 'day').format('MM/DD/YYYY');
    } else if (weekDay === 6) {
      firstDay = dayjs(day).add(6, 'day').format('MM/DD/YYYY');
    }
    finalDates.push(firstDay);
    finalDates.push(dayjs(finalDates[0]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[1]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[2]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[3]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[4]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[5]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[6]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[7]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[8]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[9]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[10]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[11]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[12]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[13]).add(1, 'week').format('MM/DD/YYYY'));
    finalDates.push(dayjs(finalDates[14]).add(1, 'week').format('MM/DD/YYYY'));
  }
  return finalDates;
}
