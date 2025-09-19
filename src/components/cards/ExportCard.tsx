import React from 'react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

type ExportProps = { exportRef: React.RefObject<HTMLDivElement | null> };

const ExportCard: React.FC<ExportProps> = ({ exportRef }) => {
    const exportAsImage = async () => {
        const node = exportRef.current;
        if (!node) return;

        try {
            const dataUrl = await toPng(node, {
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: 'transparent',
                skipFonts: false,
                filter: n => {
                    if (!(n instanceof Element)) return true;
                    const cs = getComputedStyle(n);
                    const bf = cs.backdropFilter;
                    const wbf = (cs as any).webkitBackdropFilter as string | undefined;
                    const hasBackdrop = (bf && bf !== 'none') || (wbf && wbf !== 'none');
                    return !hasBackdrop;
                }
            });

            saveAs(dataUrl, 'your_card.png');
        } catch (err) {
            console.error('Export failed', err);
        }
    };

    return (
        <button
            className="flex flex-col px-3 py-2 rounded-md justify-center items-center font-semibold text-headingMd text-white bg-blue-700 hover:cursor-pointer w-[160px]"
            onClick={exportAsImage}
        >
            Export Card
        </button>
    );
};

export default ExportCard;
