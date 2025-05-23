import Images from '../assets/images/Images';

const productData = [
  {
    id: 1,
    productName: 'Black Winter',
    title: 'Autumn And Winter Casual cotton-padded jacket jacket jacket',
    price: '₹7099',
    description:
      'Perhaps the most iconic sneaker of all-time, this original "Chicago"? colorway is the cornerstone to any sneaker collection. Made famous in 1985 by Michael Jordan, the shoe has stood the test of time, becoming the most famous colorway of the Air Jordan 1. This 2015 release saw the ...More',
    images: [
      Images.common.product_1,
      Images.common.product_1,
      Images.common.product_1,
    ],
    rating: {
      countRating: 56890,
      average: 4,
    },
    stock: 120,
    category: 'Shirt',
    colors: ['#000', '#ccc', '#000080'],
    sizes: ['S', 'M', 'L', 'XL'],
    brand: 'FashionCo',
    discount: 30,
    variants: {
      '#000': {
        S: 10,
        M: 5,
        L: 8,
        XL: 12,
      },
      '#ccc': {
        S: 7,
        M: 9,
        L: 4,
        XL: 6,
      },
      '#000080': {
        S: 3,
        M: 15,
        L: 10,
        XL: 8,
      },
    },
  },
  {
    id: 2,
    productName: 'Mens Starry',
    title: 'Mens Starry Sky Printed Shirt 100% Cotton Fabric',
    price: '₹499',
    description:
      'Perhaps the most iconic sneaker of all-time, this original "Chicago"? colorway is the cornerstone to any sneaker collection. Made famous in 1985 by Michael Jordan, the shoe has stood the test of time, becoming the most famous colorway of the Air Jordan 1. This 2015 release saw the ...More',
    images: [
      Images.common.product_2,
      Images.common.product_2,
      Images.common.product_2,
    ],
    rating: {
      countRating: 7787,
      average: 2,
    },
    stock: 150,
    categories: ['Shirts', 'Casual Wear'],
    colors: ['#000', '#ccc', '#000080', '#fff'],
    sizes: ['M', 'L', 'XL'],
    brand: 'StarStyle',
    discount: 20,
    variants: {
      '#000': {
        S: 10,
        M: 5,
        L: 8,
        XL: 12,
      },
      '#ccc': {
        S: 7,
        M: 9,
        L: 4,
        XL: 6,
      },
      '#000080': {
        S: 3,
        M: 15,
        L: 10,
        XL: 8,
      },
      '#fff': {
        S: 9,
        M: 25,
        L: 15,
        XL: 1,
      },
    },
  },
  {
    id: 3,
    productName: 'Black Dress',
    title: 'Solid Black Dress for Women, Sexy Chain Shorts Ladi',
    price: '₹2000',
    description:
      'Perhaps the most iconic sneaker of all-time, this original "Chicago"? colorway is the cornerstone to any sneaker collection. Made famous in 1985 by Michael Jordan, the shoe has stood the test of time, becoming the most famous colorway of the Air Jordan 1. This 2015 release saw the ...More',
    images: [
      Images.common.product_3,
      Images.common.product_3,
      Images.common.product_3,
    ],
    rating: {
      countRating: 8993,
      average: 4.5,
    },
    stock: 50,
    categories: ['Women', 'Dresses'],
    colors: ['#000', '#fff'],
    sizes: ['S', 'M', 'L'],
    brand: 'GlamourFit',
    discount: 20,
    variants: {
      '#000': {
        S: 10,
        M: 5,
        L: 8,
      },
      '#fff': {
        S: 20,
        M: 43,
        L: 5,
      },
    },
  },
  {
    id: 4,
    productName: 'Pink Embroidered Max',
    title: 'EARTHEN Rose Pink Embroidered Tiered Maxi Dress',
    price: '₹1900',
    description:
      'Perhaps the most iconic sneaker of all-time, this original "Chicago"? colorway is the cornerstone to any sneaker collection. Made famous in 1985 by Michael Jordan, the shoe has stood the test of time, becoming the most famous colorway of the Air Jordan 1. This 2015 release saw the ...More',
    images: [
      Images.common.product_4,
      Images.common.product_4,
      Images.common.product_4,
    ],
    rating: {
      countRating: 24242,
      average: 5,
    },
    stock: 30,
    categories: ['Women', 'Dresses'],
    colors: ['#ffc0cb', '#ff0000'],
    sizes: ['M', 'L', 'XL'],
    brand: 'EarthyDesigns',
    discount: 24,
    variants: {
      '#ffc0cb': {
        S: 10,
        M: 5,
        L: 8,
      },
      '#ff0000': {
        S: 10,
        M: 5,
        L: 8,
      },
    },
  },
  {
    id: 5,
    productName: 'Pink Embroidered Max',
    title: 'EARTHEN Rose Pink Embroidered Tiered Maxi Dress',
    price: '₹1900',
    description:
      'Perhaps the most iconic sneaker of all-time, this original "Chicago"? colorway is the cornerstone to any sneaker collection. Made famous in 1985 by Michael Jordan, the shoe has stood the test of time, becoming the most famous colorway of the Air Jordan 1. This 2015 release saw the ...More',
    images: [
      Images.common.product_4,
      Images.common.product_4,
      Images.common.product_4,
    ],
    rating: {
      countRating: 24242,
      average: 5,
    },
    stock: 30,
    categories: ['Women', 'Dresses'],
    colors: ['#ffc0cb', '#ff0000'],
    sizes: ['M', 'L', 'XL'],
    brand: 'EarthyDesigns',
    discount: 24,
    variants: {
      '#ffc0cb': {
        S: 10,
        M: 5,
        L: 8,
      },
      '#ff0000': {
        S: 10,
        M: 5,
        L: 8,
      },
    },
  },
  {
    id: 6,
    productName: 'Black Winter',
    title: 'Autumn And Winter Casual cotton-padded jacket',
    price: '₹7099',
    description:
      'Perhaps the most iconic sneaker of all-time, this original "Chicago"? colorway is the cornerstone to any sneaker collection. Made famous in 1985 by Michael Jordan, the shoe has stood the test of time, becoming the most famous colorway of the Air Jordan 1. This 2015 release saw the ...More',
    images: [
      Images.common.product_1,
      Images.common.product_1,
      Images.common.product_1,
    ],
    rating: {
      countRating: 56890,
      average: 4,
    },
    stock: 120,
    categories: ['Winter Wear', 'Jacket'],
    colors: ['#000', '#ccc', '#000080'],
    sizes: ['S', 'M', 'L', 'XL'],
    brand: 'FashionCo',
    discount: 30,
    variants: {
      '#000': {
        S: 10,
        M: 5,
        L: 8,
        XL: 12,
      },
      '#ccc': {
        S: 7,
        M: 9,
        L: 4,
        XL: 6,
      },
      '#000080': {
        S: 3,
        M: 15,
        L: 10,
        XL: 8,
      },
    },
  },
  {
    id: 7,
    productName: 'Mens Starry',
    title: 'Mens Starry Sky Printed Shirt 100% Cotton Fabric',
    price: '₹499',
    description:
      'Perhaps the most iconic sneaker of all-time, this original "Chicago"? colorway is the cornerstone to any sneaker collection. Made famous in 1985 by Michael Jordan, the shoe has stood the test of time, becoming the most famous colorway of the Air Jordan 1. This 2015 release saw the ...More',
    images: [
      Images.common.product_2,
      Images.common.product_2,
      Images.common.product_2,
    ],
    rating: {
      countRating: 7787,
      average: 2,
    },
    stock: 150,
    categories: ['Shirts', 'Casual Wear'],
    colors: ['#000', '#ccc', '#000080', '#fff'],
    sizes: ['M', 'L', 'XL'],
    brand: 'StarStyle',
    discount: 20,
    variants: {
      '#000': {
        S: 10,
        M: 5,
        L: 8,
        XL: 12,
      },
      '#ccc': {
        S: 7,
        M: 9,
        L: 4,
        XL: 6,
      },
      '#000080': {
        S: 3,
        M: 15,
        L: 10,
        XL: 8,
      },
      '#fff': {
        S: 9,
        M: 25,
        L: 15,
        XL: 1,
      },
    },
  },
  {
    id: 8,
    productName: 'Black Dress',
    title: 'Solid Black Dress for Women, Sexy Chain Shorts Ladi',
    price: '₹2000',
    description:
      'Perhaps the most iconic sneaker of all-time, this original "Chicago"? colorway is the cornerstone to any sneaker collection. Made famous in 1985 by Michael Jordan, the shoe has stood the test of time, becoming the most famous colorway of the Air Jordan 1. This 2015 release saw the ...More',
    images: [
      Images.common.product_3,
      Images.common.product_3,
      Images.common.product_3,
    ],
    rating: {
      countRating: 8993,
      average: 4.5,
    },
    stock: 50,
    categories: ['Women', 'Dresses'],
    colors: ['#000', '#fff'],
    sizes: ['S', 'M', 'L'],
    brand: 'GlamourFit',
    discount: 20,
    variants: {
      '#000': {
        S: 10,
        M: 5,
        L: 8,
      },
      '#fff': {
        S: 20,
        M: 43,
        L: 5,
      },
    },
  },
];

export default productData;
