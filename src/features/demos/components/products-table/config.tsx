import type { TableColumnDefinition } from '@/common/utils/table-utils';

export type Product = {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
};

export const productsColumnDefinitions: TableColumnDefinition<Product>[] = [
	{
		id: 'id',
		sortingField: 'id',
		header: 'ID',
		cell: (item) => item.id,
		width: 100,
	},
	{
		id: 'title',
		sortingField: 'title',
		header: 'Title',
		cell: (item) => item.title,
		width: 100,
	},
	{
		id: 'description',
		sortingField: 'description',
		header: 'Description',
		cell: (item) => item.description,
		width: 100,
	},
	{
		id: 'price',
		sortingField: 'price',
		header: 'Price',
		cell: (item) => item.price,
		width: 100,
	},
	{
		id: 'discountPercentage',
		sortingField: 'discountPercentage',
		header: 'Discount Percentage',
		cell: (item) => item.discountPercentage,
		width: 100,
	},
	{
		id: 'rating',
		sortingField: 'rating',
		header: 'Rating',
		cell: (item) => item.rating,
		width: 100,
	},
	{
		id: 'stock',
		sortingField: 'stock',
		header: 'Stock',
		cell: (item) => item.stock,
		width: 100,
	},
	{
		id: 'brand',
		sortingField: 'brand',
		header: 'Brand',
		cell: (item) => item.brand,
		width: 100,
	},
	{
		id: 'category',
		sortingField: 'category',
		header: 'Category',
		cell: (item) => item.category,
		width: 100,
	},
	{
		id: 'thumbnail',
		sortingField: 'thumbnail',
		header: 'Thumbnail',
		cell: (item) => item.thumbnail,
		width: 100,
		visible: false,
	},
	{
		id: 'images',
		sortingField: 'images',
		header: 'Images',
		cell: (item) => item.images,
		width: 100,
		visible: false,
	},
];
