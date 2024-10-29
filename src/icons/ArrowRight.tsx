import { SVGProps } from 'react';

export const ArrowRight = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={50}
      height={50}
      viewBox="0 0 330 330"
      style={{ transform: 'scaleX(-1)' }}
      {...props}
    >
      <path
        d="M111.213 165.004 250.607 25.607c5.858-5.858 5.858-15.355 0-21.213-5.858-5.858-15.355-5.858-21.213.001l-150 150.004a15 15 0 0 0 0 21.212l150 149.996C232.322 328.536 236.161 330 240 330s7.678-1.464 10.607-4.394c5.858-5.858 5.858-15.355 0-21.213L111.213 165.004z"
        fill="currentColor"
      />
    </svg>
  );
};
