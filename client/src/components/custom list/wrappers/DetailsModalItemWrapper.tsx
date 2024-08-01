import React, { useCallback, useState } from "react";
import { createPortal } from "react-dom";
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

	const handleClick = useCallback(() => {
		setShowModal(true);
	}, []);

	const handleClose = useCallback(() => {
		setShowModal(false);
	}, []);

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
				closeModal={handleClose}
				handleNext={handleClose}
				searchPart={false}
				nextButtonText="Close"
			>
				{renderDetails(item)}
			</Modal>
		</div>
	);

	return (
		<>
			<div
				onClick={handleClick}
				className="flex py-2 border-b-2 border-gray-800 justify-between hover:bg-gray-500 mb-2 items-center"
			>
				{children}
			</div>
			{showModal && createPortal(renderModal(), document.body)}
		</>
	);
}

export default DetailsModalWrapper;
