const getFormattedDate = (date: string, language: string) => {
  if (!date) return null;

  const formattedDate = new Date(date).toLocaleDateString(language === "pl" ? "PL-pl" : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(date).toLocaleTimeString(language === "pl" ? "PL-pl" : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return [formattedDate, formattedTime];
};

export default getFormattedDate;
