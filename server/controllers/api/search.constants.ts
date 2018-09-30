// Errors
const Errors = {
  ERROR_1: 'Error when requesting list of products - ML API: ',
  ERROR_2: 'Error when requesting product - ML API: product id ',
  ERROR_3: 'Error when requesting product description - ML API: product id '
};

// ML APIs
const Paths = {
  ML_API_SEARCH_PATH: 'https://api.mercadolibre.com/sites/MLA/search?q=',
  ML_API_ITEMS: 'https://api.mercadolibre.com/items/',
  ITEM_DESCRIPTION: '/description'
};

module.exports = { Errors, Paths };
