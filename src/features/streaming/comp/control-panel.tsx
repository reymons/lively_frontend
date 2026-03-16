import FlatIcon from "@ui/flat-icon";
import sl from "./control-panel.module.scss";

type Props = {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export default function ControlPanel({ canvasRef }: Props) {
    const enterFullScreen = async () => {
        const canvas = canvasRef.current;
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
        <div className={sl.wrapper}>
            <div className={sl.panel}>
                <div className={sl.left} />
                <div className={sl.right}>
                    <button className="icon-btn" type="button" onClick={enterFullScreen}>
                        <FlatIcon type="arrow-scale" color="white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
