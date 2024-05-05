import { useDropzone } from 'react-dropzone';
import { fileMaxSize, JSONFormat } from '../../../constants';

const useDropZone = props => {
	return useDropzone({
		accept: {
			[JSONFormat.format]: JSONFormat.variants
		},
		maxFiles: 1,
		maxSize: fileMaxSize,
		multiple: false,
		validator: file => {
			if (file.type !== JSONFormat.format) {
				return {
					code: 'file-invalid-ext',
					message: 'File extension must be .json'
				};
			}
			return null;
		},
		...props
	});
};

export default useDropZone;
