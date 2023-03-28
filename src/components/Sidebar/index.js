import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAnimeById } from '../../actions/animeActions';

import {
  SidebarContainer,
  Aside,
  Nav,
  Heading,
  AnimeLinks,
} from './SidebarElements';

function Sidebar({ dispatch }) {
  const [topAnime, setTopAnime] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('https://api.jikan.moe/v4/top/anime?airing');
      const topAnime = res.data.data.map((anime) => {
        return {
          mal_id: anime.mal_id,
          title: anime.titles[0].title,
        };
      });
      setTopAnime(topAnime.slice(0, 10));
    }
    fetchData();
  }, []);

  const history = useHistory();
  const handleClick = (e) => {
    dispatch(getAnimeById(e.target.id));
    history.push('/');
  };

  return (
    <SidebarContainer>
      <Aside>
        <Nav>
          <Heading>Top Airing Anime</Heading>
          {topAnime.map((anime) => (
            <AnimeLinks
              key={anime.mal_id}
              id={anime.mal_id}
              onClick={handleClick}
            >
              {anime.title}
            </AnimeLinks>
          ))}
        </Nav>
      </Aside>
    </SidebarContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    anime: state.animeReducer.anime,
  };
};

export default connect(mapStateToProps)(Sidebar);
