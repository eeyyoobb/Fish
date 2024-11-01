declare module 'react-world-flags' {
    interface FlagProps {
      code: string;
      height?: number | string;
      width?: number | string;
      className?: string;
      fallback?: React.ReactNode;
    }
  
    const Flag: React.FC<FlagProps>;
    export default Flag;
  }
  