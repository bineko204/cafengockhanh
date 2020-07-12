import React, { Fragment, useEffect } from "react";
import { Button } from "@material-ui/core";
import clsx from "clsx";
const Player = ({ nowPlaying }) => {
    const height = window.innerHeight - 60;
    const width = (height * 16) / 9;
    let now = new Date();
    let nowConverted = now.getTime();
    let timeLeft = nowPlaying
        ? +nowPlaying.duration + +nowPlaying.time_play - nowConverted / 1000
        : 0;
    timeLeft = Math.round(timeLeft);
    const renderVideoInfo = () => {
        return (
            <Fragment>
                <span>
                    {Math.floor(timeLeft / 60)}:
                    {+(timeLeft - Math.floor(timeLeft / 60) * 60) < 10
                        ? "0" + (timeLeft - Math.floor(timeLeft / 60) * 60)
                        : timeLeft - Math.floor(timeLeft / 60) * 60}
                </span>
            </Fragment>
        );
    };
    return (
        <Fragment>
            {nowPlaying ? (
                <div className="position-relative" style={{zIndex: 9999999999}}>
                    <div
                        className="position-absolute"
                        style={{
                            zIndex: 333,
                            fontSize: "33px",
                            color: "red",
                            fontWeight: "bold",
                            top: 20,
                            right: 20,
                            WebkitTextStroke: "0.5px #fff",
                        }}
                    >
                        {renderVideoInfo()}
                    </div>
                    <iframe
                        className="d-none d-lg-block pointer-event-none"
                        id="iframe"
                        width="100%"
                        height={height}
                        src={`https://www.youtube.com/embed/${nowPlaying.video_id}?autoplay=1&controls=0&iv_load_policy`}
                        // src={"https://www.youtube.com/embed/45LNKFmrViY?autoplay=1"}
                        autoPlay
                        allowFullScreen
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>
            ) : (
                <div className="text-right d-none d-lg-block">
                    <img
                        src="https://wallpaperaccess.com/full/2035099.jpg"
                        style={{ width: "100%", height: height }}
                    />
                </div>
            )}
        </Fragment>
    );
};
export default React.memo(Player);
