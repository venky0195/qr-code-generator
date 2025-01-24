type QRCodeDisplayProps = {
  qrCode: string;
  text: string;
  timestamp: string;
  onCopy: () => void;
  onDownload: () => void;
  showTextAndTimestamp?: boolean;
};

const QRCodeDisplay = ({
  qrCode,
  text,
  timestamp,
  onCopy,
  onDownload,
  showTextAndTimestamp = false,
}: QRCodeDisplayProps) => {
  return (
    <div className='flex flex-col items-center'>
      <img
        src={qrCode}
        alt='QR Code'
        className='max-w-[300px] rounded-md border border-gray-300 dark:border-gray-600 p-3'
      />
      {/^https?:\/\//.test(text) && (
        <button
          onClick={() => window.open(text, '_blank')}
          className='w-full mt-3 bg-purple-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition-all'
        >
          🔍 Scan to Test
        </button>
      )}

      {showTextAndTimestamp && (
        <>
          <p
            className='text-sm text-gray-700 dark:text-gray-300 mt-3 overflow-hidden text-ellipsis whitespace-nowrap max-w-[100%]'
            title={text}
          >
            <strong>Text:</strong> {text}
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            <strong>Added on:</strong> {timestamp}
          </p>
        </>
      )}
      <div className='mt-3 flex flex-col sm:flex-row gap-2 w-full'>
        <button
          onClick={onCopy}
          className='w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition-all text-sm'
        >
          📋 Copy
        </button>
        <button
          onClick={onDownload}
          className='w-full bg-green-600 dark:bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 dark:hover:bg-green-400 transition-all text-sm'
        >
          💾 Download
        </button>
      </div>
    </div>
  );
};
export default QRCodeDisplay;
