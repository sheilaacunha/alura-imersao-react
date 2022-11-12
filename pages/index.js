import React from "react";
import config from "../config.json"
import styled from 'styled-components'
import { CSSReset } from '../src/components/CSSReset'
import Menu from '../src/components/Menu'
import { StyledTimeline } from "../src/components/Timeline";
import Favoritos from "../src/components/Favoritos";
import Head from 'next/head'
import { videoService } from "../src/services/videoService";

function HomePage() {
    const service = videoService();

    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    const [playlists, setPlaylists] = React.useState({});     // config.playlists

    React.useEffect(() => {
        console.log("useEffect");
        service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data);
                // Forma imutavel
                const novasPlaylists = {};
                dados.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist] = [
                        video,
                        ...novasPlaylists[video.playlist],
                    ];
                });

                setPlaylists(novasPlaylists);
            });
    }, []);  

    return (
        <>

            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
            }}>
                <Head>
                    <title>Imersão React AluraTube</title>
                    <meta name="description" content="Criando durante a Imersão React 5 da Alura" />
                    <link rel="icon" href="./favicon.png" />
                </Head>
                <Menu 
                valorDoFiltro={valorDoFiltro} 
                setValorDoFiltro={setValorDoFiltro} 
                />
                <Header />
                <TimeLine 
                searchValue={valorDoFiltro} 
                playlists={playlists}
                />
                   
                <Favoritos />


            </div>
        </>

    );
}

export default HomePage


const StyledHeader = styled.div`
background-color: ${({theme})=>theme.backgroundLevel1};

img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info{
        display:flex;
        align-items:center;
        width: 100%;
        padding:16px 32px;
        gap:16px;
    }
    p{
        font-size: 1rem;
    color: #666666;
    font-weight: 400px;
    }
    h2 span {
    font-size: 1.rem;
    color: red;
  }
  h2{
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 5px;
  }
`;
const StyledBanner = styled.div`
    background-color: red;
    background-image: url(${({ bg }) => bg});
    background-size: cover;
    background-position:center top; 
    height: 300px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name} <span>{config.lastName}</span>
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function TimeLine({ searchValue, ...props }) {

    const playlistNames = Object.keys(props.playlists)
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName]
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline >
    )
}