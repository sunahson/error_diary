function formattingDate (d) {
  let result = '';
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();

  result = `${year}.${month}.${date}`;

  return result;
}

export {
  formattingDate
};
