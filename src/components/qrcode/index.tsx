import { QRCodeSVG } from "qrcode.react";
import "./styles.scss";

export default function QrCode({ currentUrl }: QrcodeProps) {
  return (
    <div className="qr-popup-inner">
      <div className="qr-popup-border">
        <QRCodeSVG
          level="H"
          value={currentUrl}
          size={240}
          bgColor="#2e2e2e"
          fgColor="#dddddd"
          marginSize={1}
        />
      </div>
      <div className="qr-popup-url">{currentUrl}</div>
    </div>
  );
}

type QrcodeProps = {
  currentUrl: string;
};
