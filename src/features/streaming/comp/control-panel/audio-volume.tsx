import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { audioVolume, isAudioMuted } from "../../store";
import FlatIcon from "@ui/flat-icon";
import sl from "./audio-volume.module.scss";

export default function AudioVolume() {
    const [volume, setVolume] = useAtom(audioVolume);
    const [prevVolume, setPrevVolume] = useState(volume || 0.5);
    const isMuted = useAtomValue(isAudioMuted);

    const toggleVolume = () => {
        if (isMuted) {
            setVolume(prevVolume);
        } else {
            setPrevVolume(volume);
            setVolume(0);
        }
    };

    return (
        <div className={sl.wrapper}>
            <div className={sl.rangeWrapper}>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={e => setVolume(parseFloat(e.target.value))}
                />
            </div>
            <button type="button" className="icon-btn" onClick={toggleVolume}>
                <FlatIcon
                    type={isMuted ? "volume-muted" : "volume"}
                    color={isMuted ? "var(--color-danger)" : "var(--color-bg-secondary)"}
                />
            </button>
        </div>
    );
}
