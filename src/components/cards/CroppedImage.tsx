export async function CroppedImage(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        i.crossOrigin = 'anonymous'; // needed if the image isn’t same-origin
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = imageSrc;
    });

    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(
        img,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return canvas.toDataURL('image/png');
}
