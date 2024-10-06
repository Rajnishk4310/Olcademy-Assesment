const initialState = {
    products: [
      {
        id: 1,
        name: 'Floral Bliss',
        description: 'A refreshing floral scent.',
        price: '$120',
        sizes: ['30ml', '50ml', '100ml'],
        images: ['/images/floral1.jpg', '/images/floral2.jpg'],
      },
      {
        id: 2,
        name: 'Ocean Breeze',
        description: 'A crisp ocean breeze scent.',
        price: '$140',
        sizes: ['30ml', '50ml'],
        images: ['/images/ocean1.jpg', '/images/ocean2.jpg'],
      },
      // Add more products
    ],
    selectedProduct: null,
  };
  
  export const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SELECT_PRODUCT':
        return { ...state, selectedProduct: action.payload };
      default:
        return state;
    }
  };
  