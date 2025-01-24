export type QRCodeProps = {
    text: string;
    color: string;
    bgColor: string;
    qrCode: string;
    timestamp: string;
}

export const MAX_TEXT_LENGTH = 200;
export const QR_CODE_SIZE = 180;
export const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };

    return date.toLocaleString('en-US', options);
};