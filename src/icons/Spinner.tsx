import { SVGProps } from 'react';

export const Spinner = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={800}
      height={800}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <script />
      <script data-extension-id="dlcobpjiigpikoobohmabehhmhfoodbb" />
      <script />
      <script />
      <script />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
        clipRule="evenodd"
        opacity={0.2}
      />
      <path fill="currentColor" d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
    </svg>
  );
};
