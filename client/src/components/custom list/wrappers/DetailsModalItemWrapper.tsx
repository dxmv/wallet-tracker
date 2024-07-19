import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "@/components/Modal";

interface DetailsModalWrapperProps<T> {
	children: React.ReactNode;
	item: T;
	renderDetails: (item: T) => React.ReactNode;
}

function DetailsModalWrapper<T>({
	children,
	item,
	renderDetails,
}: DetailsModalWrapperProps<T>) {
	const [showModal, setShowModal] = useState(false);

	// Styles for the modal overlay
	const modalOverlayStyle: React.CSSProperties = {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: "100vw",
		height: "100vh",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 1000,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	// Function to render the modal
	const renderModal = () => (
		<div style={modalOverlayStyle}>
			<Modal
				title="Item Details"
				closeModal={() => setShowModal(false)}
				handleNext={() => setShowModal(false)}
				searchPart={false}
			>
				{renderDetails(item)}
			</Modal>
		</div>
	);

	return (
		<>
			<div
				onClick={() => setShowModal(true)}
				className="flex py-2 border-b-2 border-gray-800 justify-between hover:bg-gray-500 mb-2 items-center"
			>
				{children}
			</div>
			{showModal && ReactDOM.createPortal(renderModal(), document.body)}
		</>
	);
}

export default DetailsModalWrapper;
