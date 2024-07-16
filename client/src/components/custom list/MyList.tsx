"use client";
import React, { useEffect, useState } from "react";

interface MyListProps<T> {
	apiCall: () => Promise<Array<T>>;
	renderItem: (item: T) => React.ReactNode;
	searchTerm?: String;
	searchKeys?: (keyof T)[]; // can search by more parameters
}

// list of items with the type T
const MyList = <T,>({
	apiCall,
	renderItem,
	searchTerm,
	searchKeys,
}: MyListProps<T>) => {
	const [list, setList] = useState<Array<T>>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await apiCall();
				await setList(data);
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
	}, [apiCall]);

	const filteredList = list.filter(item => {
		if (!searchTerm) return true;
		return searchKeys?.some(key => {
			const value = item[key];
			return (
				typeof value === "string" &&
				value.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
	});

	return (
		<div className="w-full h-3/4 overflow-y-scroll">
			{filteredList.map((item, index) => (
				<React.Fragment key={index}>{renderItem(item)}</React.Fragment>
			))}
		</div>
	);
};

export default MyList;
