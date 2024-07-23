import React, { useRef } from "react";

interface ImageUploadProps {
	onImageChange: (file: File) => void;
	title: string;
	currentImage: File | null;
}

// used for uploading images
const ImageUpload: React.FC<ImageUploadProps> = ({
	onImageChange,
	title,
	currentImage,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			onImageChange(e.target.files[0]);
		}
	};

	return (
		<div className="mt-4">
			<label className="block text-sm font-medium text-gray-700">{title}</label>
			<div className="mt-1 flex items-center">
				<button
					type="button"
					onClick={() => fileInputRef.current?.click()}
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Upload Image
				</button>
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleImageChange}
					accept="image/*"
					className="hidden"
				/>
				{currentImage && <span className="ml-4">{currentImage.name}</span>}
			</div>
		</div>
	);
};

export default ImageUpload;
