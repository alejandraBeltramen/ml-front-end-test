export interface ProductDetailsModel {
  item: {
    picture: string,
    condition: string,
    soldQuantity: number,
    title: string,
    price: {
      amount: number,
    },
    description: string
  };
}
