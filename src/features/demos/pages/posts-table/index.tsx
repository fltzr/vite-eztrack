// import { ReusableTable } from "@/common/layouts/table";
// import type { TodoItem } from "@/common/layouts/table/config";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { todoItemColumnDefinitions } from "./config";

// export const Component = () => {
//   const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
// 		const fetchTodoItems = async () => {
// 			const { data } = await axios.get<TodoItem[]>(
// 				'https://jsonplaceholder.typicode.com/todos',
// 			);

// 			return data;
// 		};

// 		setLoading(true);
// 		fetchTodoItems()
// 			.then((data) => {
// 				setTodoItems(data);
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 			})
// 			.finally(() => {
// 				setLoading(false);
// 			});
// 	}, []);

//   return (
//     <ReusableTable
//       localstorageKey="React-Posts-Table"
//       columnDefinitions={todoItemColumnDefinitions}
//       items={todoItems}
//     />
//   )

// }
