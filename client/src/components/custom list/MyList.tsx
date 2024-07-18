"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

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
	const [allItems, setAllItems] = useState<Array<T>>([]);
	const [filteredItems, setFilteredItems] = useState<Array<T>>([]);

	// fetch data when component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await apiCall();
				await setAllItems(data);
				await setFilteredItems(data);
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
	}, [apiCall]);

	// Memoized row renderer for the virtualized list
	const Row = useCallback(
		({ index, style }: ListChildComponentProps) => {
			const item = filteredItems[index];
			return <div style={style}>{renderItem(item)}</div>;
		},
		[filteredItems, renderItem]
	);

	// filtering
	useEffect(() => {
		const filteredList = allItems.filter(item => {
			if (!searchTerm) return true;
			return searchKeys?.some(key => {
				const value = item[key];
				return (
					typeof value === "string" &&
					value.toLowerCase().includes(searchTerm.toLowerCase())
				);
			});
		});
		setFilteredItems(filteredList);
	}, [allItems, searchTerm, searchKeys]);

	return (
		<List
			height={400} // Fixed height, adjust as needed
			itemCount={filteredItems.length}
			itemSize={50} // Height of each item in pixels
			width="100%"
		>
			{Row}
		</List>
	);
};

export default MyList;
