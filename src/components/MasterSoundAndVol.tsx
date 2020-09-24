import React, {ChangeEvent, Component} from "react";
import { SingleSfxSound } from "./SingleSfxSound";
import { SingleSoundtrack } from "./SingleSoundtrack";

interface MasterProps {}

interface MasterState {
  sounds: string[];
  soundtrack: string [];
  masIsPlaying: boolean;
  masVol: number;
}

export class MasterSoundAndVol extends Component<MasterProps, MasterState> {
  constructor(props: MasterProps) {
    super(props);
    this.state = {
      sounds: [
         "res/southGate/HAMMER.wav",
         "res/southGate/RAIN_01.WAV"
      ],
      soundtrack: [
          "res/soundtracks/G1/01 title theme.mp3",
          "res/soundtracks/G1/04 old camp.mp3"
      ],
      masIsPlaying: true,
      masVol: 1,
    };
  }

  handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    this.setState({
      masVol: newVolume,
    });
  };

    togglePlay = () => {
        const newIsPlaying = !this.state.masIsPlaying;
        let newVolume = this.state.masVol;

        this.setState({
            masIsPlaying: newIsPlaying,
            masVol: newVolume,
        });
    };

  render() {
    return(
        <div>

            <button onClick={this.togglePlay}>
                {this.state.masIsPlaying ? "playing all" : "paused all"}
            </button>

            <input
                type="range"
                min={0}
                max={1}
                value={this.state.masVol}
                step={0.01}
                onChange={this.handleVolume}
            /> {Math.round(this.state.masVol * 100)}

            {this.state.soundtrack.map((soundtrack) => (
            <SingleSoundtrack
                src={soundtrack}
                masterVol={this.state.masVol}
                masterIsPlaying={this.state.masIsPlaying}
            />
            ))}

          {this.state.sounds.map((sound) => (
              <SingleSfxSound
                  src={sound}
                  masterVol={this.state.masVol}
                  masterIsPlaying={this.state.masIsPlaying}
              />
          ))}

        </div>
    );
  }
}

