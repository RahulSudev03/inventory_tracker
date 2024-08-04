import React, { useRef, useState } from 'react';
import axios from 'axios';

const CameraCapture = () => {
    const [image, setImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Start camera
    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                setIsCameraOpen(true);
            })
            .catch(err => console.error("Error accessing camera: ", err));
    };

    // Capture image from the video stream
    const captureImage = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imgData = canvasRef.current.toDataURL('image/png');
        setImage(imgData);
        analyzeImage(imgData);
        stopCamera(); // Stop the camera after capturing the image
    };

    // Stop camera
    const stopCamera = () => {
        const stream = videoRef.current.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        setIsCameraOpen(false);
    };

    // Analyze image using vision API
    const analyzeImage = async (imageData) => {
        try {
            const response = await axios.post('/api/vision', { image: imageData });
            const labels = response.data.labels;

            // Assuming the API response contains item labels
            if (labels.length > 0) {
                const item = labels[0]; // Use the first detected item for simplicity
                const userConfirmed = window.confirm(`Do you want to add ${item}?`);
                if (userConfirmed) {
                    addItemToTracker(item);
                }
            }
        } catch (error) {
            console.error('Error analyzing image:', error);
        }
    };

    // Add item to inventory tracker
    const addItemToTracker = async (item) => {
        try {
            await fetch('/api/add-item', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item }),
            });
            console.log(`${item} added to tracker.`);
        } catch (error) {
            console.error('Error adding item to tracker:', error);
        }
    };

    return (
        <div>
            <button onClick={() => setIsCameraOpen(true)}>Add Using Camera</button>
            {isCameraOpen && (
                <div>
                    <video ref={videoRef} autoPlay width="640" height="480" />
                    <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
                    <button onClick={captureImage}>Capture Image</button>
                    <button onClick={stopCamera}>Stop Camera</button>
                </div>
            )}
            {image && <img src={image} alt="Captured" />}
        </div>
    );
};

export default CameraCapture;


