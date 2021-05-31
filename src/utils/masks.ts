export function maskDate(value: string) {
  let v = value.replace(/\D/g, '').slice(0, 10);


  if (v.length === 5 || v.length === 6) {
    return `${v.slice(0, 4)}-${v.slice(4, 6)}`;
  } else if (v.length > 6) {
    return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6)}`;
  }
  return v
};

export function maskMoney(v: any) {
  v=v.replace(/\D/g,"") // permite digitar apenas numero
  v=v.replace(/(\d{1})(\d{1,2})$/,"$1.$2") // coloca virgula antes dos ultimos 4 digitos
  return v;
};
