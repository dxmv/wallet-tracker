import React, { useState, useEffect } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import ReactDOM from "react-dom";

interface PropsEditAndDeleteItemWrapper {
	onEdit: () => void;
	onDelete: (id: number) => void;
	children: React.ReactNode;
	id: number;
	renderEditModal: React.ReactNode; // Custom edit modal to be rendered
}

const EditAndDeleteItemWrapper = ({
	children,
	onEdit,
	onDelete,
	id,
	renderEditModal,
}: PropsEditAndDeleteItemWrapper) => {
	const [editModal, setEditModal] = useState<boolean>(false);
	// State to hold the DOM element where the modal will be rendered
	const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

	// Effect to set the modal root to the document body after component mount
	useEffect(() => {
		setModalRoot(document.body);
	}, []);

	// Styles for the modal overlay
	const modalOverlayStyle: React.CSSProperties = {
		position: "fixed", // Fixed position to cover the entire viewport
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: "100vw",
		height: "100vh",
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
		zIndex: 1000, // High z-index to appear above other elements
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	// Function to render the modal content
	const renderModal = () => (
		<div style={modalOverlayStyle}>
			{/* Clone the provided edit modal and inject the closeModal prop */}
			{React.cloneElement(renderEditModal as React.ReactElement, {
				closeModal: () => setEditModal(false),
			})}
		</div>
	);

	return (
		<>
			{/* Main content wrapper */}
			<div className="relative group">
				{children}
				{/* Edit and delete buttons overlay */}
				<div className="absolute top-0 right-0 bg-custom-gray bg-opacity-90 p-2 rounded hidden group-hover:flex justify-around items-center space-x-2 w-full h-full">
					<FaEdit
						className="text-blue-500 cursor-pointer"
						onClick={() => {
							setEditModal(true);
							onEdit();
						}}
					/>
					<FaRegTrashAlt
						className="text-red-500 cursor-pointer"
						onClick={() => onDelete(id)}
					/>
				</div>
			</div>
			{/* Render the modal using a portal when editModal is true and modalRoot is available */}
			{editModal &&
				modalRoot &&
				ReactDOM.createPortal(renderModal(), modalRoot)}
		</>
	);
};

export default EditAndDeleteItemWrapper;
