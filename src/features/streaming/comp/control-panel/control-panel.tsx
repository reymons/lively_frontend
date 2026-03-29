import Fullscreen from "./fullscreen";
import AudioVolume from "./audio-volume";
import sl from "./control-panel.module.scss";

type Props = {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export default function ControlPanel({ canvasRef }: Props) {
    return (
        <div className={sl.wrapper}>
            <div className={sl.panel}>
                <div className={sl.left} />
                <div className={sl.right}>
                    <AudioVolume />
                    <Fullscreen canvasRef={canvasRef} />
                </div>
            </div>
        </div>
    );
}
