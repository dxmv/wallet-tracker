"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
	FixedSizeList as List,
	FixedSizeGrid as Grid,
	ListChildComponentProps,
	GridChildComponentProps,
} from "react-window";

interface MyListProps<T> {
	apiCall: () => Promise<Array<T>>;
	renderItem: (item: T) => React.ReactNode;
	containerWidth?: number;
	containerHeight?: number;
	searchTerm?: String;
	searchKeys?: (keyof T)[]; // can search by more parameters
	// the kind of display
	display?: "list" | "grid";
	columnCount?: number; // if the display is grid
}

// list of items with the type T
const MyList = <T,>({
	apiCall,
	renderItem,
	containerWidth = 800,
	containerHeight = 400,
	display = "list",
	columnCount = 3,
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
	const ListRow = useCallback(
		({ index, style }: ListChildComponentProps) => {
			const item = filteredItems[index];
			return <div style={style}>{renderItem(item)}</div>;
		},
		[filteredItems, renderItem]
	);

	// Memoized cell renderer for the virtualized grid
	const GridCell = useCallback(
		({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
			const index = rowIndex * columnCount + columnIndex; // calculating the item's index
			const item = filteredItems[index];
			if (!item) return null;
			return <div style={style}>{renderItem(item)}</div>;
		},
		[filteredItems, renderItem, columnCount]
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

	return display === "list" ? (
		<List
			height={containerHeight}
			itemCount={filteredItems.length}
			itemSize={50}
			width={containerWidth}
		>
			{ListRow}
		</List>
	) : (
		<Grid
			columnCount={columnCount}
			columnWidth={containerWidth / columnCount}
			height={containerHeight}
			rowCount={Math.ceil(filteredItems.length / columnCount)}
			rowHeight={50}
			width={containerWidth}
		>
			{GridCell}
		</Grid>
	);
};

export default MyList;
