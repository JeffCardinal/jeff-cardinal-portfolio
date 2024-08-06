import React from 'react';

interface ContainerProps {
  children: string;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="">
      { children }
    </div>
  );
};

export default Container;