export const getTextFromRichText = (content: unknown): string => {
  const texts: string[] = [];

  const extractText = (data: unknown) => {
    if (Array.isArray(data)) {
      data.forEach((item) => extractText(item));
    } else if (data && typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'text' && typeof value === 'string') {
          texts.push(value);
        } else {
          extractText(value);
        }
      });
    }
  };

  extractText(content);
  return texts.join(' ');
};
