const getFormattedDate = (date: string) => {
  if (!date) return null;

  const formattedDate = new Date(date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(date).toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return [formattedDate, formattedTime];
};

export default getFormattedDate;
