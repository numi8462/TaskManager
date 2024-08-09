import './ProfileEdit.scss';
import { IoIosClose } from "react-icons/io";
import { useRef, useState } from 'react';
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";
import "react-image-crop/dist/ReactCrop.css";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ProfileEdit = ({ updateAvatar, closeEdit }) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError("Image must be at least 150 x 150 pixels.");
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);

        const fileNameElement = document.getElementById('selected_file_name');
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            let fileName = file.name;
            if (fileName.length > 20) {
                fileName = fileName.substring(0, 20) + '...';
            }
            fileNameElement.textContent = fileName;
        } else {
            fileNameElement.textContent = '';
        }
        
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    return (
        <div className="crop">
            <div className='close'>
                <IoIosClose className='close-icon' onClick={closeEdit} />
            </div>

            <div className='input'>
                <label className='input_field'>
                    <span className="choose-file">파일 선택</span>
                    <span id="selected_file_name"></span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onSelectFile}
                        className="hidden-input"
                    />
                </label>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            {imgSrc && (
                <div className="image-box">
                    <ReactCrop
                        crop={crop}
                        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                    >
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            alt="Upload"
                            style={{ maxHeight: "70vh" }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                    <button
                        className="save-crop"
                        onClick={async () => {
                            const blob = await setCanvasPreview(
                                imgRef.current, // HTMLImageElement
                                previewCanvasRef.current, // HTMLCanvasElement
                                convertToPixelCrop(
                                    crop,
                                    imgRef.current.width,
                                    imgRef.current.height
                                )
                            );
                            const file = new File([blob], "cropped_image.jpg", { type: "image/jpeg" });
                            updateAvatar(URL.createObjectURL(blob), file);
                            closeEdit();
                        }}
                    >
                        설정하기
                    </button>
                </div>
            )}
            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                    }}
                />
            )}
        </div>
    );
}

export default ProfileEdit;
