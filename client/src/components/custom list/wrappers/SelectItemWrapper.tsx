import React from "react";

interface PropsSelectItemWrapper {
	selectedId: number | null;
	itemId: number;
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
	children: React.ReactNode;
}

// we use this when a user wants to only select an item
const SelectItemWrapper = ({
	selectedId,
	itemId,
	setSelectedId,
	children,
}: PropsSelectItemWrapper) => {
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
