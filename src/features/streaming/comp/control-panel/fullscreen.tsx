import FlatIcon from "@ui/flat-icon";

type Props = {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export default function Fullscreen({ canvasRef }: Props) {
    const enterFullScreen = async () => {
        const canvas = canvasRef.current?.parentElement;
        if (!canvas) return;
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        }
        try {
            await canvas.requestFullscreen();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button className="icon-btn" type="button" onClick={enterFullScreen}>
            <FlatIcon type="arrow-scale" color="white" />
        </button>
    );
}
