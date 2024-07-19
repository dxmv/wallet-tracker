"use client";
import React, { useEffect, useRef } from "react";
import { TextInput } from "./TextInput";
import { IoMdSearch } from "react-icons/io";

interface IModalParams {
	title: string;
	closeModal: () => void;
	handleNext: () => void;
	children: React.ReactNode;
	search: string;
	searchPart?: boolean;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Modal = ({
	title,
	closeModal,
	handleNext,
	searchPart = true,
	children,
	search,
	setSearch,
}: IModalParams) => {
	const modalRef = useRef<HTMLDivElement>(null); // references the modal

	useEffect(() => {
		// Function to handle clicks outside the modal
		const handleClickOutside = (event: MouseEvent) => {
			// Check if the click is outside the modal content
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				closeModal();
			}
		};

		// Add event listener when the component mounts
		document.addEventListener("mousedown", handleClickOutside);

		// Clean up the event listener when the component unmounts
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

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
			<div
				className="w-1/5 bg-white h-4/5 flex flex-col items-center p-4"
				ref={modalRef}
			>
				<div className="w-full flex justify-between items-center">
					<div className="w-4"></div> {/* Space */}
					<h1 className="font-semibold text-lg flex-grow text-center">
						{title}
					</h1>
					<button onClick={closeModal}>X</button>
				</div>
				{/* Search bar */}
				{searchPart && (
					<TextInput
						placeholderText="Search by name..."
						value={search}
						setValue={e => setSearch(e.target.value)}
						inputText="Search:"
						icon={<IoMdSearch />}
					/>
				)}

				<div className="mb-6"></div>
				{/* List of items */}
				{children}
				<button className="border-2 px-3 py-1 mt-6" onClick={handleNext}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Modal;
