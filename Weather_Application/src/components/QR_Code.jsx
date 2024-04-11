import { useState } from "react";

export const QR_Code = () => {
    const [img, setimg] = useState("");
    const [loading, setloading] = useState(false);
    const [qrgenerete, setqrgenerete] = useState("");
    const [qrsize, setqrsize] = useState("");

    async function Generate_QR() {
        setloading(true);
        try {
            if (qrgenerete !== "" && qrsize !== "") {
                const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrgenerete)}`;
                setimg(url);
            } else {
                alert("Please enter the data and size");
            }
        } catch (error) {
            console.log("Error generating QR code:", error);
            alert("An error occurred while generating QR code. Please try again.");
        } finally {
            setloading(false);
        }
    }

    function Download_QR() {
        if (qrgenerete !== "" && qrsize !== "") {
            fetch(img)
                .then((response) => response.blob())
                .then((blob) => {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = "qrcode.png";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch((error) => {
                    console.log("Error downloading QR code:", error);
                    alert("An error occurred while downloading QR code. Please try again.");
                });
        } else {
            alert("Please enter the data and size");
        }
    }

    return (
        <div className="app-container">
            <div className="center">
                <h1>QR-Code Generator</h1>
                {img && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={img} alt="qrcode" className="qr-code-image" />
                    </div>
                )}
                {loading && <p>Please wait...</p>}
                <label htmlFor="datainput" className="input-label"><br />
                    Data for QR code:
                </label>
                <input type="text" id="datainput" placeholder="Enter data for QR code" value={qrgenerete} onChange={(e) =>
                    setqrgenerete(e.target.value)} /><br />
                <label htmlFor="sizeinput" className="input-label">
                    Image size (e.g., 100):
                </label>
                <input type="text" id="sizeinput" placeholder="Enter Image Size" value={qrsize} onChange={(e) =>
                    setqrsize(e.target.value)} />
                <button className="generate-button" disabled={loading} onClick={Generate_QR}>Generate QR Code</button>
                <button className="download-button" onClick={Download_QR}>Download QR Code</button>
            </div>
        </div>
    );
};
