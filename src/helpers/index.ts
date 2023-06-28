export const formatCurrency = (amount: number) =>
  amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export const parseFormData = (formData: FormData) => {
  const values = Object.fromEntries(formData) as {
    name: string;
    image: File;
    category: string;
    price: string;
    availability: string;
  };

  const valuesParsed = {
    ...values,
    price: Number(values.price),
    availability: Number(values.availability),
    category: Number(values.category),
    image: '',
  };

  return valuesParsed;
};
