import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReusableTable } from '@/common/layouts/table';
import { productsColumnDefinitions, type Product } from './config';

const fakeWait = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

export const DemoTableProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loadingProducts, setLoadingProducts] = useState(false);

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get<{ products: Product[] }>(
				'https://dummyjson.com/products',
			);

			console.log(data);
			await fakeWait(2000);

			return data.products;
		};

		setLoadingProducts(true);
		fetchProducts()
			.then((data) => {
				setProducts(data);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setLoadingProducts(false);
			});
	}, []);

	return (
		<ReusableTable
			localstorageKeyPrefix="DemoProducts"
			resource="product"
			columnDefinitions={productsColumnDefinitions}
			items={products}
			loading={loadingProducts}
			loadingText="Loading todo items..."
			selectionType="multi"
		/>
	);
};
