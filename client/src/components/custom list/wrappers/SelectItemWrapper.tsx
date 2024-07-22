import React from "react";

interface PropsSelectItemWrapper<T> {
	selectedId: T | null;
	itemId: T;
	setSelectedId: React.Dispatch<React.SetStateAction<T | null>>;
	children: React.ReactNode;
}

// we use this when a user wants to only select an item
const SelectItemWrapper = <T,>({
	selectedId,
	itemId,
	setSelectedId,
	children,
}: PropsSelectItemWrapper<T>) => {
	return (
		<div
			className={`flex py-2 border-b-2 border-gray-200 justify-between mb-2 items-center w-full cursor-pointer ${
				selectedId == itemId && "bg-gray-500"
			}`}
			onClick={() => setSelectedId(itemId)}
		>
			{children}
		</div>
	);
};

export default SelectItemWrapper;
