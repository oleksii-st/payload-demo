import { ReactNode } from 'react';

type HighlightQueryProps = {
  text: string;
  query?: string;
  removeOffset?: number;
  maxLength?: number;
};

export const HighlightQuery = ({
  text,
  query,
  removeOffset = -1,
  maxLength,
}: HighlightQueryProps) => {
  if (!query?.trim()) return text.split(/\s+/).slice(0, maxLength).join(' ');

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexPattern = escapedQuery.replace(/%/g, '.*').replace(/_/g, '.');
  const regex = new RegExp(regexPattern, 'gi');

  const parts = text.split(regex);
  const matches = text.match(regex) || [];

  if (!matches.length) return <>{text}</>;

  const processText = (input: string, isFirstPart: boolean) => {
    const words = input.split(/\s+/);

    if (isFirstPart && removeOffset >= 0) {
      const trimmedWords = words.slice(-Math.max(removeOffset + 1, 0));
      return {
        text: (words.length > removeOffset ? '...' : '') + trimmedWords.join(' '),
        wordCount: trimmedWords.length,
      };
    }

    return {
      text: input,
      wordCount: words.length,
    };
  };

  const result: ReactNode[] = [];
  let addedWords = 0;

  parts.forEach((part, index) => {
    if (maxLength && addedWords >= maxLength) return;

    const processedPart = processText(part, index === 0);

    if (maxLength && addedWords + processedPart.wordCount > maxLength) {
      const remainingWords = maxLength - addedWords;
      result.push(processedPart.text.split(/\s+/).slice(0, remainingWords).join(' '));
      return;
    }

    result.push(processedPart.text);
    addedWords += processedPart.wordCount;

    if (index < matches.length) {
      const matchWords = matches[index].split(/\s+/);

      if (!maxLength || addedWords + matchWords.length <= maxLength) {
        result.push(<mark key={`match-${index}`}>{matches[index]}</mark>);
        addedWords += matchWords.length;
      }
    }
  });

  return <>{result}</>;
};
