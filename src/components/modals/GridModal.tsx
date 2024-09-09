import React from 'react';
import { useState, useEffect } from 'react';

interface GridModalProps {
  isOpen: boolean;
  onClose: () => void;
  // children: React.ReactNode;
}

const GridModal = ({ isOpen, onClose /*children*/ }: GridModalProps) => {
  return <div>Modaali</div>;
};

export default GridModal;
