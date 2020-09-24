import React, {Component, ChangeEvent} from "react";

//import "./style.css"

interface SfxProps {
    src: string;
    masterVol: number;
    masterIsPlaying: boolean;
}

interface SfxState {
    isPlaying: boolean;
    myVol: number;
}

export class SingleSfxSound extends Component<SfxProps, SfxState> {
    private audioTag: HTMLAudioElement;

    constructor(props: SfxProps) {
        super(props);
        this.audioTag = new Audio(this.props.src);
        this.audioTag.loop = true;
        this.audioTag.volume = 0;
        this.state = {
            isPlaying: false,
            myVol: 0,
        };
    }

    togglePlay = () => {
        const newIsPlaying = !this.state.isPlaying;
        let newVolume = this.state.myVol;

        //autoset volume at first use
        newVolume = newIsPlaying && newVolume == 0 ? 0.5 : this.state.myVol;

        this.setState({
            isPlaying: newIsPlaying,
            myVol: newVolume,
        });
    };

    handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        this.setState({
            myVol: newVolume,
        });
    };

    render() {
        this.state.isPlaying && this.props.masterIsPlaying ? this.audioTag.play() : this.audioTag.pause();
        this.audioTag.volume = this.state.myVol * this.props.masterVol;

        return (
            <div>
                <button className="playBtn" onClick={this.togglePlay}>
                    {this.state.isPlaying ? "playing" : "paused"}
                </button>
                <input
                    type="range"
                    min={0}
                    max={1}
                    value={this.state.myVol}
                    step={0.01}
                    onChange={this.handleVolume}
                />
                {Math.round(this.state.myVol * 100)}
            </div>
        );
    }
}
