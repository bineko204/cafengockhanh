import { Button } from "@material-ui/core";
// import { debounce } from "lodash";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import Axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { compose } from "redux";
import style from "./style";
// import { BASE_IP_ADDRESS } from "./../../../../Constants";

function convertYoutubeTime(duration) {
    var total = 0;
    var hours = duration.match(/(\d+)H/);
    var minutes = duration.match(/(\d+)M/);
    var seconds = duration.match(/(\d+)S/);
    if (hours) total += parseInt(hours[1]) * 3600;
    if (minutes) total += parseInt(minutes[1]) * 60;
    if (seconds) total += parseInt(seconds[1]);
    return total;
}

function KaraokeActions(props) {
    const { classes } = props;
    const [clientIp, setClientIp] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchAutoComplete, setSearchAutoComplete] = useState([]);
    const [selectTable, setSelectTable] = useState("");
    const [API_KEY, setAPI_KEY] = useState();
    // const API_KEY = "AIzaSyASK7MQnoXK8yuEIUzIv9V4bA7Vk0xUwy8";
    // const API_KEY2 = "AIzaSyBsa5eijyE9No8ro5C3vOTLj8vGi8JyV_o";
    const cooldown = 30000;

    // =========Switch=========
    const checkOpenKaraoke = +props.siteConfig.open_karaoke;
    const checkSearchCooldown = +props.siteConfig.search_cooldown;
    const checkOpenIpCheck = +props.siteConfig.open_ip_check;
    // ==============
    let searching = (value) => {
        if (value) {
            // YTSearch({ key: API_KEY2, term: value }, (videos) => {
            //     setSearchAutoComplete(videos);
            // });
            const ROOT_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${value}&type=video`;
            Axios.get(ROOT_URL)
                .then((res) => {
                    let videos = res.data.items;
                    setSearchAutoComplete(videos);
                    setSearchText("");
                })
                .catch((error) => {
                    // console.error("error2");
                    props.changeAPIKEY();
                });
        }
    };
    const handleSearch = () => {
        let result = searchText + " Karaoke";
        if (
            searchText === "" ||
            searchText === null ||
            searchText === undefined
        ) {
            setSearchAutoComplete([]);
        } else {
            searching(result);
        }
    };

    const callApiYoutube = (id, api_key) => {
        Axios({
            method: "get",
            url: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${id}&key=${api_key}`,
        }).then((res) => {
            const id = res.data.items[0].id;
            const title = res.data.items[0].snippet.title;
            const thumb = res.data.items[0].snippet.thumbnails.default.url;
            const duration = convertYoutubeTime(
                res.data.items[0].contentDetails.duration
            );
            const group_customer = selectTable;
            props.result({
                id,
                title,
                thumb,
                duration,
                group_customer,
            });
            setSearchAutoComplete([]);
            document.getElementById("searchField").value = "";
        });
    };

    const handleSelectMusic = (data) => {
        const id = data.id.videoId;
        let now = new Date();
        now = now.getTime();
        let itemStr = localStorage.getItem("customer_table");
        let item = JSON.parse(itemStr);
        if (checkSearchCooldown === 1) {
            if (item.lastSubmit) {
                if (now > item.lastSubmit + cooldown) {
                    item.lastSubmit = now;
                    localStorage.setItem(
                        "customer_table",
                        JSON.stringify(item)
                    );
                    callApiYoutube(id, API_KEY);
                } else {
                    toast.warn(
                        ` Không thể thêm bài hát trong ${parseInt(
                            (item.lastSubmit + cooldown - now) / 1000
                        )}s `
                    );
                }
            } else {
                item.lastSubmit = now;
                localStorage.setItem("customer_table", JSON.stringify(item));
                callApiYoutube(id, API_KEY);
            }
        } else {
            item.lastSubmit = now;
            localStorage.setItem("customer_table", JSON.stringify(item));
            callApiYoutube(id, API_KEY);
        }
    };

    const renderSearchAutoComplete = () => {
        if (searchAutoComplete) {
            return (
                <div className={classes.searchAutoComplete}>
                    {searchAutoComplete.map((item) => (
                        <div
                            className={classes.searchItem}
                            key={item.id.videoId}
                            onClick={() => handleSelectMusic(item)}
                        >
                            <div className="thumb">
                                <img
                                    src={item.snippet.thumbnails.default.url}
                                    alt=""
                                />
                            </div>
                            <div className="item-title pl-2">
                                <span>{item.snippet.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    };

    const renderListVideo = () => {
        let xhtml = null;
        const { classes } = props;
        if (props.listVideo.length > 0) {
            xhtml = props.listVideo.map((video, index) => {
                if (index === 0) {
                    return (
                        <li key={index}>
                            <div className={classes.stt}>
                                <span>
                                    <img
                                        src={video.thumb}
                                        className="spin"
                                    ></img>
                                </span>
                            </div>
                            <div className={classes.name}>
                                <marquee>
                                    <span>{video.title}</span>
                                </marquee>
                            </div>
                            <div className={classes.orderBy}>
                                <span>Bàn {video.group_customer}</span>
                            </div>
                        </li>
                    );
                } else {
                    return (
                        <li key={index}>
                            <div className={classes.stt}>
                                <span>{index + 1}</span>
                            </div>
                            <div className={classes.name}>
                                <span>{video.title}</span>
                            </div>
                            <div className={classes.orderBy}>
                                <span>Bàn {video.group_customer}</span>
                            </div>
                        </li>
                    );
                }
            });
        }
        return xhtml;
    };

    const showDeleteModal = () => {
        props.showDeleteModal();
    };

    const handleSelectTable = (id) => {
        const now = new Date();
        let acceptSelect = 0;
        if (checkOpenIpCheck) {
            if (clientIp === props.siteConfig.ip_address) {
                if (localStorage.getItem("cooldown")) {
                    if (localStorage.getItem("cooldown") < now) {
                        acceptSelect = 1;
                    } else {
                        toast.error(
                            `Bạn không thể chọn bàn trong ${Math.floor(
                                (localStorage.getItem("cooldown") - now) / 1000
                            )}s `
                        );
                    }
                } else {
                    acceptSelect = 1;
                }
            } else {
                toast.error(
                    "Bạn vui lòng đăng nhập free wifi 'Cafengockhanh' để thực hiện chức năng này"
                );
            }
        } else {
            if (localStorage.getItem("cooldown")) {
                if (localStorage.getItem("cooldown") < now) {
                    acceptSelect = 1;
                } else {
                    toast.error(
                        `Bạn không thể chọn bàn trong ${Math.floor(
                            (localStorage.getItem("cooldown") - now) / 1000
                        )}s `
                    );
                }
            } else {
                acceptSelect = 1;
            }
        }

        if (acceptSelect) {
            const table = {
                id: id,
                expiry: now.getTime() + 3 * 60 * 60 * 1000,
            };
            setSelectTable(id);
            localStorage.setItem("customer_table", JSON.stringify(table));
            toast.success(`Bạn đã chọn Bàn số ${id}`);
        }
    };

    const handelDeleteTable = () => {
        const now = new Date();
        setSelectTable("");
        localStorage.removeItem("customer_table");
        localStorage.setItem(
            "cooldown",
            JSON.stringify(now.getTime() + 5 * 60 * 1000)
        );
        toast.success("Hủy chọn bàn thành công!");
    };

    const handleNextVideo = (id) => {
        props.nextVideo(id);
    };
    useEffect(() => {
        setAPI_KEY(props.API_KEY);
        const now = new Date();
        if (localStorage.getItem("customer_table")) {
            const tableStr = localStorage.getItem("customer_table");
            const table = JSON.parse(tableStr);
            if (now > table.expiry) {
                localStorage.removeItem("customer_table");
            } else {
                setSelectTable(table.id);
            }
        }
    });
    useEffect(() => {
        if (props.acceptDelete === 1) {
            handelDeleteTable();
        }
    }, [props.acceptDelete]);
    useEffect(() => {
        if (clientIp === null) {
            Axios.get("http://www.geoplugin.net/json.gp")
                .then((res) => {
                    setClientIp(res.data.geoplugin_request);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [clientIp]);

    return (
        <div className={clsx(classes.left, "p-3")}>
            <div className="d-flex justify-content-around">
                <h1 className="text-center">Hát cho nhau nghe</h1>
            </div>
            <div className={classes.tableChoose}>
                <span className="title">Chọn bàn: </span>
                {selectTable === "" ? (
                    <div className="d-flex justify-content-around mt-2">
                        <Button
                            size="small"
                            variant="contained"
                            margin="dense"
                            color="primary"
                            className="px-3"
                            onClick={() => handleSelectTable(1)}
                        >
                            Bàn 1
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            margin="dense"
                            color="primary"
                            className="px-3"
                            onClick={() => handleSelectTable(2)}
                        >
                            Bàn 2
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            margin="dense"
                            color="primary"
                            className="px-3"
                            onClick={() => handleSelectTable(3)}
                        >
                            Bàn 3
                        </Button>
                    </div>
                ) : (
                    <div className="d-flex justify-content-around">
                        <span> Bạn đang chọn: </span>
                        <strong className="text-success">
                            Bàn số {selectTable}
                        </strong>
                        <Button
                            size="small"
                            variant="contained"
                            margin="dense"
                            color="secondary"
                            onClick={showDeleteModal}
                        >
                            <i className="fas fa-times pr-2"></i> Hủy
                        </Button>
                    </div>
                )}
            </div>
            <div className={classes.searchField}>
                <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
                    <span className="title">Tìm kiếm bài hát</span>
                    <div>
                        <TextField
                            label={
                                !checkOpenKaraoke
                                    ? "Chức năng đang khóa, liên hệ Admin để mở khóa"
                                    : selectTable === ""
                                    ? "Bạn cần chọn bàn"
                                    : "Nhập tên bài hát"
                            }
                            fullWidth
                            margin="none"
                            variant="outlined"
                            size="small"
                            id="searchField"
                            onChange={(e) => setSearchText(e.target.value)}
                            disabled={
                                (checkOpenKaraoke !== NaN
                                    ? !checkOpenKaraoke
                                    : false) ||
                                (selectTable === "" ? true : false)
                            }
                        />
                        <Button
                            className={clsx(classes.cancelBtn)}
                            size="small"
                            type="submit"
                            variant="text"
                            onClick={handleSearch}
                        >
                            <i className="fas fa-search    "></i>
                        </Button>
                    </div>
                    <Button
                        className={clsx(
                            // classes.cancelBtn,
                            searchAutoComplete.length > 0 ? "" : "d-none"
                        )}
                        size="small"
                        color="secondary"
                        type="reset"
                        variant="contained"
                        onClick={() => setSearchAutoComplete([])}
                    >
                        <i className="fas fa-times"></i>
                    </Button>
                    {renderSearchAutoComplete()}
                </form>
            </div>
            <div className={classes.videoList}>
                <div className="d-flex justify-content-between  ">
                    <span className="title">Danh sách phát</span>
                    {props.listVideo.length > 0 ? (
                        <Button
                            size="small"
                            className="m-2"
                            variant="contained"
                            color="primary"
                            disabled={
                                selectTable === ""
                                    ? true
                                    : +selectTable ===
                                      +props.listVideo[0].group_customer
                                    ? false
                                    : true
                            }
                            onClick={() =>
                                handleNextVideo(props.listVideo[0].id)
                            }
                        >
                            Chuyển bài
                        </Button>
                    ) : (
                        ""
                    )}
                </div>
                <div className={clsx(classes.wrList, "custom-scroll")}>
                    <ul className="p-0 m-0"> {renderListVideo()}</ul>
                </div>
            </div>
        </div>
    );
}

export default compose(withStyles(style))(KaraokeActions);
