"use client";
import React, { useState } from "react";
import { TextInput } from "./TextInput";
import { IoMdSearch } from "react-icons/io";
import { ICrypto, IWallet } from "@/types";
import { MyLegendItem } from "@/app/dashboard/_components/MyLegendItem";

export const AddModal = ({
	showing,
	closeModal,
	list,
}: {
	showing: any;
	closeModal: () => void;
	list: Array<ICrypto | IWallet>;
}) => {
	const [search, setSearch] = useState<string>("");

	return (
		<div
			style={{
				position: "absolute",
				top: "0px",
				left: "0px",
				width: "100vw",
				height: "100vh",
				zIndex: "100",
				backgroundColor: "rgb(0,0,0,0.5)",
			}}
			className=" flex justify-center items-center text-black"
		>
			<div className="w-1/5 bg-white h-4/5 flex flex-col items-center">
				<div className="flex ">
					<h1>Add {showing}</h1>
					<button onClick={closeModal}>X</button>
				</div>
				{/* Search bar */}
				<TextInput
					placeholderText="Search by name..."
					value={search}
					setValue={e => setSearch(e.target.value)}
					inputText="Search:"
					icon={<IoMdSearch />}
				/>
				{/* List of items */}
				{list.map(el => (
					<MyLegendItem item={el} key={el.id} />
				))}
				<button>Next</button>
			</div>
		</div>
	);
};
