"use client";
import React, { useEffect, useState } from "react";

interface MyListProps<T> {
	apiCall: () => Promise<Array<T>>;
	renderItem: (item: T) => React.ReactNode;
}

// list of items with the type T
const MyList = <T,>({ apiCall, renderItem }: MyListProps<T>) => {
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

	return (
		<div>
			{list.map((item, index) => (
				<React.Fragment key={index}>{renderItem(item)}</React.Fragment>
			))}
		</div>
	);
};

export default MyList;
