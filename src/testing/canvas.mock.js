// src/testing/canvas-mock.js

global.HTMLCanvasElement.prototype.getContext = () => {
  // Implement a mock getContext function here (e.g., for 2D rendering):
  return {
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(),
    putImageData: jest.fn(),
    createImageData: jest.fn(),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    measureText: () => {
      return { width: 0 };
    },
    transform: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn(),
  };
};
