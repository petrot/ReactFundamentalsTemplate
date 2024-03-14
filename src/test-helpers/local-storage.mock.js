export const mockGetItem = jest.fn();
export const mockSetItem = jest.fn();
export const mockRemoveItem = jest.fn();

export const prepareMockLocalStorage = () => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (...args) => mockGetItem(...args),
      setItem: (...args) => mockSetItem(...args),
      removeItem: (...args) => mockRemoveItem(...args),
    },
  });
};
